# Oráculo — Firma Abacaxi
## Guia de instalação e uso no Claude Code

---

## O que é este projeto

O Oráculo é o sistema de inteligência operacional da Firma Abacaxi Ateliê Audiovisual.
Roda no Claude Code (terminal) e funciona como terceiro sócio de Lipe e Jaya.

```
Você faz: briefing, decisão criativa, aprovação final
Oráculo faz: pesquisa, proposta, orçamento, roteiro, gestão, conteúdo
```

---

## Pré-requisitos

- **Node.js** 18+ (para o MCP do Notion)
- **Claude Code** instalado ([docs.anthropic.com/claude-code](https://docs.claude.com/en/docs/claude-code/overview))
- **Conta Anthropic** com acesso ao Claude Code

---

## Instalação — passo a passo

### 1. Baixar e posicionar os arquivos

Copie esta pasta `oraculo/` para onde quiser no seu computador.
Recomendado: `~/oraculo/` ou `~/Documentos/oraculo/`

```bash
# Exemplo
cp -r oraculo/ ~/oraculo/
cd ~/oraculo/
```

### 2. Configurar o Notion (MCP)

Abra o arquivo `.mcp.json` e substitua `SEU_NOTION_TOKEN_AQUI` pelo seu token:

**Onde conseguir o token:**
1. Acesse [notion.so/my-integrations](https://notion.so/my-integrations)
2. Clique "Create new integration"
3. Nome: "Oráculo Firma Abacaxi"
4. Copie o "Internal Integration Token"
5. Cole no `.mcp.json`

**Dar acesso ao Notion:**
1. Abra cada banco (CRM, Propostas, Contatos, Clientes, Projeto 2026, Tarefas)
2. Clique em "Share" → adicione a integração
3. Repita para todos os 6 bancos

### 3. Iniciar o Claude Code

```bash
cd ~/oraculo/
claude
```

O Claude Code vai ler o `CLAUDE.md` automaticamente. O Oráculo está ativo.

---

## Como usar

### Comandos naturais — sem sintaxe especial

Basta falar com o Oráculo como faria com uma pessoa:

```
"Preciso de uma proposta para a CNV. Querem um documentário de 5 minutos
 sobre mediação de conflitos. Prazo: 45 dias. Budget não definido ainda."

"Qual é a ordem do dia?"

"Novo cliente: SuperHost, Instagram @superhost_br.
 Querem vídeo institucional de 2 min. Reunião de briefing amanhã."

"Monta o roteiro para o projeto CNV."

"Preciso de 5 posts para o Instagram com o making-of do projeto X."
```

### O Oráculo vai:

1. Identificar a tarefa
2. Carregar a skill certa
3. Fazer perguntas se precisar de mais informação
4. Pesquisar na web quando necessário
5. Executar
6. Salvar o resultado em `output/`

---

## Estrutura de arquivos

```
oraculo/
│
├── CLAUDE.md                ← Cérebro do Oráculo (não edite sem intenção)
├── MEMORIA.md               ← Alimente com aprendizados de cada projeto
├── .mcp.json                ← Configuração Notion (edite com seu token)
│
├── docs/                    ← Contexto permanente da Firma
│   ├── CONTEXTO_FIRMA.md
│   ├── FLUXO_TRABALHO.md
│   └── ARQUITETURA_NOTION.md
│
├── skills/                  ← Skills dos subagentes
│   ├── humanizador/SKILL.md    (usado por todas as skills)
│   ├── captacao/SKILL.md       (briefing e qualificação)
│   ├── proposta/               (proposta + orçamento + Word)
│   │   ├── SKILL.md
│   │   ├── blocos_xml.md
│   │   └── MODELO.docx
│   ├── preproducao/SKILL.md    (roteiro e decupagem)
│   ├── producao/SKILL.md       (set e filmagem)
│   ├── conteudo/SKILL.md       (posts e calendário)
│   └── gestao/SKILL.md         (ordem do dia e financeiro)
│
└── output/                  ← O que o Oráculo produz
    ├── propostas/
    ├── roteiros/
    ├── conteudo/
    └── relatorios/
```

---

## MEMORIA.md — como usar

O `MEMORIA.md` é o que torna o Oráculo mais inteligente ao longo do tempo.

**Alimente após cada projeto:**
```
"Adiciona no MEMORIA.md: cliente CNV prefere proposta direta, sem opções múltiplas."
"Registra que proposta de R$14k para vídeo institucional de 3min foi aprovada sem negociação."
```

O Oráculo vai pedir autorização antes de qualquer registro.

---

## Atualizar os arquivos da Firma

Se mudar algo na Firma (novos pacotes, nova equipe, novo fluxo):

1. Edite o arquivo correspondente em `docs/`
2. Na próxima sessão do Claude Code, o Oráculo já usa a versão atualizada

Não precisa de comando especial — é só editar o arquivo de texto.

---

## Claude Code vs Claude.ai — quando usar cada um

```
CLAUDE CODE (terminal, ~/oraculo/)
→ Gerar proposta em Word
→ Calcular orçamento
→ Montar roteiro e decupagem
→ Consultar Notion e criar registros
→ Qualquer tarefa com entregável final (arquivo)

CLAUDE.AI (navegador ou celular)
→ Conversa exploratória ("e se a gente mudasse o posicionamento...")
→ Você está no celular
→ Sessão rápida sem entregável
→ Reflexões estratégicas longas
```

---

## Troubleshooting

**Claude Code não lê o CLAUDE.md**
→ Verifique se está na pasta certa: `cd ~/oraculo/ && claude`

**Notion não conecta**
→ Verifique o token em `.mcp.json`
→ Confirme que a integração foi adicionada nos bancos (Share → adicionar)

**Proposta não gera Word**
→ Claude Code precisa de permissão para criar arquivos
→ Verifique se a pasta `output/propostas/` existe

---

## Fases de ativação das skills

```
FASE 1 — Agora
✅ skills/captacao    → ativo
✅ skills/proposta    → ativo

FASE 2 — Próximas semanas
⏳ skills/gestao
⏳ skills/preproducao

FASE 3 — Próximo mês
⏳ skills/producao

FASE 4 — Mês 2+
⏳ skills/conteudo
```

Ative uma fase de cada vez. Progressivo, não perfeito.

---

## Contato e suporte

Sistema desenvolvido com Claude (Anthropic) para Firma Abacaxi Ateliê Audiovisual.
Brasília, 2026.
