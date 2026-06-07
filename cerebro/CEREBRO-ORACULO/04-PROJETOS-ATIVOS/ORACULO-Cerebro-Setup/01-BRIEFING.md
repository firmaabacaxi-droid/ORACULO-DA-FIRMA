# ORACULO Cérebro — Integração claude-obsidian + Wiki PARA

## Projeto
**Meta-projeto Oráculo:** Integração do vault Obsidian (Cérebro) com claude-obsidian v1.9.2, criação do wiki em modo PARA, e arquitetura unificada dos 4 sistemas (Notion + Cérebro + Drive + NotebookLM).

---

## Contexto

A Firma Abacaxi operava com Notion como única verdade, Drive para outputs, e documentação dispersa. A Sessão 20 implementou o Cérebro (Obsidian vault) como **camada de contexto e memória**, criando um fluxo automático:

```
Trabalho em 04-PROJETOS-ATIVOS/
    ↓
Absorver no wiki (comando "absorva isso")
    ↓
Oráculo cria sínteses em wiki/
    ↓
Auto-commit no GitHub
    ↓
NotebookLM sincroniza automaticamente
    ↓
Próxima sessão: contexto completo + insights
```

---

## O que foi feito (Sessão 20 — 07 jun 2026)

### ✅ Estrutura do Vault Criada

**Pastas de trabalho (00–07):**
- `00-INBOX/` — rascunhos rápidos
- `01-OPERACAO-ORACULO/` — DNA, templates, diretrizes (8 documentos)
- `02-PROCESSOS-E-MANUAIS/` — SOPs
- `03-CLIENTES/` — dossiês
- `04-PROJETOS-ATIVOS/` — 5 projetos (com prefixo a aplicar)
- `05-ARQUIVO-HISTORICO/` — projetos finalizados
- `06-ESTUDOS-E-REFERENCIAS/` — biblioteca
- `07-LOGS-DE-SESSAO/` — 13 logs (sessões 1–16), 4 logs faltando (17–20)

**Wiki (síntese gerada pelo Oráculo):**
- `wiki/hot.md` — contexto recente (~500 palavras, relido a cada sessão)
- `wiki/index.md` — catálogo mestre (índice PARA)
- `wiki/log.md` — log de operações
- `wiki/overview.md` — sumário executivo
- `wiki/projects/` — sínteses de projetos
- `wiki/areas/` — áreas contínuas
- `wiki/resources/` — pessoas, editais, referências
- `wiki/archives/` — projetos finalizados

### ✅ Automações Documentadas

1. **CHECKLIST-PRIMEIRA-SESSAO.md** — protocolo de primeira sessão
2. **GUIA-SESSOES-AUTOMATIZADAS.md** — padrão de fluxo: absorção → síntese → commit → NotebookLM
3. **NOTEBOOKLM-SINCRONIZACAO.md** — como NotebookLM fica sempre atualizado
4. **CLAUDE.md (vault)** — schema, metodologia PARA, triggers de ingestão

### ✅ Obsidian Configurado

- **Graph colors:** 7 grupos de cor (projetos=amarelo, clientes=laranja, estudos=azul, operação=roxo, arquivo=cinza, wiki=verde)
- **CSS snippet:** `vault-colors.css` — tema escuro com paleta Firma
- **Hidden folders:** `skills/`, `hooks/`, `agents/`, `scripts/`, `WIKI.md`
- **Obsidian Git:** push automático a cada 30 min

### ✅ GitHub + Hooks

- **Repository:** vault versionado em GitHub
- **Hooks:** `hooks/hooks.json` registrado com trigger de sessão inicial
- **Auto-commit:** trigger `SessionStart` lê hot.md e CLAUDE.md

---

## Estado Atual (Sessão 20)

| Sistema | Status | Função |
|---------|--------|--------|
| **Notion** | ✅ 12 bancos ativos | Fonte de verdade (projetos, tarefas, financeiro) |
| **Cérebro** | ✅ Estrutura completa | Contexto + memória (documentos, sínteses) |
| **Drive** | ✅ Via rclone | Output final (entregáveis, assets) |
| **NotebookLM** | ✅ 9 fontes indexadas | Inteligência (áudios, insights) |
| **Local** | ✅ Config pronta | Scripts, skills, binários em curso |

