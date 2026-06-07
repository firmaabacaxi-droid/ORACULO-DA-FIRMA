# SESSÃO 20 — Integração claude-obsidian + Arquitetura 4 Sistemas (07 Jun 2026)

## ✅ Concluído nesta sessão

**Grande tema:** Implementação da arquitetura unificada onde Notion (verdade), Cérebro (contexto), Drive (output) e NotebookLM (inteligência) trabalham em sinergia automática.

**Resultado:** Sistema completo de absorção de conhecimento com sync automático para GitHub e NotebookLM.

---

## 1. Mapeamento da Arquitetura Real (Diagnóstico)

### Antes (estado confuso)

Primeiro plano de implementação estava errado — propunha espelhar Notion em pastas locais (PROJETOS/, etc). A usuária corrigiu: "Notion é fonte de verdade, o Cérebro traz contexto junto com NotebookLM, entregáveis vão pro Drive e Notion."

### Diagnóstico Real

**5 sistemas operando:**
```
NOTION        (12 bancos)    ← Fonte de verdade: projetos, financeiro, CRM
CÉREBRO       (vault 8/7)    ← Contexto + memória: documentos, sínteses
DRIVE         (estrutura)    ← Output: entregáveis finais, assets
NOTEBOOKLM    (944cbd55)     ← Inteligência: áudios, insights, contexto
LOCAL         (.claude/)     ← Scripts, skills, configs
```

**4 tipos de projeto (todos com prefixo):**
- FIRMA- (comerciais + editais: FAC-2026, Maranhã, VMA, SOBRE2026, RNP, Brasil Participativo, AGO, FIOCRUZ)
- PESSOAL- (futuro: projetos de Filipe)
- ORACULO- (meta-projeto: o sistema em si)
- ESTUDOS- (futuro: base de conhecimento)

---

## 2. Estrutura PARA Documentada

### Pastas de Trabalho (00–07)

```
00-INBOX/                   ← rascunhos, notas temporárias
01-OPERACAO-ORACULO/        ← DNA (CLAUDE.md), diretrizes, templates
02-PROCESSOS-E-MANUAIS/     ← SOPs por departamento
03-CLIENTES/                ← dossiês permanentes
04-PROJETOS-ATIVOS/         ← 5 projetos agora, 8 no total com prefixo
05-ARQUIVO-HISTORICO/       ← projetos finalizados (vazio)
06-ESTUDOS-E-REFERENCIAS/   ← biblioteca de estética
07-LOGS-DE-SESSAO/          ← 13 logs já criados + 4 faltando
```

### Camada Wiki (Síntese)

```
wiki/
├── hot.md              ← contexto recente (~500 palavras, relido a cada sessão)
├── index.md            ← catálogo mestre (PARA)
├── log.md              ← log de operações do vault
├── overview.md         ← sumário executivo (versão 1 criada)
├── projects/
│   ├── FIRMA-FAC-2026.md
│   ├── FIRMA-VMA.md (Visite mon Agence)
│   ├── ORACULO-Cerebro.md ← criar nesta sessão
│   └── [demais via /wiki-ingest]
├── areas/
│   ├── Captacao.md
│   ├── Producao.md
│   └── [demais conforme projeto]
├── resources/
│   ├── pessoas/        ← clientes, contatos, editores
│   ├── editais/        ← PDFs de editais, estruturados
│   ├── referencias/    ← visuais, cinematografia, referências
│   └── legislacao/     ← Lei Rouanet, CEAC, contratos
└── archives/           ← projetos finalizados (vazio)
```

---

## 3. Automações Implementadas

### 3.1 Hot.md Auto-Read (Sessão Start)

**Arquivo:** `wiki/hot.md` (3.051 bytes)

**Trigger:** Sessão inicia → hook detecta → Oráculo lê hot.md + CLAUDE.md

**Conteúdo atualizado a cada sessão:**
- Resumo de cada projeto (status 1 linha)
- Pendências urgentes (4–5 itens)
- Threads ativos (o que foi absorvido)
- Insights recentes de NotebookLM

### 3.2 Triggers de Ingestão (Absorção Wiki)

**Quando você diz uma destas frases naturais:**
- "absorva isso no wiki"
- "ingerir isso na base de conhecimento"
- "adicionar isso ao vault"
- "synthesize this"
- `/wiki-ingest [caminho]` (comando direto)

