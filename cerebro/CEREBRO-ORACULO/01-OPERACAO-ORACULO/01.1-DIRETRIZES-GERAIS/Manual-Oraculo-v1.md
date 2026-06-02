# Oráculo — Manual Completo
## Firma Abacaxi Ateliê Audiovisual · Brasília · 2026

**Versão 1.0 · Maio 2026 · Fase 1 concluída**

---

## Índice

- Seção 0 — O Que é o Oráculo
- Seção 1 — Como Abrir e Usar
- Seção 2 — As Skills Principais
- Seção 3 — As Skills Antigravity
- Seção 4 — O Fluxo de Trabalho (13 Etapas)
- Seção 5 — Os Subagentes
- Seção 6 — O Notion
- Seção 7 — Integrações e Ecossistema
- Seção 8 — Estrutura dos Documentos
- Seção 9 — Guia de Uso Rápido
- Seção 10 — Status e Roadmap
- Apêndice A — Glossário
- Apêndice B — Tabela de Preços
- Apêndice C — Responsabilidades

---

## Seção 0 — O Que é o Oráculo

*Para quem nunca usou inteligência artificial. Leia com calma — esses conceitos são a base de tudo que vem a seguir.*

### O problema que o Oráculo resolve

A Firma Abacaxi é uma produtora audiovisual de dois sócios. Lipe cuida da direção, fotografia, edição *e* do atendimento ao cliente, propostas e gestão de projetos. Jaya cuida do financeiro, administrativo e operação. Em projetos intensos, ambos ficam sobrecarregados com tarefas operacionais que poderiam ser delegadas.

O Oráculo nasceu para absorver esse trabalho repetitivo e administrativo — para que Lipe e Jaya possam focar no que fazem de melhor: criar, dirigir e fotografar.

### O que o Oráculo faz

- Conduz briefings completos com novos clientes (faz as perguntas certas, na ordem certa)
- Gera propostas comerciais e orçamentos detalhados em Word
- Escreve roteiros, decupagens técnicas e planos de filmagem
- Organiza a Ordem do Dia com prioridades claras (P0/P1/P2)
- Cria calendários editoriais e posts para Instagram e LinkedIn
- Pesquisa clientes, preços de mercado e referências na web
- Acessa e atualiza os bancos de dados do Notion
- Registra aprendizados de cada projeto para ficar cada vez melhor

### O que o Oráculo NÃO faz

- Não filma e não edita vídeos
- Não substitui o olhar criativo de Lipe
- Não toma decisões financeiras sem aprovação
- Não altera nada no Notion sem pedir autorização primeiro
- Não envia e-mails ou mensagens por conta própria

### A analogia: o terceiro sócio digital

Pense no Oráculo como um colaborador muito bem treinado que leu *todos* os documentos da Firma — os preços, os clientes, o fluxo de trabalho, os aprendizados de cada projeto — e está disponível 24 horas por dia. Mas ao contrário de um estagiário que só anota, o Oráculo *executa*: pesquisa, calcula, escreve e organiza. Você orienta e aprova. Ele faz.

### O que é Claude Code

**Claude Code** é um programa que você instala no computador e que traz uma inteligência artificial diretamente para dentro dos seus arquivos de trabalho. É diferente do ChatGPT por três razões:

1. **Ele lê os seus arquivos.** Quando você abre o projeto do Oráculo no VS Code, o Claude Code tem acesso a toda a documentação da Firma. Ele não precisa que você explique tudo do zero toda vez.
2. **Ele usa ferramentas.** O Claude Code pode pesquisar na web, criar documentos Word, ler e escrever nos bancos de dados do Notion, criar arquivos — não só conversar.
3. **Ele é configurável.** O arquivo `CLAUDE.md` na raiz do projeto é o "manual de instruções" do Oráculo — define a personalidade, como identificar cada tipo de tarefa e qual módulo especializado (skill) usar.

O VS Code é o programa editor onde o Claude Code roda. Para a Firma, o VS Code funciona apenas como a "janela" para conversar com o Oráculo.

---

## Seção 1 — Como Abrir e Usar

### Abrindo o Oráculo

