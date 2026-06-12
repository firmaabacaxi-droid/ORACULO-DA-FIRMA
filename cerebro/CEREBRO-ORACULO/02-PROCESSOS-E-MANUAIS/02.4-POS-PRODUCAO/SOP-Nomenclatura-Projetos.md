---
type: sop
department: "Pós-Produção e Edição"
process: "Nomenclatura de Projetos e Pastas (Premiere/DaVinci)"
owner: "Editor / Coordenador de Edição"
status: "Ativo"
created: 2026-06-12
---

# SOP — Nomenclatura de Projetos e Pastas em Premiere & DaVinci

**Departamento:** Pós-Produção  
**Responsável:** Editor / Coordenador  
**Aplicação:** Todos os projetos de edição  
**Benefício:** Organização, backup seguro, colaboração sem conflitos

---

## 1. Estrutura Padrão de Pastas

Crie esta árvore para **cada projeto** no servidor/drive local:

```
[PROJETO-NOME]/
├── 00-PROJETO-PREMIERE/          ← Projetos do Premiere (.prproj)
│   ├── 00-PROJECT-MASTER.prproj  ← VERSÃO OFICIAL (nunca rescrever)
│   ├── 00-PROJECT-BACKUP.prproj  ← Backup automático
│   └── versoes/
│       ├── v01-rough-cut.prproj
│       ├── v02-cliente-review.prproj
│       └── v03-final.prproj
├── 01-ARQUIVO-BRUTO/             ← Cartões de memória copiados
│   ├── CAMERA_A/
│   │   ├── 2026-05-28_MARANHA_DIA1/
│   │   │   ├── MXF001.mxf
│   │   │   ├── MXF002.mxf
│   │   └── ...
│   └── CAMERA_B/
├── 02-PROXIES/                    ← Proxy 1/4 para edição rápida
│   ├── MARANHA_DIA1_PROXY.mov
│   └── MARANHA_DIA2_PROXY.mov
├── 03-MUSICA/                     ← Trilhas sonoras, efeitos
│   ├── MUSICAS_LIBERADAS/
│   │   ├── Track_01_Abertura.wav
│   │   └── Track_02_Transicao.wav
│   └── SFX/
│       └── Transicoes_Natureza.wav
├── 04-GRAFICOS-TITULOS/           ← Elementos visuais
│   ├── PNG/
│   │   └── Logo_Firma.png
│   └── MOTION/
│       └── Abertura_Maranha.aep    ← After Effects
├── 05-CORES-LUT/                  ← Perfis de cor (DaVinci)
│   ├── DaVinci_Project.drp
│   └── LUT/
│       └── Log_to_Rec709.cube
├── 06-EXPORTACOES/                ← Versões finais
│   ├── MARANHA-v1-CLIENT-REVIEW.mp4
│   ├── MARANHA-v2-CORRECTIONS.mp4
│   └── MARANHA-FINAL-4K-ProRes.mov
└── 07-DOCUMENTACAO/               ← Notas, VFX list, color notes
    ├── VFX-LIST.txt
    ├── COLOR-NOTES.txt
    └── FEEDBACK-CLIENTE.md
```

---

## 2. Convenção de Nomes de Arquivo

### **Cartões/Arquivo Bruto**

```
[DATA]_[PROJETO]_[CAMERA]_[CENA]_[TAKE].mxf

Exemplo:
2026-05-28_MARANHA_CAM-A_ENTREVISTA-NILTO_001.mxf
2026-05-28_MARANHA_CAM-A_ENTREVISTA-NILTO_002.mxf
2026-05-29_MARANHA_CAM-B_Wide-AMBIENTE_001.mxf
```

### **Proxies**

```
[PROJETO]_[CENA]_PROXY.mov

Exemplo:
MARANHA_ENTREVISTA-NILTO_PROXY.mov
MARANHA_WIDE-AMBIENTE_PROXY.mov
SIMBIOSE_B-ROLL_PROXY.mov
```

### **Música/SFX**

```
[NUMERO]_[DESCRICAO]_[COMPOSER/SOURCE].[wav/mp3]

Exemplo:
01_ABERTURA_Original-Filipe.wav
02_TRANSICAO_Epidemic-Sound.wav
03_SFX_PASSOS-FOLHA_Freesound.wav
```

### **Exportações**

```
[PROJETO]_v[VERSAO]_[TIPO]_[RESOLUCAO].mov

Exemplo:
MARANHA_v1_CLIENT-REVIEW_1080p.mp4      ← Para cliente confirmar
MARANHA_v2_CORRECTIONS_4K.mov           ← Após ajustes
MARANHA_v3_FINAL_4K-ProRes-422HQ.mov   ← Master / arquivo permanente
MARANHA_INSTAGRAM_vertical_1080x1920.mp4 ← Específico para plataforma
```

---

## 3. Versionamento em Premiere

**Padrão de projeto:**
```
00-PROJECT-MASTER.prproj          ← Sempre atual, NUNCA trabalhe neste
└── BACKUPS:
    ├── 00-PROJECT-BACKUP-Jun12-14h.prproj
    └── 00-PROJECT-BACKUP-Jun12-15h.prproj

└── VERSOES DE TRABALHO:
    ├── v01-rough-cut.prproj       ← Montagem bruta (24h de trabalho)
    ├── v02-cliente-review.prproj  ← Enviado ao cliente para feedback
    ├── v03-correcoes.prproj       ← Ajustes do feedback
    └── v04-final.prproj           ← Pronto para cor/som
```

