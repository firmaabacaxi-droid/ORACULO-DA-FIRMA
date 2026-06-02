# Kit Completo de Documentos de Produção Audiovisual
*25/05/2026 · Incorporação de 9 templates profissionais ao sistema*

---

## O que aconteceu

Recebemos e incorporamos um kit completo de 9 templates profissionais de documentos audiovisuais em Markdown. O kit cobre toda a cadeia: do desenvolvimento do projeto até o set. Os templates foram adaptados e integrados à base de conhecimento, às skills e aos documentos de contexto do sistema.

---

## Hierarquia dos 9 documentos (como se encaixam no fluxo)

```
PRÉ-PRODUÇÃO
  01. Projeto Audiovisual     → logline, sinopse, argumento, escaleta
        ↓
  02. Roteiro Literário        → Master Scene (narrativa, documentários)
  03. Roteiro Técnico          → tabela por plano (comercial, redes)
        ↓
  04. Análise Técnica          → breakdown por departamento, cena a cena
        ↓
  05. Plano de Rodagem         → agenda logística, DOOD, one-liner
      Autorizações/Contratos   → cessão de imagem, imóvel, licenças

PRODUÇÃO (set)
  06. Ordem do Dia             → call sheet completo, por diária
  07. Ficha de Continuidade    → raccord visual por take
  08. Boletim de Câmera/Som   → metadados técnicos por take
      Log de Filmagem          → takes OK/NG (já existia)

PÓS-PRODUÇÃO
      10 fases                 → já existia
```

---

## Decisões sobre o que incorporar

### O que foi incorporado (tudo)

| Documento | Destino |
|---|---|
| Projeto Audiovisual | Template-Projeto-Audiovisual.md |
| Roteiro Literário | Template-Roteiro-Literario.md (enriquecido) |
| Roteiro Técnico / Decupagem | Template-Roteiro-Tecnico.md (enriquecido) |
| Análise Técnica | Template-Analise-Tecnica.md |
| Plano de Rodagem | Template-Plano-Rodagem.md |
| Ordem do Dia | Template-Ordem-do-Dia.md (substituído pela versão completa) |
| Ficha de Continuidade | Template-Ficha-Continuidade.md |
| Boletim de Câmera e Som | Template-Boletim-Camera-Som.md |
| Autorizações e Contratos | Template-Autorizacoes-Contratos.md |

### Storyboard — mantido para uso futuro

O kit incluía um frame ASCII de storyboard no template de Roteiro Técnico. Mesmo sendo visual, mantivemos o espaço reservado no template (não gera conteúdo ainda). Quando estivermos prontos para trabalhar com storyboards, a estrutura já existe.

---

## Insights críticos

### 1. A hierarquia importa

O Projeto Audiovisual vem **antes** do roteiro — é o documento de desenvolvimento que justifica o projeto existir. Sem logline e sinopse aprovados, o roteiro fica sem âncora narrativa.

### 2. Análise Técnica vs. Decupagem

- **Decupagem** → o que a câmera vai fazer (direção)
- **Análise Técnica** → o que cada departamento precisa para executar (produção)

São documentos diferentes com públicos diferentes: a decupagem é para o Diretor e o DOP; a análise técnica é para todos os chefes de departamento.

### 3. Ficha de Continuidade vs. Log de Filmagem

- **Log** → rastreia takes para o **editor** (qual take usar)
- **Ficha** → rastreia raccord visual para o **continuísta** (garantir que o figurino está igual entre planos de cenas montadas juntas)

Ambos são necessários em filmagens com múltiplos planos da mesma cena.

### 4. DOOD — ferramenta de orçamento disfarçada

O Day Out of Days (DOOD) do Plano de Rodagem é uma ferramenta de planejamento de elenco que é, na prática, uma calculadora de cachê. Quantos dias cada ator está no set = custo total do elenco. Usar desde o início do planejamento evita surpresas no orçamento.

### 5. Cessão de imagem — obrigação legal, não formalidade

Qualquer pessoa identificável em cena exige cessão assinada. Para menores, é obrigatório o responsável legal assinar. A ausência desse documento pode inviabilizar a distribuição do material.

---

## O que mudou (arquivos modificados)

| Ação | Arquivo |
|------|---------|
| Criado | `cerebro/.../TEMPLATES/Template-Projeto-Audiovisual.md` |
| Criado | `cerebro/.../TEMPLATES/Template-Analise-Tecnica.md` |
| Criado | `cerebro/.../TEMPLATES/Template-Plano-Rodagem.md` |
| Criado | `cerebro/.../TEMPLATES/Template-Ficha-Continuidade.md` |
| Criado | `cerebro/.../TEMPLATES/Template-Boletim-Camera-Som.md` |
| Criado | `cerebro/.../TEMPLATES/Template-Autorizacoes-Contratos.md` |
| Enriquecido | `Template-Roteiro-Literario.md` — lista de personagens, locações, histórico, notas Master Scene |
| Enriquecido | `Template-Roteiro-Tecnico.md` — frame storyboard, resumo geral, equipamentos especiais |
| Substituído | `Template-Ordem-do-Dia.md` — versão completa com meteorologia, call times, refeições, transporte, emergências |
| Atualizado | `cerebro/.../TEMPLATES/_INDEX.md` — reorganizado em 3 categorias |
| Atualizado | `skills/preproducao/SKILL.md` — triggers, checklist, ETAPA 3 expandida, ETAPAs 4B e 4C novas |
| Atualizado | `skills/producao/SKILL.md` — Ficha de Continuidade e Boletim adicionados |
| Atualizado | `docs/FLUXO_TRABALHO.md` — Etapas 6 e 7 expandidas |
| Atualizado | `docs/ARQUITETURA_NOTION.md` — notas em ANT, CON, FLM |

---

## Tags

#aprendizado #processo #preproducao #producao #templates #kit #sessao8 #documentacao
