const $ = id => document.getElementById(id);
let token = '', loading = false, generation = 0;
const reasonNames = { manual_message: 'Você respondeu pelo aplicativo', human_requested: 'Cliente pediu atendimento humano', media: 'Anexo para avaliação', assistant_unavailable: 'Atendimento precisa de avaliação', send_uncertain: 'Envio com resultado incerto: confira no WhatsApp antes de responder', send_failed: 'Mensagem não enviada', quota: 'Limite de uso atingido', admin_control: 'Controle manual', handoff: 'Pedido encaminhado', input_limit: 'Mensagem longa para avaliação', expired: 'Janela de resposta encerrada' };
reasonNames.processing_failed = 'Falha no processamento: avaliar antes de continuar';
reasonNames.monthly_limit = 'Limite mensal de envios: continuar pelo aplicativo Business';
function element(tag, text, cls) { const el = document.createElement(tag); if (text !== undefined) el.textContent = text; if (cls) el.className = cls; return el; }
function logout() { generation++; token = ''; $('token').value = ''; $('list').replaceChildren(); $('dashboard').hidden = true; $('logout').hidden = true; $('login').hidden = false; }
async function request(path, options = {}) {
  const res = await fetch(path, { ...options, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, cache: 'no-store' });
  if (!res.ok) { if (res.status === 401) logout(); throw new Error(res.status === 401 ? 'Token inválido. Entre novamente.' : 'Não foi possível concluir. Tente novamente.'); }
  return res.json();
}
async function refresh() {
  if (!token || loading) return;
  const current = generation; loading = true;
  try {
    const { conversations } = await request('/admin/conversations');
    if (current !== generation) return;
    const cards = conversations.map(c => {
      const card = element('article', undefined, 'card');
      const heading = element('div', undefined, 'conversation-heading');
      heading.append(element('h3', `+${c.contactId}`), element('span', c.mode === 'human' ? 'Atendimento humano' : 'IA disponível', `badge ${c.mode === 'human' ? 'human' : ''}`));
      card.append(heading, element('p', c.summary || 'Sem resumo registrado.', 'summary'), element('p', `${reasonNames[c.reason] || 'Contato recebido'} · ${new Date(c.updatedAt).toLocaleString('pt-BR')}`, 'meta'));
      const actions = element('div', undefined, 'actions');
      const button = element('button', c.mode === 'human' ? 'Devolver à IA' : 'Assumir conversa');
      button.addEventListener('click', async () => {
        button.disabled = true;
        try {
          await request(`/admin/conversations/${encodeURIComponent(c.contactId)}/mode`, { method: 'POST', body: JSON.stringify({ mode: c.mode === 'human' ? 'auto' : 'human' }) });
          await refresh();
        } catch (e) { $('status').textContent = e.message; } finally { button.disabled = false; }
      });
      actions.append(button); card.append(actions); return card;
    });
    $('list').replaceChildren(...(cards.length ? cards : [element('p', 'Nenhuma conversa recebida ainda.')]));
    $('login').hidden = true; $('dashboard').hidden = false; $('logout').hidden = false;
    $('status').textContent = `Atualizado às ${new Date().toLocaleTimeString('pt-BR')}.`;
  } catch (e) { if (current === generation || !token) $('status').textContent = e.message; }
  finally { loading = false; }
}
$('login').addEventListener('submit', e => { e.preventDefault(); generation++; token = $('token').value.trim(); $('token').value = ''; refresh(); });
$('logout').addEventListener('click', () => { logout(); $('status').textContent = 'Você saiu da central.'; });
$('refresh').addEventListener('click', refresh);
setInterval(() => { if (!document.hidden) refresh(); }, 15000);
