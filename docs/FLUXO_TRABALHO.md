# FLUXO_TRABALHO.md
## Fluxo completo de um projeto audiovisual — Firma Abacaxi
*Documento de contexto permanente do Oráculo · atualizado Mai 2026*

---

## Visão geral do fluxo

```
PROSPECÇÃO → CRM → CLIENTES → PRIMEIRA ABORDAGEM → ORÇAMENTO
→ PRÉ-PRODUÇÃO → PRODUÇÃO → EDIÇÃO → ACOMPANHAMENTO
→ EDIÇÃO FINAL → ENTREGA → NOTA FISCAL → PAGAMENTO
```

**Total:** 13 etapas · 2 decisões críticas · fluxo sequencial com interdependências

---

## Etapas detalhadas

### Etapa 1 — PROSPECÇÃO
**Objetivo:** Identificar e qualificar oportunidades

**Atividades:**
- Busca de clientes em potencial
- Análise de viabilidade inicial
- Primeiro contato

**Responsável:** Lipe (atendimento) / Oráculo (qualificação)

**Saída:** Lead qualificado

**Banco Notion:** PROSPECÇÃO (PRO)

**Campos críticos:**
- Nome do prospect
- Tipo de projeto
- Valor estimado
- Status: Novo / Qualificado / Descartado

---

### Etapa 2 — PASSIVA (CRM)
**Objetivo:** Aguardar resposta e manter relacionamento aquecido

**Atividades:**
- Espera por retorno do cliente
- Follow-up estratégico
- Manutenção de relacionamento

**Responsável:** Oráculo (automatizado)

**Saída:** Cliente confirmado ou descartado

**Banco Notion:** CRM

---

### Etapa 3 — CLIENTE
**Objetivo:** Confirmação e onboarding

**Atividades:**
- Confirmação de interesse
- Coleta de informações iniciais
- Cadastro no sistema

**Responsável:** Jaya (administrativo) + Oráculo (cadastro)

**Saída:** Cliente validado e cadastrado

**Banco Notion:** CLIENTES (CLI)

**Campos críticos:**
- Nome da empresa
- Responsável / contato
- E-mail / telefone
- Histórico de projetos

---

### Etapa 4 — PRIMEIRA ABORDAGEM
**Objetivo:** Alinhamento inicial e briefing

**Atividades:**
- Briefing inicial (conduzido pelo Agente de Captação)
- Entendimento de necessidades
- Apresentação de ideias iniciais
- Criação de cronograma de trabalho

**Responsável:** Agente de Captação (Oráculo) + Lipe (validação)

**⚠️ DECISÃO CRÍTICA:**
- ✅ Cliente aprova → avança para ORÇAMENTO
- ❌ Não aprovado → retorna para reformulação

**Saída:** Briefing estruturado aprovado

**Banco Notion:** PROPOSTAS (PRP) + CRIATIVO (CRI)

---

### Etapa 5 — ORÇAMENTO
**Objetivo:** Definição financeira e aprovação comercial

**Atividades:**
- Estimativa detalhada de custos
- Aprovação do cliente
- Geração de proposta formal

**Responsável:** Agente de Proposta (Oráculo) + Jaya (revisão financeira)

**Saída:** Orçamento acordado e proposta aprovada

**Banco Notion:** ORÇAMENTO (ORC) + PROPOSTAS (PRP)

**Campos críticos:**
- Itens de custo (equipe, equipamento, locação, edição, extras)
- Valor unitário + quantidade + total
- Forma de pagamento
- Status: Enviada / Aprovada / Rejeitada

---

### Etapa 6 — PRÉ-PRODUÇÃO
**Objetivo:** Planejamento detalhado de toda a produção

**Atividades:**
- Elaboração de roteiro e decupagem técnica
- Confirmação de locações (com GPS)
- Estimativa final ajustada
- Arte e design (se aplicável)
- Contratação de equipe freelancer
- Reserva e checklist de equipamentos

**Responsável:** Agente de Produção (Oráculo) + Lipe (validação criativa)

**Saída:** Tudo preparado para o dia de filmagem

**Banco Notion:** CRIATIVO (CRI) + ANÁLISE TÉCNICA (ANT) + LOCAÇÕES (LOC) + ARTE (ART) + FILMAGEM (FLM) + EQUIPAMENTOS (EQP) + CONTATOS (CTT)

**Campos críticos (Roteiro/Decupagem):**
- Cenas com descrição, ângulo, movimento de câmera, iluminação
- Equipamentos necessários por cena
- Tempo estimado por cena
- Ordem de filmagem otimizada

---

### Etapa 7 — PRODUÇÃO
**Objetivo:** Execução da gravação

**Atividades:**
- Transporte e administração de logística
- Hospedagem (se necessário)
- Locação de espaços
- Aluguel de equipamentos extras
- Filmagem

**Responsável:** Lipe e Jaya + equipe freelancer

**⚠️ REGRA DE NEGÓCIO:** Após 2 alterações solicitadas pelo cliente durante a produção, cada nova alteração gera custo adicional (aditivo no orçamento).

**Saída:** Material bruto gravado

**Banco Notion:** FILMAGEM (FLM) + TRANSPORTE (TRP) + ALIMENTAÇÃO (ALI) + FINANCEIRO_PROJETO (FIN)

---

### Etapa 8 — EDIÇÃO
**Objetivo:** Pós-produção e montagem

**Atividades:**
- Briefing para edição (log do material)
- Seleção de takes (select)
- Edição bruta
- Corte 1
- Finalização
- Correção de cor (colorista externo se necessário)
- Masterização de som
- Trilha sonora