**Workflow:**

1. **Crie `00-PROJECT-MASTER.prproj`** (dia 1, após ingerir arquivo bruto)
   - Organize bins, imports, proxies
   - **NÃO EDITE AQUI** — apenas estrutura

2. **Trabalhe em `v01-rough-cut.prproj`** (cópia do master)
   - Montagem bruta, cortes grandes, estrutura
   - Salve a cada 30 min: Premiere faz auto-backup

3. **Exporte `v01-ROUGH-CUT.mp4`** → envie ao cliente
   - Receba feedback (Notion, email, comentários)

4. **Crie `v02-cliente-review.prproj`** (cópia de v01)
   - Aplique feedback minor (color timing, som, gráficos)
   - Exporte e envie novamente se necessário

5. **Crie `v03-final.prproj`** (cópia da versão aceita)
   - Passe para DaVinci (color grading)
   - Mixing final de áudio

---

## 4. Estrutura de Bins em Premiere

Organize os bins da seguinte forma:

```
PROJECT
├── 01-MEDIA
│   ├── VIDEO
│   │   ├── CAM-A-2026-05-28
│   │   ├── CAM-A-2026-05-29
│   │   └── CAM-B-2026-05-29
│   ├── AUDIO
│   │   ├── ENTREVISTA
│   │   ├── AMBIENTE
│   │   └── SFX
│   └── MUSIC
│       ├── EPIDEMIC-SOUND
│       └── ORIGINAL
├── 02-GRAFICOS
│   ├── TITULOS
│   ├── TRANSICOES
│   └── LOWER-THIRDS
├── 03-SEQUENCES
│   ├── ROUGH-CUT
│   ├── CLIENTE-REVIEW
│   ├── FINAL
│   └── EXPORTS (links para arquivos exportados)
└── 04-LIXEIRA
    └── Clipes rejeitados / não usados
```

---

## 5. Checklist Antes de Entregar Projeto ao Próximo Estágio

### **Antes de enviar para DaVinci (color grading)**

- [ ] Projeto salvo com nome correto (`v03-final.prproj`)
- [ ] Todos os media vinculados (sem offline clips — aparecem em vermelho)
- [ ] Sequência final renderizada em proxy (para preview rápido)
- [ ] Nota de entrega preenchida: resolução, frame rate, duração, aspect ratio
- [ ] Arquivo exportado em formato intermediário (ProRes 422 HQ ou similar — **nunca H.264**)
- [ ] Backup do projeto copiado para 2 locais (HD local + Drive/servidor)

### **Antes de enviar ao cliente**

- [ ] Exportação final em formato acordado (MP4, MOV, etc.)
- [ ] Arquivo testado em player externo (verificar áudio + vídeo sincronizados)
- [ ] Arquivo com tamanho < 500MB para email, ou link de drive se > 500MB
- [ ] Nota com título, duração, requisitos de player
- [ ] Backup do projeto arquivado

---

## 6. Organização de Drives/Servidor

**Se usar Google Drive ou servidor local:**

```
FIRMA-ABACAXI-PRODUCOES/
├── 2026/
│   ├── MARANHA (#16)/
│   │   ├── 00-PROJETO-PREMIERE/
│   │   ├── 01-ARQUIVO-BRUTO/
│   │   ├── 06-EXPORTACOES/
│   │   └── 07-DOCUMENTACAO/
│   ├── SIMBIOSE (#10)/
│   ├── RNP (#08)/
│   └── BRASIL-PARTICIPATIVO (#04)/
├── TEMPLATES/
│   ├── Abertura-Padrao.prproj
│   └── Lower-Third-Template.mogrt
└── ACERVO/
    ├── MUSICAS-LIBERADAS/
    ├── EFEITOS/
    └── STOCK-FOOTAGE/
```

---

## 7. Dicas de Performance

- **Proxies:** Sempre trabalhe com proxy 1/4 resolução para fluidez (Premiere)
- **Cache:** Limpe cache regularmente (Premiere > Edit > Purge Cache)
- **Backups:** Ative auto-save a cada 15 min em Premiere
- **Cores:** Separe DaVinci em projeto diferente (não color-correct em Premiere)

---

## 8. Suporte & Dúvidas

- **"Ficheiro corrompido, não abre o projeto"** → Use backup automático em `00-PROJECT-BACKUP-*`
- **"Media offline"** → Relink em Premiere (Project > Relink Media)
- **"Qual formato para cliente?"** → Sempre MP4 ou MOV, bitrate 100 Mbps mínimo para cliente, H.265 aceito se cliente concordar

---

**Checklist geral:**
- [ ] Pastas criadas conforme estrutura
- [ ] Projeto nomeado corretamente
- [ ] Bins organizados logicamente
- [ ] Media vinculado (sem offline)
- [ ] Proxies gerados
- [ ] Backups automatizados
- [ ] Documentação atualizada

---

*Última revisão: 12 jun 2026*
