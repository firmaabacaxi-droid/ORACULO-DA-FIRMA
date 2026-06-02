# Setup — Expansão de MCPs do Oráculo · 21 Mai 2026

**Tipo:** Configuração de sistema
**Sessão:** Pesquisa + planejamento + implementação de MCPs
**Status:** Fase 1 ~85% concluída — falta reiniciar Claude Code e inserir tokens GitHub/Brave Search

---

## O que foi feito nesta sessão

### MCPs configurados no `.mcp.json` (total: 9)

| MCP | Status | Observação |
|---|---|---|
| Notion | ✅ Ativo | 6 bancos da Fase 1 acessíveis |
| Filesystem | ✅ Ativo | Leitura/escrita local |
| DuckDuckGo | ✅ Ativo | Web search gratuito |
| Obsidian | ✅ Configurado | Vault em `cerebro/CEREBRO-ORACULO` |
| NotebookLM | ✅ **Autenticado** | Notebook ID: `f8cfdb26-1cc2-4be0-8ad5-00d304024619` |
| Memory | ✅ Configurado | Ativa sem token — aguarda reinício do Claude Code |
| Sequential Thinking | ✅ Configurado | Ativa sem token — aguarda reinício do Claude Code |
| GitHub | ⚠️ Pendente | Falta inserir token em `.mcp.json` |
| Brave Search | ⚠️ Pendente | Falta inserir token em `.mcp.json` |

### Segundo cérebro — Obsidian + GitHub + NotebookLM

- [x] Obsidian instalado com vault em `cerebro/CEREBRO-ORACULO`
- [x] Plugins: Obsidian Git, Dataview, Templater
- [x] Repositório privado `cerebro-oraculo` criado no GitHub
- [x] Obsidian Git conectado — commit automático a cada 30 min
- [x] NotebookLM notebook criado: **"Oráculo da Firma: AI Operational Intelligence System"**
- [x] NotebookLM indexando o repositório GitHub
- [x] NotebookLM MCP autenticado via Playwright (Chrome headless)

### Aprendizado técnico — login NotebookLM MCP

O MCP usa Playwright (automação de browser) para autenticar via Google. O processo exige:
1. Rodar `uv run notebooklm login` em terminal interativo (não funciona em background)
2. Logar com Google no Chrome que abre automaticamente
3. Pressionar ENTER no terminal quando estiver na página do NotebookLM
4. Sessão salva em `C:\Users\User\.notebooklm\storage_state.json`

O Playwright (v1.57.0) e o Chromium já estão instalados no venv.

---

## Próximos passos

### Imediato (próxima sessão)

1. **Reiniciar Claude Code** → ativa Memory, Sequential Thinking, Obsidian e NotebookLM MCPs
2. **Testar**: pedir ao Oráculo *"lista meus notebooks"* → confirmar NotebookLM respondendo
3. **Token GitHub** → github.com/settings/tokens → scopes `repo` + `read:org` → inserir em `.mcp.json`
4. **Token Brave Search** → brave.com/search/api → inserir em `.mcp.json`
5. **Testar ciclo completo**: Oráculo registra aprendizado → Obsidian → GitHub → NotebookLM

### Fase 2 (semanas 3–4)

- Google Drive MCP (OAuth2)
- Confirmar todos os 9 MCPs funcionando em produção

### Fase 3 (semanas 5–6)

- Renovar token n8n (expirado) → ativa automações A1–A5
- ElevenLabs MCP (~R$25/mês)

---

## Critério de Fase 1 concluída

- [x] Obsidian + GitHub + NotebookLM configurados
- [x] NotebookLM MCP autenticado
- [ ] Reiniciar Claude Code + testar todos os MCPs ativos
- [ ] Token GitHub inserido
- [ ] Token Brave Search inserido
- [ ] Primeira proposta real gerada via Oráculo
- [ ] Proposta registrada no Notion (PROPOSTAS + CRM)

---

#setup #oraculo #mcp #fase-1 #notebooklm #obsidian #github

*Atualizado pelo Oráculo · 21 Mai 2026*
