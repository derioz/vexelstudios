const array = value => Array.isArray(value) ? value : [];
/** Coexistence echo schema requires validation against the account's real webhook before activation. */
export function normalizeEvents(payload, phoneNumberId) {
  if (payload?.object !== 'whatsapp_business_account') return [];
  const result = [];
  for (const entry of array(payload.entry)) for (const change of array(entry?.changes)) {
    const value = change?.value;
    if (value?.metadata?.phone_number_id !== phoneNumberId) continue;
    const manual = change.field === 'smb_message_echoes';
    if (!manual && change.field !== 'messages') continue;
    for (const msg of array(manual ? value.message_echoes : value.messages)) {
      const contactId = manual ? msg?.to : msg?.from;
      const timestamp = Number(msg?.timestamp) * 1000;
      if (typeof msg?.id !== 'string' || msg.id.length > 256 || !/^\d{1,20}$/.test(contactId || '') || !Number.isSafeInteger(timestamp) || timestamp <= 0) continue;
      const kind = manual ? 'manual' : msg.type === 'text' ? 'text' : 'media';
      if (kind === 'text' && typeof msg.text?.body !== 'string') continue;
      result.push({ id: `${phoneNumberId}:${manual ? 'manual:' : ''}${msg.id}`, phoneNumberId, contactId, timestamp, kind,
        ...(kind === 'text' ? { text: msg.text.body } : {}), ...(manual ? { metaId: msg.id } : {}) });
    }
  }
  return result;
}

export function createMetaClient(config, fetchImpl = fetch) {
  return {
    async sendText({ contactId, text, signal }) {
      let outcome = 'uncertain';
      try {
        const timeout = AbortSignal.timeout(config.timeoutMs);
        const response = await fetchImpl(`https://graph.facebook.com/${config.graphVersion}/${config.phoneNumberId}/messages`, {
          method: 'POST', headers: { Authorization: `Bearer ${config.accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ messaging_product: 'whatsapp', recipient_type: 'individual', to: contactId, type: 'text', text: { preview_url: false, body: text } }),
          signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
        });
        if (!response.ok) {
          // A 5xx may follow processing on the upstream server; never retry it blindly.
          outcome = response.status < 500 ? 'rejected' : 'uncertain';
          throw new Error('meta_response_error');
        }
        const data = await response.json();
        if (typeof data.messages?.[0]?.id !== 'string' || !data.messages[0].id) throw new Error('meta_missing_id');
        return { id: data.messages[0].id };
      } catch {
        throw Object.assign(new Error('meta_send_failed'), { outcome });
      }
    },
  };
}
