# Próximos passos — Segundo Cérebro

Checklist de configuração do vault + integrações.

---

## PARTE 1 — Obsidian ✅ CONCLUÍDO

- [x] Baixar Obsidian em **obsidian.md**
- [x] Instalar no Windows
- [x] Abrir Obsidian → **"Open folder as vault"**
- [x] Navegar até: `C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\`
- [x] Clicar em **"Open"**
- [x] Aceitar confiar no vault
- [x] Abrir a nota **HOME.md** como ponto de partida

---

## PARTE 2 — Plugins ✅ CONCLUÍDO

- [x] Instalar **Obsidian Git** → para sincronizar com GitHub
- [x] Instalar **Dataview** → para queries nas notas
- [x] Instalar **Templater** → para criar notas a partir de templates

---

## PARTE 3 — GitHub ✅ CONCLUÍDO

- [x] Criar repositório **privado** `cerebro-oraculo`
- [x] Conectar Obsidian Git ao repositório
- [x] Configurar commit automático a cada 30 minutos

---

## PARTE 4 — Google NotebookLM ✅ CONCLUÍDO

- [x] Criar notebook **"Cérebro Firma Abacaxi"** em notebooklm.google.com
- [x] Conectar fonte GitHub → repositório `cerebro-oraculo`
- [x] NotebookLM indexando o repositório

**O que o Oráculo pode fazer com o NotebookLM MCP:**
- Fazer perguntas direto ao notebook (consultando as fontes do GitHub)
- Adicionar novas fontes de texto automaticamente
- Gerar Audio Overview (Deep Dive podcast) dos projetos
- Gerar Slide Decks e Mind Maps
- Listar e criar notebooks

**Pré-requisito pendente:** Autenticar o MCP uma vez:
```
cd C:\Users\User\mcp-servers\notebooklm-mcp
uv run notebooklm login
```
Depois reiniciar Claude Code.

---

## PARTE 5 — Autenticar NotebookLM MCP ✅ CONCLUÍDO

- [x] Playwright (Chromium) instalado
- [x] `uv run notebooklm login` executado com sucesso
- [x] Sessão salva em `C:\Users\User\.notebooklm\storage_state.json`
- [x] Autenticação verificada: notebook **"Oráculo da Firma"** encontrado
- [ ] **Reiniciar Claude Code** para ativar o MCP na sessão ← fazer agora

---

## PARTE 6 — Testar o ciclo completo ← PRÓXIMO PASSO

*(Fazer após reiniciar o Claude Code)*

- [ ] Reiniciar Claude Code
- [ ] Pedir ao Oráculo: *"lista meus notebooks no NotebookLM"* → confirmar que o MCP responde
- [ ] Pedir ao Oráculo: *"registra o aprendizado do último projeto no cérebro"*
- [ ] Verificar no Obsidian se a nota apareceu em **05-APRENDIZADOS/**
- [ ] Aguardar o commit automático do Obsidian Git (até 30 min)
- [ ] Verificar no NotebookLM se a nova nota foi indexada

---

## Resultado esperado

```
Projeto finalizado
    ↓
Oráculo pergunta sobre aprendizados
    ↓
Salva nota em 05-APRENDIZADOS/ (automático)
    ↓
Obsidian Git commita para GitHub (automático, 30min)
    ↓
NotebookLM sincroniza (automático)
    ↓
