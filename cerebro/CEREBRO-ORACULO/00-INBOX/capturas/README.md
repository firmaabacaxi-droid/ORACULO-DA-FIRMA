# Capturas — Inbox Universal

Tudo que o Felipe manda pelo bot do Telegram cai aqui: links de YouTube, artigos, áudios transcritos, ideias de texto, arquivos (em `anexos/`). Reuniões têm pasta própria (`../reunioes/`).

- **Formato:** um `.md` por captura, frontmatter com `type` (`youtube|artigo|voz|texto|arquivo`), `source`, `status`
- **Ciclo de vida:** `status: pendente` → triagem via **"processar inbox"** (skill `processar-inbox`) → `status: processado` + `destino:`
- **Quem alimenta:** workflow n8n ([blueprint](../../../../automacoes/inbox-universal.md)) — ou manualmente, seguindo o mesmo formato
- **Princípio:** capturar não exige classificar. Acumular não é dívida. A triagem é ritual, não obrigação.

Exemplo de captura:

```markdown
---
type: youtube
source: telegram
data: 2026-06-12 08h31
capturado_por: Lipe
url: https://youtu.be/exemplo
titulo: "Os 12 arquétipos de marca"
status: pendente
---

🎥 Os 12 arquétipos de marca — Canal Tal
https://youtu.be/exemplo
```
