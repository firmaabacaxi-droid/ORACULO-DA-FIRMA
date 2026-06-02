# FLUXO_TRABALHO.md
## Fluxo completo de um projeto audiovisual — Firma Abacaxi
*Documento de contexto permanente do Oráculo · atualizado Mai 2026*

---

## Visão geral do fluxo

```
GERAÇÃO DE LEADS (Marketing Digital)
→ PROSPECÇÃO → CRM → PRIMEIRA ABORDAGEM → ORÇAMENTO/PROPOSTA → ONBOARDING
→ PRÉ-PRODUÇÃO → PRODUÇÃO → EDIÇÃO → ACOMPANHAMENTO DA EDIÇÃO
→ EDIÇÃO FINAL → ENTREGA → NOTA FISCAL → PAGAMENTO
```

**Total:** 13 etapas operacionais + Etapa 0 (captação via marketing digital) · 2 decisões críticas

**Nota:** CLIENTES e CONTATOS são bancos de dados do Notion que acompanham o fluxo — não são uma etapa. O cadastro formal acontece após a proposta ser aprovada (Etapa 5 — Onboarding).

---

## Ferramentas do ecossistema

| Ferramenta | Status | Função |
|---|---|---|
| **Notion** (MCP) | ✅ Ativo | Hub operacional — todos os bancos de dados |
| **Obsidian** (MCP) | ✅ Ativo | Segundo cérebro — briefings, aprendizados, clientes |
| **NotebookLM** | ✅ Ativo | Pesquisa de cliente, extração de conhecimento de apostilas |
| **Brave Search** | ✅ Ativo | Pesquisa de mercado, benchmarks, concorrentes |
| **Claude Code** (Oráculo) | ✅ Ativo | Execução de todas as skills |
| **Google Drive** (rclone CLI) | ✅ Ativo | Upload de PDFs, pastas de projeto, material bruto |
| **Google Drive** (MCP) | 📌 Fase 2 | Integração nativa do Oráculo com o Drive (operações automáticas) |
| **Frame.io** | 📌 Fase 2 | Aprovação de vídeos pelo cliente |
| **Make / n8n** | 📌 Fase 3 | Automações A1–A5 |
| **ElevenLabs** | 📌 Fase 3 | Voice-over profissional |
| **Whisper** | 📌 Fase 3 | Transcrição de briefings gravados |
| **Asaas** | 📌 Fase 3 | Cobrança e gestão financeira automatizada |
| **Upload-Post** | 📌 Fase 3 | Publicação automática no Instagram/LinkedIn/YouTube |
| **Apollo / LinkedIn Sales Nav** | 📌 Fase 4 | Prospecção ativa |
| **Bot Telegram** | 📌 Fase 4 | Oráculo no celular sem PC |
| **Apify** | 📌 Fase 5 | Geração de leads por nicho em Brasília |

ainda vamos colocar mais ferramentas, produção de video por ia, gerenciador de anuncios da meta e google, integração com premiere 

---

## Etapas detalhadas

### Etapa 0 — GERAÇÃO DE LEADS (Marketing Digital)
**Objetivo:** Criar fluxo contínuo de leads qualificados via canais digitais — reduzindo a dependência exclusiva de indicações

**Canais de entrada:**
- Instagram — conteúdo orgânico (bastidores, cases, territórios) + Reels Ads
- LinkedIn — posts de cases B2B + conexões personalizadas com decisores
- Google Ads — keywords locais ("produtora audiovisual Brasília") — quando o site estiver no ar
- Site / landing page — formulário de qualificação → CRM
- E-mail — sequência de nurturing para leads que não agendaram briefing

**Responsável:** Lipe e Jaya (criação do conteúdo) + Oráculo (calendário editorial, copy, relatório de leads)

**Skill ativada:** `skills/prospeccao/SKILL.md` (Etapa 0 — estratégia e funil) · `skills/conteudo/SKILL.md` (execução de conteúdo orgânico)

**Artefato completo:** `skills/prospeccao/MARKETING_CAPTACAO.md`

