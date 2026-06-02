# Finalização Sessão 15 — Arquitetura Híbrida, SOBRE2026, rclone Drive
*27 Mai 2026*

---

## O que foi feito nesta sessão

### Parte 1 — Arquitetura Híbrida de Orçamento

**Decisão arquitetural central:** Banco central ORÇAMENTO permanece como fonte única de verdade, mas cada projeto recebe uma Linked View filtrada — dando a experiência de "orçamento dentro do projeto" sem duplicar dados.

**Papéis redefinidos:**
- `PROPOSTAS` = documento comercial (PDF, valor fechado, histórico de versões)
- `ORÇAMENTO` = itemização dos custos (cada linha = um item)
- `FINANCEIRO_PROJETO` = transações reais

**Mudanças no banco:**
- Campo `Proposta` DUAL adicionado ao ORÇAMENTO → vincula itens ao documento comercial
- Rollup `Valor Total Orcado` adicionado ao PROJETO_2026 → exibe total orçado direto no card
- 8 Linked Views "💰 Orçamento" criadas nas páginas dos projetos ativos

**Limitação encontrada:** A API do Notion não suporta filtrar linked views por campo de relação via DSL. Filtros devem ser configurados manualmente (30 segundos por projeto).

---

### Parte 2 — VI SOBRE 2026: Correção de Estrutura

**Problema:** projeto PRJ-17 estava incorretamente registrado como PROJETO quando é ainda uma PROPOSTA.

**Solução aplicada:**
- Criado registro PROPOSTAS: "VI SOBRE 2026 — Conferência Brasileira de Restauração Ecológica"
  - Cliente: SOBRE2026 | Contato: Viviane | Status: Prospecção | Valor: R$ 58.124,08
- Criados 9 itens de ORÇAMENTO detalhados e vinculados à proposta (Fase = Proposta)
- CRM atualizado com entrada para SOBRE2026
- PRJ-17 marcado para deletar manualmente (Notion UI)

---

### Parte 3 — Google Drive + rclone

**Conquista:** rclone instalado e configurado — Drive operacional sem custo adicional.

**Configuração:**
- Remote `gdrive` aponta para pasta `FIRMA ABACAXI/` (ID: `10hUTz_FXeFiIj5yyrjM8Aygeg8HpH_UK`)
- Escopo restrito — rclone não enxerga o resto do Drive pessoal
- Config: `C:\Users\User\AppData\Roaming\rclone\rclone.conf`

**Primeiro uso:**
- Estrutura criada: `PROJETOS/2026/VI SOBRE 2026 — UnB/01_PROPOSTA/`
- PDF uploadado: `SOBRE2026_proposta_v1.pdf`
- Notion atualizado: campo `Arquivo PDF` da proposta recebeu link direto ao arquivo

**Regra estabelecida — Pastas por Demanda:**
Criar pasta no Drive apenas quando a etapa do projeto começar, não todas de uma vez.
Ver template completo em: `memory/feedback_google_drive.md`

---

## Aprendizados técnicos

### Notion DSL — filtros em relação não funcionam
```
# Tentativas que falharam:
FILTER: "Projeto" CONTAINS "nome-do-projeto"
FILTER: "Projeto" HAS page_id
# Todas resultam em advancedFilter vazio
# Workaround: filtrar manualmente na UI (30s por projeto)
```

### rclone — scope correto para Drive existente
```ini
# ERRADO — só enxerga arquivos criados pelo rclone:
scope = drive.file

# CORRETO — acesso completo, limitado pelo root_folder_id:
scope = drive
root_folder_id = ID_DA_PASTA_RAIZ
```

### Estrutura de pastas Drive (template, criar por etapa)
```
PROJETOS/2026/[NOME]/
├── 01_PROPOSTA/           ← criar na Etapa 4
├── 02_PRE-PRODUCAO/       ← criar na Etapa 6
├── 03_PRODUCAO/           ← criar na Etapa 7
├── 04_POS-PRODUCAO/       ← criar na Etapa 8
├── 05_ENTREGA/            ← criar na Etapa 11
└── 06_FINANCEIRO/         ← criar na Etapa 12
```

---

## Estado do sistema ao fim da sessão

```
✅ rclone          — instalado, autenticado, gdrive remote ativo
✅ Google Drive    — pasta FIRMA ABACAXI/ operacional
✅ VI SOBRE 2026   — PROPOSTA + 9 itens ORÇAMENTO + CRM criados
✅ Noção           — 10 relações DUAL, 8 linked views criadas
```

## Pendências para próxima sessão

1. Deletar PRJ-17 (VI SOBRE 2026 como projeto) no Notion UI
2. Configurar filtros nas 8 Linked Views de "💰 Orçamento" manualmente
3. Preencher `Fase = Proposta` nos 12 itens Maranhã e 4 itens SOBRE2026
4. Atualizar `docs/FLUXO_TRABALHO.md` — rclone/Drive como ferramenta ativa
5. Criar orçamento para SIMBIOSE (R$ 800)
6. Registrar primeiras transações FINANCEIRO_PROJETO após filmagem Maranhã (28-29/05)
