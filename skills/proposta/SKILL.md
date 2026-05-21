# SKILL — Proposta
## Geração de proposta e orçamento completos
*Skill orquestradora — coordena: briefing + pesquisa + cálculo + escrita + documento*

---

## Quando esta skill é ativada

- "Gera uma proposta para [cliente]"
- "Preciso orçar um projeto"
- "Monta uma apresentação comercial"

---

## Visão geral do processo

```
ENTRADA: briefing (completo ou parcial)
    ↓
ETAPA 1 — Verificar briefing
ETAPA 2 — Pesquisa de mercado
ETAPA 3 — Perfil DISC do cliente
ETAPA 4 — Calcular orçamento
ETAPA 5 — Estruturar proposta (PAS + AIDA)
ETAPA 6 — Escrever conteúdo
ETAPA 7 — Humanizar (→ skills/humanizador/SKILL.md)
ETAPA 8 — Gerar documento Word (→ skills/proposta/blocos_xml.md)
    ↓
SAÍDA: output/propostas/NomeCliente_proposta_v1.docx
```

---

## ETAPA 1 — Verificar briefing

Antes de qualquer coisa, confirme que tem:

```
✓ Nome do cliente / empresa
✓ Objetivo do vídeo (o que quer causar)
✓ Público que vai assistir
✓ Formato / plataforma de exibição
✓ Duração estimada
✓ Locações (quantas, quais)
✓ Equipe especial necessária (entrevistas? atores?)
✓ Prazo de entrega
✓ Budget (pode estar em aberto)
```

Se faltar informação crítica → pergunte ao usuário antes de continuar.
Se briefing estiver incompleto mas suficiente → sinalize o que está faltando e prossiga.

---

## ETAPA 2 — Pesquisa de mercado

**Sempre pesquise antes de precificar.** Use web search para:

```
Pesquisas obrigatórias:
→ "[tipo de projeto] produção audiovisual preço Brasília [ano]"
→ "[nome do cliente]" (entender quem é, porte, segmento)
→ Referências visuais mencionadas no briefing

Pesquisas opcionais (se o cliente for desconhecido):
→ Concorrentes do cliente (entender o mercado dele)
→ Cases similares da Firma ou do mercado
```

Registre o que encontrou. Informe ao usuário: "Pesquisei X e encontrei Y."

---

## ETAPA 3 — Perfil DISC do cliente

Analise como o cliente se comunicou no briefing e classifique:

```
D — DOMINÂNCIA (executivos, CEOs, tomadores rápidos)
Sinais: objetivo, fala em resultados e prazos, impaciente
Proposta: 1-2 páginas. Resultado, prazo, preço — nessa ordem.
Tom: direto, sem enrolação.

I — INFLUÊNCIA (marketing, comunicação, criativos)
Sinais: empolgado, fala em impacto e visibilidade, usa emojis
Proposta: visualmente atraente, cases e referências, impacto emocional.
Tom: animado, use "imagina seu público sentindo..."

S — ESTABILIDADE (RH, administração, processos)
Sinais: detalhista, preocupado com processo e equipe, pergunta muito
Proposta: passo a passo detalhado, cronograma completo, suporte claro.
Tom: seguro, paciente, "em cada etapa você vai acompanhar..."

C — CONFORMIDADE (financeiro, jurídico, técnicos)
Sinais: pergunta especificações, quer números, cético
Proposta: dados, especificações técnicas, termos claros.
Tom: factual, referências, sem emoção excessiva.
```

Use o perfil para adaptar tom e estrutura nas próximas etapas.

---

## ETAPA 4 — Calcular orçamento

### Estrutura de custos

| Categoria | O que incluir |
|---|---|
| Equipe | Diárias: Lipe (R$1.800/dia), Jaya (R$1.200/dia), freelancers conforme necessário |
| Equipamento | Depreciação do próprio + aluguel externo se necessário |
| Locação | Espaços, ambientação, permissões |
| Transporte | Combustível, pedágio, estacionamento (R$150–300/dia em Brasília) |
| Alimentação | R$60–80/pessoa/dia em set |
| Pós-produção | Edição (Lipe), colorista externo, masterização de som, trilha, motion |
| Impostos | ISS ~5% sobre o valor do serviço |
| Margem | Mínimo 35% sobre custo total |

### Fórmula

```
Custo direto total
+ Custo indireto (~15% overhead)
+ Margem (35% mínimo)
= Preço mínimo aceitável

Preço ideal = Preço mínimo × fator de valor percebido
(para clientes com alto valor percebido, pode ser 1.3–1.5x)
```

### Se não souber o budget → apresente 3 opções

```
BÁSICO      → escopo reduzido, entrega essencial
RECOMENDADO → escopo completo (o que você quer vender) ← destaque
COMPLETO    → escopo expandido com extras
```

