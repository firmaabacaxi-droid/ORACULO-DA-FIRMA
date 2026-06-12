---
type: directive
title: "Regras de Integração — Notion / Cérebro / Google Drive"
status: "Ativo"
created: 2026-06-12
updated: 2026-06-12
---

# Regras de Integração — Notion / Cérebro / Google Drive

**Lei clara sobre o que pertence a cada sistema.**

---

## Os Três Sistemas e Suas Responsabilidades

| Sistema | Pergunta que responde | Bom em | Ruim em |
|---------|----------------------|--------|---------|
| **Notion** | "O que está acontecendo agora?" | Estruturado, status, datas, valores, CRM, relações | Texto longo, raciocínio em desenvolvimento |
| **Vault (Cérebro)** | "O que aprendemos sobre isso?" | Síntese narrativa, contexto, roteiros, SOPs, história | Banco de dados, múltiplos editores, status real-time |
| **Drive** | "Onde está o arquivo?" | Binários, compartilhável com externos, versão final | Estrutura navegável, contexto |

---

## Regra 1: Quando Criar Pasta no Vault

### Criar pasta em `04-PROJETOS-ATIVOS/` SE:

- **Critério A (Narrativa):** Projeto exige roteiro, decupagem, pesquisa conceitual, ou o Oráculo precisa entender contexto narrativo para trabalhar bem, OU
- **Critério B (Estratégia):** Cliente tem potencial de recorrência, ou aprendizado do projeto é transferível para futuros projetos

### NÃO criar pasta no vault SE:

- Projeto simples de edição/execução abaixo de R$5.000 SEM os critérios acima
- Projeto ainda em prospecção sem contato real (entra quando virar proposta)

### Exemplos de decisão

| Projeto | Valor | Critério | Decisão |
|---------|-------|----------|---------|
| FAC-2026 | R$199k | A + B (complexidade narrativa + aprendizado futuro para editais) | ✅ Cria pasta |
| Brasil Participativo | R$66k | A + B (documentário narrativo + governo federal é cliente estratégico) | ✅ Cria pasta |
| Simbiose | R$800 | Nenhum (vídeo simples, cliente única oportunidade) | ❌ Só Notion |
| Maranhã | R$10k | A (entrevistas narrativas, roteiro, pós complexo) | ✅ Cria pasta |
| RNP Ailton Krenak | TBD | A (documentário narrativo, contexto histórico relevante) | ✅ Cria pasta |
| SOBRE2026 | R$58k | A + B (documentário ecológico + aprendizado futuro de projetos UnB) | ✅ Cria pasta |

---

## Regra 2: Quando Criar Pasta no Drive

**Só criar pasta quando a etapa começar. Nunca antecipar.**

- Pré-produção iniciada → cria `PROJETOS/2026/PROJETO-NOME/`
- Gravação → cria subpasta `01_GRAVACAO/` com cartões, logs
- Pós-produção → cria `02_PODUCAO/`
- Entrega → cria `03_ENTREGA/`

Isto evita:
- Pastas vazias que viram dívida técnica
- Sincronização de armazenamento desnecessária
- Confusão de "qual pasta é a verdadeira"

---

## Regra 3: Links Obrigatórios Entre Sistemas

Para que os três sistemas não virem silos desconectados, existe um conjunto mínimo de pontas que **devem** estar conectadas.

### Tabela de links obrigatórios

| De | Para | Campo | Localização | Obrigatório? |
|---|---|---|---|---|
| **Vault briefing** | Notion | `notion_url:` | Topo do arquivo (após frontmatter) | Sim, sempre |
| **Vault briefing** | Drive | `drive_url:` | Topo do arquivo | Quando a pasta existir |
| **Notion página** | Vault | `Vault Path` (campo de texto) | Em algum campo da página | Sim, sempre |
| **Drive** | Vault | — | Não necessário | — |

### Formato dos campos

**No vault (em qualquer briefing):**
```markdown
---
type: project
title: "Projeto X"
notion_url: https://app.notion.com/p/[UUID-específica-da-página]
drive_url: https://drive.google.com/open?id=[ID-da-pasta]
---
```

**No Notion (em cada página de projeto):**
- Campo de texto chamado "Vault Path"
- Conteúdo: `cerebro/04-PROJETOS-ATIVOS/FIRMA-XX/` (sem URL, só o caminho relativo)

