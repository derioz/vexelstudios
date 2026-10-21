import { readFileSync } from 'node:fs';
import { json, readBody, safeEqual } from './http.mjs';
const assets = new Map([
  ['/admin', ['index.html', 'text/html; charset=utf-8']],
  ['/admin/', ['index.html', 'text/html; charset=utf-8']],
  ['/admin/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
  ['/admin/style.css', ['style.css', 'text/css; charset=utf-8']],
]);
export async function handleAdmin(req, res, { config, store }) {
  try {
    const path = new URL(req.url, 'http://localhost').pathname;
    if ((req.headers.origin && req.headers.origin !== config.publicOrigin) || req.headers['sec-fetch-site'] === 'cross-site') return json(res, 403, { error: 'forbidden' });
    const asset = assets.get(path);
    // Public login shell only: every endpoint containing customer data requires a token.
    if (req.method === 'GET' && asset) {
      res.writeHead(200, { 'Content-Type': asset[1], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
        'Referrer-Policy': 'no-referrer' });
      return res.end(readFileSync(new URL(`../admin/${asset[0]}`, import.meta.url)));
    }
    if (!safeEqual(req.headers.authorization, `Bearer ${config.adminToken || ''}`) || !config.adminToken) return json(res, 401, { error: 'unauthorized' });
    if (req.method === 'GET' && path === '/admin/conversations') return json(res, 200, { conversations: store.listConversations() });
    const match = path.match(/^\/admin\/conversations\/(\d{1,20})\/mode$/);
    if (req.method === 'POST' && match) {
      let body;
      const raw = await readBody(req, 4096);
      try { body = JSON.parse(raw.toString('utf8')); } catch { return json(res, 400, { error: 'invalid_json' }); }
      if (!body || !['auto', 'human'].includes(body.mode) || Object.keys(body).length !== 1) return json(res, 400, { error: 'invalid_mode' });
      if (!store.getConversation(match[1])) return json(res, 404, { error: 'not_found' });
      return json(res, 200, { conversation: store.setMode(match[1], body.mode, 'admin_control') });
    }
    return json(res, 404, { error: 'not_found' });
  } catch (error) { return json(res, error.status === 413 ? 413 : 503, { error: 'request_failed' }); }
}
