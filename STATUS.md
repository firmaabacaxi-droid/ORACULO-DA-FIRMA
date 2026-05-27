# STATUS DO ORÁCULO — Handoff de Sessão
## Firma Abacaxi · atualizado 27 Mai 2026 · Sessão 11

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

## SESSÃO 11 — Estrutura Financeira + Projetos em Mãos (27 Mai 2026)

### ✅ Concluído nesta sessão

**Problema central:** A firma envia propostas com orçamento, mas na execução o escopo muda. Não havia mecanismo para rastrear proposta vs. realizado.

**Ações tomadas:**

1. ✅ **Pesquisa de melhores práticas** — analisado padrão da indústria audiovisual (Movie Magic, Airtable, GreenSlate, Notion templates)
   - Conclusão: 3 tabelas relacionadas (não uma tabela única, não uma por projeto)

2. ✅ **Novos projetos com propostas em mãos:**
   - **Maranhã** (Gravação 28-29/05 — 🔴 AMANHÃ!)
     - Cliente: Maranhã (contato Juliana) | Status: Aprovado | R$ 10.573,86
   - **SOBRE2026** (VI Conferência Brasileira de Restauração Ecológica, UnB 27-31/07)
     - Cliente: SOBRE2026 (contato Viviane) | Status: Prospecção | R$ 58.124,08

3. ✅ **Banco FILMAGEM** criado — cada dia = 1 registro
   - Data Source ID: `collection://bc067267-b603-41fc-bb75-c00050cec4cc`
   - 2 registros criados para Maranhã (dias 28 e 29/05)
   - Campos: Nome da filmagem, Projeto, Data, Local, Equipe escalada, Equipamentos, Ordem do dia, Roteiro, Status, Observações

4. ✅ **Banco ORÇAMENTO** criado — proposta detalhada por projeto
   - Data Source ID: `collection://1acaa528-4627-4817-8d43-093d3ad19137`
   - **Campo crítico:** `Versão` (Original / Aditivo 001...) para rastrear mudanças sem alterar proposta original
   - 8 itens Maranhã registrados (diárias, câmera, som, iluminação, imposto)
   - 4 itens SOBRE2026 registrados (pré-prod, produção, pós-prod, imposto)

5. ✅ **Banco FINANCEIRO_PROJETO** criado — transações reais por projeto
   - Data Source ID: `collection://cd8f5929-87b0-431b-b392-00b49a11b98e`
   - Vincula ao ORÇAMENTO para Budget vs. Actual automático
   - Campos: Descrição, Projeto, Item do orçamento, Tipo, Categoria, Valor, Data real, Status, Forma de pagamento, Comprovante, Número NF, Nota fiscal

6. ✅ **Banco GESTÃO_FINANCEIRA_EMPRESA** criado — despesas da empresa
   - Data Source ID: `collection://3a29ba12-7582-458e-bbbb-f631cfcbef35`
   - Aluguel, assinaturas (Adobe CC), pró-labore, taxas bancárias, equipamentos, marketing, etc.
   - Opcional: relação com PROJETO_2026 para despesas que afetam um projeto

7. ✅ **Documentação atualizada:**
   - ARQUITETURA_NOTION.md: adicionado IDs e schemas dos 4 novos bancos (FILMAGEM, ORÇAMENTO, FINANCEIRO_PROJETO, GFE)
   - STATUS.md: atualizado com dados de Sessão 11

**Totais criados nesta sessão:**
- 2 novos clientes: Juliana (contato Maranhã), Viviane (contato SOBRE2026), Maranhã (cliente), SOBRE2026 (cliente)
- 2 novos projetos: Maranhã, VI SOBRE 2026
- 4 novos bancos Notion: FILMAGEM, ORÇAMENTO, FINANCEIRO_PROJETO, GESTÃO_FINANCEIRA_EMPRESA
- 2 registros de filmagem: Maranhã dia 1 (28/05), Maranhã dia 2 (29/05)
- 12 itens de orçamento: 8 Maranhã + 4 SOBRE2026

### 🔴 NÃO foi feito:
- Rollups cruzados (Notion tem limitações — fazer manualmente no UI depois)
- Automações n8n/Make (Fase 3)
- Integração Asaas (Fase 3)

