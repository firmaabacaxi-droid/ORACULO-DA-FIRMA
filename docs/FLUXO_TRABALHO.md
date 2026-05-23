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

## Ferramentas do ecossistema

| Ferramenta | Status | Função |
|---|---|---|
| **Notion** (MCP) | ✅ Ativo | Hub operacional — todos os bancos de dados |
| **Obsidian** (MCP) | ✅ Ativo | Segundo cérebro — briefings, aprendizados, clientes |
| **NotebookLM** | ✅ Ativo | Pesquisa de cliente, extração de conhecimento de apostilas |
| **Brave Search** | ✅ Ativo | Pesquisa de mercado, benchmarks, concorrentes |
| **Claude Code** (Oráculo) | ✅ Ativo | Execução de todas as skills |
| **Google Drive** (MCP) | 📌 Fase 2 | Arquivos de projeto, entrega de material |
| **Frame.io** | 📌 Fase 2 | Aprovação de vídeos pelo cliente |
| **Make / n8n** | 📌 Fase 3 | Automações A1–A5 |
| **ElevenLabs** | 📌 Fase 3 | Voice-over profissional |
| **Whisper** | 📌 Fase 3 | Transcrição de briefings gravados |
| **Asaas** | 📌 Fase 3 | Cobrança e gestão financeira automatizada |
| **Upload-Post** | 📌 Fase 3 | Publicação automática no Instagram/LinkedIn/YouTube |
| **Apollo / LinkedIn Sales Nav** | 📌 Fase 4 | Prospecção ativa |
| **Bot Telegram** | 📌 Fase 4 | Oráculo no celular sem PC |
| **Apify** | 📌 Fase 5 | Geração de leads por nicho em Brasília |

---

## Etapas detalhadas

### Etapa 1 — PROSPECÇÃO
**Objetivo:** Identificar e qualificar oportunidades

**Atividades:**
- Busca de clientes em potencial
- Análise de viabilidade inicial
- Primeiro contato

**Responsável:** Lipe (atendimento) / Oráculo (qualificação)

**Skill ativada:** `skills/captacao/SKILL.md`

**Ferramentas:**
- Notion CRM — registro do lead
- Brave Search — pesquisar porte e nicho do cliente

**Antigravity:**
- `negotiation-voss` → preparar abertura do contato
- `marketing-psychology` → calibrar primeira mensagem (prova social, ancoragem)

**Automação:** A5 — Geração de leads via Apify por nicho/cidade (📌 Fase 5)

**Saída:** Lead qualificado no Notion CRM

**Banco Notion:** CRM

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

**Skill ativada:** `skills/gestao/SKILL.md` (templates de follow-up)

**Ferramentas:**
- Notion CRM — atualização de status
- `skills/humanizador/SKILL.md` — todos os textos de follow-up

**Antigravity:**
- `negotiation-voss` → pacing do follow-up, labeling para reativar sem pressão

**Automação:** A4 — Follow-up automático após 7 dias sem resposta (📌 Fase 3)

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

**Skill ativada:** `skills/captacao/SKILL.md`

**Ferramentas:**
- Notion CLIENTES — cadastro da empresa
- Notion CONTATOS — cadastro do responsável
- Obsidian — nota de perfil do cliente em `02-CLIENTES/`
- NotebookLM — criar notebook do cliente com documentos pesquisados

**Antigravity:**
- `personality-profiler` → identificar perfil DISC para adaptar comunicação

**Saída:** Cliente validado, cadastrado no Notion e com notebook criado

**Banco Notion:** CLIENTES (CLI) + CONTATOS (CTT)

**Campos críticos:**
- Nome da empresa
- Responsável / contato
- E-mail / telefone
- Histórico de projetos

---

### Etapa 4 — PRIMEIRA ABORDAGEM (Briefing)
**Objetivo:** Alinhamento inicial e briefing estruturado

**Atividades:**
- Briefing conduzido pelo Oráculo (uma pergunta por vez)
- Pesquisa de mercado do cliente (Brave Search + NotebookLM)
- Apresentação de ideias iniciais
- Registro em Obsidian e Notion

**Responsável:** Agente de Captação (Oráculo) + Lipe (validação)

**Skill ativada:** `skills/captacao/SKILL.md`

**Ferramentas:**
- Notion PROPOSTAS — registro do briefing
- Obsidian — nota do cliente com briefing completo
- NotebookLM — análise de contexto do cliente
- Brave Search — pesquisar concorrentes, referências, contexto do setor
- Whisper — transcrição se o briefing foi gravado (📌 Fase 3)

