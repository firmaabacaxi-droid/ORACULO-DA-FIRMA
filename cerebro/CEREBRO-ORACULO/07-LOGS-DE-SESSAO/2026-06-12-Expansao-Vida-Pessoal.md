---
data: 2026-06-12
sessao: 25
titulo: Expansão Vida Pessoal — Oráculo além da Firma
tags: [visao, vault, inbox, telegram, 08-FELIPE, llm-council]
---

# Sessão 25 — Expansão Vida Pessoal

## O que foi feito

O Oráculo foi expandido de sistema operacional da Firma para sistema operacional da vida do Felipe — sem criar um segundo sistema: mesmo vault, nova área de topo, grafo único.

### Decisões tomadas (4 perguntas ao Felipe)
1. **Casa pessoal:** mesmo vault (`08-FELIPE/`), grafo único — Jung conversa com narrativa documental
2. **Canal de captura:** bot Telegram (generaliza o blueprint de reuniões já existente)
3. **Triagem:** n8n captura automaticamente → "processar inbox" com aprovação antes de mover
4. **Identidade:** dupla e oficial — terceiro sócio da Firma + parceiro de vida do Felipe; espaço para Jaya quando quiser

### Blocos executados

**Bloco 0 — Visão e conselho**
- `skills/antigravity/llm-council/SKILL.md`: adicionada 5ª persona **Guardião da Narrativa 🜍** (obrigatória em decisões de visão/identidade)
- `docs/VISAO-ORACULO.md`: constituição do Oráculo — 4 domínios (TRABALHO, ESTUDO, IDENTIDADE, FUTURO), 9 princípios, 5 questões abertas para o Felipe

**Bloco 1 — Estrutura do Cérebro**
- `cerebro/CEREBRO-ORACULO/08-FELIPE/` criada (3 subáreas): `_INDEX.md`, `08.1-VISAO-DE-MUNDO/`, `08.2-BIBLIOTECA/`, `08.3-HISTORIA-E-NARRATIVA/`
- Notas-semente: `Mapa-Estudos-Junguianos.md`, `Linha-Narrativa-Felipe.md`, `Inventario-Acervo-Pessoal.md`
- Pipeline de biblioteca documentado em `_COMO-FUNCIONA.md` (NotebookLM → nota .md → /wiki-ingest)
- Wiki: `wiki/areas/Vida-Felipe.md` (página-mãe na camada de síntese)
- `HOME.md`: linha 08-FELIPE adicionada na navegação
- Regra de fronteira documentada: 06 = aplicável à Firma; 08 = olhar pessoal do Felipe

**Bloco 2 — Identidade e fluxo**
- `.claude/CLAUDE.md`: identidade expandida + routing novos (processar inbox, estudo pessoal, decisão de visão)
- `docs/FLUXO_ORACULO.md`: os 5 modos (Projeto, Captura, Estudo, Revisão, Conselho) com exemplos e ferramentas por modo

**Bloco 3 — Inbox universal**
- `automacoes/inbox-universal.md`: blueprint n8n completo (Switch por tipo: voz→Groq Whisper, YouTube→oEmbed, URL→title scrape, texto→direto, documento→arquivo+md)
- `.claude/skills/firma/processar-inbox/SKILL.md`: triagem em 5 passos com aprovação obrigatória
- `cerebro/CEREBRO-ORACULO/00-INBOX/capturas/README.md`: documenta a pasta e ciclo de vida

### Outros arquivos editados
- `cerebro/CEREBRO-ORACULO/CLAUDE.md`: 08-FELIPE na estrutura do vault
- `cerebro/CEREBRO-ORACULO/06-ESTUDOS-E-REFERENCIAS/_INDEX.md`: bloco de fronteira 06/08
- `docs/MAPA-MESTRE.md`: 08-FELIPE + capturas/ + novos docs de visão

## Commits da sessão
- `bloco 0 — visão macro: VISAO-ORACULO.md + 5ª persona llm-council`
- `bloco 1 — área 08-FELIPE: estrutura + notas-semente + wiki`
- `bloco 2 — identidade dupla: CLAUDE.md + FLUXO_ORACULO.md`
- `bloco 3 — inbox universal: blueprint n8n + skill processar-inbox + pasta capturas/`

## Pendências / próximos passos

| Prioridade | Tarefa |
|---|---|
| 🔴 Operacional | Montar workflow n8n seguindo `automacoes/inbox-universal.md` (precisa bot Telegram + Groq API + n8n com acesso ao vault) |
| 🟡 Estudo | Escolher livro piloto para `08.2-BIBLIOTECA/` (sugestão: Jung/arquétipos pela sinergia com FAC-2026) |
| 🟡 Acervo | Felipe apontar arquivos fora do Oráculo (espetáculo de circo, escritos sobre "Oráculo", outros projetos) para ingestão em batch |
| 🟢 Validação | Simular inbox ponta a ponta: criar 3 capturas manualmente → rodar "processar inbox" → wiki |
| 🟢 Docs | Verificar `docs/PLANO-DE-ACAO.md` refletindo nova estrutura |

## Regra de privacidade (crítico — vault compartilhado com Jaya + indexado pelo NotebookLM)
Não entram no vault: diário íntimo, saúde, conflitos pessoais, finanças pessoais, informações sobre terceiros. Definido em `docs/VISAO-ORACULO.md` (Princípio 7).
