# HangarX — Início Rápido

## 📊 Duas Formas de Ativar

| | **Cloud Mode** | **Docker Local** |
|---|---|---|
| **Tempo** | 5 min | 10 min (first time) |
| **Privacidade** | Cloud Hosted | 100% offline |
| **Setup** | OAuth (browser) | Docker + terminal |
| **Dificuldade** | Fácil | Moderada |
| **Melhor para** | Maioria dos casos | Dados sensíveis |
| **Recomendação** | ✅ **START HERE** | Se privacidade é crítica |

---

## 🚀 Recomendado: Cloud Mode (5 minutos)

Você faz login uma vez e esquece:

1. **Obsidian** → Settings → Community Plugins → HangarX → Enable
2. **HangarX** → Settings → Connection → **Sign in with HangarX**
3. Login rápido em browser → credenciais auto-preenchem
4. Command Palette → **HangarX: Sync** (2-3 min)
5. ✅ Pronto! Pergunta algo no painel "Ask your vault"

[→ Guia detalhado](./HANGARX-SETUP-CLOUD.md)

---

## 🔒 Alternativa: Docker Local (100% privado)

Se seus dados não podem sair da máquina:

1. Abra **Docker Desktop** (se não estiver aberto)
2. PowerShell → vá para a pasta do vault
3. `docker compose -f docker-compose.cortex.yml up -d`
4. Aguarde health check (3-5 min)
5. Obsidian → HangarX → Mode: **Local** → Sync
6. ✅ Pronto!

[→ Guia detalhado](./HANGARX-SETUP-DOCKER.md)

---

## ✅ O Que Você Ganha

Depois de ativar (qualquer modo), HangarX expõe:

### 💬 **Em Obsidian**
- Painel "Ask your vault" — pergunte e receba respostas com citações
- Sincronização automática do seu grafo de conhecimento

### 🤖 **No Claude Code** (+ Cursor, Cline, etc)
- **cortex_recall** — "Qual é a política de preços da Firma?"
- **cortex_remember** — Guardar aprendizados no grafo
- **cortex_neighbors** — Achar arquivos relacionados
- **cortex_paths** — Traçar relações entre conceitos

### 🌐 **No Obsidian Graph**
- Entidades destacadas nas respostas
- Inline wikilink suggestions (enquanto digita)

---

## 🎯 Meu Voto

**→ Comece com Cloud Mode** (link acima)

Razões:
- Sem configuração de Docker
- Login é simples (OAuth)
- Dados vão para servidor HangarX (seguro, HTTPS)
- Se depois quiser offline, migra para Docker facilmente

Se você **não quer seus dados em cloud de forma alguma**, aí sim Docker Local.

---

## ❓ Dúvidas?

- **Docker Desktop não abre:** Veja [Troubleshooting](./HANGARX-SETUP-DOCKER.md#troubleshooting)
- **Já tenho credenciais HangarX:** Pule direto para Obsidian
- **Quer totalmente offline:** Docker Local é o caminho

---

**Próximo passo:** Escolha uma opção acima e siga o guia! 👇
