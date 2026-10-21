import { immediateHandoff, validateDecision } from './assistant.mjs';

const acknowledgement = 'Seu pedido ficou registrado para atendimento do Fabricio. A partir de agora, o atendimento continua com ele.';

/** Process one durable event. Run a single worker per database. No outbound retry on uncertainty. */
export async function processNext({ store, generate, sendText, now = Date.now, config }) {
  const event = store.claimNext({ now: now(), debounceMs: config.messageDebounceMs, maxWaitMs: config.messageBatchMaxWaitMs,
    isImmediate: item => item.kind === 'media' || (item.kind === 'text' && immediateHandoff(item.text)) });
  if (!event) return false;
  const c = store.getConversation(event.contactId);
  const stillAuto = () => {
    const current = store.getConversation(event.contactId);
    return current.mode === 'auto' && current.revision === c.revision;
  };
  const send = async (text, revision, handoff = false) => {
    if (!store.reserveReply(event.id, revision, text, { handoff })) return;
    try {
      const result = await sendText({ contactId: event.contactId, text });
      store.completeSend(event.id, result.id, event.batchIds?.at(-1) || event.id);
    } catch (error) {
      store.failSend(event.id, error.outcome || 'uncertain');
    }
  };
  const handoff = async (reason, summary, reply = acknowledgement) => {
    if (!stillAuto()) return;
    const paused = store.setMode(event.contactId, 'human', reason);
    store.saveHandoff(event.contactId, summary);
    await send(reply, paused.revision, true);
  };
  let infrastructureFailure = false;
  try {
    if (c.mode === 'human' || event.controlRevision !== c.revision) return true;
    if (event.timestamp > now() || now() - event.timestamp >= 86400000 || now() - c.lastInboundAt >= 86400000) {
      store.setMode(event.contactId, 'human', 'expired');
      store.saveHandoff(event.contactId, 'Mensagem fora da janela permitida; avaliar contato manualmente.');
      return true;
    }
    if (!store.hasSendBudget()) {
      store.setMode(event.contactId, 'human', 'monthly_limit');
      store.saveHandoff(event.contactId, 'Limite mensal de envios automáticos atingido. Continuar pelo aplicativo Business; nenhuma confirmação automática foi enviada.');
      return true;
    }
    if (event.kind === 'media') { await handoff('media', 'Cliente enviou um anexo. Avaliar no WhatsApp.'); return true; }
    if (event.text.length > config.inputLimit) { await handoff('input_limit', 'Mensagem extensa para avaliação de Fabricio no WhatsApp.'); return true; }
    if (immediateHandoff(event.text)) { await handoff('human_requested', 'Solicitação precisa de atendimento ou avaliação de Fabricio. Consulte a conversa no WhatsApp.'); return true; }
    if (!store.consumeQuota(event.contactId, config.contactDailyLimit, config.globalDailyLimit)) {
      await handoff('quota', 'Limite de atendimento automático atingido. Continuar manualmente.'); return true;
    }
    const abort = new AbortController();
    const monitor = setInterval(() => { if (!stillAuto()) abort.abort(); }, 50);
    monitor.unref();
    let decision;
    try {
      // Exclude current and future inbound events while preserving prior assistant replies.
      const history = store.history(event.contactId, { beforeEventId: event.id });
      decision = validateDecision(await generate({ history, text: event.text, summary: c.summary, signal: abort.signal }));
    } catch {
      await handoff('assistant_unavailable', 'Não foi possível concluir o atendimento automático. Avaliar a conversa no WhatsApp.');
      return true;
    } finally { clearInterval(monitor); }
    if (!stillAuto()) return true;
    if (decision.handoff) await handoff('handoff', decision.summary || 'Cliente precisa de atendimento humano.');
    else {
      store.saveHandoff(event.contactId, decision.summary);
      await send(decision.reply, c.revision);
    }
    return true;
  } catch {
    infrastructureFailure = true;
    try {
      const outgoing = store.getSend(event.id);
      if (outgoing?.status === 'sending') store.failSend(event.id, 'uncertain');
      else store.setMode(event.contactId, 'human', 'processing_failed');
      store.saveHandoff(event.contactId, 'Falha no processamento automático. Conferir a conversa e qualquer envio antes de continuar manualmente.');
      store.finishBatch(event.batchIds || [event.id], 'failed');
    } catch {
      // If storage is unavailable, leave processing/sending intact for startup recovery.
    }
    throw new Error('processing_failed');
  } finally { if (!infrastructureFailure) store.finishBatch(event.batchIds || [event.id], 'done'); }
}
