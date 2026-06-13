# Painel-Mestre — Controle de Pendências do Oráculo
## O lugar único para saber tudo que ainda falta fazer
*Última varredura: 12 jun 2026 · Consolidação de 9+ planos dispersos*

> Em dúvida sobre **o que fazer agora** ou **o que está em aberto**? Comece por aqui.
> Cada item aponta para o plano-fonte com o detalhe. Este painel é a camada de **controle**; o detalhe vive nos planos linkados.

**Legenda:** 🔴 urgente (esta semana) · 🟡 em andamento / próximas sessões · 🟢 quando der / backlog · ✅ concluído

---

## TRILHA 1 · TRABALHOS DA FIRMA
*Projetos com prazo de cliente — a operação que paga as contas. Verdade de status/valor/prazo vive no [Notion](https://www.notion.so) (CRM / PROJETO_2026).*

| Status | Projeto | Próxima ação | Detalhe |
|---|---|---|---|
| 🔴 | **Maranhã** (#16) | Entregar pós-produção (~15 jun) — edição bruta em andamento | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-16-Maranha/) |
| 🔴 | **SOBRE2026** (UnB) | Confirmar proposta R$ 58.124 — conferência 27-31 jul | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-SOBRE2026/) |
| 🟡 | **FAC-2026** | ⚠️ **VERIFICAR se foi submetido** (deadline 5 jun venceu; status incerto) — R$ 199.300 | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-FAC-2026/) |
| 🟡 | **Visite mon Agence** (AFD) | Pré-produção: scouting de locações + contratar produtor local — R$ 15.871 | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-03-Visite-mon-Agence/) |
| 🟡 | **Brasil Participativo** (#04) | Proposta v7 enviada — aguardar Finatec | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo/) |
| 🟢 | **Simbiose** (#10) | Edição (R$ 800) — acompanhar | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-10-Simbiose/) |
| 🟢 | **RNP Ailton Krenak** (#08) | Pré-produção — acompanhar | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-08-RNP-Ailton-Krenak/) |
| 🟢 | **AGO** | Aprovado / produção | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-AGO/) |
| 🟢 | **FIOCRUZ** | Aprovado / produção | [pasta](../cerebro/CEREBRO-ORACULO/04-PROJETOS-ATIVOS/FIRMA-FIOCRUZ/) |

**Ações manuais no Notion (UI):** configurar 8 filtros de Linked View (Orçamento) · deletar duplicata PRJ-17 (VI SOBRE 2026) · preencher `Fase = Proposta` em 12 itens Maranhã + 4 SOBRE2026.

**Plano-fonte tático:** [PLANO-DE-ACAO.md](PLANO-DE-ACAO.md)

---

## TRILHA 2 · SISTEMA ORÁCULO
*Infraestrutura, desenvolvimento e integrações. Verdade de código/config vive no monorepo (git).*

### Consolidação do monorepo
| Status | Tarefa | Detalhe |
|---|---|---|
| 🔴 | **Usar o monorepo novo por 1 semana** — validar antes do merge | branch `consolidacao-monorepo` |
| 🟡 | Merge `consolidacao-monorepo` → `master` (quando validado) | `git merge` |
| 🟡 | Arquivar `ANTIGRAVITY/` em backup frio + deletar cópia antiga do `ORACULO/` (só pós-merge) | [Mapa-Mestre](MAPA-MESTRE.md) |

### Automações n8n (Fase 2-3)
| Status | Tarefa | Detalhe |
|---|---|---|
| 🟡 | **Montar workflow n8n — inbox universal** (bot Telegram + Groq Whisper) — blueprint pronto | [inbox-universal](../automacoes/inbox-universal.md) |
| 🟡 | Montar workflow n8n — reuniões (transcrição → wiki) | [reuniao-transcricao-wiki](../automacoes/reuniao-transcricao-wiki.md) |
| 🟡 | Testar inbox ponta a ponta (3 capturas → "processar inbox" → notas + wiki) | — |
| 🟢 | Automações A1–A5 (Fase 3) | [Plano-Master](PLANO-MASTER.md) |

### Integrações e ferramentas
| Status | Tarefa | Detalhe |
|---|---|---|
| 🟡 | Google Drive MCP (Fase 2) | [Plano-Master](PLANO-MASTER.md) |
| 🟡 | Frame.io (Fase 2) | [Plano-Master](PLANO-MASTER.md) |
| 🟢 | Site Framer (Fase 2, +R$ 160/mês) | — |
| ✅ | **Fase 1 concluída** — parallel-search, playwright, magic ativados em `.mcp.json` (13 jun) | [Plano-Master §3](PLANO-MASTER.md#3-passo-a-passo-de-expansão) |
| 🟢 | Instalar ferramentas do toolkit Fase 2 (fal.ai, exa, supabase, Google Workspace MCP) | [Triagem de instalação](#triagem-de-instalação) · [Plano-Master §2](PLANO-MASTER.md#2-tabela-mestre-de-ferramentas) |
| 🟢 | Skills novas: dashboard-dev, conselho-criativo, ltx-video | [Plano-Master](PLANO-MASTER.md) |

### Visão e identidade
| Status | Tarefa | Detalhe |
|---|---|---|
| 🟢 | Responder os 5 questionamentos abertos da Visão (nome da casa pessoal, ritual de retorno, linha de privacidade, sucesso pessoal, convite à Jaya) | [VISAO-ORACULO](VISAO-ORACULO.md) |

**Plano-fonte de infra:** [PLANO-MASTER.md](PLANO-MASTER.md)

---

## TRILHA 3 · ORGANIZAÇÃO DO CÉREBRO
*Estruturação e povoamento do vault Obsidian. Verdade de conhecimento vive em `cerebro/`.*

### Migração do vault (Blocos 6-8 pendentes)
| Status | Tarefa | Detalhe |
|---|---|---|
| 🟡 | **Bloco 6** — organizar 58 scripts `.py` da ANTIGRAVITY (têm paths hardcoded; adiado até refatorar) | [PLANO-MIGRACAO](../cerebro/CEREBRO-ORACULO/01-OPERACAO-ORACULO/01.3-ARQUITETURA-TECNICA/PLANO-MIGRACAO.md) |
| 🟡 | **Bloco 7** — documentação faltante (README ANTIGRAVITY, política de credenciais, contratos, template de cliente) | idem |
| 🟡 | **Bloco 8** — audit contra NotebookLM (`notebooklm login` + comparar com ARQUITETURA-SISTEMA) | idem |

### Povoamento (folders skeleton)
| Status | Tarefa | Detalhe |
|---|---|---|
| 🟡 | Popular `wiki/projects/` via `/wiki-ingest` (FAC, VMA, Maranhã, SOBRE2026) — algumas sínteses já existem | [wiki/index](../cerebro/CEREBRO-ORACULO/wiki/index.md) |
| 🟡 | Popular `00-EMPRESA/` (juridico, contratos-modelo, financeiro-empresa, portfolio) | [00-EMPRESA](../cerebro/CEREBRO-ORACULO/00-EMPRESA/_INDEX.md) |
| 🟡 | Popular `02-PROCESSOS-E-MANUAIS/` (15+ SOPs marcados como "futuros") | [02-PROCESSOS](../cerebro/CEREBRO-ORACULO/02-PROCESSOS-E-MANUAIS/) |
| 🟡 | Popular `wiki/resources/` (pessoas: AFD, SEC-DF, UnB · editais) e `wiki/archives/` | — |

### Operação do vault
| Status | Tarefa | Detalhe |
|---|---|---|
| 🟡 | Registrar hooks (`claude hooks set hooks/hooks.json`) | — |
| 🟡 | Testar comandos `/wiki` no Claude Code | — |
| 🟢 | Piloto da biblioteca (08-FELIPE): primeiro livro via NotebookLM → `08.2-BIBLIOTECA/` | [VISAO](VISAO-ORACULO.md) |
| 🟢 | Inventário do acervo pessoal do Felipe (circo, escritos sobre "Oráculo") via `firma-wiki-ingest` | — |

**Plano-fonte do vault:** [PLANO-MIGRACAO.md](../cerebro/CEREBRO-ORACULO/01-OPERACAO-ORACULO/01.3-ARQUITETURA-TECNICA/PLANO-MIGRACAO.md)

---

## Triagem de instalação
*Resposta direta a: "o que dá pra instalar automaticamente, o que precisa de mim?" — tabela completa no [Plano-Master §2](PLANO-MASTER.md#2-tabela-mestre-de-ferramentas).*

| ✅ Fase 1 (já feito — 13 jun) | 🔑 Fase 2: precisa de você (chave/conta) | 💻 Fase 3: instalação local pesada (setup + GPU) |
|---|---|---|
| context7 ✅ | fal.ai → `FAL_KEY` (fal.ai) | LTX-Video (geração de vídeo, RTX 4060 Ti) |
| parallel-search ✅ | exa-web-search → `EXA_API_KEY` (exa.ai, 1k/mês grátis) | OpenMontage (automação de montagem) |
| playwright ✅ | supabase → project ref + access token | Whisper local (transcrição PT-BR) |
| magic ✅ | github → PAT · brave → key | ComfyUI / pymiere (Premiere) |
| Adobe/Firefly ✅ *(nativo)* | Google Workspace MCP (conta Google) | — |

**Como ativar a Fase 2:** você gera a chave no site do serviço, me passa, e eu adiciono ao `.mcp.json`. Reinicie o Claude Code para carregar.

---

## Como manter este painel vivo

- **Início de sessão:** ler este painel + [hot.md](../cerebro/CEREBRO-ORACULO/wiki/hot.md) para saber onde paramos.
- **Fim de sessão:** atualizar os status que mudaram (🔴→✅ etc.) aqui e no plano-fonte correspondente.
- **Regra:** este painel **não duplica** o detalhe dos planos — ele aponta. Se um item cresce, o detalhe vai pro plano-fonte e o painel mantém só a linha de controle.

---

## Mapa dos planos-fonte (onde mora cada detalhe)

| Plano-fonte | Cobre | Lar |
|---|---|---|
| [PLANO-DE-ACAO.md](PLANO-DE-ACAO.md) | Tarefas táticas da semana (Firma + Oráculo) | `docs/` |
| [PLANO-MASTER.md](PLANO-MASTER.md) | Arquitetura, tabela de ferramentas e expansão (Fases 0-5) | `docs/` |
| [VISAO-ORACULO.md](VISAO-ORACULO.md) | Constituição: o quê e porquê | `docs/` |
| [PLANO-MIGRACAO.md](../cerebro/CEREBRO-ORACULO/01-OPERACAO-ORACULO/01.3-ARQUITETURA-TECNICA/PLANO-MIGRACAO.md) | 8 blocos de reorganização do vault | vault |
| [STATUS.md](../cerebro/CEREBRO-ORACULO/01-OPERACAO-ORACULO/01.1-DIRETRIZES-GERAIS/STATUS.md) | Log detalhado sessão a sessão | vault |

---
*Oráculo — Firma Abacaxi · um lugar para o controle, muitos planos para o detalhe · 2026*
