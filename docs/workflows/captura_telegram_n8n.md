# Blueprint: Captura Rápida — Telegram → Oráculo Inbox

**Objetivo:** Mandar qualquer coisa do celular (link, texto, foto, áudio) para um bot do Telegram → n8n processa → salva como nota markdown no `00-INBOX` do cérebro via GitHub API.

**Resultado:** Você está na rua, vê um post no Instagram, clica em "compartilhar → Telegram" → envia pro bot → em segundos está no cérebro, pronto para o Oráculo processar na próxima sessão.

---

## Arquitetura

```
[Você no celular]
      ↓ compartilha/envia mensagem
[Bot Telegram @OrauloFirmaBot]
      ↓ webhook
[n8n — workflow "Captura Oráculo"]
      ↓ classifica (texto / URL / foto / áudio)
      ↓ formata frontmatter YAML
[GitHub API — commit em 00-INBOX/]
      ↓
[Cérebro sincroniza (obsidian-git)]
      ↓
[Oráculo lê na próxima sessão]
```

---

## Setup Inicial (1x)

### 1. Criar o Bot no Telegram

1. Abrir Telegram → buscar **@BotFather**
2. Enviar `/newbot`
3. Nome do bot: `Oráculo Firma`
4. Username: `OrauloFirmaBot` (ou similar disponível)
5. Copiar o **Bot Token** gerado (formato: `1234567890:AABBCCDDEEFFaabbccddeeff`)

### 2. Configurar o n8n

**Opção A — Self-hosted (grátis):**
- Instalar n8n localmente (requer servidor sempre ligado ou VPS)
- Documentação: [docs.n8n.io/getting-started/installation/](https://docs.n8n.io/getting-started/installation/)
- Para testar localmente: `npx n8n`

**Opção B — n8n Cloud:**
- `app.n8n.io` → plano Starter (~€20/mês)
- Sem servidor para gerenciar

### 3. Credenciais necessárias no n8n

| Credencial | Onde criar | O que configurar |
|---|---|---|
| **Telegram API** | n8n → Credentials → Telegram API | Bot Token do @BotFather |
| **GitHub API** | n8n → Credentials → GitHub | Token fine-grained com Contents(read+write) no repositório `firmaabacaxi-droid/ORACULO-DA-FIRMA` |

**Criar token GitHub:**
1. github.com → Settings → Developer settings → Fine-grained personal access tokens
2. New token → nome: `n8n-oraculo-captura`
3. Repository access: `firmaabacaxi-droid/ORACULO-DA-FIRMA`
4. Permissions → Contents: **Read and write**
5. Copiar o token (salvar — só aparece uma vez)

### 4. Importar o Workflow

1. No n8n: **Workflows → Import from file**
2. Selecionar `docs/workflows/captura_telegram_n8n.json`
3. Configurar as credenciais nos nós Telegram e GitHub
4. Ativar o workflow (toggle no canto superior direito)

---

## Como Usar no Dia a Dia

### Enviar texto/ideia:
```
Você → bot: "Técnica de iluminação com Aputure que o Felipe usou no Maranhã — testar no próximo projeto"
Bot → responde: "✅ Salvo em 00-INBOX (texto)"
```

### Enviar link:
```
Você → bot: https://www.youtube.com/watch?v=exemplo
Bot → extrai título automaticamente
Bot → responde: "✅ Salvo em 00-INBOX (link): Como usar o DaVinci Resolve para Color Grading"
```

### Enviar foto (referência visual):
```
Você → bot: [foto com legenda "referência de iluminação para corporativo"]
Bot → responde: "✅ Salvo em 00-INBOX (imagem) — nota criada com link para a foto"
```

### Enviar áudio (ideia falada):
```
Você → bot: [áudio de voz "tenho uma ideia para o roteiro do Brasil Participativo..."]
Bot → responde: "✅ Salvo em 00-INBOX (áudio) — na próxima sessão o Oráculo transcreve"
```

---

## Formato das Notas Geradas

Cada mensagem gera um arquivo em `cerebro/CEREBRO-ORACULO/00-INBOX/`:

**Nome:** `AAAA-MM-DD-HHMM-titulo-curto.md`

**Exemplo para link:**
```markdown
---
tipo: link
fonte: telegram
data: 2026-06-10
hora: "14:32"
url: "https://www.youtube.com/watch?v=exemplo"
titulo: "Como usar DaVinci Resolve para Color Grading"
tags: [captura, referencia, tecnica]
processado: false
---

# Como usar DaVinci Resolve para Color Grading

Capturado via Telegram em 2026-06-10 14:32

**URL:** https://www.youtube.com/watch?v=exemplo
```

**Exemplo para texto:**
```markdown
---
tipo: texto
fonte: telegram
data: 2026-06-10
hora: "14:35"
tags: [captura, ideia]
processado: false
---

# Ideia — 2026-06-10 14:35

Técnica de iluminação com Aputure que o Felipe usou no Maranhã — testar no próximo projeto
```

---

## Integração com o Oráculo

No início de cada sessão Claude Code, o Oráculo verifica o `00-INBOX`:

```
"Oráculo, processa o inbox de hoje"
→ Lê todos os .md com processado: false
→ Classifica: referência técnica, ideia de projeto, lead, aprendizado?
→ Move para a seção correta do cérebro
→ Marca processado: true
```

---

## Evolução Futura (Fase 3+)

- **Whisper:** mensagens de áudio transcritas automaticamente antes de salvar
- **IA de classificação:** tag automática por tipo de conteúdo
- **Comando `/tarefa`:** criar tarefa diretamente no `08-BASES/TAREFAS/` via Telegram
- **Comando `/crm`:** atualizar status de oportunidade CRM via Telegram
- **Ordem do Dia (8h):** n8n lê TAREFAS.base + manda resumo diário via Telegram

---

## Arquivo de Workflow

O JSON completo do workflow n8n está em: `docs/workflows/captura_telegram_n8n.json`

Importar diretamente no n8n via **Workflows → Import from file**.