1. Abra o **VS Code**
2. Abra a pasta `ORACULO - FIRMA ABACAXI` (File → Open Folder)
3. Abra o terminal integrado (Ctrl+J)
4. Digite `claude` e pressione Enter
5. O painel do Claude Code abre no lado direito

### Os 4 modos de operação

Você alterna com **Shift+Tab** ou clicando no indicador no rodapé do painel.

| Modo | O que faz | Quando usar |
|---|---|---|
| **PLAN** | Oráculo só lê e planeja. Não altera nada. | Sempre primeiro em tarefas complexas ← RECOMENDADO |
| **DEFAULT** | Executa, mas pede confirmação em ações importantes | Uso geral do dia a dia |
| **ACCEPT EDITS** | Edita arquivos sem pedir confirmação a cada um | Quando quer mais velocidade |
| **AUTO** | Faz tudo automaticamente, sem pausas | Apenas quando confia totalmente no plano |

**Regra de ouro:** Para qualquer tarefa com mais de um passo (proposta, roteiro, ordem do dia), ative o **PLAN MODE** primeiro. O Oráculo apresenta o plano, você revisa, aprova, e só então ele executa.

### Como escrever um bom pedido

```
[Contexto] + [O que quer] + [Formato esperado]

✅ BOM:
"Preciso de uma proposta para a CNV. Querem um documentário de 8 minutos
 sobre mediação de conflitos em Brasília. Prazo: 45 dias. Budget aberto."

❌ VAGO:
"Faz uma proposta"
```

### @-mentions — referenciar arquivos diretamente

Em vez de deixar o Oráculo procurar arquivos, você aponta direto. Digite `@` seguido do nome do arquivo:

```
@CLAUDE.md
@skills/proposta/SKILL.md
@MEMORIA.md
@docs/CONTEXTO_FIRMA.md
```

### Comandos slash essenciais

| Comando | Para que serve |
|---|---|
| `/plan` | Ativa modo planejamento |
| `/clear` | Limpa o contexto — começa uma conversa nova |
| `/compact` | Comprime o histórico quando a sessão fica longa |
| `/mcp` | Ver integrações conectadas e status |
| `/doctor` | Diagnóstico completo do sistema |
| `/cost` | Ver quanto custou a sessão atual |

**Use /clear entre tarefas diferentes.** Contexto de uma proposta antiga misturado com uma nova vai gerar respostas confusas.

---

## Seção 2 — As Skills Principais

Uma **skill** é um módulo especializado — instruções detalhadas que transformam o Oráculo em especialista naquele assunto. As skills ficam em `skills/` e o Oráculo escolhe automaticamente qual usar pelo contexto do pedido.

**Diagrama de interrelação:**
```
CAPTAÇÃO → PROPOSTA → PRÉ-PRODUÇÃO → PRODUÇÃO
GESTÃO: cobre todas as etapas 3–13
CONTEÚDO: usa resultado de qualquer projeto
HUMANIZADOR: obrigatório em todo texto que sai para cliente
```

---

### Skill: Captação ✅ Ativa — Fase 1

**O que faz:** Conduz o processo completo de atendimento a um novo cliente — desde a qualificação até o momento em que a proposta está pronta.

**Quando usar:** Quando um novo cliente chega (Instagram, WhatsApp, indicação).

**Fluxo interno:**
1. Qualificação — classifica o lead como VERDE (avançar), AMARELO (cautela) ou VERMELHO (recusar)
2. Briefing completo — 10 perguntas essenciais, uma por vez
3. Pesquisa do cliente — busca web sobre a empresa
4. Registro no Notion — cria entradas em Clientes + CRM (com autorização)
5. Perfil DISC — identifica o estilo de comunicação do cliente
6. Passa para a skill de Proposta

**O que entrega:** Briefing estruturado + cliente cadastrado no Notion + proposta iniciada.

**Exemplo de ativação:**
> "Novo cliente chegou pelo Instagram. Nome: Ana Lima, empresa Vert. Quer um vídeo institucional. Vamos fazer o briefing."

---

### Skill: Proposta ✅ Ativa — Fase 1

**O que faz:** Gera uma proposta comercial completa em arquivo Word (.docx), com orçamento detalhado, ancoragem de mercado e formatação profissional.

