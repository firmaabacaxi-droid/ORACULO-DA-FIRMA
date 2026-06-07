# Sessão 3 de Junho — Bloco B (Orçamento) — FAC 2026

**Data:** 3 jun 2026  
**Projeto:** Todas as Histórias do Mundo (solo circo + videoprojeção mapeada)  
**Responsável:** Filipe Duque (Lipe) + Oráculo (Claude)  
**Resultado:** Bloco B finalizado — planilha orçamentária em Módulo II (R$ 199.300)

---

## Aprendizados da Sessão

### 1. Fluxo de Revisão de Orçamento em Conversação

**Padrão testado e validado:**
- ✅ Conversa natural em português > cálculos de impacto > validação de limites legais > pacote de equilíbrio
- Usuária dita todos os ajustes sem sintaxe estruturada ("aumenta trilha pra oito mil", "adiciona direção na montagem") → Oráculo processa, resgata, agrupa
- **Lição:** Não precisa de formulário ou JSON — conversa direta é mais eficiente
- **Tempo total:** ~1h30 de conversa + cálculos

### 2. Gestão de Restrições Orçamentárias

**Desafio:** 20 mudanças pedidas empurraram total de R$194.600 → R$223.400 (R$23.400 acima do teto)  
**Solução aplicada:** Pacote de equilíbrio (16 micro-ajustes) sem remover nada que Lipe pediu
- Reduções foram em itens secundários ou que puderam ser absorvidos (prep corporal nos ensaios, aluguéis levemente reduzidos)
- Resultado final: R$199.300 (R$700 de folga)

**Lição crítica:** Fazer ajustes em pacote (não individuais) evita ping-pong infinito. Apresentar opções de equilíbrio previamente calcula (3 semanas, 4 meses, etc.) economiza negociações.

### 3. Quantidades Assumidas vs. Confirmadas

**Quando a usuária não especifica quantidade:**
- Operador de cena (pré): assumi 4 semanas → confirmado (R$1.500×4 = R$6.000)
- Assistente de produção: assumi 6 meses → reduzido para 4 meses (R$1.500×4 = R$6.000)
- Registro de processo: assumi 6 semanas → reduzido para 3 semanas (R$1.500×3 = R$4.500)
- Fotografia: confirmado 4 diárias (R$1.500 cada)

**Lição:** Pedir confirmação de 3-4 quantidades-chave antes de calcular total economiza rodadas de correção. Usar AskUserQuestion com opções pré-calculadas acelera validação.

### 4. Separação de Papéis: Direção em 3 Etapas

**Insight do Lipe:** Direção não é um item único — é 3 atividades diferentes:
1. **Direção — Criação** (Pré-Produção): concepção dramatúrgica, estrutura da encenação → R$10.000
2. **Direção — Montagem** (Produção): ensaios, marcação, integração técnica → R$10.000
3. **Direção — Acompanhamento apresentações** (Produção): manutenção da qualidade → R$700×6

**Lição:** Reler descrições de itens antes de assumir que "direção = 1 cachê". Perguntar "isso tem fases?" para trabalhos complexos.

### 5. Equipamentos Inclusos vs. Separados

**Decisão que mudou a planilha:** "Media server e software de videomapping já estão inclusos no cachê do videomapper"  
- Removeu R$4.000 do orçamento sem cortar capacidade técnica
- **Lição:** Clarifique com profissionais o que está incluído no seu cachê. R$8.000 de videomapping (com ferramentas) ≠ R$8.000 de criação de conteúdo (sem ferramentas).

### 6. Priorização em Acessibilidade

Usuária pediu **aumento de audiodescrição** (R$2.500 → R$3.500) e manteve **Libras em 2 sessões**:
- Justificativa explícita: sistema de transmissão é parte crítica da audiodescrição
- **Lição:** Acessibilidade virou negociável como qualquer outro item, mas com narrativa clara (por quê?)

