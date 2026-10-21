import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { normalizeYCloudEvents, verifyYCloudSignature, createYCloudClient } from '../src/ycloud.mjs';
import { readConfig } from '../src/config.mjs';
import { openStore } from '../src/store.mjs';
import { createServer } from '../src/server.mjs';
import { once } from 'node:events';

const config = { ycloudPhoneNumber: '+5511936248758', ycloudWabaId: 'waba', ycloudApiKey: 'fake-key', timeoutMs: 1000 };
const message = { id: 'provider-id', wamid: 'wamid.test', wabaId: 'waba', from: '+5511999999999', to: config.ycloudPhoneNumber, sendTime: new Date().toISOString(), type: 'text', text: { body: 'Olá' } };
test('YCloud signatures bind timestamp and raw bytes and reject expired or malformed headers', () => {
  const now = Date.now(), t = Math.floor(now / 1000), raw = Buffer.from('{}');
  const signature = `t=${t},s=${createHmac('sha256', 'secret').update(`${t}.`).update(raw).digest('hex')}`;
  assert.equal(verifyYCloudSignature(raw, signature, 'secret', now), true);
  assert.equal(verifyYCloudSignature(Buffer.from('{ }'), signature, 'secret', now), false);
  assert.equal(verifyYCloudSignature(raw, signature, 'secret', now + 301000), false);
  assert.equal(verifyYCloudSignature(raw, signature, '', now), false);
  assert.equal(verifyYCloudSignature(raw, 'invalid', 'secret', now), false);
});
test('YCloud filters business identity and history; duplicate manual echoes pause once', () => {
  const incoming = { type: 'whatsapp.inbound_message.received', whatsappInboundMessage: message };
  const [event] = normalizeYCloudEvents(incoming, config);
  assert.equal(event.contactId, '5511999999999'); assert.equal(event.text, 'Olá');
  assert.equal(normalizeYCloudEvents({ ...incoming, type: 'whatsapp.smb.message.history' }, config).length, 0);
  assert.equal(normalizeYCloudEvents(incoming, { ...config, ycloudWabaId: 'other' }).length, 0);
  assert.equal(normalizeYCloudEvents(incoming, { ...config, ycloudPhoneNumber: '+5511000000000' }).length, 0);
  const store = openStore(':memory:');
  try {
    store.ingest(event);
    const echo = { type: 'whatsapp.smb.message.created', whatsappMessage: { ...message, from: message.to, to: message.from } };
    const [manual] = normalizeYCloudEvents(echo, config);
    assert.equal(manual.metaId, 'wamid.test'); store.ingest(manual);
    const revision = store.getConversation(event.contactId).revision;
    store.ingest(normalizeYCloudEvents({ ...echo, type: 'whatsapp.smb.message.echoes' }, config)[0]);
    assert.equal(store.getConversation(event.contactId).mode, 'human');
    assert.equal(store.getConversation(event.contactId).revision, revision);
  } finally { store.close(); }
});
test('YCloud sends plain text directly with API header; uncertain sends are never retried', async () => {
  let calls = 0;
  const client = createYCloudClient(config, async (url, init) => {
    calls++; assert.equal(url, 'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly');
    assert.equal(init.headers['X-API-Key'], 'fake-key');
    assert.deepEqual(JSON.parse(init.body), { from: config.ycloudPhoneNumber, to: '+5511999999999', type: 'text', text: { body: 'Resposta', preview_url: false } });
    return Response.json({ id: 'provider-id', wamid: 'wamid.sent' });
  });
  assert.deepEqual(await client.sendText({ contactId: '5511999999999', text: 'Resposta' }), { id: 'wamid.sent' });
  assert.equal(calls, 1);
  for (const [status, outcome] of [[400, 'rejected'], [503, 'uncertain']]) {
    let attempts = 0;
    const failing = createYCloudClient(config, async () => { attempts++; return new Response('', { status }); });
    await assert.rejects(failing.sendText({ contactId: '5511999999999', text: 'x' }), error => error.outcome === outcome);
    assert.equal(attempts, 1);
  }
});
test('live YCloud requires its own credentials and coexistence validation', () => {
  const env = { MODE: 'live', WHATSAPP_PROVIDER: 'ycloud', OPENAI_API_KEY: 'key', OPENAI_MODEL: 'model', ADMIN_TOKEN: 'a'.repeat(32), PUBLIC_ORIGIN: 'https://bot.example.com', YCLOUD_API_KEY: 'ycloud', YCLOUD_WEBHOOK_SECRET: 'secret', YCLOUD_PHONE_NUMBER: config.ycloudPhoneNumber, YCLOUD_WABA_ID: 'waba' };
  assert.throws(() => readConfig(env), /COEXISTENCE_VALIDATED/);
  assert.equal(readConfig({ ...env, COEXISTENCE_VALIDATED: 'true' }).provider, 'ycloud');
  assert.throws(() => readConfig({ ...env, YCLOUD_API_KEY: '' }), /YCLOUD_API_KEY/);
  assert.throws(() => readConfig({ WHATSAPP_PROVIDER: 'unknown' }), /WHATSAPP_PROVIDER/);
});
test('HTTP YCloud webhook rejects Meta signatures and persists signed inbound and manual events', async t => {
  const store = openStore(':memory:');
  const secret = 'webhook-secret';
  const server = createServer({ config: { ...config, provider: 'ycloud', ycloudWebhookSecret: secret }, store });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}/webhook`;
  t.after(async () => { server.closeAllConnections(); await new Promise(r => server.close(r)); store.close(); });
  const post = async payload => {
    const body = JSON.stringify(payload), timestamp = Math.floor(Date.now() / 1000);
    const signature = `t=${timestamp},s=${createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex')}`;
    return fetch(base, { method: 'POST', body, headers: { 'YCloud-Signature': signature } });
  };
  assert.equal((await fetch(base, { method: 'POST', body: '{}', headers: { 'x-hub-signature-256': 'sha256=' + createHmac('sha256', secret).update('{}').digest('hex') } })).status, 403);
  assert.equal((await post({ type: 'whatsapp.inbound_message.received', whatsappInboundMessage: message })).status, 200);
  assert.equal(store.history('5511999999999').length, 1);
  assert.equal((await post({ type: 'whatsapp.smb.message.echoes', whatsappMessage: { ...message, from: message.to, to: message.from } })).status, 200);
  assert.equal(store.getConversation('5511999999999').mode, 'human');
});
