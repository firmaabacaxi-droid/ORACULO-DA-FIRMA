# SKILL — Produção
## Documentação de set e acompanhamento de filmagem
*Skill simples — executa diretamente*

---

## Quando esta skill é ativada

- "Vou filmar amanhã, me ajuda a preparar"
- "Precisa de um diário de filmagem"
- "Como documentar o material bruto?"
- "Checklist para o dia de filmagem"
- "Ficha de continuidade"
- "Boletim de câmera"

---

## Skills do Antigravity — quando acionar

| Situação | Skill |
|---|---|
| Configuração técnica rápida on-set | `skills/antigravity/photography-settings/SKILL.md` — exposição, hiperfocal, golden hour |
| Montar ou revisar automação de backup | `skills/antigravity/automation-workflows/SKILL.md` — trigger pós-filmagem → cópia automática para Drive |

---

## CHECKLIST DO DIA ANTERIOR

```
LOGÍSTICA
[ ] Confirmar horário e endereço com cliente
[ ] Confirmar equipe (quem vai, horário de encontro)
[ ] Checar previsão do tempo (para externas)
[ ] Reservar estacionamento se necessário
[ ] Confirmar alimentação (quem leva o quê)

EQUIPAMENTOS
[ ] Carregar todas as baterias
[ ] Formatar cartões de memória (após backup)
[ ] Testar áudio e vídeo
[ ] Montar e testar gimbal / steadicam
[ ] Verificar estado do drone (bateria, hélices)
[ ] Separar tudo em caixas organizadas

PRODUÇÃO
[ ] Imprimir ou ter no celular: roteiro + decupagem
[ ] Lista de cenas obrigatórias
[ ] Contato do cliente para o dia
[ ] Endereços das locações com rota
```

---

## FICHA DE CONTINUIDADE (raccord visual entre planos)

Use quando há **múltiplos planos da mesma cena** gravados em momentos diferentes, especialmente quando há figurino específico, maquiagem ou props que precisam estar idênticos.

**Diferença do Log:**
- **Log** → rastreia takes individuais (qual take usar na edição)
- **Ficha** → rastreia raccord visual (figurino, maquiagem, props entre planos montados juntos)

```markdown
## CENA [N] — Plano [X]

| Take | Dur. | ✓ | Foco | Som | Raccord | Notas |
|---|---|---|---|---|---|---|
| 1 | | | ✓ | ✓ | | |
| **TAKE APROVADO:** | | | | | | |

**Figurino (take aprovado):** [Personagem]: [descrição detalhada — mão esquerda na cintura, camiseta solta]
**Props:** [Objeto] em [posição exata]
**Foto de continuidade:** ☐ Tirada · Referência: ___
```

Template completo: `cerebro/01-FIRMA/TEMPLATES/Template-Ficha-Continuidade.md`
Salve em: `output/roteiros/NomeCliente_ficha-continuidade_YYYYMMDD.md`

---

## BOLETIM DE CÂMERA E SOM (para produções maiores)

Use para produções com **2+ câmeras** ou **equipe técnica dedicada**.
Registra metadados por take: lente, t-stop, ND, cartões, qualidade de áudio, DIT checklist.

```markdown
| Plano | Cena | Câm. | Take aprv. | Lente | T-stop | ND | Obs. |
|---|---|---|---|---|---|---|---|
| A001 | | A | | mm | f/ | | |
```

**Regra de backup (DIT):** mínimo 2 backups em destinos físicos diferentes antes de apagar qualquer cartão.

Template completo: `cerebro/01-FIRMA/TEMPLATES/Template-Boletim-Camera-Som.md`
Salve em: `output/roteiros/NomeCliente_boletim_YYYYMMDD.md`

---

## LOG DE FILMAGEM (registro de takes)

Use durante o set para controlar cada take gravado. Mais preciso que o Diário para uso na edição.

Salve em: `output/roteiros/NomeCliente_log_[data].md`

```markdown
# LOG DE FILMAGEM — [Projeto] — [Data]

## Planilha de Takes

| Cena | Plano | # | Take | Válido? | Horário | Duração | Observações |
|------|-------|---|------|---------|---------|---------|-------------|
| 1A | Médio | 1 | OK | Sim | 09:00 | 00:45 | [notas] |
| 1A | Médio | 2 | NG | Não | 09:02 | 00:47 | [motivo do NG] |
| 1B | Close | 1 | OK | Sim | 09:05 | 00:30 | [notas] |
```

