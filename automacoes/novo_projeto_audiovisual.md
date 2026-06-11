---
description: Workflow para iniciar novos projetos audiovisuais, desde a aprovação no CRM até a abertura da fase de produção.
---

# 🎬 Workflow: Onboarding de Novo Projeto

Este workflow descreve o processo estratégico que ocorre sempre que uma negociação é fechada no CRM da Firma Abacaxi.

## 🏁 Gatilho (Trigger)
- Uma oportunidade na database `💼 CRM` é marcada com o estágio `✅ Ganho`.

## 🏗️ Fase 1: Criação da Estrutura (Automático)
1. **Ativação 3.0**: O Oráculo cria um novo registro na database `🎬 PROJETOS`.
2. **Setup do Nome**: O nome do projeto segue o padrão: `00 [NOME DO PROJETO] - [CLIENTE]`.
3. **Internal Boards**: Se necessário, o Oráculo cria páginas internas no projeto para `CRIATIVO` e `ANÁLISE TÉCNICA` (baseado em templates pré-definidos).

## 📁 Fase 2: Gestão de Ativos (Digital Assets)
1. **Pasta de Produção**: Criação da pasta mestre no Google Drive/Dropbox vinculada ao projeto.
2. **Subpastas Padrão**:
   - `01_REFERENCIAS`
   - `02_BRIEFINGS`
   - `03_MATERIA_PRIMA`
   - `04_PROJETOS_EDITAVEIS`
   - `05_EXPORTES`
   - `06_ENTREGA_FINAL`

## 👥 Fase 3: Escalação de Equipe
1. **Convites**: Envio de links de acesso à pasta do projeto para os freelancers escalados via `👥 CONTATOS`.
2. **Briefing Inicial**: Disparar mensagem via Telegram com o link do Notion e do Drive para a equipe.

## 💰 Fase 4: Setup Financeiro
1. **Lançamento de Entrada**: Criar o primeiro registro de entrada na database `💰 FINANCEIRO` com o valor do sinal ou primeira parcela do contrato.
2. **Cálculo de Budget**: Definir o teto de gastos baseado na margem de lucro estimada.

---
> [!TIP]
> Use este workflow para garantir que nenhum projeto comece "bagunçado". A organização no dia 01 economiza dias de pós-produção.
