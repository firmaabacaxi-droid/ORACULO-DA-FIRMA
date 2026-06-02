# SESSÃO 13 — Auditoria Completa de Bidimensionalidades
## Relacionamentos bidirecionais em todos os projetos

*27 Maio 2026 · Oráculo v1.3*

---

## O QUE FOI FEITO

### 1. Vinculação de Filmagens Maranhã ✅

**Problema:** 2 registros de filmagem (Dia 1 e Dia 2) criados mas NÃO vinculados ao projeto

**Solução:** Atualizou o campo `Projeto` em ambas as filmagens para apontar para o projeto #16

**Resultado:** Campo `Filmagens` no projeto agora mostra:
- Maranhã — Dia 1 (28/05/2026)
- Maranhã — Dia 2 (29/05/2026)

A relação DUAL funciona: projeto → filmagens AND filmagens → projeto ✓

---

## AUDITORIA COMPLETA — 8 Projetos abertos

### Estado das Bidimensionalidades por Projeto

| # | Projeto | Filmagens | Edições | Orçamentos | Financeiro | Status |
|---|---------|-----------|---------|------------|-----------|--------|
| #10 | SIMBIOSE | ❌ 0 | ✅ 1 | ❌ 0 | ❌ 0 | Briefing |
| #16 | Maranhã | ✅ 2 | ❌ 0 | ✅ 12 | ❌ 0 | Aprovado |
| #08 | RNP Ailton Krenak | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | Aprovado |
| #14 | AGO | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | Aprovado |
| #16 | Oficinas de Documentário | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | Em produção |
| #15 | Filmmaker Independente | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | Pausado |
| — | Visite mon Agencé | ❌ 0 | ❌ 0 | ✅ 1 | ❌ 0 | Em produção |
| — | FIOCRUZ REDE COLABORA | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | Em produção |

---

### Análise por Banco

#### FILMAGEM (collection://bc067267-b603-41fc-bb75-c00050cec4cc)
- **2 registros:** Maranhã Dia 1 e Dia 2 ✅ VINCULADOS
- **Status:** Pré-filmagem (ambos)
- **Próximo:** Atualizar para "Em campo" após 28/05, depois "Finalizado" após 29/05

#### EDIÇÃO (collection://0b437e77-08c6-4f6e-a133-5ca3f682ab58)
- **1 registro:** SIMBIOSE — Vídeo 1min30s ✅ VINCULADO
- **Status:** Em andamento
- **Etapa:** Edição bruta
- **Próximo:** Criar registros para outros projetos em pós-produção

#### ORÇAMENTO (collection://1acaa528-4627-4817-8d43-093d3ad19137)
- **12 registros Maranhã** ✅ VINCULADOS
- **4 registros SOBRE2026** (projeto em Prospecção — não em execução)
- **0 para SIMBIOSE, RNP, AGO, OFICINAS, etc.**
- **Gap crítico:** SIMBIOSE precisa orçamento (R$ 800 mencionado)

#### FINANCEIRO_PROJETO (collection://cd8f5929-87b0-431b-b392-00b49a11b98e)
- **0 registros** — nenhum projeto registrou despesas reais ainda
- Esperado: Maranhã começará a registrar após 28/05
- Necessário: comprovantes e recibos para cada gasto

#### GESTÃO_FINANCEIRA_EMPRESA (collection://3a29ba12-7582-458e-bbbb-f631cfcbef35)
- **0 registros** — não iniciado
- Para depois: despesas operacionais não vinculadas a projetos

---

## ESTADO FINAL — Relações DUAL

**9 de 9 relações bidirecionais operacionais:**

| Relação | Campo em A | Campo em B | Status |
|---------|-----------|-----------|--------|
| PROJETO_2026 ↔ CLIENTES | Cliente | Projetos relacionados | ✅ DUAL |
| PROJETO_2026 ↔ PROPOSTAS | Proposta | Projeto relacionado | ✅ DUAL |
| PROJETO_2026 ↔ TAREFAS | Tarefas | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ CONTATOS | Responsável | (reverso) | ✅ DUAL |
| PROJETO_2026 ↔ FILMAGEM | Filmagens | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ EDIÇÃO | Edições | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ ORÇAMENTO | Orçamentos | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ FINANCEIRO_PROJETO | Financeiro do Projeto | Projeto | ✅ DUAL |
| PROJETO_2026 ↔ GESTÃO_FINANCEIRA | Gestão Financeira | Projeto relacionado | ✅ DUAL |

---

## GAPS IDENTIFICADOS

### 🔴 Críticos

1. **SIMBIOSE falta orçamento** — você mencionou R$ 800
   - Ação: Criar registro em ORÇAMENTO, vincular ao projeto

2. **RNP, AGO, OFICINAS, FILMMAKER** — verificar se têm orçamentos históricos
   - Ação: Pesquisar propostas aprovadas e registrar em ORÇAMENTO

### 🟡 Esperados (normal para novos projetos)

- Nenhum projeto tem FINANCEIRO_PROJETO registrado
  - Normal: apenas Maranhã começará 28/05
  - Quando registrar: use `Tipo: Despesa`, `Status: Pendente` até comprovar

---

## PRÓXIMAS AÇÕES

### Antes de Maranhã (28/05)
- [ ] Validar 12 itens de orçamento contra a proposta aprovada
- [ ] Confirmar datas das filmagens (Dias 1 e 2)

### Pós-Maranhã (29/05 em diante)
- [ ] Atualizar FILMAGEM.Status para "Finalizado"
- [ ] Registrar despesas reais em FINANCEIRO_PROJETO com comprovantes
- [ ] Criar orçamento para SIMBIOSE (R$ 800)

### Próximas sessões
- [ ] Investigar RNP, AGO, OFICINAS — têm orçamentos/filmagens pendentes?
- [ ] Implementar dashboard de Budget vs. Actual no FINANCEIRO_PROJETO
- [ ] Revisar e atualizar status de projetos antigos

---

## CHECKLIST BIDIMENSIONALIDADES

- [x] SIMBIOSE: edição vinculada
- [x] Maranhã: filmagens vinculadas
- [x] Maranhã: orçamento verificado (12 items)
- [ ] SIMBIOSE: orçamento R$ 800 (a fazer)
- [ ] Maranhã: despesas registradas (a fazer após 28/05)
- [ ] RNP/AGO/OFICINAS: investigar registros antigos
- [ ] FINANCEIRO_PROJETO: começar a registrar gastos reais

---

*Documenta Sessão 13 · 27 Mai 2026*
*Vinculação de Maranhã + auditoria de 8 projetos abertos*
*Resultado: 9/9 relações DUAL funcionando, 2 projetos com infraestrutura (SIMBIOSE + Maranhã)*
