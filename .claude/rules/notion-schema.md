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

---

## Fase 2+ — Bancos planejados (19)

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
