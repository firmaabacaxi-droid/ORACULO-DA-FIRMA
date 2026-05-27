# MEMORIA.md
## Aprendizados acumulados do Oráculo
*Atualizado por Lipe e Jaya conforme os projetos acontecem*

---

## Como usar este arquivo

Este é o arquivo que torna o Oráculo mais inteligente ao longo do tempo.

**Quem alimenta:** Lipe e Jaya (manualmente, ao final de cada projeto ou situação relevante)
**Quando alimentar:** Ao fechar uma proposta, encerrar um projeto, ou perceber um padrão novo
**Como:** Adicione uma linha na categoria correspondente, com data

O Oráculo lê este arquivo em todas as sessões.

---

## Clientes — preferências e padrões

```
2026-05 | Brasil Participativo (LabLivre/UnB) | Cliente institucional universitário.
         Decisor: Ricardo Poppi. Tom técnico e formal, alinhado com linguagem acadêmica.
         Aprovação depende de instância externa (Finatec) — prazo é naturalmente longo.
         Valoriza alinhamento político e responsabilidade social.

2026-05 | SuperHost | Mencionado como cliente estratégico (proposta gerada em Sessão 4).
         Detalhar perfil DISC e padrões após próxima interação.
```

---

## Precificação — o que funcionou

```
2026-05 | Brasil Participativo — Documentário LabLivre/UnB
         Proposta passou por 4 versões (v1 a v4 + versão revisada por Lipe).
         Aprendizado: separar claramente o que muda entre versões evita retrabalho.
         Usar controle de versão explícito no nome do arquivo (v1, v2...) é essencial.

2026-05 | NF sempre inclusa no total apresentado ao cliente.
         Calcular de trás pra frente quando houver teto de budget:
         Base = Total ÷ 1,0728 | NF = Total − Base
         Nunca apresentar valor sem NF para clientes institucionais.

2026-05 | Margem mínima: 35% (novos clientes) · 20% (recorrentes/parceiros). Verificar sempre antes de fechar.
         Desconto máximo sem aprovação: 15–20%. Projetos sociais/culturais: até 30–50%.
```

---

## Negociação — objeções e respostas

```
[aguardando primeiro registro de negociação em campo]

Referência: skills/antigravity/negotiation-voss/SKILL.md (método Voss)
```

---

## Produção — aprendizados de set

```
[aguardando primeiro projeto filmado com registro no Oráculo]
```

---

## Operacional — o que otimizar

```
2026-05 | Quando uma proposta tem muitas alterações, é mais eficiente regenerar
         o documento do zero do que editar o Word manualmente.
         Regenerar via MODELO_ORCAMENTO.docx mantém formatação e evita erros.

2026-05 | Clientes institucionais (fundações, governo, universidades) têm ciclo
         de aprovação mais longo (média 7–30 dias). Calibrar follow-up para
         não pressionar e não sumir.

2026-05 | Documentação e manuais: o melhor formato para uso interno é HTML navegável
         (single-page com índice lateral) + versão Markdown como par.
         HTML: abre offline em qualquer navegador, sem instalar nada. Ideal para
         apresentar e consultar. Markdown: vai para o NotebookLM e Obsidian.
         NotebookLM NÃO aceita HTML como fonte — usar .md ou .pdf.

2026-05 | NotebookLM — login via CLI: quando a sessão expira, o comando
         `notebooklm login` abre browser mas fica aguardando ENTER interativo.
         Solução: usar `echo "" | notebooklm login` para fechar automaticamente
         depois que o usuário logou no browser.

2026-05 | Localização dos documentos gerados — triângulo: output/ + NotebookLM + Obsidian.
         Todo artefato importante deve ir para os três:
         1. output/ (arquivo local, versionado)
         2. NotebookLM (para consulta conversacional)
         3. cerebro/CEREBRO-ORACULO/01-FIRMA/ (para navegação no Obsidian)
```

---

## Padrões de projeto por tipo de cliente

```
Projetos culturais / sociais (ex: Brasil Participativo, LabLivre)
→ Orçamento depende de edital ou aprovação de fundação (Finatec, etc.)
→ Prazo de aprovação: semanas a meses
→ Mais liberdade criativa, alinhamento político importante
→ NF obrigatória; linguagem técnica e acadêmica na proposta

Empresas / eventos (ex: SuperHost, Cerrado Experience)
→ Aprovação mais rápida
→ Tom mais comercial, foco em resultado e visibilidade
→ Maior sensibilidade a prazo de entrega
```

---

*Última atualização: Mai 2026 — Sessão 6*
*Total de aprendizados: 13 registros*
