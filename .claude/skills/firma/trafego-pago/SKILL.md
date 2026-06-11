---
name: trafego-pago
description: "Mídia paga e tráfego: Meta (Facebook/Instagram), e quando fizer sentido TikTok/LinkedIn. Estrutura de campanha full-funnel (prospecção → engajamento → retargeting), públicos, criativo nativo por plataforma, rastreamento (pixel/Conversions API) e atribuição. Antecipa a Fase 5 do roadmap. Não substitui master-marketing (estratégia orgânica) — é a camada paga."
---

# Tráfego Pago (Meta Ads)

Camada de **mídia paga** — inexistente no Oráculo até aqui e prevista para a Fase 5 do roadmap
(Meta Ads/Apify). Social pago é diferente de busca: você **interrompe**, não responde. Por isso
o criativo e o público precisam *conquistar* a atenção — anúncio que parece conteúdo, não anúncio.

## Quando usar
- Impulsionar projeto, lançamento ou captação de leads com verba paga.
- Estruturar campanha de Meta (Instagram/Facebook) full-funnel.
- Diagnosticar campanha que está gastando sem retorno.

## Estrutura full-funnel
- **Prospecção** (frio): públicos lookalike e por interesse; criativo que para o scroll.
- **Engajamento/retargeting** (morno): quem viu vídeo, visitou perfil, abriu lead form.
- **Conversão/retenção** (quente): quem demonstrou intenção; oferta direta.
- Gestão de **frequência** e exclusão de públicos para não saturar a mesma pessoa.

## Públicos (audience engineering)
- Custom audiences por pixel, lista de CRM (Notion), engajamento (viewers de vídeo, page engagers).
- Lookalikes a partir das melhores listas; estratégia de exclusão e análise de overlap.

## Criativo
- **Nativo por plataforma**: UGC-style para Meta/TikTok; nada de reaproveitar o mesmo corte.
- Teste de criativo em escala; detecção de fadiga e cronograma de refresh.
- A Firma tem vantagem rara aqui: produz o próprio criativo de alta qualidade.

## Rastreamento e medição
- Pixel + **Conversions API** (server-side) para sobreviver às limitações de privacidade (iOS/SKAN).
- Janelas de atribuição, e validação de **incrementalidade** (a campanha trouxe conversão nova
  ou só levou crédito do que aconteceria de qualquer jeito?).

## Regras críticas
- **Criativo é o alvo, não o público.** Em social pago, 80% do resultado é o criativo.
- **Meça antes de escalar.** Só aumente verba com evidência de retorno real, não de vaidade.
- **Não duplo-conte conversão.** Cruze com outras fontes antes de declarar vitória.
- **Verba é dinheiro real da Firma/cliente.** Comece pequeno, teste, depois escale o que prova.

## Não sobrepõe — complementa
- **Estratégia de marketing e funil orgânico** → `master-marketing` + `marketing-copy-knowledge`.
- **Conteúdo orgânico e calendário** → `social-media-strategy` + skill `conteudo`.
- **Psicologia de persuasão / ancoragem** → `marketing-psychology` (Antigravity).
- **Automação de captura de lead (Notion/n8n)** → skills `n8n-*`.
- **Perfil DISC do decisor para o criativo** → `personality-profiler` (Antigravity).

## Saída
Plano de campanha (estrutura, públicos, criativos, verba por etapa, plano de medição) +
setup de rastreamento, salvos em `output/conteudo/` ou `output/relatorios/`.

## ⚠️ Nota
Esta skill assume Fase 5. Antes de rodar, confirmar conta de anúncios, pixel/CAPI instalados
e verba aprovada por Lipe/Jaya.