**Antigravity:**
- `personality-profiler` → determinar perfil DISC do decisor
- `marketing-psychology` → ancoragem na apresentação de ideias iniciais
- `negotiation-voss` → calibrated questions para extrair o orçamento real

**⚠️ DECISÃO CRÍTICA:**
- ✅ Cliente aprova o briefing → avança para ORÇAMENTO
- ❌ Não aprovado → retorna para reformulação

**Saída:** Briefing estruturado aprovado, registrado em Obsidian e Notion

**Banco Notion:** PROPOSTAS (PRP) + CRM

---

### Etapa 5 — ORÇAMENTO / PROPOSTA
**Objetivo:** Definição financeira e aprovação comercial

**Atividades:**
- Pesquisa de mercado e benchmarks de preço
- Cálculo detalhado de custos (NF 7,28% sempre incluso)
- Geração de proposta formal em Word
- Envio e negociação

**Responsável:** Agente de Proposta (Oráculo) + Jaya (revisão financeira)

**Skill ativada:** `skills/proposta/SKILL.md`

**Ferramentas:**
- `docs/TABELA_PRECOS.md` — baseline de custo (140+ orçamentos históricos)
- `assets/MODELO_ORCAMENTO.docx` — template Word com logo e assinatura
- `skills/proposta/blocos_xml.md` — formatação do documento
- `output/propostas/` — destino do arquivo gerado

**Antigravity:**
- `marketing-psychology` → ancoragem de preço (âncora alta → oferta real), prova social, urgência
- `financial-calculator-pro` → simular margem, markup, ROI para o cliente
- `negotiation-voss` → preparar respostas para objeções de preço

**Automação:** A1 — Proposta aprovada dispara criação automática do projeto no Notion (📌 Fase 3)

**Saída:** Proposta aprovada, orçamento registrado

**Banco Notion:** ORÇAMENTO (ORC) + PROPOSTAS (PRP)

**Campos críticos:**
- Itens de custo (equipe, equipamento, locação, edição, extras)
- Valor unitário + quantidade + total
- NF inclusa no total (7,28%)
- Forma de pagamento
- Status: Enviada / Aprovada / Rejeitada

---

### Etapa 6 — PRÉ-PRODUÇÃO
**Objetivo:** Planejamento técnico e criativo completo

**Atividades:**
- Roteiro e decupagem técnica
- Confirmação de locações (com GPS)
- Arte e design (se aplicável)
- Contratação de equipe freelancer
- Reserva e checklist de equipamentos

**Responsável:** Agente de Produção (Oráculo) + Lipe (validação criativa)

**Skill ativada:** `skills/preproducao/SKILL.md`

**Ferramentas:**
- Notion — CRIATIVO (CRI), ANÁLISE TÉCNICA (ANT), LOCAÇÕES (LOC), FILMAGEM (FLM), EQUIPAMENTOS (EQP), CONTATOS (CTT)
- Obsidian — notas de direção, referências visuais
- NotebookLM — pesquisa de referências e técnicas
- `output/roteiros/` — destino do roteiro gerado

**Antigravity:**
- `cinematic-script-writer` → técnicas cinematográficas por tipo de cena (175+ técnicas)
- `photography-settings` → configurações de câmera, exposição, hiperfocal por condição de luz
- `automation-workflows` → configurar checklist de backup automático de material

**Automação:** A2 — Proposta aprovada cria automaticamente tarefas de pré-produção + convite de freelancers (📌 Fase 3)

**Saída:** Roteiro + decupagem + plano de filmagem + equipe confirmada + equipamentos reservados

**Banco Notion:** CRIATIVO (CRI) + ANÁLISE TÉCNICA (ANT) + LOCAÇÕES (LOC) + ARTE (ART) + FILMAGEM (FLM) + EQUIPAMENTOS (EQP) + CONTATOS (CTT)

**Campos críticos (Roteiro/Decupagem):**
- Cenas com descrição, ângulo, movimento de câmera, iluminação
- Equipamentos necessários por cena
- Tempo estimado por cena
- Ordem de filmagem otimizada

---

### Etapa 7 — PRODUÇÃO (Set)
**Objetivo:** Execução da gravação

**Atividades:**
- Transporte e logística
- Hospedagem (se necessário)
- Locação de espaços
- Aluguel de equipamentos extras
- Filmagem
- Diário de filmagem (registro de cenas, ocorrências, backup)