**Ferramentas:**
- Notion CRM — registro e qualificação de todos os leads gerados
- Typeform — formulário de qualificação (tipo de projeto, orçamento, prazo)
- Zapier — Typeform → Notion automático (📌 Fase 2)
- Calendly — agendamento do briefing
- Mailchimp — sequência de e-mails de nurturing (📌 Fase 2)
- Meta Ads / Google Ads — tráfego pago (📌 Fase 3)

**Saída:** Lead qualificado no CRM → segue para Etapa 2 (Passiva) ou direto para Etapa 3 (Briefing) se já agendou

**Banco Notion:** CRM

---

### Etapa 1 — PROSPECÇÃO
**Objetivo:** Identificar e qualificar oportunidades

**Atividades:**
- Busca de clientes em potencial
- Análise de viabilidade inicial
- Primeiro contato

**Responsável:** Lipe (atendimento) / Oráculo (qualificação)

**Skill ativada:** `skills/prospeccao/SKILL.md`

**Ferramentas:**
- Notion CRM — registro do lead
- Brave Search — pesquisar porte e nicho do cliente

**Antigravity:**
- `negotiation-voss` → preparar abertura do contato
- `marketing-psychology` → calibrar primeira mensagem (prova social)

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

**Nota:** O CRM acompanha toda a prospecção — ativa e passiva. Controla todos os orçamentos, propostas e negociações em andamento. Qualquer oportunidade em negociação vive no CRM até ser fechada (Ganho ou Perdido).

---

### Etapa 3 — PRIMEIRA ABORDAGEM (Briefing)
**Objetivo:** Alinhamento inicial e briefing estruturado

**Atividades:**
- Briefing conduzido por Lipe ou Jaya (uma pergunta por vez, apoiado pelo Oráculo)
- Pesquisa de mercado do cliente (Brave Search + NotebookLM)
- Apresentação de ideias iniciais
- Registro em Obsidian e Notion

**Responsável:** Lipe ou Jaya (condução) + Oráculo (apoio e registro)

**Skill ativada:** `skills/prospeccao/SKILL.md`

**Ferramentas:**
- Notion PROPOSTAS — registro do briefing
- Obsidian — nota do cliente com briefing completo
- NotebookLM — análise de contexto do cliente
- Brave Search — pesquisar concorrentes, referências, contexto do setor
- Whisper — transcrição se o briefing foi gravado (📌 Fase 3)

**Antigravity:**
- `personality-profiler` → determinar perfil DISC do decisor
- `negotiation-voss` → calibrated questions para extrair o orçamento real

**⚠️ DECISÃO CRÍTICA:**
- ✅ Cliente aprova o briefing → avança para ORÇAMENTO
- ❌ Não aprovado → retorna para reformulação

**Saída:** Briefing estruturado aprovado, registrado em Obsidian e Notion

**Banco Notion:** PROPOSTAS (PRP) + CRM

---

### Etapa 4 — ORÇAMENTO / PROPOSTA
**Objetivo:** Contextualização do projeto e definição financeira

**Atividades:**
- Contextualização do projeto: metodologia de trabalho e proposta estética
- Pesquisa de referências estéticas e visuais
- Geração de moodboard (opcional)
- Pesquisa de mercado e benchmarks de preço
- Cálculo detalhado de custos (NF 7,28% sempre incluso)
- Geração de proposta formal em Word
- Envio e negociação

**Nota:** A proposta não é apenas financeira — apresenta a visão do projeto, a metodologia e uma ideia da estrutura narrativa. O roteiro ainda não é desenvolvido aqui, mas já há uma leitura do que o projeto pode ser.

**Responsável:** Agente de Proposta (Oráculo) + Jaya (revisão financeira) + Lipe (validação criativa)

**Skill ativada:** `skills/proposta/SKILL.md`

**Ferramentas:**
- `docs/TABELA_PRECOS.md` — baseline de custo (140+ orçamentos históricos)
- `assets/MODELO_ORCAMENTO.docx` — template Word com logo e assinatura
- `skills/proposta/blocos_xml.md` — formatação do documento
- `output/propostas/` — destino do arquivo gerado

