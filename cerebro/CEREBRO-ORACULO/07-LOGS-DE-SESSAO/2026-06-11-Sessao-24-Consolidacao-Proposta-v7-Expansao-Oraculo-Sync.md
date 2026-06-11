---
data: 2026-06-11
tipo: log-sessao
sessao: 24
assunto: Consolidação da Proposta v7 (Brasil Participativo) e Generalização do Oráculo Sync para todos os projetos
status: concluido
---

# Sessão 24 — Consolidação BP v7 e Generalização Oráculo Sync

## Contexto
Dando continuidade aos ajustes finos solicitados para o projeto "Brasil Participativo — LabLivre/UnB", atualizamos os valores finais da proposta no Notion, Cérebro e Google Drive para a versão 7 (com o orçamento de vídeos ENAP corrigido para R$ 1.500,00 unitário e total de R$ 16.092,00). 
Para evitar retrabalho manual futuro, aproveitamos a oportunidade para refatorar e expandir a rotina de sincronização (`scripts/sync_proposal.py`) para suportar de forma totalmente genérica e dinâmica qualquer projeto da Firma.

## O que foi feito

### 1. Atualizações e Ajustes da Proposta v7 (Brasil Participativo)
- **Matemática do Orçamento:** Atualizamos os itens de custo na base Notion e no Cérebro para refletir o total final de R$ 66.117,00 (Subtotal R$ 61.630,00 + NF R$ 4.487,00).
- **Correção de Parcelas:** Corrigimos o faturamento do documentário para 2 parcelas de R$ 25.012,50 (50% de R$ 50.025,00) no Word e no Cérebro.
- **Copy do Drive:** Upload do arquivo final `BrasilParticipativo_proposta_v7.docx` para a pasta correspondente no Google Drive local.

### 2. Generalização e Expansão do Oráculo Sync (`scripts/sync_proposal.py`)
Decouplamos o script orquestrador de sincronização de valores hardcoded, adicionando inteligência de descoberta e flexibilidade:
- **Resolução de IDs via Notion:** O script resolve os IDs do Notion (`project_id`, `proposal_id`) e o nome limpo do projeto dinamicamente a partir de parâmetros descritivos como `--project-name` ou `--proposal-id`.
- **Descoberta Dinâmica de Arquivos Cérebro:** O script busca por correspondência de tokens do nome do projeto para localizar briefings em `04-PROJETOS-ATIVOS` e wikis em `wiki/projects/`.
- **Descoberta do Google Drive:** O script descobre o diretório do Google Drive no filesystem local (`C:\Users\User\Meu Drive\...`) baseado no nome do projeto se o caminho não for passado.
- **Dicionário Genérico de Itens (`--items-json`):** Permite sincronizar qualquer item de orçamento, buscando-o no Notion e substituindo valores em tabelas markdown do Cérebro através de expressões regulares, preservando a formatação (ex: negrito `**`).
- **Organização de Roteiros (`--mode script`):** Copia roteiros dinamicamente para subdiretórios apropriados (`02_ROTEIRO`, `02_BRIEFINGS`) na pasta mestre do projeto.

### 3. Documentação das Habilidades
- **Atualização da Skill:** Documentamos os três modos de operação (`proposal`, `project` e `script`) no final de `skills/proposta/SKILL.md` com suas sintaxes de uso e exemplos práticos para o terminal.

## Aprendizados e Decisões Técnicas
- **Escapes de Argparse:** Ao passar expressões e help strings em Python argparse, o caractere `%` é interpretado como formatação e deve ser escapado como `%%` (especialmente relevante para help strings e argumentos de console).
- **Matching por Proximidade:** Fazer split e limpeza de hyphens (`-` e `_`) em nomes de projetos ao consultar Notion API e pastas locais aumenta a tolerância a variações simples de nomenclatura (ex: `"Brasil-Participativo"` vs `"Brasil Participativo"`).

## Próximos passos
- Utilizar o script unificado em novos projetos sempre que houver sincronização de propostas, roteiros ou status.
