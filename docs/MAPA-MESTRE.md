# Mapa-Mestre — Onde mora cada coisa
## A bússola do sistema Oráculo · Firma Abacaxi
*Última revisão: 12/06/2026 · Monorepo consolidado (branch `consolidacao-monorepo`)*

> Em dúvida sobre **onde guardar** ou **onde encontrar** algo? Comece por aqui.
> Em dúvida sobre **o que fazer**? Vá ao [PAINEL-MESTRE.md](PAINEL-MESTRE.md).

---

## Os três lares (regra de ouro)

| Lar | O que guarda | Onde |
|---|---|---|
| 🧠 **Cérebro / Obsidian** | Conhecimento, processos, briefings, logs de sessão, wiki | `cerebro/CEREBRO-ORACULO/` |
| 🗃️ **Notion** | Dados estruturados — status, valores, prazos, contatos, CRM | Wiki `🔮 ORÁCULO -FIRMA ABACAXi` (6 bancos ativos) |
| ☁️ **Google Drive** | Arquivos de trabalho editáveis — planilhas, DOCXs, PDFs de deliverable | Pasta `FIRMA ABACAXI/` no Drive |

**Nunca duplicar entre lares.** Um aponta para o outro por link, não por cópia.

---

## A Regra de Lar Único

Para acabar com a duplicação entre `docs/` e o vault (causa-raiz das inconsistências), **cada documento tem um único lar canônico**, definido pela sua camada:

| Camada | Lar canônico | Exemplos |
|---|---|---|
| **Referência completa** (lida pelo Oráculo a cada sessão) + **meta-sistema** | **`docs/`** | MAPA-MESTRE, VISAO-ORACULO, FLUXO_ORACULO, PAINEL-MESTRE, GUIA-TOOLKIT, FASE2, CONTEXTO_FIRMA, FLUXO_TRABALHO, TABELA_PRECOS, ARQUITETURA_NOTION |
| **Síntese navegável** (Obsidian) + **conhecimento gerado** | **vault `cerebro/`** | wiki/, DNA-Firma, Fluxo-13-Etapas, Tabela-Precos-Referencia, SOPs, projetos, clientes |
| **Dados estruturados** — status, valores, prazos, contatos | **Notion** | PROJETO_2026, CRM, TAREFAS |

**Como funciona na prática:** o documento **completo** vive em `docs/` (é o que o Oráculo lê); o vault guarda a **síntese navegável** do mesmo tema (resumo curto, conectado no grafo). Não são duplicata — são camadas. Onde havia cópia byte a byte, o lado do vault virou **stub** apontando para o completo em `docs/`.

> ✅ **Resolvido (12/jun/2026):** as 4 cópias exatas que viviam nos dois lares — `CONTEXTO_FIRMA`, `FLUXO_TRABALHO`, `ARQUITETURA_NOTION`, `FASE2_IMPLEMENTACAO` — tiveram a versão do **vault** convertida em stub → `docs/`. O completo é editado só em `docs/`; o vault mantém as sínteses (`DNA-Firma`, `Fluxo-13-Etapas`, etc.).

---

## Estrutura do monorepo (`ORACULO - FIRMA ABACAXI/`)

```
.claude/                  Configuração do Oráculo (ECC + customização Firma)
├── CLAUDE.md             Identidade única do Oráculo (terceiro sócio Lipe + Jaya)
├── settings.json         Permissões e ativação progressiva de tools
├── skills/
│   ├── firma/            31 skills da Firma (audiovisual, wiki, n8n, negócios)
│   └── ecc/              41 skills ECC research (artigos, conteúdo, pesquisa)
├── agents/               64 agentes ECC + 3 agentes Firma (firma-verifier, wiki-*)
├── rules/                Regras ECC + regras Firma
└── hooks/hooks.json      Hooks: hot.md, auto-commit wiki, lembrete sessão

cerebro/CEREBRO-ORACULO/  Vault Obsidian (segundo cérebro)
├── 00-INBOX/             Rascunhos, entradas temporárias e capturas/ do Telegram
├── 01-OPERACAO-ORACULO/  DNA, diretrizes, templates
├── 02-PROCESSOS-E-MANUAIS/ SOPs por departamento
├── 03-CLIENTES/          Dossiês permanentes de clientes
├── 04-PROJETOS-ATIVOS/   Projetos em andamento (só markdown)
├── 05-ARQUIVO-HISTORICO/ Projetos finalizados
├── 06-ESTUDOS-E-REFERENCIAS/ Biblioteca de estética e conhecimento (Firma)
├── 07-LOGS-DE-SESSAO/    Logs datados de cada sessão
├── 08-FELIPE/            Casa pessoal: visão de mundo, biblioteca, narrativa
├── wiki/                 Base de conhecimento gerada pelo Oráculo
│   ├── hot.md            Contexto recente (lido a cada sessão pelo hook)
│   ├── index.md          Catálogo mestre
│   └── projects/areas/resources/archives/
└── agents/               Agentes Firma originais (espelhados em .claude/agents/)

oraculo-app/              App Next.js (dashboard operacional)
automacoes/               Workflows n8n (JSON) + blueprints de automação
scripts/
├── operacional/          18 scripts ativos (sync, bridge, validação)
└── legado/               42 scripts históricos (migrações pontuais)
docs/                     Arquitetura, contexto, este mapa
output/                   Deliverables gerados (propostas, roteiros, relatórios)
```

