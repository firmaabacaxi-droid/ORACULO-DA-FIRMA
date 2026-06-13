# Plano-Master — Arquitetura, Ferramentas e Expansão do Oráculo
## A referência única de "como o Oráculo cresce e com quais ferramentas"
*Última revisão: 13 jun 2026 · Consolida 8 planos antes dispersos*

> **O que é este documento:** o mapa de expansão do Oráculo. Responde *o que ativar, por que, quando e quanto custa*.
> Para **o que fazer agora** → [PAINEL-MESTRE](PAINEL-MESTRE.md). Para **onde mora cada coisa** → [MAPA-MESTRE](MAPA-MESTRE.md). Para **por que existe** → [VISAO-ORACULO](VISAO-ORACULO.md).

---

## 1. Estado atual (o que já está de pé)

**Os três lares:** Cérebro (conhecimento) · Notion (dados) · Google Drive (arquivos). Tudo no monorepo `ORACULO - FIRMA ABACAXI/`.

| Camada | Estado |
|---|---|
| **Identidade** (`.claude/CLAUDE.md`) | ✅ Routing de skills ativo |
| **Skills** | ✅ 40 Firma + 41 ECC + 3 novas (firma-branding, primal-branding, moodboard) |
| **Agentes** | ✅ 71 (incl. 4 firma-* de produto web) |
| **Cérebro** (vault Obsidian) | ✅ Estrutura 00-08 + wiki; ~50% povoado |
| **Notion** | ✅ 12 bancos ativos |
| **NotebookLM** | ✅ 9 fontes, sync GitHub |
| **oraculo-app** (Next.js) | ✅ Base + busca global ⌘K + visualizador Drive |
| **MCPs no `.mcp.json`** | ✅ 12: notion, obsidian, notebooklm, filesystem, memory, sequential-thinking, parallel-search, context7, playwright, magic, github*, brave* (*sem chave) |
| **Adobe MCP** (ambiente Claude) | ✅ Disponível: Firefly, edição de imagem, quick-cut de vídeo, fontes |

---

## 2. Tabela Mestre de Ferramentas

**Status:** ✅ ativo · 🟡 configurável agora (precisa chave/ação) · ⬜ roadmap (fase futura)

### 2.1 MCPs de infraestrutura
| Ferramenta | Para que serve | Fase | Status | Custo |
|---|---|---|---|---|
| Notion MCP | Ler/escrever os 12 bancos (CRM, projetos, orçamento) | 0 | ✅ | grátis |
| Obsidian MCP | Ler/escrever o vault (Cérebro) | 0 | ✅ | grátis |
| NotebookLM MCP | Resumos, podcasts e perguntas sobre as fontes | 0 | ✅ | grátis |
| Filesystem / Memory / Sequential-thinking | Arquivos · memória entre sessões · raciocínio | 0 | ✅ | grátis |
| context7 MCP | Docs de frameworks ao vivo (dev do app) | 0 | ✅ | grátis |
| parallel-search MCP | Busca web com citações (substituiu DuckDuckGo) | 1 | ✅ ativo | grátis (key-free) |
| playwright MCP | Automação de browser / testes do app | 1 | ✅ ativo | grátis |
| GitHub MCP | Commits e issues pelo Claude | 1 | ✅ ativo | grátis |
| Brave Search MCP | Busca alternativa | 1 | 🟡 precisa chave | 2k/mês grátis |
| exa-web-search MCP | Busca semântica (pesquisa de marca, referências) | 2 | ✅ ativo | 1k/mês grátis |
| supabase MCP | Banco do oraculo-app pelo Claude | 2 | 🟡 precisa ref+token | grátis |
| Google Workspace MCP | Gmail, Agenda, Drive, Sheets, Docs — **alto impacto** | 2 | ⬜ | grátis + setup |
| Google Drive MCP | Arquivos de projeto direto no fluxo | 2 | ⬜ | grátis |
| magic (UI) MCP | Componentes prontos pro dashboard | 2 | ✅ ativo | grátis |

