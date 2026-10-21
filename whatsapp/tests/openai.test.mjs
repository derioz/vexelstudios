import test from 'node:test';
import assert from 'node:assert/strict';
import { createOpenAIClient } from '../src/openai.mjs';
const config = { apiKey: 'fake-secret', model: 'configured-model', timeoutMs: 1000, maxOutputTokens: 800, historyLimit: 2 };
const response = text => ({ id: 'resp_test', object: 'response', status: 'completed', output: [{ type: 'message', role: 'assistant', status: 'completed', content: [{ type: 'output_text', text }] }] });
test('Responses request keeps keys in headers and bounds context with strict schema', async () => {
  const client = createOpenAIClient(config, async (url, init) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    assert.equal(init.headers.Authorization, 'Bearer fake-secret');
    const body = JSON.parse(init.body);
    assert.equal(body.model, 'configured-model'); assert.equal(body.store, false);
    assert.equal(body.max_output_tokens, 800);
    assert.equal(body.text.format.type, 'json_schema'); assert.equal(body.text.format.strict, true);
    assert.equal('tools' in body, false);
    assert.equal(init.body.includes('fake-secret'), false);
    assert.equal(body.input.some(m => m.content.includes('old')), false);
    assert.equal(body.input.at(-1).content, 'Quero um site');
    return Response.json(response(JSON.stringify({ reply: 'Qual é o objetivo do site?', handoff: false, summary: '' })));
  });
  assert.equal((await client.generate({ history: [{ role: 'user', text: 'old' }, { role: 'user', text: 'loja' }, { role: 'assistant', text: 'Olá' }], text: 'Quero um site', summary: '' })).reply, 'Qual é o objetivo do site?');
});
test('refusal, incomplete, malformed and upstream errors become safe typed errors', async () => {
  const cases = [
    response('not JSON'),
    { ...response('{}'), status: 'incomplete' },
    { ...response('{}'), output: [{ type: 'message', content: [{ type: 'refusal', refusal: 'No' }] }] },
    response('{"reply":"Oi","handoff":false,"summary":3}'),
  ];
  for (const body of cases) {
    const client = createOpenAIClient(config, async () => Response.json(body));
    await assert.rejects(client.generate({ history: [], text: 'Oi' }), e => e.code === 'assistant_unavailable' && !e.message.includes('fake-secret'));
  }
  await assert.rejects(createOpenAIClient(config, async () => new Response('secret error', { status: 429 })).generate({ history: [], text: 'Oi' }), /assistant_unavailable/);
});
