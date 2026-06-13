---
name: primal-branding
description: "Aplica o framework de Primal Branding (Patrick Hanlon) para construir marcas com coesão emocional. Define os 7 ativos de crença de uma marca: história de origem, credo, ícones, rituais, pagãos, palavras sagradas e líder. Funciona para a Firma e para marcas de clientes."
---

# Primal Branding

Marcas que as pessoas amam não são só bonitas — elas têm um **sistema de crença**. Primal Branding é o framework do Patrick Hanlon (livro *Primalbranding*, 2006) que identifica os 7 elementos que criam esse sistema. Usado por Apple, Nike, Starbucks.

Este skill aplica esses 7 elementos à Firma Abacaxi e a qualquer projeto ou cliente que precise de uma marca com alma.

## Os 7 Ativos de Crença

### 1. História de Criação (Creation Story)
**O que é:** De onde a marca veio. O momento fundador, o "por que isso existe".  
**Pergunta:** Qual é a história de origem da Firma? O que levou o Filipe a criar uma produtora com esse nome?  
**Exemplo Apple:** "Dois caras numa garagem queriam mudar o mundo com computadores pessoais."  
**Para a Firma:** Construir em 3-5 frases. Deve ser verdadeira, específica, evocativa.

### 2. Credo (Creed)
**O que é:** O que a marca acredita. O manifesto comprimido em uma ou duas frases.  
**Pergunta:** No que a Firma Abacaxi acredita que guia todas as decisões criativas?  
**Exemplo Nike:** "Você tem um corpo. Você é um atleta."  
**Para a Firma:** Uma frase que a equipe repetiria sem vergonha.

### 3. Ícones (Icons)
**O que é:** Elementos visuais, sonoros ou sensoriais imediatamente reconhecíveis da marca.  
**Pergunta:** O que você vê, ouve ou sente que diz "isso é a Firma"?  
**Exemplo Starbucks:** A sereia. A cor verde. O barulho da máquina de café.  
**Para a Firma:** Logo, paleta, tipografia, som dos projetos, estética recorrente.

### 4. Rituais (Rituals)
**O que é:** Comportamentos que criam pertencimento e diferenciação.  
**Pergunta:** O que a Firma faz de um jeito que é só dela?  
**Exemplo Apple:** Unboxing. Keynotes como teatro.  
**Para a Firma:** Forma de briefing, entrega de projetos, celebração de aprovações, nomenclatura de arquivos.

### 5. Pagãos (Pagans)
**O que é:** O que a marca claramente não é. A definição pelo oposto cria identidade.  
**Pergunta:** Quem ou o que a Firma definitivamente não é?  
**Exemplo Harley-Davidson:** Não são motoristas de carro suburbanos. Não são domesticados.  
**Para a Firma:** Não somos [x tipo de produtora]. Não fazemos [y tipo de conteúdo].

### 6. Palavras Sagradas (Sacred Words)
**O que é:** Linguagem exclusiva que cria comunidade entre quem pertence à marca.  
**Pergunta:** Quais são os termos, expressões e jargões que só quem é da Firma usa?  
**Exemplo Apple:** "Mac", "iOS", "Think Different", "Just one more thing."  
**Para a Firma:** Palavras do dia a dia interno, nomes dos processos, formas de se referir aos projetos.

### 7. Líder (Leader)
**O que é:** A pessoa ou personagem que incorpora os valores da marca.  
**Pergunta:** Quem é a voz e o rosto da Firma? Quem toma as decisões estéticas finais?  
**Exemplo Tesla:** Elon como personagem (independente do produto).  
**Para a Firma:** Filipe como diretor criativo — qual é o ponto de vista estético que ele representa?

---

## Como usar este skill

### Para a Firma Abacaxi
Invocar sem argumentos:
```
/primal-branding
```
→ O Oráculo vai conduzir uma sessão de perguntas para preencher os 7 ativos.

### Para um cliente
```
/primal-branding [nome do cliente ou projeto]
```
→ Adapta as perguntas para o contexto do cliente, gerando um documento de posicionamento.

---

## Saída esperada

```
# Primal Branding — [Nome da Marca]
Data: [data]
Versão: [1.0]

## 1. História de Criação
[3-5 frases sobre a origem]

## 2. Credo
"[Uma frase. Máximo duas.]"

## 3. Ícones
- Visual: [elementos]
- Sonoro: [elementos, se houver]
- Tátil/comportamental: [elementos]

## 4. Rituais
- [Ritual 1 — descrição breve]
- [Ritual 2]
- [Ritual 3]

## 5. Pagãos
- Não somos [x]
- Não fazemos [y]
- Nos distanciamos de [z]

## 6. Palavras Sagradas
- [palavra/expressão] — [o que significa internamente]
- [palavra/expressão] — [...]

## 7. Líder
[Nome, ponto de vista, o que essa pessoa representa para a marca]

---

## Implicações estratégicas
[Como esses 7 ativos devem guiar decisões de comunicação, design e posicionamento]
```

---

## Integração com outros skills

- Usar `/firma-branding` para traduzir o primal branding em identidade visual
- Usar `/moodboard` para criar referências visuais alinhadas com o credo e ícones
- Usar `/marketing-copy-knowledge` ou `brand-voice` (ECC) para aplicar as palavras sagradas no copy
- Documentar os 7 ativos no Cérebro: `cerebro/CEREBRO-ORACULO/00-EMPRESA/identidade-marca.md`
