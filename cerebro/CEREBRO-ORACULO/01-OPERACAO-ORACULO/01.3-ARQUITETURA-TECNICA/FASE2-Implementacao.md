# Fase 2 — Implementação Completa

**Status:** 🟡 Planejado | **Data de criação:** Mai 23, 2026 | **Versão:** v1.0

*Documento vivo que rastreia o progresso de cada sprint da Fase 2. Atualizar conforme avança.*

---

## Visão geral

Fase 2 consolida a integração do ecossistema: bancos Notion funcionais, Google Drive conectado, Frame.io para aprovação de vídeos, e o site da Firma no ar.

- **Duração estimada:** 2-3 semanas
- **Custo:** +R$160/mês (Drive, Frame.io, Framer, domínio)
- **Documento de referência:** [[FASE2_IMPLEMENTACAO]]

---

## Sprints

### Sprint A — Pendências críticas da Fase 1

#### A1 — Criar 5 bancos Notion
- **Status:** ⏳ Aguardando autorização
- **O que:** ORÇAMENTO | CRIATIVO | ANÁLISE TÉCNICA | FINANCEIRO_PROJETO | CRONOGRAMA
- **Executor:** Oráculo (MCP)
- **Prazo:** [a definir]
- **Checklist:**
  - [ ] ORÇAMENTO criado
  - [ ] CRIATIVO criado
  - [ ] ANÁLISE TÉCNICA criado
  - [ ] FINANCEIRO_PROJETO criado
  - [ ] CRONOGRAMA criado
  - [ ] Testar relações com Brasil Participativo
  - [ ] Commit: "feat: criar 5 bancos Notion Fase 2"

#### A2 — Preparar subagentes
- **Status:** ⏳ Aguardando
- **O que:** Sistema prompts prontos em [[SUBAGENTES]] — Oráculo cria tutorial
- **Executor:** Lipe/Jaya (manual no claude.ai)
- **Prazo:** [a definir]
- **Checklist:**
  - [ ] GUIA_SUBAGENTES_SETUP.md gerado
  - [ ] Agente de Proposta criado
  - [ ] Agente de Produção criado
  - [ ] Agente de Gestão criado
  - [ ] Agente de Conteúdo criado
  - [ ] Testar 1 agente com task real

---

### Sprint B — Google Drive MCP

- **Status:** 📋 Design
- **Abordagem:** Google Drive Desktop + filesystem MCP (recomendada)
- **Executor:** Oráculo (config) + Lipe (confirmar caminho)
- **Prazo:** [a definir]
- **Checklist:**
  - [ ] Confirmar: Google Drive Desktop instalado?
  - [ ] Identificar: caminho da pasta Drive
  - [ ] Editar `.mcp.json` com o caminho
  - [ ] Criar estrutura de pastas no Drive
  - [ ] Testar acesso
  - [ ] Commit: "feat: conectar Google Drive via filesystem MCP"

---

### Sprint C — Frame.io

- **Status:** 📋 Design
- **O que:** Plataforma de revisão de vídeo (cliente comenta no timestamp)
- **Executor (manual):** Lipe/Jaya — criar conta + project template
- **Executor (automático):** Oráculo — criar guia + atualizar skills
- **Prazo:** [a definir]
- **Checklist:**
  - [ ] Conta Frame.io criada (Lipe)
  - [ ] Project Template criado (Lipe)
  - [ ] GUIA_FRAMEIO.md gerado (Oráculo)
  - [ ] skills/producao atualizado com Frame.io (Oráculo)
  - [ ] skills/gestao atualizado com Frame.io (Oráculo)
  - [ ] Template de e-mail criado (Oráculo)
  - [ ] Commit: "docs: adicionar Frame.io no fluxo de edição"

---

### Sprint D — Site da Firma (Framer)

- **Status:** 📋 Design
- **Estrutura:** Home | Trabalhos | Quem somos | Serviços | Contato
- **Executor (conteúdo):** Oráculo
- **Executor (design):** Lipe/Jaya no Framer
- **Prazo:** [a definir]
- **Checklist Oráculo:**
  - [ ] output/site/home.md gerado
  - [ ] output/site/sobre.md gerado
  - [ ] output/site/servicos.md gerado
  - [ ] output/site/portfolio.md gerado
  - [ ] output/site/contato.md gerado
  - [ ] Commit: "content: gerar conteúdo do site para Framer"
- **Checklist Lipe/Jaya:**
  - [ ] Domínio registrado (firmaabacaxi.com.br)
  - [ ] Conta Framer criada
  - [ ] Site montado
  - [ ] Domínio conectado
  - [ ] Publicado

---

## Ordem recomendada de execução

```
SEMANA 1:
  Session atual: Sprint A1 + A2 + Sprint D (conteúdo)
  
SEMANA 2:
  Após Lipe confirmar Google Drive: Sprint B
  Após Lipe criar Frame.io: Sprint C
  Após Lipe registrar domínio: Sprint D (design)
  
SEMANA 3:
  Teste integrado: Novo projeto → Drive → Frame.io
  Validação: 5 bancos funcionando + Drive acessível + Site no ar
```

---

## Arquivos

**Criar:** GUIA_SUBAGENTES_SETUP.md, GUIA_FRAMEIO.md, output/site/* (5 arquivos)
**Modificar:** .mcp.json, skills/producao/SKILL.md, skills/gestao/SKILL.md, CLAUDE.md
**Notion:** 5 bancos via MCP

---

## Referências

- [[FASE2_IMPLEMENTACAO]] — documento técnico detalhado
- [[SUBAGENTES]] — system prompts dos 5 agentes
- [[CONTEXTO_FIRMA]] — identidade e valores
- [[FLUXO_TRABALHO]] — 13 etapas do projeto audiovisual
- [[ARQUITETURA_NOTION]] — schemas de todos os bancos

---

*Última atualização: Mai 23, 2026*
