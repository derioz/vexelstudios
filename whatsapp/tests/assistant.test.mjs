import test from 'node:test';
import assert from 'node:assert/strict';
import { immediateHandoff, validateDecision } from '../src/assistant.mjs';
test('explicit human requests bypass model, ordinary service questions do not', () => {
  assert.equal(immediateHandoff('Quero falar com o Fabrício'), true);
  assert.equal(immediateHandoff('Pode me passar para um atendente humano?'), true);
  assert.equal(immediateHandoff('Preciso de um site para minha loja'), false);
  assert.equal(immediateHandoff('Quanto custa? Quero um orçamento de site'), true);
  assert.equal(immediateHandoff('Estou insatisfeito com o atendimento'), true);
  assert.equal(immediateHandoff('Meu projeto já ficou pronto?'), true);
  for (const text of ['Meu orçamento disponível é de R$ 2.000', 'Ainda não tenho orçamento definido', 'Não preciso de orçamento agora, quero explicar a ideia']) {
    assert.equal(immediateHandoff(text), false);
  }
});
test('invalid model decisions cannot be sent to clients', () => {
  assert.deepEqual(validateDecision({ reply: 'Olá!', handoff: false, summary: '' }), { reply: 'Olá!', handoff: false, summary: '' });
  for (const d of [null, {}, { reply: '', handoff: false, summary: '' }, { reply: 'x'.repeat(1501), handoff: false, summary: '' }, { reply: 'Oi', handoff: 'false', summary: '' }, { reply: 'Oi', handoff: false, summary: '', extra: true }]) assert.throws(() => validateDecision(d), /invalid_decision/);
});
