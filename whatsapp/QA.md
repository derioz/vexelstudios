# Verificação

Execute `npm test` nesta pasta para validar os adaptadores, webhooks, persistência, fila, agrupamento de mensagens, controle manual e empacotamento estático. Execute `npm run simulate` para percorrer uma conversa fictícia sem chaves ou rede.

Os testes não comprovam elegibilidade de conta, configuração de coexistência, entrega real de mensagens ou custos de fornecedores. Antes de ativar `MODE=live`, valide esses itens com um número e destinatário de teste permitidos e confira os estados no painel dos fornecedores.

## Critérios do agrupamento

- Mensagens consecutivas do mesmo cliente são combinadas após o período de silêncio configurado.
- O tempo máximo do lote limita a espera quando mensagens continuam chegando.
- Lotes nunca misturam clientes ou períodos separados por uma pausa de atendimento humano.
- Pedidos explícitos de ajuda humana passam à frente da espera.
- Uma intervenção humana descarta a resposta automática pendente.
- Reinicialização após envio confirmado não absorve mensagens novas no lote já respondido.
