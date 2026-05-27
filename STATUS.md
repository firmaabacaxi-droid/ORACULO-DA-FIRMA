# STATUS DO ORÁCULO — Handoff de Sessão
## Firma Abacaxi · atualizado 27 Mai 2026 · Sessão 10

---

## ESTADO ATUAL DO SISTEMA

> Leia este arquivo no início de toda sessão. Captura onde paramos, o que funciona e o que vem a seguir.

---

## SESSÃO 10 — Migração do Notion Beta + Documentação Notion (27 Mai 2026)

### ✅ Concluído nesta sessão

**Problema identificado:**
- Oráculo estava criando registros em workspace ANTIGO (ORACULO TESTES, ORACULO V7) — versões descontinuadas

**Ações tomadas:**
1. ✅ Usuária removeu pasta antiga do sistema
2. ✅ Identificou URL canônica correta: https://www.notion.so/3288a52591f381a0885fc20691f28468 (🔮 ORÁCULO -FIRMA ABACAXi)
3. ✅ Atualizou CLAUDE.md com URL canônica + regra de parent obrigatório
4. ✅ Atualizou ARQUITETURA_NOTION.md com seção "Parent obrigatório"
5. ✅ Criou memory/notion_parent_canonical.md (referência persistente)
6. ✅ Explorou e mapeou 6 bancos corretos dentro da wiki (schemas completos)
7. ✅ **Migração completa executada:**
   - 3 clientes criados: RNP, SIMBIOSE, Tâmara
   - 5 projetos criados: #16 OFICINAS, #08 RNP, #10 SIMBIOSE, #14 AGO, #15 FILMMAKER
   - 8 tarefas de projetos vinculadas (5 + 2 + 1)
   - 9 atividades gerais (sem projeto vinculado)
   - **Total: 3 clientes + 5 projetos + 17 tarefas**

**Workspace correto agora:**
```
🔮 ORÁCULO -FIRMA ABACAXi (wiki)
  ✅ Projeto 2026      → ba03e1a5-9656-4a97-8f0b-2ebdba19b434
  ✅ Tarefas           → 2a3345d3-9bd7-4d7d-a1a9-9fff26560386
  ✅ Clientes          → 82984a0b-b757-4a6a-8a5d-6c66782ad99c
  ✅ CRM               → 21759e84-e3cc-4949-b465-255db7177f16
  ✅ Contatos          → cfd457d2-ad54-4790-be3e-0d180bed50f6
  ✅ Propostas         → 3548a525-91f3-80b8-9f68-000b6b5b0eec
```

### 🔴 NÃO foi feito (pendências):
- Não foram registradas cobranças no CRM (usuária confirmou que já foram pagas)
- Não foram criados bancos FILMAGEM/EDIÇÃO (Fase 3 — ainda não urgente)

---

## O QUE FOI CONCLUÍDO (Sessões 1–10)

### Infraestrutura — ✅ Operacional
```
✅ Claude Code (VS Code) + Oráculo ativo
✅ Notion MCP — leitura e escrita confirmadas nos 6 bancos
✅ Obsidian MCP — vault sincronizado em cerebro/CEREBRO-ORACULO/
✅ NotebookLM MCP — pipeline CLI funcional (MD/PDF → notebook → áudio)
✅ Brave Search MCP — pesquisa de mercado e benchmarks
✅ DuckDuckGo MCP — pesquisa adicional
✅ Filesystem MCP — leitura/escrita em arquivos locais
✅ Git — limpo, sem credenciais, .gitignore protegendo dados sensíveis
```

### Notion — 6 bancos Fase 1 ativos
```
Hub: 🔮 ORÁCULO - FIRMA ABACAXI
  ✅ PROJETO_2026   → 2c031822-5594-4204-826b-752d5c2897bc
  ✅ CLIENTES       → b08a5316-af2c-4fc7-9815-a5f50ac8e654
  ✅ CONTATOS       → 43fa1821-83f1-47e4-9ba3-711ca8c3a210
  ✅ PROPOSTAS      → 3548a525-91f3-80e6-b542-e2e651ed5dfc
  ✅ CRM            → 5240a3c2-d0d1-4726-b23b-96463f5cc615
  ✅ TAREFAS        → 6c3ccf72-5539-43f6-9fbb-7906142a246d
  ⏳ 19 bancos Fase 2+ — documentados em docs/ARQUITETURA_NOTION.md, não criados
```

### Skills — 7 skills operacionais + 8 Antigravity
```
✅ skills/prospeccao/SKILL.md + MARKETING_CAPTACAO.md
✅ skills/proposta/SKILL.md + blocos_xml.md + assets/MODELO_ORCAMENTO.docx
✅ skills/preproducao/SKILL.md (skill orquestradora)
✅ skills/producao/SKILL.md
✅ skills/gestao/SKILL.md (skill orquestradora)
✅ skills/conteudo/SKILL.md (skill orquestradora)
✅ skills/humanizador/SKILL.md (aplica em todo texto externo)
✅ skills/antigravity/ — 8 skills técnicas (negotiation-voss, marketing-psychology,
   financial-calculator-pro, cinematic-script-writer, photography-settings,
   exec-admin, budget-planner, automation-workflows)
```