**Responsável:** Lipe e Jaya + equipe freelancer

**Skill ativada:** `skills/producao/SKILL.md`

**Ferramentas:**
- Notion FILMAGEM — registro de diário de set
- Google Drive — upload de material bruto pós-set (📌 Fase 2)
- `automation-workflows` → checklist automatizado de backup pós-filmagem

**Antigravity:**
- `photography-settings` → referência técnica rápida on-set (exposição, hiperfocal)

**⚠️ REGRA DE NEGÓCIO:** Após 2 alterações do cliente em produção, cada nova alteração gera custo adicional (aditivo no orçamento).

**Saída:** Material bruto gravado + diário de filmagem + backup confirmado

**Banco Notion:** FILMAGEM (FLM) + TRANSPORTE (TRP) + ALIMENTAÇÃO (ALI) + FINANCEIRO_PROJETO (FIN)

---

### Etapa 8 — EDIÇÃO
**Objetivo:** Pós-produção e montagem

**Atividades:**
- Log do material (briefing para edição)
- Seleção de takes (select)
- Edição bruta → Corte 1 → Finalização
- Correção de cor (colorista externo se necessário)
- Masterização de som + trilha sonora

**Responsável:** Lipe (edição principal) + especialistas externos (cor, som, trilha)

**Ferramentas:**
- Frame.io — aprovação do cliente por versão de edição (📌 Fase 2)
- Notion EDIÇÃO — registro de versões e status

**Saída:** Primeira versão para aprovação do cliente

**Banco Notion:** EDIÇÃO (EDI)

**Etapas internas:**
1. Log do material
2. Select
3. Edição bruta
4. Corte 1
5. Finalização
6. Correção de cor (contato + orçamento externo)
7. Masterização de som
8. Trilha sonora

---

### Etapa 9 — ACOMPANHAMENTO DA EDIÇÃO
**Objetivo:** Ciclo de revisão com o cliente

**Atividades:**
- Envio da versão ao cliente
- Coleta e registro estruturado de feedback
- Rodadas de revisão
- Aprovação da versão final

**Responsável:** Oráculo (envio e registro) + Lipe (ajustes)

**Skill ativada:** `skills/gestao/SKILL.md`

**Ferramentas:**
- Frame.io — cliente comenta diretamente no vídeo (📌 Fase 2)
- Notion ENTREGA_FEEDBACK — registro de versão, data, feedback, status
- `skills/humanizador/SKILL.md` — e-mails e mensagens de envio

**Antigravity:**
- `exec-admin` → triagem e priorização de feedbacks do cliente

**Automação:** A4 — alerta automático de prazo de revisão (📌 Fase 3)

**Saída:** Versão final aprovada

**Banco Notion:** ENTREGA_FEEDBACK (ENT)

**Campos críticos:**
- Versão do arquivo
- Data de envio
- Feedback do cliente
- Status: Em revisão / Aprovado

---

### Etapa 10 — EDIÇÃO FINAL
**Objetivo:** Ajustes finais e masterização

**Atividades:**
- Implementação dos últimos feedbacks
- Exportação dos formatos finais (Master + formatos de distribuição)

**Responsável:** Lipe

**Ferramentas:**
- Google Drive — organização de arquivos finais (📌 Fase 2)

**Saída:** Arquivo master final aprovado + todos os formatos exportados

---

### Etapa 11 — ENTREGA DE VÍDEO FINAL
**Objetivo:** Disponibilização do material ao cliente

**Atividades:**
- Entrega do vídeo final (link Drive ou WeTransfer → Drive MCP na Fase 2)
- Entrega de arquivos adicionais (fotos, variações de formato)
- Manuais de uso (se aplicável)
- E-mail de entrega formal

**Responsável:** Oráculo (e-mail automático) + Jaya (verificação)

**Skill ativada:** `skills/gestao/SKILL.md`

**Ferramentas:**
- `skills/humanizador/SKILL.md` — e-mail de entrega
- Google Drive MCP — link de entrega (📌 Fase 2)

**Automação:** A4 — e-mail de entrega + follow-up de NPS 15 dias depois (📌 Fase 3)

**Saída:** Cliente com todo o material em mãos

**Banco Notion:** ENTREGA_FEEDBACK (ENT)

---

### Etapa 12 — EMISSÃO DA NOTA FISCAL
**Objetivo:** Formalização financeira