**Quando usar:** Quando o briefing já foi feito e falta gerar o documento.

**Regras de ouro:**
- NF 7,28% sempre inclusa no total (nunca separada)
- Margem mínima de 35% sobre o custo direto
- Três opções de pacote apenas quando o budget do cliente é desconhecido
- Pagamento: 50% na assinatura, 50% na entrega
- Validade da proposta: 15 dias

**O que entrega:** `output/propostas/NomeCliente_proposta_v1.docx`

**Exemplo de ativação:**
> "Gera a proposta para o SuperHost com base no briefing que acabamos de fazer. Budget: R$15k. Pode gerar em uma opção só."

---

### Skill: Pré-Produção ✅ Ativa — Fase 1

**O que faz:** Transforma um briefing aprovado em plano de produção completo — roteiro, decupagem técnica cena por cena, plano de filmagem e checklist de equipamentos.

**Quando usar:** Quando a proposta foi aprovada e é hora de planejar como filmar.

**O que entrega:**
- Roteiro estruturado (Abertura / Cenas / Encerramento com CTA)
- Decupagem técnica: tipo de plano, ângulo, movimento, iluminação, equipamento por cena
- Ordem de filmagem otimizada por locação e período do dia
- Arquivo em `output/roteiros/NomeCliente_roteiro_v1.md`

**Exemplo de ativação:**
> "Projeto Brasil Participativo aprovado. Documentário 8 minutos. Duas locações: UnB e Lago Sul. Vamos criar o roteiro e a decupagem técnica."

---

### Skill: Produção ✅ Ativa — Fase 1

**O que faz:** Suporte durante e após a filmagem — checklists pré-set, diário de filmagem, registro de cenas e ocorrências.

**Regra crítica:** Máximo de 2 alterações sem custo adicional. A partir da 3ª, gera aditivo de contrato.

**Exemplo de ativação:**
> "Vou filmar amanhã o projeto Cerrado Experience. Me dá o checklist de equipamentos e prepara o diário de set."

---

### Skill: Gestão ✅ Ativa — Fase 1

**O que faz:** Organiza o dia, prioriza tarefas, controla prazos, acompanha o financeiro e gera comunicações operacionais.

**Quando usar:** No início de cada dia, em reuniões semanais, ou quando precisar de uma visão geral dos projetos.

**Sistema de priorização:**
- **P0** — urgente, faz hoje, não pode esperar
- **P1** — alta prioridade, faz hoje se possível
- **P2** — importante, mas pode ser esta semana

**O que entrega:** Ordem do Dia (Lipe/Jaya) + painel de projetos + controle financeiro + pautas de reunião + e-mails de follow-up.

**Exemplo de ativação:**
> "Qual é a ordem do dia? Temos 3 projetos ativos: Brasil Participativo, SuperHost e Evento UnB."

---

### Skill: Conteúdo ✅ Ativa — Fase 1

**O que faz:** Cria calendários editoriais mensais, posts para Instagram e LinkedIn, e transforma projetos finalizados em múltiplas peças de conteúdo.

**Os 5 pilares de conteúdo da Firma:**
1. Portfólio e resultados — mostrar o trabalho e o impacto
2. Bastidores e processo — humanizar, mostrar o valor de cada detalhe
3. Valores e identidade — projetos indígenas, arte, sustentabilidade
4. Conhecimento técnico — construir autoridade, educar o cliente
5. Empreendedorismo — a jornada de Lipe e Jaya construindo a Firma

**Exemplo de ativação:**
> "Vamos criar o calendário editorial de junho. Projetos: Brasil Participativo e Cerrado Experience."

---

### Skill: Marketing Digital ✅ Ativa — Fase 1

**O que faz:** Estratégia de conteúdo, funil de conversão, tráfego pago e copywriting de alta conversão. Usa base de conhecimento de apostilas salvas no Obsidian.

**Exemplo de ativação:**
> "Quero estruturar um funil de captação para novos clientes via Instagram. Qual é a estratégia para uma produtora do nosso porte?"

---

### Skill: Humanizador ✅ Ativa — Fase 1 — SEMPRE usar em textos externos

