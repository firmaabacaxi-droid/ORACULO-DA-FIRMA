# FASE 2 — Implementação Completa do Ecossistema Oráculo

**Status:** 🟠 Em análise | **Última atualização:** Mai 23, 2026 | **Versão:** v1.1

---

## Visão geral

Fase 2 consolida a integração do ecossistema: bancos Notion funcionais, Google Drive conectado, Frame.io para aprovação de vídeos, e o site da Firma no ar. Tem 3 frentes do roadmap + 2 pendências críticas da Fase 1.

**Duração estimada:** 2-3 semanas (depende de ações manuais de Lipe/Jaya)

**Custo:** +R$160/mês (Google Drive, Frame.io, Framer, domínio)

---

## Diagnóstico — Varredura completa do sistema (Mai 23, 2026)

Antes de iniciar a Fase 2, o Oráculo fez uma varredura completa dos dois repositórios (ANTIGRAVITY e ORACULO - FIRMA ABACAXI). Estas são as conclusões que impactam diretamente a execução desta fase.

### O que está sólido e pode ser usado como base

- **CLAUDE.md** com routing de skills funcionando e bem estruturado
- **7 skills da Firma** (captacao, proposta, preproducao, producao, conteudo, gestao, humanizador) com lógica clara
- **6 bancos Notion da Fase 1** com leitura e escrita simples confirmadas
- **docs/** com 7 documentos de contexto completos e referenciados entre si
- **Obsidian Vault** (cerebro/) organizado em 4 seções, com 120+ orçamentos históricos catalogados
- **6 propostas Word** já geradas (BrasilParticipativo v1–v4, EVENTO UNB, SuperHost)
- **STATUS.md e MEMORIA.md** funcionando como log de sessão e base de aprendizados
- **80+ skills ANTIGRAVITY** disponíveis como biblioteca, incluindo 8 já importadas em `skills/antigravity/`

### Pendências críticas identificadas — devem ser resolvidas antes ou junto com a Fase 2

**🔴 SEGURANÇA — Credenciais expostas no ANTIGRAVITY:**
O arquivo `c:\Users\User\Documents\ANTIGRAVITY\.env` contém 4 chaves em plaintext:
- `OPENAI_API_KEY` → revogar em platform.openai.com/api-keys
- `NOTION_TOKEN` (ORGANIZABOT) → revogar em notion.so/my-integrations
- `SUPABASE_SERVICE_ROLE_KEY` → revogar no painel Supabase
- `GEMINI_API_KEY` → revogar em console.cloud.google.com

> Fazer antes de qualquer outra coisa. Se esse arquivo já esteve em repositório, as chaves estão comprometidas.

**🟠 Geração automática de Word — nunca testada de ponta a ponta:**
O script `ANTIGRAVITY/scripts/generate_proposal_docx.py` e a `skills/proposta/SKILL.md` estão prontos, mas o fluxo completo (briefing → skill → geração → arquivo .docx) nunca foi validado em tarefa real. As 6 propostas existentes foram geradas manualmente. Isso é um risco para a Fase 2, que depende desse fluxo funcionando.

**🟠 Relações bidirecionais no Notion — não validadas:**
Leitura e escrita simples confirmadas. Mas criar um Projeto no Notion e linkar automaticamente com Cliente + Proposta (relações bidirecionais entre bancos) ainda não foi testado. O Sprint A1 depende disso funcionar.

**🟠 Subagentes — prompts prontos, nenhum validado com tarefa real:**
Os 5 system prompts em `docs/SUBAGENTES.md` estão prontos. O `GUIA_SUBAGENTES_SETUP.md` ainda não foi criado (está no checklist do Sprint A2). Nenhum subagente foi testado com uma tarefa concreta.

**🟡 Clientes reais não cadastrados no Notion:**
CNV, SuperHost (além da proposta), Tamause, Vert, Cerrado e Chichá estão mencionados em MEMORIA.md e docs/ mas não foram registrados nos bancos Notion da Fase 1. O Sprint A1 vai criar relações com PROJETO_2026, mas se os Clientes não estiverem cadastrados, as relações ficam incompletas.

**🟡 Pasta "DOCUMENTOS ANTIGOS — AVALIAR E MIGRAR" nunca processada:**
Existe na raiz do projeto desde a Fase 1. Pode conter contexto útil para os bancos da Fase 2. Avaliar antes de criar os bancos de CRIATIVO e ANÁLISE TÉCNICA.

**🟡 ANTIGRAVITY desorganizado — 70+ scripts obsoletos:**
A raiz do ANTIGRAVITY acumulou dezenas de scripts Python de migração/limpeza de fases anteriores. Não afeta o Oráculo diretamente, mas dificulta manutenção. Limpar após Fase 2 estabilizar.

### Impacto na ordem de execução

A varredura revelou que a ordem ideal da Fase 2 muda levemente:

```
ANTES de iniciar qualquer sprint:
  0. [CRÍTICO] Revogar credenciais expostas no ANTIGRAVITY/.env
  0. [CRÍTICO] Testar geração de Word ponta a ponta (briefing → .docx)
  0. [CRÍTICO] Testar relação bidirecional no Notion (Projeto → Cliente → Proposta)
  0. Cadastrar clientes reais no Notion (CNV, Tamause, Vert, Cerrado, Chichá)

SÓ DEPOIS:
  Sprint A1 → A2 → B → C → D (ordem original mantida)
```

---

---

## Divisão de trabalho

| Tarefa | Quem executa | Tipo |
|---|---|---|
| 5 bancos Notion | Oráculo | Automático (MCP) |
| Google Drive MCP | Oráculo | Configuração |
| Subagentes no claude.ai | Lipe/Jaya | Manual |
| Frame.io (conta + projeto) | Lipe/Jaya | Manual |
| Frame.io (skills + guia) | Oráculo | Automático |
| Domínio (registro) | Lipe/Jaya | Manual |
| Site — conteúdo | Oráculo | Automático |
| Site — montagem | Lipe/Jaya | Manual (Framer) |

---

## Sprint A — Pendências críticas da Fase 1

### A1 — Criar 5 bancos Notion da Fase 2

**Status:** ⏳ Aguardando — bloqueado pelo teste de relações bidirecionais

> **Observação da varredura:** A escrita simples no Notion foi confirmada, mas criar os 5 bancos abaixo sem antes validar as relações é arriscado. Se o link Projeto ↔ Proposta ↔ Cliente não funcionar corretamente no MCP, os bancos ficam desconectados do hub. Testar com um projeto real (ex: Brasil Participativo) antes de criar os novos bancos.

**Bancos a criar:**

| Banco | Prefixo | Função principal | Campos essenciais |
|---|---|---|---|
| **ORÇAMENTO** | ORC- | Tabela detalhada de custos por projeto | Item, Projeto, Categoria (7 tipos), Tipo (Custo/Receita), Valor unitário, Quantidade, Total (fórmula), Status, Fornecedor |
| **CRIATIVO** | CRI- | Roteiros e decupagens com histórico de versões | Título, Projeto, Tipo (Roteiro/Conceito/Decupagem/Referência/Moodboard), Status, Responsável, Conteúdo (rich text), Arquivo (se houver) |
| **ANÁLISE TÉCNICA** | ANT- | Breakdown técnico de cenas | Cena, Projeto, Roteiro relacionado, Descrição, Ângulo câmera, Movimento câmera, Tipo de plano, Iluminação (estilo), Equipamentos, Locação, Duração estimada, Responsável |
| **FINANCEIRO_PROJETO** | FIN- | Controle de receitas e despesas específicas por projeto | Descrição, Projeto, Tipo (Receita/Despesa), Categoria (5 tipos), Valor, Data, Status (4 estágios), Forma de pagamento, Comprovante (link/arquivo), Nota fiscal (link) |
| **CRONOGRAMA** | CRO- | Hub temporal integrado de todos os prazos | Evento, Projeto, Tipo (Reunião/Filmagem/Entrega/Prazo/Marco), Data início, Data fim (opcional), Status (4 estágios), % conclusão, Responsável |

**Todas com relação obrigatória para PROJETO_2026 (hub central).**

**Checklist de execução:**
- [ ] **PRÉ-REQUISITO:** Testar relação bidirecional nos 6 bancos da Fase 1 (criar Projeto → linkar Proposta → confirmar link reverso)
- [ ] **PRÉ-REQUISITO:** Cadastrar clientes reais (CNV, Tamause, Vert, Cerrado, Chichá) no banco CLIENTES
- [ ] Criar ORÇAMENTO (com autorização)
- [ ] Criar CRIATIVO (com autorização)
- [ ] Criar ANÁLISE TÉCNICA (com autorização)
- [ ] Criar FINANCEIRO_PROJETO (com autorização)
- [ ] Criar CRONOGRAMA (com autorização)
- [ ] Testar relações entre bancos com um projeto existente (Brasil Participativo)
- [ ] Commit git: "feat: criar 5 bancos Notion Fase 2"

**Data de início estimada:** [A confirmar]
**Data de conclusão estimada:** [A confirmar]

---

### A2 — Preparar subagentes para claude.ai

**Status:** ⏳ Aguardando — GUIA_SUBAGENTES_SETUP.md ainda não foi criado

> **Observação da varredura:** Os 5 system prompts existem em `docs/SUBAGENTES.md` e estão bem estruturados. Mas nenhum foi testado com uma tarefa real ainda. Recomendação: ao criar o GUIA, incluir um "teste mínimo" para cada subagente antes de entregar para Lipe/Jaya. Evita descobrir problemas depois que eles já estiverem tentando usar em produção.

O Oráculo prepara; Lipe/Jaya executam manualmente.

**O que precisa ser feito:**

1. ✅ System prompts dos 5 subagentes estão prontos em `docs/SUBAGENTES.md`
   - Agente de Proposta (briefing + propostas)
   - Agente de Produção (roteiro + decupagem + plano de filmagem)
   - Agente de Gestão (ordem do dia + financeiro + relatórios)
   - Agente de Conteúdo (calendário editorial + posts)
   - Agente de Captação (atendimento externo — futuro)

2. ✅ Documentos de contexto já identificados em cada prompt

3. ⏳ Oráculo precisa criar: `docs/GUIA_SUBAGENTES_SETUP.md` (tutorial passo a passo)

**Checklist de execução (Lipe/Jaya):**
- [ ] Ler `docs/GUIA_SUBAGENTES_SETUP.md` gerado pelo Oráculo
- [ ] Criar Project 1: Agente de Proposta (copiar prompt + fazer upload de contexto)
- [ ] Criar Project 2: Agente de Produção
- [ ] Criar Project 3: Agente de Gestão
- [ ] Criar Project 4: Agente de Conteúdo
- [ ] Testar 1 Project com um task real (ex: gerar proposta para cliente hipotético)
- [ ] Slack/e-mail: enviar links dos Projects para Oráculo

**Data de início estimada:** [A confirmar com Lipe]
**Data de conclusão estimada:** [A confirmar]

---

## Sprint B — Google Drive MCP

**Status:** 📋 Design — skill disponível, credenciais pendentes

> **Observação da varredura:** A skill `google-drive-integration/` já existe no ANTIGRAVITY e está importada em `skills/antigravity/`. O `.mcp.json` do projeto já tem filesystem MCP configurado mas sem o caminho do Drive. A Abordagem A (Desktop + filesystem) é a mais rápida de implementar — só depende de Lipe confirmar o caminho da pasta. A `google_service_account.json` existe no ANTIGRAVITY (2.37 KB), caso a Abordagem B seja necessária.

### Diagnóstico

Google Drive não está conectado. Opções:
- **Opção A (recomendada):** usar Google Drive Desktop local + filesystem MCP (simples, sem OAuth)
- **Opção B:** instalar MCP de Google Drive (mais complexo, requer Google Cloud Console)

### Abordagem A — Google Drive Desktop + filesystem MCP (RECOMENDADA)

**Pré-requisito (Lipe confirma):**
- [ ] Google Drive Desktop instalado e sincronizado
- [ ] Caminho da pasta Drive identificado (ex: `G:\My Drive` ou `C:\Users\User\Google Drive`)

**O que o Oráculo faz:**
1. Adicionar o caminho da pasta Drive no `.mcp.json` (permitir acesso via filesystem MCP)
2. Criar estrutura de pastas padrão dentro do Drive
3. Testar acesso lendo/escrevendo um arquivo de teste

**Arquivo a modificar:** `.mcp.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": [...],
      "allowedDirectories": [
        "c:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI",
        "[CAMINHO-DO-DRIVE-AQUI]"  // ex: G:\\My Drive
      ]
    }
  }
}
```

**Estrutura de pastas a criar no Drive:**

```
FIRMA ABACAXI/
├── PROJETOS/
│   ├── [PRJ-001] Brasil Participativo/
│   │   ├── GRAVAÇÕES/
│   │   ├── EDIÇÃO/
│   │   ├── ENTREGA/
│   │   └── MATERIAIS/
│   ├── [PRJ-002] SuperHost/
│   ├── [PRJ-003] Evento UnB/
│   └── _TEMPLATE/
│       ├── GRAVAÇÕES/
│       ├── EDIÇÃO/
│       └── ENTREGA/
├── PROPOSTAS/
├── MODELOS/
│   └── MODELO_ORCAMENTO.docx
└── FINANCEIRO/
    └── Planilhas/
```

**Checklist de execução:**
- [ ] Confirmar caminho da pasta Drive
- [ ] Editar `.mcp.json` com o caminho
- [ ] Criar estrutura de pastas no Drive
- [ ] Testar acesso: listar arquivos da pasta Drive via Oráculo
- [ ] Commit git: "feat: conectar Google Drive via filesystem MCP"

**Data de início estimada:** [A confirmar]
**Data de conclusão estimada:** [A confirmar]

### Abordagem B — MCP de Google Drive (ALTERNATIVA)

Se Google Drive Desktop não estiver disponível, instalar via:
```
npx -y @modelcontextprotocol/server-gdrive
```

Requer:
- Google Cloud Console setup (OAuth)
- Documentação em `docs/GUIA_DRIVE_MCP.md` (Oráculo cria)
- Configuração no `.mcp.json`

⚠️ Mais complexo — usar apenas se Abordagem A não for viável.

---

## Sprint C — Frame.io

**Status:** 📋 Design — pode começar a qualquer momento (não tem dependência técnica do Oráculo)

> **Observação da varredura:** Frame.io é 100% ação manual de Lipe/Jaya. O Oráculo só precisa criar o GUIA_FRAMEIO.md e atualizar as skills de produção e gestão. Isso pode ser feito em paralelo com Sprint A ou B, sem bloquear nada. Criar o guia e atualizar as skills é rápido (2–3 horas de trabalho do Oráculo). O gargalo real é Lipe criar a conta e testar o upload.

### O que é

Frame.io é uma plataforma de revisão de vídeo profissional. O cliente assiste, comenta direto no timestamp, elimina e-mails confusos.

### Ações de Lipe/Jaya (manual)

**Checklist:**
- [ ] Criar conta em frame.io (plano gratuito — 2GB)
- [ ] Criar "Project Template" padrão com pastas:
  - [ ] Corte 1
  - [ ] Corte 2
  - [ ] Corte Final
- [ ] Testar fluxo: fazer upload de um vídeo, deixar comentário, confirmar notificação

**Guia:** [Ver GUIA_FRAMEIO.md quando gerado]

### Ações do Oráculo

**Checklist:**
- [ ] Criar `docs/GUIA_FRAMEIO.md` — tutorial completo de uso
- [ ] Atualizar `skills/producao/SKILL.md` — adicionar Frame.io nas Etapas 8, 9, 10
- [ ] Atualizar `skills/gestao/SKILL.md` — adicionar Frame.io no acompanhamento de edição
- [ ] Criar template de e-mail de envio: "Seu corte está pronto para revisão em [Frame.io link]..."
- [ ] Commit git: "docs: adicionar Frame.io no fluxo de edição"

**Data de início estimada:** [Após A1 e B]
**Data de conclusão estimada:** [A confirmar]

---

## Sprint D — Site da Firma (Framer)

**Status:** 📋 Design — conteúdo pode ser gerado agora, sem pré-requisitos técnicos

> **Observação da varredura:** A pasta `output/site/` existe mas está vazia (só tem .gitkeep). Todo o conteúdo necessário para gerar os 5 arquivos MD está disponível: DNA em `docs/CONTEXTO_FIRMA.md`, projetos reais em `output/propostas/`, histórico de clientes em `cerebro/CEREBRO-ORACULO/02-CLIENTES/`. Este sprint pode começar em paralelo com qualquer outro — é o que tem menor risco e menor dependência. Gerar o conteúdo agora também ajuda a identificar lacunas no portfólio antes de Lipe montar o Framer.

### Estrutura do site

```
Home             → Hero + showreel + CTA
Trabalhos        → Portfólio selecionado (5–8 projetos)
Quem somos       → Lipe e Jaya + missão + valores
Serviços         → Pacotes e tipos de produção
Contato          → Formulário + WhatsApp + Instagram
```

### Conteúdo a gerar (Oráculo)

**Checklist:**
- [ ] `output/site/home.md` — hero, tagline, CTA, showreel embed
- [ ] `output/site/sobre.md` — bios de Lipe e Jaya, missão, valores
- [ ] `output/site/servicos.md` — 4 pacotes com descrições
- [ ] `output/site/portfolio.md` — 5–8 projetos com description, imagens, link case study
- [ ] `output/site/contato.md` — formulário simples + links diretos
- [ ] Commit git: "content: gerar conteúdo do site para Framer"

**Referências de conteúdo:**
- `docs/CONTEXTO_FIRMA.md` — DNA, valores, pacotes
- `output/propostas/` — projetos reais para portfolio
- `cerebro/CEREBRO-ORACULO/02-CLIENTES/` — stories de clientes

**Ações de Lipe/Jaya (manual):**

**Checklist:**
- [ ] Registrar domínio (sugestão: firmaabacaxi.com.br via Registro.br — R$40/ano)
- [ ] Criar conta no Framer (plano Mini — ~R$90/mês)
- [ ] Montar o site usando o conteúdo gerado
- [ ] Conectar domínio ao Framer
- [ ] Testar em mobile + desktop
- [ ] Publicar

**Data de início estimada:** [Após conteúdo gerado]
**Data de conclusão estimada:** [A confirmar]

---

## Ordem de execução recomendada

> **Revisada após varredura de Mai 23, 2026** — adicionados pré-requisitos da Fase 1 não concluídos.

```
ANTES DE QUALQUER SPRINT (desbloqueadores):
  0a. [🔴 HOJE] Revogar credenciais expostas no ANTIGRAVITY/.env
       → OpenAI, Notion ORGANIZABOT, Supabase, Gemini
  0b. [🔴 HOJE] Testar geração de Word ponta a ponta
       → generate_proposal_docx.py com dados de um cliente real
       → Validar output em output/propostas/
       → Documentar resultado em STATUS.md
  0c. [🔴 ESTA SEMANA] Validar relações bidirecionais no Notion
       → Criar Projeto real → linkar Cliente + Proposta → confirmar link reverso
       → Só avançar para Sprint A1 depois disso confirmado
  0d. [🟠 ESTA SEMANA] Cadastrar clientes reais no Notion
       → CNV, Tamause, Vert, Cerrado, Chichá

SESSÃO ATUAL (ou próximas 1–2):
  1. Sprint A1: Criar 5 bancos Notion (com autorização — após 0c concluído)
  2. Sprint A2: Gerar GUIA_SUBAGENTES_SETUP.md (com teste mínimo por subagente)
  3. Sprint D: Gerar conteúdo do site em output/site/ (pode rodar em paralelo)
  4. Sprint C: Criar GUIA_FRAMEIO.md + atualizar skills producao/ e gestao/

APÓS LIPE/JAYA EXECUTAREM TAREFAS MANUAIS:
  5. Sprint B: Confirmar caminho do Drive → configurar .mcp.json
  6. Sprint B: Criar estrutura de pastas FIRMA ABACAXI/ no Drive
  7. Sprint C: Lipe cria conta Frame.io + testa upload
  8. Teste integrado: novo projeto via Notion → pasta no Drive → Frame.io para edição

FINAL:
  9. Commit consolidado: "refactor: Fase 2 completa — 5 bancos, Drive, Frame.io, site"
  10. Atualizar CLAUDE.md: marcar Fase 2 como concluída, Fase 3 iniciada
  11. Limpar ANTIGRAVITY: deletar archive/ORACULO_V4-V6, scripts Python obsoletos
```

---

## Arquivos a criar/modificar

### Criar
```
docs/GUIA_SUBAGENTES_SETUP.md              ← Tutorial para Lipe criar Projects no claude.ai
docs/GUIA_FRAMEIO.md                       ← Tutorial Frame.io (uso, fluxo, e-mail template)
output/site/home.md                        ← Conteúdo home
output/site/sobre.md                       ← Conteúdo sobre
output/site/servicos.md                    ← Conteúdo serviços
output/site/portfolio.md                   ← Conteúdo portfólio
output/site/contato.md                     ← Conteúdo contato
docs/FASE2_IMPLEMENTACAO.md                ← Este documento (já criado)
```

### Modificar
```
.mcp.json                                  ← Adicionar caminho do Drive no filesystem MCP
skills/producao/SKILL.md                   ← Adicionar Frame.io nas Etapas 8, 9, 10
skills/gestao/SKILL.md                     ← Adicionar Frame.io no acompanhamento
CLAUDE.md                                  ← Marcar Fase 2 como "em andamento"
```

### Criar no Notion (via MCP com autorização)
```
Banco ORÇAMENTO
Banco CRIATIVO
Banco ANÁLISE TÉCNICA
Banco FINANCEIRO_PROJETO
Banco CRONOGRAMA
```

---

## Verificação pós-Fase 2

Ao finalizar, verificar:

- [ ] 5 novos bancos Notion visíveis e relacionados ao PROJETO_2026
- [ ] `.mcp.json` atualizado com caminho do Drive
- [ ] Acesso ao Drive funcionando (testar listando uma pasta)
- [ ] `output/site/` contém 5 arquivos MD de conteúdo
- [ ] `docs/GUIA_FRAMEIO.md` e `docs/GUIA_SUBAGENTES_SETUP.md` existem
- [ ] `skills/producao/` e `skills/gestao/` mencionam Frame.io
- [ ] Subagentes criados no claude.ai (verificar links)
- [ ] Domínio registrado e site no ar (verificar accesso)
- [ ] `git log` mostra commits de cada sprint

---

## Notas e decisões

| Aspecto | Decisão | Motivo |
|---|---|---|
| Google Drive | Usar Abordagem A (Desktop + filesystem MCP) | Simples, sem OAuth, sem servidor extra |
| Frame.io | Integração de processo, não técnica | Não existe MCP oficial, manual setup é rápido |
| Site | Conteúdo gerado + montagem manual | Framer é visual, Oráculo foca em texto |
| Bancos Notion | Todos com relação para PROJETO_2026 | Garante integridade referencial |
| Credenciais | Revogar ANTES de iniciar Fase 2 | .env exposto no ANTIGRAVITY com 4 keys em plaintext |
| Geração de Word | Testar ANTES de Sprint A1 | Fluxo nunca validado de ponta a ponta — risco alto |
| Subagentes | Incluir teste mínimo no GUIA | Evitar que Lipe/Jaya descubram problemas em produção |
| Clientes Notion | Cadastrar junto com Sprint A1 | Bancos com relações ficam incompletos sem os registros |

---

**Próximas fases:**

- **Fase 3:** Automações A1–A5 (Make/n8n), ElevenLabs, Whisper + Ferramentas de IA para Produção (Sprint E)
- **Fase 4:** Bot Telegram, LinkedIn Sales Navigator, prospecção ativa
- **Fase 5:** Meta Ads, Apify, escala de negócio

---

---

## Sprint E — Ferramentas de IA para Produção Audiovisual

**Status:** 📋 Mapeado — implementar a partir da Fase 3

> Levantamento completo de ferramentas GitHub para cinema, storyboard, roteiro, edição e conteúdo para internet. Organizado por fase de produção e nível de prioridade para a Firma Abacaxi.

---

### GPU do sistema (confirmado Mai 2026)

| Componente | Especificação |
|---|---|
| GPU | NVIDIA GeForce RTX 4060 Ti (Ada Lovelace) |
| VRAM | 8 GB GDDR6 |
| CUDA | 12.9 (instalado, sem configuração adicional necessária) |
| Driver | 576.80 |

> **Gestão de VRAM:** O sistema usa ~4GB de VRAM com Chrome + Premiere abertos. Antes de rodar modelos de IA, fechar Chrome e Premiere para liberar os 8GB completos.

---

### Por onde começar (ordem de instalação com GPU)

```
Dia 1 (~30 min):  Ollama + Llama 3.1 8B  → assistente de roteiro local, sem custo de API
Dia 1 (~10 min):  FasterWhisper INT8      → transcrição de footage em português
Dia 2 (~1 hora):  ComfyUI + SDXL         → storyboard visual local
Dia 3 (~20 min):  auto-editor + pymiere   → automação no Premiere
Semana 2+:        Wan2.1 T2V-1.3B        → geração de cenas com IA (lento, mas funciona local)
Mês 2+:           ViMax / FilmAgent       → produção multi-agente completa
```

**Pré-requisitos únicos:**
- Python 3.10+ → [python.org/downloads](https://python.org/downloads)
- Git → [git-scm.com](https://git-scm.com)
- Node.js → apenas para o MCP do Premiere
- CUDA: **já instalado** (confirmado v12.9)

---

### NÍVEL 1 — Instalar primeiro (sem custo de API, rodam local)

#### LLM Local — Assistente de Roteiro

| Ferramenta | Stars | O que faz | VRAM | Instalação |
|---|---|---|---|---|
| [Ollama](https://github.com/ollama/ollama) + Llama 3.1 8B | ~100k | LLM local: roteiro, análise, decupagem, sem custo por uso | ~5GB | Baixar em [ollama.com/download](https://ollama.com/download) → `ollama pull llama3.1:8b` |

#### Transcrição de Footage

| Ferramenta | Stars | O que faz | VRAM | Instalação |
|---|---|---|---|---|
| [FasterWhisper](https://github.com/SYSTRAN/faster-whisper) | ~15k | Transcreve áudio/vídeo em português, gera legendas, extrai diálogos gravados | ~2-3GB | `pip install faster-whisper` |

#### Storyboard Visual Local

| Ferramenta | Stars | O que faz | VRAM | Instalação |
|---|---|---|---|---|
| [ComfyUI](https://github.com/comfyanonymous/ComfyUI) + SDXL | ~70k | Geração de imagens cinematográficas para storyboard, frame a frame | ~6-7GB | `git clone https://github.com/comfyanonymous/ComfyUI` → `pip install torch --index-url https://download.pytorch.org/whl/cu124` → `pip install -r requirements.txt` → `python main.py --lowvram` |

> Após instalar ComfyUI: baixar modelo SDXL (ex: JuggernautXL) em [civitai.com](https://civitai.com) e colocar em `ComfyUI/models/checkpoints/`. Gera imagens em ~15s a 768x768.

#### Pré-Produção: Roteiro (GUI)

| Ferramenta | Stars | O que faz | Instalação |
|---|---|---|---|
| [story-apps/starc](https://github.com/story-apps/starc) | ~259 | Software profissional de roteiros com interface gráfica. Importa FDX, Fountain, Celtx. | Instalador direto em [starc.app](https://starc.app) — zero código |

#### Pós-Produção: Automação no Premiere

| Ferramenta | Stars | O que faz | Instalação |
|---|---|---|---|
| [WyattBlue/auto-editor](https://github.com/WyattBlue/auto-editor) | ~4.300 | Remove silêncios e espaços mortos de vídeos automaticamente | `pip install auto-editor` |
| [qmasingarbe/pymiere](https://github.com/qmasingarbe/pymiere) | ~446 | Python controla o Premiere — rough cuts, importação em lote, LUTs | `pip install pymiere` (+ ativar painel no Premiere) |
| [hetpatel-11/Adobe_Premiere_Pro_MCP](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) | < 100 | Claude controla o Premiere via chat (MCP) | Requer Node.js — setup guiado no repositório |

---

### NÍVEL 2 — Geração de Vídeo Local (RTX 4060 Ti — lento mas funciona)

| Ferramenta | Stars | O que faz | VRAM real | Velocidade | Instalação |
|---|---|---|---|---|---|
| [Wan-Video/Wan2.1 T2V-1.3B](https://github.com/Wan-Video/Wan2.1) | ~15.000 | Gera cenas de vídeo a partir de texto. Melhor modelo open-source (supera Sora no VBench) | ~8GB com `--offload_model True --t5_cpu` | 15-30 min/clip de 5s | `git clone` → `pip install -r requirements.txt` → `python generate.py --task t2v-1.3B --offload_model True --t5_cpu` |
| [Lightricks/LTX-Video distilled](https://github.com/Lightricks/LTX-Video) | ~9.700 | Geração de vídeo rápida, 480p, útil para testar composições | ~8GB com lowvram mode | Mais rápido que Wan2.1 | `pip install -r requirements.txt` + lowvram flag |

> **Requisito extra para Wan2.1:** 24GB+ de RAM do sistema (o T5-XXL encoder roda na CPU).
> **CogVideoX-2B:** Tecnicamente possível mas requer H100 para FP8 — usar no Google Colab.

#### Conteúdo para Internet

| Ferramenta | Stars | O que faz | Instalação |
|---|---|---|---|
| [RayVentura/ShortGPT](https://github.com/RayVentura/ShortGPT) | ~7.100 | Automação de YouTube Shorts e TikTok: voiceover, corte, legenda, multilíngue | `pip install shortgpt` + chave OpenAI |
| [SamurAIGPT/AI-Youtube-Shorts-Generator](https://github.com/SamurAIGPT/AI-Youtube-Shorts-Generator) | ~3.100 | Vídeo longo → Shorts 9:16 com highlight automático via LLM + Whisper | `git clone` + `pip install -r requirements.txt` + chave OpenAI |

---

### NÍVEL 3 — Média/Alta Complexidade (Fase 3+)

#### Geração de Storyboard com API

| Ferramenta | Stars | O que faz | Instalação |
|---|---|---|---|
| [yogendra-yatnalkar/storyboard-ai](https://github.com/yogendra-yatnalkar/storyboard-ai) | < 100 | Texto → storyboard → arte → animação → narração | `pip install -r requirements.txt` + chave OpenAI/Gemini |
| [tillo13/ai_storyboard_video_generator](https://github.com/tillo13/ai_storyboard_video_generator) | < 100 | Storytelling multimídia: visuais, voiceovers e vídeos | `pip install -r requirements.txt` |

#### Estúdio Virtual Multi-Agente

| Ferramenta | Stars | O que faz | Instalação |
|---|---|---|---|
| [HKUDS/ViMax](https://github.com/HKUDS/ViMax) | ~3.800 | All-in-one: prompt → roteiro → storyboard → vídeo final | `git clone` + `pip install -r requirements.txt` + GPU/API |
| [HITsz-TMG/FilmAgent](https://github.com/HITsz-TMG/FilmAgent) | ~1.050 | Set 3D virtual: diretor, roteirista, atores e cineastas com LLM | `git clone` + `pip install -r requirements.txt` |

#### Análise de Roteiro

| Ferramenta | Stars | O que faz | Instalação |
|---|---|---|---|
| [sliday/aimdb](https://github.com/sliday/aimdb) | < 100 | GPT-4o-mini (visual) + Claude 3.5 Sonnet (roteiro). Gera ratings | `pip install -r requirements.txt` + chaves OpenAI + Anthropic |
| [AdeboyeML/Film_Script_Analysis](https://github.com/AdeboyeML/Film_Script_Analysis) | < 50 | Análise profunda: personagens, diálogos, emoções, locações | `pip install -r requirements.txt` |

---

### Integração com o fluxo da Firma (com GPU local)

```
ROTEIRO          → Story Architect (starc.app) + Ollama para análise/feedback local
STORYBOARD       → ComfyUI + SDXL (local, sem custo por imagem)
TRANSCRIÇÃO      → FasterWhisper (footage, entrevistas, making of)
GERAÇÃO DE CENAS → Wan2.1 T2V-1.3B (local, lento) ou Google Colab (rápido)
EDIÇÃO           → Adobe Premiere + auto-editor (corte) + pymiere (automação)
REVISÃO CLIENTE  → Frame.io (Sprint C)
CONTEÚDO WEB     → ShortGPT ou AI-Youtube-Shorts-Generator
ANÁLISE          → sliday/aimdb ou Film_Script_Analysis
```

---

### Checklist de implementação (Sprint E)

**Nível 1 — Instalar primeiro (sem API, sem custo):**
- [ ] Baixar e instalar Story Architect em [starc.app](https://starc.app) — testar com roteiro real (~5 min)
- [ ] Instalar Ollama em [ollama.com/download](https://ollama.com/download) → `ollama pull llama3.1:8b` → testar análise de roteiro (~30 min)
- [ ] `pip install faster-whisper` → transcrever um vídeo de projeto existente (~10 min)
- [ ] Instalar ComfyUI → baixar modelo SDXL → gerar primeiro frame de storyboard (~1 hora)
- [ ] `pip install auto-editor` → testar corte por silêncio em um vídeo (~10 min)
- [ ] `pip install pymiere` → ativar painel no Premiere → testar uma automação simples (~20 min)

**Nível 2 — Geração de vídeo (fechar Chrome e Premiere antes):**
- [ ] Instalar Wan2.1 T2V-1.3B → gerar cena de teste com prompt de um projeto real
- [ ] Documentar tempo de geração e qualidade em STATUS.md

**Nível 3 — Conteúdo para internet:**
- [ ] Criar chave API OpenAI → `pip install shortgpt` → testar com um vídeo longo

**Dependências:** Python 3.10+, Git, Node.js (para MCP Premiere) — CUDA 12.9 já instalado

---

## Registro de atualizações

| Data | Versão | O que mudou |
|---|---|---|
| Mai 23, 2026 | v1.0 | Documento criado com 4 sprints planejados |
| Mai 23, 2026 | v1.1 | Varredura completa do sistema: adicionados diagnóstico, pré-requisitos críticos (credenciais, geração Word, relações Notion), observações por sprint e ordem de execução revisada |
| Mai 27, 2026 | v1.2 | Sprint E adicionado: levantamento de ferramentas GitHub de IA para produção audiovisual, GPU do sistema confirmada (RTX 4060 Ti, 8GB, CUDA 12.9), stack local definido (Ollama + FasterWhisper + ComfyUI + Wan2.1 + pymiere + auto-editor), instalação detalhada por ferramenta |

---

*Documento vivo — atualizar status conforme progresso*
*Última sincronização com Obsidian: [será preenchida ao adicionar ao CEREBRO]*