---

## Proximas Melhorias (Futuro)

### Curto prazo (próximas 3 sessões)

- [ ] Fechar logs faltando (Sessões 17, 18, 19 já no STATUS.md, falta documentar em 07-LOGS/)
- [ ] Renomear pastas com prefixo (FIRMA-, ORACULO-, PESSOAL-, ESTUDOS-)
- [ ] Testar absorção: "absorva isso no wiki" → verificar auto-commit
- [ ] Configurar NotebookLM com repositório GitHub como fonte (se não estiver)
- [ ] Gerar primeiro áudio no Studio (NotebookLM)

### Médio prazo (próximas 5–10 sessões)

- [ ] Implementar Ollama local (LLM offline para pesquisas autônomas)
- [ ] Criar skill de absorção autônoma (`/autoresearch`)
- [ ] Integração Google Drive MCP (se NotebookLM + rclone não suficerem)
- [ ] Dashboard visual no Obsidian (canvas com relacionamentos)

### Longo prazo (arquitetura evolutiva)

- [ ] Mobile app sincronizado (capturar insights em campo)
- [ ] AI-powered recommendations (NotebookLM + Oráculo analisam padrões)
- [ ] Podcast mensal de aprendizados (gerado automaticamente)

---

## Padrão de Uso (a partir de agora)

### Cada Sessão

1. **Abra Claude Code neste diretório** → Oráculo lê hot.md automaticamente
2. **Faça o trabalho** → atualize briefings, roteiros, documentos de projeto
3. **"absorva isso no wiki"** → Oráculo cria sínteses em wiki/projects/, wiki/areas/, etc.
4. **Auto-commit** → GitHub recebe a cada absorção
5. **NotebookLM sincroniza** → próxima sessão, você tem contexto ainda mais rico

### Triggers de Ingestão (são naturais)

- "absorva isso no wiki"
- "ingerir isso na base de conhecimento"
- "adicionar isso ao vault"
- "/wiki-ingest 04-PROJETOS-ATIVOS/FAC-2026/00-INDEX.md" (comando direto)

---

## Documentação Criada Nesta Sessão

Todos em `01-OPERACAO-ORACULO/`:

- **CHECKLIST-PRIMEIRA-SESSAO.md** (14h30) — Setup, testes, métricas de sucesso
- **GUIA-SESSOES-AUTOMATIZADAS.md** (14h30) — Ciclo padrão, triggers, fluxo visual
- **NOTEBOOKLM-SINCRONIZACAO.md** (14h30) — Como NotebookLM fica atualizado (automático)
- **CLAUDE.md (vault)** (14h30) — Schema, PARA, metodologia, referência rápida

---

## Links de Referência

- [CLAUDE.md (raiz Oráculo)](../../CLAUDE.md) — Identidade geral do sistema, 8 skills operacionais
- [STATUS.md (raiz Oráculo)](../../STATUS.md) — Estado das sessões, Notion, arquitetura
- [wiki/hot.md](../../wiki/hot.md) — Contexto recente (relido a cada sessão)
- [NotebookLM ID](https://notebooklm.google.com/) — 944cbd55-d01b-430e-924d-4a49fe9cfeb4

---

## Próximo Passo Imediato

**Fase 2 (fechamento de logs):** Criar arquivos em `07-LOGS-DE-SESSAO/`:
- `2026-06-01-Sessao-17-NotionV3-Dashboard.md`
- `2026-06-01-Sessao-18-FAC2026-NotebookLM.md`
- `2026-06-04-Sessao-19-Painel-Visual-FAC.md`
- `2026-06-07-Sessao-20-Cerebro-claude-obsidian.md` (esta sessão)

**Fase 3 (prefixos):** Renomear pastas em `04-PROJETOS-ATIVOS/`:
- FAC-2026 → FIRMA-FAC-2026
- #04 Brasil Participativo → FIRMA-#04-Brasil-Participativo
- #08 RNP → FIRMA-#08-RNP-Ailton-Krenak
- #10 Simbiose → FIRMA-#10-Simbiose
- #16 Maranha → FIRMA-#16-Maranha

---

*Oráculo · Sessão 20 — 07 jun 2026 · 14h30*