**O que faz:** Reescreve qualquer texto para soar como Lipe ou Jaya escreveram — caloroso, direto, sem jargão corporativo.

**Palavras proibidas:** "sinergia", "disruptivo", "solução inovadora", "Muito orgulhosos de apresentar", "Prezado cliente"

**Regra absoluta:** Todo texto que sai para um cliente externo (e-mail, proposta, post) deve passar pelo Humanizador.

**Exemplo de ativação:**
> "Humanize este texto antes de eu enviar: [cola o texto]"

---

## Seção 3 — As Skills Antigravity

As skills Antigravity são módulos técnicos especializados que as skills principais acionam automaticamente. Ficam em `skills/antigravity/`.

| Skill | O que faz | Quem aciona | Quando |
|---|---|---|---|
| cinematic-script-writer | 175+ técnicas cinematográficas: ângulos, movimentos, iluminação | Pré-Produção | Decupagem técnica |
| photography-settings | Config de câmera: exposição, ISO, aperture, golden hour | Produção | Planejamento de set |
| negotiation-voss | Método Voss: mirroring, labeling, perguntas calibradas | Captação, Proposta | Cliente resistente |
| marketing-psychology | Ancoragem de preço, prova social, gatilhos mentais | Proposta, Marketing | Apresentação de preço |
| financial-calculator-pro | Markup, margem, ROI, simulação de descontos | Proposta, Gestão | Cálculo de orçamento |
| exec-admin | Triagem e priorização P0/P1/P2/P3 | Gestão | Ordem do Dia |
| automation-workflows | Design de automações Make/n8n/Zapier | Gestão | Fase 3 |
| budget-planner | Controle orçamentário: variância, projeção | Gestão, Proposta | Projetos longos |

---

## Seção 4 — O Fluxo de Trabalho Completo — 13 Etapas

Todo projeto da Firma passa pelas mesmas 13 etapas nessa ordem.

```
PROSPECÇÃO → CRM → CLIENTE → BRIEFING → PROPOSTA →
PRÉ-PRODUÇÃO → PRODUÇÃO → EDIÇÃO → REVISÃO →
EDIÇÃO FINAL → ENTREGA → NOTA FISCAL → PAGAMENTO
```

| # | Etapa | Lipe | Jaya | Oráculo | Skill | Status |
|---|---|---|---|---|---|---|
| 1 | Prospecção | ✓ Decide ir atrás | — | Pesquisa, qualifica VERDE/AMARELO/VERMELHO | Captação | ✅ Ativa |
| 2 | CRM | — | — | Monitora, dispara follow-up 7 dias | Gestão | ✅ Ativa |
| 3 | Cliente | — | ✓ Confirma dados | Cadastra em CLIENTES + CRM no Notion | Captação | ✅ Ativa |
| 4 | Briefing | ✓ Toma decisão final | — | Conduz 10 perguntas, pesquisa, DISC | Captação | ✅ Ativa |
| 5 | Proposta | ✓ Revisa criativo | ✓ Revisa financeiro | Pesquisa, calcula, gera Word | Proposta | ✅ Ativa |
| 6 | Pré-Produção | ✓ Direção criativa | ✓ Logística | Roteiro, decupagem, checklist | Pré-Produção | ✅ Ativa |
| 7 | Produção (Set) | ✓ Filma e dirige | ✓ Som e luz | Diário de set, checklist | Produção | ✅ Ativa |
| 8 | Edição | ✓ Edita e colore | — | Acompanha Notion, organiza feedback | Gestão | ✅ Ativa |
| 9 | Revisão | ✓ Aplica revisões | — | Controla contador (máx. 2 sem custo) | Gestão | ✅ Ativa |
| 10 | Edição Final | ✓ Exporta masters | — | Documenta entregáveis | Gestão | ✅ Ativa |
| 11 | Entrega | — | — | E-mail de entrega humanizado | Humanizador | ✅ Ativa |
| 12 | Nota Fiscal | — | ✓ Emite a NF | Lembra, confirma valor com NF inclusa | Gestão | ✅ Ativa |
| 13 | Pagamento | — | ✓ Confirma | NPS 15 dias, fecha projeto no Notion | Gestão | ✅ Ativa |

