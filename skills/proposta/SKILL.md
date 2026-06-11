# SKILL — Proposta
## Geração de proposta e orçamento completos
*Skill orquestradora — coordena: briefing + cálculo + escrita + documento*

---

## Quando esta skill é ativada

- "Gera uma proposta para [cliente]"
- "Preciso orçar um projeto"
- "Monta um documento comercial"

---

## Visão geral do processo

```
ENTRADA: briefing (completo ou parcial)
    ↓
ETAPA 1 — Verificar briefing
ETAPA 2 — Pesquisa de mercado
ETAPA 3 — Calcular orçamento
ETAPA 4 — Estruturar proposta
ETAPA 5 — Escrever conteúdo
ETAPA 6 — Revisar português
ETAPA 7 — Humanizar (→ skills/humanizador/SKILL.md)
ETAPA 8 — Gerar documento Word (→ skills/proposta/blocos_xml.md)
    ↓
SAÍDA: output/propostas/NomeCliente_proposta_v1.docx
```

## Skills do Antigravity — quando acionar

| Situação | Skill |
|---|---|
| Apresentar preço com mais impacto | `skills/antigravity/marketing-psychology/SKILL.md` — Marketing de Premissas, ancoragem por ROI ("Quantos clientes esse vídeo precisa trazer para pagar a si mesmo?"), prova social |
| Verificar margem, simular cenários de desconto | `skills/antigravity/financial-calculator-pro/SKILL.md` — markup, margem líquida pós-NF |
| Cliente em objeção de preço | `skills/antigravity/negotiation-voss/SKILL.md` — accusation audit, calibrated questions |

---

**Princípio fundamental:** A proposta é um documento de formalização — não uma peça de vendas. O processo de venda acontece na conversa presencial, com portfólio e atendimento. A proposta confirma o que foi acordado, com clareza e profissionalismo.

Mas formalização não significa frieza. A proposta precisa mostrar que você entendeu o projeto, com linguagem humana e calorosa. O cliente precisa reconhecer o próprio projeto nas palavras que leu.

---

## ETAPA 1 — Verificar briefing

Antes de qualquer coisa, confirme que tem:

```
✓ Nome do cliente / empresa
✓ Objetivo do projeto (o que será entregue)
✓ Formato / tipo de produção
✓ Duração estimada ou escopo
✓ Locações (quantas, quais cidades)
✓ Equipe necessária (só Lipe e Jaya ou freelancers?)
✓ Prazo de entrega
✓ Budget (pode estar definido ou em aberto)
```

Se faltar informação crítica → pergunte antes de continuar.
Se briefing estiver incompleto mas suficiente → sinalize o que está faltando e prossiga.

---

## ETAPA 2 — Pesquisa de mercado

**Pesquise antes de precificar quando o cliente for desconhecido.**

```
→ "[nome do cliente]" — entender porte, segmento, histórico
→ "[tipo de projeto] produção audiovisual Brasília [ano]" — referência de preço de mercado
```

Registre o que encontrou. Informe ao usuário: "Pesquisei X e encontrei Y."

Se o cliente já é conhecido (ex: proposta decorrente de reunião anterior), pesquisa pode ser pulada.

---

## ETAPA 3 — Calcular orçamento

**Consulte `docs/TABELA_PRECOS.md` para todos os valores de referência.** (140+ orçamentos históricos analisados, corrigidos por Lipe em Mai 2026)

### Estrutura de custos

| Categoria | O que incluir |
|---|---|
| Equipe | Diárias: Lipe (R$ 2.000/dia), Jaya (R$ 1.500/dia), freelancers conforme `TABELA_PRECOS.md` |
| Equipamento | Incluso na diária quando Lipe e Jaya forem juntos — declarar explicitamente |
| Locação | Espaços, permissões |
| Transporte | R$ 200–300/dia em Brasília |
| Alimentação | R$ 80–120/pessoa/dia em set |
| Pós-produção | Edição, color, som, trilha — ver `TABELA_PRECOS.md` |
| NF | 7,28% |

### Regra do NF

