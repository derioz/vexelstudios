import { openStore } from '../src/store.mjs';
import { readConfig } from '../src/config.mjs';
import { processNext } from '../src/worker.mjs';
import { simulateDecision } from '../src/simulation.mjs';

const config = readConfig({});
let clock = Date.now();
const store = openStore(':memory:', { now: () => clock });
const sent = [], steps = [];
const contactId = '5511000000000';
const deps = { store, config, now: () => clock, generate: simulateDecision, sendText: async ({ text }) => { sent.push(text); return { id: `demo-${sent.length}` }; } };
async function drain() {
  while (await processNext(deps)) {}
}
async function receive(id, text) {
  store.ingest({ id: `simulation:${id}`, phoneNumberId: 'simulation', contactId, timestamp: clock, kind: 'text', text });
  clock += config.messageDebounceMs;
  await drain();
  steps.push({ simulation: true, input: text, mode: store.getConversation(contactId).mode, sentCount: sent.length, lastReply: sent.at(-1) });
}
try {
  await receive('1', 'Preciso de um site para minha empresa');
  await receive('2', 'Quero falar com o Fabricio');
  await receive('3', 'Estou esperando o atendimento');
  store.setMode(contactId, 'auto', 'admin_control');
  await receive('4', 'Podemos continuar sobre o site');
  console.log(JSON.stringify(steps, null, 2));
} finally { store.close(); }
