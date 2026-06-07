# ORACULO Cérebro — Meta-Projeto de IA + Contexto

## Síntese

Integração do vault Obsidian (Cérebro) com claude-obsidian v1.9.2, criando camada de contexto e memória para a Firma Abacaxi. Sistema de absorção automática de conhecimento com sincronização GitHub → NotebookLM.

**Status:** ✅ Fase 1 completa — Estrutura + Automações implementadas  
**Próximo:** Fase 2 (logs faltando) + Fase 3 (prefixos)

---

## Objetivo

Criar um sistema onde:
1. Tudo que a Firma aprende fica estruturado no vault (PARA)
2. Oráculo absorve automaticamente para wiki/
3. GitHub sincroniza a cada 30 min (Obsidian Git)
4. NotebookLM indexa o vault + suas fontes → oferece insights automáticos
5. Próxima sessão, contexto está completo (sem reinventar roda)

---

## Arquitetura 5 Sistemas

```
NOTION (12 bancos)     ← Verdade
  ↓
CÉREBRO (this vault)   ← Contexto + Memória
  ↓ absorve
WIKI (síntese)         ← Catálogo estruturado
  ↓
GITHUB (Obsidian Git)  ← Versionamento
  ↓
NOTEBOOKLM (indexa)    ← Inteligência
  ↓
VOCÊ (próxima sessão)  ← Insights completos
```

---

## Estrutura Implementada

### Pastas de Trabalho (PARA)

- **00-INBOX** — rascunhos rápidos
- **01-OPERACAO-ORACULO** — DNA, diretrizes, templates (8 docs)
- **02-PROCESSOS-E-MANUAIS** — SOPs por departamento
- **03-CLIENTES** — dossiês permanentes
- **04-PROJETOS-ATIVOS** — 5 projetos (com prefixos em aplicação)
- **05-ARQUIVO-HISTORICO** — projetos finalizados
- **06-ESTUDOS-E-REFERENCIAS** — biblioteca de estética + conhecimento
- **07-LOGS-DE-SESSAO** — 13 logs existentes + 4 em criação

### Wiki (Camada Síntese)

