# HangarX — Docker Local Setup (Totalmente privado)

**Status:** ⏳ Requer Docker Desktop rodando  
**Arquivo Docker gerado:** `docker-compose.cortex.yml` (já criado no vault)

---

## Pré-requisito: Docker Desktop

1. **Verifique se está instalado:**
   ```powershell
   docker --version
   ```

2. **Se não estiver:**
   - Download: https://www.docker.com/products/docker-desktop/
   - Instale e **inicie Docker Desktop** (pode levar 1-2 min na primeira vez)
   - Aguarde até ver ícone do Docker na bandeja do sistema (verde = pronto)

3. **Verifique conexão:**
   ```powershell
   docker ps
   ```
   Se retornar uma lista (vazia está ok), Docker está pronto.

---

## Passo 1: Verificar Arquivo Docker

O arquivo `docker-compose.cortex.yml` já foi gerado em:
```
c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO\
```

Este arquivo contém:
- ✅ FalkorDB (graph store)
- ✅ PostgreSQL (vector store)
- ✅ Cortex API (LLM + MCP)
- ✅ GEMINI_API_KEY preenchida
- ✅ MCP habilitado na porta 7474

---

## Passo 2: Iniciar Containers

**Via terminal (PowerShell):**

```powershell
cd "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO"
docker compose -f docker-compose.cortex.yml up -d
```

Aguarde ~3-5 min na primeira vez (puxa imagens ~1.5GB).

**Via Claude Code (passe este prompt):**

```text
Meu HangarX está configurado para modo local com Docker.
Arquivo: C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO\docker-compose.cortex.yml

1. Verifique se Docker Desktop está rodando: docker ps
2. Se não estiver, abra Docker Desktop e aguarde 30s
3. Inicie o stack: docker compose -f docker-compose.cortex.yml up -d
4. Aguarde health check (falkordb + postgres + cortex-api)
5. Verifique status: docker compose -f docker-compose.cortex.yml ps
```

---

## Passo 3: Verificar Health

```powershell
docker compose -f docker-compose.cortex.yml ps
```

Todos os 3 containers devem estar em estado **Up**:
- cortex-falkordb → Up (pronto)
- cortex-postgres → Up (pronto)
- cortex-api → Up (pronto)

Se algum estiver "restarting" ou "exited", aguarde 10 segundos e verifique novamente.

---

## Passo 4: Configurar Obsidian

1. Abra Obsidian em `CEREBRO-ORACULO`
2. Settings → **HangarX**
3. Connection → Mode: **Local (docker)**
4. Em **LLM provider keys**, já tem Google Gemini preenchido ✅
5. Clique **Save to vault** (confirma que você quer usar local mode)
6. Abra Command Palette: `Ctrl+P` → **HangarX: Sync**

Aguarde ~2-3 min (primeira sincronização é grande).

---

## Passo 5: Testar MCP

### No Obsidian:
- Abra painel direito → **Ask your vault**
- Pergunte algo: "O que é o projeto FAC-2026?"
- Deve retornar respostas com citações do seu vault

### No Claude Code:
O MCP estará disponível automaticamente em `localhost:7474` com ferramentas:
- `cortex_recall` — Buscar notas por pergunta
- `cortex_remember` — Guardar novo aprendizado
- `cortex_neighbors` — Achar notas relacionadas
- `cortex_paths` — Traçar relações entre conceitos

---

## Parar/Reiniciar

**Parar:**
```powershell
docker compose -f docker-compose.cortex.yml down
```

**Reiniciar:**
```powershell
docker compose -f docker-compose.cortex.yml restart
```

**Limpar dados (⚠️ deleta índices):**
```powershell
docker compose -f docker-compose.cortex.yml down -v
```

---

## Troubleshooting

**"unable to get image"**
- Docker Desktop não está rodando
- Solução: Abrir Docker Desktop (ícone na bandeja)

**"connection refused on port 7474"**
- cortex-api ainda está iniciando
- Solução: Aguarde 30s e tente novamente

**"out of memory"**
- Docker precisa de mais RAM
- Solução: Settings → Resources → Aumentar memoria para 4GB+

---

## Alternativa (Mais fácil): Cloud Mode

Se Docker ficar complicado, use [Cloud Mode](./HANGARX-SETUP-CLOUD.md) — é só login OAuth, 60 segundos.
