# 🧠 SKILLS-INDEX — Mapa de Capacidades do Oráculo
> **Leia este arquivo primeiro.** Antes de executar qualquer tarefa especializada, consulte este índice para identificar qual skill ativar. Cada skill tem um modo de uso: `agent` (lida via contexto), `app` (endpoint no Oráculo-App), `cli` (script de terminal local).

---

## 📐 Arquitetura & Roteamento

```
skills/
├── SKILLS-INDEX.md          ← Você está aqui. Hub central de roteamento.
│
├── antigravity/             ← Skills do agente Antigravity (Claude)
│   ├── llm-council/         ← Debate multipersona para decisões de arquitetura
│   ├── cinematic-script-writer/ ← Roteirização cinematográfica
│   ├── automation-workflows/    ← Criação de automações N8N/Notion
│   ├── budget-planner/          ← Planejamento orçamentário de projetos
│   ├── exec-admin/              ← Gestão administrativa executiva
│   ├── financial-calculator-pro/ ← Calculadora financeira avançada
│   ├── marketing-psychology/     ← Copywriting e psicologia de marketing
│   ├── negotiation-voss/         ← Técnicas de negociação (Chris Voss)
│   ├── photography-settings/     ← Configurações técnicas de câmera
│   ├── markitdown-parser/       ← Conversão de PDFs/Docs para Markdown
│   └── remotion-video-studio/   ← Geração de vídeos com React/Remotion
│
├── conteudo/               ← Skills de produção de conteúdo
├── gestao/                 ← Skills de gestão de projetos
├── graphify/               ← Skills de visualização de dados
├── humanizador/            ← Skills de humanização de texto
├── preproducao/            ← Skills de pré-produção audiovisual
├── producao/               ← Skills de produção audiovisual
├── proposta/               ← Skills de elaboração de propostas
└── prospeccao/             ← Skills de prospecção de clientes
```

---

## 🚦 Roteamento por Tipo de Tarefa

| Quando precisar de... | Ative a Skill | Modo |
|---|---|---|
| Debater uma decisão técnica importante | `antigravity/llm-council` | `agent` |
| Design de interface, UX, micro-animações, editabilidade | `antigravity/ux-interface-design` | `agent` |
| Roteiro ou tratamento cinematográfico | `antigravity/cinematic-script-writer` | `agent` |
| Criar automação N8N ou webhook Notion | `antigravity/automation-workflows` | `agent` |
| Calcular orçamento de projeto audiovisual | `antigravity/budget-planner` | `agent` |
| Tarefas administrativas e contratuais | `antigravity/exec-admin` | `agent` |
| Análise financeira e projeções | `antigravity/financial-calculator-pro` | `agent` |
| Criar copy, campanha ou estratégia de marca | `antigravity/marketing-psychology` | `agent` |
| Preparar negociação com cliente | `antigravity/negotiation-voss` | `agent` |
| Definir configurações técnicas de câmera/luz | `antigravity/photography-settings` | `agent` |
| Converter PDF/PPTX/XLSX para Markdown | `antigravity/markitdown-parser` | `cli` + `app` |
| Gerar vídeo ou vinheta com IA | `antigravity/remotion-video-studio` | `cli` |
| Criar conteúdo para redes sociais | `conteudo/` | `agent` |
| Gerenciar fases de um projeto | `gestao/` | `agent` |
| Gerar gráficos ou visualizações | `graphify/` | `agent` |
| Humanizar texto gerado por IA | `humanizador/` | `agent` |
| Planejar pré-produção de vídeo | `preproducao/` | `agent` |
| Coordenar produção em set | `producao/` | `agent` |
| Elaborar proposta comercial | `proposta/` | `agent` |
| Prospectar novo cliente | `prospeccao/` | `agent` |

---

## 📋 Padrão de Metadados (YAML Frontmatter)

Todo `SKILL.md` deve iniciar com o seguinte frontmatter:

```yaml
---
name: "Nome Legível da Skill"
category: "antigravity | conteudo | gestao | graphify | humanizador | preproducao | producao | proposta | prospeccao"
mode:
  - agent    # Lida diretamente como contexto pelo Claude
  - app      # Possui endpoint correspondente no Oráculo-App
  - cli      # Possui script de terminal local
dependencies: []   # ex: ["markitdown", "remotion", "n8n-mcp"]
routes_to: []      # Skills complementares que podem ser ativadas em sequência
oraculo_endpoint: ""  # ex: /api/skills/markitdown (se mode inclui 'app')
---
```

---

## 🔄 Protocolo de Uso para o Agente

1. **Identifique** o tipo de tarefa pela tabela acima.
2. **Leia o SKILL.md** da skill correspondente com `view_file`.
3. **Siga as instruções** da skill para executar a tarefa.
4. **Se houver decisão arquitetural complexa**, ative primeiro `antigravity/llm-council`.
5. **Ao criar uma nova skill**, atualize este índice com uma linha na tabela de roteamento.

---

*Última atualização: 2026-06-12 | Versão: 2.0 | Mantido por: Antigravity*
