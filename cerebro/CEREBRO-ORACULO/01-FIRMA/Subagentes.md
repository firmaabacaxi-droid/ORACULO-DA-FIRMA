# Subagentes do Oráculo

*5 agentes especializados como Projects no claude.ai — ver system prompts completos em `docs/SUBAGENTES.md`*

---

## Quando usar cada subagente

| Situação | Subagente |
|---|---|
| Novo cliente, briefing, proposta, orçamento, negociação | **Proposta** |
| Roteiro, decupagem, plano de filmagem, pós-produção | **Produção** |
| Ordem do Dia, status de projetos, financeiro, reunião semanal | **Gestão** |
| Calendário editorial, posts Instagram/LinkedIn, newsletter | **Conteúdo** |
| Atendimento direto a cliente externo (futuro) | **Captação** |
| Qualquer decisão estratégica ou tarefa fora dos agentes acima | **Oráculo (principal)** |

---

## Agente 1 — Proposta

**Project name:** `Proposta — Firma Abacaxi`  
**Documentos:** `docs/CONTEXTO_FIRMA.md` + `skills/proposta/SKILL.md`

**Entrega:**
- Briefing estruturado (8 etapas, uma por vez)
- Proposta comercial (7 seções: capa, entendimento, escopo, cronograma, investimento, termos, CTA)
- Orçamento interno (custos + margem mínima 35%)

**Gatilho:** "Novo cliente. Vamos fazer o briefing."

---

## Agente 2 — Produção

**Project name:** `Produção — Firma Abacaxi`  
**Documentos:** `docs/CONTEXTO_FIRMA.md` + `skills/preproducao/SKILL.md`

**Entrega:**
- Roteiro (Abertura / Blocos / Encerramento com CTA)
- Decupagem técnica (plano, ângulo, movimento, iluminação, equipamento)
- Plano de filmagem / Ordem do Dia de set
- Plano de pós-produção com prazos

**Gatilho:** "Projeto aprovado: [nome]. Briefing: [cole]. Vamos começar pelo roteiro."

---

## Agente 3 — Gestão

**Project name:** `Gestão — Firma Abacaxi`  
**Documentos:** `docs/CONTEXTO_FIRMA.md` + `docs/FLUXO_TRABALHO.md` + `skills/gestao/SKILL.md`

**Entrega:**
- Ordem do Dia (P0/P1/P2 por pessoa)
- Painel de projetos ativos
- Controle financeiro por projeto
- Pauta de reunião semanal
- E-mails e comunicações operacionais

**Gatilho:** "Segunda-feira. Projetos ativos: [lista]. Gera minha Ordem do Dia."

---

## Agente 4 — Conteúdo

**Project name:** `Conteúdo — Firma Abacaxi`  
**Documentos:** `docs/CONTEXTO_FIRMA.md` + `skills/conteudo/SKILL.md`

**5 pilares:** Portfólio · Bastidores · Valores · Conhecimento técnico · Empreendedorismo

**Entrega:**
- Calendário editorial mensal
- Posts Instagram/LinkedIn (legenda + CTA + hashtags)
- 10 conteúdos por projeto filmado
- Newsletter mensal

**Gatilho:** "Vamos criar o calendário editorial de [mês]. Projetos para mostrar: [lista]."

---

## Agente 5 — Captação *(implementação futura)*

**Project name:** `Captação — Firma Abacaxi`  
**Documentos:** `docs/CONTEXTO_FIRMA.md` + `skills/captacao/SKILL.md`

**Função:** Atendimento direto a clientes externos que chegam pelo Instagram, WhatsApp ou indicação — funciona enquanto Lipe e Jaya estão em set.

---

*Fonte: `docs/SUBAGENTES.md` · Atualizado Mai 2026*
