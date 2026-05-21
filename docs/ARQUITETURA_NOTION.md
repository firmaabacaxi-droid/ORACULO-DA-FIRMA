# ARQUITETURA_NOTION.md
## Engenharia de informação V2 — 25 bancos de dados
*Documento de contexto permanente do Oráculo · atualizado Mai 2026*

---

## Visão geral

O sistema Oráculo é construído sobre 25 bancos de dados interconectados no Notion. Dois bancos funcionam como hubs centrais — PROJETO_2026 e CONTATOS — aos quais todos os outros se conectam.

```
FLUXO PRINCIPAL:
PROSPECÇÃO → CRM → CLIENTES → PROPOSTAS → PROJETO_2026
→ PRODUÇÃO → EDIÇÃO → ENTREGA → PAGAMENTO

HUBS CENTRAIS:
PROJETO_2026 ← conecta todas as etapas
CONTATOS     ← conecta todas as pessoas
ORÇAMENTO    ← conecta todos os custos
CRONOGRAMA   ← conecta todas as datas
```

---

## Os 25 bancos de dados

### 01 · PROSPECÇÃO `PRO-`
**Tipo:** Entrada · **Objetivo:** Identificar e qualificar leads

| Campo | Tipo | Descrição |
|---|---|---|
| PRO-ID | ID único | Identificador automático |
| Nome do prospect | Texto | Nome da pessoa ou empresa |
| Empresa | Texto | Razão social |
| Tipo de projeto | Select | Institucional / Evento / Documentário / Redes / Outro |
| Valor potencial | Número | Estimativa em R$ |
| Status | Select | Novo / Em contato / Qualificado / Descartado |
| Próximo passo | Texto | Ação a realizar |
| Origem | Select | Indicação / Instagram / LinkedIn / Ativo / Outro |
| Responsável | Relação | → CONTATOS |
| Data do primeiro contato | Data | — |
| Anotações | Texto longo | Observações livres |

---

### 02 · CRM `CRM-`
**Tipo:** Relacionamento · **Objetivo:** Gestão do pipeline de vendas

| Campo | Tipo | Descrição |
|---|---|---|
| CRM-ID | ID único | — |
| Oportunidade | Título | Nome da oportunidade |
| Cliente | Relação | → CLIENTES |
| Status | Select | Aberto / Ganho / Perdido / Em pausa |
| Valor | Número | Valor em R$ |
| Probabilidade | Número | % de fechamento |
| Próximo contato | Data | — |
| Histórico | Texto longo | Log de interações |

---

### 03 · CLIENTES `CLI-`
**Tipo:** Cadastro · **Objetivo:** Base de dados de clientes ativos

| Campo | Tipo | Descrição |
|---|---|---|
| CLI-ID | ID único | — |
| Nome do cliente | Título | Pessoa ou empresa |
| Razão social | Texto | Nome jurídico |
| CNPJ/CPF | Texto | Documento |
| Contato principal | Relação | → CONTATOS |
| E-mail | E-mail | — |
| Telefone | Telefone | — |
| Endereço | Texto | — |
| Projetos relacionados | Relação | → PROJETO_2026 |
| Segmento | Select | Grande empresa / Pequena / Agência / Produtora / Autônomo / Cultural |
| NPS implícito | Select | Alto / Médio / Baixo |
| Observações | Texto longo | — |

---

### 04 · CONTATOS `CTT-` ⭐ HUB CENTRAL
**Tipo:** Hub de pessoas · **Objetivo:** Centralizar todos os contatos da Firma

*Este banco centraliza equipe fixa, freelancers, fornecedores e contatos de clientes.*

| Campo | Tipo | Descrição |
|---|---|---|
| CTT-ID | ID único | — |
| Nome | Título | Nome completo |
| Tipo | Select | Equipe fixa / Freelancer / Fornecedor / Contato de cliente |
| Função principal | Select | Diretor / DOP / Editor / Colorista / Som / Drone / Iluminação / Arte / Produção / Admin / Outro |
| E-mail | E-mail | — |
| Telefone/WhatsApp | Telefone | — |
| PIX | Texto | Chave PIX para pagamento |
| Dados bancários | Texto | Banco, agência, conta |
| Valor da diária | Número | R$ por dia |
| Disponibilidade | Select | Disponível / Ocupado / Indisponível |
| Projetos atribuídos | Relação | → PROJETO_2026 |
| Currículo/Portfolio | URL | Link externo |
| Histórico com a Firma | Número | Qtd de projetos realizados |
| Observações | Texto longo | — |

---

### 05 · PROPOSTAS `PRP-`
**Tipo:** Comercial · **Objetivo:** Criação e acompanhamento de propostas