**Antigravity:**
- `financial-calculator-pro` → simular margem, markup, ROI para o cliente
- `negotiation-voss` → preparar respostas para objeções de preço

**Automação:** A1 — Proposta aprovada dispara criação automática do projeto no Notion (📌 Fase 3)

**⚠️ DECISÃO CRÍTICA:**
- ✅ Proposta aprovada → Onboarding do cliente → Pré-produção
- ❌ Não aprovada → negociação ou descarte (CRM atualizado)

**Saída:** Proposta aprovada, orçamento registrado

**Banco Notion:** ORÇAMENTO (ORC) + PROPOSTAS (PRP)

**Campos críticos:**
- Itens de custo (equipe, equipamento, locação, edição, extras)
- Valor unitário + quantidade + total
- NF inclusa no total (7,28%)
- Forma de pagamento
- Status: Enviada / Aprovada / Rejeitada

---

### Etapa 5 — ONBOARDING DO CLIENTE
**Objetivo:** Cadastro formal e início do relacionamento pós-contrato

**Atividades:**
- Cadastro da empresa em CLIENTES
- Cadastro do responsável em CONTATOS
- Criação da nota de perfil do cliente em Obsidian (`02-CLIENTES/`)
- Criação do notebook do cliente no NotebookLM com documentos pesquisados
- Identificação do perfil DISC para adaptar comunicação ao longo do projeto

**Responsável:** Lipe e Jaya + Oráculo (cadastro e notebook)

**Skill ativada:** `skills/prospeccao/SKILL.md`

**Ferramentas:**
- Notion CLIENTES — cadastro da empresa
- Notion CONTATOS — cadastro do responsável
- Obsidian — nota de perfil do cliente em `02-CLIENTES/`
- NotebookLM — criar notebook do cliente com documentos pesquisados

**Antigravity:**
- `personality-profiler` → identificar perfil DISC para adaptar comunicação

**Saída:** Cliente validado e cadastrado no Notion, notebook criado. Projeto pronto para Pré-produção.

**Banco Notion:** CLIENTES (CLI) + CONTATOS (CTT)

**Campos críticos:**
- Nome da empresa
- Responsável / contato
- E-mail / telefone
- Histórico de projetos

---

### Etapa 6 — PRÉ-PRODUÇÃO
**Objetivo:** Planejamento técnico e criativo completo

**Atividades:**
- Projeto Audiovisual — logline, sinopse, argumento (para documentários e projetos de edital)
- Roteiro e decupagem técnica (Literário ou Técnico, conforme tipo de projeto)
- Análise técnica por departamento — Arte, Som, Produção (para produções com equipe múltipla)
- Confirmação de locações (com GPS e contato do responsável)
- Plano de rodagem com DOOD — para filmagens com 2+ diárias
- **Autorizações e contratos** — cessão de imagem, autorização de imóvel, licenças (ANAC, ECAD)
- Arte e design (se aplicável)
- Contratação de equipe freelancer
- Reserva e checklist de equipamentos

**Responsável:** Lipe, Jaya e Oráculo

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

**Saída:** Roteiro + decupagem + plano de filmagem + autorizações assinadas + equipe confirmada + equipamentos reservados

**Banco Notion:** CRIATIVO (CRI) + ANÁLISE TÉCNICA (ANT) + LOCAÇÕES (LOC) + ARTE (ART) + FILMAGEM (FLM) + EQUIPAMENTOS (EQP) + CONTATOS (CTT) + CONTRATO (CON)

**Campos críticos (Roteiro/Decupagem):**
- Cenas com descrição, tipo de plano, lente, movimento de câmera, iluminação
- Equipamentos necessários por cena
- Tempo estimado por cena
- Ordem de filmagem otimizada (por locação → elenco → luz)

---

### Etapa 7 — PRODUÇÃO (Set)
**Objetivo:** Execução da gravação