O NF **sempre** está incluído no total apresentado ao cliente. Quando houver teto de budget, calcular de trás pra frente:

```
Base de serviços = Total ÷ 1,0728
NF = Total − Base
```

Apresentar sempre três linhas na tabela: **Subtotal | NF 7,28% | TOTAL**

### Margem mínima

20% sobre custo direto total. Verificar antes de fechar o orçamento.

### Se o budget for desconhecido

Apresentar 3 opções apenas quando o cliente não tiver nenhum número em mente:

```
BÁSICO      → escopo reduzido, entrega essencial
RECOMENDADO → escopo completo ← destacar
COMPLETO    → escopo expandido com extras
```

Se o budget já foi discutido ou há um teto aprovado, trabalhar dentro dele — sem opções múltiplas.

---

## ETAPA 4 — Estruturar proposta

Use esta estrutura padrão. Adapte seções que não se aplicam ao projeto.

```
CAPA
   Título: tipo de documento (ex: "Proposta de Produção Audiovisual")
   Subtítulo: nome do projeto e cliente

ABERTURA NARRATIVA (2 parágrafos antes das seções)
   Parágrafo 1: contextualize o cliente e o projeto — mostre que você entendeu
   Parágrafo 2: confirme o engajamento — "É essa história que nos convidaram para contar."
   → Nunca pule a abertura. É o que diferencia uma proposta de um orçamento.

ENTENDIMENTO DO PROJETO
   O que é o projeto, quem é o protagonista, qual é a narrativa
   Use as palavras do cliente — mostra que ouviu

NOSSA PROPOSTA
   Parágrafo de intro: o que será entregue em uma frase
   "O que está incluído:" → lista de itens
   "O que não está incluído:" → lista de exclusões explícitas (evita conflito posterior)
   "Expansão de escopo:" → quando o projeto tem potencial de crescer (série, versões extras)
                           formalizar que qualquer entrega adicional será em aditivo contratual

CRONOGRAMA
   Etapas e duração por fase (bullets com semanas)
   Prazo de feedback do cliente por etapa

INVESTIMENTO
   Tabela de itens + subtotal + NF + total
   Footnote: o que está incluído na diária (equipe + equipamentos)
   Condições de pagamento e validade

FECHAMENTO CALOROSO (parágrafo antes da data)
   → Sempre incluir. Ex: "Ficamos à disposição para dúvidas e ajustes.
     Será um prazer contribuir com esse projeto."
   → É o único momento de calor explícito no documento — não exagerar, mas nunca omitir.

DATA + ASSINATURA
   "Brasília, [data]."
   Imagem da assinatura (rId6) + FILIPE DUQUE + CNPJ + contatos
```

**Nível de detalhe:** ajustar conforme o cliente. Clientes institucionais (licitação, fundação, contratos formais) → mais detalhado. Clientes diretos com relação próxima → pode ser mais conciso. A abertura narrativa e o fechamento caloroso são sempre obrigatórios.

---

## ETAPA 5 — Escrever conteúdo

### Regras de escrita

A proposta formaliza e apresenta. Meta: **clareza, completude, linguagem humana**.

**Abertura narrativa (obrigatória):**
- 1–2 parágrafos antes das seções, sem título de seção
- Mostre que você entendeu o contexto do cliente, não só o escopo técnico
- Confirme engajamento genuíno: "É essa história que nos convidaram para contar."
- Evite: "Conforme conversamos, segue a proposta..." — soa como protocolo burocrático

**Corpo das seções:**
- Abra "Entendimento" com o projeto em palavras que o cliente reconhece como suas
- Em "Nossa Proposta": liste o que inclui E o que não inclui — zero ambiguidade
- Quando houver potencial de crescimento: inclua "Expansão de escopo:" com nota de aditivo
- Verbos ativos: entregamos, captamos, editamos, garantimos
- Parágrafos curtos — máximo 4 linhas
- Fale com "você" — nunca "o cliente" ou "a empresa"
- Sem linguagem corporativa: sinergia, robusto, disruptivo, holístico
- Sem floreio de vendas: não ancore preço de mercado, não dramatize o problema