Próximo projeto: Oráculo já sabe o que funcionou antes
```

---

## PARTE 7 — MCPs adicionais (Claude Code)

Após concluir as Partes 1–5, adicionar estas conexões ao Oráculo.

### Fase 1 — MCPs pendentes

**GitHub MCP** — permite ao Oráculo commitar e consultar o repositório diretamente
- [ ] Gerar token em **github.com/settings/tokens** → scopes: `repo`, `read:org`
- [ ] Abrir `.mcp.json` → substituir `INSERIR_TOKEN_AQUI` no bloco `"github"`
- [ ] Reiniciar Claude Code

**Memory MCP** — já configurado, ativa sem token
- [ ] Reiniciar Claude Code
- [ ] Testar: pedir ao Oráculo para registrar a Firma Abacaxi como entidade

**Obsidian MCP** — já configurado no `.mcp.json` ✅
**NotebookLM MCP** — ✅ autenticado, notebook ID: `f8cfdb26-1cc2-4be0-8ad5-00d304024619`

### Fase 2 — Semanas 3–4

**Brave Search** — upgrade do DuckDuckGo, resultados mais precisos (2.000 buscas/mês grátis)
- [ ] Criar conta em **brave.com/search/api/**
- [ ] Gerar API key gratuita
- [ ] Substituir `INSERIR_TOKEN_AQUI` no bloco `"brave-search"` do `.mcp.json`
- [ ] Reiniciar Claude Code

**Sequential Thinking MCP** — raciocínio estruturado para propostas complexas
- [ ] Já configurado no `.mcp.json` — basta reiniciar Claude Code

**Google Workspace MCP** ⭐ MAIOR IMPACTO — Gmail + Calendar + Drive + Sheets + Docs
- [ ] Criar projeto no Google Cloud Console
- [ ] Habilitar APIs: Gmail, Calendar, Drive, Sheets, Docs
- [ ] Gerar credenciais OAuth2 (client_id + client_secret)
- [ ] Instalar repositório: `taylorwilsdon/google_workspace_mcp`
- [ ] Adicionar bloco ao `.mcp.json`
- [ ] Reiniciar Claude Code e testar

**WhatsApp MCP** — atendimento direto via WhatsApp do Lipe
- [ ] Clonar repositório: `lharries/whatsapp-mcp`
- [ ] Instalar dependências Python
- [ ] Autenticar via QR Code (WhatsApp Web)
- [ ] Adicionar bloco ao `.mcp.json`

**ElevenLabs MCP** (oficial) — voice-over para projetos com narração
- [ ] Assinar plano Starter (~R$25/mês) em **elevenlabs.io**
- [ ] Instalar: `npx @elevenlabs/elevenlabs-mcp`
- [ ] Adicionar bloco ao `.mcp.json` com `ELEVENLABS_API_KEY`

### Fase 3 — Semanas 5–6

**n8n MCP** (renovar token expirado)
- [ ] Acessar painel n8n → Settings → API Keys → criar novo token
- [ ] Atualizar `.mcp.json` com novo `N8N_API_KEY`

**n8n Builder MCP** — documentação de 1.650+ nós para construir automações sem erro
- [ ] Instalar: `npx czlonkowski/n8n-mcp`
- [ ] Adicionar bloco ao `.mcp.json`
- [ ] Usar para construir automações A1–A5 do roadmap

**n8n Workflow Builder MCP** — criar workflows n8n por linguagem natural
- [ ] Instalar repositório: `salacoste/mcp-n8n-workflow-builder`
- [ ] Adicionar bloco ao `.mcp.json`
- [ ] Testar: descrever automação A1 (Briefing → Projeto Notion) e gerar o workflow

**Ayrshare MCP** — publicação automática em 13 redes sociais
- [ ] Criar conta em **ayrshare.com** (plano gratuito para testar)
- [ ] Instalar repositório: `vanman2024/ayrshare-mcp`
- [ ] Conectar Instagram, LinkedIn e YouTube
- [ ] Testar publicação via Oráculo

### Fase 4 — Semanas 7–8

**Telegram MCP** — Oráculo acessível no celular
- [ ] Instalar repositório: `chigwell/telegram-mcp` (Python/Telethon)
- [ ] Autenticar com número de telefone do Telegram
- [ ] Adicionar bloco ao `.mcp.json`

**FFmpeg MCP** — edição e conversão de vídeo/áudio direto do chat
- [ ] Verificar se FFmpeg está instalado: `ffmpeg -version`
- [ ] Instalar repositório: `misbahsy/video-audio-mcp`
- [ ] Adicionar bloco ao `.mcp.json`
- [ ] Testar: converter clipe para formato Instagram Reels

### Fase 5 — Mês 3+ (escala)

**Google Veo2 MCP** — geração de vídeo com IA para propostas
- [ ] Criar projeto no Google Cloud Console com acesso ao Veo2
- [ ] Instalar repositório: `mario-andreschak/mcp-veo2`
- [ ] Adicionar bloco ao `.mcp.json`

**Creatify MCP** — avatar videos e AI shorts para conteúdo escalável
- [ ] Criar conta em **creatify.ai**
- [ ] Instalar repositório: `TSavo/creatify-mcp`
- [ ] Adicionar bloco ao `.mcp.json`

---

## CRITÉRIO DE CONCLUSÃO — Fase 1

A Fase 1 está completa quando todos estes itens estiverem marcados:

- [ ] Proposta gerada e salva em `output/propostas/`
- [ ] Proposta registrada no Notion (PROPOSTAS + CRM atualizado)
- [ ] MEMORIA.md atualizado com aprendizado de projeto real
- [ ] GitHub MCP commitando mudanças automaticamente
- [x] Obsidian sincronizando com GitHub via Obsidian Git
- [x] NotebookLM indexando o repositório
- [x] NotebookLM MCP autenticado e funcionando
- [ ] Memory MCP com pelo menos 1 cliente registrado como entidade

---

*Atualizado pelo Oráculo · Mai 2026*
