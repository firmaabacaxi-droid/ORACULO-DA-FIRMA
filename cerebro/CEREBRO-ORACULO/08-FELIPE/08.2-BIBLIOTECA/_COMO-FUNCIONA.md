# Biblioteca do Felipe — Como funciona o pipeline

Cada livro ou curso que o Felipe lê pode virar um sumário estruturado aqui, gerado com apoio do **Google NotebookLM** (como já fizemos com as apostilas de marketing digital).

## O pipeline

```
1. CAPTURA    Felipe termina (ou está lendo) um livro
              → manda no Telegram: "livro: [título]" + fotos/PDF/anotações se tiver

2. NOTEBOOK   Oráculo cria/usa o notebook "Biblioteca Felipe" no NotebookLM
              → adiciona as fontes disponíveis (PDF, anotações, resenhas públicas)
              → comando: /notebooklm

3. SUMÁRIO    Oráculo gera o sumário estruturado (template abaixo)
              → salva como nota aqui em 08.2-BIBLIOTECA/Livro-Titulo.md

4. SÍNTESE    /wiki-ingest na nota → conceitos viram nós na wiki
              → aparecem no grafo conectados aos projetos e estudos

5. RETORNO    NotebookLM pode gerar áudio-resumo para ouvir dirigindo
              → e o conceito reaparece quando um projeto da Firma pedir
```

## Template de nota de livro

```markdown
---
type: livro
titulo:
autor:
ano-leitura: 2026
tema: [junguiano | tarô | marketing | narrativa | audiovisual | outro]
notebooklm: [id do notebook, se houver]
status: [lendo | sumarizado | absorvido-na-wiki]
---

# [Título] — [Autor]

## Em uma frase
## 3-5 conceitos centrais
## Citações que importam
## Aplicações ao audiovisual / à Firma
## Conexões ([[wikilinks]] para projetos, estudos, outros livros)
```

## Piloto sugerido

Começar com **um livro de Jung/arquétipos** que o Felipe escolher — máxima sinergia com o FAC-2026 e a skill narrativa-documental. *(Felipe: qual o primeiro?)*

---
*Voltar ao hub: [[08-FELIPE/_INDEX|08-FELIPE]] · Skill: `/notebooklm` · Visão: [[VISAO-ORACULO]]*
