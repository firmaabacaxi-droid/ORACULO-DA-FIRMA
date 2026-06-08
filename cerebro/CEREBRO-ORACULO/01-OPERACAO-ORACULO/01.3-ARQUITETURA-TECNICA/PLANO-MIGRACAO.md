# Plano de Migração — Reorganização do Oráculo
## Checklist executável, etapa a etapa
*Firma Abacaxi · 07/06/2026 · companheiro de [[ARQUITETURA-SISTEMA]]*

> **Como usar este documento.** Cada bloco abaixo é **independente** e pode ser executado
> numa sessão separada. Nenhum bloco foi executado ainda. Quando quiser rodar um bloco, me
> diga "executa o Bloco N" — eu sigo os passos, peço sua confirmação antes de **apagar**
> qualquer coisa, e marco `[x]` ao concluir.
>
> **Regra de ouro:** o Bloco 1 (backup) vem **sempre primeiro**. Sem backup, nada se apaga.

**Legenda:** 🟢 seguro / reversível · 🟡 requer conferência · 🔴 destrutivo (pede confirmação)

---

## Bloco 1 — Backup e segurança 🔴 (FAZER PRIMEIRO) — ✅ EXECUTADO 07/jun/2026

- [x] **1.1** Commit snapshot do ORACULO feito (commit `ac1debe`). **ANTIGRAVITY não é repositório git** → não há commit/histórico, logo nada a rotacionar.
- [x] **1.4** Criado `.gitignore` no ANTIGRAVITY bloqueando `*.env`, `*service_account*.json`, `.next/`, `node_modules/`, `__pycache__/`.
- [~] **1.2 / 1.3 — ADIADO para o Bloco 6.** Descoberta: **58 scripts `.py`** têm o caminho de `google_service_account.json` fixo no código, e o `.env` é carregado por caminho relativo. Mover os arquivos agora quebraria os 58 scripts. Como o ANTIGRAVITY não é repo git, o `.gitignore` já remove o risco de vazamento. O *move* para `.secrets\` + ajuste dos scripts será feito junto da reorganização dos scripts (Bloco 6), para não quebrar o pipeline.
- [—] **1.5 Não se aplica:** credenciais nunca foram commitadas (ANTIGRAVITY sem git).

---

## Bloco 2 — Eliminar duplicatas 🔴 — ✅ EXECUTADO 08/jun/2026

- [x] **2.1** App espelhado **APAGADO** em definitivo (`PROJETO ORACULO APP ANTIGRAVITY/`). Confirmado redundante: sem git próprio, fonte real em `ANTIGRAVITY/oraculo-app/`.
- [x] **2.2 / 2.3** As cópias `(1).md` **não eram idênticas** (versões antigas, divergem dos atuais) e as skills copiadas → tudo **ARQUIVADO** (decisão do usuário: arquivar, não apagar). Foram para `archive/2026-06/DOCUMENTOS-ANTIGOS/` junto da pasta inteira de legado.
- [—] **2.4 NÃO executado — pasta mantida.** `ORACULO-DA-FIRMA/` **não está vazia**: é um **clone git** do GitHub (o próprio `.gitignore` a trata como clone local). Preservada.

---

## Bloco 3 — Consolidar projetos no cérebro 🟡

Objetivo: cada projeto vira **uma pasta única** em `04-PROJETOS-ATIVOS/`, com a subestrutura
padrão. Começar pelo FAC 2026 (projeto-foco atual).

- [—] **3.1 Adiado.** Pasta FAC **mantida como `FIRMA-FAC-2026`** (nome reconhecível, projeto ativo). Renomear para `FIRMA-19-...` fica opcional para depois, para não desorientar no meio do trabalho do edital.
- [x] **3.3** Anexos oficiais do edital **MOVIDOS** para dentro do projeto:
  `...\FIRMA-FAC-2026\EDITAL-ANEXOS-OFICIAIS\` (planilhas, cronogramas, declarações, editais SEI). A pasta-raiz `PROJETOS - EDITAIS\` foi **removida** (esvaziada).
- [~] **3.2 / 3.4 Parcial / adiado.** Criada a subpasta `EDITAL-ANEXOS-OFICIAIS/`. A reorganização completa dos ~25 `.md` da FAC em `01-BRIEFING`..`05-ENTREGAS` foi **adiada** — é invasiva num projeto ativo; fazer numa sessão dedicada quando o edital estiver entregue.
- [x] **3.5** `_INDEX.md` **corrigido** (os links antigos estavam quebrados) e atualizado com a nova convenção.
- [x] **3.6** Pastas dos demais ativos **renomeadas** (sem `#`): `FIRMA-04-Brasil-Participativo`, `FIRMA-08-RNP-Ailton-Krenak`, `FIRMA-10-Simbiose`, `FIRMA-16-Maranha`.

