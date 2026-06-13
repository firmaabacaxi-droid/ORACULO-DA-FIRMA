# PLANO DE IMPLEMENTAÇÃO — Oráculo
## Firma Abacaxi Ateliê Audiovisual · Brasília · 2026

> 🗄️ **DOCUMENTO HISTÓRICO (arquivo).** Baseline de implementação de mai/2026, **superado por
> [PLANO-MASTER.md](../PLANO-MASTER.md)** e pelo [PAINEL-MESTRE.md](../PAINEL-MESTRE.md).
> Referências à `ANTIGRAVITY/` aqui são do sistema antigo — hoje a ANTIGRAVITY é **legado aguardando
> arquivamento pós-merge** (ver [Mapa-Mestre](../MAPA-MESTRE.md)). Mantido só para consulta histórica.

---

## DIAGNÓSTICO ATUAL

| Dimensão | Score | Status |
|---|---|---|
| Saúde comercial | 6.2/10 | ⚠️ Atenção |
| Eficiência operacional | 4.1/10 | 🔴 Crítico |
| Qualidade criativa | 8.7/10 | ✅ Forte |
| Presença digital | 5.0/10 | ⚠️ Atenção |

**O problema central:** Dois fundadores centralizam 100% das decisões operacionais. Das 13 etapas do fluxo, 11 são 100% manuais — cerca de **6–8 horas de trabalho administrativo por projeto** que o Oráculo pode eliminar.

**A oportunidade:** Precificação 40–60% abaixo do mercado para o nível técnico entregue. Redesenhar os pacotes com ancoragem e automatizar o processo comercial pode dobrar o ticket médio sem mudar a entrega.

---

## STATUS DO SISTEMA (Mai 2026)

```
INFRAESTRUTURA
✅ Claude Code + VS Code instalados e funcionando
✅ Notion MCP conectado (bancos disponíveis)
✅ Filesystem MCP ativo
✅ DuckDuckGo MCP configurado
✅ Git inicializado — commit v1.0 feito

DOCUMENTAÇÃO (recém atualizada)
✅ CLAUDE.md — routing completo, 5 fases, antigravity indexado
✅ docs/CONTEXTO_FIRMA.md — dados reais (preços, clientes, equipe, equipamentos)
✅ docs/FLUXO_TRABALHO.md — 13 etapas com responsáveis e regras de negócio
✅ docs/ARQUITETURA_NOTION.md — 25 bancos V2 com schemas completos
✅ docs/SUBAGENTES.md — 5 system prompts prontos para criar Projects

SKILLS
✅ skills/captacao/SKILL.md
✅ skills/proposta/SKILL.md + blocos_xml.md + assets/MODELO_ORCAMENTO.docx ← crítico
✅ skills/preproducao/SKILL.md
✅ skills/producao/SKILL.md
✅ skills/conteudo/SKILL.md
✅ skills/gestao/SKILL.md
✅ skills/humanizador/SKILL.md
✅ skills/antigravity/ — 8 skills de referência

NOTION (bancos ativos)
✅ CRM, Propostas, Contatos, Clientes, Projeto 2026, Tarefas

PENDENTE — próximos passos
⬜ Criar subagentes como Projects no claude.ai
⬜ Bancos Fase 2 no Notion: ORÇAMENTO, CRIATIVO, ANÁLISE TÉCNICA, FINANCEIRO_PROJETO, CRONOGRAMA
⬜ Google Drive conectado ao claude.ai (Settings → Connectors)
⬜ Google AI Pro — Nano Banana Pro, Veo, NotebookLM
⬜ Frame.io — aprovação de vídeo com cliente
⬜ Make/Zapier — automações entre ferramentas
⬜ Site da Firma no Framer
⬜ Whisper — transcrição de áudio local
```

---

## ARQUITETURA DE AUTOMAÇÃO — ORÁCULO + N8N

```
ORÁCULO (Claude Code)          N8N                    RESULTADO
──────────────────────         ───────────────────    ──────────────────────
Decide quando acionar    →     Executa 24/7           Automações rodam mesmo
Cria e edita workflows   →     (sem PC aberto)        sem ninguém no terminal
Verifica execuções       ←     Reporta status         Oráculo monitora saúde
```

O Oráculo controla o n8n **diretamente via MCP** (n8n MCP já estava configurado — precisa renovar a chave após revogar a exposta). A skill `skills/antigravity/automation-workflows/SKILL.md` é referência de design, não execução.

