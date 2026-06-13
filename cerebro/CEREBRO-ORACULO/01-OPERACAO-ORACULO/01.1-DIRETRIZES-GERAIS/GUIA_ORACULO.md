# GUIA DO ORÁCULO — Claude Code + VS Code
## Melhores práticas, funcionalidades e plano de ferramentas
*Firma Abacaxi Ateliê Audiovisual · 2026*

> **Nota (jun/2026):** As seções STATUS ATUAL e FERRAMENTAS A INSTALAR são de mai/2026 e foram
> superadas pelo [`docs/PLANO-MASTER.md`](../../../../../docs/PLANO-MASTER.md) (tabela de 54
> ferramentas + Fases 0-5). O guia de funcionalidades (Partes 1-2) permanece válido.

---

# PARTE 1 — FUNCIONALIDADES PRINCIPAIS DO VS CODE + CLAUDE CODE

---

## Modos de operação (o mais importante)

O Claude Code tem 4 modos. Você alterna com **Shift+Tab** ou clicando no indicador no rodapé do painel.

```
DEFAULT         → Claude executa diretamente (pede confirmação em ações importantes)
ACCEPT EDITS    → Claude edita arquivos sem pedir confirmação a cada um
AUTO            → Claude faz tudo automaticamente (use com cautela)
PLAN            → Claude SÓ lê e planeja. Não altera nada. ← use sempre primeiro
```

**Regra de ouro:** Para qualquer tarefa complexa, comece em **PLAN MODE**.

---

## Plan Mode — seu melhor aliado

Ativa com **Shift+Tab** (até aparecer "plan mode on") ou digitando `/plan`.

O que acontece: Claude lê todos os arquivos relevantes, entende o contexto, propõe um plano passo a passo — e espera você aprovar antes de fazer qualquer coisa.

**Quando usar:**
- Antes de gerar qualquer proposta nova
- Antes de reorganizar arquivos ou estrutura
- Antes de qualquer mudança no Notion

**Exemplo de uso para o Oráculo:**
```
[Plan Mode ativado]
Você: "Quero gerar uma proposta completa para a CNV.
       Eles querem um documentário de 8 minutos sobre
       mediação de conflitos. Prazo: 45 dias. Budget: aberto."

Claude planeja:
→ Passo 1: Ler CLAUDE.md e CONTEXTO_FIRMA.md
→ Passo 2: Ler skills/proposta/SKILL.md
→ Passo 3: Pesquisar "CNV Brasil mediação" e preços de mercado
→ Passo 4: Conduzir briefing (X perguntas faltam)
→ Passo 5: Calcular orçamento (3 opções)
→ Passo 6: Escrever proposta
→ Passo 7: Humanizar
→ Passo 8: Gerar Word em output/propostas/

[Você aprova] → Claude executa
```

---

## @-mentions — referenciar arquivos direto no chat

Em vez de Claude procurar os arquivos (desperdiça tokens), você aponta direto.

No painel do Claude Code, digite `@` e o nome do arquivo:

```
@CLAUDE.md
@skills/proposta/SKILL.md
@MEMORIA.md
@docs/CONTEXTO_FIRMA.md
```

**Como usar na prática:**
```
"Usando @skills/proposta/SKILL.md como referência,
 gera uma proposta para o cliente SuperHost.
 Briefing: vídeo institucional 2min, R$15k budget."
```

Você também pode **selecionar um trecho de texto** no editor e pressionar
**Alt+K** — ele adiciona aquele trecho como contexto direto no chat.

---

## Comandos slash — controle total da sessão

Digite `/` no chat para ver todos os comandos. Os mais úteis:

| Comando | Para que serve |
|---|---|
| `/plan` | Ativa modo planejamento |
| `/clear` | Limpa o contexto (nova conversa, sem histórico) |
| `/compact` | Comprime o histórico para economizar tokens |
| `/mcp` | Ver MCPs conectados e status |
| `/doctor` | Diagnóstico completo do sistema |
| `/cost` | Ver quanto custou a sessão atual |
| `/rc` | Ativar Remote Control (acesso pelo celular) |
| `/login` | Entrar com sua conta Anthropic |

**Use `/clear` entre tarefas não relacionadas.** Contexto misturado = respostas piores.

---

## Diff inline — revisar antes de aceitar

Quando Claude edita um arquivo, o VS Code mostra as mudanças em verde/vermelho
no próprio editor — igual ao Git.

```
Botões que aparecem:
[Accept]        → aceita a mudança
[Reject]        → rejeita e mantém o original
[Accept All]    → aceita todas as mudanças pendentes
```

Você nunca precisa aceitar às cegas. Sempre revise o diff antes de confirmar.

---

## Múltiplas abas de conversa

No painel do Claude Code, clique em **+** para abrir uma nova conversa em aba separada.

