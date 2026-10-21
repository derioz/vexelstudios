import { createHmac } from 'node:crypto';
import { readBody, safeEqual, json } from './http.mjs';
import { normalizeEvents } from './meta.mjs';
import { normalizeYCloudEvents, verifyYCloudSignature } from './ycloud.mjs';

export function verifySignature(rawBody, signature, appSecret) {
  if (!appSecret || typeof signature !== 'string' || !/^sha256=[0-9a-f]{64}$/.test(signature)) return false;
  return safeEqual(signature, 'sha256=' + createHmac('sha256', appSecret).update(rawBody).digest('hex'));
}
export async function handleWebhook(req, res, { config, store }) {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'GET') {
      if (config.provider === 'ycloud') return json(res, 405, { error: 'method_not_allowed' });
      if (url.searchParams.get('hub.mode') !== 'subscribe' || !safeEqual(url.searchParams.get('hub.verify_token'), config.verifyToken)) return json(res, 403, { error: 'forbidden' });
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' });
      return res.end(url.searchParams.get('hub.challenge') || '');
    }
    if (req.method !== 'POST') return json(res, 405, { error: 'method_not_allowed' });
    const rawBody = await readBody(req);
    const valid = config.provider === 'ycloud'
      ? verifyYCloudSignature(rawBody, req.headers['ycloud-signature'], config.ycloudWebhookSecret)
      : verifySignature(rawBody, req.headers['x-hub-signature-256'], config.appSecret);
    if (!valid) return json(res, 403, { error: 'forbidden' });
    let payload;
    try { payload = JSON.parse(rawBody.toString('utf8')); } catch { return json(res, 400, { error: 'invalid_json' }); }
    const events = config.provider === 'ycloud' ? normalizeYCloudEvents(payload, config) : normalizeEvents(payload, config.phoneNumberId);
    for (const event of events) store.ingest(event);
    return json(res, 200, { received: true });
  } catch (error) {
    return json(res, error.status === 413 ? 413 : 503, { error: error.status === 413 ? 'body_too_large' : 'temporarily_unavailable' });
  }
}
