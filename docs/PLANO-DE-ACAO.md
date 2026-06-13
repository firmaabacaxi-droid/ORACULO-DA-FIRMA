# Plano de Ação — Firma Abacaxi
*Atualizado: 12 jun 2026 — Sessão 25*

> Documento vivo. Atualizar no início/fim de cada sessão.

---

## 🔴 Urgente (esta semana)

| # | Tarefa | Contexto | Onde |
|---|---|---|---|
| 1 | **Maranhã: entrega pós-produção** | Edição bruta em andamento, entrega ~15 jun | Notion TAREFAS |
| 2 | **SOBRE2026: confirmar proposta** | R$ 58.124,08, conferência UnB 27-31 jul | Notion CRM |
| 3 | **Usar o monorepo novo por 1 semana** | Validar antes de fazer merge → master | `consolidacao-monorepo` |

---

## 🟡 Próximas sessões — Infraestrutura

| # | Tarefa | Detalhe |
|---|---|---|
| 4 | **Montar workflow n8n — inbox universal** | ⭐ Seguir `automacoes/inbox-universal.md`; precisa: bot Telegram (token em `~/.secrets/`), Groq API key, n8n com acesso ao vault |
| 5 | **Montar workflow n8n — reuniões** | Seguir `automacoes/reuniao-transcricao-wiki.md` (pode ser o mesmo bot, ramo separado) |
| 6 | **Popular wiki/projects/** | Rodar `/wiki-ingest` para FAC-2026, VMA, Maranhã, SOBRE2026 |
| 7 | **Testar inbox ponta a ponta** | Criar 3 capturas em `00-INBOX/capturas/` → "processar inbox" → verificar notas + wiki |

### Projetos ativos

| # | Projeto | Status | Próxima ação |
|---|---|---|---|
| 8 | **Visite mon Agence** (AFD) | Pré-produção | Scouting de locações + contratar produtor local |
| 9 | **Brasil Participativo** (#04) | Proposta v7 | Aguardar Finatec |
| 10 | **Simbiose** (#10), **RNP** (#08) | Em andamento | Acompanhar |

---

## 🟢 Quando o monorepo for validado

| # | Tarefa | Detalhe |
|---|---|---|
| 11 | **Merge `consolidacao-monorepo` → master** | `git checkout master && git merge consolidacao-monorepo` |
| 12 | **Arquivar ANTIGRAVITY** | Mover para backup frio `_BACKUP/ANTIGRAVITY-arquivado-2026-06/` |
| 13 | **Deletar cópia antiga do ORACULO** | Só após merge confirmado funcionando |

---

## ⭐ Oráculo — dimensão pessoal (Sessão 25)

Nova dimensão ativa: o Oráculo agora serve também à vida pessoal do Felipe. Estrutura criada; próximos passos:

**1. Montar o bot Telegram + n8n** (o mais impactante — destrava o hábito de captura)
- Blueprint completo em `automacoes/inbox-universal.md`
- Testar com: 1 link YouTube + 1 artigo + 1 áudio + 1 texto
- Verificar `00-INBOX/capturas/` com 4 arquivos `.md`

**2. Piloto da biblioteca** (livro 1)
- Felipe escolhe o primeiro livro (sugestão: Jung/arquétipos ou Vogler)
- Criar notebook no NotebookLM → sumário estruturado → nota em `08.2-BIBLIOTECA/`
- Pipeline documentado em `08.2-BIBLIOTECA/_COMO-FUNCIONA.md`

**3. Inventário do acervo pessoal**
- Felipe aponta: espetáculo de circo, escritos sobre "Oráculo", outros projetos fora do vault
- O Oráculo ingere em batch (agente `firma-wiki-ingest`)
- Fechar com `/wiki-lint` para órfãos

**4. Revisão do Cérebro (já planejada)**
- Popular `wiki/projects/` (FAC-2026, VMA, SOBRE2026) via `/wiki-ingest`
- Criar `wiki/resources/pessoas/` para contatos-chave (AFD, SEC-DF, UnB)

---

## Backlog (sem prioridade definida)

- Skill de "contexto pré-reunião" no n8n (inverso do fluxo de transcrição)
- Site Framer + Frame.io (Fase 2 do Oráculo — R$ 160/mês adicional)
- Ordem do Dia automática às 8h (Fase 4)
- Espaço da Jaya no vault (quando ela quiser — princípio da simetria com 08-FELIPE)
- Responder os 5 questionamentos abertos de `docs/VISAO-ORACULO.md` (ritual de retorno, sucesso no domínio pessoal, etc.)

---

## Fases do Oráculo (referência)

```
FASE 1 · ✅ CONCLUÍDA (Mai-Jun 2026)
  Documentação, skills, MCPs, Obsidian, propostas reais, monorepo consolidado,
  agentes web/produto, inbox universal (blueprint), visão pessoal, área 08-FELIPE

FASE 2 · Em andamento
  Inbox Telegram em produção · Google Drive MCP · Frame.io

FASE 3
  ElevenLabs · Whisper local · n8n automações A1–A5

FASE 4
  LinkedIn Sales Nav · Ordem do Dia às 8h

FASE 5 · Escala
  Meta Ads + Apify · Curso Videomaker · Produtor júnior
```

---
*Próxima sessão: montar n8n (inbox) + piloto de livro + testar inbox ponta a ponta*
