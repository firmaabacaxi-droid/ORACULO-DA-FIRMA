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

## Editais / Captação Pública

**Trigger:** "edital", "chamada pública", "FAC", "AFD", "lei de incentivo", "prêmio cultural",
"inscrever projeto", "regulamento", "contrapartida", "prestação de contas"

**Skill:** `skills/firma/editais/SKILL.md`

**Orquestra:** `budget-planner` (orçamento) + `narrativa-documental` (pesquisa/estrutura) +
`autoresearch` (contexto) + `idiomas` (texto final). É a versão *fomento* da `proposta`
(que é a versão *venda comercial*).

**Saída:** Projeto formatado ao edital + checklist de conformidade + orçamento alinhado em
`output/propostas/`, registrado no Notion.

---

## Documentário / Narrativa & Pesquisa

**Trigger:** "documentário", "roteiro documental", "estrutura narrativa", "arco", "pesquisa de
contexto", "personagem real", "autenticidade histórica", "coerência cultural", "representação"

**Skill:** `skills/firma/narrativa-documental/SKILL.md` (4 lentes: narratologia, história,
antropologia, inteligência cultural)

**Complementa:** `cinematic-script-writer-1.4.6` (linguagem/técnica de cena) e
`photography-settings`. Esta skill dá a *fundação de conteúdo e estrutura*; a cinematic cuida do
*como filmar*.

**Saída:** Análise estrutural + briefing de pesquisa (com fontes) em `output/roteiros/` ou cérebro.

---

## Distribuição audiovisual (YouTube + Imprensa)

**Trigger YouTube:** "youtube", "vídeo longo", "retenção", "thumbnail", "capítulos", "SEO de vídeo"
→ `skills/firma/youtube-estrategia/SKILL.md`

**Trigger Imprensa:** "release", "assessoria", "imprensa", "jornalista", "lançamento", "festival",
"crise", "porta-voz", "artigo assinado"
→ `skills/firma/assessoria-imprensa/SKILL.md`

**Complementam** (não substituem) `social-media-strategy`, `conteudo` (orgânico) e `upload-post`.

**Saída:** Plano de otimização de vídeo / release + lista de imprensa em `output/conteudo/`.

---

## Tráfego pago (Meta Ads) — Fase 5

**Trigger:** "tráfego pago", "meta ads", "anúncio", "impulsionar", "campanha paga", "pixel",
"público lookalike", "retargeting", "captação de leads paga"

**Skill:** `skills/firma/trafego-pago/SKILL.md`

**Complementa:** `master-marketing` (estratégia orgânica) + `marketing-psychology` +
`personality-profiler` (Antigravity) + skills `n8n-*` (captura de lead).

**⚠️ Pré-requisito:** conta de anúncios + pixel/CAPI + verba aprovada por Lipe/Jaya.

**Saída:** Plano de campanha + setup de rastreamento em `output/conteudo/` ou `output/relatorios/`.

---

## Jurídico audiovisual (primeira passada)

**Trigger:** "contrato", "revisar contrato", "direito de imagem", "cessão de direitos", "LGPD",
"autorização de uso", "comparar versões do contrato"

**Skill:** `skills/firma/juridico-audiovisual/SKILL.md`

**⚠️ Não é aconselhamento jurídico.** Revisor de primeira passada que sinaliza o que precisa de
advogado. Complementa `proposta`/`editais` (geração) e `budget-planner` (cálculo).

**Saída:** Relatório de revisão (resumo + cláusulas de risco + ausências + próximos passos) em
`output/relatorios/`, para levar ao advogado.

---

## Atas de reunião

**Trigger:** "ata", "resumo da reunião", "transcrição da reunião", "o que ficou decidido",
"itens de ação da call"

**Skill:** `skills/firma/atas-reuniao/SKILL.md`

**Alimenta:** skill `gestao` — itens de ação viram tarefas no Notion (TAREFAS) com responsável e prazo.

**Saída:** Ata em 4 seções (data/participantes, decisões, ações, questões em aberto) + tarefas
derivadas no Notion (com autorização).

---

## Referência visual / Prompts de imagem IA

**Trigger:** "moodboard", "storyboard", "referência visual", "prompt de imagem", "midjourney",
"flux", "key art", "conceito de cena"

**Skill:** `skills/firma/prompts-imagem-ia/SKILL.md`

**Complementa:** `cinematic-script-writer` (decupagem) e `narrativa-documental` (evitar
estereótipo na representação). Diferente de `photography-settings` (ajuste de câmera no set real).

**Saída:** Prompts prontos (com variações) + imagens de referência em `06-ESTUDOS-E-REFERENCIAS/`.

---

## Web / Plataforma / Produto (site da Firma + oraculo-app)

**Trigger:** "site da Firma", "landing page", "portfólio", "plataforma", "oraculo-app",
"dashboard", "tela", "componente", "Next.js", "React", "front", "design system",
"identidade visual do site", "schema", "Supabase", "banco da plataforma", "API",
"roadmap do produto", "priorizar feature", "o que construir primeiro"

**Agentes (dispatch, não skills):**
- `firma-product-strategist` → decide **o quê** e em que ordem (roadmap, priorização, métrica)
- `firma-ux-designer` → define a **cara** (design system, tokens, componentes, fluxos)
- `firma-web-builder` → **constrói** o front (Next.js/React/Tailwind) do site e da plataforma
- `firma-backend-architect` → projeta **dados e backend** (Supabase, APIs, auth, integrações)

**Fluxo recomendado:** product-strategist (problema + prioridade) → ux-designer (fundação
visual) → backend-architect (dados/contratos) → web-builder (implementação) → revisão
(`react-reviewer`/`typescript-reviewer`/`database-reviewer` ECC + `firma-verifier`).

**Fronteira de dados:** dado que *muda* (status, valores) → Notion · dado que a plataforma
serve rápido/relacional (auth, sessões) → Supabase · arquivos → Google Drive.

**Saída:** código em `oraculo-app/`, design system documentado, schema/migrations Supabase,
roadmap priorizado. Texto visível ao público passa pela skill `idiomas` (humanização).

---

## Humanizador (sempre ao final de texto externo)

**Trigger:** qualquer texto que vai para o cliente (e-mail, proposta, post, mensagem de WhatsApp)

**Skill:** `skills/humanizador/SKILL.md`

**Regra:** Aplicar APÓS gerar o conteúdo. Garante tom de Lipe e Jaya — caloroso, profissional, sem soar como IA.
