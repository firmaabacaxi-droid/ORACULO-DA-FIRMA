# ARQUITETURA_NOTION.md
## Engenharia de informação V2 — 25 bancos de dados
*Documento de contexto permanente do Oráculo · atualizado Mai 2026*

> ⚠️ **Arquitetura em construção** — Este documento descreve a arquitetura completa planejada.
> A implementação está acontecendo em fases. Verificar a tabela de status abaixo antes de referenciar qualquer banco.
> Última auditoria via MCP: 25/05/2026

---

## ⚠️ Parent obrigatório — Wiki principal

Toda criação de página ou banco no Notion **DEVE** usar como parent:

- **URL:** https://www.notion.so/3288a52591f381a0885fc20691f28468
- **Título:** 🔮 ORÁCULO -FIRMA ABACAXi
- **Tipo:** wiki database (parent type = `"page"`, não `"database_id"`)

**Workspaces a IGNORAR (versões antigas — nunca criar dentro delas):**
- ORACULO TESTES (3548a525-91f3-8089-aa2e-d8f9fad2dc9b)
- ORACULO V7 (3378a525-91f3-80f3-9a05-da07ba8c3acf)

---

## Status de implementação real

*Auditado via MCP em 27/05/2026 — 10 bancos existem no Notion (Fase 1 + 3 bancos Fase 2).*

| Banco | Prefixo | Fase | Status | Observações |
|---|---|---|---|---|
| PROJETO_2026 | PRJ- | 1 | ✅ Criado | Hub central, 9 relações DUAL: Clientes, Propostas, Tarefas, Contatos, Filmagens, Edições, Orçamentos, Financeiro, Gestão Financeira |
| CLIENTES | CLI- | 1 | ✅ Criado | Tem `Órgão público` como segmento extra (vs. doc) |
| CONTATOS | CTT- | 1 | ✅ Criado | Tem campo `Restrição Alimentar` (vs. doc) |
| PROPOSTAS | PRP- | 1 | ✅ Criado | Integrada ao CRM via relação |
| TAREFAS | TAR- | 1 | ✅ Criado | — |
| CRM | CRM- | 1 | ✅ Criado | Tem rollup `Valor da Proposta` e status `Fechado` extras |
| PROSPECÇÃO | PRO- | 1 | ❌ Não criado | CRM cobre essa função; criar apenas se necessário |
| ORÇAMENTO | ORC- | 2 | ✅ Criado (27/05) | Rastreia proposta vs. realizado com campo Versão para aditivos |
| CRIATIVO | CRI- | 2 | ⏳ Pendente | — |
| ANÁLISE TÉCNICA | ANT- | 2 | ⏳ Pendente | — |
| FINANCEIRO_PROJETO | FIN- | 2 | ✅ Criado (27/05) | Transações reais por projeto, vincula ao ORÇAMENTO |
| CRONOGRAMA | CRO- | 2 | ⏳ Pendente | — |
| GESTÃO_FINANCEIRA_EMPRESA | GFE- | 2 | ✅ Criado (27/05) | Despesas e receitas da empresa não vinculadas a projeto |
| FILMAGEM | FLM- | 3 | ✅ Criado (27/05) | Cada dia = 1 registro; equipamentos e equipe por dia |
| EDIÇÃO | EDI- | 3 | ✅ Criado (27/05) | Rastreia etapas de edição e pós-produção por projeto |
| ENTREGA_FEEDBACK | ENT- | 3 | ⏳ Pendente | — |
| LOCAÇÕES | LOC- | 3 | ⏳ Pendente | — |
| EQUIPAMENTOS | EQP- | 3 | ⏳ Pendente | — |
| CONTRATO | CON- | 3 | ⏳ Pendente | — |
| ARTE | ART- | 3 | ⏳ Pendente | — |
| ALIMENTAÇÃO | ALI- | 3 | ⏳ Pendente | — |
| TRANSPORTE | TRP- | 3 | ⏳ Pendente | — |
| GESTÃO_FINANCEIRA_EMPRESA | GFE- | 3 | ⏳ Pendente | — |
| ANOTAÇÕES | ANO- | 3 | ⏳ Pendente | — |
| DADOS_EMPRESA | EMP- | 3 | ⏳ Pendente | — |
| PRODUÇÃO | PDC- | 3 | ⏳ Pendente | — |

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
| Proposta | Relação DUAL | ↔ PROPOSTAS |
| Orçamento | Relação DUAL | ↔ ORÇAMENTO |
| Cronograma | Relação | → CRONOGRAMA |
| Financeiro | Relação DUAL | ↔ FINANCEIRO_PROJETO |
| **Valor Total Orcado** | **Rollup** | **Soma de Total em ORÇAMENTO** ← total orçado do projeto |
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

