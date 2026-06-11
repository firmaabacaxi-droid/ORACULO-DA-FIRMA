---
type: hot-cache
updated: 2026-06-11
---
# Hot Cache — Firma Abacaxi

*Contexto recente do vault. Recarregado automaticamente no início de cada sessão com o Oráculo.*

---

## Última atualização
**Sessão 21-22 (11 jun 2026):** Monorepo consolidado completo + vault limpo + fluxo de reuniões projetado

## Estado atual da Firma

**Produtora audiovisual** focada em documentário, conteúdo educativo e produção para públicos especializados. Baseada em Brasília. Sócios: Filipe (produção, direção) e Jaya (outras funções TBD).

**Faturamento 2026 (até agora):** ~R$ 160k (5 projetos com propostas + 3 em prospecção).  
**8 clientes principais:** RNP, SIMBIOSE, Maranhã, SOBRE2026, Brasil Participativo, AGO, FIOCRUZ, AFD.

**Infraestrutura:** Notion (12 bancos) + Cérebro (vault Obsidian) + Drive (rclone) + NotebookLM (9 fontes) + Local (scripts/skills).

## Projetos ativos (status crítico)

| Projeto | Deadline | Status | Valor |
|---------|----------|--------|-------|
| **FAC-2026** "Todas as Histórias do Mundo" | ⚠️ VENCIDO (05 jun) | Conceito + Orçamento + Cronograma prontos | R$ 199.300 |
| **Visite mon Agence** (AFD Brasília) | Produção set: 2026 | Pré-produção | R$ 15.871,52 |
| **Maranhã** (#16) | Filmagem: 28-29 mai | ✅ Finalizado | R$ 10.573,86 |
| **SOBRE2026** (Ecologia UnB) | 27-31 jul | Prospecção ativa | R$ 58.124,08 |
| **Brasil Participativo** (#04) | TBD | Briefing | TBD |
| **Simbiose** (#10), **RNP** (#08) | TBD | Prospecção | TBD |

## Integrações operacionais (S20)

- **Notion:** 12 bancos ativos (PROJETO_2026, TAREFAS, CLIENTES, CRM, CONTATOS, PROPOSTAS, FILMAGEM, EDIÇÃO, ORÇAMENTO, FINANCEIRO_PROJETO, GESTÃO_FINANCEIRA_EMPRESA, TAREFAS DA FIRMA)
- **Cérebro (vault Obsidian):** Estrutura PARA (8 pastas trabalho + wiki síntese) — absorção automática de conhecimento
- **GitHub:** Sync automático via Obsidian Git (30 min) + hooks (SessionStart, IngestRequest)
- **NotebookLM:** 9 fontes indexadas, gera áudios/resumos, indexa também repositório GitHub
- **Google Drive:** rclone ativo para assets (FIRMA ABACAXI/PROJETOS/2026/[projeto]/)

## Estrutura do vault

- **00-07:** Camada de trabalho operacional (pastas estruturadas, documentos reais)
- **wiki/:** Camada de síntese (conhecimento gerado pelo Oráculo)
  - `hot.md` (este arquivo)
  - `index.md` (catálogo)
  - `projects/` (FAC-2026, VMA, etc.)
  - `areas/` (captação, financeiro)
  - `resources/` (pessoas, editais, referências)

## Próximos passos (ver docs/PLANO-DE-ACAO.md)

🔴 **Esta semana:**
- Maranhã: entregar pós-produção (~15 jun)
- SOBRE2026: confirmar proposta R$ 58.124 com UnB
- Usar monorepo novo por 1 semana (validar antes de merge)

⭐ **Próxima sessão — Revisão do Cérebro:**
- Popular `wiki/projects/` (FAC-2026, VMA, SOBRE2026) via `/wiki-ingest`
- Revisar estrutura dos projetos ativos em `04-PROJETOS-ATIVOS/`
- Testar fluxo de reunião: voz → Telegram → `00-INBOX/reunioes/`

🟡 **Infraestrutura pendente:**
- Montar workflow n8n (blueprint em `automacoes/reuniao-transcricao-wiki.md`)
- Merge `consolidacao-monorepo` → master (após validação)
- Arquivar ANTIGRAVITY

## Status dos projetos ativos

| Projeto | Status | Próxima ação |
|---|---|---|
| **FAC-2026** "Todas as Histórias do Mundo" | ⚠️ Deadline vencida (05 jun) | Verificar situação com FAC |
| **Visite mon Agence** (AFD, R$ 15.871) | Pré-produção | Scouting + contratar produtor |
| **Maranhã** (#16, R$ 10.573) | Pós-produção | Entrega ~15 jun |
| **SOBRE2026** (UnB, R$ 58.124) | Proposta em negociação | Confirmar com cliente |
| **Brasil Participativo** (#04) | Briefing | Definir escopo |

## Reuniões recentes

*Nenhuma reunião processada ainda. As próximas aparecerão aqui após ingestão via `/wiki-ingest`.*

---

## Consolidação monorepo (11 jun 2026)

Branch `consolidacao-monorepo` concluída (Blocos 1-8). Monorepo unificado em `ORACULO - FIRMA ABACAXI/` com:
- ECC research (526 arq) + 31 skills Firma + 3 agentes (.claude/)
- Vault Obsidian limpo: só markdown + .canvas + .base + scripts/
- Novo fluxo: reuniões de voz → Telegram → n8n → Groq Whisper → 00-INBOX/reunioes/
- Arquivos de trabalho (XLSX, DOCX, PDF) movidos para `FIRMA-ABACAXI-DOCS/`
- Credenciais em `~/.secrets/`

---

*Leia `wiki/index.md` para o catálogo completo. Leia `.claude/CLAUDE.md` para identidade e routing do Oráculo.*
