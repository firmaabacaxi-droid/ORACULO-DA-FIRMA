# Aprendizado — Base de Marketing Digital · 2026-05-22

**Tipo:** Operacional — construção de base de conhecimento
**Sessão:** Extração NotebookLM → Obsidian
**Status:** Concluído ✅

---

## O que aconteceu

Primeira extração sistemática de apostilas de marketing digital para o cérebro do Oráculo. O conteúdo estava no NotebookLM (notebook "Oráculo da Firma") mas nunca tinha sido estruturado no vault.

**Fontes processadas:**
- "O Superpoder" — Paulo Cuenca (10 módulos — estratégia de conteúdo orgânico no Instagram)
- Apostila Lightcopy 2023 (copywriting sem gatilhos forçados)

**6 notas criadas em** `04-REFERENCIAS/marketing-digital/`:
- `01-fundamentos` — funil, 5 graus de consciência, avatar, Primal Branding
- `02-trafego-pago` — criativos, cegueira de banner (expandir com apostilas de Ads)
- `03-conteudo-organico` — algoritmo, I.A.E., formatos, calendário editorial
- `04-copywriting` — Light Copy, QFD, Marketing de Premissas, storytelling
- `05-email-marketing` — plataformas de domínio, copy de captura, assuntos de e-mail
- `06-vendas-conversao` — ancoragem, objeções, QFD na proposta

---

## O que funcionou bem

- Extração temática via `notebooklm ask` com perguntas estruturadas por tema funciona muito bem — respostas ricas e com referências numeradas
- Fazer uma pergunta por tema (não tudo de uma vez) deu profundidade a cada nota
- Adaptar cada nota com seção "Aplicação na Firma Abacaxi" torna o conhecimento imediatamente acionável
- O merge de cookies via Python resolveu a autenticação sem precisar de nova sessão

## O que não funcionou / Gaps identificados

- **Tráfego pago ausente:** os módulos são 100% focados em orgânico. A nota `02-trafego-pago` está incompleta — precisa de apostila específica de Meta Ads
- **Autenticação do Playwright travou** em Windows por falta de `--no-sandbox` — perdeu ~1h antes de diagnosticar
- Cookie-Editor não captura todos os cookies necessários — o merge com o `storage_state.json` existente foi essencial

---

## O que faríamos diferente

- Antes de qualquer sessão de extração: verificar autenticação com `notebooklm auth check` logo no começo
- Perguntar ao Lipe/Jaya quais apostilas estão no NotebookLM antes de iniciar (economiza tempo de exploração)

---

## Regras e processos gerados

### Fluxo de extração de apostila para o cérebro

```
1. notebooklm auth check → se falhar: notebooklm login
2. notebooklm list → identificar notebook correto
3. notebooklm source list --notebook <ID> → mapear fontes
4. notebooklm use <ID>
5. Para cada tema: notebooklm ask "[pergunta estruturada]" --new
6. Criar nota em 04-REFERENCIAS/[categoria]/ com seções:
   - Conceitos fundamentais
   - Frameworks e metodologias
   - Aplicação na Firma Abacaxi
   - Referências e exemplos
7. Atualizar _INDEX.md da categoria
```

### Fix Playwright no Windows (permanente)
Arquivo: `C:\Users\User\mcp-servers\notebooklm-mcp\.venv\Lib\site-packages\notebooklm\cli\session.py`
Adicionar às `args` do `launch_persistent_context`:
```python
"--no-sandbox",
"--disable-dev-shm-usage",
```

### Re-autenticação sem browser (emergência)
Se `notebooklm login` falhar completamente:
1. Instalar Cookie-Editor no Chrome
2. Acessar notebooklm.google.com logado
3. Exportar cookies como JSON
4. Colar no Oráculo → ele faz o merge com `storage_state.json` via Python

---

## Próximos passos para esta base

- [ ] Adicionar apostilas de Meta Ads/tráfego pago ao NotebookLM → expandir `02-trafego-pago.md`
- [ ] Usar `04-copywriting.md` na próxima proposta (metodologia QFD + Marketing de Premissas)
- [ ] Testar o fluxo de derivação de conteúdo de `03-conteudo-organico.md` no calendário editorial da Firma

---

#aprendizado #operacional #notebooklm #marketing-digital #base-conhecimento
