# SKILL — Captação
## Orquestradora do fluxo cliente → proposta
*Skill orquestradora — coordena: qualificação + briefing + pesquisa + Obsidian + NotebookLM + perfil DISC + proposta*

---

## Quando esta skill é ativada

- Chegou um cliente novo
- Precisa conduzir um briefing
- "Novo cliente: [nome], precisa de [projeto]"
- Primeiro atendimento ou qualificação de lead

Para **cliente já conhecido** que só precisa de proposta revisada → use `skills/proposta/SKILL.md` diretamente.

---

## Visão geral do fluxo

```
ENTRADA: cliente novo ou lead
    ↓
ETAPA 1 — Qualificação inicial      (vale o tempo?)
ETAPA 2 — Briefing completo         (10 perguntas, uma por vez)
ETAPA 3 — Pesquisa do cliente       (web + NotebookLM + Obsidian)
ETAPA 4 — Registro no Notion        (CRM + Clientes + Contatos)
ETAPA 5 — Perfil DISC               (adaptar tom da proposta)
ETAPA 6 — Geração da proposta       (→ skills/proposta/SKILL.md)
    ↓
SAÍDA: proposta gerada em output/propostas/
```

---

## ETAPA 1 — Qualificação inicial

Antes de investir tempo em briefing completo, avalie:

```
VERDE — avançar com briefing completo
✓ Projeto alinhado com o que a Firma faz
✓ Budget compatível (ou sem budget definido — potencial)
✓ Prazo viável (mínimo 2 semanas para projetos pequenos)
✓ Cliente com clareza mínima do que quer

AMARELO — avançar com cautela
⚠ Budget muito abaixo do mínimo (negociar escopo)
⚠ Prazo muito curto (avaliar se é possível)
⚠ Cliente sem clareza — precisará de mais tempo de briefing

VERMELHO — declinar ou redirecionar
✗ Projeto fora do escopo da Firma
✗ Budget incompatível mesmo reduzindo escopo
✗ Cliente com comportamento que indica conflito futuro
```

---

## ETAPA 2 — Briefing completo

Conduza **uma pergunta por vez**. Nunca mande lista de perguntas.

### Bloco 1 — O projeto

```
1. "O que vocês querem comunicar com esse vídeo?"
   (objetivo central — não o que querem filmar, mas o que querem causar)

2. "Quem vai assistir esse vídeo?"
   (público-alvo — define tom, linguagem, formato)

3. "Onde esse vídeo vai ser exibido?"
   (plataforma define: duração, formato, qualidade técnica)

4. "O que seria um resultado de sucesso para vocês?"
   (como o cliente vai medir se funcionou)
```

### Bloco 2 — Escopo e logística

```
5. "Vocês têm referências de vídeos que gostam? Me manda o link."
   (define estilo antes de orçar)

6. "Quantas locações vocês imaginam?"
   (1 locação vs 5 = impacto direto no orçamento)

7. "Vai ter entrevistas/depoimentos ou só imagens com narração?"
   (define equipe necessária)

8. "Qual a duração esperada do vídeo final?"
   (orientação — pode mudar, mas ajuda a precificar)
```

### Bloco 3 — Comercial

```
9. "Vocês têm uma data de entrega em mente?"
   (define viabilidade e urgência)

10. "Vocês têm um orçamento definido para o projeto?"
    (se sim: trabalhar dentro dele
     se não: apresentar 3 opções na proposta)
```

### Perguntas de resgate (quando o cliente é vago)

```
"O que vocês NÃO querem que esse vídeo pareça?" (define por exclusão)
"Tem algum concorrente que faz comunicação que vocês admiram?" (referência)
"Se tivesse que descrever em uma palavra o tom do vídeo, qual seria?" (direção criativa)
```

---

## ETAPA 3 — Pesquisa do cliente

Esta etapa transforma o briefing em inteligência antes de precificar e escrever.

### a) Pesquisa web

```
→ "[nome do cliente / organização]" — porte, projetos anteriores, notícias recentes
→ "[segmento] produção audiovisual" — benchmarks e linguagem do setor
```

Registrar o que encontrou. Informar ao usuário: "Pesquisei X e encontrei Y."

### b) Se houver gravação de reunião (áudio .m4a / .mp3 / .wav)

