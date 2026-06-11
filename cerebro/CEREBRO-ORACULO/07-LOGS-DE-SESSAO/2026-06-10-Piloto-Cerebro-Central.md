# Sessão 20 — Piloto Cérebro-Central + Captura Mobile

**Data:** 2026-06-10  
**Duração:** ~2h  
**Foco:** Estratégia de arquitetura de dados + implementação do piloto

---

## Contexto da Sessão

Lipe trouxe uma dúvida estratégica importante: faz sentido centralizar tudo no cérebro (Obsidian/GitHub) e sair do Notion? A motivação principal era eliminar o retrabalho de atualizar dois sistemas e ter uma visualização mais fácil na rua.

Após pesquisa e análise, a decisão foi de um **piloto de 2–4 semanas** migrando CRM e TAREFAS para o cérebro, mantendo o Notion intacto.

---

## O Que Foi Feito

### Pesquisa (pré-decisão)
- Pesquisado Obsidian Bases (recurso nativo 2026) — substitui views do Notion (tabela, kanban, gallery)
- Pesquisado sync Android: obsidian-git funciona no mobile, alternativa Obsidian Sync (US$4/mês)
- Pesquisado bots Telegram → Obsidian via n8n e GitHub API — solução madura disponível

### Decisão registrada
- `docs/DECISAO_ARQUITETURA_DADOS.md` — análise completa prós/contras, critérios do piloto, data de revisão: **01/07/2026**

### Piloto implementado — `cerebro/CEREBRO-ORACULO/08-BASES/`
- **CRM.base** — 2 views (tabela + kanban por Status)
- **TAREFAS.base** — 3 views (tabela + kanban + agrupado por projeto)
- **6 registros CRM** migrados do Notion (lidos via MCP, somente leitura no Notion)
- **18 registros TAREFAS** migrados do Notion com todos os campos
- `_COMO-USAR.md` — guia de uso + templates para novos registros

### Documentação criada
- `docs/GUIA_MOBILE_ANDROID.md` — passo a passo Android (Termux + obsidian-git + tokens)
- `docs/workflows/captura_telegram_n8n.md` — blueprint da captura rápida
- `docs/workflows/captura_telegram_n8n.json` — workflow pronto para importar no n8n

### Atualizações de sistema
- `CLAUDE.md` — adicionada referência ao 08-BASES e docs de decisão/workflow
- `STATUS.md` — sessão 20 registrada

---

## Decisões Tomadas

| Decisão | Justificativa |
|---|---|
| **Piloto CRM + TAREFAS (não migração total)** | Bancos complexos (PROJETO, ORÇAMENTO, FINANCEIRO) têm rollups que não migram sem risco |
| **Notion permanece ativo durante piloto** | Zero risco de perda de dados |
| **Android via obsidian-git (grátis)** | Evita custo adicional do Obsidian Sync |
| **Captura via Telegram + n8n** | Fluxo assíncrono — não depende de sessão Claude aberta |
| **Data de revisão: 01/07/2026** | 3 semanas de uso real antes de decidir ampliar a migração |

---

## O Que NÃO Foi Feito (e por quê)

- ❌ Deploy n8n — depende de infraestrutura do Lipe (VPS ou n8n Cloud)
- ❌ Cancelar Notion — aguardando resultado do piloto
- ❌ Migrar PROJETO_2026, ORÇAMENTO, FINANCEIRO — rollups complexos, alto risco
- ❌ Dashboard HTML — reavaliado pós-piloto

---

## Próximos Passos

1. **Lipe instala Obsidian no Android** → `docs/GUIA_MOBILE_ANDROID.md`
2. **Lipe instala plugins:** Kanban Bases View (Community plugins → buscar)
3. **Usar 08-BASES no dia a dia** durante 2–4 semanas
4. **01/07/2026:** Revisão dos critérios do piloto → decisão sobre migração ampla
5. **n8n (Fase 3):** Setup do bot Telegram quando tiver infraestrutura (VPS ou n8n Cloud ~€20/mês)

---

## Arquivos Criados/Modificados

```
docs/
├── DECISAO_ARQUITETURA_DADOS.md    ✅ novo
├── GUIA_MOBILE_ANDROID.md          ✅ novo
└── workflows/
    ├── captura_telegram_n8n.md     ✅ novo
    └── captura_telegram_n8n.json   ✅ novo

cerebro/CEREBRO-ORACULO/
├── 08-BASES/
│   ├── _COMO-USAR.md               ✅ novo
│   ├── CRM/
│   │   ├── CRM.base                ✅ novo
│   │   └── CRM-1 a CRM-6.md       ✅ 6 arquivos novos
│   └── TAREFAS/
│       ├── TAREFAS.base            ✅ novo
│       └── TAR-*.md                ✅ 18 arquivos novos
└── 07-LOGS-DE-SESSAO/
    └── 2026-06-10-Piloto-Cerebro-Central.md  ✅ este arquivo

CLAUDE.md   ✅ atualizado
STATUS.md   ✅ atualizado
```

*Sessão 20 concluída — 10 Jun 2026 · Oráculo v2.3*