**Atividades:**
- Emissão da NF (NF sempre inclusa no total — 7,28% do valor bruto)
- Envio de comprovante
- Entrega de recibos (freelancers)

**Responsável:** Jaya + lembrete automático do Oráculo

**Skill ativada:** `skills/gestao/SKILL.md`

**Ferramentas:**
- Asaas — emissão e cobrança automatizada (📌 Fase 3)
- `financial-calculator-pro` — conferência de margem final do projeto

**Antigravity:**
- `financial-calculator-pro` → cálculo de rentabilidade real do projeto (margem líquida pós-NF e custos)

**Automação:** A4 — lembrete automático de emissão de NF ao marcar "Entregue" (📌 Fase 3)

**Saída:** Documentação fiscal completa

**Banco Notion:** GESTÃO_FINANCEIRA_EMPRESA (GFE)

---

### Etapa 13 — PAGAMENTO + FECHAMENTO
**Objetivo:** Recebimento financeiro e fechamento do projeto

**Atividades:**
- Recebimento do pagamento
- Confirmação de transação
- Fechamento do projeto no Notion
- Follow-up de satisfação (15 dias depois)

**Responsável:** Jaya (financeiro) + Oráculo (follow-up automático)

**Skill ativada:** `skills/gestao/SKILL.md`

**Ferramentas:**
- Asaas — confirmação automática de pagamento (📌 Fase 3)
- Notion FINANCEIRO_PROJETO — fechamento de receitas e despesas

**Antigravity:**
- `financial-calculator-pro` → relatório final de rentabilidade
- `automation-workflows` → blueprint fechamento_financeiro_projeto.md

**Automação:** A4 — follow-up automático 15 dias após entrega (📌 Fase 3)

**Saída:** Projeto fechado · cliente fidelizado · aprendizado registrado no MEMORIA.md

**Banco Notion:** FINANCEIRO_PROJETO (FIN) + GESTÃO_FINANCEIRA_EMPRESA (GFE)

---

## Decisões críticas do fluxo

| Etapa | Decisão | Sim | Não |
|---|---|---|---|
| Primeira Abordagem | Cliente aprova o briefing? | → Orçamento | ← Reformular |
| Produção | Demanda após 2 alterações? | → Custo extra (aditivo) | → Edição normal |

---

## Automações do fluxo (A1–A5)

| ID | Automação | Gatilho | Status |
|---|---|---|---|
| **A1** | Briefing → Projeto no Notion | CRM marcado "✅ Ganho" | 📌 Fase 3 |
| **A2** | Proposta aprovada → Pré-produção ativada | PROPOSTAS: "Aprovada" | 📌 Fase 3 |
| **A3** | Ordem do Dia automática às 8h | Cron diário | 📌 Fase 3 |
| **A4** | Entrega → Follow-up + NF automatizados | PROJETO: "Entregue" | 📌 Fase 3 |
| **A5** | Making-of → Conteúdo para redes | Projeto fechado | 📌 Fase 3 |

Blueprints completos: `C:\Users\User\Documents\ANTIGRAVITY\.agents\workflows\`

---

## Regras de negócio

**Transição de status:** Um PROJETO só avança para "Em Produção" se a PROPOSTA estiver "Aprovada" e as tarefas de Pré-produção estiverem "Concluídas".

**Alocação de equipamento:** Um EQUIPAMENTO só pode ser atribuído a um PROJETO se estiver "Disponível" no banco EQP.

**Alertas de prazo:** O Oráculo emite alertas 3 dias antes do prazo de qualquer TAREFA ou ENTREGA.

**Alterações em produção:** Máximo de 2 alterações sem custo. A partir da 3ª, gera aditivo no orçamento.

**NF sempre inclusa:** O valor da proposta já inclui os 7,28% de nota fiscal. Nunca apresentar valor sem NF.

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

**Etapas prioritárias (ativas agora):**
- Etapa 3–4 — Briefing e qualificação (skill captacao)
- Etapa 5 — Proposta/orçamento (skill proposta)
- Etapa 6 — Pré-produção (skill preproducao)
- Etapas 9–11 — Acompanhamento e entrega (skill gestao)
- Etapas 12–13 — NF e pagamento (skill gestao)

**Ainda manual (aguardando Fase 3):**
- Automações A1–A5
- Notificações automáticas de prazo
- Follow-up de satisfação automatizado

---

*Última atualização: Mai 2026 — redesenhado com ferramentas, skills e automações*
