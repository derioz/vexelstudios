import { createHmac } from 'node:crypto';
import { safeEqual } from './http.mjs';

// YCloud signs `${timestamp}.${raw body}` with the webhook endpoint's secret.
export function verifyYCloudSignature(raw, header, secret, now = Date.now()) {
  if (!secret || typeof header !== 'string') return false;
  const match = /^t=(\d{1,12}),\s*s=([a-f0-9]{64})$/.exec(header);
  if (!match || Math.abs(now - Number(match[1]) * 1000) > 300000) return false;
  return safeEqual(match[2], createHmac('sha256', secret).update(`${match[1]}.`).update(raw).digest('hex'));
}

const phone = value => typeof value === 'string' && /^\+?[1-9]\d{5,14}$/.test(value) ? value.replace(/^\+/, '') : undefined;
export function normalizeYCloudEvents(payload, config) {
  const manual = ['whatsapp.smb.message.created', 'whatsapp.smb.message.echoes'].includes(payload?.type);
  if (!manual && payload?.type !== 'whatsapp.inbound_message.received') return [];
  const msg = manual ? payload.whatsappMessage : payload.whatsappInboundMessage;
  const own = phone(config.ycloudPhoneNumber);
  if (!own || !config.ycloudWabaId || msg?.wabaId !== config.ycloudWabaId || phone(manual ? msg.from : msg.to) !== own) return [];
  const contactId = phone(manual ? msg.to : msg.from);
  const id = msg.wamid || msg.id;
  const timestamp = Date.parse(msg.sendTime);
  if (!contactId || typeof id !== 'string' || !id || id.length > 256 || !Number.isSafeInteger(timestamp) || timestamp <= 0) return [];
  const kind = manual ? 'manual' : msg.type === 'text' ? 'text' : 'media';
  if (kind === 'text' && typeof msg.text?.body !== 'string') return [];
  return [{ id: `ycloud:${own}:${manual ? 'manual:' : ''}${id}`, phoneNumberId: own, contactId, timestamp, kind,
    ...(kind === 'text' ? { text: msg.text.body } : {}), ...(manual ? { metaId: id } : {}) }];
}

export function createYCloudClient(config, fetchImpl = fetch) {
  return {
    async sendText({ contactId, text, signal }) {
      let outcome = 'uncertain';
      try {
        const timeout = AbortSignal.timeout(config.timeoutMs);
        const response = await fetchImpl('https://api.ycloud.com/v2/whatsapp/messages/sendDirectly', {
          method: 'POST', headers: { 'X-API-Key': config.ycloudApiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: config.ycloudPhoneNumber, to: `+${contactId}`, type: 'text', text: { body: text, preview_url: false } }),
          signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
        });
        if (!response.ok) {
          outcome = response.status < 500 ? 'rejected' : 'uncertain';
          throw new Error('ycloud_response_error');
        }
        const data = await response.json();
        // A WhatsApp ID is needed to distinguish our own echoes from manual replies.
        if (typeof data.wamid !== 'string' || !data.wamid) throw new Error('ycloud_missing_wamid');
        return { id: data.wamid };
      } catch { throw Object.assign(new Error('ycloud_send_failed'), { outcome }); }
    },
  };
}
