# Guia de Ativação — Obsidian MCP + NotebookLM MCP
## Firma Abacaxi · Oráculo · Mai 2026

---

## Status atual

| MCP | Instalado | Configurado | Autenticado |
|---|---|---|---|
| mcp-obsidian | ✅ npm global | ✅ .mcp.json | ✅ sem login (lê vault direto) |
| notebooklm | ✅ uv + repo clonado | ✅ .mcp.json | ⬜ precisa login Google |

---

## PASSO 1 — Autenticar o NotebookLM (5 min)

O NotebookLM usa automação de browser. A autenticação precisa ser feita **uma vez** num terminal interativo.

### Como fazer:

1. Abra o **Terminal do VS Code** (`Ctrl + '`) ou um PowerShell normal
2. Cole e execute:

```powershell
$env:PATH = "$env:USERPROFILE\.local\bin;$env:PATH"
Set-Location "$env:USERPROFILE\mcp-servers\notebooklm-mcp"
uv run notebooklm login
```

3. Um browser vai abrir com a página de login do Google
4. Faça login com **firmaabacaxi@gmail.com**
5. Aguarde até ver a **homepage do NotebookLM** no browser
6. Volte para o terminal e **pressione ENTER**
7. O browser fecha e o token fica salvo em `C:\Users\User\.notebooklm\`

> Depois disso o NotebookLM MCP funciona automaticamente — não precisa logar de novo.

---

## PASSO 2 — Reiniciar o Claude Code

Após autenticar, **feche e reabra o Claude Code** para os novos MCPs aparecerem disponíveis.

---

## PASSO 3 — Testar o Obsidian MCP

O Obsidian MCP lê o vault direto do disco — **não precisa do app Obsidian aberto**.

Diga para o Oráculo:
> "Lê o vault do Obsidian e lista as notas da pasta 05-APRENDIZADOS"

O vault está em:
```
C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO\
```

---

## PASSO 4 — Testar o NotebookLM MCP

Após autenticar, diga:
> "Lista meus notebooks no NotebookLM"

---

## O que muda com esses MCPs ativos

### Obsidian MCP — o que o Oráculo consegue fazer:

- Ler qualquer nota do vault `CEREBRO-ORACULO`
- Escrever notas de aprendizado em `05-APRENDIZADOS/`
- Salvar roteiros gerados direto em `03-TECNICAS/` ou `02-TEMPLATES/`
- Buscar por conteúdo dentro das notas

### NotebookLM MCP — o que o Oráculo consegue fazer:

- Listar todos os notebooks da conta Google da Firma
- Criar novos notebooks (ex: um por cliente)
- Adicionar fontes (briefings, PDFs, URLs)
- Consultar com respostas baseadas exclusivamente no que foi alimentado
- Gerar podcasts, mapas mentais, relatórios a partir dos notebooks

---

## Fluxo completo com os dois MCPs

```
BRIEFING COM CLIENTE
   ↓
Oráculo cria notebook no NotebookLM com transcrição/anotações do briefing
   ↓
Para gerar proposta: consulta NotebookLM → respostas baseadas no briefing real
   ↓
Proposta gerada → Oráculo salva rascunho em nota no Obsidian (05-APRENDIZADOS)
   ↓
Aprendizado registrado → fica disponível para projetos futuros
```

---

## Configuração técnica

Os MCPs estão configurados em:
- `.mcp.json` — definição dos servidores
- `.claude/settings.local.json` — MCPs habilitados (obsidian + notebooklm)

Binários:
- `mcp-obsidian` → `C:\Users\User\AppData\Roaming\npm\mcp-obsidian`
- `notebooklm server.py` → `C:\Users\User\mcp-servers\notebooklm-mcp\`
- `uv` → `C:\Users\User\.local\bin\uv.exe`

---

*Documento gerado pelo Oráculo · Mai 2026*
