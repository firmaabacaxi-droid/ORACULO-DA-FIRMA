# Sessão 27 — PLANO-MASTER + Faxina da Documentação
*13 Jun 2026 (continuação de 12 jun) · Firma Abacaxi · Oráculo*

---

## Objetivo
Criar um único plano master de arquitetura e ferramentas, consolidar 9+ planos dispersos e fazer faxina nos documentos operacionais verbosos.

## Criado

### `docs/PLANO-MASTER.md`
- Tabela de 54 ferramentas (6 categorias: MCPs, Imagem/Vídeo IA, Áudio, Produção audiovisual, Automação n8n, Web)
- Fases 0-5 de expansão com custos (Fase 2: +R$160/mês, Fase 3: +R$270/mês)
- Integração Adobe: Firefly boards, edição de imagem, quick-cut, Premiere via pymiere (Fase 3)
- Desenvolvimento do Cérebro: wiki/areas, pipeline de estudos do Felipe, 5 questões abertas
- Mapa de migração (proveniência de cada info absorvida)

### Arquivado em `docs/_arquivo/`
- FASE2_IMPLEMENTACAO.md · GUIA-TOOLKIT-2026.md · GUIA_ATIVACAO_MCP.md · PLANO_IMPLEMENTACAO.md · SUBAGENTES.md
- Todos com banner histórico + link para PLANO-MASTER

### Stubs criados no vault
- `01.2-DNA-E-VENDAS/Roadmap.md` → PLANO-MASTER §3
- `01.1-DIRETRIZES-GERAIS/PROXIMOS-PASSOS.md` → PLANO-MASTER §5
- `01.1-DIRETRIZES-GERAIS/CLAUDE.md` → `.claude/CLAUDE.md` (era cópia byte-a-byte)

## Enxugado

| Arquivo | Antes | Depois |
|---------|-------|--------|
| `STATUS.md` | 1.178 linhas | ~80 linhas (estado atual + 3 sessões + pointer) |
| `Manual-Oraculo-v1.md` | 627 linhas | ~50 linhas (tabela de canônicos + Glossário) |
| `GUIA_ORACULO.md` | 444 linhas | 448 linhas (nota adicionada, guia funcional preservado) |

## Atualizado
- `docs/PAINEL-MESTRE.md` · `docs/MAPA-MESTRE.md` · `docs/README.md` — apontam ao PLANO-MASTER
- `wiki/hot.md` — Sessão 27 + próximos passos atualizados
- Log de Sessão 24 (12 jun) criado em 07-LOGS-DE-SESSAO/

## Estado pós-sessão
- `docs/` tem 5 âncoras limpas: VISAO · MAPA · PAINEL · PLANO-MASTER · README + referências estáveis
- Vault: sem duplicatas byte-a-byte com docs/
- STATUS.md: retrato do agora (~80 linhas), não histórico acumulado