**Responsável:** Lipe (edição principal) + especialistas externos (cor, som, trilha)

**Saída:** Primeira versão para aprovação do cliente

**Banco Notion:** EDIÇÃO (EDI)

**Etapas internas da edição:**
1. Log do material
2. Select
3. Edição bruta
4. Corte 1
5. Finalização
6. Correção de cor (contato + orçamento externo)
7. Masterização de som (contato + orçamento externo)
8. Trilha sonora (contato + orçamento externo)

---

### Etapa 9 — ACOMPANHAMENTO DA EDIÇÃO
**Objetivo:** Ciclo de revisão com o cliente

**Atividades:**
- Envio da primeira versão ao cliente
- Coleta de feedback estruturado
- Rodadas de revisão
- Aprovação da versão final

**Responsável:** Oráculo (envio e registro de feedback) + Lipe (ajustes)

**Saída:** Versão final aprovada pelo cliente

**Banco Notion:** ENTREGA_FEEDBACK (ENT)

**Campos críticos:**
- Versão do arquivo
- Data de envio
- Feedback do cliente (registrado pelo Oráculo)
- Status: Em revisão / Aprovado

---

### Etapa 10 — EDIÇÃO FINAL
**Objetivo:** Ajustes finais e masterização

**Atividades:** Implementação dos últimos feedbacks e exportação final

**Responsável:** Lipe

**Saída:** Arquivo master final aprovado

---

### Etapa 11 — ENTREGA DE VÍDEO FINAL
**Objetivo:** Disponibilização do material ao cliente

**Atividades:**
- Entrega do vídeo final (link Drive ou WeTransfer)
- Entrega de arquivos adicionais (fotos, variações de formato)
- Manuais de uso (se aplicável)
- E-mail de entrega formal

**Responsável:** Oráculo (e-mail automático) + Jaya (verificação)

**Saída:** Cliente com todo o material em mãos

**Banco Notion:** ENTREGA_FEEDBACK (ENT)

---

### Etapa 12 — EMISSÃO DA NOTA FISCAL
**Objetivo:** Formalização financeira

**Atividades:**
- Emissão da NF
- Envio de comprovante
- Entrega de recibos (freelancers)

**Responsável:** Jaya + lembrete automático do Oráculo

**Saída:** Documentação fiscal completa

**Banco Notion:** GESTÃO_FINANCEIRA_EMPRESA (GFE)

---

### Etapa 13 — PAGAMENTO
**Objetivo:** Recebimento financeiro e fechamento do projeto

**Atividades:**
- Recebimento do pagamento
- Confirmação de transação
- Fechamento do projeto no sistema
- Follow-up de satisfação (15 dias depois — automático)

**Responsável:** Jaya (financeiro) + Oráculo (follow-up automático)

**Saída:** Projeto finalizado · cliente fidelizado

**Banco Notion:** FINANCEIRO_PROJETO (FIN) + GESTÃO_FINANCEIRA_EMPRESA (GFE)

---

## Decisões críticas do fluxo

| Etapa | Decisão | Sim | Não |
|---|---|---|---|
| Primeira Abordagem | Cliente aprova o briefing? | → Orçamento | ← Reformular |
| Produção | Demanda após 2 alterações? | → Custo extra (aditivo) | → Edição normal |

---

## Regras de negócio

**Transição de status:** Um PROJETO só avança para "Em Produção" se a PROPOSTA estiver "Aprovada" e as tarefas de Pré-produção estiverem "Concluídas".

**Alocação de equipamento:** Um EQUIPAMENTO só pode ser atribuído a um PROJETO se estiver "Disponível" no banco EQP.

**Alertas de prazo:** O Oráculo emite alertas 3 dias antes do prazo de qualquer TAREFA ou ENTREGA.

**Alterações em produção:** Máximo de 2 alterações sem custo adicional. A partir da 3ª, gera aditivo no orçamento.

**Fechamento financeiro:** Um PROJETO é "Fechado" financeiramente apenas quando todas as RECEITAS foram recebidas e todas as DESPESAS pagas.

**Criação automática:** Ao criar um novo PROJETO, o Oráculo cria automaticamente as primeiras TAREFAS padrão de pré-produção.

---

## Responsabilidades por etapa

| Etapa | Lipe | Jaya | Oráculo |
|---|---|---|---|
| Prospecção | Primeiro contato | — | Qualificação e registro |
| Briefing | Validação criativa | — | Condução e estruturação |
| Orçamento | — | Revisão financeira | Geração automática |
| Pré-produção | Direção criativa | Logística | Roteiro e decupagem |
| Produção | Direção e fotografia | Assistência técnica | Registro e alertas |
| Edição | Edição principal | — | Envio de versões |
| Entrega | — | Verificação | E-mail automático |
| Financeiro | — | NF e contas | Lembretes e follow-up |

---

## Foco atual do Oráculo

**Etapas prioritárias:**
- Etapa 4 — Primeira Abordagem (briefing estruturado)
- Etapa 5 — Orçamento (proposta automática)
- Etapa 6 — Pré-produção (roteiro e decupagem)
- Etapas 8–10 — Edição e acompanhamento (gestão de versões)
- Etapas 11–13 — Entrega, NF e pagamento (automações de fechamento)

**Fora do escopo por enquanto:**
- Prospecção ativa (Etapas 1–2)
- Atendimento ao cliente externo (Etapa 3)

---

*Última atualização: Mai 2026*
*Fonte: documentação Manus v1.0 + dados reais da Firma*
