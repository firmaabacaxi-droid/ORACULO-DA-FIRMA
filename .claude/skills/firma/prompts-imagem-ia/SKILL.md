---
name: prompts-imagem-ia
description: "Engenharia de prompt para geração de imagem por IA (Midjourney, Flux, DALL·E, Stable Diffusion). Traduz conceito visual em linguagem precisa de fotografia — câmera, lente, luz, composição, color grading — para moodboard, storyboard, referência de cena e teaser. Enriquece a pré-produção com ativos visuais rápidos."
---

# Prompts de Imagem por IA

Traduz uma ideia visual em **prompt preciso** que gera imagem profissional na IA. Pensa como
fotógrafo: domina abertura, lente, esquema de luz, composição e color grading, e converte
isso na linguagem que os modelos entendem. Para a Firma, acelera **moodboard, storyboard,
referência de cena, conceito de teaser e key art**.

## Quando usar
- Montar moodboard/referência visual de um projeto antes de filmar.
- Esboçar storyboard ou conceito de cena rápido.
- Gerar key art / capa / thumbnail de campanha.

## Anatomia de um bom prompt
Estruture nesta ordem (do sujeito ao acabamento):
1. **Sujeito + ação** — quem/o quê, fazendo o quê.
2. **Enquadramento e lente** — close, plano médio, wide; 35mm, 85mm, teleobjetiva; ângulo.
3. **Composição** — regra dos terços, simetria, profundidade, primeiro plano/fundo.
4. **Luz** — golden hour, luz dura/suave, contraluz, esquema de estúdio, motivação da luz.
5. **Atmosfera e emoção** — tom, clima, narrativa da imagem.
6. **Estética / referência** — color grading, filme/película, estilo de fotógrafo/diretor.
7. **Especificações técnicas** — proporção (16:9, 2.39:1), qualidade, plataforma-alvo.

## Boas práticas
- **Linguagem de fotografia real** produz resultado profissional: "shot on 85mm f/1.4,
  shallow depth of field, soft window light" vence "foto bonita".
- **Negative prompt** para evitar artefatos e — importante — **estereótipos** na representação
  de pessoas e culturas (cruze com a skill `narrativa-documental`/inteligência cultural).
- **Consistência de série**: fixe lente, paleta e luz para um moodboard coeso.
- Adapte ao motor: Midjourney (descritivo + parâmetros), Flux/SD (estrutura e peso de termos).

## Não sobrepõe — complementa
- **Configuração real de câmera para filmar** → `photography-settings` (Antigravity): esta skill
  é para *gerar imagem de referência por IA*, aquela é para *ajustar a câmera no set*.
- **Linguagem de cena / decupagem** → `cinematic-script-writer-1.4.6`.
- **Pesquisa visual e estrutura** → `narrativa-documental`; biblioteca em `06-ESTUDOS-E-REFERENCIAS/`.
- **Edição de imagem existente** → ferramentas Adobe (MCP) quando disponível.

## Saída
Conjunto de prompts prontos (com variações) +, quando aplicável, as imagens geradas salvas como
referência em `cerebro/CEREBRO-ORACULO/06-ESTUDOS-E-REFERENCIAS/` ou `output/`.
