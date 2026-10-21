import { createServer as httpServer } from 'node:http';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readConfig } from './config.mjs';
import { openStore } from './store.mjs';
import { handleAdmin } from './admin.mjs';
import { handleWebhook } from './webhook.mjs';
import { json } from './http.mjs';
import { createMetaClient } from './meta.mjs';
import { createYCloudClient } from './ycloud.mjs';
import { createOpenAIClient } from './openai.mjs';
import { processNext } from './worker.mjs';
import { simulateDecision } from './simulation.mjs';

export function createServer({ config, store }) {
  const server = httpServer(async (req, res) => {
    try {
      const path = new URL(req.url, 'http://localhost').pathname;
      if (path === '/health' && req.method === 'GET') return json(res, 200, { ok: true, mode: config.mode });
      if (path === '/webhook') return await handleWebhook(req, res, { config, store });
      if (path === '/admin' || path.startsWith('/admin/')) return await handleAdmin(req, res, { config, store });
      return json(res, 404, { error: 'not_found' });
    } catch { if (!res.headersSent) json(res, 503, { error: 'temporarily_unavailable' }); else res.end(); }
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.maxRequestsPerSocket = 100;
  return server;
}

async function main() {
  const config = readConfig();
  const store = openStore(config.dbPath, config);
  store.prune();
  const server = createServer({ config, store });
  const generate = config.mode === 'live' ? createOpenAIClient(config).generate : simulateDecision;
  let serial = 0;
  const client = config.provider === 'ycloud' ? createYCloudClient : createMetaClient;
  const sendText = config.mode === 'live' ? client(config).sendText : async () => ({ id: `simulation-${++serial}` });
  let busy = false, stopped = false, active = Promise.resolve();
  const timer = setInterval(() => {
    if (busy || stopped) return;
    busy = true;
    active = processNext({ config, store, generate, sendText }).catch(() => {
      // No customer content or provider error bodies in logs.
      console.error('worker_processing_failed');
    }).finally(() => { busy = false; });
  }, 250);
  const cleanup = setInterval(() => { try { store.prune(); } catch { console.error('retention_cleanup_failed'); } }, 3600000);
  timer.unref(); cleanup.unref();
  server.listen(config.port, config.host, () => {
    console.log(`Vexel atendimento: ${config.mode}; painel em http://${config.host}:${config.port}/admin`);
    if (!config.adminToken) console.log('Configure ADMIN_TOKEN localmente para acessar as conversas.');
  });
  const shutdown = async () => {
    if (stopped) return;
    stopped = true; clearInterval(timer); clearInterval(cleanup);
    await Promise.all([active, new Promise(r => { server.close(r); server.closeIdleConnections(); })]);
    store.close();
  };
  process.once('SIGINT', shutdown); process.once('SIGTERM', shutdown);
  server.on('error', () => { console.error('server_start_failed'); shutdown(); process.exitCode = 1; });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(() => { console.error('startup_failed: check local configuration'); process.exitCode = 1; });
}
