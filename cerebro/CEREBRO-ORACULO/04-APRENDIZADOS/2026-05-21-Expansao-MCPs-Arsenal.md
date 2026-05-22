# Expansão do Arsenal — Novos MCPs e Skills · 21 Mai 2026

**Tipo:** Pesquisa estratégica de ferramentas
**Sessão:** Mapeamento completo de MCPs GitHub + Skills disponíveis
**Status:** Pesquisa concluída — execução programada por fases

---

## Contexto

Após configurar os 9 MCPs iniciais da Fase 1, foi feita uma pesquisa no GitHub para identificar os melhores MCPs e skills disponíveis alinhados ao fluxo real da Firma Abacaxi. O objetivo é tornar o Oráculo progressivamente mais autônomo: do atendimento ao cliente até a publicação nas redes sociais.

---

## Novos MCPs encontrados — por prioridade de instalação

### FASE 2 — Instalar agora (semanas 3–4)

#### 1. Google Workspace MCP ⭐⭐⭐ MAIOR IMPACTO
- **Repo:** `taylorwilsdon/google_workspace_mcp`
- **Instala via:** Python / pip (OAuth2)
- **O que faz:** Gmail + Google Calendar + Drive + Docs + Sheets + Contacts + Forms + Tasks — tudo num único servidor. Com Remote OAuth2.1 multi-usuário.
- **Por que é crítico:** Elimina o trabalho manual da Jaya. O Oráculo lê e-mails de clientes, cria eventos de filmagem no Calendar, organiza arquivos de projeto no Drive e preenche planilhas financeiras. É o MCP mais impactante da Fase 2.
- **Configuração:** OAuth2 via Google Cloud Console (mesmas credenciais que o Drive MCP do roadmap original)

#### 2. WhatsApp MCP ⭐⭐⭐
- **Repo:** `lharries/whatsapp-mcp`
- **Instala via:** Python
- **O que faz:** Conecta Claude direto ao WhatsApp pessoal via API multidevice. Lê conversas, envia mensagens, gerencia contatos.
- **Por que é crítico:** 100% do primeiro contato com clientes é pelo WhatsApp do Lipe. Com esse MCP, o Oráculo lê as conversas, redige respostas e dispara follow-ups — sem abrir o celular.
- **Atenção:** Requer WhatsApp Web ativo no dispositivo.

#### 3. ElevenLabs MCP (oficial) ⭐⭐
- **Repo:** `elevenlabs/elevenlabs-mcp` (repositório oficial da ElevenLabs)
- **Instala via:** `npx @elevenlabs/elevenlabs-mcp`
- **O que faz:** Gera narração profissional a partir de texto com 3.000+ vozes. Direto do chat.
- **Por que é crítico:** Voice-over para projetos com orçamento reduzido. Lipe escreve o roteiro → Oráculo gera o áudio → entrega ao cliente. Corta horas de produção.
- **Custo:** Plano Starter ~R$25/mês (10.000 caracteres/mês)
- **Substitui:** skill `elevenlabs` da biblioteca ANTIGRAVITY

---

### FASE 3 — Semanas 5–6

#### 4. n8n MCP Builder ⭐⭐⭐
- **Repo:** `czlonkowski/n8n-mcp`
- **Instala via:** `npx czlonkowski/n8n-mcp`
- **O que faz:** Acessa documentação de 1.650+ nós do n8n. O Oráculo usa pra gerar e validar workflows sem erros.
- **Por que importa:** Quando o Oráculo construir as automações A1–A5 do roadmap, esse MCP é o manual técnico. Evita erro de propriedades erradas nos nós.

#### 5. n8n Workflow Builder MCP ⭐⭐
- **Repo:** `salacoste/mcp-n8n-workflow-builder`
- **Instala via:** npm / Node.js
- **O que faz:** Cria, gerencia e monitora workflows n8n por conversa em linguagem natural — sem editar JSON.
- **Por que importa:** Descreve "quando proposta for aprovada, criar tarefas de pré-produção no Notion" → Oráculo monta o workflow e ativa. Perfeito para as automações A1–A5.

#### 6. Ayrshare MCP — publicação em 13 redes sociais ⭐⭐
- **Repo:** `vanman2024/ayrshare-mcp`
- **Instala via:** npm
- **O que faz:** 75+ ferramentas para postar em Instagram, LinkedIn, YouTube, TikTok, Facebook, Pinterest, Reddit, Telegram, Threads e mais.
- **Por que importa:** O Oráculo gera o copy do post, agenda e publica — tudo sem sair do chat. Substitui ou complementa o `upload-post` atual.
- **Custo:** Ayrshare tem plano gratuito limitado; plano pago a partir de ~R$50/mês.

---

### FASE 4 — Meses 2–3

#### 7. Telegram MCP ⭐⭐
- **Repo:** `chigwell/telegram-mcp`
- **Instala via:** pip (Python / Telethon)
- **O que faz:** Lê chats, envia mensagens, gerencia grupos e mídia no Telegram.
- **Por que importa:** Substitui o "Bot Telegram" do roadmap da Fase 4. Lipe manda áudio do set → Oráculo transcreve via Whisper → registra no Notion. Oráculo vira assistente no celular.
- **Alternativa oficial:** `anthropics/claude-plugins-official/external_plugins/telegram`