Ancoragem: sempre mencione o valor de mercado antes do seu preço.
Exemplo: "Produções equivalentes em agências de Brasília custam entre R$25k–R$40k. Nossa proposta: R$14.000."

### Política de alterações (incluir sempre)
- Até 2 rodadas de revisão: incluídas
- A partir da 3ª: R$[definir por projeto] por rodada
- Deixar claro no documento

---

## ETAPA 5 — Estruturar proposta

Use esta estrutura padrão:

```
1. CAPA
   Nome do projeto + nome do cliente + data + versão

2. ENTENDIMENTO DO PROJETO
   O que entendemos que o cliente precisa
   (use as palavras dele — mostra que ouviu)

3. NOSSA PROPOSTA
   Como vamos resolver o problema
   O que vamos entregar (escopo detalhado)
   O que NÃO está incluído (evita conflito)

4. CRONOGRAMA
   Etapas e datas previstas
   Prazo de feedback do cliente por etapa

5. INVESTIMENTO
   Tabela de itens (se perfil C ou S)
   Ou apenas valor total (se perfil D ou I)
   Formas de pagamento (recomendado: 50% entrada + 50% entrega)
   Validade da proposta: 15 dias

6. TERMOS E CONDIÇÕES
   Política de alterações
   Direitos autorais (footage fica com a Firma ou cliente?)
   Cancelamento

7. PRÓXIMOS PASSOS
   Um CTA único e claro
   Ex: "Responda confirmando e reservamos sua data."
```

---

## ETAPA 6 — Escrever conteúdo

### Framework PAS para abertura

```
PROBLEMA: identifique a dor específica do cliente
(use o que ele disse no briefing)

AGITAÇÃO: o que acontece se isso não for resolvido?
(perda de oportunidade, concorrentes na frente)

SOLUÇÃO: a Firma como resposta natural
(não como "empresa", mas como parceiros)
```

### Framework AIDA para o corpo

```
ATENÇÃO: abra com o problema — nunca com "Apresentamos a Firma Abacaxi"
INTERESSE: mostre que entendeu a situação específica deles
DESEJO: transforme características em benefícios emocionais
AÇÃO: CTA único e claro
```

### Regras de escrita

- Fale com "você" — nunca "o cliente" ou "a empresa"
- Verbos ativos: entregamos, criamos, garantimos, filmamos
- Nunca: "será entregue", "foi realizado"
- Mencione o diferencial da Firma quando relevante (documentários indígenas, projetos sociais — moat real)

---

## ETAPA 7 — Humanizar

Ao finalizar o texto, aplique **skills/humanizador/SKILL.md**:

- Remover todas as palavras proibidas
- Verificar voz ativa
- Teste de leitura em voz alta
- Adaptar tom ao perfil DISC identificado

---

## ETAPA 8 — Gerar documento Word

Use **skills/proposta/blocos_xml.md** como referência técnica.

Salve em: `output/propostas/NomeCliente_proposta_v1.docx`

Ao finalizar, informe:
> "Proposta gerada em output/propostas/[arquivo].
> Baseei o orçamento em [X]. Quer revisar algum ponto antes de enviar?"

---

## Checklist final

```
ANTES DE ESCREVER
[ ] Briefing completo ou sinalizadas as lacunas
[ ] Pesquisa de mercado realizada
[ ] Perfil DISC identificado
[ ] Orçamento calculado com margem mínima 35%

AO ESCREVER
[ ] Abre com problema do cliente, não com a Firma
[ ] Escopo claro: o que inclui E o que não inclui
[ ] 3 opções de preço (se sem budget definido)
[ ] Ancoragem de mercado incluída
[ ] Cronograma com datas reais
[ ] Política de alterações explícita
[ ] CTA único com prazo de validade (15 dias)

ANTES DE ENTREGAR
[ ] Humanizador aplicado
[ ] Leu em voz alta — soa como Lipe?
[ ] Números revisados (valor, prazo, escopo)
[ ] Arquivo salvo em output/propostas/
```

---

## Argumentos para objeções comuns

```
"Tá caro"
→ "Como você imagina que a gente mantém a qualidade reduzindo o investimento?"
→ Ofereça escopo menor, não desconto direto

"Preciso de desconto"
→ "Posso trabalhar com um prazo mais folgado se isso ajudar vocês financeiramente."
→ Troque concessão por concessão — nunca desconto sem contrapartida

"Vou pensar"
→ "Faz sentido. O que faria você se sentir mais confortável para decidir?"
→ Rotulagem: "Parece que ainda tem alguma dúvida sobre [X]."

"Tem alguém mais barato"
→ "Imagino que sim. O que te fez considerar a Firma além do preço?"
→ Ancore no valor, não no preço
```
