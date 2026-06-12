# 🔍 Diagnóstico de Conectividade do Cérebro

**Data:** 12 de junho de 2026  
**Health Score:** 28/100 (Crítico)  
**Status:** ⚠️ Estruturalmente bem, conectivamente fragmentado

---

## 📊 Resumo Executivo

Seu vault está **bem organizado fisicamente** (pastas PARA, índices claros) mas **84% dos arquivos estão isolados** (sem wikilinks). Isso significa:

- ✅ Conhecimento está armazenado
- ❌ Conhecimento não está conectado
- ❌ Impossível rastrear dependências
- ❌ Oportunidades de ligação invisíveis

**Boa notícia:** Consertável em ~20 horas com simples **linkização** (não requer reescrita).

---

## 🚨 Problemas Críticos Encontrados

### 1. **Projetos Isolados Entre Si** (CRÍTICO)

**Problema:**
```
04-PROJETOS-ATIVOS/
├─ FIRMA-04-Brasil-Participativo/01-BRIEFING.md    [0 links]
├─ FIRMA-FAC-2026/00-INDEX.md                       [alguns links]
├─ FIRMA-16-Maranha/01-BRIEFING.md                  [0 links]
├─ FIRMA-10-Simbiose/01-BRIEFING.md                 [0 links]
└─ FIRMA-08-RNP-Ailton-Krenak/01-BRIEFING.md        [0 links]
```

Nenhum projeto linkado ao outro. Você tem 5 projetos mas parecem viver em universos paralelos.

**Impacto:** Impossível responder "Que clientes temos em comum entre FAC-2026 e Brasil-Participativo?"

---

### 2. **Clientes e Projetos Nunca Se Veem** (CRÍTICO)

**Problema:**
```
03-CLIENTES/brasil-participativo/brasil-participativo.md
├─ [0 links para projetos]

04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo/01-BRIEFING.md
├─ [0 links para cliente]
```

Relação unidirecional ou inexistente. Você não consegue rastrear "quais projetos este cliente tem".

**Impacto:** Quando um cliente liga, você não consegue buscar facilmente todos seus projetos.

---

### 3. **Templates Flutuam Sozinhos** (ALTO)

**Problema:**
```
01-OPERACAO-ORACULO/TEMPLATES/_INDEX.md [13 links internos]
├─ Template-Projeto-Audiovisual
├─ Template-Roteiro-Literario
├─ ... (9 mais)

04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo/01-BRIEFING.md
├─ [Nunca referencia um template]
```

Templates existem mas ninguém usa. Trabalho re-inventado a cada projeto.

**Impacto:** Inconsistência, retrabalho, perda de conhecimento.

---

### 4. **Wiki Desconectada da Realidade** (ALTO)

**Problema:**
```
wiki/projects/FAC-2026.md [síntese bem feita ✅]
├─ Linkado ao trabalho real ✅

wiki/projects/Brasil-Participativo.md [síntese bem feita]
├─ Criado mas NUNCA linkado de volta ❌

04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo/01-BRIEFING.md
├─ Nunca referencia a síntese wiki ❌
```

Wiki existe mas trabalho real não sabe que existe.

**Impacto:** Síntese e trabalho evoluem separadamente. Inconsistência.

---

### 5. **Índices Órfãos** (ALTO)

**Problema:**
```
04-PROJETOS-ATIVOS/_INDEX.md [0 links de entrada]
├─ Ninguém linkado aqui
├─ HOME.md não referencia
└─ wiki/index.md não referencia

03-CLIENTES/_INDEX.md [0 links de entrada]
├─ Catálogo invisível

01-OPERACAO-ORACULO/_INDEX.md [0 links de entrada]
├─ Hub central que ninguém acessa
```

Índices existem mas não são descobertos.

**Impacto:** Navegação quebrada. Você precisa saber o caminho exato ou se perde.

---

### 6. **Pastas Vazias** (MÉDIO)

**Problema:**
```
00-EMPRESA/ [1 arquivo]
├─ socios/ [vazio]
├─ juridico/ [vazio]
├─ contratos-modelo/ [vazio]
├─ financeiro-empresa/ [vazio]
└─ portfolio/ [vazio]

02-PROCESSOS-E-MANUAIS/ [5 índices]
├─ ADM/ [0 SOPs]
├─ PRE-PRODUCAO/ [0 SOPs]
├─ SET/ [0 SOPs]
├─ POS/ [0 SOPs]
└─ MARKETING/ [0 SOPs]
```

Estrutura criada mas nunca preenchida.

**Impacto:** Processos não documentados. Onboarding difícil.

---

## 🎯 O Que Precisa Ser Linkizado (Priorizado)

### **P1: CRÍTICO — Implementar Esta Semana (4h)**

**Objetivo:** Conectar projetos aos clientes. Impacto: 10x

#### 1.1 Adicionar cliente em cada brief

Arquivo: `04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo/01-BRIEFING.md`

**Antes:**
```markdown
# BRIEFING — Brasil Participativo

## Objetivo
...
```

