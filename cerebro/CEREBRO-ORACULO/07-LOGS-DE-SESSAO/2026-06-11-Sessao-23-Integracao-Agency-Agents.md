---
data: 2026-06-11
tipo: log-sessao
sessao: 23
assunto: Integração da biblioteca agency-agents — 4 agentes web/produto + 8 skills novas
status: concluido
---

# Sessão 23 — Integração agency-agents

## Contexto

Lipe pediu para analisar o repositório `msitarzewski/agency-agents` (apresentado via página
Notion "The Agency: 147 Pre-Built Agents for Claude Code") e integrá-lo ao Oráculo. Biblioteca
open-source, licença MIT, ~230 agentes em 19 divisões, formato `.md` + frontmatter YAML —
compatível nativamente com o Claude Code.

## O que foi feito

### Rodada 1 — Time de produto web (4 agentes)

Curadoria focada no pedido: construir o **site da Firma** e a **plataforma própria**
(`oraculo-app`, Next.js). Como os agentes ECC já cobrem revisão de código, não se duplicou
revisores — foco em agentes de **construção e produto**. Criados em `.claude/agents/`:

- `firma-product-strategist` — decide o quê e em que ordem (roadmap, priorização, métrica)
- `firma-ux-designer` — design system, tokens, componentes, fluxos
- `firma-backend-architect` — dados/Supabase, APIs, auth, integrações Notion/Drive
- `firma-web-builder` — constrói o front (Next.js/React/Tailwind)

Fluxo: strategist → ux-designer → backend-architect → web-builder → revisão (ECC + verifier).

### Rodada 2 — 8 skills novas (sem sobreposição)

Lipe pediu para garimpar os outros agentes e enriquecer as skills "sem sobrepor, apenas trazer
mais habilidades". Varridas as divisões não-código; descartado tudo que duplicava o existente
(Content Creator, Social Media, Growth Hacker, SEO genérico, plataformas chinesas, e-commerce).
Adaptadas 8 skills em `.claude/skills/firma/`, cada uma com seção "não sobrepõe — complementa X":

| Skill | Origem | Enriquece |
|---|---|---|
| `editais` | grant-writer + proposal-strategist | versão *fomento* da proposta; orquestra budget-planner |
| `narrativa-documental` | narratologist + historian + anthropologist + cultural-intelligence | alimenta cinematic-script-writer |
| `youtube-estrategia` | video-optimization | camada de vídeo longo |
| `trafego-pago` | paid-social + tracking | Meta Ads, antecipa Fase 5 |
| `assessoria-imprensa` | pr-communications | earned media |
| `juridico-audiovisual` | legal-compliance + legal-document-review | 1ª passada (não é advogado) |
| `atas-reuniao` | meeting-notes | alimenta skill gestao |
| `prompts-imagem-ia` | image-prompt-engineer | moodboard/storyboard (≠ photography-settings) |

### Integração e verificação

- Routing integrado em `.claude/CLAUDE.md` (tabela de agentes + seção de skills) e
  `.claude/rules/skills-routing.md` (seções detalhadas por trigger).
- `firma-verifier` rodado em contexto independente sobre o staged diff: **VERDICT SHIP**
  (0 blocker/high/medium, 3 low — dois pré-existentes do roteador, um improcedente).
- Commit `8560422` (14 arquivos, +1014 linhas) na branch `consolidacao-monorepo`.
- Push: branch enviada ao GitHub pela primeira vez (origin/consolidacao-monorepo).

## Decisões e racional

- **Qualidade > quantidade**: de ~230 agentes, só ~12 capacidades entraram, todas mapeadas a
  necessidades reais da Firma (editais, documentário, YouTube, tráfego pago).
- **Princípio "não sobrepor"**: cada skill declara explicitamente o que NÃO faz e a quem passa a bola.
- **Não abrir PR de merge ainda**: a branch carrega a consolidação inteira; merge só após a
  semana de validação prevista no blueprint.

## Próximos passos

- Validar as skills na prática durante a semana (ex.: `editais` lendo um regulamento real).
- Considerar curar agentes de marketing/finanças numa rodada futura, se surgir necessidade.
- Repo-fonte clonado em `c:\tmp\agency-agents` (temporário) — pode ser apagado.

## Referências

- Memória: `agentes_time_produto_web.md` (índice em MEMORY.md)
- Repo: github.com/msitarzewski/agency-agents (MIT)
