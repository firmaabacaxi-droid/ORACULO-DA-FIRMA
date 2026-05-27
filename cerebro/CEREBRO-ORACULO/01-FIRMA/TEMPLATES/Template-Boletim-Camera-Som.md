# Template — Boletim de Câmera e Som
*Metadados técnicos por take · para produções com equipe técnica dedicada*

---

## Quando usar este template

- Produções com **2 ou mais câmeras** simultâneas
- Projetos com **equipe técnica dedicada** (1º assistente, técnico de som separados)
- Filmagens onde os **metadados dos cartões** precisam ser rastreados (projetos de cinema, documentários longos)
- Quando há **DIT** (Digital Imaging Technician) responsável pelo backup em set

→ Para produções pequenas da Firma (entrevistas, redes, institucionais), o **Log de Filmagem** ([[Template-Log-Filmagem]]) é suficiente.

---

## TEMPLATE

```markdown
# BOLETIM DE CÂMERA E SOM — [PROJETO] — [DATA]

| Campo | Informação |
|---|---|
| **Título** | |
| **Data** | |
| **Nº da diária** | |
| **Locação** | |
| **Diretor(a) de Fotografia** | |
| **Técnico(a) de Som** | |

---

## PARTE 1 — BOLETIM DE CÂMERA

### Dados técnicos do dia

| Campo | Câmera A | Câmera B |
|---|---|---|
| **Câmera** | | |
| **Operador(a)** | | |
| **Formato de gravação** | | |
| **Resolução** | ☐ 4K · ☐ 2K · ☐ HD | |
| **Frame rate** | ☐ 23,976 · ☐ 24 · ☐ 25 · ☐ Outro: | |
| **Espaço de cor** | ☐ Log · ☐ Raw · ☐ Rec.709 | |
| **LUT / Perfil de cor** | | |

---

### Registro de cartões

| Cartão/Rolo | Câmera | Cenas cobertas | Início | Fim | Status |
|---|---|---|---|---|---|
| A001 | A | | | | ☐ Completo ☐ Em uso |
| A002 | A | | | | |
| B001 | B | | | | |

---

### Registro de planos

| Plano | Cena | Câm. | Take aprv. | Lente | T-stop | ND | FPS | Obs. |
|---|---|---|---|---|---|---|---|---|
| A001 | | A | | mm | f/ | | | |
| A002 | | A | | mm | f/ | | | |
| B001 | | B | | mm | f/ | | | |

---

### Resumo de câmera do dia

| Indicador | Câmera A | Câmera B | Total |
|---|---|---|---|
| Total de planos rodados | | | |
| Total de takes rodados | | | |
| Takes aprovados | | | |
| Cartões utilizados | | | |
| Volume de dados (GB) | | | |

---

## PARTE 2 — BOLETIM DE SOM

### Dados técnicos de som

| Campo | Informação |
|---|---|
| **Técnico(a) de som** | |
| **Gravador** | |
| **Formato** | ☐ WAV · ☐ BWF |
| **Bit depth** | ☐ 24 bit · ☐ 32 bit float |
| **Sample rate** | ☐ 48 kHz · ☐ 96 kHz |

---

### Microfones do dia

| Microfone | Tipo | Canal | Personagem / Uso | Ganho médio |
|---|---|---|---|---|
| | ☐ Boom · ☐ Lapela · ☐ Ambiente | 1 | | dB |
| | | 2 | | dB |

---

### Registro de áudio por plano

| Arquivo | Plano | Cena | Take | Tipo | Qualidade |
|---|---|---|---|---|---|
| | | | | ☐ Diálogo · ☐ Wild · ☐ Ambiente | ☐ Limpo · ☐ Ruído · ☐ Rejeitar |

---

### Wild sound gravado

| Arquivo | Descrição | Cena referência | Duração |
|---|---|---|---|
| | | | |

### Ambientação (room tone)

| Arquivo | Locação | Duração | Horário |
|---|---|---|---|
| | | min | |

---

### Resumo de som do dia

| Indicador | Quantidade |
|---|---|
| Total de arquivos de áudio | |
| Takes de diálogo limpos | |
| Takes que precisarão ADR | |
| Volume de dados de áudio (GB) | |

---

## PARTE 3 — DIT (Backup em set)

| Campo | Informação |
|---|---|
| **DIT** | |
| **Destino primário** | |
| **Destino de backup** | |

### Checklist de integridade

| Cartão | Tamanho (GB) | Checksum OK | Backup 1 | Backup 2 |
|---|---|---|---|---|
| | | ☐ | ☐ | ☐ |

**Regra: mínimo 2 backups em destinos físicos diferentes antes de apagar qualquer cartão.**

---

## OBSERVAÇÕES GERAIS

[Intercorrências técnicas, problemas de equipamento, decisões de set que impactam a pós-produção]
```

---

## Caminho de save

`output/roteiros/NomeCliente_boletim_YYYYMMDD.md`

## Gerado pelo Oráculo via

`skills/producao/SKILL.md` — ativado por: "Boletim de câmera"

#template #producao #set #camera #som #dit #metadata #boletim
