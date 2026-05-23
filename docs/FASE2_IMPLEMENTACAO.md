# FASE 2 — Implementação Completa do Ecossistema Oráculo

**Status:** 🟡 Planejado | **Última atualização:** Mai 23, 2026 | **Versão:** v1.0

---

## Visão geral

Fase 2 consolida a integração do ecossistema: bancos Notion funcionais, Google Drive conectado, Frame.io para aprovação de vídeos, e o site da Firma no ar. Tem 3 frentes do roadmap + 2 pendências críticas da Fase 1.

**Duração estimada:** 2-3 semanas (depende de ações manuais de Lipe/Jaya)

**Custo:** +R$160/mês (Google Drive, Frame.io, Framer, domínio)

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

**Status:** ⏳ Aguardando

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

**Status:** ⏳ Aguardando

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

**Status:** 📋 Design

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

**Status:** 📋 Design

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

**Status:** 📋 Design

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

```
SESSÃO ATUAL (ou próximas 1–2):
  1. Sprint A1: Criar 5 bancos Notion (com autorização)
  2. Sprint A2: Gerar GUIA_SUBAGENTES_SETUP.md
  3. Sprint D: Gerar conteúdo do site em output/site/

APÓS LIPE/JAYA EXECUTAREM TAREFAS MANUAIS:
  4. Sprint B: Configurar Google Drive MCP
  5. Sprint C: Criar GUIA_FRAMEIO.md + atualizar skills
  6. Sprint B: Criar estrutura de pastas no Drive
  7. Teste integrado: novo projeto via Notion → pasta no Drive → Frame.io para edição

FINAL:
  8. Commit consolidado: "refactor: Fase 2 completa — 5 bancos, Drive, Frame.io, site"
  9. Atualizar CLAUDE.md: marcar Fase 2 como concluída, Fase 3 iniciada
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

---

**Próximas fases:**

- **Fase 3:** Automações A1–A5 (Make/n8n), ElevenLabs, Whisper
- **Fase 4:** Bot Telegram, LinkedIn Sales Navigator, prospecção ativa
- **Fase 5:** Meta Ads, Apify, escala de negócio

---

*Documento vivo — atualizar status conforme progresso*
*Última sincronização com Obsidian: [será preenchida ao adicionar ao CEREBRO]*
