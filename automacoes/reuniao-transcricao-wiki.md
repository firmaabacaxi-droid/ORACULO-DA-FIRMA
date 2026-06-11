# Blueprint: Reunião → Transcrição → Wiki

Workflow n8n para captura automática de reuniões via Telegram + Groq Whisper.

## Visão geral do fluxo

```
Telegram (voz) → n8n → Groq Whisper → markdown → cerebro/00-INBOX/reunioes/
                                                  → Telegram (confirmação)
```

## Pré-requisitos

- Bot Telegram da Firma já criado (token em `~/.secrets/antigravity.env` ou variável n8n)
- Groq API Key: criar em https://console.groq.com (gratuito até 2h de áudio/dia)
  - Adicionar ao n8n: Settings → Credentials → "Groq API" → chave como `Bearer <token>`
- n8n com acesso de escrita ao vault local (rodar n8n na mesma máquina ou via SSH)

## Estrutura do workflow (7 nodos)

### Nodo 1 — Telegram Trigger
```
Type: Telegram Trigger
Credential: Bot Firma Abacaxi
Updates: message
```

### Nodo 2 — Filtrar apenas mensagens de voz
```
Type: IF
Condition: {{ $json.message.voice }} IS NOT EMPTY
  OR {{ $json.message.audio }} IS NOT EMPTY
```
*Se não for voz/áudio → Stop.*

### Nodo 3 — Obter URL do arquivo
```
Type: HTTP Request
Method: POST
URL: https://api.telegram.org/bot{{ $env.TELEGRAM_BOT_TOKEN }}/getFile
Body (JSON):
  { "file_id": "{{ $json.message.voice.file_id || $json.message.audio.file_id }}" }
```

### Nodo 4 — Baixar arquivo de voz
```
Type: HTTP Request
Method: GET
URL: https://api.telegram.org/file/bot{{ $env.TELEGRAM_BOT_TOKEN }}/{{ $json.result.file_path }}
Response Format: File
```

### Nodo 5 — Transcrever com Groq Whisper
```
Type: HTTP Request
Method: POST
URL: https://api.groq.com/openai/v1/audio/transcriptions
Authentication: Header Auth
  Name: Authorization
  Value: Bearer {{ $env.GROQ_API_KEY }}
Body: multipart/form-data
  file: {{ $binary.data }}  (nome: "audio.ogg", type: "audio/ogg")
  model: "whisper-large-v3-turbo"
  language: "pt"
  response_format: "text"
```

### Nodo 6 — Formatar e salvar markdown
```
Type: Code (JavaScript)

const agora = new Date();
const data = agora.toISOString().split('T')[0]; // AAAA-MM-DD
const hora = agora.toTimeString().slice(0,5);    // HH:MM
const transcricao = $input.first().json.text || $input.first().json;
const chatId = $('Telegram Trigger').first().json.message.chat.id;
const username = $('Telegram Trigger').first().json.message.from.first_name || 'Lipe/Jaya';

const nomeArquivo = `${data}-reuniao-${hora.replace(':','-')}.md`;

const conteudo = `---
type: reuniao-transcricao
data: ${data}
hora: ${hora}
capturado_por: ${username}
projeto:
participantes: []
source: telegram-voice
status: pendente
---

## Transcrição bruta

${transcricao}

## Ações identificadas
<!-- Preenchido pelo Oráculo durante a ingestão -->

## Decisões
<!-- Preenchido pelo Oráculo durante a ingestão -->
`;

// Salvar no vault (ajustar caminho conforme o ambiente)
const caminho = `C:/Users/User/Documents/ORACULO - FIRMA ABACAXI/cerebro/CEREBRO-ORACULO/00-INBOX/reunioes/${nomeArquivo}`;

return [{ json: { caminho, conteudo, nomeArquivo, chatId } }];
```

### Nodo 6b — Escrever arquivo no disco
```
Type: Write Binary File  (ou Execute Command se n8n rodar localmente)
File Path: {{ $json.caminho }}
Content: {{ $json.conteudo }}
```

*Alternativa via Execute Command (se Write Binary não funcionar com texto):*
```
Type: Execute Command
Command: echo '{{ $json.conteudo }}' > "{{ $json.caminho }}"
```

*Alternativa robusta via PowerShell (Windows):*
```
Type: Execute Command
Command: powershell -Command "Set-Content -Path '{{ $json.caminho }}' -Value '{{ $json.conteudo }}' -Encoding UTF8"
```

### Nodo 7 — Confirmar no Telegram
```
Type: Telegram
Operation: Send Message
Chat ID: {{ $('Nodo 6').first().json.chatId }}
Text: |
  ✅ Transcrição salva!
  📄 Arquivo: {{ $json.nomeArquivo }}
  
  Diga ao Oráculo "processar reuniões do inbox" na próxima sessão
  para ingerir no wiki e criar tarefas no Notion.
```

---

## Variáveis de ambiente no n8n

Configurar em Settings → Environment Variables:
```
TELEGRAM_BOT_TOKEN=<token do BotFather>
GROQ_API_KEY=<chave da Groq>
VAULT_PATH=C:/Users/User/Documents/ORACULO - FIRMA ABACAXI/cerebro/CEREBRO-ORACULO
```

Ou usar Credentials do n8n para cada serviço.

---

## Extensões futuras

**Identificação automática de projeto:**
No Nodo 6, antes de salvar, adicionar um nodo n8n AI que analisa a transcrição e infere:
- Qual projeto está sendo discutido (baseado nos nomes de projetos no Notion)
- Quais participantes são mencionados
- Se há deadlines mencionadas

**Commit automático via git:**
Após salvar o arquivo, adicionar:
```
Type: Execute Command
Command: cd "C:/Users/User/Documents/ORACULO - FIRMA ABACAXI" && git add cerebro/CEREBRO-ORACULO/00-INBOX/reunioes/ && git commit -m "auto: transcricao {{ $json.nomeArquivo }}"
```

**Contexto pré-reunião (fluxo inverso):**
Trigger: mensagem Telegram começando com "/prep" + nome do projeto
→ Oráculo lê hot.md + wiki/projects/[projeto] → gera brief → envia de volta no Telegram
*(implementar como n8n webhook + HTTP Request para Claude API)*

---

## Testar o workflow

1. Importar no n8n (criar manualmente os nodos ou adaptar de um existente)
2. Ativar o workflow
3. Enviar mensagem de voz no Telegram para o bot da Firma
4. Verificar: `cerebro/CEREBRO-ORACULO/00-INBOX/reunioes/` deve ter o arquivo .md
5. Abrir o arquivo e confirmar que a transcrição está em português
6. Dizer ao Oráculo: "processar reuniões do inbox"
