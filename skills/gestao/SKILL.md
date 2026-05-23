# SKILL — Gestão
## Ordem do Dia, tarefas, financeiro e relatórios
*Skill orquestradora — coordena: Notion (Projetos + Tarefas) + priorização + alertas*

---

## Quando esta skill é ativada

- "Qual é a ordem do dia?"
- "O que temos pra fazer hoje/essa semana?"
- "Como estão os projetos?"
- "Preciso de um relatório financeiro"
- "Tem algum prazo chegando?"

---

## Skills do Antigravity — quando acionar

| Situação | Skill |
|---|---|
| Configurar ou revisar automação de ordem do dia / follow-up | `skills/antigravity/automation-workflows/SKILL.md` — A3 (ordem do dia 8h), A4 (follow-up pós-entrega) |
| Calcular margem, markup ou rentabilidade de projeto | `skills/antigravity/financial-calculator-pro/SKILL.md` — markup, margem líquida, FV, PV |
| Triagem e priorização avançada de e-mails e tarefas | `skills/antigravity/exec-admin/SKILL.md` — P0/P1/P2, draft de comunicações |

---

## ORDEM DO DIA — processo

### Etapa 1 — Coletar dados do Notion

Leia simultaneamente:
```
Banco: Projeto 2026
→ Projetos com status ≠ Concluído
→ Filtrar por data de entrega (próximos 30 dias primeiro)

Banco: Tarefas
→ Tarefas não concluídas
→ Ordenar por prazo
→ Filtrar por responsável (Lipe / Jaya / Freelancer)
```

### Etapa 2 — Priorizar

Classifique tudo em:

```
🔴 P0 — Urgente e importante
   Prazo em até 3 dias OU bloqueando outra pessoa OU cliente esperando

🟡 P1 — Importante, não urgente
   Prazo em até 7 dias OU avança projeto crítico

🟢 P2 — Pode esperar
   Prazo > 7 dias OU tarefa interna sem impacto externo imediato

⚪ P3 — Backlog
   Sem prazo definido OU fase futura
```

### Etapa 3 — Formatar Ordem do Dia

```markdown
# Ordem do Dia — [data]

## 🔴 Fazer agora
- [tarefa] — [projeto] — vence [data]
- [tarefa] — [projeto] — cliente esperando

## 🟡 Fazer hoje se possível
- [tarefa] — [projeto] — vence em X dias
- [tarefa] — [projeto]

## 🟢 Esta semana
- [tarefa] — [projeto]

## ⚠️ Alertas
- [projeto X] entrega em 3 dias — confirmado com cliente?
- [proposta Y] enviada há 7 dias — fazer follow-up?
- [freelancer Z] pagamento pendente desde [data]

## 📊 Resumo dos projetos ativos
- [Projeto A] — Em edição — entrega: [data]
- [Projeto B] — Em pré-produção — filmagem: [data]
- [Projeto C] — Proposta enviada — aguardando aprovação
```

---

## ALERTAS AUTOMÁTICOS — verificar sempre

```
3 dias antes de qualquer entrega → alertar Lipe/Jaya
7 dias sem resposta de proposta → sugerir follow-up
Proposta aprovada → sugerir criar projeto e tarefas no Notion
Projeto concluído → sugerir follow-up de satisfação (15 dias)
Pagamento pendente → alertar Jaya
```

---

## GESTÃO FINANCEIRA — visão básica

Quando solicitado relatório financeiro:

```
Leia banco: Projeto 2026
→ Filtrar por status: Concluído (este mês)
→ Somar: valor recebido

→ Filtrar por status: Em andamento
→ Somar: valor a receber (pipeline)

→ Identificar: propostas aprovadas aguardando início
→ Calcular: receita total prevista no mês
```

Formato do relatório:
```
FINANCEIRO — [mês/ano]

Recebido no mês:     R$ [valor]
A receber (projetos ativos): R$ [valor]
Pipeline (propostas aprovadas): R$ [valor]
─────────────────────────────────────────
Total previsto: R$ [valor]

Projetos pagos integralmente: [lista]
Projetos com pagamento pendente: [lista + valor]
```

---

## GESTÃO DE TAREFAS — criação padronizada

Quando criar tarefas no Notion, sempre inclua:

```
Nome: [verbo] + [objeto] — ex: "Editar corte 1 — CNV"
Responsável: Lipe / Jaya / [freelancer]
Projeto: [link para Projeto 2026]
Prazo: [data específica]
Prioridade: P0 / P1 / P2 / P3
Status: A fazer / Em andamento / Concluído
```

---

## FOLLOW-UP — templates rápidos

**Proposta sem resposta (7 dias)**
> "Oi [nome], tudo bem? Passando para saber se a proposta do [projeto] ficou clara. Qualquer dúvida, é só falar. Um abraço, Lipe"

**Pós-entrega (15 dias)**
> "Oi [nome]! Faz 15 dias desde que entregamos o [projeto]. Como foi a recepção do vídeo? A gente fica feliz em saber. Um abraço, Lipe e Jaya"

**Pagamento pendente (Jaya envia)**
> "Oi [nome], tudo bem? Passando para confirmar o pagamento da segunda parcela do [projeto], previsto para [data]. Qualquer coisa, fala com a gente. Abraço, Jaya"
