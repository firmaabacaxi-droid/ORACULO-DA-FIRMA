---
description: Routing detalhado de skills — triggers, orquestradores, ferramentas e saídas
globs:
  - "skills/**"
---

# Skills — Routing Detalhado

## Mapa de skills operacionais

```
skills/
├── prospeccao/
│   ├── SKILL.md             → orquestradora prospecção + qualificação + briefing
│   └── MARKETING_CAPTACAO.md → Etapa 0: estratégia, canais, conteúdo
├── proposta/
│   ├── SKILL.md             → geração de proposta + orçamento
│   ├── blocos_xml.md        → formatação XML dos blocos do Word
│   └── assets/MODELO_ORCAMENTO.docx → template Word com logo
├── preproducao/
│   └── SKILL.md             → orquestradora: roteiro + decupagem + plano de rodagem
├── producao/
│   └── SKILL.md             → set: diário, log de filmagem, ficha continuidade
├── gestao/
│   └── SKILL.md             → orquestradora: ordem do dia + tarefas + financeiro
├── conteudo/
│   └── SKILL.md             → orquestradora: calendário editorial + posts + copy
└── humanizador/
    └── SKILL.md             → aplica em todo texto que vai ao cliente externo
```

---

## Etapa 0 — Marketing / Geração de Leads

**Trigger:** "marketing digital", "geração de leads", "funil", "estratégia de captação", "conteúdo orgânico", "Instagram", "LinkedIn", "calendário editorial de prospecção"

**Skills:**
- `skills/prospeccao/MARKETING_CAPTACAO.md` (estratégia e funil)
- `skills/conteudo/SKILL.md` (execução de conteúdo orgânico)

**Base de conhecimento:** `cerebro/CEREBRO-ORACULO/03-CONHECIMENTO/marketing-digital/`

**Saída:** Estratégia de captação + calendário de conteúdo + copy de posts

---

## Prospecção / Briefing

**Trigger:** "prospecção", "captação", "novo lead", "briefing", "qualificação", "primeiro atendimento", "DISC do cliente"

**Skill:** `skills/prospeccao/SKILL.md`

**Fluxo:** Etapa 0 (marketing) → qualificação → briefing estruturado → pesquisa do cliente (Brave Search + NotebookLM) → DISC → proposta

**Antigravity integrada:**
- `negotiation-voss` → calibrated questions para extrair budget real
- `personality-profiler` → identificar perfil DISC do decisor

**Saída:** Briefing estruturado salvo em Obsidian + registro no Notion CRM

---

## Proposta / Orçamento

**Trigger:** "proposta", "orçamento", "precificação", "revisão de proposta", "novo orçamento"

**Skill:** `skills/proposta/SKILL.md`

**Usar direto quando:** prospecção já feita, só falta gerar ou revisar o documento

**Antigravity integrada:**
- `financial-calculator-pro` → simular margem, markup, ROI
- `negotiation-voss` → preparar respostas para objeções de preço
- `marketing-psychology` → ancoragem e estrutura narrativa da proposta

**Saída:** Word em `output/propostas/NomeCliente_proposta_v1.docx` + registro em Notion PROPOSTAS

---

## Pré-produção

**Trigger:** "roteiro", "decupagem", "plano de filmagem", "plano de rodagem", "análise técnica", "pré-produção", "locações"

**Skill:** `skills/preproducao/SKILL.md`

**Templates disponíveis:** `cerebro/CEREBRO-ORACULO/01-FIRMA/TEMPLATES/`
- `Template-Roteiro-Literario.md`
- `Template-Roteiro-Tecnico.md`
- `Template-Plano-Rodagem.md`
- `Template-Analise-Tecnica.md`
- `Template-Projeto-Audiovisual.md`

**Antigravity integrada:**
- `cinematic-script-writer` → 175+ técnicas cinematográficas
- `photography-settings` → configurações de câmera por cena

**Saída:** Roteiro + decupagem em `output/roteiros/` + registro em Notion CRIATIVO

---

## Produção (Set)

**Trigger:** "filmagem", "set", "diário de produção", "material bruto", "log de câmera", "ficha de continuidade", "boletim de set"

**Skill:** `skills/producao/SKILL.md`

**Templates disponíveis:**
- `Template-Log-Filmagem.md`
- `Template-Ficha-Continuidade.md`
- `Template-Boletim-Camera-Som.md`
- `Template-Ordem-do-Dia.md`

**Saída:** Log de filmagem + ficha de continuidade + diário de set no Notion FILMAGEM

---

## Gestão

**Trigger:** "ordem do dia", "tarefas", "prioridades", "relatório", "financeiro", "follow-up", "NF", "pagamento", "fechamento de projeto"

**Skill:** `skills/gestao/SKILL.md`

**Antigravity integrada:**
- `exec-admin` → priorização P0/P1/P2
- `financial-calculator-pro` → rentabilidade real do projeto

**Saída:** Ordem do Dia + tarefas no Notion + relatório em `output/relatorios/`

---

## Conteúdo

**Trigger:** "post", "reel", "stories", "calendário editorial", "copy para Instagram", "LinkedIn", "newsletter", "repropósito de projeto"

**Skill:** `skills/conteudo/SKILL.md`

**Saída:** Posts em `output/conteudo/` + calendário editorial

---

## Humanizador (sempre ao final de texto externo)

**Trigger:** qualquer texto que vai para o cliente (e-mail, proposta, post, mensagem de WhatsApp)

**Skill:** `skills/humanizador/SKILL.md`

**Regra:** Aplicar APÓS gerar o conteúdo. Garante tom de Lipe e Jaya — caloroso, profissional, sem soar como IA.
