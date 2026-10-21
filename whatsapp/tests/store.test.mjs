import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { openStore } from '../src/store.mjs';

const now = 1800000000000;
const event = (id = 'p:1', contactId = '123') => ({ id, phoneNumberId: 'p', contactId, timestamp: now, kind: 'text', text: 'Olá' });
test('upgrading an existing database incorporates prior outbound reservations', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vexel-upgrade-')), file = join(dir, 'test.sqlite');
  let s = openStore(file, { now: () => now, outboundMonthlyLimit: 1 });
  try {
    s.ingest(event()); s.reserveReply('p:1', 0, 'Oi'); s.completeSend('p:1', 'sent'); s.close();
    const legacy = new DatabaseSync(file); legacy.exec('DROP TABLE monthly_sends'); legacy.close();
    s = openStore(file, { now: () => now, outboundMonthlyLimit: 1 });
    assert.equal(s.hasSendBudget(), false);
  } finally { s.close(); rmSync(dir, { recursive: true }); }
});
test('monthly send budget survives restart, retention cleanup and uncertain sends; resets by UTC month', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vexel-monthly-')), file = join(dir, 'test.sqlite');
  let clock = Date.UTC(2026, 9, 1, 12), s = openStore(file, { now: () => clock, outboundMonthlyLimit: 1, retentionDays: 1 });
  try {
    s.ingest({ ...event(), timestamp: clock });
    assert.equal(s.reserveReply('p:1', 0, 'Oi'), true);
    s.failSend('p:1', 'uncertain'); assert.equal(s.hasSendBudget(), false);
    s.close(); clock = Date.UTC(2026, 9, 20, 12);
    s = openStore(file, { now: () => clock, outboundMonthlyLimit: 1, retentionDays: 1 });
    s.prune(); assert.equal(s.hasSendBudget(), false);
    s.ingest({ ...event('p:2', '456'), timestamp: clock });
    assert.equal(s.reserveReply('p:2', 0, 'Não enviar'), false);
    clock = Date.UTC(2026, 10, 1); assert.equal(s.hasSendBudget(), true);
  } finally { s.close(); rmSync(dir, { recursive: true }); }
});
test('duplicates are durable and histories are isolated', () => {
  const s = openStore(':memory:', { now: () => now });
  try {
    assert.equal(s.ingest(event()), true);
    assert.equal(s.ingest(event()), false);
    s.ingest(event('p:2', '456'));
    s.recordMessage('123', 'assistant', 'Olá, sou o assistente da Vexel');
    assert.deepEqual(s.history('456').map(m => m.text), ['Olá']);
    assert.equal(s.history('123').length, 2);
    assert.equal(s.claimNext().id, 'p:1');
    s.finish('p:1', 'done');
    assert.equal(s.claimNext().id, 'p:2');
  } finally { s.close(); }
});
test('manual control invalidates reservations and survives restart', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vexel-'));
  const file = join(dir, 'test.sqlite');
  let s = openStore(file, { now: () => now });
  try {
    s.ingest(event());
    const revision = s.getConversation('123').revision;
    s.setMode('123', 'human', 'manual');
    assert.equal(s.reserveReply('p:1', revision, 'resposta'), false);
    s.close(); s = openStore(file, { now: () => now });
    assert.equal(s.getConversation('123').mode, 'human');
    s.ingest(event('p:3'));
    assert.equal(s.getConversation('123').mode, 'human');
  } finally { s.close(); rmSync(dir, { recursive: true }); }
});
test('an interrupted send is uncertain and never queued again', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vexel-'));
  const file = join(dir, 'test.sqlite');
  let s = openStore(file, { now: () => now });
  try {
    s.ingest(event()); s.claimNext();
    assert.equal(s.reserveReply('p:1', 0, 'resposta'), true);
    s.close(); s = openStore(file, { now: () => now });
    assert.equal(s.getConversation('123').mode, 'human');
    assert.equal(s.getSend('p:1').status, 'uncertain');
    assert.equal(s.claimNext(), undefined);
  } finally { s.close(); rmSync(dir, { recursive: true }); }
});
test('old timestamps cannot reopen a window, quota survives and history is bounded', () => {
  const s = openStore(':memory:', { now: () => now, historyLimit: 2 });
  try {
    s.ingest(event()); s.ingest({ ...event('p:old'), timestamp: now - 1000 });
    assert.equal(s.getConversation('123').lastInboundAt, now);
    for (let i = 0; i < 3; i++) s.recordMessage('123', 'assistant', String(i));
    assert.deepEqual(s.history('123').map(m => m.text), ['1', '2']);
    assert.equal(s.consumeQuota('123', 1, 2), true);
    assert.equal(s.consumeQuota('123', 1, 2), false);
    assert.equal(s.consumeQuota('456', 1, 2), true);
    assert.equal(s.consumeQuota('789', 1, 2), false);
  } finally { s.close(); }
});
test('a second instance cannot recover or mutate another active database', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vexel-'));
  const file = join(dir, 'test.sqlite');
  const first = openStore(file, { now: () => now });
  let second;
  try {
    first.ingest(event()); first.claimNext(); first.reserveReply('p:1', 0, 'Em envio');
    assert.throws(() => { second = openStore(file); }, /database_in_use/);
    assert.equal(first.getSend('p:1').status, 'sending');
  } finally { second?.close(); first.close(); rmSync(dir, { recursive: true }); }
});
test('restart recovers a dead process lock and pauses its uncertain send', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vexel-'));
  const file = join(dir, 'test.sqlite');
  const moduleUrl = new URL('../src/store.mjs', import.meta.url).href;
  const script = `import {openStore} from ${JSON.stringify(moduleUrl)}; const s=openStore(process.argv[1]); s.ingest({id:'p:1',phoneNumberId:'p',contactId:'123',timestamp:Date.now(),kind:'text',text:'Oi'}); s.claimNext(); s.reserveReply('p:1',0,'resposta'); process.exit(0);`;
  const child = spawnSync(process.execPath, ['--input-type=module', '-e', script, file], { encoding: 'utf8' });
  assert.equal(child.status, 0, child.stderr);
  const s = openStore(file);
  try {
    assert.equal(s.getConversation('123').mode, 'human');
    assert.equal(s.getSend('p:1').status, 'uncertain');
    assert.equal(s.claimNext(), undefined);
  } finally { s.close(); rmSync(dir, { recursive: true }); }
});
test('a confirmed batched reply is recovered without absorbing a new message after restart', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vexel-batch-recovery-'));
  const file = join(dir, 'test.sqlite');
  let clock = now, s = openStore(file, { now: () => clock });
  const timing = { debounceMs: 3000, maxWaitMs: 8000, isImmediate: () => false };
  try {
    s.ingest({ ...event('p:1'), timestamp: clock, text: 'primeira' });
    clock += 1000;
    s.ingest({ ...event('p:2'), timestamp: clock, text: 'segunda' });
    clock += 3000;
    const batch = s.claimNext({ ...timing, now: clock });
    assert.deepEqual(batch.batchIds, ['p:1', 'p:2']);
    assert.equal(s.reserveReply(batch.id, 0, 'Resposta conjunta'), true);
    s.completeSend(batch.id, 'sent-1', 'p:2');
    s.close();

    clock += 1000;
    s = openStore(file, { now: () => clock });
    s.ingest({ ...event('p:3'), timestamp: clock, text: 'mensagem nova' });
    clock += 3000;
    const next = s.claimNext({ ...timing, now: clock });
    assert.equal(next.text, 'mensagem nova');
    assert.deepEqual(next.batchIds, ['p:3']);
  } finally { s.close(); rmSync(dir, { recursive: true }); }
});
