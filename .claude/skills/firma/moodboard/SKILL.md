---
name: moodboard
description: "Cria moodboards visuais para projetos audiovisuais, campanhas e identidades de marca. Gera paleta de referências, prompts para imagens, descrições de atmosfera e diretrizes de linguagem visual. Usa prompts-imagem-ia, fal.ai (quando ativo) e Adobe Creative MCP."
---

# Moodboard

Transforma um briefing em um universo visual coerente. O moodboard não é só estética — é uma ferramenta de alinhamento: cliente, diretor e equipe olham para a mesma referência e falam a mesma língua antes de ligar qualquer câmera.

## Quando usar
- No início de qualquer projeto audiovisual ou de comunicação visual.
- Para alinhar expectativas estéticas com o cliente antes da produção.
- Para construir a identidade visual de uma marca a partir do zero.
- Para explorar direções criativas alternativas antes de decidir.

## Estrutura de um moodboard

### Elementos que todo moodboard deve ter:

**1. Mood (atmosfera)**
Uma frase que captura o sentimento geral do projeto.  
Exemplo: *"Memória afetiva, quente como foto polaroid, silêncio que fala."*

**2. Paleta de cores**
5-7 cores com HEX. Organizar em: base / destaque / acento / neutros.

**3. Referências visuais (6-12 imagens)**
Descrever cada imagem com precisão suficiente para:
- Gerar via IA (`/prompts-imagem-ia` ou fal.ai)
- Buscar em banco de imagens (Unsplash, Pexels, Midjourney archive)
- Comunicar para a equipe de produção

**4. Linguagem visual**
- Composição: simétrica / assimétrica / fragmentada / centrada
- Iluminação: dura / suave / contrastada / flat / lateral
- Paleta de câmera: saturada / dessaturada / monocromática / analógica
- Textura: granulada / limpa / rough / polida

**5. Referências de movimento (para audiovisual)**
- Ritmo de corte: lento / ritmado / errático / respirado
- Movimento de câmera: estático / traveling / handheld / drone
- Transições: hard cut / dissolve / match cut / jump cut
- Estilo de direção de atores/sujeitos: naturalista / performático / observacional

**6. Referências externas (3-5)**
Filmes, campanhas, fotógrafos, marcas com estética similar.

---

## Como usar

```
/moodboard [briefing]
```

O briefing pode ser:
- Uma frase de intenção ("quero algo que pareça memória, saudade, coisas esquecidas")
- Nome de um projeto já existente ("moodboard para o projeto VMA da AFD")
- Uma descrição de cliente e produto ("moodboard para marca de comida artesanal de Brasília")

**Opcional:** passar paleta existente, referências já aprovadas, restrições.

---

## Fluxo interno do skill

1. **Extrair palavras-chave de mood** do briefing
2. **Construir paleta de cores** com HEX e proporções de uso
3. **Gerar 6-12 descrições de imagem** prontas para:
   - Usar direto com `/prompts-imagem-ia` (texto)
   - Gerar com fal.ai MCP (quando ativo) — modelos: `flux/dev`, `stable-diffusion-xl`
   - Buscar manualmente em Unsplash/Pexels
4. **Definir linguagem visual** (iluminação, composição, câmera)
5. **Listar referências externas** com justificativa
6. **Para audiovisual:** adicionar referências de movimento e ritmo

---

## Saída esperada

```
# Moodboard — [Nome do Projeto]
Data: [data]
Cliente: [cliente]
Briefing: [uma frase]

---

## Mood
"[A frase que define o universo emocional do projeto]"

## Paleta
| Nome | HEX | Uso |
|---|---|---|
| [cor principal] | #XXXXXX | Fundo, base |
| [destaque] | #XXXXXX | Elementos de energia |
| [acento] | #XXXXXX | Detalhes, tipografia |
| [neutro claro] | #XXXXXX | Espaços, respiro |
| [neutro escuro] | #XXXXXX | Sombras, profundidade |

## Referências Visuais

### Imagem 1 — [nome/título]
**Descrição:** [o que está na imagem com detalhes de iluminação, composição, cor]
**Prompt para IA:** `[prompt otimizado para Midjourney/Flux]`
**Mood desta imagem:** [uma frase]

### Imagem 2 — [...]
[repetir para todas as imagens]

## Linguagem Visual
- **Composição:** [tipo]
- **Iluminação:** [tipo e qualidade]
- **Cor/grading:** [saturação, temperatura, estilo]
- **Textura:** [rugosa / limpa / analógica / digital]

## Referências de Movimento (se audiovisual)
- **Ritmo:** [lento / médio / ritmado / errático]
- **Câmera:** [estilo de movimento]
- **Transições:** [estilo predominante]

## Referências Externas
1. [Obra/marca] — [por quê essa referência]
2. [...]

## Diretrizes para a equipe
[3-5 orientações práticas para quem vai produzir/criar com esse moodboard]
```

---

## Integrações

- `/prompts-imagem-ia` — para gerar os prompts de cada imagem de referência
- fal.ai MCP (quando ativo) — para gerar as imagens diretamente
- Adobe MCP — para montar o painel visual final em arquivo editável
- `/firma-branding` — quando o moodboard é para identidade de marca
- `/primal-branding` — quando o projeto precisa de posicionamento emocional antes do moodboard
- `cinematic-script-writer` — quando o moodboard alimenta a escrita de um roteiro

## Dicas para moodboards melhores

- **Menos é mais.** 8 imagens coerentes valem mais que 20 contraditórias.
- **Justifique cada escolha.** O cliente precisa entender por que aquela imagem está ali.
- **Paleta antes das imagens.** Definir cores primeiro organiza as escolhas visuais.
- **Referências inesperadas.** Trazer uma referência de arte, moda ou arquitetura que não é "óbvia" para audiovisual enriquece o universo.
- **Mostre o que NÃO é.** Incluir um "contra-moodboard" (o que queremos evitar) evita desentendimentos.
