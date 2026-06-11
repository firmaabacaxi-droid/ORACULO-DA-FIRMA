---
description: Workflow para encerramento financeiro de projetos audiovisuais, cobrindo pagamentos, margens e arquivamento estratégico.
---

# 💰 Workflow: Fechamento Financeiro 360°

Este workflow descreve o processo de encerramento de projeto, garantindo lucratividade e rastreabilidade total.

## 🏁 Gatilho (Trigger)
- O projeto na database `🎬 PROJETOS` é marcado como status `✅ Finalizado`.

## 📉 Fase 1: Auditoria de Custos (Previsto vs. Real)
1. **Lançamento de Pendências**: O Oráculo varre a database `💰 FINANCEIRO` em busca de qualquer custo (equipe, locação, arte) que não foi dado baixa como "Pago".
2. **Saldo Final**: Cálculo automático do lucro líquido (`VALOR CONTRATO` - `CUSTOS TOTAIS`).
3. **Margem Real**: Registro da porcentagem de lucro real para análise comparativa histórica.

## 🧾 Fase 2: Gestão de Cobrança e NF
1. **Verificação de Recebimento**: Confirmar se o cliente final já realizou todos os pagamentos (Inadimplência Zero).
2. **Emissão de Notas Fiscais**: Solicitar ao financeiro (ou via n8n) a emissão da NF final baseada no valor total recebido.

## 📂 Fase 3: Arquivamento Estratégico
1. **Organização do Drive**: Mover a pasta do projeto para o diretório `PROJETOS_FINALIZADOS`.
2. **Backup de Ativos**: Garantir que as fontes editáveis (Prproj, Aep, etc.) estão devidamente salvas.

## 📊 Fase 4: Insights e Feedback
1. **Feedback do Cliente**: Solicitar o NPS (Net Promoter Score) do cliente e registrar na database `🏢 CLIENTES`.
2. **Lições Aprendidas**: Adicionar nota interna com pontos positivos e negativos da produção para o próximo projeto similar.

---
> [!IMPORTANT]
> Um projeto só está realmente "Finalizado" quando o dinheiro está no caixa e as lições aprendidas estão no Oráculo.