| Campo | Tipo | Descrição |
|---|---|---|
| PRP-ID | ID único | — |
| Título da proposta | Título | — |
| Projeto relacionado | Relação | → PROJETO_2026 |
| Cliente | Relação | → CLIENTES |
| Valor total | Número | R$ |
| Status | Select | Rascunho / Enviada / Em negociação / Aprovada / Rejeitada |
| Data de envio | Data | — |
| Data de validade | Data | — |
| Versão | Número | V1, V2... |
| Orçamento | Relação | → ORÇAMENTO |
| Arquivo PDF | URL | Link do Drive |
| Observações | Texto longo | — |

---

### 06 · PROJETO_2026 `PRJ-` ⭐ HUB CENTRAL
**Tipo:** Container · **Objetivo:** Gerenciamento central de todos os projetos

*Este é o banco mais importante do sistema. Todo projeto da Firma nasce e vive aqui.*

| Campo | Tipo | Descrição |
|---|---|---|
| PRJ-ID | ID único | Ex: PRJ-2026-001 |
| Nome do projeto | Título | — |
| Cliente | Relação | → CLIENTES |
| Status | Select | Prospecção / Briefing / Proposta / Aprovado / Pré-produção / Em produção / Edição / Entrega / Concluído / Cancelado |
| Etapa atual | Select | As 13 etapas do fluxo |
| Tipo de projeto | Select | Institucional / Evento / Documentário / Redes / Videoclipe / Técnico / Outro |
| Valor contratado | Número | R$ |
| Margem estimada | Fórmula | Valor - custos totais |
| Data de início | Data | — |
| Data de entrega | Data | — |
| Responsável | Relação | → CONTATOS (Lipe ou Jaya) |
| Proposta | Relação | → PROPOSTAS |
| Orçamento | Relação | → ORÇAMENTO |
| Cronograma | Relação | → CRONOGRAMA |
| Financeiro | Relação | → FINANCEIRO_PROJETO |
| Pasta no Drive | URL | Link da pasta do projeto |
| Prioridade | Select | Alta / Média / Baixa |
| Observações | Texto longo | — |

---

### 07 · CRONOGRAMA `CRO-`
**Tipo:** Planejamento · **Objetivo:** Datas e marcos de todos os projetos

| Campo | Tipo | Descrição |
|---|---|---|
| CRO-ID | ID único | — |
| Evento | Título | Nome do marco |
| Projeto | Relação | → PROJETO_2026 |
| Tipo | Select | Reunião / Filmagem / Entrega / Prazo / Marco |
| Data início | Data | — |
| Data fim | Data | — |
| Status | Select | Planejado / Confirmado / Concluído / Atrasado |
| Percentual conclusão | Número | 0–100% |
| Responsável | Relação | → CONTATOS |

---

### 08 · CRIATIVO `CRI-`
**Tipo:** Criação · **Objetivo:** Roteiros, conceitos e elementos criativos

| Campo | Tipo | Descrição |
|---|---|---|
| CRI-ID | ID único | — |
| Título | Título | Nome do roteiro ou conceito |
| Projeto | Relação | → PROJETO_2026 |
| Tipo | Select | Roteiro / Conceito / Decupagem / Referência / Moodboard |
| Status | Select | Rascunho / Em revisão / Aprovado |
| Responsável | Relação | → CONTATOS |
| Conteúdo | Texto longo / Página | O roteiro completo vive aqui |
| Arquivo externo | URL | Link para Drive se necessário |

*O roteiro é uma página de texto editável dentro do Notion — facilita colaboração e histórico de versões.*

---

### 09 · ANÁLISE TÉCNICA `ANT-`
**Tipo:** Técnico · **Objetivo:** Breakdown de cenas e necessidades técnicas

| Campo | Tipo | Descrição |
|---|---|---|
| ANT-ID | ID único | — |
| Cena | Título | Ex: Cena 3 — Entrevista CEO |
| Projeto | Relação | → PROJETO_2026 |
| Roteiro | Relação | → CRIATIVO |
| Descrição | Texto | O que acontece na cena |
| Ângulo de câmera | Select | Eye-level / Low-angle / High-angle / Bird-eye / Dutch / Overhead |
| Movimento de câmera | Select | Static / Pan / Tilt / Dolly / Handheld / Steadicam / Crane / Drone |
| Tipo de plano | Select | Estabelecimento / Aberto / Médio / Close / Extremo close / POV |
| Iluminação | Select | Natural / Golden hour / Three-point / High-key / Low-key / Chiaroscuro / Rim / Prática |
| Equipamentos necessários | Relação | → EQUIPAMENTOS |
| Locação | Relação | → LOCAÇÕES |
| Duração estimada | Número | Minutos de filmagem |
| Responsável | Relação | → CONTATOS |