### 2.2 Imagem e Vídeo com IA
| Ferramenta | Para que serve | Fase | Status | Custo |
|---|---|---|---|---|
| **Adobe MCP / Firefly** | Geração e edição de imagem, moodboard, boards | 1 | ✅ no ambiente | incluso |
| fal.ai MCP | Geração de imagem alternativa (Flux/SDXL) | 2 | 🟡 precisa FAL_KEY | pay-per-use |
| Nano Banana Pro | Imagem (via Google AI Pro) | 2 | 🟡 | incluso no Google AI Pro |
| ComfyUI + SDXL | Storyboards locais (controle fino) | 3 | ⬜ | grátis (local) |
| LTX-Video | Texto→vídeo local (RTX 4060 Ti) | 3 | ⬜ | grátis (local) |
| Wan2.1 T2V | Texto→vídeo local (mais lento) | 3 | ⬜ | grátis (local) |
| Veo 3.1 / Veo2 | Vídeo de alta qualidade | 3-5 | 🟡 | Google AI Pro |
| Creatify MCP | Vídeos com avatar (conteúdo em escala) | 5 | ⬜ | assinatura |

### 2.3 Áudio
| Ferramenta | Para que serve | Fase | Status | Custo |
|---|---|---|---|---|
| Adobe `media_enhance_speech` | Limpar/realçar voz | 1 | ✅ no ambiente | incluso |
| Whisper / FasterWhisper | Transcrição local (PT-BR) | 3 | ⬜ | grátis (local) |
| ElevenLabs (+MCP) | Locução / narração IA | 3 | 🟡 | ~R$110/mês |

### 2.4 Produção audiovisual
| Ferramenta | Para que serve | Fase | Status | Custo |
|---|---|---|---|---|
| **pymiere → Adobe Premiere** | Automação do Premiere por Python (montagem, legendas) | 3 | ⬜ | grátis + Premiere |
| Adobe `video_create_quick_cut` | Corte rápido de vídeo no fluxo | 1 | ✅ no ambiente | incluso |
| auto-editor | Remover silêncios automaticamente | 3 | ⬜ | grátis |
| OpenMontage | Montagem automática a partir de clips | 3 | ⬜ | grátis |
| Story Architect (starc) | Roteiro profissional | 3 | ⬜ | grátis |
| ShortGPT | Shorts/Reels automáticos | 3 | ⬜ | grátis + API |
| ViMax / FilmAgent | Estúdio multi-agente (roteiro→storyboard→vídeo) | 4 | ⬜ | GPU + API |

### 2.5 Automação (n8n) e comunicação
| Ferramenta | Para que serve | Fase | Status | Custo |
|---|---|---|---|---|
| Inbox Telegram (bot + Groq Whisper) | Captura sem fricção → `00-INBOX/` | 4 | 🟡 blueprint pronto | grátis |
| n8n + Workflow Builder MCP | Montar automações por linguagem natural | 4 | 🟡 token a renovar | grátis (self-host) |
| A1 — Briefing → Projeto Notion | 2h → 5min | 4 | ⬜ | n8n |
| A2 — Proposta aprovada → Pré-produção | dispara etapa automática | 4 | ⬜ | n8n |
| A3 — Ordem do Dia 8h | resumo diário automático | 4 | ⬜ | n8n |
| A4 — Entrega → Follow-up + NF | fecha o ciclo financeiro | 4 | ⬜ | n8n |
| A5 — Making-of → Conteúdo social | reaproveita material | 4 | ⬜ | n8n |
| FFmpeg MCP | Editar/converter vídeo no chat | 4 | ⬜ | grátis |
| WhatsApp MCP / Telegram MCP | Acesso e atendimento | 2-4 | ⬜ | grátis |

### 2.6 Web, pagamento e prospecção
| Ferramenta | Para que serve | Fase | Status | Custo |
|---|---|---|---|---|
| Framer | Site da Firma | 2 | 🟡 | ~R$30/mês |
| Frame.io | Aprovação de vídeo com cliente | 2 | 🟡 | ~R$80/mês |
| Asaas / InfinitePay | Links de pagamento PIX/boleto | 3 | ⬜ | % por transação |
| Mailerlite | Newsletter | 3 | ⬜ | grátis ≤1k |
| Ayrshare MCP | Publicar em 13 redes | 4 | ⬜ | grátis + plano |
| Apollo.io / LinkedIn Sales Nav / Lemlist | Prospecção ativa | 5 | ⬜ | R$320-550/mês cada |
| Apify | Scraping de leads | 5 | ⬜ | $49/mês |

