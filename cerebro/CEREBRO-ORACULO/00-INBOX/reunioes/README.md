# Inbox de Transcrições de Reunião

Esta pasta é o **ponto de chegada automático** das transcrições geradas pelo workflow n8n.

## Como funciona

1. Você grava áudio no celular durante ou após a reunião
2. Envia a mensagem de voz para o **bot Telegram da Firma**
3. O n8n capta automaticamente → transcreve via Groq Whisper → salva aqui
4. Na próxima sessão com o Oráculo, diga: "processe as reuniões do inbox"
5. O Oráculo ingere cada arquivo → cria página em `wiki/meetings/` → move o arquivo

## Formato dos arquivos gerados pelo n8n

```yaml
---
type: reuniao-transcricao
data: AAAA-MM-DD
projeto: (identificado automaticamente ou em branco)
participantes: []
source: telegram-voice
status: pendente
---

## Transcrição bruta

[texto gerado pelo Whisper]

## Ações identificadas
<!-- Preenchido pelo Oráculo durante a ingestão -->

## Decisões
<!-- Preenchido pelo Oráculo durante a ingestão -->
```

## Para processar manualmente

Se precisar transcrever uma reunião sem o workflow n8n:
1. Crie um arquivo com o formato acima: `AAAA-MM-DD-nome-da-reuniao.md`
2. Cole a transcrição (ou um resumo rápido)
3. Diga ao Oráculo: "ingerir reunião em 00-INBOX/reunioes/AAAA-MM-DD-*.md"

## Workflow n8n

Blueprint completo: `automacoes/reuniao-transcricao-wiki.md`
