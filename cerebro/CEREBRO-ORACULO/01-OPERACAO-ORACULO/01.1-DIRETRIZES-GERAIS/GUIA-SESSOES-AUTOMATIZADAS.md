# Guia: Sessões Automatizadas com o Oráculo

*Como trabalhar com o vault para que tudo seja automático: absorção de conhecimento, sincronização e geração de insights.*

---

## Ciclo padrão de uma sessão (Automatizado)

### 1️⃣ Você inicia Claude Code

```bash
# Abra Claude Code neste diretório:
cd C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO
# (ou use o atalho do seu editor)
```

### 2️⃣ Oráculo prepara o contexto (AUTOMÁTICO)

Sem você fazer nada:
- ✅ Lê `wiki/hot.md` (~500 palavras de contexto recente)
- ✅ Carrega `CLAUDE.md` (este schema)
- ✅ Detecta modo PARA (sabe como organizar conhecimento)
- ✅ Verifica `MEMORIA.md` se existir (aprendizados persistentes)

**Você pode ver isto acontecendo:** Abra Claude Code e espere a mensagem inicial do Oráculo que menciona hot.md.

### 3️⃣ Você trabalha e conversa

**Cenários comuns:**

#### Cenário A: Atualizou um projeto, quer absorver
```
Você: Li o briefing do VMA atualizado, leio?
Oráculo: [lê 04-PROJETOS-ATIVOS/Visite-mon-Agence/01-BRIEFING.md]
Você: Absorva isso no wiki pra ficar estruturado.
Oráculo: ✓ Criadas:
         • wiki/projects/Visite-mon-Agence.md (síntese)
         • wiki/resources/pessoas/AFD.md (novo contato)
         • wiki/resources/referencias/Cinema-Corporativo.md
         ✓ Atualizadas:
         • wiki/index.md (links novos)
         • wiki/hot.md (contexto atualizado)
         ✓ Auto-commit no GitHub
```

#### Cenário B: Quer pesquisar autonomamente
```
Você: Pesquise editais audiovisuais 2026.
Oráculo: [executa /autoresearch]
         Encontradas:
         • FAC 2026 (MinC) — R$ até 200k
         • Premiação Brasil Filmes (Ancine)
         • AfroResistência (Fundo Audiovisual)
         ✓ Criadas wiki/resources/editais/[...].md
         ✓ Auto-commit + hot.md atualizado
```

#### Cenário C: Quer fazer um canvas visual
```
Você: Visualize o relacionamento entre FAC-2026, VMA e SOBRE2026.
Oráculo: [executa /canvas]
         ✓ Criado wiki/canvas/projetos-ativos.canvas
         ✓ Linked wiki/projects/FAC-2026.md, etc.
         ✓ Auto-commit
```

### 4️⃣ Encerramento de sessão (AUTOMÁTICO)

Quando você sai ou digita `/commit`:

- ✅ Oráculo atualiza `wiki/hot.md` com:
  - O que foi absorvido nesta sessão
  - Estado atual dos projetos
  - Pendências urgentes
  - Threads ativos

- ✅ Git commit automático:
  ```
  commit: "sessão N — [resumo do que foi absorvido]"
  ```

- ✅ GitHub recebe (push automático via Obsidian Git)

- ✅ NotebookLM sincroniza via repositório

---

## Triggers de Absorção (como ativar)

### Diga uma destas frases naturais:
- ✅ "absorva isso no wiki"
- ✅ "ingerir no vault"
- ✅ "adicionar ao conhecimento"
- ✅ "salve isso pra eu não esquecer"
- ✅ "synthesize this" (em inglês)
- ✅ "/wiki-ingest [caminho]" (comando direto)

### Ou implicitamente:
- Você diz: "faz uma síntese do FAC-2026"
- Oráculo gera a síntese
- Você diz: "isso"
- Oráculo pergunta: "absorvo isso no wiki?" 
- Você: "sim" ou "claro"
- ✓ Absorvido

---

## O que fica no Wiki (automático)

### Cada absorção cria:

**Para um projeto (ex: FAC-2026):**
- `wiki/projects/FAC-2026.md` — síntese completa
- `wiki/areas/Captacao.md` — relacionado a captação
- `wiki/resources/editais/FAC.md` — o edital em si
- Múltiplas entradas de conceito, cronograma, orçamento

**Tudo linkado:**
- FAC-2026.md → `[[Captacao]]`, `[[Conceito-Circense]]`, `[[MinC]]`
- Graph view conecta automaticamente
- Procurar por "edital" encontra tudo relevante

