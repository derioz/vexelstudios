import test from 'node:test';
import assert from 'node:assert/strict';
import { readConfig } from '../src/config.mjs';
test('simulation does not need keys; live fails closed naming missing variables only', () => {
  assert.equal(readConfig({}).mode, 'simulation');
  assert.throws(() => readConfig({ MODE: 'live' }), /OPENAI_API_KEY/);
  assert.throws(() => readConfig({ PORT: 'invalid' }), /PORT/);
  assert.throws(() => readConfig({ MODE: 'typo' }), /MODE/);
});
test('live needs explicit coexistence validation and independent strong admin token', () => {
  const env = { MODE: 'live', OPENAI_API_KEY: 'fake-key', OPENAI_MODEL: 'configured-model', META_APP_SECRET: 'meta-secret', META_VERIFY_TOKEN: 'verification', META_ACCESS_TOKEN: 'access', META_PHONE_NUMBER_ID: '123', META_GRAPH_VERSION: 'v25.0', ADMIN_TOKEN: 'a'.repeat(32), PUBLIC_ORIGIN: 'https://bot.example.com' };
  assert.throws(() => readConfig(env), /COEXISTENCE_VALIDATED/);
  assert.equal(readConfig({ ...env, COEXISTENCE_VALIDATED: 'true' }).phoneNumberId, '123');
  assert.throws(() => readConfig({ ...env, COEXISTENCE_VALIDATED: 'true', ADMIN_TOKEN: 'short' }), /ADMIN_TOKEN/);
});
test('inbound message batching uses three-second silence and eight-second cap by default', () => {
  const config = readConfig({});
  assert.equal(config.messageDebounceMs, 3000);
  assert.equal(config.messageBatchMaxWaitMs, 8000);
});
test('batch timing is configurable and rejects a maximum shorter than the silence interval', () => {
  const config = readConfig({ MESSAGE_DEBOUNCE_MS: '2500', MESSAGE_BATCH_MAX_WAIT_MS: '7000' });
  assert.equal(config.messageDebounceMs, 2500);
  assert.equal(config.messageBatchMaxWaitMs, 7000);
  assert.throws(() => readConfig({ MESSAGE_DEBOUNCE_MS: '3000', MESSAGE_BATCH_MAX_WAIT_MS: '2000' }), /MESSAGE_BATCH_MAX_WAIT_MS/);
});