### Templates de produção — 10 templates criados (Sessão 8)
```
cerebro/CEREBRO-ORACULO/01-FIRMA/TEMPLATES/
✅ Template-Ordem-do-Dia.md
✅ Template-Log-Filmagem.md
✅ Template-Roteiro-Literario.md
✅ Template-Roteiro-Tecnico.md
✅ Template-Plano-Rodagem.md
✅ Template-Analise-Tecnica.md
✅ Template-Boletim-Camera-Som.md
✅ Template-Ficha-Continuidade.md
✅ Template-Autorizacoes-Contratos.md
✅ Template-Projeto-Audiovisual.md
```

### Propostas geradas (projetos reais)
```
output/propostas/
✅ BrasilParticipativo_proposta_v1 a v4 — documentário LabLivre/UnB (Lipe revisou v4)
✅ SuperHost_proposta_v1 — evento/institucional
✅ EventoUnB_proposta_v1 — registro de evento
```

### Documentação base — ✅ Revisada e consistente (Sessões 6–8)
```
✅ docs/CONTEXTO_FIRMA.md     — DNA completo, preços, clientes
✅ docs/FLUXO_TRABALHO.md     — 13 etapas + Etapa 0 (marketing)
✅ docs/ARQUITETURA_NOTION.md — 25 bancos V2 com schemas
✅ docs/TABELA_PRECOS.md      — 140+ orçamentos históricos, validado por Lipe
✅ MEMORIA.md                 — 13+ aprendizados de projetos reais
✅ CLAUDE.md                  — Reescrito na Sessão 8 (~250 linhas, modular)
```

### Auditoria e Calibração (Sessão 9)
```
✅ Auditoria física completa dos diretórios (100% íntegra)
✅ Sincronização dos 6 IDs de banco no STATUS.md e regras (.claude/rules/notion-schema.md)
✅ Teste de pulsação e leitura bem-sucedida das 6 bases do Notion via API
✅ Mapeamento de vulnerabilidades do .mcp.json (segredos seguros no .gitignore)
```

---

## O QUE AINDA NÃO ESTÁ PRONTO

### ⏳ Subagentes (aguardando ação de Lipe/Jaya)
```
System prompts prontos em: docs/arquivo/SUBAGENTES.md
Ação necessária: criar 5 Projects no claude.ai com esses prompts
  - Agente de Proposta
  - Agente de Pré-produção
  - Agente de Gestão
  - Agente de Conteúdo
  - Agente de Prospecção (futuro)
```

### 📌 Fase 2 — Não iniciada
```
Google Drive MCP → acesso a arquivos de projetos
Frame.io         → aprovação de vídeos pelo cliente
Domínio + Framer → site da Firma
Custo: ~+R$160/mês
```

### 📌 Fase 3 — Não iniciada
```
Make/n8n → 5 automações (A1–A5)
Whisper  → transcrição de briefings gravados
ElevenLabs → voice-over profissional
Custo: ~+R$110/mês
```

---

## PRÓXIMOS PASSOS — por prioridade

### 🔴 Ação imediata
1. **Criar subagentes no claude.ai** — system prompts em docs/arquivo/SUBAGENTES.md
2. **Cadastrar clientes reais no Notion** — CNV, Tamause, Vert, Cerrado, Chichá

### 🟡 Próximas sessões (Fase 2)
3. Contratar Google Drive (Workspace) — acesso a arquivos de projetos via MCP
4. Frame.io — aprovação de vídeo pelo cliente
5. Site da Firma — domínio + Framer

### ⚪ Fase 3+
6. Primeira automação n8n (A1: proposta aprovada → projeto Notion automático)
7. Bot Telegram — Oráculo no celular sem PC
8. Whisper — transcrição de briefings gravados

---

## COMO USAR O ORÁCULO AGORA

```
"Quero fazer uma proposta para [cliente]"
→ Oráculo lê skills/proposta/SKILL.md → briefing → pesquisa → Word em output/propostas/

"Novo cliente: [nome], precisa de [projeto]"
→ Oráculo lê skills/prospeccao/SKILL.md → qualificação → briefing → Notion CRM

"Qual é a ordem do dia?"
→ Oráculo lê skills/gestao/SKILL.md → consulta Notion → Ordem do Dia priorizada

"Preciso de um roteiro para [projeto]"
→ Oráculo lê skills/preproducao/SKILL.md → perguntas de direção → roteiro + decupagem
```

---

## REFERÊNCIAS RÁPIDAS

```
CLAUDE.md                     → Identidade + routing de skills (leia sempre)
docs/CONTEXTO_FIRMA.md        → DNA, preços, clientes, equipe
docs/FLUXO_TRABALHO.md        → 13 etapas com responsáveis e ferramentas
docs/ARQUITETURA_NOTION.md    → 25 bancos — schemas e IDs
docs/TABELA_PRECOS.md         → Preços de referência + regras de precificação
docs/arquivo/SUBAGENTES.md    → 5 system prompts para criar no claude.ai
MEMORIA.md                    → Aprendizados de projetos reais
output/                       → O que o Oráculo produziu
```

---

*Atualizado ao final da Sessão 9 — 27 Mai 2026 · Oráculo v1.3*
