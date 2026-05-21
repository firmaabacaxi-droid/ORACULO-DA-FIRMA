# ARQUITETURA_NOTION.md
## Schema dos bancos de dados no Notion
*Referência para o Oráculo saber onde salvar e buscar cada informação*

---

## Bancos disponíveis

### 1. CRM — Pipeline comercial

**Propósito:** Acompanhar todos os deals, do primeiro contato ao fechamento.

| Propriedade | Tipo | Valores possíveis |
|---|---|---|
| Nome do deal | Título | Ex: "CNV — Documentário Mediação" |
| Status | Select | Novo lead / Qualificado / Proposta enviada / Em negociação / Fechado ganho / Fechado perdido |
| Valor estimado | Número | R$ |
| Cliente | Relação | → banco Clientes |
| Contato | Relação | → banco Contatos |
| Data de contato | Data | |
| Próxima ação | Texto | O que fazer agora |
| Observações | Texto longo | Notas do briefing |

---

### 2. Propostas — Propostas geradas

**Propósito:** Histórico de todas as propostas e seu status.

| Propriedade | Tipo | Valores possíveis |
|---|---|---|
| Nome | Título | Ex: "CNV_proposta_v1" |
| Status | Select | Rascunho / Enviada / Aprovada / Recusada / Expirada |
| Cliente | Relação | → banco Clientes |
| Valor | Número | R$ |
| Data de envio | Data | |
| Validade | Data | Data de expiração |
| Arquivo | URL / File | Link para output/propostas/ |
| Deal relacionado | Relação | → banco CRM |

---

### 3. Contatos — Pessoas

**Propósito:** Cadastro de todas as pessoas com quem a Firma se relaciona.

| Propriedade | Tipo | Valores possíveis |
|---|---|---|
| Nome | Título | |
| Cargo | Texto | |
| E-mail | E-mail | |
| Telefone / WhatsApp | Telefone | |
| Empresa | Relação | → banco Clientes |
| Tipo | Select | Cliente / Freelancer / Parceiro / Fornecedor |
| Como chegou | Select | Indicação / Instagram / LinkedIn / Evento / Outro |
| Observações | Texto longo | Perfil DISC, preferências, notas |

---

### 4. Clientes — Empresas e organizações

**Propósito:** Cadastro das organizações (não das pessoas).

| Propriedade | Tipo | Valores possíveis |
|---|---|---|
| Nome | Título | |
| Segmento | Select | Terceiro setor / Empresarial / Cultural / Governo / Outro |
| Relação | Select | Novo / Ativo / Recorrente / Inativo / Parceiro |
| Site | URL | |
| Contatos | Relação | → banco Contatos |
| Projetos | Relação | → banco Projeto 2026 |

---

### 5. Projeto 2026 — Projetos em execução

**Propósito:** Acompanhar todos os projetos ativos com status, prazos e valores.

| Propriedade | Tipo | Valores possíveis |
|---|---|---|
| Nome do projeto | Título | Ex: "CNV — Documentário Mediação 2026" |
| Status | Select | Pré-produção / Em filmagem / Em edição / Em revisão / Concluído / Pausado |
| Cliente | Relação | → banco Clientes |
| Valor total | Número | R$ |
| Valor recebido | Número | R$ (entrada paga) |
| Data de filmagem | Data | |
| Data de entrega | Data | Prazo acordado com cliente |
| Responsável | Pessoa | Lipe / Jaya |
| Etapa atual | Select | As 13 etapas do fluxo |
| Tarefas | Relação | → banco Tarefas |

---

### 6. Tarefas — Tarefas com responsável e prazo

**Propósito:** Controle operacional do dia a dia.

| Propriedade | Tipo | Valores possíveis |
|---|---|---|
| Nome | Título | [verbo] + [objeto] — Ex: "Editar corte 1 — CNV" |
| Status | Select | A fazer / Em andamento / Concluído / Bloqueado |
| Prioridade | Select | P0 / P1 / P2 / P3 |
| Responsável | Pessoa | Lipe / Jaya / [freelancer] |
| Projeto | Relação | → banco Projeto 2026 |
| Prazo | Data | |
| Observações | Texto longo | |

---

## Como o Oráculo usa esses bancos

```
CRIAR LEAD NOVO → CRM (novo deal) + Contatos + Clientes
GERAR PROPOSTA  → Propostas (novo registro) + link para o deal no CRM
INICIAR PROJETO → Projeto 2026 (novo projeto) + Tarefas (etapas iniciais)
ORDEM DO DIA    → lê Projeto 2026 (ativos) + Tarefas (não concluídas)
FINANCEIRO      → lê Projeto 2026 (valores)
FOLLOW-UP       → lê CRM (propostas enviadas há > 7 dias)
```

---

*Última atualização: [data]*
*IDs dos bancos: [preencher com os IDs reais do Notion quando disponíveis]*