---

## Bloco 4 — Pasta institucional `00-EMPRESA` 🟢 — ✅ EXECUTADO 08/jun/2026

- [x] **4.1** Criada `cerebro\CEREBRO-ORACULO\00-EMPRESA\` com `socios/`, `juridico/`, `contratos-modelo/`, `financeiro-empresa/`, `portfolio/`.
- [x] **4.2** Currículo **movido**: `CV-Filipe-Duque-2026.docx` → `00-EMPRESA\socios\`.
- [ ] **4.3** Reunir aqui outros institucionais conforme aparecerem (CNPJ, contrato social, declarações, dados bancários/PIX, apresentação comercial). 🟡 *contínuo.*

---

## Bloco 5 — Arquivar legado com valor histórico 🟡 — ✅ EXECUTADO 08/jun/2026

- [x] **5.1** Criados `cerebro\...\05-ARQUIVO-HISTORICO\` e `archive\2026-06\`.
- [x] **5.2** Projetos FAC antigos **movidos** (via robocopy) → `05-ARQUIVO-HISTORICO\editais-fac-anteriores\` (5 projetos, 17 itens).
- [x] **5.3 / 5.4** Orçamentos antigos + Notion antigo + documentação antiga **arquivados** dentro de `archive\2026-06\DOCUMENTOS-ANTIGOS\` (a pasta de legado inteira foi movida de uma vez, em vez de fatiada — mais simples e igualmente reversível).
- [x] **5.5** `PROJETOS - EDITAIS\` **removida** (esvaziada). `DOCUMENTOS ANTIGOS\` **arquivada** (não apagada — exclusão definitiva pendente de revisão).
- [x] **5.6** Criado `archive\2026-06\README.md`.

---

## Bloco 6 — ANTIGRAVITY (técnico, futuro/opcional) 🟡

Pode ficar para uma sessão dedicada — não bloqueia o resto.

- [ ] **6.1** Criar `ANTIGRAVITY\scripts\` com `notion/`, `sheets/`, `supabase/`, `_lib/`.
- [ ] **6.2** Mover os 57 `.py` da raiz para a subpasta certa por destino. 🟡
  *(agrupar por prefixo: `sync_*`, `migrate_*`, `fetch_*/get_*/read_*`, `fix_*/repair_*`, `step_*`.)*
- [ ] **6.3** Criar `scripts\pipeline.py` (ou `scripts\README.md`) documentando a **ordem de execução**.
- [ ] **6.4** Criar `ANTIGRAVITY\README.md` (onboarding técnico) e um `CLAUDE.md` curto.
- [ ] **6.5** Remover `.next/` do versionamento e confirmar `node_modules/` no `.gitignore`. 🟢

---

## Bloco 7 — Documentação que falta criar 🟢

(Detalhe e prioridades na §9 de [[ARQUITETURA-SISTEMA]].)

- [x] **7.1** ✅ `docs\MAPA-MESTRE.md` criado (onde mora cada coisa).
- [ ] **7.2** `ANTIGRAVITY\README.md` (coberto no Bloco 6).
- [ ] **7.3** Política de credenciais e backup.
- [ ] **7.4** Contratos-modelo + bios dos sócios em `00-EMPRESA\`.
- [ ] **7.5** `03-CLIENTES\_TEMPLATE.md` (dossiê padrão de cliente).

---

## Bloco 8 — Comparar com o NotebookLM ⏳

- [ ] **8.1** Rodar `notebooklm login` no terminal (login via navegador).
- [ ] **8.2** Me avisar — eu leio o arquivo de arquitetura sugerida, comparo com
  [[ARQUITETURA-SISTEMA]] e registro as diferenças na §10 daquele documento.

---

## Sequência recomendada

```
1 (backup+segurança) → 2 (duplicatas) → 3 (projetos) → 4 (institucional)
→ 5 (arquivar legado) → 7 (docs faltantes) → 6 (ANTIGRAVITY) → 8 (NotebookLM)
```

*Cada bloco isolado: dá para parar entre um e outro sem deixar o sistema quebrado.*

---
*Plano gerado pelo Oráculo · Firma Abacaxi · 07/06/2026.*