**Legenda:** OK = take aprovado · NG = take reprovado · Válido = usar na edição

---

## DIÁRIO DE FILMAGEM

Registre durante ou ao final de cada dia:

```markdown
# Diário de Filmagem — [Projeto] — [Data]

**Equipe presente:** [nomes]
**Locações do dia:** [lista]
**Horas de filmagem:** [início] às [fim]

## Cenas gravadas

| Cena | Status | Observações |
|---|---|---|
| [nome] | ✅ OK / ⚠️ Repetir / ❌ Não gravada | [notas] |

## Material gravado

- Cartão 1: [descrição do conteúdo]
- Cartão 2: [descrição do conteúdo]
- Total de material: [horas estimadas]

## Ocorrências do dia

[Qualquer coisa relevante: problema de luz, cliente pediu mudança,
 cena que não funcionou como planejado, ideia nova que surgiu no set]

## Pendências

- [ ] [o que ficou faltando gravar]
- [ ] [o que precisa ser resolvido antes do próximo dia]

## Backup

- [ ] Material copiado para HD externo
- [ ] Material na nuvem (Drive)
- [ ] Cartões prontos para próxima filmagem
```

---

## REGRA DE ALTERAÇÕES — aplicar no set

```
Até 2 alterações solicitadas pelo cliente durante a produção: sem custo adicional.
A partir da 3ª alteração: gera aditivo no orçamento.

Quando o cliente pedir uma 3ª alteração:
→ Não diga não. Diga: "Posso fazer isso, vai gerar um custo adicional de R$[valor].
  Confirmo a solicitação?"
→ Registre no diário de filmagem.
→ Gere aditivo via skills/proposta/SKILL.md.
```

---

## PÓS-PRODUÇÃO — 10 fases

Acompanhe o projeto da edição à entrega final. Cada fase tem um responsável e um prazo.

```
Fase 1 — Decupagem
  → Selecionar e organizar material bruto. Identificar takes válidos (Log de Filmagem).
  → Output: lista de takes aprovados por cena.

Fase 2 — Montagem
  → Primeira versão da edição seguindo o roteiro. Estrutura narrativa alinhada.
  → Output: corte bruto para revisão interna.

Fase 3 — Sonorização
  → Inserção de trilha, efeitos sonoros, ajustes de áudio (níveis, EQ, ruídos).
  → Output: versão com áudio tratado.

Fase 4 — Colorização
  → Correção e tratamento de cor. Identidade visual e estética do vídeo.
  → Output: versão colorizada.

Fase 5 — Legendagem (se necessário)
  → Criação e inserção de legendas (PT/EN). Revisar timing e ortografia.
  → Output: versão legendada.

Fase 6 — Versão para Aprovação Interna
  → Material revisado pela equipe (Lipe + Jaya) antes de enviar ao cliente.
  → Output: versão para aprovação interna.

Fase 7 — Ajustes do Diretor
  → Implementar correções após revisão interna.
  → Output: versão refinada.

Fase 8 — Versão para Aprovação do Cliente
  → Enviar ao cliente via Drive / WeTransfer / Frame.io.
  → Registrar no Notion (ENTREGA_FEEDBACK) data de envio e link.
  → Output: versão cliente V1.

Fase 9 — Ajustes do Cliente
  → Implementar feedback do cliente. Máx. 2 rodadas sem custo adicional.
  → Se 3ª rodada: gerar aditivo via skills/proposta/SKILL.md.
  → Output: versão ajustada.

Fase 10 — Entrega Final
  → Arquivo masterizado (formato, resolução e codec conforme contratado).
  → Registrar no Notion: data de entrega, link do arquivo, aprovação final.
  → Arquivar projeto no Drive. Emitir NF.
```

---

## PÓS-FILMAGEM — entrega para edição

Ao terminar a filmagem, organize o material para Lipe editar:

```
NOMENCLATURA DE ARQUIVOS
NomeProjeto_cena[número]_take[número]_[descricao].mp4
Exemplo: CNV_cena03_take02_entrevista-diretor.mp4

ESTRUTURA DE PASTA
[Projeto]/
├── GRAVAÇÕES/
│   ├── Cena01/
│   ├── Cena02/
│   └── ...
├── ÁUDIO/
├── DRONE/
└── FOTOS/

LOG DO MATERIAL (arquivo .txt)
Para cada cena: qual take está aprovado, observações de edição,
momentos específicos que funcionaram bem.
```