### hot.md atualiza com:
- Novos projetos absorvidos
- Status changes (FAC avançou pra fase de assinaturas?)
- Pendências (faltam documentos?)
- Insights (5 clientes esperam por calendário 2026?)

---

## NotebookLM: Sincronização Completa

### Como funciona a magia:

1. **Você alimenta NotebookLM** (manualmente, conforme você encontra):
   - Editais em PDF
   - Artigos sobre cinematografia
   - Referências de documentários
   - Regulamentos (Lei Rouanet, CEAC)
   - Perfis de clientes

2. **O Oráculo alimenta NotebookLM** (automático):
   - Vault via GitHub (Obsidian Git)
   - Tudo que foi absorvido no wiki
   - hot.md (contexto recente)
   - index.md (catálogo)

3. **NotebookLM fusion tudo:**
   - Seus PDFs + wiki estruturada
   - Gera áudios resumidos
   - Responde perguntas sobre projetos
   - Recomenda clientes/editais relevantes

4. **Você acessa (chat do NotebookLM):**
   - "Quais editais se aplicam a documentário circense?"
   - "Compare orçamento VMA vs. SOBRE2026"
   - "Gere resumo em áudio do FAC-2026"
   - NotebookLM responde com base em TUDO (wiki + suas fontes)

### Seu papel em NotebookLM:
- Adicione novas fontes periodicamente
- Marque sections importantes
- Use o chat para explorar
- Gere áudios quando precisar estudar em movimento

---

## Fluxo visual completo

```
┌─────────────────────────────────────────────────┐
│     SEU TRABALHO (Pastas 00–07)                 │
│  Roteiros, briefings, diários de set, etc.      │
└────────────────┬────────────────────────────────┘
                 │
                 │ "absorva isso"
                 ↓
┌─────────────────────────────────────────────────┐
│     ORÁCULO → WIKI (Síntese)                    │
│  projects/, areas/, resources/, hot.md, etc.    │
└────────┬──────────────────────────────┬─────────┘
         │                              │
         │ auto-commit                  │ você alimenta
         ↓                              │
┌─────────────────────────────────────┐ │
│  GITHUB (Obsidian Git)              │ │
│  30 min sync automático             │ │
└────────┬────────────────────────────┘ │
         │                              │
         │                              ↓
         │              ┌──────────────────────────┐
         └─────────────→│  NOTEBOOKLM              │
                        │  (Seus PDFs + Wiki)     │
                        │  Gera áudios & insights │
                        └──────────────────────────┘
```

---

## Checklist: Configuração Completa

- [ ] CLAUDE.md atualizado (este arquivo)
- [ ] hooks/hooks.json registrado: `claude hooks set hooks/hooks.json`
- [ ] wiki/ criada com hot.md, index.md, log.md
- [ ] NotebookLM alimentado com primeiras fontes
- [ ] GitHub conectado (push/pull automático)
- [ ] Obsidian aberto no vault (vendo as cores)
- [ ] Claude Code aberto no vault (pronto para `/wiki`)

---

## Próximas sesões: O que esperar

**Sessão 2:**
- Oráculo lê hot.md (contexto da sessão anterior)
- "Você parou em X, quer continuar?"
- Absorve novo conhecimento automaticamente

**Sessão 3+:**
- hot.md cada vez mais rico
- wiki/ crescendo com sínteses de projetos
- NotebookLM oferecendo insights novos
- Você nunca reinventa a roda

---

## Dúvidas Frequentes

**P: Hot.md se perde quando abro outra sessão?**  
R: Não. O Oráculo **relê** hot.md ao iniciar. Se você modificou algo manualmente, o Oráculo vê. Se foi gerado automaticamente, está lá.

**P: Preciso fazer commit manualmente?**  
R: Não. Auto-commit acontece após cada escrita do Oráculo. Use `/commit` manualmente se quiser sincronizar imediatamente.

**P: NotebookLM fica desatualizado?**  
R: Não se você der push (GitHub). A cada 30 min o Obsidian Git sincroniza. NotebookLM indexa o repositório, então fica atualizado.

**P: Posso editar wiki/ manualmente?**  
R: Sim. O Oráculo detecta e não sobrescreve. Se você edita `wiki/projects/FAC-2026.md` manualmente, o Oráculo respeita suas mudanças.

**P: E se eu quiser "desabsorver" algo?**  
R: Delete a página wiki (ou `/archive`). Hot.md não referencia, volta ao normal. Git historiza tudo, você pode recuperar.

---

*Oráculo — Sessões Automatizadas v1.0 · Junho 2026*