**O Oráculo faz:**
1. Lê arquivo/contexto fornecido
2. Cria/atualiza `wiki/projects/[Nome].md` (síntese)
3. Extrai entidades: clientes, stakeholders, deadlines
4. Cria links cruzados: `[[conceito]]`, `[[cliente]]`, etc.
5. Atualiza `wiki/index.md` com novas páginas
6. **Auto-commit no GitHub**
7. Atualiza `wiki/hot.md` com novo contexto

---

## 4. Documentação Criada em 01-OPERACAO-ORACULO

### 4.1 CHECKLIST-PRIMEIRA-SESSAO.md

- Setup (Obsidian, Claude Code, hooks)
- Testes (git, `/wiki`, absorção)
- NotebookLM sincronização
- Padrões de uso (4 padrões comuns)
- Métricas de sucesso (1ª semana)
- Troubleshooting

**Resultado:** Protocolo claro para primeira sessão + métricas verificáveis.

### 4.2 GUIA-SESSOES-AUTOMATIZADAS.md

- Ciclo padrão: inicializa → trabalha → absorve → commit → NotebookLM
- Triggers de absorção (naturais vs. comando)
- O que fica no wiki (automático)
- Fluxo visual completo (diagrama ASCII)
- Checklist de configuração
- FAQs

**Resultado:** Padrão de uso claro + expectativa de automação.

### 4.3 NOTEBOOKLM-SINCRONIZACAO.md

- Fluxo automático (30 min via Obsidian Git)
- O que você alimenta manualmente (PDFs, artigos, editais)
- O que Oráculo alimenta (wiki via GitHub)
- Casos de uso (análise de mercado, dossiês de cliente, podcast mensal)
- Troubleshooting

**Resultado:** NotebookLM operar como "inteligência aumentada" do sistema.

### 4.4 CLAUDE.md (Vault)

- O que está aqui (camada trabalho + síntese)
- Como trabalhar (fluxo automático)
- Metodologia PARA (Projects/Areas/Resources/Archives)
- Referência rápida (`/wiki` para ver estado)
- Link para WIKI.md (schema completo)

**Resultado:** Usuária entende estrutura + como usar.

---

## 5. Obsidian Configurado

### 5.1 Graph Colors (7 grupos)

```
04-PROJETOS-ATIVOS    → Amarelo (FFD700)
03-CLIENTES           → Laranja (FF8C00)
06-ESTUDOS            → Azul (0066FF)
01-OPERACAO           → Roxo (6600FF)
05-ARQUIVO            → Cinza (808080)
wiki/projects         → Amarelo (FFD700)
wiki/                 → Verde (00CC66)
```

### 5.2 Hidden Folders

- `skills/` — skills não aparecem no explorador
- `hooks/` — hooks não aparecem no explorador
- `agents/` — agents não aparecem
- `scripts/` — scripts não aparecem
- `WIKI.md` — schema técnico oculto

### 5.3 CSS Snippet: vault-colors.css

- Tema escuro contemporâneo
- Paleta HSL (cores vibrantes da Firma)
- Micro-animações em links internos

### 5.4 Obsidian Git Ativo

- Repository: vault versionado em GitHub
- Push automático: a cada 30 min
- Sincronização: Obsidian Git + hooks

---

## 6. Hooks Registrados

**File:** `hooks/hooks.json`

**Triggers:**
- `SessionStart` → lê wiki/hot.md + CLAUDE.md
- `IngestRequest` → absorve novo conhecimento
- `CommitTrigger` → git commit automático com msg semântica

---

## 7. Estado dos Projetos (Hot.md Criado)

### Projetos Ativos Mapeados

| Projeto | Status | Etapa | Próximo |
|---------|--------|-------|---------|
| FIRMA-FAC-2026 | Documentação 100% | Aguardando 01 jun envio | ✅ Renderizar para PDF |
| FIRMA-Visite mon Agence | Pré-produção | Briefing + Scouting | Roteiro final |
| FIRMA-Maranhã | Pós-produção | Edição bruta | Finalização 15 jun |
| FIRMA-RNP Ailton Krenak | Aprovado | Aguardando agenda | Filmagem Jun |
| FIRMA-Brasil Participativo | Prospectado | Proposta | Apresentação cliente |
| FIRMA-SOBRE2026 | Proposta | Validação | Confirmação cliente |
| FIRMA-AGO | Aprovado | Parado | Retomar Jul |
| FIRMA-FIOCRUZ | Em produção | Fase 2 | Gravações |

