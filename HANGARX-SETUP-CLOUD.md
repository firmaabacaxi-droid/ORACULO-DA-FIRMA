# HangarX — Cloud Mode Setup (60 segundos)

## Passo 1: Abrir Obsidian

1. Abra Obsidian no vault `CEREBRO-ORACULO`

## Passo 2: Ativar HangarX

1. Settings (engrenagem no canto inferior esquerdo)
2. Scroll até "Community Plugins"
3. Procure **HangarX** na lista
4. **Enable** (ligar o switch)

## Passo 3: Configurar Cloud Mode

1. Settings → **HangarX**
2. Na aba **Connection**:
   - Mode: **Cloud (hosted)**
   - Clique em **Sign in with HangarX**

3. Uma aba do browser abre → **Faça login ou crie conta** em https://cortex.hangarx.ai
   - Email: `firmaabacaxi@gmail.com` (recomendado)
   - Senha: a que você quiser

4. **Aprove** o acesso do plugin
5. De volta ao Obsidian, as credenciais aparecem automaticamente:
   - `apiKey` — preenchida ✅
   - `workspaceId` — preenchida ✅
   - `mcpToken` — preenchida ✅

## Passo 4: Sincronizar Vault

1. Command Palette: `Ctrl+P` (Windows) ou `Cmd+P` (Mac)
2. Busque **HangarX: Sync**
3. Aguarde ~2-3 min (primeira sincronização é maior)

## Passo 5: Ativar MCP no Claude Code

Quando a sincronização terminar, o HangarX MCP estará ativo em `localhost:7474`. 

Nada precisa ser feito aqui — o Plugin já expõe o MCP automaticamente.

---

## ✅ Pronto!

Agora você pode usar:
- **Em Obsidian:** Panel "Ask your vault" na aba direita
- **Em Claude Code:** Ferramentas `cortex_recall`, `cortex_remember`, etc.
- **Em Cursor/Cline:** Mesmo MCP disponível

**Tempo total:** 5 minutos (incluindo login e sincronização)

---

**Alternativa:** Se preferir totalmente offline, use [Opção B (Docker Local)](./HANGARX-SETUP-DOCKER.md) — mas precisa de Docker Desktop rodando.