**Depois:**
```markdown
# BRIEFING — Brasil Participativo

**Cliente:** [[03-CLIENTES/brasil-participativo]]

## Objetivo
...
```

**Repita para:**
- `FIRMA-16-Maranha/01-BRIEFING.md` → `[[03-CLIENTES/maranha]]`
- `FIRMA-10-Simbiose/01-BRIEFING.md` → `[[03-CLIENTES/simbiose]]`
- `FIRMA-08-RNP-Ailton-Krenak/01-BRIEFING.md` → `[[03-CLIENTES/rnp]]`
- `FIRMA-FAC-2026/00-INDEX.md` → `[[03-CLIENTES/...]]` (verificar se existe)

#### 1.2 Adicionar backlink em perfis de cliente

Arquivo: `03-CLIENTES/brasil-participativo/brasil-participativo.md`

**Antes:**
```markdown
# Brasil Participativo

## Perfil
...
```

**Depois:**
```markdown
# Brasil Participativo

## Projetos Ativos
- [[04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo|Projeto Participativo (2026)]]

## Perfil
...
```

**Crie/Atualize:**
- `03-CLIENTES/brasil-participativo.md`
- `03-CLIENTES/maranha.md` (criar se não existe)
- `03-CLIENTES/simbiose.md` (criar se não existe)
- `03-CLIENTES/rnp.md` (criar se não existe)

#### 1.3 Linkar índice de projetos no HOME.md

Arquivo: `HOME.md`

**Encontre:**
```markdown
## Navegação
```

**Adicione:**
```markdown
## Navegação

- **Projetos Ativos:** [[04-PROJETOS-ATIVOS/_INDEX.md|Todos os projetos (5)]]
- **Clientes:** [[03-CLIENTES/_INDEX.md|Base de clientes]]
```

---

### **P2: ALTO — Implementar Semana 1-2 (6h)**

**Objetivo:** Conectar síntese wiki ao trabalho real. Impacto: 8x

#### 2.1 Criar sínteses wiki para projetos sem síntese

**Criar arquivo:** `CEREBRO-ORACULO/wiki/projects/Brasil-Participativo.md`

**Template:**
```markdown
# Brasil Participativo

**Status:** Projeto ativo (2026)  
**Cliente:** [[03-CLIENTES/brasil-participativo]]  
**Documentação:** [[04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo]]

## Resumo
[Copie de 04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo/01-BRIEFING.md — primeiras 200 palavras]

## Fase Atual
[Atual]

## Equipe
[Principais membros]

## Próximos Passos
[Do cronograma]

## Links
- [[03-CLIENTES/brasil-participativo|Cliente]]
- [[01-OPERACAO-ORACULO/Fluxo-13-Etapas|Fluxo do projeto]]
```

**Repita para:**
- `wiki/projects/Maranha.md`
- `wiki/projects/RNP.md`
- `wiki/projects/Simbiose.md`

(Note: FAC-2026 já tem síntese ✅)

#### 2.2 Linkar sínteses do wiki/index.md

Arquivo: `CEREBRO-ORACULO/wiki/index.md`

**Encontre:**
```markdown
### Projetos Ativos

- FAC-2026: Todas as Histórias do Mundo (✅ síntese)
- Brasil Participativo (síntese pendente)
- Visite mon Agence (síntese pendente)
```

**Atualize para:**
```markdown
### Projetos Ativos

- [[projects/FAC-2026|FAC-2026]]: Todas as Histórias do Mundo (✅ síntese)
- [[projects/Brasil-Participativo|Brasil Participativo]] (✅ síntese)
- [[projects/Visite-Mon-Agence|Visite mon Agence]] (síntese pendente)
- [[projects/RNP|RNP-Ailton-Krenak]] (✅ síntese)
- [[projects/Maranha|Maranhã]] (✅ síntese)
- [[projects/Simbiose|Simbiose]] (✅ síntese)
```

#### 2.3 Linkar templates em briefings

Arquivo: `04-PROJETOS-ATIVOS/FIRMA-04-Brasil-Participativo/01-BRIEFING.md`

**Adicione após "Cliente":**
```markdown
**Template:** [[01-OPERACAO-ORACULO/TEMPLATES/Template-Projeto-Audiovisual|Projeto Audiovisual]]
```

---

### **P3: MÉDIO — Implementar Semana 2-3 (8h)**

**Objetivo:** Completar documentação institucional e processos. Impacto: 5x

#### 3.1 Preencher 00-EMPRESA/

**Criar arquivo:** `00-EMPRESA/_INDEX.md`

```markdown
# Empresa — Firma Abacaxi

## Sócios
- [[socios/Filipe-Duque|Filipe Duque]] — Direção, Fotografia
- [[socios/Jaya|Jaya]] — Pós-Produção, Edição

## Documentação Institucional
- [[juridico/Contrato-Social|Contrato Social]]
- [[contratos-modelo/Cessao-Imagem|Cessão de Imagem (modelo)]]
- [[contratos-modelo/Acordo-Prestacao-Servico|Prestação de Serviço (modelo)]]

## Financeiro Empresarial
- [[financeiro-empresa/Tabela-Remuneracao|Tabela de Remuneração]]
- [[financeiro-empresa/Pro-Labore-Filipe|Pró-labore Filipe]]

## Portfólio
- [[portfolio/Clientes-Referencia|Clientes de Referência]]
- [[portfolio/Prêmios-Reconhecimentos|Prêmios e Reconhecimentos]]
```

