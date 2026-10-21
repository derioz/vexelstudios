import test from 'node:test';
import assert from 'node:assert/strict';
import { createMetaClient, normalizeEvents } from '../src/meta.mjs';
const payload = changes => ({ object: 'whatsapp_business_account', entry: [{ changes }] });
const value = { metadata: { phone_number_id: '123' }, messages: [{ id: 'wamid.1', from: '5511000000000', timestamp: '1800000000', type: 'text', text: { body: 'Olá' } }] };
test('only inbound events for configured number are queued, not status or history', () => {
  const events = normalizeEvents(payload([{ field: 'messages', value }, { field: 'messages', value: { ...value, metadata: { phone_number_id: '999' } } }, { field: 'history', value }, { field: 'messages', value: { metadata: value.metadata, statuses: [{ id: 's' }] } }]), '123');
  assert.deepEqual(events, [{ id: '123:wamid.1', phoneNumberId: '123', contactId: '5511000000000', timestamp: 1800000000000, kind: 'text', text: 'Olá' }]);
  assert.deepEqual(normalizeEvents({ entry: {} }, '123'), []);
});
test('media never downloads files; manual echoes identify recipient and original message', () => {
  const events = normalizeEvents(payload([{ field: 'messages', value: { ...value, messages: [{ ...value.messages[0], type: 'audio', audio: { id: 'secret-media' } }] } }, { field: 'smb_message_echoes', value: { metadata: value.metadata, message_echoes: [{ id: 'echo', from: '5511111111111', to: '5511000000000', timestamp: '1800000000', type: 'text', text: { body: 'manual' } }] } }]), '123');
  assert.equal(events[0].kind, 'media');
  assert.equal('audio' in events[0], false);
  assert.equal(events[1].kind, 'manual');
  assert.equal(events[1].contactId, '5511000000000');
  assert.equal(events[1].metaId, 'echo');
});
test('send uses configured Graph endpoint; transport uncertainty is never retried', async () => {
  let calls = 0;
  const client = createMetaClient({ graphVersion: 'v25.0', phoneNumberId: '123', accessToken: 'test', timeoutMs: 1000 }, async (url, init) => {
    calls++;
    assert.equal(url, 'https://graph.facebook.com/v25.0/123/messages');
    const body = JSON.parse(init.body);
    assert.equal(body.to, '5511000000000'); assert.equal(body.type, 'text');
    assert.equal(body.text.body, 'Olá');
    throw new TypeError('network fail');
  });
  await assert.rejects(client.sendText({ contactId: '5511000000000', text: 'Olá' }), e => e.outcome === 'uncertain');
  assert.equal(calls, 1);
});
test('known rejection differs from missing delivery ID', async () => {
  const cfg = { graphVersion: 'v25.0', phoneNumberId: '123', accessToken: 'test', timeoutMs: 1000 };
  await assert.rejects(createMetaClient(cfg, async () => new Response('{}', { status: 400 })).sendText({ contactId: '1', text: 'Oi' }), e => e.outcome === 'rejected');
  await assert.rejects(createMetaClient(cfg, async () => new Response('{}')).sendText({ contactId: '1', text: 'Oi' }), e => e.outcome === 'uncertain');
  assert.deepEqual(await createMetaClient(cfg, async () => Response.json({ messages: [{ id: 'wamid.sent' }] })).sendText({ contactId: '1', text: 'Oi' }), { id: 'wamid.sent' });
});
