---
name: firma-branding
description: "Define e aplica a identidade visual da Firma Abacaxi — paleta de cores, tipografia, iconografia, tom de voz e aplicações de marca. Gera guias de identidade para a Firma e adapta o sistema para projetos de clientes."
---

# Firma Branding

Cria e mantém a identidade visual da Firma Abacaxi. Parte do sistema que consolida quem a Firma é visualmente — do logo ao motion, da paleta ao tom. Também adapta o processo para criar identidades para clientes.

## Quando usar
- Para definir ou refinar a identidade visual da Firma Abacaxi.
- Para criar um guia de identidade para um projeto ou cliente.
- Para garantir consistência visual em apresentações, propostas, conteúdo.
- Antes de criar um moodboard — este skill define o sistema; `/moodboard` aplica para projetos específicos.

## Componentes da identidade visual

### 1. Paleta de Cores
Definir com:
- **Cor primária** — âncora da marca (tom, HEX, RGB, CMYK)
- **Cor secundária** — complemento e contraste
- **Cor de destaque** — para CTAs e elementos de energia
- **Neutros** — fundo, texto, espaço em branco
- **Paleta extendida** — variações para diferentes contextos (vídeo, digital, impresso)

Formato de entrega:
```
Cor: [nome]
HEX: #XXXXXX
RGB: R, G, B
Uso: [quando e como aplicar]
```

### 2. Tipografia
- **Fonte principal** — headlines, títulos, identidade forte
- **Fonte de corpo** — textos corridos, descrições, legendas
- **Hierarquia tipográfica** — H1/H2/H3/body/caption com tamanhos e pesos
- **Regras de uso** — quando usar cada fonte, espaçamento, entrelinhas

### 3. Tom de Voz
- **Arquétipo de comunicação** — como a Firma fala (direto, poético, técnico, caloroso?)
- **Palavras da Firma** — termos que são da casa (ver `/primal-branding` para sacred words)
- **Palavras a evitar** — o que soa falso para a Firma
- **Exemplos de copy** — headline, bio, proposta, legenda de Instagram

### 4. Iconografia e Elementos Visuais
- **Símbolo/logotipo** — descrição formal, variações, uso correto
- **Elementos gráficos** — padrões, texturas, formas recorrentes
- **Estilo fotográfico** — iluminação, composição, pós-produção
- **Estilo de motion** — ritmo de corte, transições, efeitos

### 5. Aplicações de Marca
- Capa de proposta
- Template de apresentação
- Post para Instagram (feed / stories)
- Thumbnail YouTube
- Assinatura de e-mail
- Credencial / crachá de produção

## Firma Abacaxi — contexto de identidade

**O que a Firma é:**
- Produtora audiovisual cultural e estratégica, baseada em Brasília
- Trabalha com documentários, editoriais, conteúdo institucional, editais culturais (FAC, AFD)
- Equipe pequena e autoral — Filipe Duque + parceiros

**Valores percebidos:**
- Calor humano sem ser sentimental
- Competência técnica sem ser fria
- Criatividade enraizada na cultura brasileira
- Seriedade na execução, leveza no tom

**Referências de identidade:**
- Tropicalismo contemporâneo (abacaxi não é fruta genérica — é estranha, espinhosa e doce)
- Produtoras autorais latinoamericanas
- Design brasileiro dos anos 60-80 (Tomás Santa Rosa, Aloísio Magalhães)

## Saída esperada

Para cada sessão de branding, entregar:

```
# Identidade Visual — [Nome da Marca]
Data: [data]
Contexto: [para quem é, qual o uso]

## Paleta
[tabela com cores]

## Tipografia
[fonte principal + fonte de corpo + hierarquia]

## Tom de Voz
[3 adjetivos / arquétipo / exemplos de copy]

## Elementos Visuais
[descrição do estilo fotográfico e gráfico]

## Aplicações
[onde aplicar, formatos, dimensões]

## Próximos passos
[o que construir com essa identidade]
```

## Integrações

- Invocar `firma-ux-designer` para implementar o design system no oraculo-app
- Invocar `/prompts-imagem-ia` para gerar referências visuais baseadas na paleta
- Invocar `/moodboard` para criar um painel visual do universo da marca
- Invocar `/primal-branding` para o trabalho de posicionamento emocional
- Usar Adobe MCP para gerar assets finais (quando disponível)
