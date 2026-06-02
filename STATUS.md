# STATUS DO ORÁCULO — Handoff de Sessão
## Firma Abacaxi · atualizado 01 Jun 2026 · Sessão 17

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

### Notion — 12 bancos Fase 1-3 ativos
```
Hub: 🔮 ORÁCULO - FIRMA ABACAXI (ID: 3288a525-91f3-81a0-885f-c20691f28468)
  ✅ PROJETO_2026              → 2c031822-5594-4204-826b-752d5c2897bc
  ✅ CLIENTES                  → b08a5316-af2c-4fc7-9815-a5f50ac8e654
  ✅ CONTATOS                  → 43fa1821-83f1-47e4-9ba3-711ca8c3a210
  ✅ PROPOSTAS                 → 3548a525-91f3-80e6-b542-e2e651ed5dfc
  ✅ CRM                       → 5240a3c2-d0d1-4726-b23b-96463f5cc615
  ✅ TAREFAS                   → 6c3ccf72-5539-43f6-9fbb-7906142a246d
  ✅ ORÇAMENTO                 → 0652762f-bac3-4a0b-ad3c-2b7223132a2b
  ✅ EDIÇÃO                    → 7f7422fc-cf76-4196-80de-c60c6a49df55
  ✅ FILMAGEM                  → 2a5f9302-689f-440e-985c-c3b16362a4fe
  ✅ FINANCEIRO_PROJETO        → a263e225-a5e4-427d-a887-d2e56ba12fb5
  ✅ GESTÃO_FINANCEIRA_EMPRESA → 6b663765-f604-405b-a6eb-d9a5cba008af
  ✅ TAREFAS DA FIRMA          → 3728a525-91f3-802d-ae2f-e15b167b1ff8
  ⏳ 13 bancos Fase 2/3+ pendentes — ver docs/ARQUITETURA_NOTION.md
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
cerebro/CEREBRO-ORACULO/01-OPERACAO-ORACULO/TEMPLATES/
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

---

## SESSÃO 12 (continuação) — Correção de Relacionamentos Bidirecionais: DUAL Relations (27 Mai 2026)

### ✅ Concluído nesta etapa

**Problema:** Os 5 bancos criados (FILMAGEM, EDIÇÃO, ORÇAMENTO, FINANCEIRO_PROJETO, GESTÃO_FINANCEIRA_EMPRESA) tinham relacionamentos mão única com PROJETO_2026 — o usuário não conseguia ver as filmagens/edições/orçamentos ao abrir um projeto.

**Solução:** Converter todos para `dual_property` via API Notion.

**Ações tomadas:**

1. ✅ **Auditoria de relacionamentos** — Identificadas 5 relações unidirecionais críticas
2. ✅ **Conversão para DUAL** — Alteradas 5 relações:
   - FILMAGEM.Projeto → DUAL → criou PROJETO_2026.Filmagens
   - EDIÇÃO.Projeto → DUAL → criou PROJETO_2026.Edições
   - ORÇAMENTO.Projeto → DUAL → criou PROJETO_2026.Orçamentos
   - FINANCEIRO_PROJETO.Projeto → DUAL → criou PROJETO_2026.Financeiro do Projeto
   - GESTÃO_FINANCEIRA_EMPRESA.Projeto relacionado → DUAL → criou PROJETO_2026.Gestão Financeira

3. ✅ **Verificação** — PROJETO_2026 agora tem 5 novos campos com `propertyUrl` (bidirecional confirmado)

### 📊 Resultado final

**Antes:** 4 relacionamentos DUAL (PROJETO ↔ CLIENTES/PROPOSTAS/TAREFAS/CONTATOS)
**Depois:** 9 relacionamentos DUAL (adicionados os 5 novos)

**Impacto para o usuário:**
- Ao abrir projeto SIMBIOSE agora aparece:
  - Campo `Edições` com "SIMBIOSE — Vídeo 1min30s" vinculado
  - Campo `Filmagens` (vazio — não há filmagem registrada ainda)
  - Campo `Orçamentos` (vazio — não há orçamento vinculado ao SIMBIOSE)
  - Campo `Financeiro do Projeto` (vazio)
  - Campo `Gestão Financeira` (vazio)

Os usuários agora conseguem navegar bidirecionalm entre projeto → filmagem/edição/orçamento e vice-versa.

---

## SESSÃO 13 — Auditoria Completa de Bidimensionalidades em Todos os Projetos (27 Mai 2026)

### ✅ Concluído nesta sessão

**Problema identificado:**
- Maranhã tinha 2 filmagens criadas mas NÃO vinculadas ao projeto
- Outros projetos abertos não tinham registros de filmagem/edição/orçamento ainda
- Necessário mapear estado completo de bidimensionalidades em todos os 8 projetos abertos

**Ações tomadas:**

1. ✅ **Vinculação de Filmagens Maranhã** 
   - Maranhã — Dia 1 (28/05/2026) → vinculada ao projeto #16
   - Maranhã — Dia 2 (29/05/2026) → vinculada ao projeto #16
   - Confirmado: campo "Filmagens" no projeto agora exibe ambas as filmagens ✓

2. ✅ **Auditoria de Bidimensionalidades — Estado Atual:**

| Projeto | Status | Filmagens | Edições | Orçamentos | Financeiro |
|---------|--------|-----------|---------|------------|-----------|
| #10 SIMBIOSE | Briefing | ❌ 0 | ✅ 1 (Vídeo 1min30s) | ❌ 0 | ❌ 0 |
| #16 Maranhã — Grav. 28-29/05 | Aprovado | ✅ 2 (Dia 1, Dia 2) | ❌ 0 | ✅ 12 items | ❌ 0 |
| #08 RNP Ailton Krenak | Aprovado | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 |
| #14 AGO | Aprovado | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 |
| #16 Oficinas de Documentário | Em produção | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 |
| #15 Filmmaker Independente | Pausado | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 |
| Visite mon Agencé | Em produção | ❌ 0 | ❌ 0 | ✅ (R$ 1.000) | ❌ 0 |
| FIOCRUZ REDE COLABORA | Em produção | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 |

**Conclusão:** 
- Maranhã é o único projeto com infraestrutura financeira completa (orçamento + filmagens vinculadas)
- SIMBIOSE tem edição parcial (faltam orçamento e filmagem)
- Demais projetos precisam de investigação e vinculação de registros existentes

### 🔍 Análise por Banco

**FILMAGEM (collection://bc067267-b603-41fc-bb75-c00050cec4cc)**
- 2 registros existentes: Maranhã Dia 1 e Dia 2 ✅ (ambos agora vinculados)
- Status: Pré-filmagem para Dia 1, Pré-filmagem para Dia 2
- Próximo: Atualizar para "Em campo" após 28/05 e "Finalizado" após 29/05

**EDIÇÃO (collection://0b437e77-08c6-4f6e-a133-5ca3f682ab58)**
- 1 registro: SIMBIOSE — Vídeo 1min30s ✅ (vinculado ao projeto)
- Status: Em andamento
- Etapa: Edição bruta
- Próximo: criar registros para outros projetos em fase de pós-produção

**ORÇAMENTO (collection://1acaa528-4627-4817-8d43-093d3ad19137)**
- 12 registros Maranhã ✅ (vinculados)
- 4 registros SOBRE2026 (projeto Prospecção — não em execução)
- Nenhum para SIMBIOSE, RNP, AGO, OFICINAS, etc.
- Status: Estimado / Confirmado para Maranhã

**FINANCEIRO_PROJETO (collection://cd8f5929-87b0-431b-b392-00b49a11b98e)**
- 0 registros ainda (nenhum projeto registrou despesas reais)
- Próximo: começar a registrar após 28/05 (Maranhã) com comprovantes

**GESTÃO_FINANCEIRA_EMPRESA (collection://3a29ba12-7582-458e-bbbb-f631cfcbef35)**
- 0 registros ainda (não iniciado)
- Para depois (despesas operacionais não vinculadas a projetos)

### 📋 Próximas Ações Recomendadas

**Imediato (antes do Maranhã — 28/05):**
1. ✅ FEITO: Vincular 2 filmagens Maranhã ao projeto
2. ⏳ Verificar orçamento de Maranhã: está na proposta aprovada? (12 itens registrados — validar)

**Pós-Maranhã (29/05 em diante):**
1. Atualizar FILMAGEM.Status para "Finalizado" após conclusão
2. Começar a registrar FINANCEIRO_PROJETO com comprovantes de Maranhã
3. Revisar e criar edições para Maranhã se houver pós-produção

**Próximas sessões:**
1. Investigar se RNP, AGO, OFICINAS têm orçamentos/filmagens que devem ser vinculados
2. Criar registros de orçamento para SIMBIOSE (R$ 800)
3. Implementar dashboard de Budget vs. Actual no FINANCEIRO_PROJETO

### 🎯 Estado das Relações DUAL

| Relação | Campo em A | Campo em B | Status |
|---------|-----------|-----------|--------|
| PROJETO_2026 ↔ FILMAGEM | Filmagens | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ EDIÇÃO | Edições | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ ORÇAMENTO | Orçamentos | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ FINANCEIRO_PROJETO | Financeiro do Projeto | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ GESTÃO_FINANCEIRA | Gestão Financeira | Projeto relacionado | ✅ DUAL |
| PROJETO_2026 ↔ CLIENTES | Cliente | Projetos relacionados | ✅ DUAL |
| PROJETO_2026 ↔ PROPOSTAS | Proposta | Projeto relacionado | ✅ DUAL |
| PROJETO_2026 ↔ TAREFAS | Tarefas | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ CONTATOS | Responsável | (reverso em CONTATOS) | ✅ DUAL |

**Total: 9/9 relações operacionais DUAL** ✓

*Atualizado ao final da Sessão 13 — 27 Mai 2026 · Oráculo v1.3*

---

## SESSÃO 14 — Reestruturação Financeira: Budget vs. Actual (27 Mai 2026)

### ✅ Concluído nesta sessão

**Problema identificado:**
- Banco ORÇAMENTO exibia itens de todos os projetos misturados numa tabela flat (sem views nem filtros)
- Relação FINANCEIRO_PROJETO → ORÇAMENTO era unidirecional (sem rollup possível)
- Não havia distinção entre "orçamento da proposta" e "orçamento da execução"

**Diagnóstico aplicado:**
- A arquitetura de UMA tabela de itens com relações é o padrão correto da indústria (Movie Magic, Airtable, etc.)
- O problema era de views + campos faltando, não de estrutura

**Ações tomadas:**

1. ✅ **Relação FINANCEIRO_PROJETO ↔ ORÇAMENTO convertida para DUAL**
   - Campo em FINANCEIRO_PROJETO: `Item Orcamento`
   - Campo sincronizado em ORÇAMENTO: `Transacoes`
   - **Total de relações DUAL: 10** (era 9)

2. ✅ **3 novos campos adicionados ao ORÇAMENTO:**
   - `Fase` (Select): `Proposta` / `Execucao` — distingue o que foi enviado ao cliente do que surgiu na produção
   - `Valor Real` (Rollup): soma de `Valor` em FINANCEIRO_PROJETO vinculado ao item
   - `Variancia` (Fórmula): `Total − Valor Real` — positivo = dentro do orçado; negativo = estouro

3. ✅ **4 views criadas no ORÇAMENTO:**
   - `Por Projeto` — todos os itens agrupados por projeto (resolve o "tudo misturado")
   - `Proposta` — filtrada por Fase = Proposta, agrupada por projeto
   - `Budget vs Actual` — mostra Total / Valor Real / Variancia agrupados por projeto
   - `Pendencias` — filtrada por Status = Estimado

4. ✅ **Documentação atualizada:**
   - `docs/ARQUITETURA_NOTION.md` — schemas do ORÇAMENTO e FINANCEIRO_PROJETO atualizados

### 📊 Estado do ORÇAMENTO após Sessão 14

| Relação | Direção | Status |
|---------|---------|--------|
| ORÇAMENTO ↔ PROJETO_2026 | DUAL | ✅ |
| ORÇAMENTO ↔ FINANCEIRO_PROJETO (via Transacoes) | DUAL | ✅ NOVO |
| ORÇAMENTO ↔ CONTATOS (Fornecedor/Contato) | Unidirecional | — |

### 🟡 Como usar a partir de agora

**Ao elaborar proposta:**
1. Criar itens no ORÇAMENTO com `Fase = Proposta`
2. Preencher `Valor unitário` × `Quantidade` = `Total` (manualmente)
3. Versão = `Original` (ou `Aditivo 001` se houver revisão)

**Ao executar o projeto:**
1. Registrar gastos reais no FINANCEIRO_PROJETO
2. Vincular cada transação ao campo `Item Orcamento` correspondente
3. O campo `Valor Real` atualiza automaticamente no ORÇAMENTO
4. `Variancia` mostra se está dentro ou acima do orçado

**Para ver só um projeto:**
- Abrir o projeto em PROJETO_2026 → campo `Orçamentos` → tabela filtrada daquele projeto

### 🔴 Pendências

**Ação manual no Notion UI:**
- Os 12 itens existentes do Maranhã não têm `Fase` preenchida — preencher como `Proposta` via interface
- Os 4 itens do SOBRE2026 idem

**Próximas sessões:**
- Preencher `Fase = Proposta` nos itens existentes de Maranhã e SOBRE2026
- Criar orçamento para SIMBIOSE (R$ 800)
- Registrar primeiras transações no FINANCEIRO_PROJETO após filmagem do Maranhã (28-29/05)

*Atualizado ao final da Sessão 14 — 27 Mai 2026 · Oráculo v1.4*

---

## SESSÃO 15 — Arquitetura Híbrida: Orçamento dentro do Projeto (27 Mai 2026)

### ✅ Concluído nesta sessão

**Questão central levantada:**
A usuária questionou se o orçamento deveria ficar dentro de cada projeto (como a proposta IBICT mostrou) em vez de um banco central. Preocupação com sobreposição de dados entre PROPOSTAS, ORÇAMENTO e FINANCEIRO_PROJETO.

**Decisão arquitetural:**
Arquitetura **híbrida**: banco central ORÇAMENTO permanece como fonte única de verdade, mas cada projeto recebe uma Linked View filtrada — dando a experiência de "orçamento dentro do projeto" sem duplicar dados.

**Papéis redefinidos para eliminar sobreposição:**
- `PROPOSTAS` = documento comercial (PDF, valor fechado, status, histórico de versões)
- `ORÇAMENTO` = itemização dos custos (cada linha = um item)
- `FINANCEIRO_PROJETO` = transações reais (o que foi pago/recebido)

**Ações tomadas:**

1. ✅ **Campo `Proposta` DUAL adicionado ao ORÇAMENTO**
   - Relação bidirecional: ORÇAMENTO ↔ PROPOSTAS
   - Permite ver "quais itens fazem parte da Proposta V1?" ou "quais vieram do Aditivo 001?"
   - Complementa (e não substitui) o campo `Versão`

2. ✅ **Rollup `Valor Total Orcado` adicionado ao PROJETO_2026**
   - Soma de campo `Total` de todos os itens de ORÇAMENTO vinculados ao projeto
   - Exibe o total orçado direto no card do projeto, sem abrir o ORÇAMENTO

3. ✅ **Linked Views "💰 Orçamento" criadas nas páginas de 8 projetos ativos:**
   - Maranhã
   - Comunicação Simbiose
   - RNP Ailton Krenak
   - AGO
   - Oficinas de Documentário
   - Filmmaker Independente
   - Visite mon Agencé
   - FIOCRUZ REDE COLABORA

4. ✅ **ARQUITETURA_NOTION.md atualizado** — seções ORÇAMENTO e PROJETO_2026

### ⚠️ Ação manual necessária (Linked Views — filtro)

A API do Notion não suporta filtrar linked views por campo de relação via DSL. As views foram criadas nas páginas dos projetos mas **estão sem filtro** — mostram todos os itens de todos os projetos.

**Para ativar o filtro em cada projeto (30 segundos cada):**
1. Abrir a página do projeto no Notion
2. Na seção "💰 Orçamento" (linked view ao fundo da página), clicar em **"Filtrar"**
3. Adicionar filtro: **Projeto → contém → [nome deste projeto]**
4. Repita para os 8 projetos

Após isso, cada página de projeto exibirá somente os seus itens de orçamento.

### 📊 Estado das relações DUAL após Sessão 15

| Relação | Campo em A | Campo em B | Status |
|---------|-----------|-----------|--------|
| PROJETO_2026 ↔ FILMAGEM | Filmagens | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ EDIÇÃO | Edições | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ ORÇAMENTO | Orçamentos | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ FINANCEIRO_PROJETO | Financeiro do Projeto | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ GESTÃO_FINANCEIRA | Gestão Financeira | Projeto relacionado | ✅ DUAL |
| PROJETO_2026 ↔ CLIENTES | Cliente | Projetos relacionados | ✅ DUAL |
| PROJETO_2026 ↔ PROPOSTAS | Proposta | Projeto relacionado | ✅ DUAL |
| PROJETO_2026 ↔ TAREFAS | Tarefas | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ CONTATOS | Responsável | (reverso em CONTATOS) | ✅ DUAL |
| ORÇAMENTO ↔ PROPOSTAS | Proposta | (reverso em PROPOSTAS) | ✅ DUAL NOVO |

**Total: 10 relações DUAL** ✓

### 🔴 Pendências herdadas

**Ação manual no Notion UI:**
- Preencher `Fase = Proposta` nos 12 itens de Maranhã e 4 do SOBRE2026 no ORÇAMENTO
- Configurar filtro nas 8 Linked Views de "💰 Orçamento" (instruções acima)
- Avaliar campo `Untitled Database` em PROJETO_2026 — aponta para banco de testes `ORÇAMENTOS TESTE LIPE`; pode ser removido após confirmar que o banco não é mais necessário

**Próximas sessões:**
- Criar orçamento para SIMBIOSE (R$ 800)
- Registrar primeiras transações no FINANCEIRO_PROJETO após filmagem do Maranhã (28-29/05)
- Preencher campo `Proposta` nos itens de orçamento existentes

*Atualizado ao final da Sessão 15 — 27 Mai 2026 · Oráculo v1.5*

---

## SESSÃO 15 (parte 2) — VI SOBRE 2026: Proposta + Google Drive + rclone (27 Mai 2026)

### ✅ Concluído nesta etapa

#### 1. VI SOBRE 2026 — Correção de estrutura

**Problema:** PRJ-17 "VI SOBRE 2026 — Conferência Brasileira de Restauração Ecológica" estava incorretamente criado como PROJETO. É ainda uma proposta (status: Prospecção).

**Ações tomadas:**

1. ✅ **Registro PROPOSTAS criado** — `VI SOBRE 2026 — Conferência Brasileira de Restauração Ecológica`
   - Cliente: SOBRE2026 | Contato: Viviane | Status: Prospecção
   - Valor: R$ 58.124,08 | Validade: 21/06/2026
   - Evento: UnB, 27–31/07/2026

2. ✅ **9 itens de ORÇAMENTO criados e vinculados à proposta:**
   - Pré-produção (5 dias × R$ 2.000 = R$ 10.000)
   - Diária de produção — dias completos (4 dias × R$ 4.500 = R$ 18.000)
   - Diária de produção — meia diária (1 × R$ 2.250 = R$ 2.250)
   - Material de gravação (1 × R$ 1.500 = R$ 1.500)
   - Edição e pós-produção (1 × R$ 8.000 = R$ 8.000)
   - Correção de cor e tratamento (1 × R$ 3.500 = R$ 3.500)
   - Trilha sonora licenciada (1 × R$ 1.500 = R$ 1.500)
   - Deslocamento e hospedagem (1 × R$ 6.000 = R$ 6.000)
   - ISS/Impostos 8% (1 × R$ 4.820 = R$ 4.820 — calculado sobre subtotal)
   - Todos com Fase = Proposta, Status = Estimado

3. ✅ **CRM atualizado** — entrada criada para SOBRE2026 com status Contato Feito

4. ⏳ **PRJ-17 para deletar manualmente** — Usuária deve ir no projeto VI SOBRE 2026 no Notion → ··· → Mover para lixo

---

#### 2. Integração Google Drive + rclone

**rclone instalado e configurado — Drive agora operacional (não é mais Fase 2 pendente).**

**Configuração:**
- Ferramenta: `rclone` (CLI, gratuita)
- Remote: `gdrive`
- Pasta raiz restrita: `FIRMA ABACAXI/` → ID `10hUTz_FXeFiIj5yyrjM8Aygeg8HpH_UK`
- Arquivo de config: `C:\Users\User\AppData\Roaming\rclone\rclone.conf`
- Escopo: `drive` (acesso completo, mas navegação restrita ao `root_folder_id`)

**Privacidade:** O rclone enxerga **apenas** a pasta `FIRMA ABACAXI/` — o resto do Drive pessoal é inacessível.

**Estrutura criada no Drive:**
```
FIRMA ABACAXI/
└── PROJETOS/
    └── 2026/
        └── VI SOBRE 2026 — UnB/
            └── 01_PROPOSTA/
                └── SOBRE2026_proposta_v1.pdf   ← upload concluído ✅
