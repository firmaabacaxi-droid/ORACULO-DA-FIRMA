---
data: 2026-06-11
tipo: log-sessao
sessao: 21-22
assunto: Consolidação do monorepo + limpeza do vault + fluxo de reuniões
status: concluido
---

# Sessão 21-22 — Consolidação Monorepo + Fluxo Reuniões

## O que foi feito

### Continuação da consolidação (Blocos 4-8)

A sessão começou com a consolidação do monorepo já em andamento (Blocos 1-3 feitos em sessão anterior). Foram completados:

**Bloco 4** — Código e scripts migrados do ANTIGRAVITY:
- `oraculo-app/` (Next.js dashboard, 49 arquivos, sem .next/)
- `automacoes/` (5 arquivos: workflows n8n + 4 blueprints de negócio)
- `scripts/operacional/` (18 scripts ativos)
- `scripts/legado/` (42 scripts históricos)

**Bloco 5** — Identidade unificada do Oráculo:
- `.claude/CLAUDE.md` criado: funde ANTIGRAVITY/AGENTS.md (n8n, automação), CEREBRO/CLAUDE.md (vault, wiki) e 01.1-DIRETRIZES-GERAIS/CLAUDE.md (terceiro sócio, routing, Notion)
- Define claramente: Notion = dados estruturados; Obsidian = conhecimento
- 3 agentes do vault → `.claude/agents/firma-{verifier, wiki-ingest, wiki-lint}`

**Bloco 6** — Vault limpo (primeira passada):
- 12 arquivos removidos do tracking git (xlsx, docx, ods, html)
- `.gitignore` atualizado com extensões de arquivos de trabalho

**Bloco 7** — Credenciais:
- `~/.secrets/` criada com `google_service_account.json` e `.env`
- `.gitignore` cobre todas as extensões de credencial

**Bloco 8 parcial** — Documentação:
- `docs/MAPA-MESTRE.md` reescrito para nova arquitetura de 3 lares

### Limpeza física do vault (segunda sessão)

Pedido: tirar todos os arquivos não-.md do vault.

- Criada `C:\Users\User\Documents\FIRMA-ABACAXI-DOCS\` com 5 subpastas
- Movidos 32+ arquivos (DOCX, XLSX, ODS, PDF, ODP, graphify-out)
- Deletados 2 PNGs sem valor (thumbnails de exportação)
- **Vault agora: só markdown + .canvas + .base + scripts/ do sistema wiki**
- Scripts Python/Shell (`cerebro/scripts/`) ficam — são o motor BM25/retrieval

### Fluxo de reuniões + NotebookLM

Projetado e implementado o fluxo completo:

**Arquitetura:**
```
Voz no celular → Telegram (bot da Firma) → n8n → Groq Whisper → markdown → 00-INBOX/reunioes/ → Oráculo (/wiki-ingest) → wiki/meetings/ → hot.md → GitHub → NotebookLM
```

**O que foi criado:**
- `00-INBOX/reunioes/README.md` — pasta de entrada, formato padronizado, instruções
- `automacoes/reuniao-transcricao-wiki.md` — blueprint completo do workflow n8n (7 nodos)
- `wiki-ingest/SKILL.md` — nova seção para processar transcrições de reunião
- `wiki/hot.md` — adicionada seção "Reuniões recentes"

## Decisões tomadas

| Decisão | Razão |
|---|---|
| Scripts Python/Shell ficam em `cerebro/scripts/` | São o motor do sistema wiki (BM25, retrieval) — não são "documentos" |
| Destino dos arquivos não-md: `FIRMA-ABACAXI-DOCS/` fora do vault | Acessível no Explorer sem poluir Obsidian |
| n8n → Groq Whisper para transcrição | Gratuito até 2h/dia, qualidade alta, já integrado no n8n |
| Transcrições pousam em `00-INBOX/reunioes/` | Ingestão manual pelo Oráculo dá controle antes de criar tarefas no Notion |

## Commits da sessão

```
6148494 Fluxo reunioes + NotebookLM: inbox, blueprint n8n, skill, hot.md
119db54 Vault limpo: arquivos nao-md movidos para FIRMA-ABACAXI-DOCS/
c1bbf97 Bloco 8 (parcial): atualizar MAPA-MESTRE para monorepo consolidado
d4bb685 Bloco 7: segredos e credenciais
820d3ed Bloco 6: limpar arquivos nao-markdown do vault
6f16ca1 Bloco 5: unificar identidade do Oraculo
92b979a Bloco 4: consolidar scripts + codigo do ANTIGRAVITY
```

## Próximos passos (ver docs/PLANO-DE-ACAO.md)

### Infraestrutura (prioritário)
1. **Montar workflow n8n** — seguir `automacoes/reuniao-transcricao-wiki.md`, precisar de Groq API key
2. **Merge monorepo** — após ~1 semana de uso real: `git merge consolidacao-monorepo` → master
3. **Arquivar ANTIGRAVITY** — mover para backup frio após merge confirmado

### Projetos ativos
4. **Visite mon Agence** — pré-produção, scouting, produtor
5. **SOBRE2026** — confirmar proposta R$ 58.124 com UnB
6. **Maranhã** — finalizar pós-produção (entrega ~15 jun)

### Cérebro (revisão pendente)
7. **Revisar estrutura do cérebro** — o usuário identificou que a revisão do cérebro é crítica para próximas etapas — fazer em sessão dedicada
8. **Popular wiki/projects/** para cada projeto ativo via `/wiki-ingest`
9. **Testar fluxo completo** na prática: enviar voz → verificar transcricao em 00-INBOX/reunioes/

---
*Log gerado pelo Oráculo — Sessão 21-22 — 11 jun 2026*
