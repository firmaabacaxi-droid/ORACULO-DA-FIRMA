# Sessão 7 — Reorganização da Arquitetura de Skills
*25/05/2026 · Sessão de revisão estrutural · Continuação da Sessão 6*

---

## O que aconteceu

Revisão e reorganização completa da camada de skills do Oráculo. As skills `captacao`, `marketing-digital`, `conteudo` e `proposta` haviam crescido de forma independente e acumulado sobreposição — `captacao` cobria só o briefing mas deveria orquestrar todo o funil; `marketing-digital` era redundante com o artefato `MARKETING_CAPTACAO.md`.

---

## Decisões e aprendizados

### 1. Skill captacao → prospeccao (renomeada e expandida)

A skill de captação cobria apenas a Etapa 3 (briefing), mas o nome e a posição no fluxo sugeriam que deveria orquestrar todo o processo de aquisição de clientes. Renomeada para `prospeccao` e expandida para cobrir:
- Etapa 0: Geração de Leads (Marketing Digital) — referencia MARKETING_CAPTACAO.md e skills/conteudo/
- Etapa 1: Qualificação (Verde/Amarelo/Vermelho)
- Etapa 2: Passiva / CRM (follow-up estratégico)
- Etapa 3: Primeira Abordagem (briefing completo)
- Etapa 4: Onboarding (após proposta aprovada — CLIENTES+CONTATOS)

### 2. skills/marketing-digital deletada

O artefato `MARKETING_CAPTACAO.md` já continha toda a estratégia de marketing digital de forma muito mais completa do que a skill. A skill era apenas um apontador para o cerebro + um workflow de CLI do NotebookLM — nada que justificasse um arquivo separado. Absorvida em prospeccao.

### 3. docs/ vs skills/ — regra de organização clara

Aprendizado importante sobre onde arquivos devem viver:
- **docs/**: contexto carregado em toda sessão — apenas documentos fundamentais (CONTEXTO_FIRMA, FLUXO_TRABALHO, ARQUITETURA_NOTION, TABELA_PRECOS)
- **skills/**: artefatos carregados sob demanda — estratégias específicas de uma skill (ex: MARKETING_CAPTACAO.md → skills/prospeccao/)
- **cerebro/**: referência e conhecimento — guias, manuais, aprendizados
- **docs/arquivo/**: documentos desatualizados que aguardam reescrita

### 4. SUBAGENTES.md arquivado

O documento de system prompts para os Projects do claude.ai ficou desatualizado após as revisões de Mai 2026 (valores errados, skill captacao no lugar de prospeccao, ancoragem de preço ainda presente). Arquivado em `docs/arquivo/`. Precisa ser reescrito antes de criar os Projects.

### 5. skills/proposta corrigida (sem execução de código)

Quatro valores desatualizados corrigidos: Lipe R$1.800→R$2.000, Jaya R$1.200→R$1.500, margem 35%→20%, e a referência à ancoragem de preço foi substituída por Marketing de Premissas e ancoragem por ROI.

---

## O que mudou (arquivos)

| Ação | Arquivo |
|------|---------|
| Criado | `skills/prospeccao/SKILL.md` |
| Criado | `skills/prospeccao/MARKETING_CAPTACAO.md` (movido de docs/) |
| Deletado | `skills/captacao/SKILL.md` |
| Deletado | `skills/marketing-digital/SKILL.md` |
| Atualizado | `skills/proposta/SKILL.md` — valores + ancoragem |
| Atualizado | `CLAUDE.md` — routing captacao→prospeccao |
| Atualizado | `docs/FLUXO_TRABALHO.md` — referências de skill |
| Arquivado | `docs/SUBAGENTES.md` → `docs/arquivo/SUBAGENTES.md` |
| Movido | `docs/GUIA_ORACULO.md` → `cerebro/01-FIRMA/GUIA_ORACULO.md` |

---

## O que ficou pendente

- Reescrever SUBAGENTES.md com valores atuais antes de criar Projects no claude.ai
- docs/ARQUITETURA_NOTION.md — verificar o que foi criado no Notion vs. documentado
- CLAUDE.md / MEMORIA.md — seções de Negociação e Produção de set ainda vazias

---

## Tags

#aprendizado #processo #arquitetura #skills #prospeccao #organizacao #sessao7
