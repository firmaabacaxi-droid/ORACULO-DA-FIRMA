---
description: Workflow de reconstrução do sistema Oráculo para a versão 3.0, focando em migração de dados e configuração de schema.
---

# 🛠️ Workflow: Reconstrução Hub 3.0

Este workflow descreve os passos técnicos e estratégicos para migrar a estrutura legada (1.0) para o novo Hub Master Oráculo 3.0.

## 🏁 Fase 1: Preparação do Local (Manual)
1. O usuário deve criar a página mestre `🚀 ORÁCULO 3.0 — HUB` na raíz da Engine.
2. Dentro dela, criar as bases inline vazias usando o comando `/database-inline`:
   - `🎬 PROJETOS`
   - `💰 FINANCEIRO`
   - `💼 CRM`
   - `🏢 CLIENTES`
   - `✅ TAREFAS`
   - `👥 CONTATOS`

## 🏗️ Fase 2: Injeção de Inteligência (Automático - Oráculo)
1. **Mapeamento de IDs**: O Oráculo identifica os IDs das novas bases criadas.
2. **Setup de Propriedades**: Criar todas as propriedades definidas no `plano_implementacao_oraculo_3_0.md`.
   - **MANDATÓRIO**: Todas as colunas devem começar com o emoji padrão.
   - **CORES**: As cores dos selects (Status, Categorias) devem seguir o `visual_reference.md`.

## 📥 Fase 3: Bombeamento de Dados (Processamento)
1. **Extração 1.0**: O Oráculo lê todos os registros das bases antigas (Legacy).
2. **Limpeza e Normalização**:
   - Conversão de Status (ex: "Trabalhando" -> "🎥 Produção").
   - Limpeza de nomes de projetos (Uppercase standardization).
3. **Carga v3**: Criação das páginas na estrutura nova com os dados transformados.

## 🔗 Fase 4: Consolidação de Relações
1. **Relinkagem Automática**: O Oráculo percorre as bases e religa as relações que foram "quebradas" na criação (Projetos ↔️ Clientes, Projetos ↔️ Financeiro).
2. **Validação de Fórmulas**: Verificação se as barras de progresso e saldos estão calculando corretamente.
3. **Setup de Dashboards**: Atualização dos links de visualização para apontar para as novas fontes de dados 3.0.