**Quando usar n8n vs Make:**

| Situação | Use n8n | Use Make |
|---|---|---|
| Flow complexo com Notion + Supabase | ✅ | — |
| Webhook monitorando status de proposta | ✅ | — |
| Trigger simples (status muda → e-mail) | — | ✅ |
| Integração com WhatsApp Business | — | ✅ |
| Você quer self-hosted, sem custo por execução | ✅ | — |

---

## AS 5 AUTOMAÇÕES PRIORITÁRIAS

Estas automações eliminam o maior volume de trabalho manual. Implementar nessa ordem.

### A1 — Briefing → Projeto no Notion *(prioridade máxima)*
Cliente contata a Firma → Oráculo conduz briefing → cria projeto completo com tarefas e cronograma no Notion. O que levava 2h de trabalho manual acontece em 5 minutos.

**Ferramenta:** Agente de Captação (claude.ai Project) + n8n (webhook) ou Make

---

### A2 — Proposta aprovada → Pré-produção ativada
Status muda para "Aprovada" no Notion → Oráculo cria tarefas de pré-produção, aloca equipe, gera roteiro inicial e envia e-mail de kick-off para o cliente.

**Ferramenta:** n8n (webhook monitorando Notion status → create tasks)

**Extensão — Frame.io → tarefas de revisão automáticas:**
Quando o cliente comenta no vídeo no Frame.io → n8n lê o log de comentários → Oráculo gera tarefas de edição vinculadas ao projeto no Notion. Acaba com "no minuto 1:23 muda a música" perdido no WhatsApp.

---

### A3 — Ordem do Dia automática às 8h
Lê projetos ativos no Notion → envia resumo personalizado para Lipe e Jaya via WhatsApp com o que cada um precisa fazer naquele dia.

**Ferramenta:** Make (cron diário → Notion API → WhatsApp Business)

---

### A4 — Entrega → Follow-up e NF automatizados
Projeto marcado como entregue → e-mail de entrega personalizado, solicitação de feedback, follow-up agendado em 15 dias, lembrete de nota fiscal para a Jaya.

**Ferramenta:** Make (trigger: Notion status "Entregue" → e-mail + agenda)

---

### A5 — Making-of → Conteúdo para redes
Whisper transcreve áudios do making-of → Oráculo extrai melhores momentos → gera posts no formato de cada plataforma (Reels, LinkedIn, Thread).

**Ferramenta:** Whisper local + Oráculo (skill conteudo) + upload-post (futuro)

---

## AS 5 FASES DE IMPLEMENTAÇÃO

```
Fase 1 ──── Fase 2 ──── Fase 3 ──── Fase 4 ──── Fase 5
Fundação   Captação    Produção    Conteúdo    Autônomo
Sem 1-2    Sem 3-4     Sem 5-6     Sem 7-8     Mês 3+
R$120/mês  +R$160/mês  +R$110/mês  +R$1.090    escala
```

---

### FASE 1 — Fundação *(semanas 1–2) · R$120/mês*

**Objetivo:** Sistema base funcionando para propostas e captação.

**Ações desta fase:**

1. **Assinar Google AI Pro** (one.google.com · ~R$120/mês)
   - Destrava: Nano Banana Pro (100 imagens/dia), Veo 3.1 (previs de cenas), NotebookLM Plus, Gemini Pro

2. **Conectar Google Drive ao claude.ai**
   - Settings → Connectors → Google Drive → autorizar conta da Firma
   - A partir daí: "Oráculo, lê o briefing da pasta do projeto X" — ele puxa

3. **Criar os subagentes como Projects no claude.ai**
   - Ver system prompts em `docs/SUBAGENTES.md`
   - Criar na ordem: Proposta → Captação → Produção → Gestão → Conteúdo

4. **Criar os 5 bancos base no Notion** (Oráculo faz via MCP)
   - PROJETO_2026, CLIENTES, CONTATOS, PROPOSTAS, TAREFAS
   - Schema completo em `docs/ARQUITETURA_NOTION.md`

5. **Testar `claude --remote-control` no celular**
   - Permite que Lipe e Jaya atualizem status de projetos no Notion direto do celular, sem abrir o computador
   - Especialmente útil em set — atualizar produção em tempo real

6. **Definir projeto piloto** — um projeto real em andamento para testar tudo

