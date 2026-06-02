# Revisão Completa da Arquitetura do Oráculo — Sessão 8

**Data:** 2026-05-25
**Tipo:** Operacional
**Sessão:** 8

---

## O que aconteceu

Sessão de revisão estruturada da arquitetura do Oráculo. Auditoria completa de todos os documentos, resolução de inconsistências acumuladas nas Sessões 1–7, e reestruturação seguindo melhores práticas de CLAUDE.md.

---

## Problemas resolvidos

### Conflito de margem mínima
- **Antes:** Documentos divergiam — 20% em uns, 35% em outros
- **Depois:** Regra única e diferenciada — 35% (novo cliente) · 20% (recorrente/parceiro)
- **Arquivos corrigidos:** CONTEXTO_FIRMA.md, TABELA_PRECOS.md, MEMORIA.md, memória de feedback

### STATUS.md desatualizado
- Estava parado na Sessão 4 (Mai 2026)
- Reescrito completamente para refletir a Sessão 8: infraestrutura, bancos, skills, templates, propostas geradas

### CLAUDE.md muito verboso e com informação errada
- Removida nota "Subagentes desatualizados" (system prompts estão prontos em docs/arquivo/SUBAGENTES.md)
- Etapa 0 (Marketing) promovida para primeiro item do routing
- Seção Antigravity convertida de bloco de 60 linhas para tabela compacta
- Adicionado Protocolo de Finalização de Sessão

---

## Estrutura criada — .claude/rules/

Nova pasta com 4 arquivos modulares seguindo melhores práticas do Claude Code:

| Arquivo | Conteúdo |
|---|---|
| `financeiro.md` | Margem, NF, descontos, diárias — referenciado em propostas |
| `antigravity.md` | 15 skills com casos de uso detalhados |
| `notion-schema.md` | 6 bancos Fase 1 com IDs + 10 bancos Fase 2+ |
| `skills-routing.md` | Routing detalhado de todas as 7 skills |

---

## Aprendizado principal

**Documentação viva precisa de protocolo de encerramento.** Sem um ritual de finalização, a documentação fica desatualizada em poucas sessões. O Protocolo de Finalização de Sessão (STATUS + MEMORIA + Obsidian + git) resolve isso.

**CLAUDE.md funciona melhor com regras mecânicas do que com prosa descritiva.** Tabelas, listas de trigger, paths explícitos — o agente segue melhor do que texto longo explicativo.

---

## Próximas sessões

1. Criar subagentes no claude.ai (system prompts em docs/arquivo/SUBAGENTES.md)
2. Cadastrar clientes reais no Notion
3. Iniciar Fase 2 (Google Drive MCP + Frame.io + site)

---

*Registrado por: Oráculo | Sessão 8 | 25 Mai 2026*
