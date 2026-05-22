# SKILL — Marketing Digital
## Base de conhecimento extraída das apostilas via NotebookLM

---

## Quando esta skill é ativada

- "Como eu posso vender melhor para esse cliente?"
- "Qual estratégia de tráfego faz sentido para esse projeto?"
- "Me explica funil de vendas / jornada do cliente"
- "Como estruturar uma campanha de conteúdo?"
- "Quais gatilhos mentais posso usar nessa proposta?"
- "Como o copywriting dessa proposta pode ser melhorado?"
- Qualquer pergunta sobre marketing digital, funil, tráfego, conversão, conteúdo estratégico

---

## Base de conhecimento

As notas estão em:
```
cerebro/CEREBRO-ORACULO/04-REFERENCIAS/marketing-digital/
```

| Arquivo | Quando consultar |
|---------|-----------------|
| `01-fundamentos.md` | Explicar conceitos ao cliente, estruturar estratégia base |
| `02-trafego-pago.md` | Projetos que envolvem Meta Ads / Google Ads |
| `03-conteudo-organico.md` | Calendário editorial, SEO, crescimento orgânico |
| `04-copywriting.md` | Qualquer texto persuasivo — proposta, post, e-mail |
| `05-email-marketing.md` | Campanhas de e-mail, automações, nutrição de leads |
| `06-vendas-conversao.md` | Fechar proposta, estruturar funil de vendas para cliente |

**Como acessar:** leia a nota relevante via filesystem MCP antes de responder.

---

## Integração com outras skills

```
PROPOSTA COM COMPONENTE DE MARKETING
→ skills/proposta/SKILL.md + esta skill
→ use copywriting e gatilhos para fortalecer a proposta

CONTEÚDO ESTRATÉGICO DA FIRMA
→ skills/conteudo/SKILL.md + esta skill
→ aplique frameworks de marketing orgânico no calendário editorial

CAPTAÇÃO / QUALIFICAÇÃO
→ skills/captacao/SKILL.md + esta skill
→ use jornada do cliente e perfil de persona para qualificar melhor

PSICOLOGIA E ANCORAGEM
→ skills/antigravity/marketing-psychology/SKILL.md
→ complementa esta skill com vieses cognitivos e ancoragem de preço
```

---

## Status da base

⬜ **Base em construção** — notas populadas conforme apostilas são processadas.

Quando uma nota ainda não existe: use o workflow de extração abaixo para popular.

---

## Workflow para popular a base (CLI NotebookLM)

O Oráculo tem acesso ao CLI `notebooklm` instalado globalmente.
Notebook de marketing: criar com o nome **"Marketing Digital — Apostilas"**.

```bash
# 1. Criar notebook (se não existir)
notebooklm create "Marketing Digital — Apostilas" --json
# → salva o notebook_id retornado

# 2. Adicionar PDFs diretamente (sem browser)
notebooklm source add "./apostila-mkt.pdf" --json
# → aguardar status=ready antes de perguntar

# 3. Extrair conhecimento por tema
notebooklm ask "Quais são os principais frameworks de funil de vendas?" --json
notebooklm ask "Explique as estratégias de tráfego pago apresentadas" --json
notebooklm ask "Quais técnicas de copywriting foram ensinadas?" --json

# 4. Extrair texto completo de uma fonte (para salvar no Obsidian)
notebooklm source fulltext <source_id> -f markdown

# 5. Gerar estudo estruturado
notebooklm generate report --format study-guide --json
```

**Após extrair:** estruturar o conteúdo como nota Markdown e salvar em:
`cerebro/CEREBRO-ORACULO/04-REFERENCIAS/marketing-digital/`
Atualizar `_INDEX.md` com status ✅.

**Pré-requisito:** autenticação ativa. Verificar com `notebooklm status`.
Se expirada: o usuário precisa rodar `notebooklm login` no terminal.
