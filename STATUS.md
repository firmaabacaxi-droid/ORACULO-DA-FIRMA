# STATUS DO ORÁCULO — Handoff de Sessão
## Firma Abacaxi · atualizado Mai 2026 · Sessão 2

> **Para a próxima sessão:** leia este arquivo primeiro. Ele captura onde paramos, o que foi decidido e o que vem a seguir.

---

## O QUE FOI FEITO NESTA SESSÃO (Sessão 2 — Mai 2026)

### Segurança
- Credenciais removidas de `DOCUMENTOS ANTIGOS - AVALIAR E MIGRAR/.../PROJETO ORACULO.md` — substituídas por `[REVOGADA]`
- Senha do Hostinger removida do `STATUS.md` anterior
- `DOCUMENTOS ANTIGOS*/` adicionado ao `.gitignore` — pasta nunca mais será commitada acidentalmente
- **Confirmado:** as credenciais **nunca estiveram no git** (a pasta era untracked). Histórico limpo desde sempre.

### Notion — acesso confirmado e testado
- Leitura de todos os 6 bancos da Fase 1: ✅ Projeto 2026, Clientes, Contatos, Propostas, CRM, Tarefas
- **Escrita confirmada:** entrada de teste criada no banco Clientes com sucesso
  - Entrada: `TESTE — Oráculo v1.0` (pode apagar do Notion)
  - URL: `notion.so/3678a52591f381c883e3eb8830035865`

---

## ESTADO ATUAL DO SISTEMA

### Infraestrutura
```
✅ Claude Code + VS Code
✅ Notion MCP — leitura E escrita confirmadas nos 6 bancos
✅ Filesystem MCP
✅ DuckDuckGo MCP
✅ Git — limpo, sem credenciais, .gitignore protegendo dados sensíveis
✅ Subagentes no claude.ai — já criados por Lipe/Jaya (melhorar em sessão futura)
```

### Notion — bancos da Fase 1 (todos acessíveis)
```
Hub principal: 🔮 ORÁCULO - FIRMA ABACAXI
URL: notion.so/3288a52591f381a0885fc20691f28468

BANCOS FASE 1 — LEITURA E ESCRITA CONFIRMADAS:
  ✅ Projeto 2026    collection://ba03e1a5-9656-4a97-8f0b-2ebdba19b434
  ✅ Clientes        collection://82984a0b-b757-4a6a-8a5d-6c66782ad99c
  ✅ Contatos        collection://cfd457d2-ad54-4790-be3e-0d180bed50f6
  ✅ Propostas       collection://3548a525-91f3-80b8-9f68-000b6b5b0eec
  ✅ CRM             collection://21759e84-e3cc-4949-b465-255db7177f16
  ✅ Tarefas         collection://2a3345d3-9bd7-4d7d-a1a9-9fff26560386
```

### Skills operacionais
```
✅ skills/captacao/SKILL.md
✅ skills/proposta/SKILL.md + blocos_xml.md + assets/MODELO_ORCAMENTO.docx
✅ skills/gestao/SKILL.md
✅ skills/humanizador/SKILL.md
✅ skills/preproducao/SKILL.md
✅ skills/producao/SKILL.md
✅ skills/conteudo/SKILL.md
✅ skills/antigravity/ — 8 skills de referência técnica
```

### Output
```
✅ output/propostas/   — pronto para receber arquivos
✅ output/roteiros/    — pronto
✅ output/conteudo/    — pronto
✅ output/relatorios/  — pronto
```

---

## ANÁLISE — O QUE FUNCIONA E O QUE FALTA

### ✅ Funciona agora
| Capacidade | Status |
|---|---|
| Ler todos os bancos do Notion | ✅ confirmado |
| Criar entradas no Notion | ✅ confirmado |
| Rodar skills de contexto (proposta, gestão, captação...) | ✅ disponíveis |
| Pesquisa web (DuckDuckGo MCP) | ✅ disponível |
| Ler/escrever arquivos locais | ✅ disponível |
| Git seguro sem credenciais | ✅ confirmado |

