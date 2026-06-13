---
data: 2026-06-12
tipo: log-sessao
sessao: 26
assunto: Integração do Google Drive em tempo real e Busca Global ⌘K no Oráculo App
status: concluido
---

# Sessão 26 — Google Drive & Busca Global ⌘K

## Contexto
Dando prosseguimento ao roadmap da plataforma do Oráculo (`oraculo-app`), implementamos duas melhorias fundamentais de produtividade e centralização exigidas:
1. **Google Drive Visual Explorer**: Visualização direta de arquivos locais/nuvem do Drive no painel do projeto em tempo real.
2. **Busca Global ⌘K**: Atalho universal para pesquisar rapidamente entre bases do Notion e arquivos da wiki local (Cérebro).

## O que foi feito

### 1. Visualizador de Arquivos do Google Drive (Pós-produção e Onboarding)
- **Visualizador em Tempo Real**: Na aba "Visão Geral" do projeto (`ClientProjectDetails.tsx`), adicionamos uma seção de arquivos conectada ao Drive.
- **Service Account**: Carrega dinamicamente a pasta oficial associada à propriedade "Pasta no Drive" do Notion do projeto.
- **Design de Grade Premium**: Exibe arquivos com ícones correspondentes (`image`, `video`, `pdf`, `document`, `folder`, `other`) e miniaturas de alta qualidade para imagens.
- **Upload Direto**: Formulário integrado de upload permitindo arrastar ou escolher arquivos locais para serem colocados diretamente na pasta do projeto no Drive.
- **Auto-Configuração**: Para projetos criados manualmente sem link do Drive, adicionamos o botão "Criar Estrutura de Pastas no Drive" que automatiza a criação do diretório master `FIRMA-XX-[Nome]` + subpastas e atualiza a URL correspondente no Notion.

### 2. Busca Global Unificada (Ctrl+K / ⌘K)
- **API `/api/search/route.ts`**: Consulta e combina resultados da Notion Search API (busca inteligente em Obras, Clientes, Contatos, Tarefas e Propostas) com buscas recursivas por texto no vault Obsidian (Wiki), gerando snippets do conteúdo onde a palavra foi encontrada.
- **Componente `SearchModal.tsx`**: Interface flutuante glassmorphic, com suporte completo a atalho global (`Ctrl+K` ou `⌘K`), navegação por teclado (setas, enter, esc) e agrupamento visual de resultados por fonte.
- **Barra de Navegação**: Incorporado o botão de busca na barra de topo global (`Sidebar.tsx`), facilitando o acesso rápido de qualquer tela.

### 3. Validação Técnica
- **Build de Produção**: Executada a compilação completa (`npm run build`) no Next.js com 0 erros de compilação ou do compilador TypeScript.

## Aprendizados e Decisões Técnicas
- **Turbopack Tracing**: Configurações de acesso recursivo de arquivos no backend exigiram escopo local estático para evitar alertas de rastreamento geral do projeto Turbopack.
- **Filtro de IDs de DB**: Remover os hífens nos IDs do Notion (`.replace(/-/g, '')`) simplificou o mapeamento rápido de resultados do search para rotas locais do app (ex: `/projetos/[id]`).

## Próximos passos
- Configurar bot de captura Telegram integrado ao n8n para ingestão automática em `/00-INBOX/`.
- Testar e homologar o fluxo local antes de mesclar a branch `consolidacao-monorepo` na master.
- Inserir o primeiro livro digital na biblioteca pessoal.
