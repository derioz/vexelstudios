# Atendimento WhatsApp da Vexel Studios

Serviço Node.js para responder mensagens recebidas pelo WhatsApp Business usando a OpenAI, com integração pela Meta Cloud API ou YCloud, fila persistente e controle manual das conversas.

## Comportamento

- Atende em português e usa a base de conhecimento em `knowledge/vexel.md`.
- Agrupa mensagens de texto consecutivas do mesmo cliente após 3 segundos de silêncio, com limite de 8 segundos desde a primeira mensagem do lote.
- Encaminha pedidos explícitos para atendimento humano, anexos, falhas e limites de uso para revisão.
- Permite pausar e devolver conversas à IA pelo painel administrativo.
- Não baixa nem analisa anexos. Mensagens manuais recebidas como eventos de coexistência pausam a automação.
- Não inicia conversas e respeita a janela de atendimento permitida pela plataforma.

## Testar localmente

Requer Node.js 24 ou superior. Na pasta `whatsapp/`, execute:

```powershell
npm test
npm run simulate
```

Os testes usam integrações simuladas. A simulação não acessa a rede, a OpenAI, a Meta ou o YCloud e não envia mensagens reais.

Para iniciar o painel em modo de simulação:

```powershell
Copy-Item .env.example .env
```

Defina um `ADMIN_TOKEN` local, mantenha `MODE=simulation` e execute `npm start`. Abra `http://127.0.0.1:4190/admin`. Nunca publique `.env` ou compartilhe seus tokens.

## Configuração de produção

Configure as variáveis em `.env` ou no gerenciador de segredos do ambiente:

- `OPENAI_API_KEY`, `OPENAI_MODEL`, `ADMIN_TOKEN` e `PUBLIC_ORIGIN`.
- `WHATSAPP_PROVIDER=meta` requer as variáveis `META_*` descritas em `.env.example`.
- `WHATSAPP_PROVIDER=ycloud` requer as variáveis `YCLOUD_*` descritas em `.env.example`.
- `MODE=live` e `COEXISTENCE_VALIDATED=true` só devem ser usados depois de validar a configuração da conta, permissões, webhook e coexistência do número.

O serviço não provisiona contas, não verifica elegibilidade de coexistência e não altera configurações nos fornecedores. Confirme tarifas, políticas, versões de API e requisitos atuais diretamente com cada fornecedor antes de ativar. O plano do YCloud não cobre tarifas eventualmente cobradas pela Meta ou custos da OpenAI.

O endpoint de webhook é `/webhook`; use HTTPS, valide as assinaturas e restrinja o acesso administrativo com token forte. Mantenha `.env`, banco SQLite, logs e backups fora do controle de versão e proteja-os no ambiente de hospedagem.

## Limites operacionais

O envio pela API pode retornar resultado incerto após timeout. Nesse caso, o serviço pausa a conversa e não repete o envio automaticamente. Revise o estado no WhatsApp Business antes de responder ou devolver a conversa à IA. Um aceite HTTP do fornecedor não comprova entrega ao destinatário.

O limite mensal local cobre apenas os envios desta instalação. Ele não determina gratuidade na conta do fornecedor nem contabiliza tráfego de outros sistemas. Configure retenção e backup do banco conforme os requisitos de privacidade e operação da empresa.
