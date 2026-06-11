# Plano de Ação — Firma Abacaxi
*Atualizado: 11 jun 2026 — Sessão 21-22*

> Documento vivo. Atualizar no início/fim de cada sessão.

---

## 🔴 Urgente (esta semana)

| # | Tarefa | Contexto | Onde |
|---|---|---|---|
| 1 | **Maranhã: entrega pós-produção** | Edição bruta em andamento, entrega ~15 jun | Notion TAREFAS |
| 2 | **SOBRE2026: confirmar proposta** | R$ 58.124,08, conferência UnB 27-31 jul | Notion CRM |
| 3 | **Usar o monorepo novo por 1 semana** | Validar antes de fazer merge → master | `consolidacao-monorepo` |

---

## 🟡 Esta semana / próximas sessões

### Infraestrutura do Oráculo

| # | Tarefa | Detalhe |
|---|---|---|
| 4 | **Montar workflow n8n** | Seguir `automacoes/reuniao-transcricao-wiki.md`; precisar Groq API key (console.groq.com) |
| 5 | **Revisão do cérebro** | ⭐ Prioridade para próximas etapas — ver seção abaixo |
| 6 | **Popular wiki/projects/** | Rodar `/wiki-ingest` para FAC-2026, VMA, Maranhã, SOBRE2026 |
| 7 | **Testar fluxo completo de reunião** | Enviar voz no Telegram → verificar `00-INBOX/reunioes/` → `/wiki-ingest` |

### Projetos ativos

| # | Projeto | Status | Próxima ação |
|---|---|---|---|
| 8 | **Visite mon Agence** (AFD) | Pré-produção | Scouting de locações + contratar produtor local |
| 9 | **Brasil Participativo** (#04) | Briefing | Definir escopo e proposta |
| 10 | **Simbiose** (#10), **RNP** (#08) | Prospecção | Retomar contato |

---

## 🟢 Quando o monorepo for validado

| # | Tarefa | Detalhe |
|---|---|---|
| 11 | **Merge `consolidacao-monorepo` → master** | `git checkout master && git merge consolidacao-monorepo` |
| 12 | **Arquivar ANTIGRAVITY** | Mover para backup frio `_BACKUP/ANTIGRAVITY-arquivado-2026-06/` |
| 13 | **Deletar cópia antiga do ORACULO** | Só após merge confirmado funcionando |

---

## ⭐ Revisão do Cérebro (sessão dedicada)

O usuário identificou que a revisão do cérebro é crítica para as próximas etapas. Pontos a trabalhar:

**1. Revisar estrutura das pastas de projetos**
- Cada projeto em `04-PROJETOS-ATIVOS/FIRMA-NN-Nome/` deve ter subestrutura clara
- Arquivos markdown organizados (briefing, roteiro, log de produção)

**2. Popular o wiki com projetos ativos**
- `wiki/projects/FAC-2026.md`
- `wiki/projects/Visite-mon-Agence.md`
- `wiki/projects/SOBRE2026.md`
- `wiki/areas/captacao.md`, `wiki/areas/financeiro.md`

**3. Sincronizar NotebookLM**
- Verificar que as 9 fontes estão atualizadas
- Adicionar novos editais relevantes 2026
- Testar geração de áudio para briefing de projetos

**4. Revisar `wiki/hot.md`**
- Atualizar status dos projetos (alguns dados de junho precisam de revisão)
- Simplificar: manter só o que muda sessão a sessão

**5. Criar wiki/resources/pessoas/** para contatos-chave
- Contatos AFD (VMA), SEC-DF (FAC), UnB (SOBRE2026)

---

## Backlog (sem prioridade definida)

- Skill de "contexto pré-reunião" no n8n (inverso do fluxo de transcrição)
- Criar subagentes no claude.ai (Proposta, Pré-produção, Gestão, Conteúdo, Prospecção)
- Site Framer + Frame.io (Fase 2 do Oráculo — R$ 160/mês adicional)
- Bot Telegram para captura rápida de notas (além de reuniões)
- Ordem do Dia automática às 8h (Fase 4)

---

## Fases do Oráculo (referência)

```
FASE 1 · ✅ CONCLUÍDA (Mai-Jun 2026)
  Documentação, skills, MCPs, Obsidian, propostas reais, monorepo consolidado

FASE 2 · Próxima
  Google Drive MCP · Frame.io · Site Framer

FASE 3
  ElevenLabs · Whisper local · n8n automações A1–A5

FASE 4
  LinkedIn Sales Nav · Bot Telegram · Ordem do Dia às 8h

FASE 5 · Escala
  Meta Ads + Apify · Curso Videomaker · Produtor júnior
```

---
*Próxima sessão: revisar cérebro + popular wiki + testar fluxo de reunião*