#### 8. FFmpeg MCP — edição de vídeo/áudio ⭐
- **Repo:** `misbahsy/video-audio-mcp`
- **Instala via:** npm / Node.js (requer FFmpeg instalado no sistema)
- **O que faz:** Edição profissional via chat: corte, conversão de formato, sobreposição de texto, processamento de áudio, geração de thumbnails.
- **Por que importa:** O Oráculo converte material bruto para formatos de entrega, extrai clipes para redes sociais, masteriza áudio — sem abrir o DaVinci ou Premiere.

---

### FASE 5 — Escala (mês 3+)

#### 9. Google Veo2 MCP — geração de vídeo com IA
- **Repo:** `mario-andreschak/mcp-veo2`
- **O que faz:** Gera vídeos a partir de texto ou imagens usando o modelo Veo2 do Google.
- **Uso:** Storyboards animados, placeholders visuais para propostas e pitches.

#### 10. Creatify MCP — avatar videos e AI shorts
- **Repo:** `TSavo/creatify-mcp`
- **O que faz:** 12 ferramentas para avatar videos, URL-to-video, AI shorts, lip-sync com controle emocional.
- **Uso:** Conteúdo escalável para clientes com orçamento reduzido.

---

## Templates e Skills GitHub descobertos

### n8n Templates (280+)
- **Repo:** `enescingoz/awesome-n8n-templates`
- **Destaque:** Templates prontos para Notion→Social Media, Gmail automático, WhatsApp, Google Drive
- **Usar quando:** Construir as automações A1–A5 do roadmap — templates prontos aceleram o processo.

### n8n Social Media + Notion Workflow
- **Repo:** `sumamazaeem/Automating-Social-Media-Posts-with-Notion-n8n`
- **O que é:** Workflow completo: agenda posts no Notion → publica automático em múltiplas plataformas
- **Usar quando:** Ativar o calendário editorial automatizado (Fase 3)

### Referências gerais de MCPs
- **Repo:** `punkpeye/awesome-mcp-servers` — lista curada e atualizada de todos os MCPs disponíveis
- **Usar quando:** Precisar buscar um MCP específico para nova integração

---

## Tabela resumo — ordem de instalação

| # | MCP | Fase | Repo | Custo |
|---|---|---|---|---|
| 1 | Google Workspace | 2 | taylorwilsdon/google_workspace_mcp | Grátis (OAuth) |
| 2 | WhatsApp | 2 | lharries/whatsapp-mcp | Grátis |
| 3 | ElevenLabs | 2 | elevenlabs/elevenlabs-mcp | ~R$25/mês |
| 4 | n8n Builder | 3 | czlonkowski/n8n-mcp | Grátis |
| 5 | n8n Workflow Builder | 3 | salacoste/mcp-n8n-workflow-builder | Grátis |
| 6 | Ayrshare Social | 3 | vanman2024/ayrshare-mcp | ~R$50/mês |
| 7 | Telegram | 4 | chigwell/telegram-mcp | Grátis |
| 8 | FFmpeg Video | 4 | misbahsy/video-audio-mcp | Grátis |
| 9 | Google Veo2 | 5 | mario-andreschak/mcp-veo2 | Pago (Google Cloud) |
| 10 | Creatify AI | 5 | TSavo/creatify-mcp | Pago (Creatify) |

---

## Próxima sessão — o que fazer

### Passo 0 — Pendências da Fase 1 (15 min)
1. Inserir token GitHub → github.com/settings/tokens → scopes `repo` + `read:org`
2. Inserir token Brave Search → brave.com/search/api → API key gratuita
3. Reiniciar Claude Code → ativa Memory + Sequential Thinking + Obsidian + NotebookLM
4. Confirmar 9 MCPs ativos e funcionando

### Passo 1 — Instalar Google Workspace MCP (30 min)
1. Criar projeto no Google Cloud Console
2. Habilitar APIs: Gmail, Calendar, Drive, Sheets, Docs
3. Gerar credenciais OAuth2 (client_id + client_secret)
4. Instalar: `pip install google-workspace-mcp` ou via repositório
5. Adicionar bloco ao `.mcp.json`

### Passo 2 — Instalar WhatsApp MCP (20 min)
1. Clonar `lharries/whatsapp-mcp`
2. Instalar dependências Python
3. Autenticar via QR Code (WhatsApp Web)
4. Adicionar bloco ao `.mcp.json`

### Passo 3 — Instalar ElevenLabs MCP (10 min)
1. Gerar API Key em elevenlabs.io
2. Adicionar ao `.mcp.json`: `npx @elevenlabs/elevenlabs-mcp`
3. Testar: pedir ao Oráculo para narrar um texto de proposta

---

## Impacto esperado ao final da Fase 2

```
ANTES                              DEPOIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lipe responde WhatsApp → 30 min    Oráculo responde → 2 min
Jaya organiza Drive → 1h/semana    Oráculo organiza → 0 min
Lipe grava narração → 3h           Oráculo gera ElevenLabs → 5 min
Jaya verifica agenda → 15 min/dia  Oráculo consulta Calendar → instantâneo
```

---

#setup #oraculo #mcp #fase-2 #fase-3 #google-workspace #whatsapp #elevenlabs #n8n #pesquisa

*Criado pelo Oráculo · 21 Mai 2026*
