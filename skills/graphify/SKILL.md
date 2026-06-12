# /graphify — Visualizador de Grafo do Cérebro

Abre a visualização interativa do grafo de conhecimento Obsidian (2709 nós, 7973 arestas, 98 comunidades).

## Como funciona

Quando você digita `/graphify`:

1. **Verifica** se o servidor `server-graphify.py` está rodando em `localhost:8000`
2. **Se não estiver:** inicia o servidor em background (PowerShell)
3. **Abre** `http://localhost:8000` no seu navegador padrão
4. **Entrega** a URL para você interagir com o grafo

## Controles no navegador

```
Zoom:      scroll do mouse
Pan:       clique + arraste
Filtro:    clique em nós
Busca:     Ctrl+F (browser native)
```

## Arquivos

- **Servidor:** `c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\server-graphify.py`
- **Saída:** `c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO\graphify-out\`
  - `graph.html` — visualização interativa 3D
  - `GRAPH_REPORT.md` — relatório textual da análise (2709 nós, comunidades)
  - `graph.json` — dump bruto do grafo

## Comando

```
/graphify
```

Sem argumentos — abre a visualização com o servidor automático.

---

**Status:** Produção · Disponível desde jun/2026  
**Dependências:** Python 3.7+, `http.server` (stdlib)