**Atividades:**
- Transporte e logística
- Hospedagem (se necessário)
- Locação de espaços
- Aluguel de equipamentos extras
- Filmagem
- Log de filmagem (registro de takes por cena — para o editor)
- Ficha de continuidade — raccord visual por cena (figurino, maquiagem, props entre planos)
- Boletim de câmera e som — para produções com equipe técnica dedicada
- Diário de filmagem (registro geral do dia — ocorrências, backup, pendências)

**Responsável:** Lipe e Jaya + equipe freelancer

**Skill ativada:** `skills/producao/SKILL.md`

**Ferramentas:**
- Notion FILMAGEM — registro de diário de set
- Google Drive — upload de material bruto pós-set (📌 Fase 2)
- `automation-workflows` → checklist automatizado de backup pós-filmagem

**Antigravity:**
- `photography-settings` → referência técnica rápida on-set (exposição, hiperfocal)

**Saída:** Material bruto gravado + Log de filmagem + Ficha de continuidade + backup confirmado

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
6. Correção de cor
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
- Notion EDIÇÃO — registro de versão, data, feedback, status
- `skills/humanizador/SKILL.md` — e-mails e mensagens de envio

**Antigravity:**
- `exec-admin` → triagem e priorização de feedbacks do cliente

**Automação:** A4 — alerta automático de prazo de revisão (📌 Fase 3)

**⚠️ REGRA DE NEGÓCIO:** Máximo de 2 rodadas de revisão sem custo adicional. A partir da 3ª rodada, gera aditivo no orçamento. Informar o cliente antes de iniciar a edição.

**Saída:** Versão final aprovada

**Banco Notion:** EDIÇÃO (EDI)

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
| Primeira Abordagem (3) | Cliente aprova o briefing? | → Orçamento | ← Reformular |
| Orçamento / Proposta (4) | Proposta aprovada? | → Onboarding → Pré-produção | ← Negociar ou descartar (CRM) |
| Acompanhamento da Edição (9) | Mais de 2 rodadas de revisão? | → Aditivo no orçamento | → Revisão normal |

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

**Alterações na edição:** Máximo de 2 rodadas de revisão sem custo adicional. A partir da 3ª rodada, gera aditivo no orçamento. Informar o cliente antes de iniciar a edição.

**NF sempre inclusa:** O valor da proposta já inclui os 7,28% de nota fiscal. Nunca apresentar valor sem NF.

**Fechamento financeiro:** Um PROJETO é "Fechado" financeiramente apenas quando todas as RECEITAS foram recebidas e todas as DESPESAS pagas.

**Criação automática:** Ao criar um novo PROJETO, o Oráculo cria automaticamente as primeiras TAREFAS padrão de pré-produção.

---

## Responsabilidades por etapa

| Etapa | Lipe | Jaya | Oráculo |
|---|---|---|---|
| Prospecção | Primeiro contato | — | Qualificação e registro |
| Primeira Abordagem | Condução do briefing | Condução do briefing | Apoio, registro e estruturação |
| Orçamento / Proposta | Validação criativa | Revisão financeira | Geração automática |
| Onboarding | — | Administrativo e cadastro | Registro Notion e notebook |
| Pré-produção | Direção criativa | Logística e análise técnica | Roteiro e decupagem |
| Produção | Direção e fotografia | Assistência técnica e produção | Registro e alertas |
| Edição | Edição principal | — | Envio de versões |
| Entrega | — | Verificação | E-mail automático |
| Financeiro | — | NF e contas | Lembretes e follow-up |

---

## Foco atual do Oráculo

**Etapas prioritárias (ativas agora):**
- Etapa 3 — Briefing e qualificação (skill captacao)
- Etapa 4 — Proposta/orçamento (skill proposta)
- Etapa 6 — Pré-produção (skill preproducao)
- Etapas 9–11 — Acompanhamento e entrega (skill gestao)
- Etapas 12–13 — NF e pagamento (skill gestao)

**Ainda manual (aguardando Fase 3):**
- Automações A1–A5
- Notificações automáticas de prazo
- Follow-up de satisfação automatizado

---

*Última atualização: Mai 2026 — reestruturado com base nos aprendizados dos primeiros projetos reais*
