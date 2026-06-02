# Roadmap de Implementação — Oráculo

*Referência rápida — ver `docs/PLANO_IMPLEMENTACAO.md` para detalhes completos*

---

## Diagnóstico (Mai 2026)

| Dimensão | Score |
|---|---|
| Saúde comercial | 6.2/10 |
| Eficiência operacional | 4.1/10 🔴 |
| Qualidade criativa | 8.7/10 ✅ |
| Presença digital | 5.0/10 |

**Problema central:** 11 das 13 etapas do fluxo são 100% manuais → 6–8h de admin por projeto.  
**Oportunidade:** Precificação 40–60% abaixo do mercado — redesenhar pacotes pode dobrar o ticket.

---

## Status atual (Mai 2026)

```
✅ Claude Code + Notion MCP + Filesystem + DuckDuckGo + Obsidian + NotebookLM
✅ 7 skills operacionais + 8 skills Antigravity
✅ 6 bancos Notion Fase 1 ativos (leitura e escrita confirmadas)
✅ Propostas geradas: Brasil Participativo (v1–v3), SuperHost, UNB evento
✅ Base de marketing digital extraída (6 módulos via NotebookLM)
⬜ Subagentes no claude.ai (criados, não validados com cliente real)
⬜ Primeira proposta real end-to-end testada
```

---

## As 5 Fases

### Fase 1 — Fundação · Sem 1–2 · R$120/mês *(ativa)*
Google AI Pro → Google Drive no claude.ai → Subagentes como Projects → 5 bancos Notion → Remote Control → Primeira proposta real

### Fase 2 — Captação · Sem 3–4 · +R$160/mês
Obsidian + plugin Local REST API → Bancos Fase 2 Notion → Make/automação A1 → Frame.io → Site no Framer

### Fase 3 — Produção · Sem 5–6 · +R$110/mês
Whisper (transcrição áudio) → ElevenLabs (voice-over) → Ordem do Dia automática às 8h → Asaas (PIX/boleto por projeto) → Newsletter mensal

### Fase 4 — Conteúdo · Sem 7–8 · +R$1.090/mês
Agente de Conteúdo ativo → Publicação automática → Apollo.io + LinkedIn Sales Navigator → Programa de indicação

### Fase 5 — Autônomo · Mês 3+ · escala
Dashboard financeiro em tempo real → Apify (prospecção 50 leads/semana) → Produto digital (curso) → Avaliação de contratação

---

## 5 Automações prioritárias

| ID | Nome | Ferramenta | Impacto |
|---|---|---|---|
| A1 | Briefing → Projeto Notion | n8n/Make + webhook | 2h → 5min |
| A2 | Proposta aprovada → Pré-produção | n8n webhook Notion | tarefas + roteiro automático |
| A3 | Ordem do Dia 8h | Make cron → WhatsApp | Lipe+Jaya focados, não perdidos |
| A4 | Entrega → Follow-up + NF | Make trigger | zero comunicação esquecida |
| A5 | Making-of → Conteúdo | Whisper + Oráculo | 1 projeto = 10 posts |

---

## O que NÃO fazer

- ❌ Criar todos os 25 bancos Notion de uma vez
- ❌ Prospecção ativa antes do sistema de captação estar estável
- ❌ Contratar agência para o site (Framer + Oráculo resolve)
- ❌ Configurar 10 MCPs ao mesmo tempo

---

*Fonte: `docs/PLANO_IMPLEMENTACAO.md` · Atualizado Mai 2026*