---

## Onde encontrar / guardar (índice rápido)

| Procuro… | Vai em… |
|---|---|
| Um **projeto** (briefing, roteiro, notas) | `cerebro/.../04-PROJETOS-ATIVOS/FIRMA-NN-Nome/` |
| **Planilha / DOCX / PDF editável** de um projeto | Google Drive → `FIRMA ABACAXI/PROJETOS/` |
| Projeto **encerrado** | `cerebro/.../05-ARQUIVO-HISTORICO/` |
| **Currículo, CNPJ, contrato social, portfólio** | `cerebro/.../00-EMPRESA/` + Drive |
| **Processos e manuais** (como fazer X) | `cerebro/.../02-PROCESSOS-E-MANUAIS/` |
| **Dossiê de cliente** | `cerebro/.../03-CLIENTES/` |
| **DNA, valores, diretrizes, templates** | `cerebro/.../01-OPERACAO-ORACULO/` |
| **Log do que foi feito numa sessão** | `cerebro/.../07-LOGS-DE-SESSAO/AAAA-MM-DD-Titulo.md` |
| **Rascunho rápido / coisa sem lar ainda** | `cerebro/.../00-INBOX/` |
| **Captura do Telegram** (vídeo, artigo, voz, ideia) | `cerebro/.../00-INBOX/capturas/` → triagem via "processar inbox" |
| **Estudo pessoal do Felipe** (Jung, tarô, livros, narrativa) | `cerebro/.../08-FELIPE/` (fronteira: aplicável à Firma → 06) |
| **Visão macro do Oráculo** (o quê e porquê) | `docs/VISAO-ORACULO.md` |
| **Modos de uso do Oráculo no dia a dia** | `docs/FLUXO_ORACULO.md` |
| **Proposta / roteiro / relatório gerado** | `output/` (no monorepo) |
| **Status / valor / prazo de projeto** | Notion → PROJETO_2026 |
| **CRM / contatos / tarefas** | Notion → CRM / CONTATOS / TAREFAS |
| **Skills do Oráculo** | `.claude/skills/firma/` (31) + `.claude/skills/ecc/` (41) |
| **Agentes especializados** | `.claude/agents/` (ECC + firma-*) |
| **Workflows n8n** | `automacoes/n8n-all-workflows.json` |
| **Blueprints de automação** | `automacoes/*.md` |
| **Scripts de sincronização ativos** | `scripts/operacional/` |
| **App web do Oráculo** | `oraculo-app/` |
| **Credenciais e segredos** | `~/.secrets/` (fora do repo, nunca versionado) |

---

## Fonte de verdade por tipo de informação

| Informação | Verdade está em | Os outros lugares só… |
|---|---|---|
| Status / valor / prazo / contatos | **Notion** | refletem / linkam |
| Conhecimento, processo, briefing narrativo | **Cérebro (wiki)** | resumem / comentam |
| Arquivos de trabalho editáveis | **Google Drive** | referenciam por link |
| Código, scripts, app, skills | **Monorepo (git)** | — |
| Credenciais / tokens | **`~/.secrets/`** | não existem no repo |

---

## Regra para arquivos no vault

O vault Obsidian (`cerebro/`) aceita **só markdown** (`.md`, `.canvas`, `.base`). Arquivos de trabalho (`.xlsx`, `.docx`, `.pdf`, `.ods`) ficam no Google Drive. Qualquer arquivo não-markdown no vault é rastreado mas não versionado (`.gitignore` cobre).

---

## Arquivos-âncora (leia no início de cada sessão)

- [.claude/CLAUDE.md](.claude/CLAUDE.md) — identidade + routing do Oráculo
- [cerebro/CEREBRO-ORACULO/wiki/hot.md](cerebro/CEREBRO-ORACULO/wiki/hot.md) — contexto recente (carregado automaticamente)
- [docs/PAINEL-MESTRE.md](PAINEL-MESTRE.md) — **o que fazer** — controle de pendências (3 trilhas)
- [docs/PLANO-MASTER.md](PLANO-MASTER.md) — **como crescer** — arquitetura, ferramentas e expansão (Fases 0-5)
- [docs/MAPA-MESTRE.md](MAPA-MESTRE.md) — **este arquivo** — onde mora cada coisa
- [docs/README.md](README.md) — guia de navegação da documentação

---

## Histórico de consolidação (jun/2026)

Branch `consolidacao-monorepo` (off master):
- **Bloco 1** — ECC research instalado (526 arquivos, base estrutural)
- **Bloco 2** — Vault Obsidian integrado, hooks wiki ativos
- **Bloco 3** — Skills unificadas: 31 `firma/` + 41 `ecc/`
- **Bloco 4** — Código migrado: oraculo-app, automacoes, scripts
- **Bloco 5** — Identidade única em `.claude/CLAUDE.md`
- **Bloco 6** — Vault limpo: arquivos não-markdown removidos do git
- **Bloco 7** — Credenciais em `~/.secrets/`
- **Bloco 8** — Validação + merge (pendente — semana de uso real)

Repos legados: `ANTIGRAVITY/` e cópia anterior do `ORACULO/` permanecem até validação concluída.

---
*Atualize este mapa sempre que uma pasta nova nascer ou mudar de lugar.*
