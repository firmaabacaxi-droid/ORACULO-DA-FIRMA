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

## Bloco 1 — Backup e segurança 🔴 (FAZER PRIMEIRO)

- [ ] **1.1** Commit de tudo no Git, nos dois repositórios, antes de mexer em qualquer arquivo
  (snapshot de segurança). Se algum não for repo Git ainda, fazer `git init` + commit inicial.
- [ ] **1.2** Criar `C:\Users\User\.secrets\` e **mover** para lá:
  - `C:\Users\User\Documents\ANTIGRAVITY\google_service_account.json`
  - `C:\Users\User\Documents\ANTIGRAVITY\.env`
- [ ] **1.3** Ajustar os scripts que leem essas credenciais para apontar para `.secrets\`
  (via variável de ambiente). 🟡 *requer testar um script depois.*
- [ ] **1.4** Revisar/criar `.gitignore` no ANTIGRAVITY bloqueando:
  `*.env`, `*service_account*.json`, `.next/`, `node_modules/`.
- [ ] **1.5** 🔴 **Se as credenciais já foram commitadas** em algum repositório/histórico:
  rotacionar (gerar novas chaves no Google Cloud) — o segredo antigo deve ser considerado comprometido.

---

## Bloco 2 — Eliminar duplicatas (limpeza assertiva) 🔴

Itens que são cópias confirmadas — a fonte verdadeira existe em outro lugar.

- [ ] **2.1** 🔴 Apagar o app espelhado:
  `C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\PROJETO ORACULO APP ANTIGRAVITY\`
  → fonte real: `C:\Users\User\Documents\ANTIGRAVITY\oraculo-app\`
- [ ] **2.2** 🔴 Apagar as skills copiadas:
  `...\ORACULO - FIRMA ABACAXI\DOCUMENTOS ANTIGOS - AVALIAR E MIGRAR\skills DO ANTIGRAVITY\`
  → fonte real: `C:\Users\User\Documents\ANTIGRAVITY\SKILLS\`
  *(antes: confirmar que toda skill ali também existe na fonte; as que não existirem, mover para a fonte em vez de apagar.)* 🟡
- [ ] **2.3** 🔴 Apagar as cópias `(1).md` de docs já versionados em `docs/`:
  `...\DOCUMENTOS ANTIGOS - AVALIAR E MIGRAR\ARQUITETURA_NOTION (1).md`,
  `CLAUDE (1).md`, `CONTEXTO_FIRMA (1).md`, `FLUXO_TRABALHO (1).md`
  *(antes: `diff` rápido contra o original para garantir que não há conteúdo único.)* 🟡
- [ ] **2.4** 🔴 Apagar a pasta vazia/órfã:
  `C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\ORACULO-DA-FIRMA\`
  *(antes: confirmar que está realmente vazia.)*

---

## Bloco 3 — Consolidar projetos no cérebro 🟡

Objetivo: cada projeto vira **uma pasta única** em `04-PROJETOS-ATIVOS/`, com a subestrutura
padrão. Começar pelo FAC 2026 (projeto-foco atual).

- [ ] **3.1** Renomear a pasta do projeto FAC para o padrão (§6 do blueprint):
  `cerebro\...\04-PROJETOS-ATIVOS\FIRMA-FAC-2026\` → `FIRMA-19-FAC-2026-Todas-as-Historias\`
  *(confirmar o número sequencial correto no `_INDEX.md`.)*
- [ ] **3.2** Criar dentro dela as subpastas padrão:
  `01-BRIEFING/` · `02-DOCUMENTACAO/` · `03-ORCAMENTO-CRONOGRAMA/` · `04-REFERENCIAS/` · `05-ENTREGAS/`
- [ ] **3.3** **Mover** os arquivos do edital (hoje soltos) para dentro do projeto:
  - De: `...\ORACULO - FIRMA ABACAXI\PROJETOS - EDITAIS\EDITAL FAC 2026\` (todos os `.xlsx/.docx/.pdf/.ods`)
  - Para: `...\FIRMA-19-FAC-2026-Todas-as-Historias\03-ORCAMENTO-CRONOGRAMA\` (planilhas/cronogramas)
    e `02-DOCUMENTACAO\` (anexos, declarações, editais SEI).
- [ ] **3.4** Mover os `.md` de referência já existentes na pasta do projeto para as subpastas
  certas (ex.: `REFERENCIAS-VISUAIS/` → `04-REFERENCIAS/`; `03-Roteiro-Memorial-v4.md` → `02-DOCUMENTACAO/`).
- [ ] **3.5** Atualizar/ criar `00-INDEX.md` do projeto apontando para tudo (com wikilinks).
- [ ] **3.6** Repetir o padrão (renomear + subpastas) para os demais ativos:
  `FIRMA-#04-Brasil-Participativo`, `FIRMA-#08-RNP-Ailton-Krenak`, `FIRMA-#10-Simbiose`,
  `FIRMA-#16-Maranha` → remover o `#` e padronizar. 🟢

---

## Bloco 4 — Pasta institucional `00-EMPRESA` 🟢

- [ ] **4.1** Criar `cerebro\CEREBRO-ORACULO\00-EMPRESA\` com as subpastas:
  `socios/` · `juridico/` · `contratos-modelo/` · `financeiro-empresa/` · `portfolio/`
- [ ] **4.2** **Mover** o currículo solto:
  `...\ORACULO - FIRMA ABACAXI\CV-Filipe-Duque-2026.docx` → `00-EMPRESA\socios\`
- [ ] **4.3** Reunir aqui outros institucionais que aparecerem (CNPJ, contrato social,
  declarações reutilizáveis, dados bancários/PIX, apresentação comercial). 🟡

---

## Bloco 5 — Arquivar legado com valor histórico 🟡

Nada se apaga aqui — só se move para um arquivo datado e documentado.

- [ ] **5.1** Criar `cerebro\CEREBRO-ORACULO\05-ARQUIVO-HISTORICO\` (se faltar subestrutura) e
  `C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\archive\2026-06\`.
- [ ] **5.2** Mover os **projetos FAC antigos** para o arquivo histórico:
  `...\PROJETOS - EDITAIS\PROJETOS FAC ANTIGOS\` (5 ATOS DA ESCADA, CIRCO E ESTRADA, CIRCOLAR,
  FILMMAKER INDEPENDENTE, OFICINAS DOCUMENTAL) → `05-ARQUIVO-HISTORICO\editais-fac-anteriores\`
- [ ] **5.3** Mover os **orçamentos antigos** (≈50 `.docx/.xlsx`):
  `...\DOCUMENTOS ANTIGOS - AVALIAR E MIGRAR\Orçamentos\` → `archive\2026-06\orcamentos-historicos\`
- [ ] **5.4** Mover o backup do Notion antigo e a documentação antiga:
  `...\DOCUMENTOS ANTIGOS - AVALIAR E MIGRAR\NOTION FIRMA ANTIGO\` e
  `...\DOCUMENTAÇAO DO NOTION ANTIGO\` → `archive\2026-06\notion-antigo\`
- [ ] **5.5** Após esvaziar, 🔴 apagar a pasta-limbo `DOCUMENTOS ANTIGOS - AVALIAR E MIGRAR\`
  e a `PROJETOS - EDITAIS\` (já consolidadas).
- [ ] **5.6** Criar `archive\2026-06\README.md` explicando o que há ali e de onde veio.

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

- [ ] **7.1** 🔴 prioridade — `docs\MAPA-MESTRE.md` (onde mora cada coisa).
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