```

**Noção atualizada:** campo `Arquivo PDF` na proposta VI SOBRE 2026 recebeu link direto para o arquivo no Drive.

**Regra estabelecida (saved em memory):** Criar pastas no Drive **apenas quando a etapa do projeto começar**, não todas de uma vez. Template de referência documentado em `memory/feedback_google_drive.md`.

---

### 📋 Pendências desta etapa

**Ação manual no Notion UI:**
- Deletar PRJ-17 (VI SOBRE 2026 como projeto): página → ··· → Mover para lixo

**Documentação a atualizar (próxima sessão):**
- `docs/FLUXO_TRABALHO.md` — adicionar rclone/Drive como ferramenta ativa (não mais "Fase 2 pendente")
- `docs/ARQUITETURA_NOTION.md` — anotar que Drive está integrado via rclone

### 📊 Estado da infraestrutura após esta etapa

```
✅ rclone          — instalado, autenticado, gdrive remote ativo
✅ Google Drive    — pasta FIRMA ABACAXI/ restrita, operacional
✅ VI SOBRE 2026   — PROPOSTA criada + 9 itens ORÇAMENTO + CRM
```

### 🔄 Status Google Drive MCP (Fase 2)

O acesso ao Drive via **rclone CLI** já está funcionando para upload/download de arquivos. A integração via **Google Drive MCP** (que permitiria ao Oráculo operar o Drive diretamente via ferramentas nativas) continua listada na Fase 2, mas não é urgente — o rclone cobre o caso de uso atual.

*Atualizado ao final da Sessão 15 (parte 2) — 27 Mai 2026 · Oráculo v1.5.2*

---

## SESSÃO 16 — Maranhã: Estruturação Completa do Projeto (27 Mai 2026)

### ✅ Concluído nesta sessão

**Objetivo:** Estruturar o PRJ-16 Maranhã como projeto modelo — o mais completo até o momento.

**Contexto:** O usuário forneceu PDF da proposta aprovada (R$ 10.573,86), cronograma detalhado das filmagens dos dias 28-29/05/2026, formato de gravação (Braw 12:1, 24fps, 6k) e link do Drive da Juliana com fotos das locações.

**Descoberta:** Os 12 itens de ORÇAMENTO indicados no STATUS das sessões anteriores eram de outro projeto (valores completamente diferentes, vinculados a outra proposta). O Maranhã não tinha nenhum item de orçamento criado corretamente.

**Ações tomadas:**

1. ✅ **PROPOSTAS — Maranhã criado**
   - Título: "Maranhã — Proposta Gravação 28-29/05"
   - Status: Aprovada | Tipo: Institucional | Valor: R$ 10.573,86
   - Data de Envio: 25/05/2026 | Validade: 25/06/2026
   - ID: `36d8a525-91f3-819d-8c09-d58c1a04639b`

2. ✅ **8 itens ORÇAMENTO criados** (fonte: PDF da proposta)

   | Item | Categoria | Valor Unit. | Qtd | Total |
   |------|-----------|-------------|-----|-------|
   | Diretor de Fotografia | Equipe | R$ 1.500 | 2 | R$ 3.000 |
   | Câmera - Blackmagic | Equipamento | R$ 600 | 2 | R$ 1.200 |
   | Kit de Lentes | Equipamento | R$ 300 | 2 | R$ 600 |
   | Op. de Som com Equipamentos | Equipe | R$ 1.200 | 2 | R$ 2.400 |
   | Assistente | Equipe | R$ 600 | 2 | R$ 1.200 |
   | Equipamentos de Iluminação | Equipamento | R$ 400 | 2 | R$ 800 |
   | Produção (Alimentação/Combustível) | Outro | R$ 660 | 1 | R$ 660 |
   | Imposto NF 7,24% | Imposto | R$ 713,86 | 1 | R$ 713,86 |

   Todos: Fase = Proposta | Versão = Original | Status = Confirmado | Tipo = Custo
   Vinculados ao projeto PRJ-16 + PROPOSTAS Maranhã

3. ✅ **PROJETO_2026 (PRJ-16) atualizado:**
   - Valor contratado: R$ 10.573,86
   - Tipo de projeto: Institucional
   - Status: Em produção (filmagem amanhã)
   - Etapa atual: Produção
   - Cliente: Maranhã ✅
   - Proposta: vinculada ✅
   - Pasta no Drive: https://drive.google.com/open?id=1y7b3ao5iH9C2xcSO3thlBnxpzzsWO_gb

4. ✅ **FILMAGEM Dia 1 (28/05) atualizada:**
   - Local: Palácio do Congresso Nacional (9h30) → Edifício Toufic (11h30)
   - Cronograma: 9h Nilto Tatto / 11h30 Anne Moura / Tarde livre para coberturas
   - Equipamentos: Câmera Blackmagic (Braw 12:1, 24fps, 6k) + kit completo

5. ✅ **FILMAGEM Dia 2 (29/05) atualizada:**
   - Local: DIEESE Brasília — Asa Sul EQS 314/315, Bloco A, 2° andar
   - Cronograma: 9h entrada / 10h Adriana Marcolino / 3 opções de sala
   - Link fotos locações: https://drive.google.com/drive/folders/10rga1s-jRiqYwC_6cwa2L7259EQATAIq

6. ✅ **Google Drive — pasta Maranhã criada:**
   ```
   FIRMA ABACAXI/
   └── PROJETOS/
       └── 2026/
           └── Maranha - Gravacao 28-29-05/     ← nome ASCII (Windows)
               └── 01_PROPOSTA/
                   └── Marana_proposta_v1.pdf   ← 247.750 bytes ✅
   ```
   - PDF link: https://drive.google.com/open?id=1tFN8EAD4amFQQWHEuXZuFtDH0XflNPo3
   - Campo `Arquivo PDF` na PROPOSTA atualizado ✅

7. ✅ **FLUXO_TRABALHO.md** — Google Drive (rclone CLI) marcado como ✅ Ativo

### ⚠️ Ação manual ainda pendente (UI Notion)
- Configurar filtros nas Linked Views "💰 Orçamento" dos 8 projetos (de sessão 15)
- Remover PRJ-17 VI SOBRE 2026 duplicado do banco PROJETOS (de sessão 15)

### 📊 Estado do Maranhã após Sessão 16

| Componente | Status |
|---|---|
| PROJETO_2026 PRJ-16 | ✅ Completo |
| PROPOSTAS Maranhã | ✅ Criado e vinculado |
| ORÇAMENTO (8 itens) | ✅ Criado e vinculado |
| FILMAGEM Dia 1 | ✅ Cronograma completo |
| FILMAGEM Dia 2 | ✅ Cronograma completo |
| Google Drive (pasta) | ✅ Criado |
| PDF proposta | ✅ Upado e linkado |
| Valor Total Orçado (rollup) | ✅ Auto-calculado = R$ 10.573,86 |

**Modelo de referência:** Este projeto é o mais estruturado da firma até agora. Serve como template para projetos futuros.

### 🔴 Próximos passos (pós-filmagem 29/05)
1. Atualizar FILMAGEM.Status → "Em campo" (28/05 manhã) → "Finalizado" (29/05 noite)
2. Criar registros em FINANCEIRO_PROJETO com comprovantes de despesas reais
3. Registrar RECEITA no FINANCEIRO_PROJETO (pagamento do cliente)
4. Vincular transações reais aos itens de ORÇAMENTO (para Budget vs. Actual automático)
5. Criar banco/registros de EDIÇÃO após filmagem (pós-produção)

---

## SESSÃO 17 — Sincronização Notion V3 & Dashboard Digital (01 Jun 2026)

### ✅ Concluído nesta sessão

**Grande Atualização do Notion Realizada pelo Usuário:**
- Ativação de 6 novas databases ligando as Fases 2 e 3: `ORÇAMENTO`, `EDIÇÃO`, `FILMAGEM`, `FINANCEIRO_PROJETO`, `GESTÃO_FINANCEIRA_EMPRESA` e o novo banco `TAREFAS DA FIRMA` (backoffice administrativo).
- Cadastro de novos projetos, tarefas estratégicas e itens de orçamentos diretamente pelas abas e views do Notion.

**Ações Tomadas pelo Oráculo:**
1. ✅ **Varredura Completa por API:** Mapeamento de todas as novas estruturas do Notion e confirmação de sucesso de integração (12 bancos de dados de produção ativos).
2. ✅ **Atualização de Regras e STATUS:** Sincronização dos 12 novos IDs de banco ativos no `STATUS.md` e regras internas do Claude Code (`.claude/rules/notion-schema.md`).
3. ✅ **Dashboard Executivo Digital Premium:** Desenvolvido um painel web local premium em `output/dashboard/` contendo:
   - `index.html` (estrutura em abas para Visão Geral, Projetos, Tarefas da Firma, Edição e Finanças).
   - `style.css` (visual Dark Mode contemporâneo, efeito glassmorphic, cores vibrantes HSL da Firma, micro-animações).
   - `app.js` (carregamento dinâmico e injeção em tempo real de projetos, checklists de tarefas e orçamento vinculados baseados nos dados reais do Notion).

### 📊 Totais Consolidados do Notion V3
- 12 bancos de dados operacionais ativos
- 7 projetos cinematográficos e corporativos em andamento
- 10 tarefas de backoffice e estratégico mapeadas no checklist da firma
- 3 cortes ativos em pós-produção na mesa de edição
- 18 itens de orçamentos e lançamentos financeiros indexados

---

---

## SESSÃO 18 — Preparação Edital FAC 2026: Auditoria + Base de Conhecimento (01 Jun 2026)

### ✅ Concluído nesta sessão

**Objetivo:** Preparar estrutura completa para inscrição em Edital FAC I/2026 — auditoria de documentação existente, organização no vault Obsidian e criação de base de conhecimento no NotebookLM.

**Contexto:** 
- Prazo: 5 de junho 2026 (23h59) — 4 dias para submissão
- Modalidade: Ampla Concorrência
- Valor máximo (PF): R$ 200.000
- Documentação: 12 anexos do edital

**Ações tomadas:**

1. ✅ **Auditoria completa de projetos FAC antigos** — 8 arquivos em 4 projetos
   - 5 Atos da Escada (2021): Formulário + Script
   - Festival CircoLar (2021): Formulário + Cronograma + Ficha Técnica
   - Videomaker Independente (2021): Formulário ✅ Planilha ✅ Plano de Curso ✅ Cronograma ✅ Ficha Técnica
   - Cinema Documental (2023): Planilha ✅ Plano de Curso ✅ Ficha Técnica
   - **Cobertura: 4 projetos, 25% → 75% documentação**

2. ✅ **Vault Obsidian — 11 arquivos MD (~15.000 linhas)**
   - 00-INDEX.md — entrada principal com prazos e checklist
   - BASE-CONHECIMENTO-FAC-2026.md — consolidado de 6.200+ linhas
   - 01-Edital-Ampla.md — 22 áreas, 3 módulos, quesitos de avaliação
   - 02-Formulario.md — 40+ campos com limites de caracteres
   - 04-Modelos.md — Videomaker como modelo de excelência (estrutura completa)
   - 05-Checklist.md — 60+ documentos obrigatórios
   - PROJETOS-ANTIGOS-*.md × 4 — Referências documentadas
   - PLANO-DE-EXECUCAO.md — Fluxo 4 dias (Dia 1-4, 5 jun)
   - NOTEBOOKLM-CONFIG.md — Guia de uso
   - SUMARIO-PREPARACAO-COMPLETA.md — Resumo final

3. ✅ **NotebookLM — 9 fontes processadas e prontas**
   - ID: 944cbd55-d01b-430e-924d-4a49fe9cfeb4
   - Status: Todas as 9 fontes em "ready" (indexadas)
   - Acesso: https://notebooklm.google.com/

4. ✅ **Plano de Execução 4 dias definido:**
   - **Dia 1:** Refinamento + Pesquisa (2-3h) → Ideia validada
   - **Dia 2:** Redação narrativa (4-5h) → Campos principais preenchidos
   - **Dia 3:** Orçamento + Cronograma (3-4h) → Anexos IV e IX prontos
   - **Dia 4:** Documentação complementar (2-3h) → Todos os docs
   - **Dia 5 (tarde):** Revisão + Envio (30 min) → **SUBMIT antes de 23h59**

5. ✅ **Modelos de Referência Consolidados:**
   - Videomaker Independente: ⭐⭐⭐⭐⭐ (100% — Objeto, Objetivos, Justificativa, Público-alvo, Metas, Acessibilidade, Metodologia, Conteúdo, Avaliação, Cronograma, Ficha Técnica, Comunicação)
   - CircoLar: ⭐⭐⭐⭐ (75% — Formulário, Cronograma, Ficha Técnica, Comunicação)
   - Cinema Documental: ⭐⭐⭐⭐ (75% — Orçamento FGV, Planos de Curso, Ficha Técnica)

### 📊 Preparação Consolidada para FAC 2026

| Item | Status | Quantidade |
|---|---|---|
| Arquivos MD no Vault | ✅ Pronto | 11 |
| Fontes NotebookLM | ✅ Pronto | 9 (todas processadas) |
| Projetos Antigos Mapeados | ✅ Pronto | 4 |
| Áreas Culturais Documentadas | ✅ Pronto | 22 |
| Documentos Obrigatórios Listados | ✅ Pronto | 60+ |
| Linhas de Conteúdo | ✅ Pronto | ~15.000+ |
| Horas de Preparação | ✅ Pronto | ~40h |

### 📋 Fluxo de Trabalho Definido

**Informações que o usuário deve trazer:**
1. Título do projeto
2. Conceito (1-2 parágrafos)
3. Tipo de ação (oficina, mostra, produção, curso, festival, pesquisa)
4. Área cultural (qual das 22)
5. Módulo (I: R$ 100k, II: R$ 200k)
6. Público-alvo
7. Duração (máx. 12 meses)
8. Diferenciais

**Resto:** Já documentado e estruturado

### 🔴 Próximos passos

1. **Usuária apresenta a ideia do projeto** com os 8 pontos acima
2. **Oráculo ativa Plan Mode** para validação contra edital
3. **Execução 4 dias:** Dia 1 (01 jun) → Dia 4 (04 jun) → Dia 5 (05 jun) SUBMIT
4. **Resultado:** Projeto completo + documentação + checklist final

### 💾 Documentação Atualizada

- `cerebro/CEREBRO-ORACULO/05-PROJETOS/FAC-2026/` — 11 arquivos criados
- NotebookLM linkado com 9 fontes processadas
- Status.md atualizado com Sessão 18

*Atualizado ao final da Sessão 18 — 01 Jun 2026 · Oráculo v2.1*