**⚠️ Regra crítica — Etapa 9:** O cliente tem direito a 2 rodadas de revisão sem custo. Na 3ª solicitação, o Oráculo ajuda a redigir um aditivo de contrato. Essa regra deve estar clara na proposta desde o início.

---

## Seção 5 — Os Subagentes

Os subagentes são versões especializadas do Oráculo que rodam no **claude.ai** (browser ou celular), sem precisar do VS Code aberto.

**Como criar:** claude.ai → Projects → New Project → cole o system prompt de `docs/SUBAGENTES.md` → suba os documentos indicados.

| Subagente | Quando usar | Status |
|---|---|---|
| Proposta | Briefing + proposta + orçamento + negociação | ⏳ Criar no claude.ai |
| Produção | Roteiro + decupagem + plano de filmagem | ⏳ Criar no claude.ai |
| Gestão | Ordem do Dia + projetos + financeiro + reunião semanal | ⏳ Criar no claude.ai |
| Conteúdo | Calendário editorial + posts + newsletter | ⏳ Criar no claude.ai |
| Captação | Atendimento a leads externos direto pelo celular | 📌 Futuro |

**Subagente vs Oráculo principal:**

| Situação | Use |
|---|---|
| Está no PC, tarefa complexa | Oráculo principal (Claude Code) |
| Está no celular, proposta rápida | Subagente de Proposta (claude.ai) |
| Quer Ordem do Dia sem ligar o PC | Subagente de Gestão (claude.ai) |
| Precisa de acesso ao Notion/Obsidian/arquivos | Oráculo principal (Claude Code) |

---

## Seção 6 — O Notion — Base de Dados Operacional

O Notion é o "escritório" do Oráculo. O Oráculo acessa via MCP — pode ler e atualizar dados sem você abrir o Notion manualmente.

**Regra de segurança:** O Oráculo sempre pede autorização antes de criar, editar ou deletar qualquer registro.

### Bancos da Fase 1 — Ativos agora

| Banco | Prefixo | Função | Status |
|---|---|---|---|
| PROJETO_2026 | PRJ- | Hub central — todos os projetos | ✅ Ativo |
| CLIENTES | CLI- | Empresas e organizações | ✅ Ativo |
| CONTATOS | CTT- | Equipe, freelancers, fornecedores | ✅ Ativo |
| PROPOSTAS | PRP- | Propostas e status comercial | ✅ Ativo |
| CRM | CRM- | Pipeline de vendas | ✅ Ativo |
| TAREFAS | TAR- | Todas as tarefas com responsável e prazo | ✅ Ativo |

### Bancos planejados

| Banco | Fase |
|---|---|
| ORÇAMENTO, CRIATIVO, ANÁLISE TÉCNICA, FINANCEIRO_PROJETO, CRONOGRAMA | 📌 Fase 2 |
| FILMAGEM, EDIÇÃO, ENTREGA, LOCAÇÕES, EQUIPAMENTOS... | 📌 Fase 3 |

### Como consultar via Oráculo

```
"Quais projetos estão ativos no Notion agora?"
"Qual é o status da proposta para o SuperHost?"
"Me lista as tarefas abertas desta semana para o Lipe."
"Cria uma entrada no banco de Clientes para a CNV." ← pede autorização primeiro
```

---

## Seção 7 — Integrações e Ecossistema

### Ferramentas ativas agora (Fase 1)

| Ferramenta | O que faz | Status |
|---|---|---|
| Notion MCP | Lê e escreve nos 6 bancos de dados | ✅ Ativo |
| Obsidian MCP | Acessa o segundo cérebro | ✅ Ativo |
| NotebookLM | Análise de documentos, podcasts de resumo | ✅ Ativo |
| DuckDuckGo / Brave Search | Pesquisa web, benchmarks, clientes | ✅ Ativo |
| Filesystem MCP | Lê e cria arquivos locais | ✅ Ativo |

### Roadmap de integrações

| Fase | Ferramentas | O que muda |
|---|---|---|
| Fase 2 (Sem 3–4) | Google Drive MCP, Frame.io, Site Framer | Acesso a arquivos, aprovação de vídeos online |
| Fase 3 (Sem 5–6) | ElevenLabs, Whisper, Make/n8n | Voice-over, transcrição, automações A1–A5 |
| Fase 4 (Sem 7–8) | Bot Telegram, LinkedIn Sales Navigator | Oráculo no celular, prospecção ativa |
| Fase 5 (Mês 3+) | Meta Ads, Apify | Inteligência de mercado em escala |

