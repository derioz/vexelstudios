import { resolve } from 'node:path';

export function readConfig(env = process.env) {
  const mode = env.MODE || 'simulation';
  if (!['live', 'simulation'].includes(mode)) throw new Error('Invalid MODE');
  const provider = env.WHATSAPP_PROVIDER || 'meta';
  if (!['meta', 'ycloud'].includes(provider)) throw new Error('Invalid WHATSAPP_PROVIDER');
  const number = (name, fallback, max = 1000000) => {
    const n = Number(env[name] ?? fallback);
    if (!Number.isSafeInteger(n) || n < 1 || n > max) throw new Error(`Invalid ${name}`);
    return n;
  };
  const messageDebounceMs = number('MESSAGE_DEBOUNCE_MS', 3000, 60000);
  const messageBatchMaxWaitMs = number('MESSAGE_BATCH_MAX_WAIT_MS', 8000, 60000);
  if (messageBatchMaxWaitMs < messageDebounceMs) throw new Error('Invalid MESSAGE_BATCH_MAX_WAIT_MS');
  const config = {
    mode, provider, host: env.HOST || '127.0.0.1', port: number('PORT', 4190, 65535),
    ycloudApiKey: env.YCLOUD_API_KEY || '', ycloudWebhookSecret: env.YCLOUD_WEBHOOK_SECRET || '',
    ycloudPhoneNumber: env.YCLOUD_PHONE_NUMBER || '', ycloudWabaId: env.YCLOUD_WABA_ID || '',
    dbPath: resolve(env.DB_PATH || 'data/whatsapp.sqlite'),
    apiKey: env.OPENAI_API_KEY || '', model: env.OPENAI_MODEL || '',
    appSecret: env.META_APP_SECRET || '', verifyToken: env.META_VERIFY_TOKEN || '',
    accessToken: env.META_ACCESS_TOKEN || '', phoneNumberId: env.META_PHONE_NUMBER_ID || 'simulation',
    graphVersion: env.META_GRAPH_VERSION || '', adminToken: env.ADMIN_TOKEN || '',
    publicOrigin: env.PUBLIC_ORIGIN || 'http://127.0.0.1:4190',
    coexistenceValidated: env.COEXISTENCE_VALIDATED === 'true',
    historyLimit: number('HISTORY_LIMIT', 20, 40), inputLimit: number('INPUT_LIMIT', 4000, 4000),
    contactDailyLimit: number('CONTACT_DAILY_LIMIT', 30), globalDailyLimit: number('GLOBAL_DAILY_LIMIT', 300),
    outboundMonthlyLimit: number('OUTBOUND_MONTHLY_LIMIT', 900),
    maxOutputTokens: number('MAX_OUTPUT_TOKENS', 800, 4000), timeoutMs: number('TIMEOUT_MS', 30000, 60000),
    messageDebounceMs, messageBatchMaxWaitMs,
    retentionDays: number('RETENTION_DAYS', 30, 365),
  };
  let origin;
  try { origin = new URL(config.publicOrigin); } catch { throw new Error('Invalid PUBLIC_ORIGIN'); }
  if (origin.origin !== config.publicOrigin || origin.username || origin.password) throw new Error('Invalid PUBLIC_ORIGIN');
  if (mode === 'live') {
    const providerKeys = provider === 'meta' ? ['META_APP_SECRET', 'META_VERIFY_TOKEN', 'META_ACCESS_TOKEN', 'META_PHONE_NUMBER_ID', 'META_GRAPH_VERSION'] : ['YCLOUD_API_KEY', 'YCLOUD_WEBHOOK_SECRET', 'YCLOUD_PHONE_NUMBER', 'YCLOUD_WABA_ID'];
    for (const name of ['OPENAI_API_KEY', 'OPENAI_MODEL', 'ADMIN_TOKEN', 'PUBLIC_ORIGIN', ...providerKeys]) {
      if (!env[name]?.trim()) throw new Error(`Missing ${name}`);
    }
    if (provider === 'meta' && !/^v\d+\.\d+$/.test(config.graphVersion)) throw new Error('Invalid META_GRAPH_VERSION');
    if (provider === 'meta' && !/^\d+$/.test(config.phoneNumberId)) throw new Error('Invalid META_PHONE_NUMBER_ID');
    if (provider === 'ycloud' && !/^\+[1-9]\d{5,14}$/.test(config.ycloudPhoneNumber)) throw new Error('Invalid YCLOUD_PHONE_NUMBER');
    if (origin.protocol !== 'https:') throw new Error('PUBLIC_ORIGIN must use HTTPS');
    if (config.adminToken.length < 32 || [config.apiKey, config.appSecret, config.accessToken, config.verifyToken, config.ycloudApiKey, config.ycloudWebhookSecret].includes(config.adminToken)) throw new Error('Invalid ADMIN_TOKEN: use an independent token of at least 32 characters');
    if (!config.coexistenceValidated) throw new Error('COEXISTENCE_VALIDATED must be true after real account validation');
  }
  return config;
}