7. **Gerar primeira proposta automatizada** com o Oráculo

**Resultado esperado:** Primeira proposta 100% gerada pelo Oráculo, com visuais do Nano Banana, entregue em tempo recorde.

**Custo:** R$120/mês (Google AI Pro)

---

### FASE 2 — Captação automatizada *(semanas 3–4) · +R$160/mês*

**Objetivo:** Automação A1 funcionando, site no ar, sistema de aprovação de vídeo.

**Ações desta fase:**

1. **Instalar Claude Desktop + Obsidian**
   - Claude Desktop: `claude.ai/download`
   - Obsidian: `obsidian.md` — abrir pasta do Oráculo como vault
   - Instalar plugin "Local REST API" no Obsidian
   - Vault do Oráculo vira segundo cérebro navegável

2. **Criar bancos Fase 2 no Notion**
   - ORÇAMENTO, CRIATIVO, ANÁLISE TÉCNICA, FINANCEIRO_PROJETO, CRONOGRAMA

3. **Configurar Make/Zapier** — primeira automação (A1: Briefing → Projeto)
   - make.com → trigger Notion → criar tarefas automaticamente

4. **Implementar Frame.io** ($15/mês ≈ R$80)
   - Cliente comenta diretamente no vídeo no timecode exato
   - Acaba com "no minuto 1:23 muda a música" no WhatsApp

5. **Construir site da Firma no Framer**
   - 5 páginas: Home, Portfolio, Sobre, Locadora, Contato
   - Claude escreve o copy (skill humanizador + marketing-psychology)
   - Nano Banana Pro gera imagens de referência
   - Domínio: ~R$40-200/ano no Registro.br

**Custo adicional:** ~R$160/mês (Frame.io + domínio + Framer Mini)

**Total acumulado:** ~R$280/mês

---

### FASE 3 — Produção inteligente *(semanas 5–6) · +R$110/mês*

**Objetivo:** Agente de Produção ativo, conteúdo automatizado, automação A3 (Ordem do Dia).

**Ações desta fase:**

1. **Ativar Agente de Produção** no claude.ai
   - Usa `skills/preproducao/SKILL.md` + `skills/antigravity/cinematic-script-writer/`
   - Gera roteiro + decupagem técnica em minutos a partir do briefing

2. **Instalar Whisper** para transcrição de áudio
   ```
   pip install openai-whisper
   pip install torch
   ```
   - Workflow mobile: Lipe grava briefing no celular em trânsito → Whisper transcreve → Oráculo gera decupagem técnica automaticamente, sem digitação
   - Também transcreve reuniões com clientes e making-of para A5

3. **Ativar ElevenLabs** (Creator ~R$110/mês)
   - Voice-over profissional para projetos com orçamento reduzido
   - Amplia capacidade de entrega sem aumentar custo de equipe

4. **Configurar Ordem do Dia automática** (automação A3)
   - n8n lê Notion toda manhã às 8h (cron)
   - Gera resumo personalizado para Lipe e Jaya via WhatsApp

5. **Configurar Asaas ou InfinitePay** para cobranças automatizadas
   - Gera links de PIX/boleto por projeto
   - Jaya para de fazer cobrança manual — cliente recebe link direto
   - Integra com Notion via n8n: projeto marcado "Entregue" → link de cobrança gerado

6. **Newsletter mensal** para base de clientes
   - Mailerlite ou Beehiiv (grátis até 1.000 contatos)
   - Oráculo redige, personaliza e prepara para envio

**Custo adicional:** ~R$110/mês (ElevenLabs)

**Total acumulado:** ~R$390/mês

---

### FASE 4 — Conteúdo e presença *(semanas 7–8) · +R$1.090/mês*

**Objetivo:** Máquina de conteúdo funcionando, prospecção ativa iniciada.

**Ações desta fase:**

1. **Ativar Agente de Conteúdo** no claude.ai
   - 5 pilares: portfólio, bastidores, valores, técnica, empreendedorismo
   - Calendário editorial de 30 dias gerado automaticamente

2. **Implementar publicação automática**
   - Buffer ou Later para agendamento visual
   - upload-post API quando quiser automação total

3. **Ativar prospecção com Apollo.io + LinkedIn Sales Navigator**
   - Apollo.io (~R$320/mês) — banco de e-mails e contatos
   - LinkedIn Sales Navigator (~R$550/mês) — busca por cargo, setor, localização
   - Pré-requisito: site no ar, Agente de Captação ativo, pipeline funcionando

