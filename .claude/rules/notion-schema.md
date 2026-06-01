---
description: Schema dos bancos de dados Notion — IDs, prefixos, campos críticos
globs:
  - "docs/ARQUITETURA_NOTION.md"
---

# Notion — Schema dos Bancos

Conectado via MCP. Arquitetura completa: `docs/ARQUITETURA_NOTION.md` (25 bancos).

**Regra:** Sempre pedir autorização antes de criar, editar ou deletar registros.

---

## Fase 1 — Bancos ativos (6)

### PROJETO_2026 (PRJ-)
**ID:** `2c031822-5594-4204-826b-752d5c2897bc`
**Função:** Hub central — todos os projetos da Firma
**Campos críticos:** Nome, Cliente (→CLIENTES), Status, Etapa, Data início, Data entrega, Valor total

### CLIENTES (CLI-)
**ID:** `b08a5316-af2c-4fc7-9815-a5f50ac8e654`
**Função:** Empresas e organizações clientes
**Campos críticos:** Nome, CNPJ, Segmento, Responsável (→CONTATOS), Histórico de projetos

### CONTATOS (CTT-)
**ID:** `43fa1821-83f1-47e4-9ba3-711ca8c3a210`
**Função:** Pessoas — clientes, equipe, freelancers, fornecedores
**Campos críticos:** Nome, Função/Skill, Empresa (→CLIENTES), E-mail, WhatsApp, Disponibilidade, Diária

### PROPOSTAS (PRP-)
**ID:** `3548a525-91f3-80e6-b542-e2e651ed5dfc`
**Função:** Propostas e orçamentos — status comercial
**Campos críticos:** Cliente (→CLIENTES), Projeto (→PROJETO_2026), Valor total, Status (Enviada/Aprovada/Rejeitada), Data envio, Arquivo

### CRM (CRM-)
**ID:** `5240a3c2-d0d1-4726-b23b-96463f5cc615`
**Função:** Pipeline comercial — todas as oportunidades em negociação
**Campos críticos:** Lead, Etapa (Novo/Qualificado/Briefing/Proposta/Ganho/Perdido), Valor estimado, Responsável, Próximo passo, Data

### TAREFAS (TAR-)
**ID:** `6c3ccf72-5539-43f6-9fbb-7906142a246d`
**Função:** Tarefas com responsável e prazo
**Campos críticos:** Título, Responsável, Projeto (→PROJETO_2026), Status, Prioridade, Prazo, Descrição

### ORÇAMENTO (ORC-)
**ID:** `0652762f-bac3-4a0b-ad3c-2b7223132a2b`
**Função:** Itens de custo por projeto — tabela vinculada
**Campos críticos:** Item, Projeto (→PROJETO_2026), Categoria, Valor unitário, Quantidade, Total, Status, Data, Fornecedor

### EDIÇÃO (EDI-)
**ID:** `7f7422fc-cf76-4196-80de-c60c6a49df55`
**Função:** Pós-produção — acompanhamento de montagem e cortes
**Campos críticos:** Projeto (→PROJETO_2026), Etapa, Editor (→CONTATOS), Status, Prazo

### FILMAGEM (FLM-)
**ID:** `2a5f9302-689f-440e-985c-c3b16362a4fe`
**Função:** Planejamento e diário de set das diárias
**Campos críticos:** Projeto (→PROJETO_2026), Data, Local (→LOCAÇÕES), Equipe (→CONTATOS), Status, Call time

### FINANCEIRO_PROJETO (FIN-)
**ID:** `a263e225-a5e4-427d-a887-d2e56ba12fb5`
**Função:** Controle financeiro e faturamento do projeto
**Campos críticos:** Projeto (→PROJETO_2026), Descrição, Valor, Tipo, Status, Forma de pagamento

### GESTÃO_FINANCEIRA_EMPRESA (GFE-)
**ID:** `6b663765-f604-405b-a6eb-d9a5cba008af`
**Função:** Controle do fluxo de caixa e custos fixos corporativos
**Campos críticos:** Descrição, Valor, Tipo (Receita/Despesa), Categoria, Data, Status

### TAREFAS DA FIRMA (TAR_FIRMA)
**ID:** `3728a525-91f3-802d-ae2f-e15b167b1ff8`
**Função:** Tarefas internas corporativas e administrativas da Firma
**Campos críticos:** Tarefa, Responsável (→CONTATOS), Status, Prioridade, Prazo

---

## Fase 2+ — Bancos planejados (13)

Documentados em `docs/ARQUITETURA_NOTION.md`. Os principais:

| Banco | Prefixo | Função | Fase |
|---|---|---|---|
| ORÇAMENTO | ORC- | Itens de custo por projeto | 2 |
| CRONOGRAMA | CRO- | Timeline de entregas | 2 |
| CRIATIVO | CRI- | Roteiros, referências estéticas | 2 |
| LOCAÇÕES | LOC- | Locais de filmagem com GPS | 2 |
| EQUIPAMENTOS | EQP- | Inventário e disponibilidade | 2 |
| FILMAGEM | FLM- | Diário de set e log de material | 2 |
| EDIÇÃO | EDI- | Versões e feedback do cliente | 2 |
| FINANCEIRO_PROJETO | FIN- | Receitas e despesas por projeto | 3 |
| GESTÃO_FINANCEIRA_EMPRESA | GFE- | Fluxo de caixa geral | 3 |
| ENTREGA_FEEDBACK | ENT- | NPS e avaliação pós-entrega | 3 |

---

## IDs do hub

```
Hub: 🔮 ORÁCULO - FIRMA ABACAXI
URL: notion.so/3288a52591f381a0885fc20691f28468
```