**Como usar:**
- Aba 1: Trabalhando em uma proposta
- Aba 2: Consultando o Notion em paralelo
- Aba 3: Gerando posts de conteúdo

Cada aba é uma sessão independente com seu próprio contexto.

---

## Remote Control — trabalhar pelo celular

Ativa no terminal do VS Code:
```bash
claude --remote-control "Oráculo Firma Abacaxi"
```

Aparece um QR code ou link. Abra o **app Claude no celular** → aba **Code** → sua sessão aparece.

Do celular você pode:
- Mandar briefings por voz (microfone do celular)
- Ver o status de propostas em andamento
- Aprovar ou rejeitar planos
- Verificar Ordem do Dia

**O PC precisa ficar ligado e com o terminal aberto.**

---

## Histórico de conversas

No painel superior do Claude Code (ícone de relógio), você acessa todas as conversas anteriores da pasta atual. Útil para retomar uma proposta que ficou pela metade.

---

# PARTE 2 — MELHORES PRÁTICAS

---

## 1. Sempre comece com Plan Mode em tarefas complexas

Antes de pedir qualquer entregável (proposta, roteiro, relatório), ative o Plan Mode.
Revise o plano. Corrija antes de executar. Economiza tempo e tokens.

---

## 2. Use @-mentions em vez de deixar Claude procurar

```
❌ "Gera uma proposta usando as regras da Firma"
✅ "Gera uma proposta usando @skills/proposta/SKILL.md e @MEMORIA.md"
```

---

## 3. /clear entre tarefas diferentes

Cada proposta é uma sessão nova. Contexto de uma proposta antiga vai atrapalhar a próxima.

```
[Terminou proposta CNV]
→ /clear
[Começa proposta SuperHost do zero]
```

---

## 4. Use /compact quando a conversa ficar longa

Quando a sessão passa de 1 hora ou tem muita troca de mensagens, o contexto fica pesado.
`/compact` resume o histórico e libera espaço sem perder o fio da conversa.

---

## 5. Alimente o MEMORIA.md depois de cada projeto

Ao fechar uma proposta ou projeto, peça ao Oráculo:
```
"Tivemos algum aprendizado relevante hoje para registrar no MEMORIA.md?"
```

Ele vai sugerir o que vale guardar. Você aprova. Com o tempo, o Oráculo fica muito melhor.

---

## 6. Seja específico nos prompts

```
❌ "Cria uma proposta"
✅ "Cria uma proposta para a CNV. Documentário 8min.
    Budget R$25k. Prazo 45 dias. 2 locações em Brasília.
    Perfil do cliente: institucional, formal. Sem entrevistas."
```

Quanto mais contexto você dá, menos perguntas o Oráculo faz.

---

## 7. Para tarefas simples — não use Plan Mode

Ordem do Dia, busca no Notion, gerar um e-mail rápido — vá direto.
Plan Mode é para tarefas com múltiplas etapas e arquivos.

---

# PARTE 3 — PLANO DE FERRAMENTAS DO ORÁCULO

---

## STATUS ATUAL

```
✅ Claude Code + VS Code (funcionando)
✅ Notion MCP (bancos conectados)
✅ Filesystem MCP (lê e cria arquivos)
✅ DuckDuckGo MCP (busca web gratuita)
✅ Oráculo ativo (CLAUDE.md lido)
```

---

## FERRAMENTAS A INSTALAR — por fase

---

### FASE 1 — ESTA SEMANA

#### Remote Control (celular)
**O que faz:** Controla o Claude Code pelo app Claude no celular
**Como ativar:** No terminal do VS Code: `claude --remote-control "Oráculo"`
**Pré-requisito:** Conta Claude Pro ou Max + app Claude instalado no celular
**Por que importa:** Você manda briefings por voz do celular enquanto o PC trabalha

---

#### GitHub MCP
**O que faz:** Acessa repositórios, baixa skills da comunidade, versiona o Oráculo
**Como instalar:** No terminal do VS Code:
```bash
claude mcp add-json github "{\"type\":\"http\",\"url\":\"https://api.githubcopilot.com/mcp\",\"headers\":{\"Authorization\":\"Bearer SEU_TOKEN\"}}"
```
**Criar token:** github.com → Settings → Developer settings → Personal access tokens (classic)
→ Marcar: `repo`, `read:org`, `read:user`
**Por que importa:** Baixar skills prontas da comunidade, versionar o Oráculo

---

#### Obsidian
**O que faz:** Interface visual para editar os arquivos .md do Oráculo
**Como instalar:** obsidian.md → baixar → abrir a pasta do Oráculo como vault
**Por que importa:** Editar MEMORIA.md de forma visual, ver conexões entre arquivos
**Não substitui o Claude Code** — é um editor visual dos mesmos arquivos

---

### FASE 2 — SEMANA 2