### ⚠️ Não testado / incerto
| Ponto | Risco | Quando resolver |
|---|---|---|
| Geração do Word (.docx) | Alto — pode ser o maior bloqueio do fluxo de proposta | Na primeira proposta real |
| Subagentes no claude.ai | Médio — existem mas não foram validados com tarefa real | Sessão futura |
| Relações entre bancos ao criar registros | Baixo — leitura OK, criação de relações não testada | Na primeira proposta real |

### 🔧 Melhorias identificadas
| Melhoria | Prioridade | Esforço |
|---|---|---|
| Testar geração de Word de ponta a ponta | Alta | 30 min |
| Melhorar system prompts dos subagentes | Média | 1 sessão |
| Cadastrar clientes reais (CNV, SuperHost, Vert...) no Notion | Média | 20 min |
| Criar primeiro projeto real no sistema | Alta | Com próximo cliente |

---

## PRÓXIMOS PASSOS — por prioridade

### 🔴 Próxima sessão
1. **Rodar primeira proposta real** — escolher um cliente e simular do briefing até o Word gerado
   - Isso vai testar: skill de proposta + geração .docx + registro no Notion + humanizador
   - Se o Word quebrar, resolver ali

2. **Cadastrar clientes reais no Notion** — CNV, SuperHost, Tamause, Vert, Cerrado, Chichá
   - Base de dados começa a ter valor real

3. **Melhorar subagentes** — revisar os system prompts existentes no claude.ai com o que aprendemos

### 🟡 Semana 2-3
4. Google AI Pro + Google Drive — acesso a arquivos de projetos
5. Frame.io — aprovação de vídeo pelo cliente
6. Site da Firma no Framer

### ⚪ Fase 3 em diante
7. Primeira automação Make/Zapier (A1: Briefing → Projeto automático)
8. Bot Telegram — Oráculo no celular

---

## SEGURANÇA — PENDÊNCIAS

Credenciais que ainda devem ser revogadas/trocadas (por precaução, mesmo sem risco confirmado):

| Serviço | Ação | Urgência |
|---|---|---|
| OpenAI API Key | Revogar em platform.openai.com → API Keys | Média |
| Notion ORGANIZABOT | Revogar em notion.so/my-integrations se não usar mais | Baixa |
| Notion FIRMA BETA | Revogar em notion.so/my-integrations se não usar mais | Baixa |
| Telegram bots antigos | Revogar via @BotFather se não usar | Baixa |
| Hostinger root | Trocar senha em painel.hostinger.com | Média |
| Supabase | Trocar senha em supabase.com | Média |

---

## COMO USAR O ORÁCULO AGORA

```
"Quero fazer uma proposta para [cliente]"
→ Oráculo lê skills/proposta/SKILL.md
→ Faz briefing estruturado
→ Pesquisa mercado
→ Gera Word em output/propostas/NomeCliente_proposta_v1.docx
→ Registra no Notion (Propostas + Clientes + Projeto)

"Qual é a ordem do dia?"
→ Oráculo lê skills/gestao/SKILL.md
→ Consulta Notion (Tarefas + Projetos)
→ Gera Ordem do Dia P0/P1/P2

"Novo cliente: [nome]"
→ Oráculo lê skills/captacao/SKILL.md
→ Conduz briefing passo a passo
→ Salva no Notion (Clientes + CRM)
```

---

## REFERÊNCIAS RÁPIDAS

```
CLAUDE.md                   → Routing de skills e identidade do Oráculo
docs/CONTEXTO_FIRMA.md      → Preços, clientes, equipe — dados reais
docs/FLUXO_TRABALHO.md      → 13 etapas com responsáveis
docs/ARQUITETURA_NOTION.md  → 25 bancos V2 com schemas
docs/SUBAGENTES.md          → 5 system prompts para claude.ai
docs/PLANO_IMPLEMENTACAO.md → 5 fases com custos e checklist
MEMORIA.md                  → Aprendizados de projetos reais
skills/antigravity/         → 8 skills de referência técnica
output/                     → O que o Oráculo produz
```

---

*Atualizado ao final da Sessão 2 — Mai 2026 · Oráculo v1.1*
