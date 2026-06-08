# Mapa-Mestre — Onde mora cada coisa
## A bússola do sistema Oráculo · Firma Abacaxi
*Atualizado em 08/06/2026 · ver arquitetura completa em `cerebro/.../01.3-ARQUITETURA-TECNICA/ARQUITETURA-SISTEMA.md`*

> Em dúvida sobre **onde guardar** ou **onde encontrar** algo? Comece por aqui.

---

## Os três lares (regra de ouro)

| Lar | O que guarda | Onde |
|---|---|---|
| 🧠 **Cérebro / Obsidian** | Conhecimento, processos, briefings, **arquivos dos projetos**, logs | `ORACULO - FIRMA ABACAXI/cerebro/CEREBRO-ORACULO/` |
| 🗃️ **Notion** | Dados estruturados (status, valores, prazos, contatos, CRM) | Wiki `🔮 ORÁCULO -FIRMA ABACAXi` (25 bancos) |
| ⚙️ **ANTIGRAVITY** | Código: app Next.js + scripts de sincronização | `ANTIGRAVITY/` |

**Nunca duplicar entre lares.** Um aponta para o outro por link, não por cópia.

---

## Onde encontrar / guardar (índice rápido)

| Procuro… | Vai em… |
|---|---|
| Um **projeto** (briefing, edital, planilha, roteiro, referências) | `cerebro/.../04-PROJETOS-ATIVOS/FIRMA-NN-Nome/` |
| Projeto **encerrado** | `cerebro/.../05-ARQUIVO-HISTORICO/` |
| **Currículo, CNPJ, contrato social, dados bancários, portfólio** | `cerebro/.../00-EMPRESA/` |
| **Processos e manuais** (como fazer X) | `cerebro/.../02-PROCESSOS-E-MANUAIS/` |
| **Dossiê de cliente** | `cerebro/.../03-CLIENTES/` |
| **DNA, valores, diretrizes, templates** | `cerebro/.../01-OPERACAO-ORACULO/` |
| **Arquitetura técnica / schema / este mapa** | `cerebro/.../01.3-ARQUITETURA-TECNICA/` + `docs/` |
| **Estudos, estética, referências de mercado** | `cerebro/.../06-ESTUDOS-E-REFERENCIAS/` |
| **Log do que foi feito numa sessão** | `cerebro/.../07-LOGS-DE-SESSAO/AAAA-MM-DD-Titulo.md` |
| **Rascunho rápido / coisa sem lar ainda** | `cerebro/.../00-INBOX/` |
| **Proposta/roteiro/relatório gerado** | `output/` (no ORACULO) |
| **Documentação operacional** (contexto, fluxo, preços) | `docs/` (no ORACULO) |
| **Skills do Oráculo** (por etapa) | `skills/` (no ORACULO) |
| **Skills da comunidade/Antigravity** | `ANTIGRAVITY/SKILLS/` (fonte única) |
| **Scripts de sincronização** (Notion/Sheets/Supabase) | `ANTIGRAVITY/` (raiz, hoje) |
| **App web do Oráculo** | `ANTIGRAVITY/oraculo-app/` |
| **Blueprints de automação** (n8n/Make) | `ANTIGRAVITY/.agents/workflows/` |
| **Credenciais e segredos** | `ANTIGRAVITY/.env` + `google_service_account.json` (gitignored; mover p/ `~/.secrets` no Bloco 6) |
| **Legado aguardando exclusão** | `archive/2026-06/` (no ORACULO) |

---

## Fonte de verdade por tipo de informação

| Informação | Verdade está em | Os outros lugares só… |
|---|---|---|
| Status/valor/prazo de projeto, contatos | **Notion** | refletem / comentam |
| Conhecimento, processo, briefing narrativo | **Cérebro** | resumem / linkam |
| Arquivos brutos de um projeto | **Cérebro → pasta do projeto** | — |
| Código de sincronização e app | **ANTIGRAVITY** | — |

---

## Arquivos-âncora (leia no início)

- `CLAUDE.md` (raiz ORACULO) — identidade + routing do Oráculo
- `STATUS.md` — estado atual / handoff de sessão
- `MEMORIA.md` — aprendizados acumulados
- `cerebro/.../wiki/hot.md` — contexto recente (lido pelo hook SessionStart)
- **este `docs/MAPA-MESTRE.md`** — onde mora cada coisa

---
*Atualize este mapa sempre que uma pasta nova nascer ou mudar de lugar.*
