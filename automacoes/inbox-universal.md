# Blueprint: Inbox Universal — Telegram → Cérebro

Workflow n8n que generaliza o de reuniões ([reuniao-transcricao-wiki.md](reuniao-transcricao-wiki.md)): **o mesmo bot** vira o inbox de tudo — vídeos do YouTube, artigos, áudios, ideias de texto e arquivos. Captura sem fricção; a inteligência fica na triagem ("processar inbox", skill `processar-inbox`).

## Visão geral do fluxo

```
Telegram (qualquer mensagem)
   → n8n Switch por tipo
      ├─ voz/áudio   → Groq Whisper → md transcrito
      ├─ link YouTube → md com URL + título/canal (oEmbed)   [sem transcrever aqui]
      ├─ outra URL    → md com URL + <title> da página
      ├─ texto        → md direto
      └─ documento    → arquivo salvo + md apontando
   → tudo em cerebro/CEREBRO-ORACULO/00-INBOX/capturas/  (status: pendente)
   → confirmação no Telegram com o tipo detectado
```

**Exceção:** mensagens de voz que começam com "reunião" (ou enviadas no tópico/chat de reuniões) continuam indo para `00-INBOX/reunioes/` pelo fluxo já desenhado. Na prática os dois fluxos podem conviver no mesmo workflow com um IF extra.

## Pré-requisitos (os mesmos do fluxo de reuniões)

- Bot Telegram da Firma (token em `~/.secrets/antigravity.env` ou variável n8n)
- Groq API Key (gratuito até 2h de áudio/dia) — só para o ramo de voz
- n8n com acesso de escrita ao vault local

## Estrutura do workflow

### Nodo 1 — Telegram Trigger
```
Type: Telegram Trigger
Credential: Bot Firma Abacaxi
Updates: message
```

### Nodo 2 — Switch por tipo de mensagem
```
Type: Switch
Regra 1 (voz):      {{ $json.message.voice }} OU {{ $json.message.audio }} não-vazio
Regra 2 (youtube):  {{ $json.message.text }} contém "youtube.com/" OU "youtu.be/"
Regra 3 (url):      {{ $json.message.text }} bate com regex ^https?://
Regra 4 (documento):{{ $json.message.document }} OU {{ $json.message.photo }} não-vazio
Fallback (texto):   qualquer outra mensagem com text não-vazio
```

### Ramo VOZ (nodos 3a-5a) — reaproveitar do blueprint de reuniões
getFile → download → Groq Whisper (`whisper-large-v3-turbo`, language `pt`) → texto transcrito.

### Ramo YOUTUBE (nodo 3b)
```
Type: HTTP Request
Method: GET
URL: https://www.youtube.com/oembed?url={{ encodeURIComponent($json.message.text) }}&format=json
→ retorna title, author_name (canal) sem precisar de API key
```
*Não transcrever aqui: a análise profunda roda na triagem com a skill `/watch` (yt-dlp + frames + transcript), que já está instalada no Oráculo.*

### Ramo URL (nodo 3c)
```
Type: HTTP Request (GET na própria URL, response: text)
+ Code: extrair <title>...</title> do HTML (regex), fallback = a própria URL
```

### Ramo DOCUMENTO (nodo 3d)
```
getFile → download → salvar binário em 00-INBOX/capturas/anexos/
(o md de captura aponta para o arquivo; na triagem decide-se: Drive ou converter p/ md)
```

### Nodo 6 — Formatar markdown de captura (Code, comum a todos os ramos)
```javascript
const agora = new Date();
const data = agora.toISOString().split('T')[0];
const hora = agora.toTimeString().slice(0,5);
const tipo = $json.tipo; // definido pelo ramo: voz|youtube|artigo|texto|arquivo
const chatId = $('Telegram Trigger').first().json.message.chat.id;
const capturadoPor = $('Telegram Trigger').first().json.message.from.first_name || 'Lipe';

const nomeArquivo = `${data}-${hora.replace(':','')}-${tipo}.md`;

const conteudo = `---
type: ${tipo}
source: telegram
data: ${data} ${hora}
capturado_por: ${capturadoPor}
url: ${$json.url || ''}
titulo: "${($json.titulo || '').replace(/"/g, "'")}"
status: pendente
---

${$json.corpo}
`;

const caminho = `C:/Users/User/Documents/ORACULO - FIRMA ABACAXI/cerebro/CEREBRO-ORACULO/00-INBOX/capturas/${nomeArquivo}`;
return [{ json: { caminho, conteudo, nomeArquivo, chatId, tipo } }];
```

Campo `corpo` por ramo:
- voz → a transcrição completa
- youtube → `🎥 ${titulo} — ${canal}\n${url}` + legenda da mensagem se houver
- artigo → `📰 ${titulo}\n${url}` + comentário do Felipe se houver
- texto → o texto da mensagem
- arquivo → `📎 ${nome do arquivo}` + caminho do anexo salvo

### Nodo 7 — Escrever no disco
Igual ao blueprint de reuniões (Write File ou Execute Command com PowerShell `Set-Content -Encoding UTF8`).

### Nodo 8 — Confirmar no Telegram
```
Text: ✅ Capturado ({{ $json.tipo }})!
      📄 {{ $json.nomeArquivo }}
      Na próxima revisão, diga "processar inbox" ao Oráculo.
```

## Variáveis de ambiente

As mesmas do fluxo de reuniões: `TELEGRAM_BOT_TOKEN`, `GROQ_API_KEY`, `VAULT_PATH`.

## Extensões futuras

- **Pré-classificação por IA:** nodo opcional que sugere destino (06/08/projeto) no frontmatter (`destino_sugerido:`) — a decisão continua na triagem.
- **Comando /prep:** mensagem "/prep [projeto]" → n8n webhook → brief do projeto de volta no chat (já previsto no blueprint de reuniões).
- **E-mail como segundo canal:** nodo IMAP despejando newsletters no mesmo formato de captura.

## Testar

1. Mandar pro bot: 1 link de YouTube, 1 link de matéria, 1 áudio, 1 texto
2. Conferir `00-INBOX/capturas/` — 4 arquivos `.md` com frontmatter correto
3. No Oráculo: "processar inbox" → triagem completa (skill `processar-inbox`)
