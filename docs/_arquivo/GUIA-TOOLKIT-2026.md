# Guia de Toolkit e Instalação — Oráculo Firma Abacaxi 2026

> **Documento vivo.** Atualizado a cada instalação. Data de referência: 12/jun/2026.  
> Objetivo: saber exatamente o que está instalado, o que vale instalar e como fazer isso.

---

## Índice

1. [Estado Atual — O que já está instalado](#1-estado-atual)
2. [Análise de todos os links e repositórios](#2-análise-dos-links)
3. [Roadmap por objetivo](#3-roadmap-por-objetivo)
4. [Guias de instalação passo a passo](#4-guias-de-instalação)
5. [Skills a criar do zero](#5-skills-a-criar)
6. [Referências para ingerir no Cérebro](#6-referências-para-o-cérebro)

---

## 1. Estado Atual

### MCPs ativos (`.mcp.json`)

| MCP | Função | Status |
|---|---|---|
| `notion` | 6 bancos Notion — leitura e escrita | ✅ Ativo |
| `duckduckgo` | Busca web (básica) | ✅ Ativo |
| `filesystem` | Acesso a arquivos locais | ✅ Ativo |
| `github` | API GitHub | ⚠️ Sem token |
| `memory` | Memória entre sessões | ✅ Ativo |
| `brave-search` | Busca Brave | ⚠️ Sem chave |
| `sequential-thinking` | Raciocínio encadeado | ✅ Ativo |
| `obsidian` | Vault Obsidian (CEREBRO-ORACULO) | ✅ Ativo |
| `notebooklm` | Google NotebookLM | ✅ Ativo |
| `context7` | Lookup de docs de frameworks | ✅ Adicionado (12/jun) |
| `adobe` | Adobe Creative Cloud | ✅ Declarado via skill |

**MCPs no template, ainda não ativos** (em `.claude/mcp-configs/mcp-servers.json`):
- `fal-ai` — Geração de imagens (precisa de `FAL_KEY`)
- `exa-web-search` — Busca semântica superior (precisa de `EXA_API_KEY`)
- `supabase` — BD do oraculo-app (precisa de project ref + key)
- `vercel` — Deploy automático (free, HTTP)
- `playwright` — Automação de browser
- `magic` — Componentes UI prontos
- `firecrawl` — Scraping web (precisa de chave)

---

### Skills instaladas (`.claude/skills/`)

#### Firma (40 skills)
| Grupo | Skills |
|---|---|
| **Vídeo / Narrativa** | cinematic-script-writer, narrativa-documental, prompts-imagem-ia |
| **Wiki / Conhecimento** | wiki, wiki-cli, wiki-fold, wiki-ingest, wiki-lint, wiki-mode, wiki-query, wiki-retrieve, obsidian-bases, obsidian-markdown |
| **Marketing / Social** | master-marketing, marketing-copy-knowledge, social-media-strategy, trafego-pago, translate-pro, upload-post, assessoria-imprensa, youtube-estrategia |
| **Produção / Gestão** | atas-reuniao, autoresearch, budget-planner, canvas, defuddle, editais, juridico-audiovisual, idiomas |
| **n8n Automação** | n8n-code-javascript, n8n-code-python, n8n-expression-syntax, n8n-mcp-tools-expert, n8n-node-configuration, n8n-validation-expert, n8n-workflow-patterns |
| **Utilitários** | google-drive-integration, processar-inbox, save, think |

#### ECC (41 skills)
| Grupo | Skills |
|---|---|
| **Pesquisa** | deep-research, market-research, iterative-retrieval, lead-intelligence, research-ops, council |
| **Conteúdo** | brand-voice, content-engine, crosspost, exa-search, seo, investor-materials |
| **Código** | plankton-code-quality, tdd-workflow, e2e-testing, production-audit, verification-loop |
| **IA / Ciência** | eval-harness, agent-sort, ai-regression-testing, scientific-db-pubmed, scientific-db-uspto |
| **Configuração** | configure-ecc, skill-scout, skill-stocktake, strategic-compact |

---

### Agentes instalados (`.claude/agents/`)

**Firma-específicos:**
- `firma-product-strategist` — Roadmap e priorização de produto
- `firma-ux-designer` — Design system, componentes, fluxos
- `firma-web-builder` — Next.js, React, Tailwind
- `firma-backend-architect` — Supabase, APIs, auth, integrações
- `firma-verifier` — Auditoria pré-commit
- `firma-wiki-ingest` — Ingestão de conteúdo no vault
- `firma-wiki-lint` — Saúde do vault

**Infra geral:** 71 agentes de code review, build resolvers, segurança, arquitetura (full ECC stack).

---

## 2. Análise dos Links

### Links compartilhados em 07/jun e 09/jun e 12/jun

---

#### `github.com/affaan-m/ECC`
**O que é:** Enterprise Claude Code — harness de performance com skills, memória, instincts e segurança.  
**Status:** ✅ **Já instalado** — `.claude/skills/ecc/` (41 skills) + 71 agentes.  
**Ação:** Nada a fazer. Verificar atualizações mensalmente com `git pull upstream`.

---

#### `glamorous-pencil-2e4.notion.site` — The Agency (147 Pre-Built Agents)
**O que é:** Catálogo curado de 147 agentes prontos para Claude Code, organizado por função.  
**Status:** ✅ **Parcialmente instalado** — 4 agentes `firma-*` + 8 skills extraídos em jun/2026.  
**Ação:** Revisar a cada trimestre se há novos agentes relevantes. Próxima revisão: set/2026.

---

#### `github.com/paperclipai/paperclip`
**O que é:** App web open-source para gerenciar agentes de IA no trabalho (dashboard de agentes).  
**Status:** ❌ Não instalado.  
**Por que esperar:** Compete conceitualmente com o `oraculo-app` que já está em desenvolvimento. Instalar antes de ter o próprio dashboard funcionando seria ruído. Revisar após o oraculo-app ter sua primeira versão estável.  
**Prioridade:** Baixa (Fase 2+)

---

#### `github.com/calesthio/OpenMontage`
**O que é:** Ferramenta Python para automação de montagem de vídeo — cortes automáticos, sequências.  
**Status:** ❌ Não instalado.  
**Relevância:** Alta para produção audiovisual. Complementa o workflow de edição sem substituir o Premiere.  
**Como instalar:** Ver [Guia de Instalação — OpenMontage](#openmontage).  
**Prioridade:** Média (Próximo Sprint)

---

#### `github.com/elder-plinius/G0DM0D3`
**O que é:** Framework experimental de system prompt / jailbreak.  
**Status:** ❌ Não instalado.  
**Relevância:** Baixa para trabalho de produção. Contexto experimental, sem aplicação prática clara para a Firma.  
**Prioridade:** Não instalar.

---

#### `github.com/Shubhamsaboo/awesome-llm-apps`
**O que é:** Repositório curado com exemplos e apps construídos com LLMs.  
**Status:** Repositório de referência, não ferramenta instalável.  
**Uso:** Consultar quando quiser experimentar um novo tipo de app ou integração. Não instalar.  
**Prioridade:** Referência (ingerir resumo no Cérebro)

---

#### `github.com/karpathy/llm-council`
**O que é:** Framework do Andrej Karpathy para fazer múltiplos LLMs debaterem uma questão.  
**Status:** ❌ Não instalado.  
**Relevância:** Interessante para decisões criativas e editoriais importantes (ex: qual abordagem narrativa para um documentário). Pode ser adaptado como skill `conselho-criativo`.  
**Prioridade:** Fase 2

---

#### `github.com/meituan-longcat/LongCat-Video`
**O que é:** Modelo de geração de vídeo da Meituan (empresa chinesa de tech).  
**Status:** ❌ Não instalado.  
**Por que esperar:** Requisitos de GPU muito altos. O RTX 4060 Ti com 8GB VRAM pode não ser suficiente para qualidade útil.  
**Prioridade:** Baixa — testar LTX-Video primeiro, que tem requisitos menores.

---

#### `github.com/Lightricks/LTX-Video`
**O que é:** Modelo open-source de geração de vídeo a partir de texto/imagem. Da Lightricks (criadores do FaceApp/Videoleap). Roda localmente.  
**Status:** ❌ Não instalado.  
**Relevância:** Alta. RTX 4060 Ti suporta. Gratuito, sem custo por uso, roda offline.  
**Como instalar:** Ver [Guia de Instalação — LTX-Video](#ltx-video).  
**Prioridade:** Alta (Próximo Sprint)

---

#### `criscatalyst.notion.site` — ScrapeGraphAI Playbook
**O que é:** Guia de uso do ScrapeGraphAI para donos de agências — scraping inteligente com IA.  
**Status:** Guia/referência, não instalável diretamente. O ScrapeGraphAI em si é instalável via pip.  
**Relevância:** Alta para pesquisa de mercado, benchmarking de concorrentes, coleta de referências visuais.  
**Prioridade:** Fase 2 — instalar junto com exa-web-search.

---

#### `badedits.com`
**O que é:** Site de efeitos criativos para vídeo/edição.  
**Status:** Serviço web, não instalável.  
**Uso:** Consultar como referência de efeitos. Salvar no Cérebro.

---

#### `docs.google.com` (3 documentos compartilhados)
**O que são:** Guias e documentos de referência sobre IA e produção.  
**Status:** Conteúdo para ingerir no Cérebro, não ferramentas.  
**Ação:** Ver [Referências para o Cérebro](#6-referências-para-o-cérebro).

---

#### `content.game/c/storytelling-principles`
**O que é:** Recurso educativo sobre princípios de storytelling.  
**Ação:** Ingerir no Cérebro — `02-RECURSOS/storytelling-principles.md`.

---

#### `qme.ai`
**O que é:** Plataforma de automação de QA com IA.  
**Relevância:** Baixa para o contexto atual da Firma.  
**Prioridade:** Não instalar.

---

#### `aimadesimple0.substack.com` — "99% of people use AI wrong"
**O que é:** Artigo com guias de uso eficiente de IA.  
**Ação:** Ingerir resumo no Cérebro.

---

#### `apply.leifabel.com/ig-research-tool`
**O que é:** Ferramenta paga de pesquisa de Instagram.  
**Alternativa:** exa-web-search MCP cobre busca semântica na web incluindo Instagram de forma gratuita.  
**Prioridade:** Não instalar (avaliar após exa-search estar ativo).

---

#### `github.com/ruvnet/ruflo`
**O que é:** Framework de orquestração de agentes do ruvnet (criador prolífico de ferramentas IA).  
**Status:** ❌ Não analisado em detalhe.  
**Ação:** Verificar se complementa ou duplica o ECC antes de instalar. Baixa prioridade.

---

## 3. Roadmap por Objetivo

### Dashboard Interativo (oraculo-app)

**Estado atual:** Base Next.js criada em `oraculo-app/` com TypeScript, Tailwind, Shadcn/ui.

| O que falta | Ferramenta | Status |
|---|---|---|
| MCP do banco de dados | supabase MCP | ⚠️ Precisa de project ref |
| Geração de imagens inline | fal-ai MCP | ⚠️ Precisa de FAL_KEY |
| Lookup de docs durante dev | context7 MCP | ✅ Adicionado |
| Componentes UI prontos | magic MCP | 🔜 Opcional |
| Skill de desenvolvimento | `dashboard-dev` | 🔜 A criar |

**Para iniciar o desenvolvimento do dashboard:**
1. Adicionar supabase MCP (precisa de project ref do Supabase)
2. Usar `firma-web-builder` + `firma-ux-designer` para estruturar as telas
3. Referência de design: ver skill `firma-branding` para paleta e tipografia

---

### Moodboard Visual

**Estado atual:** `prompts-imagem-ia` instalado. Adobe MCP declarado.

| O que falta | Ferramenta | Status |
|---|---|---|
| Geração de imagens por prompt | fal-ai MCP | ⚠️ Precisa de FAL_KEY |
| Skill de moodboard | `moodboard` skill | ✅ Criada (12/jun) |
| Scraping de referências visuais | ScrapeGraphAI ou exa | 🔜 Fase 2 |

**Fluxo de trabalho com moodboard:**
```
/moodboard [briefing do projeto]
→ skill gera paleta de referências
→ prompts-imagem-ia cria imagens conceituais
→ (quando fal.ai ativo) gera variações
→ Adobe MCP monta o painel final
```

---

### Identidade Visual da Firma (Branding)

**Estado atual:** `brand-voice` (ECC) instalado. `firma-ux-designer` instalado.

| O que falta | Ferramenta | Status |
|---|---|---|
| Skill de identidade visual | `firma-branding` | ✅ Criada (12/jun) |
| Skill de primal branding | `primal-branding` | ✅ Criada (12/jun) |
| Geração de variações visuais | fal-ai MCP | ⚠️ Precisa de FAL_KEY |
| Design system documentado | oraculo-app/design-system | 🔜 A construir |

**O que a Firma Abacaxi tem como identidade hoje:**
- Nome que evoca algo tropical, criativo, um pouco subversivo
- Trabalho audiovisual (documentário, edital, institucional)
- Parceiros Filipe + equipe — produtora cultural
- Clientes: CNV, SuperHost, Tamause, Vert, Cerrado, Chichá

**Próximo passo:** Usar `/firma-branding` para definir paleta oficial, tipografia e arquétipo de marca.

---

### Produção de Vídeo com IA

**Estado atual:** cinematic-script-writer instalado. GPU RTX 4060 Ti 8GB VRAM.

| Ferramenta | Tipo | Status | Prioridade |
|---|---|---|---|
| LTX-Video (Lightricks) | Geração local text-to-video | ❌ Não instalado | Alta |
| OpenMontage | Automação de montagem | ❌ Não instalado | Média |
| LongCat-Video (Meituan) | Geração de vídeo (pesado) | ❌ Não instalar agora | Baixa |

---

### Pesquisa e Inteligência de Mercado

**Estado atual:** DuckDuckGo MCP ativo. deep-research, market-research (ECC) instalados.

| Ferramenta | Melhoria | Status |
|---|---|---|
| exa-web-search MCP | Busca semântica muito superior ao DuckDuckGo | ⚠️ Precisa de EXA_API_KEY |
| ScrapeGraphAI | Scraping inteligente para referências e pesquisa | 🔜 Fase 2 |
| firecrawl MCP | Scraping de páginas completas | ⚠️ Precisa de chave |

---

## 4. Guias de Instalação

### context7 MCP ✅ (já adicionado)

Adicionado ao `.mcp.json`. Não precisa de API key.  
**Para usar:** Citar `use context7` em qualquer prompt de desenvolvimento ou `@context7 [nome da lib]`.

---

### fal.ai MCP

**Para quê:** Geração de imagens por prompt — moodboard, visual de marca, thumbnails.

```json
// Adicionar ao .mcp.json, dentro de "mcpServers":
"fal-ai": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "fal-ai-mcp-server"],
  "env": {
    "FAL_KEY": "SEU_FAL_KEY_AQUI"
  }
}
```

**Onde obter chave:** https://fal.ai → Dashboard → API Keys  
**Custo:** Pay-per-use, ~$0,003-0,05 por imagem dependendo do modelo.  
**Depois de adicionar:** Reiniciar o Claude Code para carregar o novo MCP.

---

### exa-web-search MCP

**Para quê:** Busca semântica superior — pesquisa de marca, concorrentes, referências visuais.

```json
// Adicionar ao .mcp.json, dentro de "mcpServers":
"exa-web-search": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "exa-mcp-server"],
  "env": {
    "EXA_API_KEY": "SEU_EXA_KEY_AQUI"
  }
}
```

**Onde obter chave:** https://exa.ai → Dashboard → API Keys  
**Custo:** 1.000 buscas/mês grátis no plano free.  
**Obs:** Substitui o DuckDuckGo para pesquisas mais complexas.

---

### supabase MCP

**Para quê:** Interagir com o banco do oraculo-app direto do Claude Code.

```json
// Adicionar ao .mcp.json, dentro de "mcpServers":
"supabase": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@supabase/mcp-server-supabase@latest",
           "--project-ref=SEU_PROJECT_REF_AQUI"],
  "env": {
    "SUPABASE_ACCESS_TOKEN": "SEU_SUPABASE_TOKEN_AQUI"
  }
}
```

**Onde obter:** Supabase Dashboard → Settings → API → Project Reference + Service Role Key  
**Atenção:** Usar Access Token (não a Service Role Key) para limitar permissões.

---

### LTX-Video (geração de vídeo local) {#ltx-video}

**Requisitos:** Python 3.10+, CUDA 12.x (instalado — RTX 4060 Ti OK), ~15GB de espaço livre.

```powershell
# 1. Clonar o repositório
git clone https://github.com/Lightricks/LTX-Video
cd LTX-Video

# 2. Criar ambiente virtual
python -m venv .venv
.venv\Scripts\activate

# 3. Instalar dependências
pip install -e ".[train]"

# 4. Download do modelo (escolher um):
# - ltx-video-2b-0.9.7.safetensors (~5.7GB) — versão mais recente
# - Baixar de: https://huggingface.co/Lightricks/LTX-Video

# 5. Testar geração
python inference.py \
  --prompt "A cinematic aerial shot of a tropical coastline at golden hour" \
  --height 480 --width 704 \
  --num_frames 97 \
  --output_path outputs/teste.mp4
```

**Onde colocar:** `C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\ferramentas\LTX-Video\`  
**Dica:** Criar uma skill `ltx-video` que chame o script com parâmetros padronizados.  
**Tempo de geração:** ~2-5 minutos por clip de 97 frames a 480p na RTX 4060 Ti.

---

### OpenMontage (automação de edição) {#openmontage}

**Para quê:** Gerar cortes automáticos, sequências rítmicas, montagem a partir de clips brutos.

```powershell
# 1. Clonar
git clone https://github.com/calesthio/OpenMontage
cd OpenMontage

# 2. Instalar
pip install -r requirements.txt

# 3. Uso básico
python montage.py --input "pasta_com_clips/" --output "montagem_final.mp4" --music "trilha.mp3"
```

**Onde colocar:** `C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\ferramentas\OpenMontage\`

---

### ScrapeGraphAI (pesquisa inteligente)

**Para quê:** Extrair dados estruturados de qualquer site — inspiração visual, benchmarking, pesquisa de mercado.

```powershell
pip install scrapegraphai
pip install playwright && playwright install
```

**Uso via Python:**
```python
from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {"model": "claude-sonnet-4-6", "api_key": "..."},
    "verbose": True,
}

scraper = SmartScraperGraph(
    prompt="Extrair paleta de cores, tipografia e tom de voz da marca",
    source="https://www.empresa.com.br",
    config=graph_config
)
result = scraper.run()
```

**Integração recomendada:** Criar skill `pesquisa-visual` que use ScrapeGraphAI para coletar referências de marca.

---

## 5. Skills a Criar

### `firma-branding` ✅ (criada em 12/jun)

Localização: `.claude/skills/firma/firma-branding/SKILL.md`  
**Para usar:** `/firma-branding` ou invocar via skill tool  
Cobre: paleta de cores, tipografia, iconografia, tom de voz, aplicações de marca.

---

### `primal-branding` ✅ (criada em 12/jun)

Localização: `.claude/skills/firma/primal-branding/SKILL.md`  
**Para usar:** `/primal-branding [projeto ou cliente]`  
Cobre: os 7 ativos de marca de Patrick Hanlon aplicados à Firma e a projetos de clientes.

---

### `moodboard` ✅ (criada em 12/jun)

Localização: `.claude/skills/firma/moodboard/SKILL.md`  
**Para usar:** `/moodboard [briefing]`  
Cobre: geração de referências visuais, paleta, composição, mood para projetos audiovisuais.

---

### `conselho-criativo` 🔜 (Fase 2)

Inspirada em `llm-council` (karpathy). Múltiplas perspectivas internas para decisões criativas.  
**Uso:** `/conselho-criativo [dilema criativo ou editorial]`  
**Como funciona:** Simula 3-4 perspectivas (diretora criativa, curador, cliente, crítico) e debate a questão.

---

### `dashboard-dev` 🔜 (com supabase MCP ativo)

Skill focada em desenvolvimento do oraculo-app com contexto do design system da Firma.  
**Uso:** `/dashboard-dev [feature a implementar]`  
**Deps:** supabase MCP + fal-ai MCP + context7 MCP

---

### `ltx-video` 🔜 (após instalar LTX-Video)

Wrapper para geração de vídeo local com LTX-Video, padronizando parâmetros para o estilo da Firma.  
**Uso:** `/ltx-video [descrição da cena]`

---

## 6. Referências para o Cérebro

Conteúdo para ingerir em `cerebro/CEREBRO-ORACULO/02-RECURSOS/`:

| Fonte | Destino no Cérebro | Prioridade |
|---|---|---|
| `awesome-llm-apps` (Shubhamsaboo) | `02-RECURSOS/llm-apps-catalogo.md` | Média |
| Artigo aimadesimple0.substack | `02-RECURSOS/uso-correto-ia.md` | Baixa |
| ScrapeGraphAI Playbook (Notion) | `02-RECURSOS/scrapegraphai-playbook.md` | Média |
| content.game/storytelling | `02-RECURSOS/storytelling-principles.md` | Alta |
| Google Docs compartilhados (3) | `02-RECURSOS/guias-ia-[tema].md` | Alta |
| llm-council README | `02-RECURSOS/llm-council-conceito.md` | Baixa |

**Para ingerir:** Usar `/wiki-ingest [url ou pasta]` para cada item.

---

## Checklist de Chaves de API Necessárias

| Serviço | Chave | Onde obter | Custo |
|---|---|---|---|
| fal.ai | `FAL_KEY` | fal.ai/dashboard | Pay-per-use |
| Exa Search | `EXA_API_KEY` | exa.ai/dashboard | 1k/mês grátis |
| Supabase | Access Token | supabase.com/dashboard/settings | Grátis (projeto free) |
| GitHub | PAT token | github.com/settings/tokens | Grátis |
| Brave Search | `BRAVE_API_KEY` | brave.com/search/api | 2k/mês grátis |

Todas as chaves ficam em: `C:\Users\User\.secrets\oraculo.env`

---

## Histórico de Atualizações

| Data | O que foi feito |
|---|---|
| 12/jun/2026 | Documento criado. context7 MCP adicionado. Skills firma-branding, primal-branding, moodboard criadas. |
| — | — |
