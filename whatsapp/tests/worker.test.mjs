import test from 'node:test';
import assert from 'node:assert/strict';
import { openStore } from '../src/store.mjs';
import { processNext } from '../src/worker.mjs';
import { readConfig } from '../src/config.mjs';
const time = 1800000000000;
const event = (id = 'p:1', text = 'Quero um site', contactId = '5511000000000') => ({ id, contactId, phoneNumberId: 'p', timestamp: time, kind: 'text', text });
function setup(t, config = {}) {
  let clock = time;
  const store = openStore(':memory:', { now: () => clock }); t.after(() => store.close());
  const sent = [], inputs = [];
  const deps = { store, config: { ...readConfig({}), messageDebounceMs: 0, ...config }, now: () => clock,
    generate: async input => { inputs.push(input); return { reply: 'Qual o objetivo?', handoff: false, summary: 'Novo site' }; },
    sendText: async input => { sent.push(input); return { id: `sent-${sent.length}` }; } };
  return { store, sent, inputs, deps, advance: ms => { clock += ms; } };
}
test('ordered queue isolates clients and does not include future inbound text in context', async t => {
  const { store, deps, sent, inputs } = setup(t);
  store.ingest(event('p:2', 'segundo')); store.ingest({ ...event('p:1', 'primeiro'), timestamp: time - 1000 });
  store.ingest(event('p:3', 'outro cliente', '5511999999999'));
  await processNext(deps); await processNext(deps); await processNext(deps);
  assert.deepEqual(inputs.map(i => i.text), ['primeiro', 'segundo', 'outro cliente']);
  assert.equal(inputs[0].history.some(m => m.text === 'segundo'), false);
  assert.equal(inputs[1].history.some(m => m.role === 'assistant' && m.text === 'Qual o objetivo?'), true);
  assert.equal(inputs[2].history.some(m => m.text === 'primeiro'), false);
  assert.equal(sent.length, 3); assert.equal(await processNext(deps), false);
});
test('human request pauses without model and acknowledgement is not duplicated', async t => {
  const { store, deps, sent, inputs } = setup(t);
  store.ingest(event('p:1', 'Quero falar com o Fabricio'));
  await processNext(deps);
  assert.equal(store.getConversation('5511000000000').mode, 'human');
  assert.equal(inputs.length, 0); assert.equal(sent.length, 1);
  store.ingest(event('p:2', 'mais detalhes')); await processNext(deps);
  assert.equal(sent.length, 1);
});
test('monthly outbound limit includes handoff replies and pauses without another API or model call', async t => {
  const { deps, sent, inputs } = setup(t);
  // Use a separate store with a small real monthly limit for this boundary test.
  const limited = openStore(':memory:', { now: () => time, outboundMonthlyLimit: 1 });
  t.after(() => limited.close()); deps.store = limited;
  limited.ingest(event('p:1', 'Quero falar com o Fabricio'));
  await processNext(deps); assert.equal(sent.length, 1);
  limited.ingest(event('p:2', 'Quero um site', '5511888888888'));
  await processNext(deps);
  assert.equal(sent.length, 1); assert.equal(inputs.length, 0);
  assert.equal(limited.getConversation('5511888888888').mode, 'human');
  assert.equal(limited.getConversation('5511888888888').reason, 'monthly_limit');
});
test('manual message during generation invalidates pending reply', async t => {
  const { store, deps, sent } = setup(t); store.ingest(event());
  deps.generate = async () => {
    store.ingest({ ...event('p:manual'), kind: 'manual', metaId: 'manual' });
    return { reply: 'Não deve sair', handoff: false, summary: '' };
  };
  await processNext(deps);
  assert.equal(sent.length, 0); assert.equal(store.getConversation('5511000000000').mode, 'human');
});
test('API echo does not pause its own conversation', async t => {
  const { store, deps } = setup(t); store.ingest(event()); await processNext(deps);
  store.ingest({ ...event('p:manual:sent-1'), kind: 'manual', metaId: 'sent-1' });
  assert.equal(store.getConversation('5511000000000').mode, 'auto');
});
test('window closes during generation and no free-form message is sent', async t => {
  const { store, deps, sent, advance } = setup(t); store.ingest(event());
  deps.generate = async () => { advance(86400000); return { reply: 'Tarde demais', handoff: false, summary: '' }; };
  await processNext(deps); assert.equal(sent.length, 0);
});
test('expired events and future timestamps cannot trigger a reply', async t => {
  const { store, deps, sent, inputs } = setup(t);
  store.ingest({ ...event(), timestamp: time - 86400001 });
  await processNext(deps);
  store.ingest({ ...event('p:future', 'Oi', '5511999999999'), timestamp: time + 999999 });
  await processNext(deps);
  assert.equal(sent.length, 0); assert.equal(inputs.length, 0);
});
test('media, oversized input and exhausted quota hand off without model', async t => {
  const { store, deps, sent, inputs } = setup(t, { contactDailyLimit: 1 });
  store.ingest({ ...event(), kind: 'media' }); await processNext(deps);
  store.setMode('5511000000000', 'auto');
  store.ingest(event('p:2', 'x'.repeat(4001))); await processNext(deps);
  store.setMode('5511000000000', 'auto');
  store.ingest(event('p:3')); await processNext(deps);
  store.ingest(event('p:4')); await processNext(deps);
  assert.equal(inputs.length, 1); assert.equal(sent.length, 4);
  assert.equal(store.getConversation('5511000000000').reason, 'quota');
});
test('model failure and model handoff both persist a human queue entry', async t => {
  const { store, deps, sent } = setup(t); store.ingest(event());
  deps.generate = async () => { throw new Error('sensitive error must not escape'); };
  await processNext(deps);
  assert.equal(store.getConversation('5511000000000').reason, 'assistant_unavailable');
  assert.equal(JSON.stringify(sent).includes('sensitive'), false);
  store.setMode('5511000000000', 'auto'); store.ingest(event('p:2'));
  deps.generate = async () => ({ reply: 'Seu pedido ficou registrado para o Fabricio.', handoff: true, summary: 'Pedido de orçamento de site' });
  await processNext(deps);
  assert.equal(store.getConversation('5511000000000').summary, 'Pedido de orçamento de site');
  assert.equal(store.getConversation('5511000000000').mode, 'human');
});
test('handoff acknowledgement never leaves a follow-up question for a paused bot', async t => {
  const { store, deps, sent } = setup(t); store.ingest(event());
  deps.generate = async () => ({ reply: 'Posso registrar. Quantas páginas você deseja?', handoff: true, summary: 'Cliente precisa de avaliação humana.' });
  await processNext(deps);
  assert.equal(sent[0].text.includes('?'), false);
  assert.match(sent[0].text, /registrado.*Fabricio/);
});
test('unknown send result is not retried or reopened automatically', async t => {
  const { store, deps } = setup(t); store.ingest(event()); let calls = 0;
  deps.sendText = async () => { calls++; throw Object.assign(new Error('transport'), { outcome: 'uncertain' }); };
  await processNext(deps); await processNext(deps);
  assert.equal(calls, 1); assert.equal(store.getSend('p:1').status, 'uncertain');
  assert.equal(store.getConversation('5511000000000').mode, 'human');
});
test('resume only handles new messages, not backlog received during human control', async t => {
  const { store, deps, sent, inputs } = setup(t);
  store.ingest(event('p:old-auto', 'Mensagem antes de assumir'));
  store.setMode('5511000000000', 'human', 'admin_control');
  store.ingest(event('p:during-human', 'Mensagem para o Fabricio'));
  store.setMode('5511000000000', 'auto', 'admin_control');
  while (await processNext(deps)) {}
  assert.equal(inputs.length, 0); assert.equal(sent.length, 0);
  store.ingest(event('p:after-resume', 'Nova mensagem para a IA'));
  await processNext(deps);
  assert.equal(inputs.length, 1); assert.equal(sent.length, 1);
});
test('unexpected persistence failure leaves a visible handoff rather than losing the event', async t => {
  const { store, deps, sent } = setup(t);
  store.ingest(event());
  const consumeQuota = store.consumeQuota;
  store.consumeQuota = () => { throw new Error('temporary database failure'); };
  await assert.rejects(processNext(deps), /processing_failed/);
  store.consumeQuota = consumeQuota;
  assert.equal(store.getConversation('5511000000000').mode, 'human');
  assert.equal(store.getConversation('5511000000000').reason, 'processing_failed');
  assert.ok(store.getConversation('5511000000000').summary.length > 0);
  assert.equal(sent.length, 0);
});
test('three out-of-order incoming events produce correctly interleaved model history', async t => {
  const { store, deps, inputs } = setup(t);
  store.ingest({ ...event('p:2', 'segundo'), timestamp: time - 1000 });
  store.ingest({ ...event('p:1', 'primeiro'), timestamp: time - 2000 });
  store.ingest(event('p:3', 'terceiro'));
  deps.generate = async input => { inputs.push(input); return { reply: `Resposta para ${input.text}`, handoff: false, summary: '' }; };
  await processNext(deps); await processNext(deps); await processNext(deps);
  assert.deepEqual(inputs[2].history.map(m => `${m.role}:${m.text}`), ['user:primeiro', 'assistant:Resposta para primeiro', 'user:segundo', 'assistant:Resposta para segundo']);
});
test('consecutive text messages wait for silence and produce one joined AI turn', async t => {
  const { store, deps, sent, inputs, advance } = setup(t, { messageDebounceMs: 3000, messageBatchMaxWaitMs: 8000 });
  store.ingest(event('p:1', 'Preciso de um site'));
  assert.equal(await processNext(deps), false);
  advance(2000);
  store.ingest(event('p:2', 'para minha cafeteria'));
  advance(2999);
  assert.equal(await processNext(deps), false);
  advance(1);
  assert.equal(await processNext(deps), true);
  assert.deepEqual(inputs.map(input => input.text), ['Preciso de um site\npara minha cafeteria']);
  assert.equal(sent.length, 1);
  assert.equal(await processNext(deps), false);
  advance(1);
  store.ingest(event('p:3', 'mais um detalhe'));
  advance(3000);
  assert.equal(await processNext(deps), true);
  assert.deepEqual(inputs[1].history.slice(-3).map(message => `${message.role}:${message.text}`), [
    'user:Preciso de um site', 'user:para minha cafeteria', 'assistant:Qual o objetivo?',
  ]);
});
test('a message stream is released by the eight-second cap', async t => {
  const { store, deps, inputs, advance } = setup(t, { messageDebounceMs: 3000, messageBatchMaxWaitMs: 8000 });
  store.ingest(event('p:1', 'primeira'));
  for (const [id, text] of [['p:2', 'segunda'], ['p:3', 'terceira'], ['p:4', 'quarta']]) {
    advance(2000);
    store.ingest(event(id, text));
  }
  advance(1999);
  assert.equal(await processNext(deps), false);
  advance(1);
  assert.equal(await processNext(deps), true);
  assert.deepEqual(inputs.map(input => input.text), ['primeira\nsegunda\nterceira\nquarta']);
});
test('a waiting contact does not delay another contact whose silence window elapsed', async t => {
  const { store, deps, inputs, advance } = setup(t, { messageDebounceMs: 3000, messageBatchMaxWaitMs: 8000 });
  store.ingest(event('p:1', 'mensagem A'));
  advance(2000);
  store.ingest(event('p:2', 'mensagem B', '5511999999999'));
  advance(1000);
  assert.equal(await processNext(deps), true);
  assert.deepEqual(inputs.map(input => input.text), ['mensagem A']);
  assert.equal(await processNext(deps), false);
  advance(2000);
  assert.equal(await processNext(deps), true);
  assert.deepEqual(inputs.map(input => input.text), ['mensagem A', 'mensagem B']);
});
test('explicit human requests bypass the batching delay', async t => {
  const { store, deps, sent, inputs, advance } = setup(t, { messageDebounceMs: 3000, messageBatchMaxWaitMs: 8000 });
  store.ingest(event('p:1', 'Quero saber sobre o site'));
  advance(1000);
  store.ingest(event('p:2', 'quero falar com uma pessoa'));
  assert.equal(await processNext(deps), true);
  assert.equal(inputs.length, 0);
  assert.equal(sent.length, 1);
  assert.equal(store.getConversation('5511000000000').mode, 'human');
});
test('manual takeover during the batching delay discards the pending automatic reply', async t => {
  const { store, deps, sent, inputs, advance } = setup(t, { messageDebounceMs: 3000, messageBatchMaxWaitMs: 8000 });
  store.ingest(event('p:1', 'quero um site'));
  store.ingest({ ...event('p:manual'), kind: 'manual', metaId: 'manual' });
  assert.equal(await processNext(deps), false);
  advance(3000);
  assert.equal(await processNext(deps), true);
  assert.equal(inputs.length, 0);
  assert.equal(sent.length, 0);
  assert.equal(store.getConversation('5511000000000').mode, 'human');
});
test('messages from before and after manual pause/resume are never joined', async t => {
  const { store, deps, inputs, advance } = setup(t, { messageDebounceMs: 3000, messageBatchMaxWaitMs: 8000 });
  store.ingest(event('p:before', 'texto antes da pausa'));
  store.setMode('5511000000000', 'human', 'admin_control');
  store.setMode('5511000000000', 'auto', 'admin_control');
  advance(1000);
  store.ingest(event('p:after', 'texto depois da retomada'));
  advance(3000);
  assert.equal(await processNext(deps), true);
  assert.equal(await processNext(deps), true);
  assert.deepEqual(inputs.map(input => input.text), ['texto depois da retomada']);
});
test('a queued human request takes priority over an older text whose silence elapsed', async t => {
  const { store, deps, inputs, sent, advance } = setup(t, { messageDebounceMs: 3000, messageBatchMaxWaitMs: 8000 });
  store.ingest(event('p:before', 'quero saber sobre o site'));
  advance(1000);
  store.ingest(event('p:human', 'quero falar com uma pessoa'));
  advance(3000);
  assert.equal(await processNext(deps), true);
  assert.equal(inputs.length, 0);
  assert.equal(sent.length, 1);
  assert.equal(store.getConversation('5511000000000').mode, 'human');
});