---

## 3. Passo a passo de expansão

> Princípio: **estrutura por demanda**. Cada fase só começa quando a anterior está em uso real. Nada de ligar tudo de uma vez.

### Fase 0 — Baseline ✅ (concluída)
Notion, Obsidian, NotebookLM, context7, Adobe MCP, vault, oraculo-app, skills e agentes. **Já funciona.**

### Fase 1 — Ligar o grátis sem fricção ✅ *(concluída 13 jun 2026)*
**O quê:** parallel-search (substituiu DuckDuckGo), playwright, magic — ativados em `.mcp.json`.
**Adobe/Firefly:** já disponível no ambiente (`create_firefly_board`, `video_create_quick_cut`, `media_enhance_speech`) — skills `moodboard` e `firma-branding` já o referenciam.
**Reinicie o Claude Code** para carregar os 3 novos MCPs.

### Fase 2 — Ferramentas com chave + presença *(R$ +160/mês)*
**O quê:** exa, supabase, Google Workspace MCP, Google Drive MCP; fal.ai (opcional); site Framer + domínio; Frame.io.
**Benefício:** pesquisa de marca séria, dashboard conectado ao banco, e-mail/agenda no fluxo, site no ar, aprovação de vídeo com cliente.
**Pré-requisito:** Felipe gera as chaves (lista na seção 5). **Antes:** resolver as pendências críticas (seção 6).

### Fase 3 — Produção audiovisual com IA *(R$ +110/mês)*
**O quê:** Whisper local, ComfyUI/Firefly para storyboard, **pymiere → Premiere**, LTX-Video, auto-editor, OpenMontage, ElevenLabs.
**Benefício:** transcrição, storyboard, geração de vídeo e automação de edição — o coração criativo da Firma turbinado.
**Pré-requisito:** GPU OK (RTX 4060 Ti); setup Python local.

### Fase 4 — Automação *(custo n8n self-host)*
**O quê:** inbox Telegram, n8n + automações A1–A5, FFmpeg MCP.
**Benefício:** captura sem fricção e os 11 passos manuais do fluxo viram automáticos (~6h/projeto economizadas).
**Pré-requisito:** bot Telegram + Groq key (grátis) + n8n.

### Fase 5 — Escala *(R$ +1.000/mês quando fizer sentido)*
**O quê:** prospecção (Apollo, LinkedIn Sales Nav, Lemlist, Apify), Ayrshare, vídeo avançado (Veo, Creatify, ViMax).
**Benefício:** crescimento ativo de clientes e produção em volume.
**Pré-requisito:** operação estável + caixa para as assinaturas.

**Custo acumulado:** Fase 2 ~R$160/mês · Fase 3 ~R$270/mês · Fase 4 idem · Fase 5 ~R$1.300+/mês.

---

## 4. Integração Adobe (a novidade)

O **MCP da Adobe já está disponível** neste ambiente — não precisa instalar. O que dá pra fazer **hoje**:

| Recurso Adobe | Uso na Firma | Skill que conecta |
|---|---|---|
| **Firefly boards** (`create_firefly_board`) | Geração de imagem e moodboard de projeto/marca | [moodboard](../.claude/skills/firma/moodboard/SKILL.md), [firma-branding](../.claude/skills/firma/firma-branding/SKILL.md) |
| Edição de imagem (remover fundo, cor, recorte, vetorizar) | Tratamento de still, identidade visual | firma-branding |
| `video_create_quick_cut` / `video_resize` | Cortes rápidos, versões para redes | youtube-estrategia |
| `media_enhance_speech` | Limpar áudio de entrevista/captação | — |
| `font_recommend` | Tipografia da marca | firma-branding |

