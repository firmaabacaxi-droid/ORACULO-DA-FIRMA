# CEREBRO-ORACULO — Schema do Vault

Este vault é o segundo cérebro da Firma Abacaxi, alimentado pelo Oráculo (Claude Code). Usa **claude-obsidian v1.9.2** em modo **PARA** (Projects / Areas / Resources / Archives).

## O que está aqui

O vault é dividido em duas camadas:

### Camada de Trabalho (pastas 00–07)
Documentos operacionais da Firma — projetos, processos, clientes, histórico, estudos. Estas pastas são o "dia a dia". Quando você precisa editar um roteiro, adicionar um cliente, ou registrar uma filmagem, é aqui.

```
00-INBOX/               Rascunhos rápidos, notas temporárias, capturas do Telegram
01-OPERACAO-ORACULO/    DNA, diretrizes, templates de produção
02-PROCESSOS-E-MANUAIS/ SOPs por departamento
03-CLIENTES/            Dossiês permanentes
04-PROJETOS-ATIVOS/     Projetos em andamento
05-ARQUIVO-HISTORICO/   Projetos finalizados
06-ESTUDOS-E-REFERENCIAS/ Biblioteca de estética e conhecimento (aplicável à Firma)
07-LOGS-DE-SESSAO/      Notas de trabalho com o Oráculo
08-FELIPE/              Casa pessoal: visão de mundo, biblioteca, história e narrativa
```

**Fronteira 06/08:** conhecimento aplicável à Firma → 06; o que constrói o olhar pessoal do Felipe → 08. Na dúvida → 06, com link a partir do 08. Visão completa em `docs/VISAO-ORACULO.md`.

### Camada de Síntese (pasta wiki/)
Base de conhecimento gerada pelo Oráculo através de `/wiki-ingest`. Quando você quer que o Claude **entenda** a estrutura e extrai aprendizados, o conhecimento vai aqui.

```
wiki/
├── hot.md         Contexto recente (~500 palavras, recarregado a cada sessão)
├── index.md       Catálogo mestre de tudo no wiki
├── log.md         Log de operações do vault
├── overview.md    Sumário executivo da Firma
├── projects/      Sínteses de projetos (FAC-2026, Visite mon Agence, etc.)
├── areas/         Áreas contínuas (captação, financeiro, operação)
├── resources/     Pessoas, editais, referências
└── archives/      Projetos finalizados sintetizados
```

## Como trabalhar — Fluxo Automático

### Ao iniciar cada sessão (AUTOMÁTICO)

⚙️ **O Oráculo faz isto automaticamente:**

1. **Lê `wiki/hot.md`** — contexto recente (~500 palavras) é carregado na memória
2. **Detecta modo PARA** — sabe como organizar novo conhecimento
3. **Oferece opções:** ingerir, consultar, pesquisar, ou continuar de onde parou

🚀 **Você não precisa fazer nada — isto acontece sem comando.**

### Quando você quer que o Oráculo "absorva" conhecimento

**Triggers de ingestão** (diga qualquer um destes):
- "absorva isso no wiki"
- "ingerir isso na base de conhecimento"
- "adicionar isso ao vault"
- "synthesize this into the wiki"
- `/wiki-ingest 04-PROJETOS-ATIVOS/FAC-2026/00-INDEX.md` (comando direto)

**Exemplo de conversa:**
```
Você: Leia o briefing do FAC-2026 que atualizei hoje.
Oráculo: [lê o arquivo]
Você: Absorva isso no wiki pra eu não esquecer.
Oráculo: ✓ Criadas 8 páginas wiki (projeto, stakeholders, timeline, orçamento...)
         Atualizadas: wiki/index.md, wiki/hot.md, wiki/log.md
         Auto-commit no GitHub ✓
```

**O que o Oráculo faz:**
- Cria/atualiza páginas em `wiki/projects/`, `wiki/areas/`, `wiki/resources/`
- Extrai entidades (clientes, stakeholders), conceitos (metodologia, termos), cronogramas
- Adiciona links cruzados entre páginas (wikilinks bidirecionais)
- Atualiza `wiki/index.md` com novas entradas
- **Faz auto-commit no GitHub automaticamente**

### Sincronização NotebookLM (TOTALMENTE AUTOMÁTICA)

📚 **Como funciona:**

1. **GitHub sincroniza** — Obsidian Git faz push a cada 30 min (ou imediato com `/commit`)
2. **NotebookLM indexa** — você alimenta NotebookLM com novas fontes (AFD docs, editais, referências)
3. **Tudo se funde** — NotebookLM acessa o vault via GitHub + fontes que você adiciona
4. **Você obtém** — resumos, áudios, analíticos, tudo baseado em conhecimento + wiki

🔄 **Fluxo completo:**
```
Você trabalha em 04-PROJETOS-ATIVOS/
         ↓
Diz "absorva no wiki"
         ↓
Oráculo cria páginas wiki + auto-commit
         ↓
GitHub recebe (30 min ou `/commit`)
         ↓
NotebookLM sincroniza (você pode adicionar novas fontes)
         ↓
Próxima sessão: hot.md tem aprendizados + NotebookLM gera insights
```

**Você também alimenta NotebookLM com:**
- Novos artigos, pesquisas
- Editais que encontra
- Referências visuais de projetos
- Documentação de clientes

**Tudo junto gera:**
- Base de conhecimento completa
- Áudios resumidos (NotebookLM)
- Insights automáticos sobre projetos
- Recomendações de clientes similares, editais relevantes, referências

### Integrações ativas (Sincronizadas)

- **Obsidian Git** — push/pull automático a cada 30 min → GitHub
- **NotebookLM** — indexa repo + suas fontes → gera áudios/resumos
- **Notion** — 6 bancos (Projeto 2026, Tarefas, CRM, Financeiro, Filmagem, Orçamento)
- **Claude Code + Oráculo** — lê hot.md em cada sessão, absorve novo conhecimento
- **Google Drive** — rclone sincroniza assets (você alimenta manualmente)

## Metodologia: PARA

O vault organiza conhecimento por **ação** (projeto), não por assunto. Isso alinha com a realidade da produção audiovisual.

- **Projects** — o que precisa ser entregue agora (FAC-2026, Visite mon Agence, projetos comerciais)
- **Areas** — o que é responsabilidade contínua (captação, financeiro, RH, marketing)
- **Resources** — o que você consulta (editais, referências visuais, legislação, histórico de clientes)
- **Archives** — o que foi entregue (projetos finalizados)

## Referência rápida

Para iniciar uma sessão no vault: abra Claude Code neste diretório e digite `/wiki`. O Oráculo:
1. Lê `wiki/hot.md` automaticamente
2. Detecta que o vault está em modo PARA
3. Oferece continuar com ingestão, consulta ou pesquisa autônoma

Para perguntas frequentes, leia [WIKI.md](WIKI.md) (schema completo) ou os logs em `07-LOGS-DE-SESSAO/`.

---

*Oráculo — Firma Abacaxi Ateliê Audiovisual · Brasília · 2026*