### 🟡 Próximos passos recomendados:
1. Quando Maranhã finalizar filmagem (29/05): atualizar FILMAGEM status para "Finalizado"
2. Se SOBRE2026 aprovar proposta: criar CRONOGRAMA e equipamentos necessários
3. Revisar status de tarefas e projetos antigos (conforme usuária indicou)
4. Começar a registrar despesas no FINANCEIRO_PROJETO conforme ocorrerem no Maranhã

---

## O QUE FOI CONCLUÍDO (Sessões 1–11)

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

---

## SESSÃO 12 — Revisão de Projetos em Andamento: SIMBIOSE (27 Mai 2026)

### ✅ Concluído nesta sessão

**Projeto: #10 COMUNICAÇÃO SIMBIOSE**
- Gravação realizada, material entregue para análise
- Fase atual: EDIÇÃO

**Ações tomadas:**

1. ✅ **Banco EDIÇÃO criado** — rastreia progresso de edição de vídeos e fotos
   - Data Source ID: `collection://0b437e77-08c6-4f6e-a133-5ca3f682ab58`
   - 9 campos: Nome / Projeto / Etapa de edição / Editor / Prazo / Software / Pasta / Status / Tipo de entrega / Observações
   - Parent: wiki 🔮 ORÁCULO - FIRMA ABACAXI

2. ✅ **Registro de edição do SIMBIOSE criado**
   - "SIMBIOSE — Vídeo 1min30s"
   - Etapa: Edição bruta
   - Tipo: Ambos (vídeo + fotos)
   - Status: Em andamento

3. ✅ **Tarefa "AGENDAR AS FOTOS" marcada como Concluída**

4. ✅ **2 novas tarefas de edição criadas**
   - "Editar vídeo 1min30s — imagens da casa (SIMBIOSE)"
   - "Editar fotos solicitadas pelo cliente (SIMBIOSE)"
   - Ambas: Prioridade Alta, Status A fazer

5. ✅ **Projeto #10 SIMBIOSE atualizado**
   - Status: Edição (era "Não Iniciado")
   - Etapa atual: Edição (era "ACOMPANHAMENTO")
   - Prioridade: Alta (era vazio)
   - Tipo de projeto: Redes
   - Valor contratado: R$ 800,00

### 🔍 Análise do Overlap: Status vs. Etapa atual

**Problema:** Campos Status e Etapa atual pareciam redundantes (ambos rastreando fases do workflow).

**Decisão tomada (confirmada pela usuária):** Separar os papéis

| Campo | Antes | Agora |
|---|---|---|
| **Status** | Prospecção/Briefing/Proposta/Aprovado/Pré-produção/Em produção/Edição/Entrega/Concluído/Cancelado | Será simplificado para: Ativo / Pausado / Concluído / Cancelado |
| **Etapa atual** | 13 etapas do workflow | Permanece: Pré-produção / Em produção / Edição / Entrega |

> **Ação manual necessária:** Usuária deve remover/renomear as opções antigas de Status na interface do Notion (Prospecção, Briefing, Proposta, etc.). A API não consegue editar nomes de opções select existentes, mas pode criar novos valores. O Oráculo começará a usar Ativo/Pausado/Concluído/Cancelado.

### 📊 Totais da Sessão 12
- 1 banco criado: EDIÇÃO
- 1 registro de edição criado
- 1 tarefa marcada como concluída
- 2 novas tarefas criadas
- 1 projeto atualizado com informações completas

### 🔴 Pendências identificadas

**Para a usuária (UI do Notion):**
- Remover valores antigos de Status no banco PROJETO_2026 (ou renomeá-los)
- Validar se a separação Status/Etapa atual está funcionando

**Para próximas sessões:**
- Revisar outros projetos em andamento (RNP KRENAK #08, OFICINAS DOC #16, etc.)
- Criar registros de edição para projetos que estão em fase de pós-produção
- Implementar rollups automáticos no banco EDIÇÃO (horas estimadas vs. reais)

---

*Atualizado ao final da Sessão 12 — 27 Mai 2026 · Oráculo v1.3*