> **Quando implementado, adicionar campos por departamento:**
> Arte (props, cenografia, set dressing) · Figurino · Maquiagem · Som direto (tipo de captação, wild sound) · VFX · Complexidade (Baixa/Média/Alta)
> Referência completa: `cerebro/01-FIRMA/TEMPLATES/Template-Analise-Tecnica.md`

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

> **Documentos de set associados a cada registro de FILMAGEM (páginas filhas — sem banco próprio):**
> Ficha de Continuidade · Boletim de Câmera e Som · Log de Filmagem
> Templates: `cerebro/01-FIRMA/TEMPLATES/Template-Ficha-Continuidade.md` e `Template-Boletim-Camera-Som.md`

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
**Data Source ID:** `collection://1acaa528-4627-4817-8d43-093d3ad19137` · **Status:** ✅ Criado 27/05/2026 · **Atualizado:** 27/05/2026 (Sessão 15)

*Cada linha é um item de custo ou receita — não um valor único. Rastreia proposta vs. realizado via campos Budget vs. Actual.*

| Campo | Tipo | Descrição |
|---|---|---|
| Item | Título | Descrição do item |
| Projeto | Relação DUAL | ↔ PROJETO_2026 |
| **Proposta** | **Relação DUAL** | **↔ PROPOSTAS** ← vincula os itens ao documento comercial |
| **Fase** | **Select** | **Proposta / Execucao** ← distingue orçamento enviado ao cliente do que surgiu na execução |
| Categoria | Select | Equipe / Equipamento / Locação / Arte / Transporte / Alimentação / Pós-produção / Imposto / Outro |
| Tipo | Select | Custo / Receita |
| Valor unitário | Número | R$ |
| Quantidade | Número | — |
| Total | Número | R$ (Valor unitário × Quantidade) |
| Status | Select | Estimado / Confirmado / Pago / Recebido |
| **Versão** | **Select** | **Original / Aditivo 001 / Aditivo 002** ← rastreia mudanças de escopo da proposta |
| Fornecedor/Contato | Relação | → CONTATOS |
| Data | Data | Previsão de pagamento/recebimento |
| Nota fiscal | Checkbox | — |
| **Transacoes** | **Relação DUAL** | **↔ FINANCEIRO_PROJETO** ← lista de transações reais vinculadas a este item |
| **Valor Real** | **Rollup** | **Soma de Valor em FINANCEIRO_PROJETO** ← o que realmente foi gasto/recebido |
| **Variancia** | **Fórmula** | **Total − Valor Real** ← positivo = abaixo do orçado (bom); negativo = estouro |

**Views globais no banco central:**
- `Por Projeto` — todos os itens agrupados por projeto
- `Proposta` — filtrada por Fase = Proposta, agrupada por projeto
- `Budget vs Actual` — mostra Total / Valor Real / Variancia agrupados por projeto
- `Pendencias` — filtrada por Status = Estimado (itens ainda não confirmados)

**Linked Views (Sessão 15 — arquitetura híbrida):**
Cada projeto ativo tem uma view "💰 Orçamento" inline na sua página, apontando para este banco central.
Para ver apenas os itens do projeto, defina o filtro `Projeto = [este projeto]` na view (botão "Filtrar" no topo da view).
Projetos configurados: Maranhã, Comunicação Simbiose, RNP Ailton Krenak, AGO, Oficinas de Documentário, Filmmaker Independente, Visite mon Agencé, FIOCRUZ REDE COLABORA.

---

### 17B · FILMAGEM `FLM-` ⭐ NOVO
**Tipo:** Produção · **Objetivo:** Registro de cada dia de filmagem com equipe, equipamentos e status  
**Data Source ID:** `collection://bc067267-b603-41fc-bb75-c00050cec4cc` · **Status:** ✅ Criado 27/05/2026

*Cada registro = 1 dia de filmagem (equipe e equipamentos podem variar por dia).*