---

### 10 · PRODUÇÃO `PDC-`
**Tipo:** Operacional · **Objetivo:** Gestão das etapas de produção

| Campo | Tipo | Descrição |
|---|---|---|
| PDC-ID | ID único | — |
| Etapa | Título | — |
| Projeto | Relação | → PROJETO_2026 |
| Status | Select | Não iniciado / Em andamento / Concluído / Bloqueado |
| Prazo | Data | — |
| Responsável | Relação | → CONTATOS |
| Orçamento da etapa | Relação | → ORÇAMENTO |
| Contrato | Relação | → CONTRATO |
| Observações | Texto | — |

---

### 11 · LOCAÇÕES `LOC-`
**Tipo:** Cadastro · **Objetivo:** Locais de filmagem com informações completas

| Campo | Tipo | Descrição |
|---|---|---|
| LOC-ID | ID único | — |
| Nome da locação | Título | — |
| Projeto | Relação | → PROJETO_2026 |
| Endereço | Texto | Endereço completo |
| Coordenadas GPS | Texto | Lat/Long para Google Maps |
| Status | Select | Em análise / Confirmada / Cancelada |
| Custo | Número | R$ de locação |
| Contato responsável | Relação | → CONTATOS |
| Permissão necessária | Checkbox | Sim/Não |
| Observações | Texto | Restrições, horários, acesso |
| Fotos | URL | Link para Drive |

---

### 12 · ARTE `ART-`
**Tipo:** Criação · **Objetivo:** Design, cenografia e figurino

| Campo | Tipo | Descrição |
|---|---|---|
| ART-ID | ID único | — |
| Item | Título | — |
| Projeto | Relação | → PROJETO_2026 |
| Tipo | Select | Cenografia / Figurino / Prop / Identidade visual / Motion |
| Status | Select | Planejado / Em execução / Pronto |
| Responsável | Relação | → CONTATOS |
| Custo | Número | R$ |
| Arquivo | URL | Link Drive |

---

### 13 · FILMAGEM `FLM-`
**Tipo:** Produção · **Objetivo:** Planejamento e execução das gravações

| Campo | Tipo | Descrição |
|---|---|---|
| FLM-ID | ID único | — |
| Data da filmagem | Título + Data | — |
| Projeto | Relação | → PROJETO_2026 |
| Local | Relação | → LOCAÇÕES |
| Equipe | Relação | → CONTATOS (múltiplos) |
| Equipamentos | Relação | → EQUIPAMENTOS |
| Status | Select | Planejada / Confirmada / Realizada / Cancelada |
| Call time | Texto | Horário de chegada da equipe |
| Wrap time | Texto | Horário previsto de término |
| Orçamento do dia | Relação | → ORÇAMENTO |
| Observações | Texto | — |

---

### 14 · ALIMENTAÇÃO `ALI-`
**Tipo:** Operacional · **Objetivo:** Gestão de refeições da equipe em produção

| Campo | Tipo | Descrição |
|---|---|---|
| ALI-ID | ID único | — |
| Descrição | Título | — |
| Projeto / Filmagem | Relação | → PROJETO_2026 / → FILMAGEM |
| Data | Data | — |
| Quantidade de pessoas | Número | — |
| Custo total | Número | R$ |
| Fornecedor | Relação | → CONTATOS |
| Tipo | Select | Café / Almoço / Jantar / Coffee break |

---

### 15 · TRANSPORTE `TRP-`
**Tipo:** Operacional · **Objetivo:** Logística de deslocamento

| Campo | Tipo | Descrição |
|---|---|---|
| TRP-ID | ID único | — |
| Descrição | Título | — |
| Projeto | Relação | → PROJETO_2026 |
| Data | Data | — |
| Origem | Texto | — |
| Destino | Texto | — |
| Custo | Número | R$ (combustível, pedágio, app) |
| Tipo | Select | Próprio / App / Frete / Hospedagem |
| Responsável | Relação | → CONTATOS |

---

### 16 · EQUIPAMENTOS `EQP-`
**Tipo:** Patrimônio · **Objetivo:** Inventário e controle de equipamentos da Firma

