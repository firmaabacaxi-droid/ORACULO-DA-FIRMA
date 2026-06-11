---
type: hot-cache
updated: 2026-06-11
---
# Hot Cache — Firma Abacaxi

*Contexto recente do vault. Recarregado automaticamente no início de cada sessão com o Oráculo.*

---

## Última atualização
**Sessão 20 (07 jun 2026):** Implementação claude-obsidian + wiki PARA + arquitetura 4 sistemas

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

## Active threads (pendências urgentes — S20)

1. **FAC-2026 "Todas as Histórias do Mundo":** 
   - ✅ Conceito + Orçamento (38 itens, R$ 199.300) + Cronograma (6 meses, 26 atividades) — prontos
   - ✅ Painel visual (9 prompts DALL-E, impressionístico teatral) — página Notion criada (S19)
   - 🟡 Roteiro v3 final + 9 imagens inseridas (pendente você gerar no ChatGPT)
   - 🟡 Ficha técnica, documentação final
   - ⏳ **Status atual:** Documentação 100% redigida, pronta para blocos B–E da FAC
   - **Próximo:** Render final para PDF + envio

2. **Visite mon Agence (AFD Brasília):** 
   - 📝 Documentário 5–6 min, francês, pré-produção
   - 💰 R$ 15.871,52 (proposta validada)
   - ⏳ Scouting + produtor

3. **Maranhã (#16):** 
   - ✅ Filmagem concluída (28-29 mai)
   - 🟡 Pós-produção (edição bruta em andamento)
   - ⏳ Entrega finalizada: ~15 jun

4. **SOBRE2026 (Conferência UnB 27-31 jul):** 
   - 📝 Proposta em negociação (R$ 58.124,08)
   - ⏳ Confirmação cliente

5. **Cérebro-Setup (S20):** 
   - ✅ Estrutura PARA completa
   - ✅ 4 documentações de automação criadas
   - ✅ Wiki base + hot.md + logs (S17–20)
   - ⏳ Próximas: renomear pastas (FIRMA-, ORACULO-), fechar logs 17–19
   - ⏳ Testar primeira absorção completa

6. **Notion Dashboard (S17):**
   - ✅ 12 bancos mapeados e sincroni­zados
   - ✅ Dashboard web premium criado (output/dashboard/)
   - ✅ Budget vs. Actual ativo (variância automática)

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