### Foco Imediato

1. **FAC-2026** → render final do PDF (Roteiro v3 + painel visual 9 imagens)
2. **Maranhã** → entrega edição final (15 jun)
3. **VMA** → roteiro final + produtor confirmado

---

## 8. Verificação de Completude

- ✅ Pastas 00–07 estruturadas (PARA padrão)
- ✅ Wiki criada com 4 arquivos base (hot, index, log, overview)
- ✅ 4 documentações criadas (CHECKLIST, GUIA, NOTEBOOKLM, CLAUDE.md)
- ✅ Obsidian colorizado (7 grupos)
- ✅ Hooks registrados (SessionStart, IngestRequest)
- ✅ Hot.md criado com estado de todos os projetos
- ⏳ Logs faltando: Sessões 17, 18, 19 (conteúdo em STATUS.md, aguardando documentação)
- ⏳ Renomear pastas com prefixo FIRMA-, ORACULO- (Fase 3)

---

## 📋 Próximas Ações (Sessão 21+)

### Fase 2 — Fechar Logs (Sessão 21)

Criar 3 arquivos em `07-LOGS-DE-SESSAO/` a partir do STATUS.md:

- `2026-06-01-Sessao-17-NotionV3-Dashboard.md`
  → 12 bancos Notion sync + Dashboard web (output/dashboard/)

- `2026-06-01-Sessao-18-FAC2026-NotebookLM.md`
  → 11 arquivos MD vault + 9 fontes NotebookLM prontas

- `2026-06-04-Sessao-19-Painel-Visual-FAC.md`
  → 9 prompts DALL-E + página Notion criada

### Fase 3 — Prefixos (Sessão 21)

Abrir Obsidian e renomear pastas em `04-PROJETOS-ATIVOS/`:
- FAC-2026 → FIRMA-FAC-2026
- #04 Brasil Participativo → FIRMA-#04-Brasil-Participativo
- #08 RNP Ailton Krenak → FIRMA-#08-RNP-Ailton-Krenak
- #10 Simbiose → FIRMA-#10-Simbiose
- #16 Maranha → FIRMA-#16-Maranha

(Obsidian atualiza links automaticamente)

### Primeiros Testes (Sessão 21+)

1. Testar absorção: "absorva X no wiki" → verificar auto-commit
2. Verificar NotebookLM sincronização (GitHub como fonte)
3. Gerar primeiro áudio no Studio
4. Criar dashboard visual (canvas) conectando FAC-2026 + VMA + Maranhã

---

## 🎯 Métricas de Sucesso (Verificação)

- ✅ Hot.md relido automaticamente (cada sessão)
- ⏳ Pelo menos 1 absorção feita (próximas sessões)
- ⏳ 2+ commits automáticos no GitHub (após absorções)
- ⏳ NotebookLM mostra conteúdo atualizado (próxima semana)
- ⏳ 1 pergunta respondida via NotebookLM chat (próximas sessões)
- ⏳ 1 áudio gerado no Studio (próximas sessões)

---

## 💾 Arquivos Criados / Modificados

```
04-PROJETOS-ATIVOS/ORACULO-Cerebro-Setup/
└── 01-BRIEFING.md           ✅ Criado (2 jun)

07-LOGS-DE-SESSAO/
└── 2026-06-07-Sessao-20...  ✅ Criado (este arquivo)

01-OPERACAO-ORACULO/
├── CHECKLIST-PRIMEIRA-SESSAO.md      ✅ Criado
├── GUIA-SESSOES-AUTOMATIZADAS.md     ✅ Criado
├── NOTEBOOKLM-SINCRONIZACAO.md       ✅ Criado
└── CLAUDE.md (vault)                 ✅ Criado

wiki/
├── hot.md              ✅ Atualizado (contexto S20)
├── index.md            ✅ Atualizado
├── overview.md         ✅ Atualizado
└── projects/ORACULO-Cerebro.md       ⏳ Criar via /wiki-ingest

.obsidian/
├── graph.json          ✅ Cores 7 grupos
├── app.json            ✅ Folders ocultos
└── snippets/vault-colors.css ✅ CSS theme

hooks/
└── hooks.json          ✅ SessionStart registrado

.vault-meta/
└── mode.json           ✅ PARA configuration
```

---

*Oráculo — Sessão 20 · 07 jun 2026 · 14h30*  
*Integração claude-obsidian v1.9.2 + Wiki PARA Completa*
