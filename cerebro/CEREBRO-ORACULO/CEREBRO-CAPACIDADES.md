# 🧠 Capacidades do Cérebro — Firma Abacaxi (12 jun 2026)

Seu vault Obsidian agora é um **sistema de conhecimento vivo**, consultável por qualquer agente IA que você use (Claude Code, Cursor, Cline, etc.).

---

## 📊 O Que o Cérebro Consegue Fazer

### 1. **Buscar e Recuperar Conhecimento**

| Ferramenta | O Que Faz | Exemplo |
|---|---|---|
| **cortex_recall** | Busca fatos, decisões, contexto no seu vault | "Quais foram as decisões sobre o FAC-2026?" |
| **cortex_ask** | Pergunta complexa com resposta sintetizada | "Como relacionamos com clientes audiovisuais?" |
| **cortex_search_entities** | Busca pessoas, projetos, conceitos por nome | Digita "FAC" → acha FAC-2026, FAC Brasília, etc. |
| **cortex_related** | Acha notas conectadas a uma nota específica | Vê `FAC-2026.md` → descobre docs relacionados |
| **cortex_paths** | Traça relações entre dois conceitos | Como a Firma → Clientes → Projetos estão conectados? |

### 2. **Guardar e Lembrar**

| Ferramenta | O Que Faz |
|---|---|
| **cortex_remember** | Guarda um aprendizado/decisão para futuras sessões |
| **cortex_active_note** | Lê a nota que você está vendo em Obsidian agora |
| **cortex_recent_notes** | Lista as notas que você editou recentemente |

### 3. **Explorar e Análisar**

| Ferramenta | O Que Faz |
|---|---|
| **cortex_stats** | Quantas notas/conceitos/relações você tem? |
| **cortex_contradictions** | Acha inconsistências no seu vault (coisas que conflitam) |
| **cortex_suggest_links** | Sugere ligações que você deveria fazer |

### 4. **Sincronizar e Atualizar**

| Ferramenta | O Que Faz |
|---|---|
| **cortex_sync** | Atualiza o índice do grafo com as notas atuais |
| **cortex_sync_status** | Mostra o que mudou desde a última sincronização |
| **cortex_ingest_url** | Pega uma página web e adiciona ao vault |

### 5. **Gerenciar**

| Ferramenta | O Que Faz |
|---|---|
| **cortex_get_note** | Lê o conteúdo completo de uma nota |
| **cortex_delete_note** | Remove uma nota do vault |
| **cortex_rebuild** | Reconstrói índices (embeddings + comunidades) |
| **cortex_dedupe** | Remove entidades duplicadas |

---

## 🎯 O Que Melhoramos Hoje (12 jun 2026)

✅ **HangarX/Cortex ativado em Cloud Mode** — todas as 20 ferramentas acima agora funcionam  
✅ **MCP server iniciado** em `localhost:7474` — Claude Code, Cursor, Cline podem chamar as ferramentas  
✅ **Sincronização completa** — seu vault foi indexado no Cortex Cloud  
✅ **Painel "Ask your vault" aberto** no painel direito do Obsidian — teste uma pergunta  
✅ **Workspace corrigido** — removemos as tabs que não estavam renderizando (3D Graph ghost views)

---

## 🕹️ Como Usar Dentro do Obsidian

### A. Painel "Ask your vault" (Painel Direito)

O painel já está aberto. Use assim:

1. Clique na aba **"Ask your vault"** (painel direito)
2. Digite uma pergunta: *"O que sabemos sobre o projeto FAC-2026?"*
3. Pressione Enter
4. HangarX busca no vault e retorna com **citações** das notas usadas

💡 **Dica:** Pergunte qualquer coisa — o HangarX sabe sobre tudo no seu vault.

### B. Visualizar o Grafo

#### Opção 1: Graph Nativo (2D, rápido)
1. Command Palette: `Ctrl+P` (Windows) ou `Cmd+P` (Mac)
2. Digite: **"Graph view"** ou **"Open graph"**
3. Pressione Enter
4. Vê todas as notas conectadas (pode filtrar por `path:wiki`, `path:04-PROJETOS`, etc.)

#### Opção 2: 3D Graph (imersivo, visual bonito)
1. Command Palette: `Ctrl+P`
2. Digite: **"3D Graph: Open"**
3. Pressione Enter
4. Voilà! Grafo 3D interativo — pode girar, zoomar, passar mouse

#### Opção 3: Extended Graph (análise avançada)
- Mesmo que Graph Nativo, mas com análise extra de comunidades e relações
- Abra via Command Palette: **"Extended Graph"**

### C. Sincronizar seu Vault

Quando você adicionar novas notas e quer que o Cortex reconheça:

1. Command Palette: `Ctrl+P`
2. Digite: **"HangarX: Sync"**
3. Aguarde 2-3 min (incremental — segunda vez é rápida)

### D. Visualizar Notas Recentes

1. Painel direito → aba **"Outline"** (sumário da nota atual)
2. Ou Command Palette: **"Cortex: Recent notes"**

---

## 📈 Estatísticas do Seu Cérebro

Para ver o tamanho do seu grafo de conhecimento:

1. Painel direito → **"Ask your vault"**
2. Pergunte: *"Quantas notas e conceitos eu tenho?"*
3. HangarX retorna: total de entidades, relações, comunidades

---

## 🎨 Próximo Passos Recomendados

1. **Teste uma pergunta no painel "Ask your vault"** — veja como funciona
2. **Abra o 3D Graph** — visualize o conectamento do seu conhecimento
3. **No Claude Code, use HangarX** — exemplo:

```
Baseado no meu vault (via cortex_recall), resuma os principais projetos
ativos da Firma e como eles se relacionam
```

Claude vai automaticamente usar as ferramentas HangarX para buscar no seu vault!

---

## 🔗 Referência Rápida — Atalhos & Comandos

| Ação | Comando |
|---|---|
| Abrir Graph 2D | `Ctrl+P` → "Graph view" |
| Abrir Graph 3D | `Ctrl+P` → "3D Graph: Open" |
| Sincronizar vault | `Ctrl+P` → "HangarX: Sync" |
| Perguntar ao Cérebro | Painel direito → "Ask your vault" |
| Painel de busca | `Ctrl+Shift+F` |
| Buscar arquivo | `Ctrl+P` |
| Abrir recentes | `Ctrl+P` → "Cortex: Recent notes" |

---

## 💡 Dicas Pro

- **Pergunta específica = resposta melhor.** Não "Me conte sobre o projeto". Diga: "Qual é o orçamento aprovado do FAC-2026 e quais são os riscos documentados?"
- **Graph 3D é bonito mas Graph 2D é mais rápido** para buscar algo específico.
- **Sincronize periodicamente** — quanto mais você edita, mais frequente fazer sync.
- **Use `cortex_remember`** no Claude Code para guardar decisões que você quer não esquecer:
  ```
  @claude Lembre: "Decidimos usar Next.js 16 por causa de Server Components"
  ```

---

**Status:** 🟢 Cérebro totalmente ativo e consultável  
**Data:** 12 de junho de 2026  
**Próxima sincronização recomendada:** Quando adicionar notas importantes  