4. **Sequências de outreach personalizado**
   - Lemlist (~R$220/mês) — cold e-mail com personalização AI
   - Ou: WhatsApp Business API + Make (mais brasileiro)

5. **Programa de indicação ativa**
   - Mensagem manual para os 20 melhores clientes
   - 10% de desconto para quem indicar e fechar
   - ROI maior que cold outreach no curto prazo

**Custo adicional:** ~R$1.090/mês (LinkedIn + Apollo + Lemlist)

**Total acumulado:** ~R$1.480/mês

---

### FASE 5 — Oráculo autônomo *(mês 3+) · escala*

**Objetivo:** Sistema completamente autônomo — a Firma cresce sem aumentar a carga dos dois fundadores.

**Ações desta fase:**

1. **Dashboard financeiro em tempo real**
   - Visão de receitas, despesas e margens por projeto
   - Jaya vê o que entra e sai hoje sem planilha manual

2. **Análise preditiva de gargalos**
   - Oráculo alerta com 3 dias de antecedência
   - Sugere realocação de tarefas antes de atrasar

3. **Apify para prospecção avançada** ($49/mês)
   - Scrapers customizados — empresas em Brasília filtradas por nicho
   - 50 leads qualificados/semana sem trabalho manual

4. **Lançar produto digital**
   - Curso "Videomaker Independente" ou "Sistema Oráculo para Produtoras"
   - Receita passiva escalável

5. **Avaliar contratação de produtor júnior**
   - Quando o pipeline superar a capacidade de Lipe e Jaya
   - O Oráculo treina, gerencia tarefas e mantém o padrão

---

## FERRAMENTAS POR ETAPA DO FLUXO

Mapeamento das 13 etapas → qual ferramenta usar em cada uma.

| Etapa | Hoje | Ferramenta Oráculo |
|---|---|---|
| 1. Prospecção | Só inbound, sem sistema | Apollo + LinkedIn Sales Nav (Fase 4) |
| 2. Captação de lead | Manual — Lipe responde | Agente de Captação (claude.ai Project) |
| 3. Qualificação | Cabeça do Lipe | Oráculo + DISC automático |
| 4. Briefing | Reunião sem estrutura | Agente de Captação + Google Meet + NotebookLM |
| 5. Orçamento e proposta | 2–4h manual | Agente de Proposta → Word em output/propostas/ |
| 6. Aprovação do cliente | E-mail informal | Frame.io (aprovação com comentários no vídeo) |
| 7. Pré-produção | Lipe centraliza tudo | Agente de Produção → roteiro + decupagem |
| 8. Produção/filmagem | Bem feito — não mexer | Notion mobile pra atualizar status |
| 9. Edição | DaVinci Resolve | Frame.io pra aprovação de cuts |
| 10. Colorização e som | Contratação externa | Banco EDIÇÃO rastreia o status |
| 11. Entrega | Manual por e-mail | Automação A4 — e-mail automático + NF |
| 12. Pagamento | Jaya gerencia manual | Asaas ou InfinitePay — link PIX/boleto gerado automaticamente via n8n quando projeto marcado "Entregue" |
| 13. Pós-projeto | Sem follow-up formal | Newsletter automática + NPS em 30 dias |

---

## CUSTO MENSAL TOTAL ESTIMADO

| Ferramenta | Custo BRL/mês | Fase |
|---|---|---|
| Google One AI Pro | R$120 | 1 |
| Domínio + Framer Mini | R$30 | 2 |
| Frame.io Pro | R$80 | 2 |
| Make/Zapier Starter | R$50 | 2 |
| ElevenLabs Creator | R$110 | 3 |
| Asaas / InfinitePay | R$0 (cobra % por transação) | 3 |
| Mailerlite (até 1k) | R$0 (grátis) | 3 |
| LinkedIn Sales Navigator | R$550 | 4 |
| Apollo.io Basic | R$320 | 4 |
| Lemlist | R$220 | 4 |
| **TOTAL FASE 1** | **R$120/mês** | |
| **TOTAL FASES 1–2** | **R$280/mês** | |
| **TOTAL FASES 1–3** | **R$390/mês** | |
| **TOTAL FASES 1–4** | **R$1.480/mês** | |

