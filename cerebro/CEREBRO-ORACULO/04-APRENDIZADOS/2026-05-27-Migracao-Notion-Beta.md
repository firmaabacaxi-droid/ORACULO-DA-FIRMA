# 2026-05-27 — Migração do Notion Beta + Documentação Canônica

**Sessão:** 10  
**Status:** ✅ Concluída

---

## O que aconteceu

Durante tentativa de migração de projetos do backup antigo do Notion, descobrimos que o Oráculo estava criando registros em workspaces **descontinuados**:
- ORACULO TESTES (3548a525...)
- ORACULO V7 (3378a525...)

A usuária removeu essas pastas antigas e nos forneceu a URL correta da wiki principal em produção:
- **🔮 ORÁCULO -FIRMA ABACAXi** — https://www.notion.so/3288a52591f381a0885fc20691f28468

---

## Raiz do problema

Faltava documentação explícita sobre qual era o parent correto para criações no Notion. O CLAUDE.md listava bancos mas não deixava claro:
1. **Qual era o workspace canônico** (a wiki principal)
2. **Como usar parent type** no MCP (tipo "page", não "database_id", pois é wiki)
3. **Quais workspaces evitar** (versões antigas)

---

## O que foi resolvido

### 1. Documentação atualizada
- **CLAUDE.md**: Seção "Notion — bancos ativos" → adicionada URL canônica com aviso explícito
- **ARQUITETURA_NOTION.md**: Seção "Parent obrigatório" → detalha parent type correto
- **memory/notion_parent_canonical.md**: Referência persistente para próximas sessões

### 2. Migração executada
- 3 clientes criados (RNP, SIMBIOSE, Tâmara)
- 5 projetos do backup migrados (#16, #08, #10, #14, #15)
- 8 tarefas de projetos vinculadas
- 9 atividades gerais (sem projeto)
- **Total: 3 + 5 + 17 registros**

### 3. Mapeamento de bancos confirmado
Explorou completamente a wiki e obteve IDs/schemas de 6 bancos:
- Projeto 2026 (ba03e1a5...)
- Tarefas (2a3345d3...)
- Clientes (82984a0b...)
- CRM (21759e84...)
- Contatos (cfd457d2...)
- Propostas (3548a525...)

---

## Aprendizado permanente

**Regra: SEMPRE especificar parent canônico em toda documentação técnica.**

Quando sistema tem múltiplos workspaces ou versões:
1. Documentar a URL + ID da versão ativa em CLAUDE.md
2. Listar versões a EVITAR (com motivo)
3. Especificar tipo de parent (page vs database_id vs data_source_id)
4. Criar memory persistente como referência para IAs futuras

**Por que importa:**
- Evita criar registros em workspace errado
- Economiza tempo de debug
- Evita confusão e retrabalho

---

## Próximo passo recomendado

Se houver nova migração de backup ou novo workspace:
1. Atualizar primeiro a documentação (CLAUDE.md + ARQUITETURA_NOTION.md)
2. Depois executar criação via MCP

Isso garante que qualquer IA future/human sabe exatamente para onde criar.