**Fechamento (obrigatório):**
- Parágrafo caloroso antes da data — "Ficamos à disposição... Será um prazer contribuir."
- Não exagerar, mas nunca omitir. É o que humaniza o documento.

### Termos e condições (sempre incluir)

- Forma de pagamento: 50% assinatura + 50% entrega (padrão projetos grandes); 100% entrega (projetos simples)
- Rodadas de revisão: até 2 incluídas; a partir da 3ª cobrar por rodada
- Validade: 15 dias (30 dias para clientes institucionais)
- Entrega de arquivos: Google Drive ou nuvem do cliente

---

## ETAPA 6 — Revisar português

**Antes de gerar o documento**, revisar todo o texto:

```
[ ] Acentos corretos (não, são, também, é, está, etc.)
[ ] Concordância verbal e nominal
[ ] Pontuação — vírgula antes de "mas", ponto final em todas as frases
[ ] Nomes próprios escritos corretamente (nome do cliente, da empresa)
[ ] Valores numéricos conferidos (R$, datas, quantidades)
[ ] Nenhuma frase cortada ou incompleta
```

Erros de português em proposta são inadmissíveis — revisar com atenção antes de gerar.

---

## ETAPA 7 — Humanizar

Aplicar **skills/humanizador/SKILL.md** com foco em:

- Remover palavras proibidas
- Verificar voz ativa
- Garantir que o texto soa como Lipe escreveria — profissional e direto, sem frieza burocrática nem exagero de calor

Nota: em propostas formais (licitação, fundação), manter tom mais neutro e técnico é adequado. O humanizador retira o corporativês, não transforma a proposta em conversa de WhatsApp.

---

## ETAPA 8 — Gerar documento Word

**IMPORTANTE:** Sempre usar o template `skills/proposta/assets/MODELO_ORCAMENTO.docx` como base. Nunca criar um `Document()` em branco — o template já contém o logo da Firma no cabeçalho e a assinatura manuscrita do Lipe no rodapé.

Consultar **skills/proposta/blocos_xml.md** para a estrutura técnica completa (método de geração via zip + blocos XML disponíveis).

Salvar em: `output/propostas/NomeCliente_proposta_v1.docx`

Ao finalizar, informar:
> "Proposta gerada em output/propostas/[arquivo].
> Baseei o orçamento em [X]. Quer revisar algum ponto antes de enviar?"

---

## Checklist final

```
ANTES DE ESCREVER
[ ] Briefing completo ou lacunas sinalizadas
[ ] Budget definido — trabalhar dentro do teto ou com opções (se desconhecido)
[ ] Orçamento calculado com NF e margem mínima 20%

AO ESCREVER
[ ] Abertura narrativa (2 parágrafos, antes das seções, sem título)
[ ] Entendimento do projeto usa palavras do cliente
[ ] Escopo: o que inclui E o que não inclui (ambos obrigatórios)
[ ] Expansão de escopo: incluir quando o projeto tem potencial de crescer
[ ] Cronograma com fases, durações e prazo de feedback do cliente
[ ] Condições explícitas (pagamento, validade)
[ ] Fechamento caloroso antes da data

ANTES DE GERAR
[ ] Português revisado — ortografia, concordância, pontuação
[ ] Números conferidos (valores, datas, quantidades)
[ ] Humanizador aplicado

AO GERAR
[ ] Usar MODELO_ORCAMENTO.docx como base (nunca Document() em branco)
[ ] Arquivo salvo em output/propostas/ com nome correto
[ ] Abrir o .docx e confirmar que logo e assinatura aparecem
```

## Procedimento de Sincronização Automatizada (Oráculo Sync)

Para garantir integridade absoluta em todas as frentes (Notion, Cérebro e Google Drive), o Oráculo possui uma ferramenta de sincronização unificada em `scripts/sync_proposal.py`. Ela suporta três modos de operação:

### 1. Modo Proposta (`--mode proposal`)
Use este modo quando houver atualizações em valores, versões ou itens individuais do orçamento de uma proposta.

