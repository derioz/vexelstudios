import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../../', import.meta.url));
test('simulation exercises handoff and resume with no real credentials or network', () => {
  const result = spawnSync(process.execPath, ['whatsapp/scripts/simulate.mjs'], { cwd: root, encoding: 'utf8', env: { ...process.env, OPENAI_API_KEY: '', META_ACCESS_TOKEN: '' } });
  assert.equal(result.status, 0, result.stderr);
  const steps = JSON.parse(result.stdout);
  assert.deepEqual(steps.map(s => s.mode), ['auto', 'human', 'human', 'auto']);
  assert.deepEqual(steps.map(s => s.sentCount), [1, 2, 2, 3]);
  assert.equal(steps.every(s => s.simulation === true), true);
});
const hostingBuilder = resolve(root, 'scripts/build-hosting.mjs');
test('actual static build excludes server, env files, databases and admin panel', { skip: !existsSync(hostingBuilder) }, () => {
  const result = spawnSync(process.execPath, ['scripts/build-hosting.mjs'], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]); }
  const files = walk(resolve(root, 'firebase-dist'));
  assert.ok(files.length > 10);
  assert.equal(files.some(f => /[\\/](whatsapp|admin|node_modules)[\\/]|\.env(?:\.|$)|\.sqlite(?:-|$)/i.test(f)), false);
});