### As 5 Automações Prioritárias (Fase 3)

| ID | Nome | Gatilho | Economia |
|---|---|---|---|
| A1 | Briefing → Projeto | CRM "Ganho" | 5 min vs 2h manual |
| A2 | Proposta → Pré-Produção | Proposta "Aprovada" | Setup automático de tarefas |
| A3 | Ordem do Dia às 8h | Cron diário 08:00 | 30 min/dia |
| A4 | Entrega → Follow-up + NF | Projeto "Entregue" | 1h de comunicações |
| A5 | Making-of → Conteúdo | Projeto fechado | 2h de produção de conteúdo |

---

## Seção 8 — Estrutura dos Documentos

### Arquivos na raiz

| Arquivo | O que é |
|---|---|
| `CLAUDE.md` | O cérebro do Oráculo — identidade, routing de skills, regras |
| `MEMORIA.md` | Aprendizados acumulados de projetos reais |
| `STATUS.md` | Handoff entre sessões — o que foi feito, o que falta |
| `.mcp.json` | Configuração das integrações (não editar manualmente) |

### Pasta docs/

| Arquivo | O que contém |
|---|---|
| `CONTEXTO_FIRMA.md` | DNA completo: identidade, valores, preços, equipe, clientes |
| `FLUXO_TRABALHO.md` | As 13 etapas detalhadas com responsáveis e regras |
| `ARQUITETURA_NOTION.md` | Schema dos 25 bancos de dados |
| `SUBAGENTES.md` | System prompts dos 5 subagentes |
| `TABELA_PRECOS.md` | 140+ orçamentos históricos de referência |
| `GUIA_ORACULO.md` | Guia de uso do VS Code + Claude Code |

### Pasta skills/

```
skills/
├── captacao/SKILL.md
├── proposta/
│   ├── SKILL.md
│   ├── blocos_xml.md
│   └── assets/MODELO_ORCAMENTO.docx
├── preproducao/SKILL.md
├── producao/SKILL.md
├── gestao/SKILL.md
├── conteudo/SKILL.md
├── marketing-digital/SKILL.md
├── humanizador/SKILL.md
└── antigravity/ (8 skills técnicas)
```

### Pasta output/ — o que o Oráculo produz

| Pasta | O que vai para lá | Nomenclatura |
|---|---|---|
| `output/propostas/` | Propostas em Word | `NomeCliente_proposta_v1.docx` |
| `output/roteiros/` | Roteiros e decupagens | `NomeCliente_roteiro_v1.md` |
| `output/conteudo/` | Posts, calendários | `NomeCliente_posts_jun2026.md` |
| `output/relatorios/` | Relatórios financeiros | `NomeCliente_relatorio_v1.md` |
| `output/manual/` | Este manual | `oraculo-manual-v1.html` |

---

## Seção 9 — Guia de Uso Rápido

### Os 10 pedidos mais comuns

| O que você quer fazer | O que digitar |
|---|---|
| Gerar uma proposta | "Quero fazer uma proposta para [cliente]. [briefing básico]" |
| Atender novo cliente | "Novo cliente chegou: [nome], empresa [X], quer [projeto]" |
| Ver a Ordem do Dia | "Qual é a ordem do dia? Projetos ativos: [lista]" |
| Criar roteiro | "Preciso de roteiro para [projeto]. Briefing: [resumo]" |
| Criar posts do mês | "Cria o calendário editorial de [mês]. Projetos: [lista]" |
| Humanizar um texto | "Humanize este texto antes de eu enviar: [cola o texto]" |
| Ver projetos no Notion | "Quais projetos estão ativos no Notion agora?" |
| Pesquisar um cliente | "Pesquisa sobre [empresa] — quero entender o contexto antes do briefing" |
| Registrar aprendizado | "Temos algum aprendizado desta sessão para registrar no MEMORIA.md?" |
| Consultar preço | "Quanto custa um [tipo de projeto] segundo nossa tabela de referência?" |