### 7. Documentação Multicanal Essencial

Bloco B finalizou em **3 camadas:**
1. **Arquivo Excel no Drive** (manipulável, com fórmulas automáticas)
2. **Sumário na página Notion** (para visualização rápida)
3. **Memória no .claude/projects** (para continuidade entre sessões)
4. **Vault Obsidian (cérebro)** (para consulta local sem internet)

**Lição:** Um arquivo em um lugar único (Excel online) é insuficiente. Redundância controlada em 3 camadas = segurança de acesso.

---

## Workflow que Funcionou (Template para próximas revisões)

### Fase 1: Entrada da Conversação
Usuária fala livremente, sem sintaxe estruturada, sobre todas as mudanças. Oráculo escuta, não interrompe.

### Fase 2: Processamento
1. Agrupar mudanças por tipo (NOVO, REMOVIDO, AJUSTE)
2. Calcular impacto de cada uma
3. Somar total
4. Checar se cabe no teto (Módulo II R$200k)

### Fase 3: Validação
Se não cabe, apresentar opções de equilíbrio **com números previamente calculados**:
- "Se operador = 3 sem em vez de 4: economiza R$1.500"
- "Se assistente = 3 meses: economiza R$1.500"
- etc.

### Fase 4: Confirmação de Quantidades
Usar **AskUserQuestion** com 4 opções pré-calculadas para cada quantidade incerta.

### Fase 5: Geração do Arquivo
Gerar Excel com script Python (openpyxl), testar números, reenviar ao Drive.

### Fase 6: Sincronização
Atualizar Notion (sumário), memória, cérebro, GitHub.

---

## Números Finais (Bloco B)

| Item | Valor |
|---|---|
| Pré-Produção (8 itens) | R$ 49.500 |
| Produção (19 itens) | R$ 97.300 |
| Pós-Produção (11 itens) | R$ 52.500 |
| **TOTAL** | **R$ 199.300** |

**Limites legais:**
- Proponente (Filipe, PF): R$ 30.000 = 15,1% (máx 30%) ✅
- Divulgação: R$ 20.000 = 10,0% (5–20%) ✅
- Administrativas: R$ 14.000 = 7,0% (máx 15%) ✅

**Margem no Módulo II:** R$ 700

---

## Próximos Passos (não fazem parte desta sessão)

- **Bloco C:** Cronograma (Anexo IX) — 3 fases, 6–12 meses
- **Bloco D:** Roteiro detalhado + Memorial de Direção de Arte (PDFs)
- **Bloco E:** Checklist final + envio (5 jun 23h59)

---

## Arquivos Gerados/Atualizados

| Local | Arquivo | Status |
|---|---|---|
| Google Drive | ANEXO-IV-Planilha-Orcamentaria-Todas-as-Historias-do-Mundo.xlsx | ✅ 38 itens, R$199.300 |
| Notion | 💰 BLOCO B — ORÇAMENTO (página) | ✅ sumário atualizado |
| Memória (.claude) | fac2026_bloco_b_orcamento.md | ✅ números finais |
| Cérebro (Obsidian) | SESSAO-3JUN-BLOCO-B-ORCAMENTO.md | ✅ este arquivo |
| GitHub | (ainda não feito) | ⏳ commit pendente |

---

## Observações Críticas para Continuidade

1. **Excel é fonte de verdade** — todos os totais recalculam em E15 e E17 automaticamente. Atualizar sempre lá primeiro.
2. **Noção é sumário** — reflete o que está no Excel, não é lugar para editar valores.
3. **Memória garante continuidade** — se iniciar nova sessão, ler MEMORY.md antes de tocar em nada.
4. **GitHub é backup** — qualquer mudança deve ser commitada depois.

---

**Sessão concluída:** 3 jun 2026, ~14h  
**Próxima sessão:** Bloco C (cronograma)  
**Status:** Pronto para acessar de qualquer máquina via GitHub
