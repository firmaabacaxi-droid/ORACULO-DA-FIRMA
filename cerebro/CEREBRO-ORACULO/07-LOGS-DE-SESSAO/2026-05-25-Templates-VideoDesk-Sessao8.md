# Sessão 8 — Templates de Produção do Video Desk
*25/05/2026 · Análise e incorporação de referência externa*

---

## O que aconteceu

Analisamos via MCP Notion o template "Video Desk 1.0" — um sistema de gestão de produção audiovisual com estrutura de pré-produção, produção e pós-produção. Extraímos os documentos e fluxos mais relevantes e incorporamos ao sistema do Oráculo.

---

## O que o Video Desk tinha que nós não tínhamos

### 1. Ordem do Dia como documento formal

Nossa ETAPA 4 da skill de pré-produção tinha apenas regras de otimização de ordem (golden hour, agrupamento por locação). O Video Desk revelou que a Ordem do Dia é um documento estruturado com 5 seções:

- **Cabeçalho completo**: Produtor, Diretor, AD, Título, Data, Clima, Call time, Almoço, Endereço, **Hospital mais próximo**
- **Seção 1 — Equipe Técnica**: tabela com Função / Nome / Contato / Endereço de cada membro
- **Seção 2 — Planos de Câmera**: por cena — descrição, local, personagens, equipamentos, plano de câmera, notas
- **Seção 3 — Locações e Logística**: por locação — previsão do tempo, endereço, tempo estimado, estacionamento, contato
- **Seção 4 — Cronograma de Filmagem**: por cena — horário, local, personagem, equipamentos, descrição
- **Seção 5 — Observações Gerais**

**Insight crítico**: o campo "Hospital mais próximo" é padrão em produções profissionais — nunca omitir.

### 2. Log de Filmagem vs. Diário de Filmagem

Tínhamos um "Diário de Filmagem" genérico. O Log de Filmagem é diferente e complementar:

- O **Diário** registra o dia em termos gerais: equipe, ocorrências, pendências
- O **Log** registra cada take individualmente: Cena | Plano | # | OK/NG | Válido? | Horário | Duração | Observações
- O Log é o que o editor realmente precisa para decupar o material

### 3. Dois tipos de roteiro com usos distintos

Tínhamos apenas um formato de roteiro. O Video Desk usa dois:

| Formato | Quando | Colunas/Campos |
|---------|--------|----------------|
| **Roteiro Literário** | Documentários, institucionais, narrativa | Cabeçalho + CENA × Visual × Áudio × Locução × Texto na tela × Notas |
| **Roteiro Técnico** | Comerciais, redes sociais, múltiplas peças | Tabela: Cena × Tempo × Imagem × Som × Locução × Lettering × Motion × Decupagem |

O **Lettering** (texto sobreposto) e o **Motion** (animações) são colunas do Roteiro Técnico — fundamentais para vídeos de redes sociais e comerciais, onde a identidade visual é parte do produto final.

### 4. Pós-Produção com 10 fases definidas

O sistema não tinha nada estruturado sobre pós-produção. O Video Desk revelou:

```
1. Decupagem → 2. Montagem → 3. Sonorização → 4. Colorização → 5. Legendagem
→ 6. Aprovação Interna → 7. Ajustes Diretor → 8. Aprovação Cliente
→ 9. Ajustes Cliente → 10. Entrega Final
```

A separação entre "Aprovação Interna" (Lipe + Jaya revisam) e "Aprovação do Cliente" (envio externo) é importante — evita enviar ao cliente algo que a equipe ainda não validou.

### 5. Checklist de Pré-Produção como 11 etapas de projeto

O Video Desk usa a pré-produção como um banco de dados com 11 etapas rastreadas individualmente:
Briefing → Pesquisa de Referências → Roteiro Literário → Roteiro Técnico → Storyboard → Locações e Permissões → Produção de Elenco → Produção de Arte → Equipe e Equipamentos → Cronograma → Orçamento

---

## O que decidimos NÃO incorporar (e por quê)

| Item | Motivo |
|---|---|
| Storyboard | Muito visual — não se traduz bem em Markdown |
| Pesquisa de Referências / Moodboard | Melhor gerenciado diretamente no Notion (galeria de imagens) |
| Produção de Elenco | Não é foco atual da Firma (não trabalham com atores contratados) |
| Produção de Arte | Específico demais por projeto para virar template |

---

## O que mudou (arquivos)

| Ação | Arquivo |
|------|---------|
| Atualizado | `skills/preproducao/SKILL.md` — +checklist 11 etapas, +Roteiro Técnico (tabela), +Roteiro Literário com header, ETAPA 4 → Ordem do Dia completa |
| Atualizado | `skills/producao/SKILL.md` — +Log de Filmagem, +Pós-Produção 10 fases |
| Criado | `cerebro/01-FIRMA/TEMPLATES/Template-Ordem-do-Dia.md` |
| Criado | `cerebro/01-FIRMA/TEMPLATES/Template-Log-Filmagem.md` |
| Criado | `cerebro/01-FIRMA/TEMPLATES/Template-Roteiro-Literario.md` |
| Criado | `cerebro/01-FIRMA/TEMPLATES/Template-Roteiro-Tecnico.md` |

---

## Tags

#aprendizado #processo #preproducao #producao #templates #videodesk #roteiro #ordemdodia #log #sessao8
