# NotebookLM × CEREBRO-ORACULO — Sincronização Automática

*Como seu NotebookLM fica sempre atualizado com o vault, gerando insights baseados em tudo que você sabe.*

---

## O que é NotebookLM (recap)

Ferramenta do Google que:
- 📚 Indexa documentos (PDFs, Google Docs, repositórios GitHub)
- 🔗 Cria conexões automáticas entre conceitos
- 🎙️ Gera áudios resumidos (Studio)
- 💬 Responde perguntas sobre as fontes
- 📊 Gera analíticos e citações

---

## Seu NotebookLM atual

**ID:** 944cbd55...  
**Fontes:** 9 documentos (último inventário)

---

## Como a Sincronização Funciona

### 🔄 Fluxo Automático (Sem você fazer nada)

```
1. Você absorve conhecimento no vault
   ↓ (diz "absorva isso no wiki")
2. Oráculo cria pages em wiki/
   ↓
3. Auto-commit para GitHub
   ↓ (Obsidian Git a cada 30 min)
4. GitHub repositório atualizado
   ↓
5. NotebookLM sincroniza
   ↓ (você já configurou o repositório como fonte)
6. Próxima vez que você acessa NotebookLM:
   ↓
7. Tudo está lá (hot.md, projects, concepts, etc.)
```

### ⚙️ O que precisa estar configurado (UMA VEZ)

1. **GitHub repositório** — o vault deve estar em um repo privado (ou público)
2. **NotebookLM fonte** — você adiciona o repositório como fonte:
   - Link: `https://github.com/[usuario]/[repo]`
   - Tipo: Repository
   - Sincronização: Automática (a cada push)

3. **Obsidian Git ativo** — já está (push a cada 30 min)

**Se você não configurou NotebookLM com GitHub ainda:**
- Vá para NotebookLM
- "Add source" → "GitHub repository"
- Cole a URL do repo
- ✅ Pronto — sincroniza automaticamente a cada 30 min

---

## Seu papel: Alimentar NotebookLM com Novas Fontes

### O que VOCÊ adiciona manualmente ao NotebookLM:

**Edital**
- PDFs do FAC 2026, Premiação Brasil Filmes, etc.
- Salve em `01-OPERACAO-ORACULO/` ou `.raw/editais/`
- Diga ao Oráculo: "absorva esse edital"
- ✓ Fica no wiki + NotebookLM sincroniza

**Referências audiovisuais**
- Documentários similares (links + notas)
- Artigos sobre cinematografia
- Entrevistas com cineastas
- Diga ao Oráculo: "absorva essas referências"
- ✓ Vai para wiki/resources/ + NotebookLM

**Legislação & Compliance**
- Lei Rouanet (PDF)
- Regulamento CEAC
- Contrato padrão de coprodução
- Diga ao Oráculo: "absorva essa legislação"
- ✓ Em wiki/resources/ + NotebookLM

**Perfis de cliente**
- Histórico de projetos com Brasil Participativo, AFD, etc.
- Contatos, orçamentos anteriores
- Preferências criativas
- Diga ao Oráculo: "absorva perfil [cliente]"
- ✓ Em wiki/resources/pessoas/ + NotebookLM

**Briefings de projeto**
- Qualquer documento novo em 04-PROJETOS-ATIVOS/
- Diga ao Oráculo: "absorva [projeto]"
- ✓ Síntese em wiki/projects/ + NotebookLM sincroniza

---

## O que NotebookLM Oferece (Automático)

### 1. Chat com Contexto Completo

**Você pergunta:**
- "Quais editais se aplicam a documentário circense?"
- "Compare orçamento FAC-2026 vs. SOBRE2026"
- "Qual é o CNPJ do cliente Brasil Participativo?"
- "Que referências visuais usamos em Maranhã?"

**NotebookLM responde:**
- Baseado em: PDFs de edital + wiki/index + wiki/projects/FAC-2026.md + histórico
- Com citações: "Segundo o Edital FAC 2026, p. 5..."
- Conectando conceitos: "Ambos os projetos usam estrutura narrativa de 5 atos..."

### 2. Studio — Áudios Resumidos

**Você gera:**
- Resumo em áudio de FAC-2026 (5 min, podcaster profissional)
- Cronograma VMA em áudio (para ouvir dirigindo)
- Análise de mercado: "Editais audiovisuais 2026"

**Como funciona:**
- NotebookLM lê tudo (wiki + suas fontes)
- Gera roteiro
- Produz áudio com voz natural
- Você baixa e ouve ou compartilha

