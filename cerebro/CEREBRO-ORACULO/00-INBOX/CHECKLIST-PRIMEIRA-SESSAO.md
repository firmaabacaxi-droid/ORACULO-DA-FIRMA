# Checklist: Primeira Sessão com claude-obsidian (Automatizado)

*Depois que tudo foi configurado, isto é o que você faz na primeira sessão.*

---

## ✅ Antes de começar (Setup)

- [ ] Abra Obsidian → "Open vault" → `C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO`
  - Verifique: pastas têm cores (yellow=projetos, green=áreas, blue=resources)
  - Verifique: `skills/`, `hooks/` ocultos do explorador
  - Verifique: CSS snippet "vault-colors" está ativado (Settings → Appearance)

- [ ] Abra Claude Code **neste diretório** (File → Open Folder → CEREBRO-ORACULO)

- [ ] Terminal (ou no Claude Code): registre os hooks
  ```bash
  cd "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO"
  claude hooks set hooks/hooks.json
  ```
  (ou se preferir, aceite quando Claude Code pedir permissão)

- [ ] Teste git:
  ```bash
  git log --oneline | head -3
  # Deve mostrar commits recentes
  ```

---

## 🚀 Primeira Sessão (Pronta!)

### 1. Abra Claude Code

```
Você abrir Claude Code neste diretório
```

### 2. Observe a inicialização automática

O Oráculo fará isto **sem você pedir**:

```
[SessionStart hook]
- Lendo wiki/hot.md... ✓
- Detectando modo PARA... ✓
- Carregando CLAUDE.md... ✓
- Estado do vault: [resumo]

Bem-vindo de volta à Firma Abacaxi!
Contexto recente carregado.

O que você gostaria de fazer?
- /wiki (verificar estrutura)
- ingerir um arquivo
- pesquisar tema novo
- consultar projeto específico
```

### 3. Teste comando `/wiki`

**Digite:**
```
/wiki
```

**O Oráculo responde:**
```
✓ Wiki em modo PARA detectado
✓ Estado: 7 projetos, 4 áreas, documentação estruturada
✓ Hot.md atualizado em [data]

Próximos passos:
1. Ingerir novo conhecimento
2. Consultar projeto
3. Pesquisar tema
4. Gerar canvas visual
```

### 4. Teste absorção (core feature)

**Diga:**
```
Leia o briefing mais recente de 04-PROJETOS-ATIVOS/FAC-2026/00-INDEX.md
```

**Oráculo lê.**

**Você diz:**
```
Absorva isso no wiki.
```

**O Oráculo:**
- ✅ Cria/atualiza `wiki/projects/FAC-2026.md`
- ✅ Extrai entidades, conceitos, cronograma
- ✅ Atualiza `wiki/index.md`
- ✅ **Auto-commit no GitHub** (você vê a mensagem "commit: wiki: absorção FAC-2026...")
- ✅ Atualiza `wiki/hot.md` com novo contexto

**Resultado visível:**
```
[no terminal]
$ git log --oneline | head -3
abc1234 wiki: absorção FAC-2026 — 07 jun 21:45
def5678 wiki: setup inicial — 07 jun 18:00
...
```

### 5. Teste NotebookLM sincronização

**Você verifica:**
- Abra NotebookLM
- Vá para fonte "GitHub: [seu repositório]"
- Verifique: "Last synced: [agora]"
- Abra o chat e pergunte:
  ```
  O que mudou no FAC-2026?
  ```
- NotebookLM responde com base em wiki/hot.md + seus PDFs

---

## 🎯 Padrões de Uso (Próximas Sessões)

### Padrão 1: Absorção rápida
```
1. "Atualizei o roteiro do VMA, leia?"
2. Oráculo lê
3. "Absorva"
4. ✓ Feito, auto-commit, hot.md atualizado
```

### Padrão 2: Pesquisa autônoma
```
1. "Pesquise editais para documentário em 2026"
2. Oráculo executa /autoresearch
3. ✓ Cria páginas wiki, auto-commit
4. "E agora?" → Oráculo oferece síntese ou canvas
```

### Padrão 3: Consulta com contexto
```
1. "Como está o orçamento do FAC vs. SOBRE2026?"
2. Oráculo lê hot.md + wiki/projects/FAC-2026.md
3. "Comparado ao clientes históricos, é competitivo?"
4. Oráculo consulta wiki/resources/pessoas/ + NotebookLM
5. Responde com análise completa
```

### Padrão 4: Síntese para NotebookLM
```
1. "Gere resumo de tudo que aprendemos sobre captação"
2. Oráculo cria wiki/areas/Captacao-Aprendizados.md
3. "Absorva"
4. Auto-commit → NotebookLM sincroniza
5. Você pede ao NotebookLM: "Áudio de 5 min sobre isso"
6. Studio gera áudio profissional
```

---

## 📊 Métricas de Sucesso (1a Semana)

- ✅ Hot.md relido automaticamente toda sessão
- ✅ Pelo menos 3 absorções feitas ("absorva isso")
- ✅ 3+ commits automáticos no GitHub
- ✅ NotebookLM mostra conteúdo atualizado
- ✅ Pelo menos 1 pergunta respondida via NotebookLM chat
- ✅ 1 áudio gerado no Studio

---

## 🚨 Se algo não funcionar

### Hot.md não está sendo lido
- Verifique: `hooks/hooks.json` está registrado? → `claude hooks set hooks/hooks.json`
- Verifique: CLAUDE.md existe na raiz do vault?
- Solução: Reinicie Claude Code

### Auto-commit não funciona
- Verifique: Git está configurado? → `git config --list`
- Verifique: Existe `.git` na raiz do vault? → `ls -la .git`
- Solução: `git init` + `git config user.name "You"` + `git config user.email "you@example.com"`

### NotebookLM não sincroniza
- Verifique: Repo URL está certo? (`https://github.com/[user]/[repo]`)
- Verifique: Repo é público ou você tem acesso?
- Solução: Remova a fonte GitHub em NotebookLM e re-adicione

### Cores não aparecem no Obsidian
- Verifique: Settings → Appearance → "vault-colors" está ativado?
- Solução: Settings → Snippets → Enable "vault-colors" → Reload CSS

---

## 📝 Registre sua primeira sessão

Depois que tudo funcionar, diga ao Oráculo:

```
Registre esta primeira sessão bem-sucedida em 07-LOGS-DE-SESSAO/
```

O Oráculo cria:
```
07-LOGS-DE-SESSAO/2026-06-07-Claude-Obsidian-Setup-Sucesso.md
```

Com:
- O que foi testado
- O que funcionou
- Próximas melhorias
- Auto-commit

---

## 🎉 Quando tudo estiver funcionando

Você tem um sistema onde:
- 🧠 Tudo que você aprende fica estruturado automaticamente
- 📚 NotebookLM te oferece insights baseados em tudo
- 🔄 Nenhum commit manual, nenhuma sincronização manual
- 💡 O Oráculo sabe tudo, sem você ter que repetir

**Próximas 100 sessões:** Você nunca vai reinventar a roda.

---

*Bem-vindo ao futuro do segundo cérebro! 🚀*