**Funcionamento:**
- Lê os dados antigos diretamente da API do Notion (versão e total).
- Faz as substituições correspondentes no Cérebro (briefing, nota do projeto em `wiki/projects/`, `wiki/hot.md` e `wiki/index.md`).
- Atualiza a versão e o valor total na página de Propostas no Notion.
- Atualiza itens de orçamento individuais no Notion e nas tabelas markdown do Cérebro.
- Copia a proposta (.docx e .pdf) para a pasta correspondente no Google Drive (se fornecidos).

**Sintaxe de Uso Geral (com atualização genérica de orçamento):**
```bash
python scripts/sync_proposal.py \
  --mode proposal \
  --project-name "<NOME_DO_PROJETO>" \
  --version <VERSAO> \
  --total-val <VALOR_TOTAL> \
  --items-json '{"Nome do Item 1": {"unit": 1000, "qty": 5, "total": 5000}, "NF 7,28%%": {"total": 364}}' \
  --docx-src "output/propostas/NomeCliente_proposta_v<VERSAO>.docx"
```
*Dica:* O script resolve automaticamente o `proposal-id` e a pasta do Google Drive a partir do `--project-name`. Se desejar, você pode omitir `--gdrive-dest-dir` e `--proposal-id` e deixar o Oráculo localizá-los. O `%` no JSON deve ser escapado como `%%` no console/PowerShell.

**Exemplo Prático (Retrocompatibilidade Brasil Participativo v7):**
```bash
python scripts/sync_proposal.py \
  --mode proposal \
  --project-name "Brasil-Participativo" \
  --version 7 \
  --total-val 66117 \
  --nf-val 4487 \
  --video-total 15000 \
  --video-unit 1500 \
  --docx-src "output/propostas/BrasilParticipativo_proposta_v7.docx"
```

---

### 2. Modo Projeto (`--mode project`)
Use este modo para atualizar o status e o valor contratado de um projeto no Notion e no Cérebro de forma síncrona.

**Funcionamento:**
- Atualiza o campo `Status` e `Valor contratado` na página do projeto no Notion.
- Atualiza o campo `status` e `value` na frontmatter da nota do projeto no Cérebro (`wiki/projects/{projeto}.md`).
- Atualiza a linha de status no arquivo de briefing em `04-PROJETOS-ATIVOS`.

**Sintaxe de Uso:**
```bash
python scripts/sync_proposal.py \
  --mode project \
  --project-name "<NOME_DO_PROJETO>" \
  --status "<Novo Status>" \
  --total-val <Valor Contratado>
```
*Exemplo prático:*
```bash
python scripts/sync_proposal.py \
  --mode project \
  --project-name "Brasil-Participativo" \
  --status "Pré-produção" \
  --total-val 66117
```

---

### 3. Modo Roteiro (`--mode script`)
Use este modo para copiar novos roteiros físicos (.docx e .pdf) para a pasta organizada do projeto no Google Drive.

**Funcionamento:**
- Localiza a pasta do projeto no Drive.
- Procura por subdiretórios que contenham "ROTEIRO", "BRIEFING" ou "02". Se não existirem, cria a pasta `02_BRIEFINGS` automaticamente.
- Copia o arquivo DOCX e o PDF (se disponível) para a subpasta finalizada.

**Sintaxe de Uso:**
```bash
python scripts/sync_proposal.py \
  --mode script \
  --project-name "<NOME_DO_PROJETO>" \
  --docx-src "output/roteiros/Nome_Roteiro.docx"
```
*Exemplo prático:*
```bash
python scripts/sync_proposal.py \
  --mode script \
  --project-name "Brasil-Participativo" \
  --docx-src "output/roteiros/Roteiro_Brasil_Participativo_v1.docx"
```

### 4. Verificar o Alinhamento (Propostas)
- Execute `python scratch/check_notion_sum.py` para garantir que a soma dos itens de orçamento no Notion bate com o total consolidado.
- Verifique se as notas markdown do cérebro refletem os mesmos totais nas tabelas e no frontmatter.
