---
name: language_and_i18n
description: Habilidades avançadas de tradução, NLP multilíngue e implementação de Internacionalização (i18n) arquitetônica no Next.js.
---

# Habilidades Multilíngues (Language & i18n Skills)

Esta skill turbina as capacidades da IA para lidar com idiomas não apenas na fala e tradução fluente nativa, mas também nas melhores práticas absolutas de engenharia de software para construir sistemas globais (como o `interakt-core`).

## 🌍 1. Domínio de Tradução de Alto Nível
Sempre que atuar como tradutora ou processadora de textos globais:
- **Localização (Localize) vs Tradução Literal:** Nunca use traduções ao pé da letra ("englobe" o idioma). Expressões gringas, jargões hackers ou corporativos devem ser adaptados com a gíria ou termo técnico ideal do país alvo.
- **Detecção de Tom e Cultura:** Mantenha exatamente o "feeling" do texto original. Se for agressivo, mantenha agressivo. Se for corporativo, coloque nas normas cultas absolutas.
- **Nomeação de Variáveis (Código):** Por padrão, no desenvolvimento do Interakt, funções, lógicas de banco e variáveis devem ser mantidas em **Inglês** (padrão global de TI), e apenas os textos da Interface em Português ou outras línguas.

## 🛠️ 2. Arquitetura de Internacionalização (Next.js App Router)
Se convocada para tornar o sistema multinacional, utilize o padrão-ouro de i18n em React (`next-intl`):

1. **Roteamento Segmentado ([locale]):**
   A arquitetura das páginas deve migrar para `app/[locale]/...`. 
   Isso permite que o código gere URLs perfeitas como `/en/dashboard` ou `/pt/dashboard`.

2. **Dicionários de Interface (JSON centralizado):**
   Todos os textos dos menus, botões e mapas NUNCA devem estar misturados (hardcoded) no meio do componente React.
   Eles devem existir em arquivos estritos na raiz:
   - `messages/en.json` (English)
   - `messages/pt-BR.json` (Português do Brasil)
   - `messages/es.json` (Español)

3. **Implementação de Código Típica:**
   ```tsx
   import {useTranslations} from 'next-intl';
   
   export default function DashboardPage() {
     const t = useTranslations('Dashboard');
     
     return (
       <div>
         <h1>{t('title')}</h1>
         <button>{t('submit_btn')}</button>
       </div>
     );
   }
   ```

## ⚡ 3. Middleware de Idioma Dinâmico
Use o middleware nativo do Next (`middleware.ts`) para checar de qual país o usuário está acessando o site (lendo o header `accept-language` do navegador dele) e redirecioná-lo automaticamente para o idioma correto dele antes mesmo da tela carregar.

## 🌐 4. Otimização Global (SEO & Hreflang)
Ao lidar com as páginas do Interakt Core, sempre configure o arquivo `layout.tsx` para carregar metadadados `hreflang`. Isso ensina secretamente pro Google qual idioma mostrar se alguém pesquisar o projeto no Japão, nos EUA ou no Brasil.
