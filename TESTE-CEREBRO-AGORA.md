# 🧪 Teste Seu Cérebro Agora — 3 Testes Práticos

Tente esses 3 testes para confirmar que tudo está funcionando. Leva ~5 minutos.

---

## Teste 1: Perguntar ao Cérebro no Obsidian

### Passo 1: Abra Obsidian

Se não estiver aberto ainda, abra:
```
c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO
```

### Passo 2: Vá ao painel direito

No canto superior direito do Obsidian, procure a aba **"Ask your vault"** (tem ícone de mensagem)

Se não encontrar, clique na aba **"Cortex Chats"** ou **"Message circle"**.

### Passo 3: Faça uma pergunta

Escreva na caixa de texto:

```
Quantos projetos a Firma tem em 2026?
```

Pressione Enter.

### ✅ Resultado Esperado

HangarX busca no vault e retorna algo como:

```
Baseado no seu vault, a Firma tem os seguintes projetos em 2026:
- FAC-2026: Todas as Histórias do Mundo (R$ 199.300)
- Visite mon Agence: Documentário AFD (R$ 15.871)
- Brasil Participativo: ...

Fontes: FAC-2026.md, Visite-mon-Agence.md, ...
```

✅ **Se viu respostas com citações → FUNCIONANDO**

---

## Teste 2: Visualizar o Grafo 3D

### Passo 1: Command Palette

Pressione `Ctrl+P` (Windows) ou `Cmd+P` (Mac)

### Passo 2: Buscar "3D Graph"

Aparece uma caixa. Digite:
```
3D Graph: Open
```

### Passo 3: Abrir

Quando aparecer **"3D Graph: Open"**, pressione Enter.

### ✅ Resultado Esperado

- Uma nova aba abre com **seu conhecimento em 3D**
- Vê bolinhas (nós) conectadas por linhas (relações)
- Pode girar: click + arraste
- Pode fazer zoom: scroll do mouse
- Cores diferentes para tipos de nós (projetos, clientes, etc.)

✅ **Se vê bolinhas coloridas em 3D interativo → FUNCIONANDO**

---

## Teste 3: Usar no Claude Code

### Passo 1: Abra Claude Code

Abra o terminal ou use:
```
claude
```

### Passo 2: Faça uma pergunta que precisar da informação do vault

Coloque este prompt:

```
@claude Baseado no meu vault (vai ter que usar cortex_recall 
para buscar), resuma os principais stakeholders do projeto 
FAC-2026 e seus papéis.
```

### ✅ Resultado Esperado

Claude Code:
1. Detecta que precisa buscar no vault
2. Chama automaticamente `cortex_recall` 
3. Busca em `localhost:7474` (HangarX MCP)
4. Retorna resposta com citações do vault

Exemplo:
```
Stakeholders do FAC-2026:
- Lipe (Direção de Fotografia) — responsável pela estética visual
- Jaya (Pós-produção) — edição e montagem
- [busca no vault...]

Fontes: FAC-2026/Briefing.md, FAC-2026/Equipe.md
```

✅ **Se Claude usou cortex e buscou no vault → FUNCIONANDO**

---

## 🎯 Scorecard

| Teste | Passou? | Ícone |
|-------|---------|-------|
| 1. Ask your vault | ☐ | 💬 |
| 2. 3D Graph | ☐ | 🔮 |
| 3. Claude Code + cortex | ☐ | 🤖 |

**Se os 3 passaram:** 🎉 **Seu Cérebro está 100% funcional!**

---

## ⚠️ Se Algo Não Funcionar

### "Ask your vault não aparece"
- Painel direito → procure aba com ícone de mensagem
- Ou clique no botão **HangarX** no ribbon esquerdo → **Sync**

### "3D Graph mostra branco/vazio"
- Aguarde ~2 segundos (pode estar carregando)
- Se continuar branco: feche a aba, faça `Ctrl+P` → `3D Graph: Open` novamente
- Último recurso: use Graph 2D nativo (`Ctrl+P` → `Graph view`)

### "Claude Code não encontra cortex"
- Obsidian precisa estar aberto com HangarX habilitado
- MCP server precisa estar em `localhost:7474`
- Verifique: no Obsidian, tente fazer uma pergunta no "Ask your vault" para confirmar que HangarX está ativo

### "Diz que não tem informação sobre [projeto]"
- Faça `HangarX: Sync` (`Ctrl+P` → `HangarX: Sync`)
- Aguarde 2-3 minutos
- Tente novamente

---

## 📞 Suporte

Se nada funcionar, entre em contato com dados:

1. Que teste(s) falharam?
2. Qual foi a mensagem de erro?
3. Obsidian está aberto?
4. Qual versão HangarX? (Settings → HangarX → versão)

---

**Pronto? Comece pelo Teste 1 agora mesmo!** 🚀

Pressione `Ctrl+P` → `Ask your vault` e pergunte algo! 