---

## Regra 4: Separação de Conteúdo

### Notion é a fonte de verdade para:
- Status de projeto (qual fase agora)
- Datas e prazos
- Valores monetários e faturamento
- Tarefas e responsabilidades
- Histórico de contato com cliente (CRM)

**Quando você precisa saber "em que dia vence a proposta?" ou "quanto ganhamos com esse cliente?", você abre Notion, não o vault.**

### Vault é a fonte de verdade para:
- Contexto narrativo do cliente (história, briefing conceitual)
- Síntese de aprendizados (o que funcionou, o que não funcionou)
- Roteiros, decupagens, análises criativas
- SOPs operacionais (como a firma faz X)
- Histórico de decisões do projeto (por que escolhemos isso?)

**Quando o Oráculo precisa entender "qual é o tom do documentário?" ou "qual foi nossa estratégia narrativa?", abre vault.**

### Drive é a fonte de verdade para:
- Arquivos finais que saem da firma (proposta em PDF, contrato assinado, vídeo masterizado)
- Binários que precisam ser compartilhados com cliente ou equipe (fotos de locação, planilhas de orçamento)

**Quando o cliente pede "me manda o PDF da proposta", você linka para Drive, não copia em markdown no vault.**

---

## Regra 5: O que NÃO fazer

### ❌ Não espelhe a estrutura do Notion no vault

O vault não é um banco de dados paralelo. Se você começar a criar campos estruturados em markdown tentando replicar o que o Notion já faz bem, você cria duplicação sem valor.

**Exemplo errado:**
```markdown
# Projeto X
- Status: Em edição
- Prazo: 15 jun
- Responsável: Jaya
- Valor: R$ 10.000
```

Isso já está no Notion. No vault, você coloca contexto narrativo, não repetição.

### ❌ Não sincronize os três sistemas automaticamente

A tentação é criar um script que mantém Notion ↔ vault ↔ Drive sincronizados. Para uma equipe de 2-3 pessoas, isso é complexidade desnecessária. Sincronização automática cria mais pontos de falha do que resolve.

Mantém-se manual: quando cria projeto no Notion, adiciona link no vault. Quando adiciona pasta no Drive, atualiza o campo no vault.

### ❌ Não antecipe pastas no Drive

Não crie `PROJETOS/2026/PROJETO-NOVO/` antes da etapa começar. Isso é desperdício de espaço, sincronização desnecessária, confusão de "qual é a pasta real".

### ❌ Não crie SOPs para projetos individuais

SOPs são para processos repetíveis. Um SOP "Como fazer documentário para governo federal" é válido. Um SOP "Como gerenciar FAC-2026" é overhead.

### ❌ Não popule 00-EMPRESA antecipadamente

Você tem 4 subpastas vazias em 00-EMPRESA (jurídico, contratos, financeiro, portfólio). A tentação é resolver isso tudo de uma vez. Não faça.

Regra: popule quando precisar. Jurídico entra quando assinar próximo contrato. Portfólio entra quando precisar vender. Não antecipe.

---

## Auditoria Periódica

A cada sessão com o Oráculo, confirmar:

```bash
# Todos os projetos têm notion_url?
grep -r "notion_url:" 04-PROJETOS-ATIVOS/ | wc -l

# Todos os projetos têm drive_url (quando aplicável)?
grep -r "drive_url:" 04-PROJETOS-ATIVOS/ | wc -l

# Wiki/index.md tem 🟡 para projetos que já existem no vault?
grep "🟡" wiki/index.md | wc -l
# Deve retornar apenas para projetos que REALMENTE não têm pasta (ex: SOBRE2026 antes de ser incorporado)

# Há pastas no vault sem correspondente no Notion?
# Manual: comparar ls 04-PROJETOS-ATIVOS com PROJETO_2026 no Notion
```

---

## Histórico de Aplicação

| Data | Mudança | Responsável |
|------|---------|-------------|
| 12 jun 2026 | Versão 1.0 — regras documentadas | Oráculo (sessão 24) |
| — | — | — |

---

**Referência:** Esta regra substitui decisões ad-hoc anteriores. Todos os novos projetos usam este critério. Projetos existentes são grandfathered (podem não cumprir todas as regras — não é necessário refatorar retroativamente).