### Fluxo ideal de uma proposta

```
1. Abra o VS Code na pasta do Oráculo
2. Terminal: claude
3. Ative o Plan Mode (Shift+Tab)
4. "Preciso de uma proposta para [cliente]. [briefing]"
5. Oráculo planeja → você lê o plano → aprova
6. Oráculo executa:
   → Pesquisa o cliente na web
   → Lê skills/proposta/SKILL.md
   → Faz perguntas se faltar informação
   → Calcula orçamento interno
   → Escreve a proposta com ancoragem de mercado
   → Aplica o Humanizador
   → Gera Word em output/propostas/
7. Você revisa → aceita
8. Oráculo pergunta: "Quer registrar no Notion?" → você autoriza
9. /clear → pronto para próxima tarefa
```

### Boas práticas

- **Plan Mode primeiro** — antes de qualquer proposta, roteiro ou tarefa complexa
- **/clear entre tarefas** — cada proposta é uma sessão nova
- **@-mentions** — referencie os arquivos em vez de deixar o Oráculo procurar
- **Alimente o MEMORIA.md** — ao fechar cada projeto, registre o aprendizado
- **Humanizador sempre** — todo texto externo passa pelo Humanizador
- **Controle de versão** — use _v1, _v2, _v3 nos nomes de arquivo

### Erros comuns e como evitar

| Erro | Como evitar |
|---|---|
| Pedir proposta sem dar briefing | Sempre inclua: cliente, tipo de projeto, prazo, budget |
| Dois projetos misturados na mesma sessão | /clear entre projetos |
| NF cobrada separada do cliente | NF 7,28% sempre já inclusa no total |
| Texto soando como IA na proposta | Lembre de pedir o Humanizador ao final |
| Sessão lenta e respostas confusas | Use /compact para comprimir o histórico |

---

## Seção 10 — Status e Roadmap

### O que está funcionando hoje — Fase 1 ✅ Concluída · Mai 2026

- Skills: captação, proposta, pré-produção, produção, gestão, conteúdo, marketing-digital, humanizador ✅
- Skills Antigravity (8 módulos técnicos) ✅
- Notion MCP — leitura e escrita nos 6 bancos ✅
- Obsidian MCP — segundo cérebro sincronizado ✅
- DuckDuckGo / Brave Search — pesquisa web ✅
- NotebookLM — análise de documentos ✅
- MEMORIA.md com primeiros aprendizados reais ✅
- Propostas geradas: Brasil Participativo (v1–v4), SuperHost, Evento UnB ✅

### Próxima sessão — alta prioridade

1. Testar geração do Word (.docx) de ponta a ponta
2. Cadastrar clientes reais no Notion (CNV, SuperHost, Tamause, Vert, Cerrado, Chichá)
3. Criar subagentes no claude.ai (Proposta, Produção, Gestão, Conteúdo)

### Roadmap das fases

| Fase | Custo/mês | Ferramentas | Quando |
|---|---|---|---|
| Fase 1 | R$120 | Estrutura completa | ✅ Mai 2026 |
| Fase 2 | +R$160 | Google Drive, Frame.io, Framer | Sem 3–4 |
| Fase 3 | +R$110 | ElevenLabs, Whisper, Make/n8n, automações A1–A5 | Sem 5–6 |
| Fase 4 | +R$1.090 | Bot Telegram, LinkedIn Sales Navigator | Sem 7–8 |
| Fase 5 | Escala | Meta Ads, Apify, Curso Videomaker | Mês 3+ |

---

## Apêndice A — Glossário

