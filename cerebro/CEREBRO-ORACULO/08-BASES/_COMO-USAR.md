# 08-BASES — Como Usar

Este diretório é o **piloto de migração parcial Notion → Cérebro**.

Contém os bancos CRM e TAREFAS em formato markdown, visualizáveis via **Obsidian Bases** (recurso nativo do Obsidian 1.8+).

---

## Estrutura

```
08-BASES/
├── _COMO-USAR.md         → este arquivo
├── CRM/
│   ├── CRM.base          → view kanban + tabela das oportunidades
│   └── CRM-*.md          → um arquivo por oportunidade
└── TAREFAS/
    ├── TAREFAS.base      → view tabela + kanban por status
    └── TAR-*.md          → um arquivo por tarefa
```

---

## Como Visualizar

1. Abrir este vault no Obsidian (versão 1.8 ou superior)
2. Navegar para `08-BASES/CRM/CRM.base` → clicar para abrir a base
3. Alternar entre views: **Tabela** (visão completa) e **Board** (kanban por Etapa/Status)
4. Clicar em qualquer card para abrir o arquivo `.md` e editar os campos

---

## Como Editar um Registro

Cada registro é um arquivo markdown com frontmatter YAML. Para editar:

**Via Bases (recomendado):**
- Abrir `CRM.base` ou `TAREFAS.base`
- Clicar diretamente na célula que quer editar
- O Bases edita o frontmatter automaticamente

**Via arquivo direto:**
- Abrir o arquivo `.md` (ex: `CRM-1-brasil-participativo.md`)
- Editar o frontmatter YAML entre os `---`
- Salvar (Ctrl+S)

---

## Como Adicionar um Novo Registro

1. Criar um novo arquivo `.md` na pasta correspondente (CRM/ ou TAREFAS/)
2. Usar o template do frontmatter abaixo
3. O Bases detecta automaticamente novos arquivos com o frontmatter correto

**Template CRM:**
```yaml
---
crm_id: CRM-X
oportunidade: "Nome do projeto"
status: "Aberto"
cliente: "Nome do cliente"
valor_estimado: 0
probabilidade: 50
proximo_contato: ""
historico: ""
responsavel: ""
notion_url: ""
---
```

**Template TAREFAS:**
```yaml
---
tar_id: TAR-XX
tarefa: "Descrição da tarefa"
status: "A fazer"
prioridade: "Média"
etapa: "Produção"
prazo: ""
projeto: "Nome do projeto"
feito: false
observacoes: ""
estimativa_horas: 0
notion_url: ""
---
```

---

## Plugins Recomendados

Para aproveitar ao máximo o 08-BASES, instale via Obsidian → Settings → Community plugins:

| Plugin | Função | Como instalar |
|---|---|---|
| **Obsidian Bases** | Já nativo (1.8+) | Settings → Core plugins → Bases → ativar |
| **Kanban Bases View** | View kanban nas bases | Community plugins → buscar "Kanban Bases View" |
| **Dataview** | Queries avançadas | Community plugins → buscar "Dataview" (já instalado) |

---

## Sincronização com Notion

Durante o piloto (Jun–Jul 2026), o Notion permanece como fonte de verdade oficial.

**Regra de convivência:**
- Atualizações importantes → fazer nos dois (Notion + 08-BASES)
- Após o piloto: se Bases for aprovado, o Notion CRM e TAREFAS são desativados
- O Oráculo pode sincronizar via MCP quando solicitado: "Oráculo, sincroniza o Bases com o Notion"

---

## Critérios do Piloto (avaliar até 01/07/2026)

- [ ] Mobile: consigo ver e editar no Android em menos de 1 min?
- [ ] Views: o kanban do Bases substitui o kanban do Notion CRM?
- [ ] Confiabilidade: zero conflitos de merge em 2 semanas?
- [ ] Velocidade: editar aqui é mais rápido ou mais lento que no Notion?

Resultado da avaliação em `docs/DECISAO_ARQUITETURA_DADOS.md`.
