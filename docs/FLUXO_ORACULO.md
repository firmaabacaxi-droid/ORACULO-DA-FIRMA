# FLUXO_ORACULO.md
## Como o Felipe usa o Oráculo — os 5 modos
*Visão geral de uso no dia a dia · complementa o FLUXO_TRABALHO.md (13 etapas comerciais) · criado 12/jun/2026*

> **Para que serve este documento:** responder "em que momento eu uso o Oráculo, o que ele me entrega e com qual ferramenta". A visão de fundo (domínios e princípios) está em [VISAO-ORACULO.md](VISAO-ORACULO.md).

---

## Os 5 modos num relance

| Modo | Quando | O que o Oráculo entrega | Ferramentas |
|---|---|---|---|
| 🎬 **Projeto** | Trabalhando num projeto da Firma | Propostas, roteiros, orçamentos, gestão | Skills firma + Notion + Drive |
| 📥 **Captura** | A qualquer hora, em qualquer lugar | Nada na hora — só guarda sem fricção | Bot Telegram → `00-INBOX/capturas/` |
| 📚 **Estudo** | Sentando para estudar ou analisar | Sumários de livros, análise de vídeos, notas conectadas | NotebookLM, `/watch`, `/wiki-ingest` |
| 🔄 **Revisão** | Ritual escolhido (ex.: sexta de manhã) | Inbox triado, conhecimento arquivado, hot.md atualizado | "processar inbox", `/graphify` |
| 🜍 **Conselho** | Decisão importante (técnica ou de rumo) | Deliberação multipersona + consenso + questões abertas | llm-council (5 personas) |

---

## 🎬 Modo Projeto — a Firma operando

**É o coração comercial — nada mudou.** As 13 etapas (prospecção → proposta → pré-produção → produção → edição → entrega → financeiro) seguem documentadas em [FLUXO_TRABALHO.md](FLUXO_TRABALHO.md), com skills, bancos Notion e automações por etapa.

**Frases típicas:** "proposta para [cliente]" · "roteiro para [projeto]" · "qual a ordem do dia?"

---

## 📥 Modo Captura — o inbox universal

**O gesto:** está assistindo um vídeo no YouTube, leu uma matéria, teve uma ideia no ônibus, saiu de uma reunião → manda pro bot do Telegram. **Acabou.** Não precisa de PC, não precisa classificar, não precisa lembrar depois.

**O que o bot aceita:**
- 🎥 Link de YouTube → guarda com título/canal (análise profunda fica para o modo Estudo, via `/watch`)
- 📰 Link de artigo/matéria → guarda com título da página
- 🎙️ Áudio/voz → transcreve na hora (Groq Whisper) e guarda o texto
- 💬 Texto/ideia → guarda direto
- 📎 Documento/imagem → guarda o arquivo + nota apontando

**Onde cai:** `cerebro/CEREBRO-ORACULO/00-INBOX/capturas/` com frontmatter (`type`, `source`, `status: pendente`). Reuniões continuam em `00-INBOX/reunioes/` (fluxo próprio).

**Blueprint técnico:** [automacoes/inbox-universal.md](../automacoes/inbox-universal.md)

---

## 📚 Modo Estudo — transformar consumo em repertório

**Quando o Felipe senta para estudar de verdade** (ou pede para o Oráculo analisar algo capturado):

- **Livro:** pipeline da biblioteca — NotebookLM gera o sumário estruturado, a nota entra em `08-FELIPE/08.2-BIBLIOTECA/`, a wiki absorve. Detalhes: `08.2-BIBLIOTECA/_COMO-FUNCIONA.md`.
- **Vídeo:** skill `/watch` baixa, extrai frames e transcrição → o Oráculo analisa e cria a nota de referência.
- **Artigo/matéria:** o Oráculo lê, resume e conecta com o que já existe no grafo.
- **Curso/apostila:** `markitdown` converte → notas por módulo (como foi feito com marketing digital no 06.1).

**Destino:** `08-FELIPE/` (olhar pessoal) ou `06-ESTUDOS-E-REFERENCIAS/` (aplicável à Firma) — na dúvida, 06 com link do 08.

---

## 🔄 Modo Revisão — o ritual de retorno

**O momento escolhido** (a calibrar — ver questionamento 2 da Visão; sugestão: sexta de manhã, 15 min):

1. **"processar inbox"** → o Oráculo varre as capturas pendentes, propõe destino para cada uma (em lote), o Felipe aprova
2. O aprovado vira nota no lugar certo + nó na wiki (`/wiki-ingest`)
3. `wiki/hot.md` é atualizado — o que entrou de novo aparece no contexto da próxima sessão
4. Opcional: `/graphify` para ver o grafo crescer — o espelho do repertório

**Anti-culpa:** inbox acumulado não é dívida. Se passar duas semanas sem processar, está tudo lá, nada se perde.

---

## 🜍 Modo Conselho — decisões com peso

**Quando há uma decisão importante** — técnica (arquitetura, banco, UX) ou de rumo (visão, identidade, estrutura do Cérebro, vida pessoal):

- Ativar o **llm-council** (`skills/antigravity/llm-council/SKILL.md`): Moderador, Arquiteto, UX, Produtor e **Guardião da Narrativa** (obrigatório em decisões de visão/identidade)
- Saída: consenso fundamentado + questionamentos abertos registrados
- Decisões de visão atualizam o documento vivo [VISAO-ORACULO.md](VISAO-ORACULO.md)

---

## Um dia com o Oráculo (exemplo realista)

```
08h30  no ônibus, vê um vídeo sobre arquétipos de marca
       → manda o link pro bot                                [Captura]
10h00  sessão de trabalho: "proposta para a SOBRE2026"
       → skill proposta → Word em output/                    [Projeto]
14h00  reunião com cliente gravada em áudio
       → manda a voz pro bot → transcrição cai no inbox      [Captura]
19h00  meia hora de leitura do livro de Jung
       → (nada a fazer — o livro entra na sexta)             [—]

SEXTA  "processar inbox"
       → vídeo de arquétipos vira nota em 08.1 ligada ao FAC
       → transcrição da reunião vira ata + tarefas no Notion
       → capítulos lidos entram no sumário do livro          [Revisão]
```

---

## Fases e ferramentas (estado em jun/2026)

| Peça | Estado |
|---|---|
| Vault + wiki + hooks | ✅ Ativo |
| NotebookLM (9 fontes, sync GitHub) | ✅ Ativo |
| Notion (12 bancos) + Drive (rclone) | ✅ Ativo |
| Skills `/watch`, `/notebooklm`, `markitdown` | ✅ Instaladas |
| Skill `processar-inbox` | ✅ Criada (12/jun) |
| Bot Telegram + n8n (captura) | 🟡 Blueprint pronto — montar workflow ([inbox-universal](../automacoes/inbox-universal.md)) |
| Ordem do Dia automática, A1–A5 | 📌 Fases 3-4 |
| Produção de vídeo com IA | 🔮 Horizonte (ver Visão) |

---

*Oráculo — Firma Abacaxi · os modos servem ao olhar, não o contrário · 2026*