**Criar arquivos:**
- `00-EMPRESA/socios/Filipe-Duque.md`
- `00-EMPRESA/socios/Jaya.md`
- `00-EMPRESA/juridico/Contrato-Social.md`
- `00-EMPRESA/contratos-modelo/Cessao-Imagem.md`

#### 3.2 Adicionar 1 SOP real por departamento em 02-PROCESSOS-E-MANUAIS/

**Criar arquivo:** `02-PROCESSOS-E-MANUAIS/02.2-PRE-PRODUCAO/SOP-Roteiro-Literario.md`

```markdown
# SOP: Criando um Roteiro Literário

**Referência:** [[01-OPERACAO-ORACULO/TEMPLATES/Template-Roteiro-Literario|Template de Roteiro]]

## Objetivo
Padronizar processo de criação de roteiro literário para todos os projetos audiovisuais.

## Pré-requisitos
- Briefing aprovado [[projeto]]
- Pesquisa de referências visuais feita
- Cronograma confirmado

## Passo a Passo
1. [Passo 1]
2. [Passo 2]
...

## Tempo Estimado
[X horas]

## Saída
- Roteiro em .md ou .docx
- Vistos de aprovação

## Ver Também
- [[../02.1-DIRETRIZES-GERAIS/Fluxo-13-Etapas|Fluxo do Projeto]]
- [[01-OPERACAO-ORACULO/TEMPLATES/Template-Roteiro-Literario|Template]]
```

#### 3.3 Atualizar wiki/index.md com links a recursos

**Adicione seção:**
```markdown
## Recursos & Referências

- [[resources/Editais-Financiamento|Editais e Financiamento]]
- [[resources/Benchmarks-Audiovisual|Benchmarks Audiovisual]]
- [[resources/Ferramentas-Producao|Ferramentas de Produção]]
```

---

## 📋 Checklist de Implementação

### **Semana 1 (P1)**

```
[ ] Adicionar cliente em 5 briefs
  [ ] FIRMA-04-Brasil-Participativo
  [ ] FIRMA-16-Maranha
  [ ] FIRMA-10-Simbiose
  [ ] FIRMA-08-RNP
  [ ] FIRMA-FAC-2026 (verificar)

[ ] Criar/atualizar 4 perfis de cliente
  [ ] brasil-participativo.md
  [ ] maranha.md
  [ ] simbiose.md
  [ ] rnp.md

[ ] Adicionar backlinks em perfis (4 perfis)

[ ] Linkar índice de projetos no HOME.md

[ ] Verificar que 04-PROJETOS-ATIVOS/_INDEX.md tem links aos projetos
```

### **Semana 1-2 (P2)**

```
[ ] Criar 4 sínteses wiki
  [ ] wiki/projects/Brasil-Participativo.md
  [ ] wiki/projects/Maranha.md
  [ ] wiki/projects/RNP.md
  [ ] wiki/projects/Simbiose.md

[ ] Atualizar wiki/index.md com links às sínteses

[ ] Adicionar templates em 5 briefs
  [ ] Cada brief linkando seu template
```

### **Semana 2-3 (P3)**

```
[ ] Criar 00-EMPRESA/_INDEX.md
[ ] Criar 2 sócios (Filipe, Jaya)
[ ] Criar 2 contratos-modelo
[ ] Criar 1 SOP real em ADM
[ ] Criar 1 SOP real em PRÉ-PRODUÇÃO
[ ] Criar 1 SOP real em SET
[ ] Atualizar wiki/resources/ links no index.md
```

---

## 🎯 Impacto Esperado

**Antes (Health Score: 28)**
- 84% arquivos isolados
- Projetos não se falam
- Wiki paralela ao trabalho

**Depois (Health Score: 75+)**
- 60% arquivos conectados
- Projetos linkados a clientes, templates, síntese
- Wiki reflete trabalho real
- Navegação clara
- Documentação institucional completa

---

## ⏱️ Investimento Total

| Prioridade | Esforço | Impacto | ROI |
|-----------|---------|--------|-----|
| P1 (Clientes ↔ Projetos) | 4h | 10x | **Excelente** |
| P2 (Wiki + Templates) | 6h | 8x | **Excelente** |
| P3 (Instituição + SOPs) | 8h | 5x | **Bom** |
| **Total** | **18h** | **23x combinado** | **Excelente ROI** |

Ou ~ **3 dias de trabalho focado** para transformar conectividade de 28 → 75.

---

## 📌 Próximo Passo

**Recomendação:** Comece P1 esta semana. Leva 4 horas e muda tudo. Depois P2 (sínteses wiki).

Quer que eu **execute P1 automaticamente**? Posso criar os arquivos e adicionar os links agora.