| Campo | Tipo | Descrição |
|---|---|---|
| Nome da filmagem | Título | Ex: "Maranhã — Dia 1 (28/05/2026)" |
| Projeto | Relação | → PROJETO_2026 |
| Data | Data | — |
| Local | Texto | Endereço / nome do espaço |
| Equipe escalada | Relação | → CONTATOS |
| Equipamentos | Texto longo | Lista dos itens para o dia |
| Ordem do dia | URL | Link Drive / documento |
| Roteiro | URL | Link Drive / documento |
| Status | Select | Pré-filmagem / Em campo / Finalizado |
| Observações | Texto | — |

---

### 17C · FINANCEIRO_PROJETO `FIN-` ⭐ NOVO
**Tipo:** Financeiro · **Objetivo:** Transações reais (pagamentos e recebimentos) por projeto  
**Data Source ID:** `collection://cd8f5929-87b0-431b-b392-00b49a11b98e` · **Status:** ✅ Criado 27/05/2026 · **Atualizado:** 27/05/2026 (Sessão 14)

*Cada linha = um pagamento ou recebimento que realmente aconteceu. Vincula ao ORÇAMENTO via relação DUAL para alimentar Budget vs. Actual.*

| Campo | Tipo | Descrição |
|---|---|---|
| Descrição | Título | — |
| Projeto | Relação DUAL | ↔ PROJETO_2026 |
| **Item Orcamento** | **Relação DUAL** | **↔ ORÇAMENTO** ← vincula a transação ao item de orçamento previsto |
| Tipo | Select | Receita / Despesa |
| Categoria | Select | Equipe / Equipamento / Locação / Pós-produção / Imposto / Outro |
| Valor | Número | R$ |
| Data real | Data | Data efetiva do pagamento/recebimento |
| Status | Select | Pendente / Pago / Recebido / Atrasado |
| Forma de pagamento | Select | PIX / Transferência / Boleto / Dinheiro |
| Comprovante | URL | Link Drive |
| Número NF | Texto | Para contabilidade |
| Nota fiscal | Checkbox | — |

**Como usar:** Ao registrar uma transação real, vincule ao `Item Orcamento` correspondente. Isso alimenta automaticamente o campo `Valor Real` no ORÇAMENTO e atualiza a `Variancia`.

---

### 17D · GESTÃO_FINANCEIRA_EMPRESA `GFE-` ⭐ NOVO
**Tipo:** Financeiro · **Objetivo:** Despesas e receitas da empresa não vinculadas a um projeto específico  
**Data Source ID:** `collection://3a29ba12-7582-458e-bbbb-f631cfcbef35` · **Status:** ✅ Criado 27/05/2026

*Aluguel, assinaturas (Adobe CC), pró-labore, taxas bancárias, equipamentos da empresa, etc.*

| Campo | Tipo | Descrição |
|---|---|---|
| Descrição | Título | — |
| Tipo | Select | Receita / Despesa |
| Categoria | Select | Impostos / Taxas bancárias / Pró-labore / Fornecedores / Equipamentos / Marketing / Outros |
| Valor | Número | R$ |
| Data de vencimento | Data | — |
| Data de pagamento | Data | — |
| Status | Select | Pendente / Pago / Atrasado |
| Projeto relacionado | Relação | → PROJETO_2026 (opcional — para despesas que afetam um projeto mas são da empresa) |
| Recorrente | Checkbox | — |
| Observações | Texto | — |

---

### 18 · CONTRATO `CON-`
**Tipo:** Legal · **Objetivo:** Contratos com clientes e prestadores

| Campo | Tipo | Descrição |
|---|---|---|
| CON-ID | ID único | — |
| Título | Título | — |
| Projeto | Relação | → PROJETO_2026 |
| Tipo | Select | Cliente / Prestador de serviço / Locação / NDA / **Cessão de imagem (maior)** / **Cessão de imagem (menor)** / **Autorização de imóvel** / **Licença musical (ECAD)** |
| Partes | Relação | → CONTATOS + → CLIENTES |
| Status | Select | Rascunho / Enviado / Assinado / Vigente / Encerrado |
| Data de início | Data | — |
| Data de fim | Data | — |
| Valor | Número | R$ |
| Arquivo assinado | URL | Link Drive |
| Observações | Texto | — |

> **Quando implementado, adicionar:**
> Campo `Cenas cobertas` (relação → ANT) para vincular cessões de imagem às cenas específicas.
> Templates de todos os documentos legais: `cerebro/01-FIRMA/TEMPLATES/Template-Autorizacoes-Contratos.md`

