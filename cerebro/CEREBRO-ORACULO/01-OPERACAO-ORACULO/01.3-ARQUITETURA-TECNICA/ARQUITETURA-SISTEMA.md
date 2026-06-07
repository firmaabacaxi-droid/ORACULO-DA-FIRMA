# Arquitetura do Sistema — Oráculo da Firma Abacaxi
## Blueprint mestre da organização de pastas e documentação
*Firma Abacaxi Ateliê Audiovisual · Brasília · revisão de 07/06/2026*

> **Status deste documento:** diagnóstico + arquitetura-alvo (blueprint). **Nada foi movido ou apagado** nesta passada. A execução está descrita, etapa a etapa, em [[PLANO-MIGRACAO]].
>
> Documentos relacionados: [[ARQUITETURA_NOTION]] (schema dos bancos) · [[GUIA_ORACULO]] (uso do Claude Code) · `wiki/projects/ORACULO-Cerebro.md` (integração do cérebro).

---

## 0. Para que serve este documento

O sistema do Oráculo cresceu rápido e a organização não acompanhou. Hoje há projetos
espalhados em três lugares, pastas duplicadas, currículo e documentos institucionais soltos,
dezenas de scripts na raiz do ANTIGRAVITY e credenciais expostas.

Este blueprint define **como o sistema deveria estar organizado** — a estrutura-alvo — e
serve como referência única para qualquer decisão de "onde isso deve morar?". É o mapa que
o Oráculo (e você) consulta antes de criar, mover ou arquivar qualquer coisa.

---

## 1. Diagnóstico atual

O sistema vive em **dois repositórios** dentro de `C:\Users\User\Documents\`:

| Repositório | Papel | Estado |
|---|---|---|
| **ORACULO - FIRMA ABACAXI** | Inteligência operacional + base de conhecimento (cérebro) | Produção |
| **ANTIGRAVITY** | App Next.js + scripts de sincronização (Notion/Sheets/Supabase) | Desenvolvimento |

A separação entre **inteligência** (ORACULO) e **infraestrutura técnica** (ANTIGRAVITY) é
boa e deve ser mantida. O problema não é a divisão macro — é a desordem dentro de cada lado.

### 1.1 Problemas identificados

| # | Problema | Onde | Impacto |
|---|---|---|---|
| 1 | **Duplicação massiva** | `PROJETO ORACULO APP ANTIGRAVITY/` (espelho do app), `DOCUMENTOS ANTIGOS/skills DO ANTIGRAVITY/` (160+ skills copiadas), cópias `(1).md` de docs | ~0,5 GB desperdiçado; confusão sobre a fonte de verdade |
| 2 | **Projetos espalhados em 3 lugares** | `PROJETOS - EDITAIS/`, `cerebro/.../04-PROJETOS-ATIVOS/`, app | Não existe "lugar único" de cada projeto; difícil atualizar |
| 3 | **Scripts soltos** | 57 arquivos `.py` na raiz do ANTIGRAVITY | Ninguém sabe a ordem de execução nem as dependências |
| 4 | **Credenciais expostas** | `ANTIGRAVITY/google_service_account.json` e `.env` na raiz | Risco de segurança se o repo vazar/for versionado |
| 5 | **Documentos institucionais soltos** | `CV-Filipe-Duque-2026.docx` na raiz do ORACULO | Sem lar para CV, CNPJ, contratos-modelo, portfólio |
| 6 | **Nomenclatura inconsistente** | `FIRMA-#04-Brasil-Participativo` vs `FIRMA-FAC-2026`; editais `EDITAL FAC 2026` vs `PROJETOS FAC ANTIGOS` | Dificulta busca e automação |
| 7 | **Legado sem destino** | `DOCUMENTOS ANTIGOS - AVALIAR E MIGRAR/` (718 itens) | Pasta-limbo que nunca é processada |
| 8 | **Pasta vazia / órfã** | `ORACULO-DA-FIRMA/` (placeholder vazio) | Ruído |
| 9 | **Falta README no ANTIGRAVITY** | — | Onboarding técnico impossível |

### 1.2 Score de organização (0–10)

| Aspecto | Hoje | Meta |
|---|---|---|
| Estrutura lógica | 7 | 9 |
| Clareza de propósito (CLAUDE.md, STATUS) | 8 | 9 |
| Limpeza de duplicatas | 3 | 9 |
| Organização de scripts | 4 | 8 |
| Documentação | 7 | 9 |
| Segurança (credenciais) | 4 | 9 |
| Nomenclatura | 6 | 9 |
| **Global** | **5,6** | **8,7** |

---

## 2. Os princípios da arquitetura

