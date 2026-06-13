# docs/ — Documentação do Sistema Oráculo
## Leia isto primeiro
*Última revisão: 12 jun 2026*

Esta pasta guarda a **documentação de sistema e estratégia** do Oráculo (meta-nível). Conhecimento de negócio, processos e projetos vivem no **vault** (`cerebro/`); dados estruturados vivem no **Notion**. Ver a [Regra de Lar Único](MAPA-MESTRE.md#a-regra-de-lar-único).

---

## Por onde começar (árvore de decisão)

| Quero… | Leia |
|---|---|
| **Saber o que falta fazer** (controle de pendências) | 👉 [PAINEL-MESTRE.md](PAINEL-MESTRE.md) |
| **Como o Oráculo cresce + quais ferramentas** | 👉 [PLANO-MASTER.md](PLANO-MASTER.md) |
| **Saber onde mora cada coisa** (a bússola) | [MAPA-MESTRE.md](MAPA-MESTRE.md) |
| **Entender o que o Oráculo é** (o quê e porquê) | [VISAO-ORACULO.md](VISAO-ORACULO.md) |
| **Usar o Oráculo no dia a dia** (5 modos) | [FLUXO_ORACULO.md](FLUXO_ORACULO.md) |
| **Tarefas táticas da semana** | [PLANO-DE-ACAO.md](PLANO-DE-ACAO.md) |
| **DNA / contexto / preços / fluxo comercial** (completo) | aqui em `docs/` (`CONTEXTO_FIRMA`, `FLUXO_TRABALHO`, `TABELA_PRECOS`, `ARQUITETURA_NOTION`) — síntese navegável no vault |

---

## Os arquivos desta pasta

### Controle e navegação
- **[PAINEL-MESTRE.md](PAINEL-MESTRE.md)** — hub único de pendências (3 trilhas: Firma · Oráculo · Cérebro). **Arquivo-âncora de início de sessão.**
- **[PLANO-MASTER.md](PLANO-MASTER.md)** — 🆕 arquitetura, tabela de ferramentas e passo a passo de expansão (Fases 0-5).
- **[README.md](README.md)** — este guia.
- **[MAPA-MESTRE.md](MAPA-MESTRE.md)** — onde mora cada coisa; a Regra de Lar Único.

### Estratégia e visão
- **[VISAO-ORACULO.md](VISAO-ORACULO.md)** — a constituição (4 domínios, 9 princípios, 5 questões abertas).
- **[FLUXO_ORACULO.md](FLUXO_ORACULO.md)** — os 5 modos de uso no dia a dia.
- **[PLANO-DE-ACAO.md](PLANO-DE-ACAO.md)** — tarefas táticas da semana (documento vivo).

### `_arquivo/` — histórico (referência, não ativo)
Planos absorvidos pelo PLANO-MASTER; consultar só para o how-to detalhado:
- `FASE2_IMPLEMENTACAO.md` — sprints A-E (detalhe de cada um).
- `GUIA-TOOLKIT-2026.md` — guias de instalação passo a passo dos MCPs/ferramentas.
- `PLANO_IMPLEMENTACAO.md` — baseline mai/2026 (automações A1-A5).
- `GUIA_ATIVACAO_MCP.md` — setup inicial de MCP.
- `SUBAGENTES.md` — prompts dos 5 subagentes.

> **Duplicação resolvida (12 jun):** `CONTEXTO_FIRMA.md`, `FLUXO_TRABALHO.md`, `TABELA_PRECOS.md` e `ARQUITETURA_NOTION.md` existiam como cópias byte a byte aqui **e** no vault. Decisão: o **completo é canônico aqui em `docs/`** (é o que o `CLAUDE.md` do sistema lê); a cópia do vault virou **stub** apontando para cá, e o vault mantém a **síntese navegável** de cada tema (`DNA-Firma`, `Fluxo-13-Etapas`, etc.). Ver [Regra de Lar Único](MAPA-MESTRE.md#a-regra-de-lar-único).

---

## Regras de manutenção desta pasta

1. **Naming:** arquivos novos em `HÍFEN-MAIÚSCULO` (ex.: `PAINEL-MESTRE.md`). Os legados em `_UNDERSCORE` serão migrados.
2. **Cabeçalho de data:** todo doc começa com `*Última revisão: AAAA-MM-DD*`.
3. **Sem duplicar:** o documento **completo** vive num lar só (referência completa → `docs/`; síntese navegável → vault). O outro lado é stub ou síntese, nunca cópia. Ver [Regra de Lar Único](MAPA-MESTRE.md#a-regra-de-lar-único).
4. **Pendência cresceu?** O detalhe vai pro plano-fonte; o [Painel](PAINEL-MESTRE.md) mantém só a linha de controle.
