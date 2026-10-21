import { immediateHandoff } from './assistant.mjs';
/** Deterministic local demo, not an OpenAI response or a live WhatsApp integration. */
export async function simulateDecision({ text, history = [] }) {
  if (immediateHandoff(text)) return { reply: 'Seu pedido ficou registrado para o Fabricio.', handoff: true, summary: 'Solicitação de atendimento humano.' };
  if (/orçamento|orcamento|contratar|reclamação/i.test(text)) return { reply: 'Seu pedido ficou registrado para avaliação do Fabricio.', handoff: true, summary: 'Pedido comercial para avaliação humana (simulação).' };
  return { reply: `${history.length ? '' : 'Olá! Sou o assistente virtual da Vexel Studios. '}Qual é o principal objetivo do seu projeto?`, handoff: false, summary: 'Contato de demonstração; nenhum cliente real conectado.' };
}
