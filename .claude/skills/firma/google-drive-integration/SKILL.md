---
name: google-drive-integration
description: Integração completa com Google Drive para listagem, upload, download e busca de arquivos usando APIs oficiais ou gdrive CLI.
---

# Google Drive Integration 📂

Esta skill permite ao agente interagir com arquivos no seu Google Drive, facilitando o armazenamento e recuperação de documentos, mídias e backups.

## Principais Operações

Use esta skill para:
1. **Listar Arquivos**: Ver o que está em pastas específicas.
2. **Upload Automático**: Enviar relatórios, ícones ou códigos gerados direto para a nuvem.
3. **Download**: Trazer referências externas para o workspace local.
4. **Busca Semântica**: Encontrar arquivos por nome ou conteúdo.

## Configuração (First Time)

### Opção A: gdrive CLI (Nativo)
```bash
# Instalar gdrive CLI
brew install gdrive

# Autenticar
gdrive about
```

### Opção B: Rclone (Robusto)
```bash
# Instalar
brew install rclone

# Configurar novo remote (chamar de 'gdrive')
rclone config
```

## Comandos Úteis

### Listar arquivos no Root
```bash
gdrive list
# ou rclone
rclone ls gdrive:/
```

### Upload de Arquivo
```bash
gdrive upload "caminho/do/arquivo.txt"
# ou rclone
rclone copy "arquivo.txt" gdrive:/pasta_destino
```

### Download de Arquivo (ID do arquivo)
```bash
gdrive download [FILE_ID]
```

## Casos de Uso
- "Ative o google-drive e faça upload deste relatório de marketing em PDF."
- "Busque todos os arquivos .swift que eu tenho no Drive na pasta 'Projeto Laura'."
- "Baixe a imagem de referência do ícone do app que está no meu Drive."

## Dicas
- Sempre use IDs de arquivos para operações de download/delete para evitar ambiguidades com nomes duplicados.
- Configure o escopo de permissão para `drive.file` se quiser segurança máxima (o agente só acessa o que ele mesmo criar).