```
→ Chamar: ANTIGRAVITY\SKILLS\whisper-transcription\SKILL.md
→ Saída: transcrição em texto
→ Usar a transcrição como fonte no NotebookLM (etapa c) e na nota Obsidian (etapa d)
```

### c) NotebookLM — base de conhecimento do cliente

```
Se houver áudio transcrito, PDFs ou URLs relevantes do projeto:
→ Criar notebook no NotebookLM (ou adicionar a um existente)
→ Adicionar fontes: transcrição, relatórios, apresentações, sites
→ Salvar o notebook ID para incluir na nota Obsidian
→ Consultar o notebook: "Quais são os pontos-chave do projeto?"
   "Qual é a linguagem que o cliente usa?" "Quais dados e números são relevantes?"
→ Usar os insights na proposta (ETAPA 6)
```

### d) Criar nota de perfil do cliente no Obsidian

```
Caminho: cerebro/CEREBRO-ORACULO/04-REFERENCIAS/clientes/[slug-cliente]/[slug-cliente].md
```

Conteúdo mínimo da nota:

```markdown
# [Nome do Cliente] — Perfil

**Fonte:** [briefing / reunião / pesquisa web]
**Processado em:** [data]
**NotebookLM:** [notebook ID se houver]

## O projeto
[Tipo, objetivo, protagonista, linguagem]

## Pessoas
| Nome | Papel | Contato |
|------|-------|---------|
| [Nome] | [Cargo] | [⭐ ponto focal] |

## Decisões tomadas
- [O que foi acordado]

## Próximos passos
- [ ] Gerar proposta
```

---

## ETAPA 4 — Registro no Notion

Salvar no Notion **antes de gerar proposta** (pedir autorização ao usuário se necessário):

**Banco: Contatos**
- Nome, cargo, e-mail, telefone
- Como chegou (indicação, Instagram, etc.)

**Banco: Clientes**
- Nome da empresa / organização
- Segmento
- Relação com a Firma (novo, recorrente, parceiro)

**Banco: CRM**
- Nome do deal (ex: "LabLivre — Documentário Brasil Participativo")
- Status: Qualificado
- Valor estimado (se souber)
- Próxima ação: Gerar proposta

---

## ETAPA 5 — Perfil DISC

Com base no comportamento do cliente no briefing, identificar o perfil:

```
→ Ativar: C:\Users\User\Documents\ANTIGRAVITY\SKILLS\personality-profiler\SKILL.md
→ Objetivo: classificar o cliente (D/I/S/C) para calibrar tom da proposta
```

**O perfil DISC informa TOM e FORMALIDADE — não altera estrutura da proposta:**

| Perfil | Sinal | Tom da proposta |
|--------|-------|-----------------|
| **D** — Dominância | Direto, fala em resultados e prazos | Conciso, resultado em primeiro lugar |
| **I** — Influência | Empolgado, fala em impacto e visibilidade | Animado, cases e impacto emocional |
| **S** — Estabilidade | Detalhista, pergunta muito, preocupado com processo | Passo a passo, cronograma claro |
| **C** — Conformidade | Quer números, cético, faz perguntas técnicas | Dados, especificações, termos precisos |

Clientes institucionais (fundações, governo, universidades) → sempre tom mais formal independente do DISC individual.

---

## ETAPA 6 — Geração da proposta

Ao confirmar com Lipe que briefing + pesquisa estão completos:

```
→ Ativar: skills/proposta/SKILL.md
→ Passar os seguintes dados consolidados:
   - Cliente e escopo (do briefing)
   - Budget e prazo (do briefing)
   - Perfil DISC identificado (ETAPA 5)
   - Insights do NotebookLM (ETAPA 3c, se houver)
   - Caminho da nota Obsidian criada (ETAPA 3d)
```

Sinalizar antes de gerar:

> "Tenho tudo que preciso para montar a proposta.
> Quer que eu gere agora ou você precisa confirmar alguma informação com o cliente antes?"

---

## Nota para implementação futura (chatbot)

Este fluxo foi desenhado para funcionar como chatbot:
- Uma pergunta por vez (ETAPA 2)
- Qualificação VERDE/AMARELO/VERMELHO como filtro de entrada (ETAPA 1)
- Perguntas de resgate mapeadas por situação de ambiguidade
- Cada etapa tem entrada e saída definidas — pode ser implementada como nó de workflow
