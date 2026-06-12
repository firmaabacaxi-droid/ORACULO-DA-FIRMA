---
name: "MarkItDown Parser — Conversor de Documentos para Markdown"
category: "antigravity"
mode:
  - cli
  - app
dependencies: ["markitdown", "python>=3.8"]
routes_to: ["antigravity/cinematic-script-writer", "antigravity/budget-planner"]
oraculo_endpoint: "/api/skills/markitdown"
---

# SKILL — MarkItDown Parser
## Conversão Inteligente de Documentos para Markdown
*Use esta skill para converter PDFs, PPTX, XLSX, DOCX e outros formatos para Markdown limpo, reduzindo consumo de tokens e melhorando a precisão da IA.*

---

## 🎯 Quando Usar Esta Skill

- O usuário quer que a IA leia um PDF extenso (orçamento, contrato, roteiro)
- Há um PPTX de briefing do cliente que precisa virar contexto para o agente
- Planilhas Excel com dados financeiros precisam ser analisadas
- Você quer salvar um documento no Cérebro Obsidian em formato legível por IA

---

## 📦 Instalação (Uma Vez)

```bash
# Instalar o MarkItDown da Microsoft
pip install markitdown

# Verificar instalação
markitdown --version
```

---

## 🖥️ Uso via CLI (Modo Agent/Local)

### Converter um arquivo específico:
```bash
# PDF para Markdown
markitdown "C:\caminho\para\arquivo.pdf" > "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\docs\arquivo.md"

# PowerPoint para Markdown
markitdown "C:\caminho\para\apresentacao.pptx" > "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\docs\apresentacao.md"

# Excel para Markdown (tabelas)
markitdown "C:\caminho\para\planilha.xlsx" > "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\docs\planilha.md"
```

### Script de conversão em lote:
```bash
# Converter todos os PDFs de uma pasta
Get-ChildItem -Path "C:\Downloads" -Filter "*.pdf" | ForEach-Object {
    $output = "C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\docs\$($_.BaseName).md"
    markitdown $_.FullName > $output
    Write-Host "Convertido: $($_.Name) -> $output"
}
```

---

## 🌐 Uso via Oráculo-App (Endpoint)

O Oráculo-App expõe o endpoint `POST /api/skills/markitdown` que aceita:

```json
{
  "filePath": "/caminho/absoluto/para/arquivo.pdf",
  "projectId": "notion-project-id",
  "saveToObsidian": true,
  "obsidianPath": "docs/nome-do-arquivo.md"
}
```

**Resposta:**
```json
{
  "success": true,
  "markdownContent": "# Título do Documento\n...",
  "savedPath": "/cerebro/docs/nome-do-arquivo.md",
  "tokenEstimate": 1250,
  "compressionRatio": "4.2x"
}
```

---

## 🧠 Integração com o Agente Claude

Após a conversão, o agente pode ler o arquivo `.md` resultante diretamente com `view_file`, consumindo uma fração dos tokens que custaria analisar o PDF original.

**Fluxo recomendado:**
1. Usuário menciona "analise este contrato" + sobe um PDF
2. Agente chama `markitdown` para converter
3. Arquivo `.md` salvo em `cerebro/docs/`
4. Agente lê o `.md` e procede com a análise

---

## 📊 Estimativa de Economia de Tokens

| Formato Original | Tamanho Típico | Tokens Originais | Tokens pós-MarkItDown | Economia |
|---|---|---|---|---|
| PDF (texto) | 500KB | ~15,000 | ~3,500 | **77%** |
| PPTX | 2MB | ~8,000 | ~2,000 | **75%** |
| XLSX | 1MB | N/A (binário) | ~1,500 | **100%** |
| DOCX | 300KB | ~5,000 | ~2,800 | **44%** |

---

## ⚠️ Limitações

- PDFs com **imagens/scans** (sem texto) precisam de OCR adicional (use `markitdown --use-llm` com uma API key)
- Documentos com **tabelas muito complexas** podem perder formatação — revisar sempre
- Arquivos **protegidos por senha** precisam ser desbloqueados antes

---

## 🔗 Referências

- [Microsoft MarkItDown GitHub](https://github.com/microsoft/markitdown)
- [Tutorial de Economia de Tokens](https://docs.google.com/document/d/1ghykAZEupv7dcrJ64bvVUt42ZaGyPt44yHCybiWrsTg/mobilebasic)