Quatro regras que orientam todas as decisões abaixo:

1. **Uma fonte de verdade por tipo de informação.** Cada coisa mora em um lugar só. Os demais lugares apenas *apontam* (link), não duplicam.
2. **Projeto é uma pasta única.** Tudo de um projeto (briefing, edital, orçamento, referências, entregas) vive junto, dentro do cérebro.
3. **O cérebro é o lar do conhecimento; o Notion é o lar dos dados; o ANTIGRAVITY é o lar do código.** Nunca misturar os três.
4. **Segredo nunca mora no repositório.** Credenciais ficam fora, sempre.

---

## 3. As camadas e o fluxo de verdade

O Oráculo opera em camadas. Cada uma tem um papel e uma fonte de verdade própria:

```
┌──────────────────────────────────────────────────────────────┐
│  NOTION (25 bancos)        → VERDADE DOS DADOS                 │
│  projetos, clientes, propostas, financeiro, tarefas, CRM      │
│        ↓ (o cérebro absorve e dá contexto)                    │
│  CÉREBRO / OBSIDIAN        → CONHECIMENTO + MEMÓRIA + PROJETOS │
│  briefings, processos, referências, logs, ARQUIVOS de projeto │
│        ↓ (a wiki sintetiza)                                    │
│  WIKI (hot/index/log)      → SÍNTESE NAVEGÁVEL                 │
│        ↓ (o git versiona)                                      │
│  GITHUB                    → VERSIONAMENTO / BACKUP            │
│        ↓ (o NotebookLM indexa)                                │
│  NOTEBOOKLM               → INTELIGÊNCIA / CONSULTA            │
│        ↓                                                       │
│  LIPE & JAYA              → DECISÃO                            │
└──────────────────────────────────────────────────────────────┘
```

**Quem é a fonte de verdade de quê:**

| Tipo de informação | Fonte de verdade | Onde NÃO deve ser editado |
|---|---|---|
| Dados estruturados (status de projeto, valores, prazos, contatos) | **Notion** | cérebro (só reflete/comenta) |
| Conhecimento, processos, briefings narrativos | **Cérebro/Obsidian** | Notion (só resumo/link) |
| Arquivos brutos de um projeto (edital, planilhas, .docx, referências) | **Cérebro → pasta do projeto** | espalhados em `PROJETOS - EDITAIS` |
| Código de sincronização e app | **ANTIGRAVITY** | cópias no ORACULO |
| Skills da comunidade/Antigravity | **`ANTIGRAVITY/SKILLS/`** (biblioteca) | cópias no ORACULO |

---

## 4. Arquitetura-alvo — ORACULO - FIRMA ABACAXI

```
ORACULO - FIRMA ABACAXI/
├── CLAUDE.md                     # identidade + routing (manter ≤200 linhas)
├── README.md                     # setup e instalação
├── STATUS.md                     # handoff de sessão (estado atual)
├── MEMORIA.md                    # aprendizados acumulados
├── .mcp.json / .claude/          # config Claude Code (intacto)
│
├── docs/                         # documentação operacional (referência)
│   ├── CONTEXTO_FIRMA.md
│   ├── FLUXO_TRABALHO.md
│   ├── TABELA_PRECOS.md
│   ├── MAPA-MESTRE.md            # ★ NOVO: onde mora cada coisa
│   └── arquivo/
│
├── cerebro/CEREBRO-ORACULO/      # ★ O CÉREBRO — lar do conhecimento
│   ├── 00-INBOX/
│   ├── 00-EMPRESA/               # ★ NOVO: documentos institucionais
│   │   ├── socios/               #   CV Lipe, CV Jaya, bios
│   │   ├── juridico/             #   CNPJ, contrato social, certidões
│   │   ├── contratos-modelo/     #   templates de contrato de prestação
│   │   ├── financeiro-empresa/   #   dados bancários, PIX, faturamento
│   │   └── portfolio/            #   reel, cases, apresentação comercial
│   ├── 01-OPERACAO-ORACULO/
│   │   └── 01.3-ARQUITETURA-TECNICA/   # ← este documento mora aqui
│   ├── 02-PROCESSOS-E-MANUAIS/
│   ├── 03-CLIENTES/              # dossiês padronizados por cliente
│   ├── 04-PROJETOS-ATIVOS/      # ★ FONTE ÚNICA dos projetos
│   │   ├── _INDEX.md
│   │   └── FIRMA-NN-Nome-Projeto/   # cada projeto = 1 pasta (ver §6)
│   │       ├── 00-INDEX.md
│   │       ├── 01-BRIEFING/
│   │       ├── 02-DOCUMENTACAO/
│   │       ├── 03-ORCAMENTO-CRONOGRAMA/
│   │       ├── 04-REFERENCIAS/
│   │       └── 05-ENTREGAS/
│   ├── 05-ARQUIVO-HISTORICO/    # projetos encerrados
│   ├── 06-ESTUDOS-E-REFERENCIAS/
│   ├── 07-LOGS-DE-SESSAO/
│   └── wiki/                     # síntese (hot, index, log, overview)
│
├── skills/                       # orquestradores por etapa do fluxo
├── output/                       # saídas geradas (propostas, roteiros…)
└── archive/                      # ★ legado datado (ver §8)
    └── 2026-06/
```