| Campo | Tipo | Descrição |
|---|---|---|
| EQP-ID | ID único | — |
| Nome do equipamento | Título | — |
| Categoria | Select | Câmera / Lente / Drone / Iluminação / Som / Acessório / Gimbal |
| Status | Select | Disponível / Em uso / Manutenção / Alugado |
| Localização atual | Texto | Onde está fisicamente |
| Projeto atual | Relação | → PROJETO_2026 |
| Valor de compra | Número | R$ |
| Número de série | Texto | — |
| Seguro | Checkbox | — |
| Observações | Texto | — |

---

### 17 · ORÇAMENTO `ORC-` ⭐ TABELA VINCULADA
**Tipo:** Financeiro · **Objetivo:** Tabela detalhada de custos por projeto

*Cada linha é um item de custo ou receita — não um valor único.*

| Campo | Tipo | Descrição |
|---|---|---|
| ORC-ID | ID único | — |
| Item | Título | Descrição do item |
| Projeto | Relação | → PROJETO_2026 |
| Categoria | Select | Equipe / Equipamento / Locação / Arte / Transporte / Alimentação / Pós-produção / Imposto / Outro |
| Tipo | Select | Custo / Receita |
| Valor unitário | Número | R$ |
| Quantidade | Número | — |
| Total | Fórmula | Unitário × Quantidade |
| Status | Select | Estimado / Confirmado / Pago / Recebido |
| Fornecedor/Contato | Relação | → CONTATOS |
| Data | Data | Previsão de pagamento/recebimento |
| Nota fiscal | Checkbox | — |

---

### 18 · CONTRATO `CON-`
**Tipo:** Legal · **Objetivo:** Contratos com clientes e prestadores

| Campo | Tipo | Descrição |
|---|---|---|
| CON-ID | ID único | — |
| Título | Título | — |
| Projeto | Relação | → PROJETO_2026 |
| Tipo | Select | Cliente / Prestador de serviço / Locação / NDA |
| Partes | Relação | → CONTATOS + → CLIENTES |
| Status | Select | Rascunho / Enviado / Assinado / Vigente / Encerrado |
| Data de início | Data | — |
| Data de fim | Data | — |
| Valor | Número | R$ |
| Arquivo assinado | URL | Link Drive |
| Observações | Texto | — |

---

### 19 · EDIÇÃO `EDI-`
**Tipo:** Pós-produção · **Objetivo:** Acompanhamento detalhado das etapas de edição

| Campo | Tipo | Descrição |
|---|---|---|
| EDI-ID | ID único | — |
| Projeto | Relação | → PROJETO_2026 |
| Etapa atual | Select | Log material / Select / Edição bruta / Corte 1 / Finalização / Correção cor / Masterização som / Trilha / Concluído |
| Editor | Relação | → CONTATOS |
| Colorista | Relação | → CONTATOS |
| Engenheiro de som | Relação | → CONTATOS |
| Compositor trilha | Relação | → CONTATOS |
| Prazo de entrega | Data | — |
| Software utilizado | Select | Premiere / DaVinci / Final Cut / After Effects / Resolve |
| Pasta de edição | URL | Link Drive |
| Status | Select | Em andamento / Aguardando feedback / Concluído |

---

### 20 · ENTREGA_FEEDBACK `ENT-`
**Tipo:** Finalização · **Objetivo:** Controle de versões e feedback do cliente

| Campo | Tipo | Descrição |
|---|---|---|
| ENT-ID | ID único | — |
| Versão | Título | Ex: V1, V2, Master Final |
| Projeto | Relação | → PROJETO_2026 |
| Data de envio | Data | — |
| Link do arquivo | URL | Drive / WeTransfer |
| Status | Select | Enviado / Em revisão / Aprovado / Rejeitado com feedback |
| Feedback do cliente | Texto longo | Anotações detalhadas do feedback |
| Alterações solicitadas | Número | Contador de alterações |
| Aprovação final | Checkbox | — |
| Data de aprovação | Data | — |

---

### 21 · FINANCEIRO_PROJETO `FIN-`
**Tipo:** Financeiro · **Objetivo:** Controle financeiro específico por projeto

| Campo | Tipo | Descrição |
|---|---|---|
| FIN-ID | ID único | — |
| Descrição | Título | — |
| Projeto | Relação | → PROJETO_2026 |
| Tipo | Select | Receita / Despesa |
| Categoria | Select | Equipe / Equipamento / Locação / Pós-produção / Imposto / Outro |
| Valor | Número | R$ |
| Data | Data | Data real do lançamento |
| Status | Select | Pendente / Pago / Recebido / Atrasado |
| Forma de pagamento | Select | PIX / Transferência / Boleto / Dinheiro |
| Comprovante | URL | Link Drive |
| Nota fiscal | Checkbox | — |

---

### 22 · GESTÃO_FINANCEIRA_EMPRESA `GFE-`
**Tipo:** Financeiro · **Objetivo:** Visão geral das finanças da empresa

