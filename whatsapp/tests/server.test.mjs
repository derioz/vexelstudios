import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { openStore } from '../src/store.mjs';
import { readConfig } from '../src/config.mjs';
import { createServer } from '../src/server.mjs';
test('server exposes minimal health, restricted admin and no file directory', async t => {
  const store = openStore(':memory:');
  const server = createServer({ config: { ...readConfig({}), adminToken: 'x'.repeat(32) }, store });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  t.after(async () => { server.closeAllConnections(); await new Promise(r => server.close(r)); store.close(); });
  const base = `http://127.0.0.1:${server.address().port}`;
  assert.deepEqual(await (await fetch(base + '/health')).json(), { ok: true, mode: 'simulation' });
  assert.equal((await fetch(base + '/admin/conversations')).status, 401);
  assert.equal((await fetch(base + '/.env')).status, 404);
  assert.equal((await fetch(base + '/admin')).status, 200);
});