#### Whisper (transcrição de áudio)
**O que faz:** Transcreve arquivos de áudio para texto em português
**Como instalar:**
```bash
pip install openai-whisper
pip install torch
```
**Como usar no Oráculo:**
```
Coloque o áudio na pasta do Oráculo e diga:
"Transcreve o arquivo reuniao-cliente.mp3"
```
**Por que importa:** Transcrever briefings gravados, reuniões, making-of

---

#### Claude Whisper (extensão VS Code)
**O que faz:** Grava sua voz e manda a transcrição direto para o chat do Claude Code
**Como instalar:** VS Code → Ctrl+Shift+X → buscar "Claude Whisper" → instalar
**Por que importa:** Quando tiver microfone — manda briefings por voz sem digitar
**Observação:** Use o celular via Remote Control como alternativa de voz.

---

#### Git (versionamento)
**O que faz:** Histórico de todas as mudanças nos arquivos do Oráculo
**Como configurar:** No terminal do VS Code:
```bash
git init
git add .
git commit -m "Oráculo v1.0 — estrutura inicial"
```
Criar `.gitignore` na pasta com:
```
.mcp.json
*.env
```
**Por que importa:** Se algo quebrar, você volta atrás. Backup automático.

---

### FASE 3 — SEMANA 3

#### Google Drive MCP
**O que faz:** Acessa documentos e arquivos do Google Drive direto pelo Oráculo
**Como instalar:** Adicionar no `.mcp.json`:
```json
"gdrive": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-gdrive"]
}
```
**Por que importa:** Acessar contratos, materiais de clientes, arquivos de projeto

---

#### Memory MCP
**O que faz:** Memória persistente entre sessões (complementa o MEMORIA.md)
**Como instalar:** Adicionar no `.mcp.json`:
```json
"memory": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-memory"]
}
```
**Por que importa:** O Oráculo lembra de contextos entre sessões automaticamente

---

### FASE 4 — MÊS 2

#### Bot Telegram
**O que faz:** Recebe briefings pelo Telegram e aciona o Oráculo automaticamente
**Como instalar:** Script Node.js (montar quando chegar nessa fase)
**Por que importa:** Captura de briefings pelo celular sem abrir o PC

---

#### Google NotebookLM (web, sem instalação)
**O que faz:** Analisa documentos longos (contratos, relatórios, briefings extensos)
**Como usar:** notebooklm.google.com → upload do documento → fazer perguntas
**Por que importa:** Analisar contratos recebidos, resumir briefings longos

---

## CHECKLIST GERAL

```
HOJE
✅ Claude Code + VS Code
✅ Notion MCP
✅ Filesystem MCP
✅ DuckDuckGo MCP
⬜ Remote Control (testar: claude --remote-control "Oráculo")
⬜ Obsidian (instalar e abrir a pasta)
⬜ GitHub MCP (criar token + instalar)

SEMANA 2
⬜ pip install openai-whisper
⬜ Claude Whisper (extensão VS Code — quando tiver mic)
⬜ git init + primeiro commit
⬜ Testar proposta completa com cliente real

SEMANA 3
⬜ Google Drive MCP
⬜ Memory MCP

MÊS 2
⬜ Bot Telegram
⬜ Google NotebookLM (web, sem instalação)
⬜ Automações (Ordem do Dia automática)
```

---

## ATALHOS RÁPIDOS DO DIA A DIA

| Ação | Como fazer |
|---|---|
| Abrir Claude Code | Terminal: `claude` |
| Modo planejamento | `Shift+Tab` ou `/plan` |
| Referenciar arquivo | Digite `@` + nome do arquivo |
| Limpar contexto | `/clear` |
| Compactar sessão longa | `/compact` |
| Ver MCPs conectados | `/mcp` |
| Diagnóstico geral | `/doctor` |
| Controlar pelo celular | `claude --remote-control "Oráculo"` |
| Ver custo da sessão | `/cost` |
| Aceitar todas as edições | Botão `Accept All` no painel |

---

## FLUXO IDEAL DE UMA PROPOSTA

```
1. Abra VS Code na pasta do Oráculo
2. Terminal: claude --remote-control "Proposta [Cliente]"
   → Anote o link para acompanhar pelo celular se precisar

3. No chat do Claude Code:
   [Ative Plan Mode: Shift+Tab]

4. "Preciso de uma proposta para [cliente].
    [briefing que você tem]"

5. Claude planeja → você revisa o plano → aprova

6. Claude executa:
   → Pesquisa o cliente (DuckDuckGo)
   → Lê skills/proposta/SKILL.md
   → Faz perguntas se faltar info
   → Calcula orçamento
   → Escreve proposta
   → Gera Word em output/propostas/

7. Você revisa o diff → Accept

8. Salva no Notion (Claude Code acessa via MCP)

9. /clear → pronto para próxima tarefa
```

---

*Documento gerado pelo Oráculo · Firma Abacaxi · 2026*
*Atualize este arquivo conforme novas ferramentas forem instaladas*
