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

**Princípio fundamental:** A proposta é um documento de formalização — não uma peça de vendas. O processo de venda acontece na conversa presencial, com portfólio e atendimento. A proposta confirma o que foi acordado, com clareza e profissionalismo.

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

**Consulte `docs/TABELA_PRECOS.md` para todos os valores de referência.**

### Estrutura de custos

| Categoria | O que incluir |
|---|---|
| Equipe | Diárias: Lipe (R$ 1.800/dia), Jaya (R$ 1.200/dia), freelancers conforme `TABELA_PRECOS.md` |
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

35% sobre custo direto total. Verificar antes de fechar o orçamento.

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
   Nome do projeto + cliente + data + versão

ENTENDIMENTO DO PROJETO
   O que entendemos que será feito
   (use as palavras do cliente — mostra que ouviu)

NOSSA PROPOSTA
   O que vamos entregar (escopo detalhado)
   O que NÃO está incluído (evita conflito posterior)

CRONOGRAMA
   Etapas e duração prevista por fase
   Prazo de feedback do cliente por etapa

INVESTIMENTO
   Tabela de itens + subtotal + NF + total
   Condições de pagamento
   Validade da proposta

PRÓXIMOS PASSOS
   Um CTA único e claro
```

**Nível de detalhe:** ajustar conforme o cliente. Clientes institucionais (licitação, fundação, contratos formais) → mais detalhado. Clientes diretos com relação próxima → pode ser mais conciso.

---

## ETAPA 5 — Escrever conteúdo

### Regras de escrita

A proposta é um documento de formalização. Meta: **clareza, completude e zero ambiguidade**.

- Abra com o **entendimento do projeto** — o que foi acordado — não com problema/solução dramatizado
- Escopo claro: o que inclui **e** o que não inclui
- Verbos ativos: entregamos, captamos, editamos, garantimos
- Evitar voz passiva: "será entregue", "foi realizado"
- Parágrafos curtos — máximo 4 linhas
- Fale com "você" — nunca "o cliente" ou "a empresa"
- Sem linguagem corporativa: sinergia, robusto, disruptivo, holístico
- Sem floreio de vendas: não ancore preço de mercado, não dramatize o problema do cliente, não use gatilhos de urgência artificiais

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
[ ] Orçamento calculado com NF e margem mínima 35%

AO ESCREVER
[ ] Abre com entendimento do projeto (não com problema/solução)
[ ] Escopo claro: o que inclui E o que não inclui
[ ] Cronograma com fases e durações reais
[ ] Condições explícitas (pagamento, revisões, validade)
[ ] CTA único ao final

ANTES DE GERAR
[ ] Português revisado — ortografia, concordância, pontuação
[ ] Números conferidos (valores, datas, quantidades)
[ ] Humanizador aplicado

AO GERAR
[ ] Usar MODELO_ORCAMENTO.docx como base (nunca Document() em branco)
[ ] Arquivo salvo em output/propostas/ com nome correto
[ ] Abrir o .docx e confirmar que logo e assinatura aparecem
```