### 3. Análise Automática

**Insights que NotebookLM oferece:**
- "Padrão em orçamentos 2026: X% em pós-produção"
- "Conectando: 3 clientes procuram por conteúdo educativo"
- "Referência visual similar: documentário [X] de [diretor]"
- "Gap identificado: editais para coprodução franco-brasileira são raros"

### 4. Citations

Toda resposta vem com referência:
> "Segundo wiki/projects/FAC-2026.md, a duração é 6 meses..."

Você clica e vai direto ao arquivo no vault.

---

## Fluxo Ideal de Uma Semana

### Segunda-feira
- 🟡 Você atualiza briefing de VMA em `04-PROJETOS-ATIVOS/`
- Diz ao Oráculo: "absorva VMA"
- ✓ Criadas página wiki + auto-commit
- ✓ NotebookLM sincroniza automaticamente

### Quarta-feira
- 🟡 Você encontra edital novo do MinC
- Salva o PDF em `01-OPERACAO-ORACULO/`
- Diz ao Oráculo: "absorva esse edital"
- ✓ Vai para wiki/resources/editais/ + commit
- ✓ NotebookLM indexa automaticamente

### Sexta-feira
- 🟡 Você quer um resumo de tudo que aconteceu
- Abre NotebookLM
- Pergunta: "Qual é o estado atual de todos os projetos?"
- NotebookLM responde (baseado em hot.md + seus PDFs)
- Você pede: "Gere resumo em áudio de 5 minutos"
- NotebookLM produz (podcaster profissional)
- ✓ Você ouve enquanto toma café

---

## Status Atual (Checklist)

- [ ] Repositório GitHub com vault está configurado?
- [ ] Obsidian Git ativo (push automático)?
- [ ] NotebookLM tem repositório GitHub como fonte?
- [ ] NotebookLM ID documentado (944cbd55...)?
- [ ] Você já adicionou 2–3 PDFs de edital em NotebookLM?
- [ ] Testou pergunta ao chat de NotebookLM?
- [ ] Gerou áudio teste no Studio?

---

## Troubleshooting

### NotebookLM mostra conteúdo desatualizado
- **Solução:** Force push em GitHub: `git push --force` (raramente necessário)
- **Ou:** Remova e re-adicione a fonte GitHub em NotebookLM
- **Ou:** Espere 30 min + recarregue NotebookLM

### Vault não aparece em NotebookLM
- **Verificar:** Repo é público ou você tem acesso?
- **Verificar:** URL está certa? `https://github.com/username/repo`
- **Verificar:** Obsidian Git está fazendo push? (`git log --oneline` mostra commits recentes?)

### Busca no NotebookLM não encontra arquivo novo
- **Solução:** Espere 5 min, recarregue a página
- **Ou:** Força sincronização: remove e re-adiciona a fonte

---

## Dicas Avançadas

### 1. Crie um "Dossiê de Cliente" via NotebookLM

**Você:**
- Adiciona PDFs de projetos anteriores com Brasil Participativo
- Adiciona histórico de contatos
- Absorve tudo no wiki

**NotebookLM oferece:**
- "Chat sobre Brasil Participativo" (responde com histórico completo)
- "Áudio: Cronologia de projetos com Brasil Participativo"
- "Padrão: Preferências criativas do cliente"

### 2. Podcast de Aprendizados

**Ao fim de cada mês:**
- Diga ao Oráculo: "Sintetize tudo que aprendemos sobre captação"
- Oráculo cria página wiki
- Você pede ao NotebookLM: "Gere áudio de 10 min sobre aprendizados 2026"
- Studio produz
- Você compartilha com Jaya (onboarding automático)

### 3. Análise de Mercado

**Você alimenta NotebookLM com:**
- 5 editais de 2026
- 10 documentários similares (IMDb links + notas)
- 3 artigos sobre tendências de documentário

**NotebookLM oferece:**
- "Análise: Mercado de documentário em 2026"
- "Referências: Estética dominante em documentários educativos"
- "Gap: Documentários sobre circologia são raros — oportunidade"

---

## Próximos Passos Hoje

1. **Abra NotebookLM** → verifique se repositório GitHub está como fonte
2. **Se não estiver:** Settings → Add source → GitHub repo → cola URL
3. **Teste:** Faça uma pergunta no chat
4. **Gere:** Um áudio curto (5 min) sobre FAC-2026

---

*NotebookLM × CEREBRO-ORACULO · Sincronização Automática · Junho 2026*