| Campo | Tipo | Descrição |
|---|---|---|
| GFE-ID | ID único | — |
| Descrição | Título | — |
| Tipo | Select | Receita / Despesa |
| Categoria | Select | Impostos / Taxas bancárias / Pró-labore / Fornecedores / Equipamentos / Marketing / Outros |
| Valor | Número | R$ |
| Data de vencimento | Data | — |
| Data de pagamento | Data | — |
| Status | Select | Pendente / Pago / Atrasado |
| Projeto relacionado | Relação | → PROJETO_2026 (se aplicável) |
| Recorrente | Checkbox | — |
| Observações | Texto | — |

---

### 23 · DADOS_EMPRESA `EMP-`
**Tipo:** Referência · **Objetivo:** Informações cadastrais da Firma

| Campo | Tipo | Valor atual |
|---|---|---|
| CNPJ | Texto | 50.868.798/0001-66 |
| Razão social | Texto | Firma Abacaxi Ateliê Audiovisual |
| Nome fantasia | Texto | Firma Abacaxi |
| Localização | Texto | Brasília, DF |
| E-mail | E-mail | firmaabacaxi@gmail.com |
| Telefone Lipe | Telefone | +55 61 99618-3146 |
| Telefone Jaya | Telefone | +55 61 99871-2411 |

---

### 24 · TAREFAS `TAR-` ⭐ FLEXÍVEL
**Tipo:** Operacional · **Objetivo:** Gestão de todas as tarefas da Firma

*As tarefas podem estar ligadas a qualquer etapa do projeto.*

| Campo | Tipo | Descrição |
|---|---|---|
| TAR-ID | ID único | — |
| Tarefa | Título | Descrição clara e acionável |
| Projeto | Relação | → PROJETO_2026 |
| Etapa relacionada | Select | Qual etapa do fluxo (1–13) |
| Responsável | Relação | → CONTATOS |
| Prazo | Data | — |
| Status | Select | A fazer / Em andamento / Aguardando / Concluída / Cancelada |
| Prioridade | Select | Urgente / Alta / Média / Baixa |
| Estimativa | Número | Horas estimadas |
| Observações | Texto | — |

---

### 25 · ANOTAÇÕES `ANO-`
**Tipo:** Documentação · **Objetivo:** Notas, reuniões, ideias e registros livres

| Campo | Tipo | Descrição |
|---|---|---|
| ANO-ID | ID único | — |
| Título | Título | — |
| Projeto | Relação | → PROJETO_2026 (opcional) |
| Tipo | Select | Reunião / Ideia / Decisão / Referência / Outro |
| Data | Data | — |
| Participantes | Relação | → CONTATOS |
| Conteúdo | Texto longo / Página | O corpo da anotação |

---

## Relacionamentos principais

```
CONTATOS (hub de pessoas) ← todos os bancos que envolvem pessoas
PROJETO_2026 (hub central) ← todos os bancos que envolvem projetos
ORÇAMENTO (hub financeiro) ← PROPOSTAS, FILMAGEM, ARTE, PRODUÇÃO
CRONOGRAMA ← PROJETO_2026 e todas as etapas com datas
```

---

## Prioridade de implementação

### Fase 1 — Criar agora (bancos essenciais)
1. **PROJETO_2026** — hub central, tudo gira em torno dele
2. **CLIENTES** — cadastro básico de clientes
3. **CONTATOS** — equipe, freelancers, fornecedores
4. **PROPOSTAS** — fluxo comercial
5. **TAREFAS** — gestão do dia a dia

### Fase 2 — Criar na semana 2
6. **ORÇAMENTO** — controle financeiro detalhado por projeto
7. **CRIATIVO** — roteiros e decupagens no Notion
8. **ANÁLISE TÉCNICA** — breakdown técnico de cenas
9. **FINANCEIRO_PROJETO** — margens reais por projeto
10. **CRONOGRAMA** — datas integradas de todos os projetos

### Fase 3 — Criar conforme necessidade surgir
Os demais 15 bancos: FILMAGEM, EDIÇÃO, ENTREGA_FEEDBACK, LOCAÇÕES, EQUIPAMENTOS, CONTRATO, ARTE, ALIMENTAÇÃO, TRANSPORTE, GESTÃO_FINANCEIRA_EMPRESA, ANOTAÇÕES, DADOS_EMPRESA, CRM, PROSPECÇÃO, PRODUÇÃO

---

*Última atualização: Mai 2026*
*Fonte: Arquitetura V2 Manus — 25 bancos + dados reais da Firma*