**ROI:** 1 projeto extra/mês pago graças ao sistema = R$8k–12k de receita adicional. A margem do primeiro projeto extra cobre o custo de todas as fases.

---

## O QUE NÃO FAZER

❌ **Não criar todos os 25 bancos do Notion de uma vez.** Comece com os 5 da Fase 1, adicione conforme a necessidade real aparecer.

❌ **Não assinar Higgsfield agora.** Veo 3.1 + Nano Banana Pro resolvem 90% do que a Firma precisa. Higgsfield só vale para projetos cinematográficos autorais grandes (R$50k+).

❌ **Não fazer prospecção ativa antes do sistema de captação estar estável.** Se gerar 20 leads/semana e o Lipe estiver em set, queima a marca.

❌ **Não terceirizar o site para agência por R$15k.** Em 2026 você faz no Framer com o Oráculo ajudando no copy e Nano Banana nas imagens.

❌ **Não tentar configurar 10 MCPs ao mesmo tempo.** Notion (ativo) + Google Drive (Fase 1) + Obsidian (Fase 2) — pare aí até virar hábito.

---

## CHECKLIST GERAL — visão de progresso

```
FASE 1 — Esta semana
[ ] Assinar Google AI Pro (one.google.com)
[ ] Conectar Google Drive ao claude.ai (Settings → Connectors)
[ ] Criar subagentes como Projects no claude.ai (ver docs/SUBAGENTES.md)
[ ] Criar 5 bancos base no Notion via Oráculo (MCP)
[ ] Testar claude --remote-control no celular (set + mobilidade)
[ ] Definir projeto piloto
[ ] Gerar primeira proposta com o Oráculo

FASE 2 — Semanas 2-3
[ ] Instalar Claude Desktop + Obsidian + plugin Local REST API
[ ] Criar bancos Fase 2 no Notion (ORÇAMENTO, CRIATIVO, etc.)
[ ] Configurar n8n (webhook) — automação A1 (Briefing → Projeto)
[ ] Renovar chave n8n MCP após revogar a exposta → conectar Oráculo ao n8n
[ ] Implementar Frame.io ($15/mês) no fluxo de aprovação
[ ] Configurar Frame.io → n8n → tarefas de edição automáticas no Notion
[ ] Construir site da Firma no Framer (2 fins de semana)

FASE 3 — Semanas 5-6
[ ] Pip install openai-whisper + torch
[ ] Testar workflow mobile: gravar briefing no celular → Whisper → decupagem
[ ] Ativar Agente de Produção no claude.ai
[ ] Configurar Ordem do Dia automática (n8n cron → WhatsApp às 8h)
[ ] Configurar Asaas ou InfinitePay — links PIX/boleto por projeto
[ ] Integrar Asaas com Notion via n8n (entregue → cobrança automática)
[ ] Assinar ElevenLabs Creator
[ ] Criar primeira newsletter para base de clientes

FASE 4 — Semanas 7-8
[ ] Ativar Agente de Conteúdo + calendário editorial
[ ] Configurar publicação automática (Buffer ou upload-post)
[ ] Assinar Apollo.io + LinkedIn Sales Navigator
[ ] Lançar programa de indicação para os 20 melhores clientes

FASE 5 — Mês 3+
[ ] Dashboard financeiro em tempo real no Notion
[ ] Apify para prospecção avançada
[ ] Avaliar produto digital (curso / licença do Oráculo para outras produtoras)
[ ] Avaliar contratação de produtor júnior
```

---

## REFERÊNCIAS

```
CLAUDE.md                   → Routing completo de skills e identidade do Oráculo
docs/CONTEXTO_FIRMA.md      → DNA da Firma (preços, clientes, equipe, equipamentos)
docs/FLUXO_TRABALHO.md      → As 13 etapas de um projeto audiovisual
docs/ARQUITETURA_NOTION.md  → Schema dos 25 bancos V2
docs/SUBAGENTES.md          → System prompts dos 5 subagentes prontos
MEMORIA.md                  → Aprendizados acumulados de projetos reais
skills/antigravity/         → 8 skills de referência do Antigravity
```

---

*Documento gerado pelo Oráculo · Firma Abacaxi Ateliê Audiovisual · Brasília · Mai 2026*
*Fontes: Oraculo_Firma_Abacaxi_2026.md + PLANO_EXPANSAO_ORACULO.md + PLANO_IMPLEMENTACAO (1).md*