**Adobe Premiere:** não há MCP oficial. A integração se dá via **pymiere** (Python controla o Premiere) — entra na **Fase 3**, para automatizar montagem, legendas e exportação. Complementa o Premiere que o Felipe já usa, sem substituir.

---

## 5. Desenvolvimento do Cérebro

O vault está ~50% povoado. O crescimento previsto:

### 5.1 Camada de síntese (wiki/)
| Pasta | Estado | Ação |
|---|---|---|
| `wiki/projects/` | ✅ 10 sínteses | manter atualizado via `/wiki-ingest` |
| `wiki/areas/` | 🟡 1 de 4 (Captação) | criar Financeiro, Operação, RH |
| `wiki/resources/` | ⬜ vazio | povoar pessoas (AFD, SEC-DF, UnB) + editais |
| `wiki/archives/` | ⬜ vazio | mover projetos encerrados |

### 5.2 Estudos e referências do Felipe (06 e 08)
**Pipeline já documentado, zero livros ingeridos ainda.** Fronteira: `06-ESTUDOS` = aplicável à Firma · `08-FELIPE` = o olhar pessoal.

```
CAPTURA (Telegram) → TRIAGEM (Oráculo propõe destino, Felipe aprova)
→ SÍNTESE (/wiki-ingest + NotebookLM) → RETORNO (revisão ritual)
```

**Próximo passo concreto:** piloto com **1 livro** (sugestão: Jung/arquétipos, que já alimentou o FAC-2026) → NotebookLM → nota em `08.2-BIBLIOTECA/`. Valida o pipeline inteiro.

### 5.3 Compartilhamento e privacidade
- **GitHub:** sync automático do vault (Obsidian Git, 30min) → NotebookLM indexa.
- **Espaço da Jaya** (`09-JAYA/`): porta desenhada, nasce quando ela quiser (mesmo molde do 08).
- **Linha de privacidade** (Princípio 7 da Visão): **não entram** no vault — diário íntimo, saúde, conflitos, finanças pessoais, terceiros. Para isso, espaço privado fora do repo.

### 5.4 As 5 questões abertas da Visão *(refinam o sistema, não bloqueiam)*
Nome da casa pessoal (08) · ritual de retorno · linha de privacidade · medida de sucesso pessoal · convite à Jaya. Ver [VISAO-ORACULO](VISAO-ORACULO.md).

---

## 6. Pendências críticas (resolver antes da Fase 2)

| 🔴/🟠 | Pendência | Ação |
|---|---|---|
| 🔴 | Credenciais expostas no `ANTIGRAVITY/.env` (OpenAI, Notion, Supabase, Gemini) | **Revogar e rotacionar JÁ** |
| 🟠 | Geração de Word nunca testada ponta a ponta | Validar com 1 projeto real |
| 🟠 | Relações bidirecionais no Notion não validadas | Testar com Brasil Participativo |
| 🟠 | Subagentes (5 prompts) nunca testados | Criar Projects no claude.ai + 1 teste cada |
| 🟡 | Clientes reais não cadastrados no Notion | Registrar CNV, Tamause, Vert, Cerrado, Chichá |

---

## 7. De onde veio cada coisa (rastreabilidade)

Este Plano-Master absorveu e substituiu:

| Plano antigo | O que veio pra cá | Destino |
|---|---|---|
| `FASE2_IMPLEMENTACAO.md` | sprints, ferramentas, pendências críticas | `_arquivo/` |
| `GUIA-TOOLKIT-2026.md` | tabela de ferramentas, guias de instalação | `_arquivo/` |
| `arquivo/PLANO_IMPLEMENTACAO.md` | automações A1–A5, custos por fase | `_arquivo/` |
| `arquivo/GUIA_ATIVACAO_MCP.md` | roadmap de MCPs | `_arquivo/` |
| vault `Roadmap.md` | fases de evolução | stub → este doc |
| vault `PROXIMOS-PASSOS.md` | checklist de MCPs | stub → este doc |

Detalhe de instalação passo a passo de cada MCP/ferramenta: ver os arquivos em `docs/_arquivo/` quando precisar do how-to.

---
*Oráculo — Firma Abacaxi · um plano para crescer com intenção, sem catedrais vazias · 2026*