| Arquivo | Função | Atualização |
|---------|--------|------------|
| **hot.md** | Contexto recente (~500 palavras) | Cada sessão |
| **index.md** | Catálogo mestre (PARA) | Cada absorção |
| **log.md** | Log de operações | Automático |
| **overview.md** | Sumário executivo | Mensal |
| **projects/** | Sínteses de projetos | Sob absorção |
| **areas/** | Áreas contínuas (captação, produção, etc) | Sob absorção |
| **resources/** | Pessoas, editais, referências | Sob absorção |
| **archives/** | Projetos finalizados | Sob entrega |

---

## Automações Ativas

### Hot.md Auto-Read

**Trigger:** Sessão inicia → hook SessionStart

**Ação:**
1. Oráculo lê `wiki/hot.md` (~500 palavras)
2. Detecta modo PARA (sabe como organizar)
3. Carrega CLAUDE.md (schema do vault)
4. Oferece: ingerir, consultar, pesquisar

**Resultado:** Você nunca começa sessão do zero.

### Triggers de Ingestão (Absorção)

**Você diz:**
- "absorva isso no wiki"
- "ingerir no vault"
- `/wiki-ingest [caminho]`

**Oráculo faz:**
1. Lê arquivo/briefing
2. Cria `wiki/projects/[Nome].md` (síntese)
3. Extrai entidades (clientes, stakeholders, deadlines)
4. Adiciona wikilinks (conceitos conectados)
5. Atualiza `wiki/index.md`
6. **Auto-commit** no GitHub
7. Atualiza `wiki/hot.md` com novo contexto

**Resultado:** Conhecimento estruturado + sincronizado automaticamente.

### NotebookLM Sincronização

**Fluxo automático:**
1. Você absorve no wiki
2. Oráculo faz auto-commit
3. Obsidian Git sincroniza (30 min)
4. GitHub recebe
5. NotebookLM indexa repositório
6. Próxima sessão: NotebookLM oferece insights novos

**Você também alimenta NotebookLM com:**
- PDFs de editais
- Artigos de cinematografia
- Referências visuais de projetos
- Perfis de clientes

**Result:** Base de conhecimento completa (vault + suas fontes).

---

## Estado Atual (Sessão 20 — 07 jun)

### ✅ Completo

- Estrutura PARA (8 pastas trabalho)
- Wiki base (hot, index, log, overview)
- 4 documentações de automação
- Obsidian colorizado (7 grupos)
- Hooks registrados (SessionStart)
- GitHub sincronizado
- 13 logs de sessão existentes
- 12 bancos Notion mapeados
- 9 fontes NotebookLM prontas

### ⏳ Em Progresso

- Logs sessões 17–19 (conteúdo em STATUS.md, aguardando escrita)
- Renomear pastas com prefixo FIRMA-, ORACULO-, etc.
- Primeira absorção completa (teste)
- Canvas visual de projetos

---

## Projetos na Firma (Mapeados)

| Projeto | Tipo | Status | Integração |
|---------|------|--------|-----------|
| **FIRMA-FAC-2026** | Edital MinC | Documentação 100% | Notion + wiki + NotebookLM |
| **FIRMA-Visite mon Agence** | Corporativo AFD | Pré-produção | Notion + wiki (em andamento) |
| **FIRMA-Maranhã** | Institucional | Pós-produção | Notion + wiki + Drive |
| **FIRMA-RNP Ailton Krenak** | Documentário | Aprovado | Notion + wiki (agenda pendente) |
| **FIRMA-Brasil Participativo** | Corporativo | Proposta | Notion (CRM) |
| **FIRMA-SOBRE2026** | Conferência | Proposta | Notion + Drive + wiki |
| **FIRMA-AGO** | Corporativo | Aprovado | Notion (parado) |
| **FIRMA-FIOCRUZ** | Corporativo | Em produção | Notion |

---

## Próximas Melhorias

### Curto Prazo (3 sessões)

- [ ] Fechar logs 17–19
- [ ] Renomear pastas com prefixo
- [ ] Testar primeira absorção completa
- [ ] Verificar NotebookLM sincronização
- [ ] Gerar primeiro áudio (Studio)

### Médio Prazo (5–10 sessões)

- [ ] Ollama local (LLM offline)
- [ ] Skill `/autoresearch` (pesquisa autônoma)
- [ ] Dashboard visual (canvas)
- [ ] Google Drive MCP (se necessário)

### Longo Prazo

- [ ] Mobile app sincronizado
- [ ] AI recommendations (padrões)
- [ ] Podcast mensal gerado automaticamente

---

## Links de Referência

- [CLAUDE.md (vault)](../CLAUDE.md) — Schema e metodologia PARA
- [GUIA-SESSOES-AUTOMATIZADAS.md](../01-OPERACAO-ORACULO/GUIA-SESSOES-AUTOMATIZADAS.md) — Padrão de uso
- [CHECKLIST-PRIMEIRA-SESSAO.md](../01-OPERACAO-ORACULO/CHECKLIST-PRIMEIRA-SESSAO.md) — Setup e testes
- [NOTEBOOKLM-SINCRONIZACAO.md](../01-OPERACAO-ORACULO/NOTEBOOKLM-SINCRONIZACAO.md) — Inteligência automática
- [Notion Hub](https://notion.com) — 12 bancos (PROJETO_2026, TAREFAS, CRM, FINANCEIRO, etc)
- [NotebookLM](https://notebooklm.google.com/) — ID: 944cbd55-d01b-430e-924d-4a49fe9cfeb4

---

## Métricas de Sucesso (Verificáveis)

- ✅ Hot.md lido automaticamente (cada sessão)
- ⏳ 1+ absorções completas (próximas sessões)
- ⏳ 2+ commits automáticos (após absorções)
- ⏳ NotebookLM mostra conteúdo novo (próxima semana)
- ⏳ 1 áudio gerado no Studio (próximas sessões)
- ⏳ 1 pergunta respondida via NotebookLM (próximas sessões)

---

*ORACULO Cérebro · Meta-projeto · Sessão 20 · 07 jun 2026*