---

### 19 · EDIÇÃO `EDI-` ⭐ CRIADO 27/05
**Tipo:** Pós-produção · **Objetivo:** Rastreamento de etapas de edição e pós-produção

**Data Source ID:** `collection://0b437e77-08c6-4f6e-a133-5ca3f682ab58`

| Campo | Tipo | Descrição |
|---|---|---|
| Nome da edição | Título | Ex: "SIMBIOSE — Vídeo 1min30s" |
| Projeto | Relação | → PROJETO_2026 |
| Etapa de edição | Select | Log material / Seleção / Edição bruta / Corte 1 / Finalização / Correção cor / Masterização som / Trilha / Concluído |
| Editor | Texto | Nome do editor responsável |
| Prazo de entrega | Data | Data de entrega esperada |
| Software | Select | Premiere / DaVinci / Final Cut / After Effects |
| Pasta de edição | URL | Link da pasta no Drive |
| Status | Select | Em andamento / Aguardando feedback / Concluído |
| Tipo de entrega | Select | Vídeo / Foto / Reel / Ambos |
| Observações | Texto longo | Notas sobre a edição |

**Notas de implementação:**
- Campo `Editor` criado como TEXT em vez de RELATION (API Notion não permite relações em bancos novos via DDL simples)
- Relação `Projeto` vinculada ao PROJETO_2026
- Cada registro representa um projeto/tipo de entrega em edição (pode ter múltiplos registros por projeto se há vídeo + fotos simultâneos)

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

### ✅ Fase 1 — Concluída (Mai 2026)
1. **PROJETO_2026** — hub central
2. **CLIENTES** — cadastro de clientes
3. **CONTATOS** — equipe, freelancers, fornecedores
4. **PROPOSTAS** — fluxo comercial
5. **TAREFAS** — gestão do dia a dia
6. **CRM** — pipeline comercial

*Nota: PROSPECÇÃO (banco #01) não foi criado — o CRM cobre essa função. Reavaliar se necessário.*

### Fase 2 — Próximos bancos a criar
6. **ORÇAMENTO** — controle financeiro detalhado por projeto
7. **CRIATIVO** — roteiros e decupagens no Notion
8. **ANÁLISE TÉCNICA** — breakdown técnico de cenas
9. **FINANCEIRO_PROJETO** — margens reais por projeto
10. **CRONOGRAMA** — datas integradas de todos os projetos

### Fase 3 — Criar conforme necessidade surgir
Os demais 14 bancos: FILMAGEM, EDIÇÃO, ENTREGA_FEEDBACK, LOCAÇÕES, EQUIPAMENTOS, CONTRATO, ARTE, ALIMENTAÇÃO, TRANSPORTE, GESTÃO_FINANCEIRA_EMPRESA, ANOTAÇÕES, DADOS_EMPRESA, PRODUÇÃO, PROSPECÇÃO (se necessário)

---

## Ferramentas e referências

### Instaladas

| Ferramenta | Versão | Uso |
|---|---|---|
| `notion-client` | 3.1.0 | SDK oficial Python — scripts de auditoria e automação via API |
| `notion-backup` | 0.3.10 | Backup automático dos bancos em Markdown/CSV (`backup_notion.exe`) |

**Nota:** os executáveis ficam em `C:\Users\User\AppData\Roaming\Python\Python314\Scripts` — adicionar ao PATH se quiser usar diretamente.

### MCPs ativos no Claude Code

| MCP | Ferramentas principais |
|---|---|
| `mcp__claude_ai_Notion` | notion-fetch, notion-search, notion-create-pages, notion-update-page |
| `mcp__notion` | API-retrieve-a-database, API-post-page, API-post-search, API-patch-page |

### Referências de arquitetura

| Recurso | URL | Para quê |
|---|---|---|
| Creative Agency HQ | notion.com/templates/creative-agency-headquarters | Template de referência para agências criativas |
| Notion for Video Production | landmarklabs.co/blog/notion-for-video-production | Guia de boas práticas para produtoras audiovisuais |
| Agency Workflow Guide | notion.com/help/guides/how-agencies-manage-work | Padrão de Status + Views para agências |
| Relations & Rollups | notion.com/help/relations-and-rollups | Documentação oficial de relações entre bancos |

---

*Última atualização: 25/05/2026*
*Fonte: Arquitetura V2 Manus — 25 bancos + dados reais da Firma · Auditado via MCP*