| Termo | O que significa na prática |
|---|---|
| **Claude Code** | O programa que roda a IA do Oráculo diretamente nos seus arquivos. Diferente do ChatGPT: lê seus documentos, usa ferramentas e é configurável. |
| **VS Code** | O editor onde o Claude Code roda. Para a Firma, é apenas a "janela" para conversar com o Oráculo. |
| **MCP** | Model Context Protocol — a ponte que conecta o Oráculo a ferramentas externas (Notion, Obsidian). |
| **Skill** | Um módulo especializado que transforma o Oráculo em especialista naquele assunto. |
| **Subagente** | Versão simplificada do Oráculo que roda no browser (claude.ai). Útil no celular. |
| **Token** | A "moeda" de processamento da IA. Cada palavra lida ou gerada consome tokens. |
| **Context window** | A "memória de curto prazo" do Oráculo em uma sessão. Use /compact quando ficar longa. |
| **Plan Mode** | Modo onde o Oráculo só lê e planeja — não altera nada. |
| **@-mention** | Forma de referenciar um arquivo direto no chat: @CLAUDE.md, @skills/proposta/SKILL.md. |
| **Diff** | Visualização das mudanças que o Oráculo quer fazer — verde = novo, vermelho = removido. |
| **Vault** | Nome do Obsidian para uma pasta de arquivos — o segundo cérebro da Firma. |
| **Prompt** | A mensagem que você escreve para o Oráculo. Bom prompt = contexto + tarefa + formato. |
| **Decupagem** | O plano técnico de filmagem cena por cena — ângulo, movimento, iluminação, equipamento. |
| **DISC** | Modelo de perfil comportamental. O Oráculo identifica o perfil do cliente para adaptar a proposta. |
| **NF / Nota Fiscal** | Imposto de 7,28% sobre serviços. Sempre incluso no total — nunca separado. |
| **Ancoragem de preço** | Técnica de mostrar um preço maior de mercado antes do preço real. O Oráculo usa automaticamente. |

---

## Apêndice B — Tabela de Preços de Referência

### Pacotes e serviços

| Tipo de Projeto | Faixa |
|---|---|
| Cobertura de evento | R$ 5.000 – 12.000 |
| Vídeo institucional / depoimentos | R$ 8.000 – 20.000 |
| Documentário / projeto longo | R$ 30.000 – 130.000+ |
| Conteúdo recorrente para redes sociais | R$ 800 – 2.000 / mês |
| Plano social media básico (3 posts/semana) | R$ 800/mês |
| Plano social media intermediário (7 posts/semana) | R$ 1.500/mês |
| Plano social media completo (12 posts/semana) | R$ 2.000/mês |

### Referências de custo interno

| Item | Valor |
|---|---|
| Diária Lipe (direção + fotografia) | R$ 1.800/dia |
| Diária Jaya (produção + som) | R$ 1.200/dia |
| NF sobre serviços (ISS) | 7,28% — Base = Total ÷ 1,0728 |
| Margem mínima | 35% sobre custo direto |
| Desconto máximo (institucional) | 15–20% |
| Desconto máximo (projetos sociais) | 30–50% com autorização de Lipe |
| Ticket médio atual | ~R$ 8.000 |

---

## Apêndice C — Responsabilidades por Etapa

| Etapa | Lipe | Jaya | Oráculo |
|---|---|---|---|
| 1. Prospecção | ✓ Decisão de prospectar | — | Pesquisa, qualifica, primeiro contato |
| 2. CRM | — | — | Monitora pipeline, dispara follow-up |
| 3. Cliente | — | ✓ Confirma dados fiscais | Cadastra no Notion |
| 4. Briefing | ✓ Aprova avanço | — | Conduz entrevista, pesquisa, DISC |
| 5. Proposta | ✓ Revisão criativa | ✓ Revisão financeira | Calcula, escreve, gera Word |
| 6. Pré-Produção | ✓ Direção, aprovação | ✓ Logística | Roteiro, decupagem, checklist |
| 7. Produção | ✓ Dirige e filma | ✓ Som, luz, produção | Diário de set, checklist |
| 8. Edição | ✓ Edita e colore | — | Acompanha Notion, organiza feedback |
| 9. Revisão | ✓ Aplica correções | — | Controla contador de alterações |
| 10. Edição Final | ✓ Exporta masters | — | Documenta entregáveis |
| 11. Entrega | — | — | E-mail de entrega humanizado |
| 12. Nota Fiscal | — | ✓ Emite a NF | Lembra, confirma valor |
| 13. Pagamento | — | ✓ Confirma recebimento | NPS 15 dias, fecha no Notion |

---

*Oráculo — Firma Abacaxi Ateliê Audiovisual · Brasília · 2026*
*Manual v1.0 · Maio 2026*
