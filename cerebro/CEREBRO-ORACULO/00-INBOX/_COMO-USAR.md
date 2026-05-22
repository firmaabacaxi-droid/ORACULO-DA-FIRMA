# Como usar este vault

## Regra de ouro

**Este vault cresce com os projetos.** Não tente preenchê-lo de uma vez. A cada projeto finalizado, o Oráculo propõe 1–3 notas novas. Em 6 meses, você terá um repositório de conhecimento denso e específico da Firma.

---

## Fluxo de uso

```
1. Chega uma tarefa → Oráculo consulta o vault antes de responder
2. Projeto finaliza → Oráculo propõe aprendizados para salvar em 04-APRENDIZADOS/
3. Novo cliente → Oráculo cria perfil em 02-CLIENTES/
4. Lipe/Jaya aprovam → nota é salva na pasta correta
5. Git sincroniza automaticamente → NotebookLM fica mais inteligente
```

---

## Estrutura do vault (Mai 2026)

**00-INBOX/** → Captura rápida. Notas que ainda não têm lugar definido. Oráculo processa periodicamente.

**01-FIRMA/** → Tudo sobre como a Firma funciona.
- `DNA-Firma.md` — identidade, propósito, valores, preços-chave
- `Fluxo-13-Etapas.md` — workflow completo de um projeto
- `Regras-de-Negocio.md` — regras de desconto, pagamento, revisão
- `Subagentes.md` — os 5 subagentes do Oráculo e quando usar
- `Roadmap.md` — fases 1–5 de implementação
- `TEMPLATES/` — modelos prontos: aprendizado, briefing, e-mail, processo

**02-CLIENTES/** → Perfis de clientes: briefing, histórico, DISC, projetos.
- `brasil-participativo/` — documentário LabLivre/UnB
- `Historico-Clientes-Chave.md` — 120+ orçamentos históricos catalogados

**03-CONHECIMENTO/** → Técnicas cinematográficas, preços e marketing.
- `tecnicas/` — técnicas assinatura da Firma + tabela de preços de referência
- `marketing-digital/` — 6 módulos extraídos via NotebookLM (funil, tráfego, copywriting, vendas...)

**04-APRENDIZADOS/** → O mais valioso: o que funcionou, o que falhou, e por quê.
- Logs por data de cada projeto real

---

## As 3 integrações do vault

### Oráculo (Claude Code)
- **Lê** o vault antes de responder para qualquer tarefa
- **Escreve** novas notas com autorização de Lipe/Jaya
- **Consulta** via MCP filesystem — acesso direto aos arquivos locais

### NotebookLM
- **Indexa** o vault via GitHub sync automático
- **Gera** áudios, resumos, mind maps, quizzes a partir das notas
- **Consultar:** use `/notebooklm` no Claude Code ou acesse via MCP
- **O que ele sabe:** tudo que está no vault (sync via git)
- **Caso de uso:** gerar audio overview de um briefing para Lipe ouvir dirigindo

### Notion
- **Diferença do vault:**
  - Notion = **operação** (quem faz, quando, quanto, status de projeto)
  - Vault = **conhecimento** (como fazer, o que aprendemos, quem somos)
- Os dois se complementam — não duplicar informação
- Oráculo lê Notion para tarefas, lê vault para contexto e conhecimento

---

## Como alimentar o vault

**Ao finalizar um projeto:**
> "Oráculo, vamos registrar o aprendizado deste projeto."
→ Oráculo faz perguntas estruturadas → salva em `04-APRENDIZADOS/`

**Ao fechar um cliente novo:**
> O Oráculo cria automaticamente o perfil em `02-CLIENTES/`

**Ao descobrir uma técnica nova:**
> "Oráculo, registra esta técnica no cérebro."
→ Oráculo usa o `Template-Referencia-Tecnica` e salva em `03-CONHECIMENTO/tecnicas/`

**Captura rápida:**
> Jogue a nota em `00-INBOX/` — Oráculo classifica depois

---

## Plugins instalados

| Plugin | Função |
|---|---|
| **Obsidian Git** | Sync automático com GitHub a cada 30 min |
| **Dataview** | Queries nas notas: "todos os aprendizados de 2026" |
| **Templater** | Criar notas a partir dos templates da pasta TEMPLATES/ |