**Mudanças-chave em relação a hoje:**
- `00-EMPRESA/` nasce para abrigar tudo que é institucional (resolve o CV solto).
- `PROJETOS - EDITAIS/` deixa de existir como pasta-raiz: o conteúdo migra para dentro de cada projeto em `04-PROJETOS-ATIVOS/` (atual) ou `05-ARQUIVO-HISTORICO/` (FAC antigos).
- `DOCUMENTOS ANTIGOS - AVALIAR E MIGRAR/`, `PROJETO ORACULO APP ANTIGRAVITY/` e `ORACULO-DA-FIRMA/` desaparecem (duplicata → apagar; valor histórico → `archive/`).
- `docs/MAPA-MESTRE.md` nasce como índice de "onde mora cada coisa".

---

## 5. Arquitetura-alvo — ANTIGRAVITY

```
ANTIGRAVITY/
├── README.md                     # ★ NOVO: o que é, como rodar, ordem dos scripts
├── AGENTS.md                     # manifesto do Oráculo 3.0 (manter)
├── .agents/workflows/            # blueprints de automação (manter)
├── .claude/                      # config (manter)
│
├── app/  (oraculo-app/)          # Next.js — .next/ FORA do versionamento
│
├── scripts/                      # ★ scripts organizados por destino
│   ├── notion/                   #   sync, leitura, escrita Notion
│   ├── sheets/                   #   Google Sheets
│   ├── supabase/                 #   Supabase
│   ├── _lib/                     #   funções compartilhadas
│   └── pipeline.py               #   ★ orquestrador: ordem de execução
│
├── SKILLS/                       # biblioteca de skills (fonte única)
└── archive/                      # versões antigas de scripts/dados
```

**Credenciais saem do repositório:**
```
C:\Users\User\.secrets\           # ★ fora de qualquer repo
├── google_service_account.json
└── antigravity.env
```
O código passa a ler o caminho via variável de ambiente. `.gitignore` bloqueia `*.env`,
`*service_account*.json`, `.next/` e `node_modules/`.

---

## 6. Convenção de nomenclatura (padrão único)

### 6.1 Projetos
Formato: **`FIRMA-NN-Nome-Em-Kebab`** — onde `NN` é o número sequencial do projeto com dois
dígitos. Isso resolve a inconsistência atual (`FIRMA-#04-...` vs `FIRMA-FAC-2026`).

| Hoje | Padrão |
|---|---|
| `FIRMA-#04-Brasil-Participativo` | `FIRMA-04-Brasil-Participativo` |
| `FIRMA-FAC-2026` | `FIRMA-19-FAC-2026-Todas-as-Historias` |

> O `#` sai (atrapalha em terminal e URLs). O número vem sempre antes do nome.

### 6.2 Subpastas dentro de um projeto
Sempre as mesmas cinco, numeradas, para o Oráculo saber onde procurar:
`01-BRIEFING/` · `02-DOCUMENTACAO/` · `03-ORCAMENTO-CRONOGRAMA/` · `04-REFERENCIAS/` · `05-ENTREGAS/`

### 6.3 Outros
| Item | Padrão | Exemplo |
|---|---|---|
| Log de sessão | `AAAA-MM-DD-Titulo-Sessao.md` | `2026-06-07-Revisao-Arquitetura.md` |
| Output para cliente | `NomeCliente_tipodoc_vN.docx` | `SuperHost_proposta_v1.docx` |
| Documento institucional | `Tipo-Descricao.ext` | `CV-Filipe-Duque-2026.docx` |

---

## 7. Boas práticas de Claude Code aplicadas

Da documentação oficial e da pesquisa de mercado (fontes no rodapé), com o status no Oráculo:

| Boa prática | Recomendação | Status no Oráculo |
|---|---|---|
| **CLAUDE.md enxuto** | ≤ 200 linhas; só o que vale para tudo | ✅ raiz tem ~200 linhas — manter no limite |
| **Hierarquia de CLAUDE.md** | um por subdiretório relevante; o Claude lê de baixo pra cima | ⚠️ existe na raiz e no cérebro; faltam nos projetos/ANTIGRAVITY |
| **Imports com `@caminho`** | compor memória em vez de um arquivo gigante | ⚠️ hoje usa lista textual; pode migrar para `@docs/...` |
| **`.claude/` por projeto** | regras locais em `.claude/rules/` | ✅ já existe (`antigravity.md`, `financeiro.md`, `notion-schema.md`, `skills-routing.md`) |
| **Auto-memory** | deixar o Claude acumular notas entre sessões | ✅ via MEMORIA.md + protocolo de finalização |
| **Plan Mode primeiro** | tarefas complexas começam em modo plano | ✅ documentado no [[GUIA_ORACULO]] |
| **Hooks** | automatizar validações/leitura de contexto | ✅ SessionStart lê `hot.md` |

**Ajustes recomendados:** criar um `CLAUDE.md` curto na raiz do ANTIGRAVITY (regras técnicas)
e considerar migrar a seção "Contexto — leia sempre" do CLAUDE.md para imports `@docs/...`.

---

## 8. Higiene, segurança e legado

- **Credenciais:** mover `google_service_account.json` e `.env` para `C:\Users\User\.secrets\`; ajustar o código para ler dali; reforçar `.gitignore`. **Se já foram commitados em algum repo, rotacionar as chaves.**
- **Dados de cliente:** dossiês em `03-CLIENTES/` podem conter dados pessoais — tratar com cuidado (LGPD); não subir para serviços externos sem necessidade.
- **Legado:** o que é duplicata óbvia se apaga; o que tem valor histórico (orçamentos antigos, projetos FAC anteriores) vai para `archive/2026-06/` com um `README.md` explicando o conteúdo. Detalhe operacional em [[PLANO-MIGRACAO]].
- **Build do Next.js:** `.next/` e `node_modules/` nunca versionados (são regeneráveis).

---

## 9. Documentação que falta criar

Itens importantes que o sistema nunca teve e deveriam existir (prioridade decrescente):

| Prioridade | Documento | Onde | Por quê |
|---|---|---|---|
| 🔴 Alta | **`docs/MAPA-MESTRE.md`** | ORACULO/docs | Índice de "onde mora cada coisa" (Notion × Cérebro × Drive × ANTIGRAVITY). É a bússola do sistema. |
| 🔴 Alta | **`ANTIGRAVITY/README.md`** | ANTIGRAVITY | Onboarding técnico: o que é, como rodar, dependências. |
| 🔴 Alta | **Política de credenciais e backup** | ORACULO/docs ou `00-EMPRESA/` | Onde ficam segredos, como restaurar, frequência de backup. |
| 🟡 Média | **Pipeline de dados** | `ANTIGRAVITY/scripts/README.md` | Ordem de execução e dependências dos 57 scripts. |
| 🟡 Média | **Contratos-modelo** | `00-EMPRESA/contratos-modelo/` | Banco CONTRATO existe no Notion (Fase 3) mas sem template real. |
| 🟡 Média | **Bios dos sócios (Lipe e Jaya)** | `00-EMPRESA/socios/` | Referenciados no DNA, mas sem ficha estruturada. |
| 🟢 Baixa | **Template de dossiê de cliente** | `03-CLIENTES/_TEMPLATE.md` | Padronizar os dossiês (hoje raso). |
| 🟢 Baixa | **Convenção de nomenclatura (extrato)** | `docs/` | Versão curta da §6 para consulta rápida. |

---

## 10. Comparação com a arquitetura sugerida no NotebookLM

> ⚠️ **Pendente.** O NotebookLM estava com a autenticação expirada nesta sessão. Para eu
> comparar este blueprint com o arquivo de arquitetura sugerida que você guardou lá, rode no
> terminal `notebooklm login` (login via navegador) e me avise — eu leio o arquivo, comparo
> ponto a ponto e registro as diferenças aqui nesta seção.

Nesta passada usei como referência os equivalentes locais: [[GUIA_ORACULO]],
`wiki/projects/ORACULO-Cerebro.md` e as regras em `.claude/rules/`.

---

## Fontes (boas práticas Claude Code)
- Best practices — https://code.claude.com/docs/en/best-practices
- Memory / CLAUDE.md hierarchy — https://code.claude.com/docs/en/memory
- CLAUDE.md configuration hierarchy — https://agentfactory.panaversity.org/docs/General-Agents-Foundations/claude-code-teams-cicd/claude-md-configuration-hierarchy

---
*Blueprint gerado pelo Oráculo · Firma Abacaxi · 07/06/2026 · revisar a cada mudança estrutural.*
