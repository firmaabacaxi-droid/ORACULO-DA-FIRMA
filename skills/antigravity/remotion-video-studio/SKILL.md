---
name: "Remotion Video Studio — Geração de Vídeos com IA + React"
category: "antigravity"
mode:
  - cli
dependencies: ["node>=18", "remotion", "@remotion/cli"]
routes_to: ["antigravity/cinematic-script-writer"]
oraculo_endpoint: ""
---

# SKILL — Remotion Video Studio
## Geração Programática de Vídeos com React & IA
*Use esta skill para criar vinhetas, bumpers, apresentações animadas e motion design descrevendo o que você quer em linguagem natural. O agente escreve o código React/Remotion e renderiza um .mp4 real.*

---

## 🎯 Quando Usar Esta Skill

- Cliente quer uma **vinheta de abertura** com a identidade visual do projeto
- Precisar de um **bumper de transição** para vídeos do YouTube/Reel
- Gerar uma **apresentação animada** de proposta comercial
- Criar **motion graphics** simples sem precisar do After Effects

---

## 📦 Setup Inicial (Uma Vez por Projeto)

```bash
# Na pasta do projeto ou em um diretório dedicado
cd "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\scratch"

# Criar projeto Remotion
npx create-video@latest remotion-studio --template blank

# Entrar na pasta e instalar dependências
cd remotion-studio
npm install
```

---

## 🖥️ Fluxo de Trabalho do Agente

### PASSO 1 — Entender o Pedido
O usuário descreve o vídeo desejado em linguagem natural:
> *"Quero uma vinheta de 5 segundos com fundo preto terroso (#0f0d0b), o nome 'Firma Abacaxi' aparecendo com fade-in dourado (#d49a6a), e no final uma tagline 'Cine, Arte & Cultura' subindo de baixo."*

### PASSO 2 — Escrever o Componente React/Remotion

O agente cria o arquivo de composição. Exemplo de template base:

```tsx
// src/Vinheta.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Vinheta = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // Animação: fade-in do título entre frames 0-30
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Animação: tagline sobe entre frames 60-90
  const taglineY = interpolate(frame, [60, 90], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0d0b', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ 
        color: '#d49a6a', 
        fontFamily: 'Georgia, serif', 
        fontSize: 72,
        opacity: titleOpacity,
        letterSpacing: '0.1em',
        margin: 0
      }}>
        Firma Abacaxi
      </h1>
      <p style={{ 
        color: '#e6dfd3', 
        fontFamily: 'Inter, sans-serif', 
        fontSize: 24,
        opacity: taglineOpacity,
        transform: `translateY(${taglineY}px)`,
        margin: 0,
        letterSpacing: '0.3em',
        textTransform: 'uppercase'
      }}>
        Cine, Arte & Cultura
      </p>
    </AbsoluteFill>
  );
};
```

```tsx
// src/Root.tsx
import { Composition } from 'remotion';
import { Vinheta } from './Vinheta';

export const RemotionRoot = () => {
  return (
    <Composition
      id="Vinheta"
      component={Vinheta}
      durationInFrames={150}  // 5 segundos a 30fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

### PASSO 3 — Preview no Browser (Opcional)

```bash
cd "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\scratch\remotion-studio"
npx remotion studio
# Abre http://localhost:3000 para preview interativo
```

### PASSO 4 — Renderizar o MP4

```bash
cd "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\scratch\remotion-studio"

# Renderizar composição específica
npx remotion render Vinheta "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\output\vinheta-firma-abacaxi.mp4"

# Com qualidade alta (para entrega)
npx remotion render Vinheta output.mp4 --codec=h264 --crf=18
```

---

## 🎨 Templates Disponíveis (Cine Terroso)

### Template 1: Vinheta de Abertura (5s)
- Fundo `#0f0d0b` → fade-in título dourado → tagline sobe
- `durationInFrames: 150` | `fps: 30` | `1920x1080`

### Template 2: Lower Third (3s)
- Nome do entrevistado aparece no canto inferior esquerdo
- Estilo jornal cinemático com linha dourada

### Template 3: Bumper de Transição (2s)
- Wipe horizontal com cor `#d49a6a`
- Ideal entre cenas

### Template 4: Card de Projeto (10s)
- Apresentação de projeto com imagem, título, cliente e valor
- Integra dados do Notion via `props`

---

## 📁 Destinos de Output

```
output/
├── vinhetas/        ← Vinhetas de abertura e fechamento
├── bumpers/         ← Transições entre cenas
├── apresentacoes/   ← Apresentações de proposta animadas
└── assets/          ← Elementos reutilizáveis (logos, cards)
```

---

## ⚠️ Considerações Técnicas

- **Renderização pesada:** Pode levar 1-5 minutos dependendo da duração e resolução. Sempre rodar localmente, nunca no servidor Next.js.
- **Fontes:** Para usar Google Fonts no Remotion, instalar via `@remotion/google-fonts` ou embutir o CSS.
- **Imagens:** Usar `staticFile()` do Remotion para referenciar assets locais.
- **GIF/WebM:** O Remotion suporta múltiplos codecs de saída — use `--codec=gif` para previews.

---

## 🔗 Referências

- [Remotion Docs](https://www.remotion.dev/docs)
- [Tutorial Claude x Remotion](https://docs.google.com/document/d/1rGsdrJJ8qLEUv_DcdIMm2-jjRama0ihlo3dt1vVFEEM/mobilebasic)
- [Composições Remotion](https://www.remotion.dev/docs/composition)
