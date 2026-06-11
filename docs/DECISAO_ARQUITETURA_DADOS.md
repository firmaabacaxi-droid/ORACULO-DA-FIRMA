# Decisão de Arquitetura de Dados — Firma Abacaxi
## Piloto: Migração Parcial Notion → Cérebro Central (Obsidian/GitHub)

**Data da decisão:** 2026-06-10  
**Sessão:** 20  
**Participantes:** Lipe, Jaya, Oráculo

---

## Contexto

A Firma opera hoje com dois repositórios de informação:

1. **Notion** (banco de dados relacional) — fonte de verdade operacional, 12 bancos ativos, R$ 60–130/mês
2. **Cérebro Obsidian/GitHub** (vault markdown) — conhecimento, contexto, logs de sessão, templates

O problema: cada mudança de estado (projeto novo, tarefa criada, proposta aprovada) exige atualizar os dois sistemas. E quando o Oráculo precisar ler context, tem que varrer dois lugares.

A pergunta central: **vale centralizar tudo no cérebro e sair do Notion?**

---

## Análise: Viabilidade de migração por banco

| Banco Notion | Complexidade | Rollups/Fórmulas | Migração | Risco |
|---|---|---|---|---|
| **CRM** | Baixa | Rollup de valor (via Proposta) | ✅ Fácil | Baixo |
| **TAREFAS** | Baixa | Nenhum | ✅ Fácil | Baixo |
| **CLIENTES** | Baixa | Nenhum | ✅ Fácil | Baixo |
| **CONTATOS** | Média | Nenhum | ✅ Fácil | Baixo |
| **PROPOSTAS** | Média | Nenhum | ✅ Fácil | Baixo |
| **PROJETO_2026** | Alta | Valor Total (soma ORÇAMENTO), Margem | ⚠️ Parcial | Médio |
| **ORÇAMENTO** | Alta | Rollup de totais, Budget vs Actual | ⚠️ Difícil | Alto |
| **FINANCEIRO_PROJETO** | Alta | Transações + rollups | ⚠️ Difícil | Alto |
| **FILMAGEM/EDIÇÃO** | Média | Nenhum crítico | ⚠️ Médio | Médio |
| **GESTÃO_FINANCEIRA** | Alta | Fluxo de caixa | ⚠️ Difícil | Alto |

**Veredicto técnico:** CRM e TAREFAS são os únicos bancos sem rollups críticos. São os candidatos naturais para o piloto.

---

## Prós e Contras

### Cenário A — Migração Total (sair do Notion)

**Vantagens:**
- Elimina R$ 60–130/mês de custo por usuário
- Tudo em um lugar: o Oráculo lê e atualiza só no cérebro
- Versionamento Git nativo — histórico completo de todas as mudanças
- Funciona offline
- Sem travamento em plataforma SaaS (portabilidade total dos dados)
- Integração nativa com Claude Code: o Oráculo lê/escreve diretamente nos arquivos

**Desvantagens:**
- Perde relações bidirecionais automáticas (10 relações DUAL do Notion)
- Rollups e fórmulas precisam ser reescritos como queries Dataview
- Acesso mobile é mais complexo (Obsidian Git + Android setup manual)
- Sem API nativa para n8n (n8n usa Notion API — precisaria usar GitHub API como intermediário)
- Interface menos polida para uso cotidiano sem PC
- Risco alto de perder Budget vs. Actual automático do ORÇAMENTO

### Cenário B — Piloto Parcial (CRM + TAREFAS → cérebro)

**Vantagens:**
- Risco zero: Notion continua intacto durante o teste
- Testa a usabilidade mobile (Obsidian Android + obsidian-git)
- Testa se Bases resolve a necessidade de visualização
- Decisão informada com experiência real (2–4 semanas de uso)
- Pode reverter sem perda de dados

**Desvantagens:**
- Continua com dois sistemas no período de teste
- Custo do Notion mantido durante o piloto

### Cenário C — Híbrido Permanente

**Vantagens:**
- Notion cuida do operacional relacional (ORÇAMENTO, FINANCEIRO, PROJETO)
- Cérebro cuida do conhecimento, captura, contexto, skills
- Cada ferramenta no que faz de melhor

**Desvantagens:**
- Retrabalho de atualização duplicada permanece para CRM/TAREFAS
- Custo do Notion mantido indefinidamente

---

## Decisão Tomada

**Estratégia: Piloto (Cenário B) → Avaliar → Decidir**

**O que muda agora (Sessão 20):**
- CRM e TAREFAS do Notion são espelhados no cérebro (`cerebro/CEREBRO-ORACULO/08-BASES/`)
- Obsidian Bases configurado para visualização kanban/tabela
- Notion NÃO é cancelado — continua sendo a fonte de verdade operacional durante o piloto
- Piloto duração: **2–4 semanas de uso real** (até ~01/07/2026)

**Critérios de avaliação do piloto:**

| Critério | Pergunta a responder |
|---|---|
| Usabilidade mobile | Consigo abrir o Obsidian Android, ver o CRM kanban e atualizar uma tarefa em menos de 1 min? |
| Qualidade das views | O Obsidian Bases substitui a UX do Notion CRM kanban? |
| Atualização | Editar um registro no Bases é mais ou menos trabalhoso que no Notion? |
| Sincronização | O obsidian-git sincroniza automaticamente sem conflitos? |
| Confiabilidade | Houve perda de dados ou conflitos de merge em 2 semanas? |

**Data de revisão:** 01/07/2026  
**Decisão final:** Baseada nos critérios acima — ampliar migração, manter híbrido, ou voltar 100% Notion.

---

## Impacto Financeiro Projetado

| Cenário | Custo Notion | Custo adicional | Economia |
|---|---|---|---|
| Status quo | ~US$10–12/mês/usuário (~R$130/mês × 2 = R$260/mês) | — | — |
| Migração parcial (piloto) | R$260/mês | +US$4/mês Obsidian Sync (opcional) | R$0 |
| Migração total (pós-piloto) | R$0 | +US$4/mês Obsidian Sync se quiser sync fácil | ~R$260/mês |

---

## O Que Não Fazemos Agora

- ❌ Cancelar o Notion (risco alto sem dados do piloto)
- ❌ Migrar PROJETO_2026, ORÇAMENTO, FINANCEIRO (rollups complexos — alta probabilidade de quebra)
- ❌ Deploy n8n (depende de infraestrutura própria do Lipe)
- ❌ Criar app HTML/dashboard personalizado (reavaliado pós-piloto se Bases não atender)

---

## Referências

- [Obsidian Bases — plugins de views](https://www.obsidianstats.com/plugins/kanban-bases-view)
- [Sync Android gratuito via Git](https://github.com/DovieW/obsidian-android-sync)
- `docs/GUIA_MOBILE_ANDROID.md` — passo a passo de setup no Android
- `docs/workflows/captura_telegram_n8n.md` — blueprint de captura rápida
- `cerebro/CEREBRO-ORACULO/08-BASES/` — os bancos do piloto
