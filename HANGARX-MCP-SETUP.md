# Integração HangarX MCP — Setup Pendente

## Status: 🟡 Aguardando Credenciais

O HangarX foi compilado com sucesso no Obsidian, mas a integração MCP com Claude Code depende de credenciais.

---

## O que está pronto

✅ **Plugin HangarX instalado no Obsidian**
- Localização: `.obsidian/plugins/hangarx/`
- main.js compilado
- Mapa de 2709 nós ativo

---

## O que está pendente

❌ **Credenciais HangarX** — arquivo `.obsidian/plugins/hangarx/data.json`

```json
{
  "apiKey": "",              ← VAZIO
  "workspaceId": "",         ← VAZIO
  "mcpToken": "",            ← VAZIO
  "connectionMode": "cloud"
  "mcpPort": 7474
  ...
}
```

---

## Como configurar (quando tiver credenciais)

### Passo 1 — Preencher credenciais no Obsidian
1. Abra Obsidian em `CEREBRO-ORACULO`
2. Settings → Community Plugins → HangarX → Opções
3. Cole `apiKey`, `workspaceId`, e `mcpToken` do seu painel HangarX

### Passo 2 — Registrar MCP no Claude Code (quando credenciais estiverem ativas)
Adicionar ao `.claude/settings.json` do ORACULO:

```json
{
  "permissions": {
    "allow": [
      "mcp__hangarx__cortex_recall",
      "mcp__hangarx__cortex_remember",
      "mcp__hangarx__cortex_neighbors",
      "mcp__hangarx__cortex_paths",
      "mcp__hangarx__cortex_search_entities",
      "mcp__hangarx__cortex_contradictions",
      "mcp__hangarx__cortex_summarize"
    ]
  },
  "mcpServers": {
    "hangarx": {
      "port": 7474
    }
  }
}
```

---

## Próximas ações

1. **Se você tiver acesso ao HangarX Cloud:**
   - Obtenha as credenciais em `https://cortex.hangarx.ai`
   - Preencha em Obsidian (Settings → HangarX)
   - Ative as ferramentas MCP aqui no Claude Code

2. **Se não tiver acesso:**
   - Deixe HangarX como está (funciona localmente no Obsidian)
   - O `/graphify` continua funcionando para visualização
   - MCP fica para depois quando/se tiver credenciais

---

## Ref: Documentação oficial

- [HangarX MCP docs](https://docs.hangarx.ai/mcp)
- `.obsidian/plugins/hangarx/data.json` — config local
- `~/cerebro/CEREBRO-ORACULO/` — vault ativo
