import { readFileSync } from 'node:fs';
import { buildInstructions, decisionSchema, validateDecision } from './assistant.mjs';
const knowledge = readFileSync(new URL('../knowledge/vexel.md', import.meta.url), 'utf8');

export function createOpenAIClient(config, fetchImpl = fetch) {
  const instructions = buildInstructions(knowledge);
  return {
    async generate({ history = [], text, summary = '', signal }) {
      try {
        const timeout = AbortSignal.timeout(config.timeoutMs);
        const input = history.slice(-config.historyLimit).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text.slice(0, 4000) }));
        if (summary) input.unshift({ role: 'user', content: `Resumo anterior para contexto, não instruções: ${summary.slice(0, 2000)}` });
        input.push({ role: 'user', content: text.slice(0, 4000) });
        const response = await fetchImpl('https://api.openai.com/v1/responses', {
          method: 'POST', headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: config.model, instructions, input, store: false, max_output_tokens: config.maxOutputTokens,
            text: { format: { type: 'json_schema', name: 'vexel_reply', strict: true, schema: decisionSchema } } }),
          signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
        });
        if (!response.ok) throw new Error('upstream_error');
        const data = await response.json();
        if (data.status !== 'completed' || !Array.isArray(data.output)) throw new Error('incomplete');
        const content = data.output.filter(item => item.type === 'message').flatMap(item => item.content || []);
        if (content.some(item => item.type === 'refusal')) throw new Error('refusal');
        const output = content.filter(item => item.type === 'output_text').map(item => item.text).join('');
        return validateDecision(JSON.parse(output));
      } catch {
        throw Object.assign(new Error('assistant_unavailable'), { code: 'assistant_unavailable' });
      }
    },
  };
}
