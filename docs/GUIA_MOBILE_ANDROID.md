# Guia Mobile Android — Acessar o Cérebro na Rua

**Para:** Lipe e Jaya  
**Objetivo:** Visualizar e editar o cérebro (Obsidian + GitHub) no Android  
**Tempo de setup:** ~30 minutos

---

## Visão Geral das Opções

| Opção | Custo | Complexidade | Funciona offline? | Recomendado |
|---|---|---|---|---|
| **Opção A — obsidian-git** | Grátis | Média | Sim | ✅ Para quem já usa GitHub |
| **Opção B — Obsidian Sync** | US$4/mês | Baixa | Sim | Para setup mais rápido |
| **Opção C — GitHub Mobile** | Grátis | Baixa | Não | Só leitura, sem Bases |

---

## Opção A — obsidian-git (Recomendada — Grátis)

### Passo 1: Instalar Obsidian no Android

1. Abrir Google Play → buscar **Obsidian** → instalar
2. Na primeira tela, escolher **"Open folder as vault"**
3. Criar uma pasta local (ex: `Downloads/ORACULO-DA-FIRMA`) — não abrir o vault ainda

### Passo 2: Instalar Termux (terminal no Android)

1. Google Play → buscar **Termux** → instalar
   - Se não aparecer no Play, baixar da F-Droid: `f-droid.org`
2. Abrir Termux e rodar:
   ```bash
   pkg update && pkg upgrade
   pkg install git openssh
   ```

### Passo 3: Gerar chave SSH (ou usar token HTTPS)

**Opção mais simples — token HTTPS:**
1. Acessar GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Criar token com permissão de **Contents (read + write)** para o repositório `firmaabacaxi-droid/ORACULO-DA-FIRMA`
3. Salvar o token em lugar seguro (só aparece uma vez)

### Passo 4: Clonar o repositório no Android

No Termux:
```bash
cd ~/storage/downloads
git clone https://SEU_TOKEN@github.com/firmaabacaxi-droid/ORACULO-DA-FIRMA.git
```
> Substitua `SEU_TOKEN` pelo token gerado no Passo 3.

### Passo 5: Abrir o vault no Obsidian

1. Abrir Obsidian → "Open folder as vault"
2. Navegar até `Downloads/ORACULO-DA-FIRMA/cerebro/CEREBRO-ORACULO`
3. Abrir esse diretório como vault

### Passo 6: Configurar obsidian-git no mobile

1. No Obsidian → Settings → Community plugins → Browse → buscar **obsidian-git** → instalar
2. Settings → obsidian-git:
   - **Auto pull interval:** 10 (pull a cada 10 min)
   - **Auto push on commit:** ativado
   - **Commit message:** `mobile: {{date}} {{hostname}}`
3. Criar um botão na barra de ferramentas: Settings → obsidian-git → Show status bar → ativado

### Passo 7: Testar

1. Abrir `08-BASES/TAREFAS/TAREFAS.base` no Obsidian → deve aparecer a view de tabela
2. Editar uma tarefa → salvar
3. Tocar no botão "Commit & Push" na barra inferior
4. Verificar no GitHub web se o commit apareceu

---

## Opção B — Obsidian Sync (Mais Simples)

**Quando usar:** Se não quer lidar com Git no celular.

1. Criar conta em `obsidian.md` → plano Sync (US$4/mês, ~R$24/mês)
2. No PC: Settings → Sync → Connect → selecionar vault
3. No Android: instalar Obsidian → Settings → Sync → login → sincroniza automático

> **Nota:** O vault continuará sincronizando com o GitHub via obsidian-git no PC. O Obsidian Sync é uma camada adicional só para o mobile.

---

## Opção C — GitHub Mobile (Só Leitura, Sem Setup)

Para quando você só quer **consultar** algo rápido, sem precisar editar:

1. Instalar app **GitHub** (Play Store)
2. Login → navegar até `firmaabacaxi-droid/ORACULO-DA-FIRMA`
3. Navegar pelo repositório e ler arquivos .md diretamente
4. Para editar: tocar no arquivo → ícone de lápis → editar → commit direto pelo app

**Limitações:** Não renderiza Obsidian Bases. Serve como fallback de consulta emergencial.

---

## Como Ver o CRM e TAREFAS no Celular

Após o setup (Opção A ou B):

1. Abrir Obsidian no Android
2. Navegar para `08-BASES/CRM/CRM.base` → tocar para abrir
3. Deve aparecer a tabela/kanban de oportunidades do CRM
4. Para editar um registro: tocar no arquivo `.md` correspondente (ex: `CRM-1-brasil-participativo.md`) → editar o frontmatter
5. Tocar no botão de sync para enviar a atualização

---

## Workflow Recomendado na Rua

**Cenário:** Você tem uma reunião com um cliente e quer atualizar o CRM logo depois.

1. Reunião termina → abre Obsidian no celular
2. Pull para sincronizar (botão na barra ou esperar auto-pull)
3. Abre `08-BASES/CRM/CRM-1-brasil-participativo.md`
4. Edita o campo `proximo_contato`, `status` ou `historico`
5. Salva → botão "Commit & Push"
6. Pronto — quando chegar no PC, o cérebro já está atualizado

---

## Solução de Problemas

**Erro "merge conflict":**
```bash
# No Termux:
cd ~/storage/downloads/ORACULO-DA-FIRMA
git pull --rebase origin main
# Se houver conflito: abrir o arquivo, resolver (manter sua versão ou a remota), e:
git add .
git rebase --continue
```

**Plugin obsidian-git não aparece no mobile:**
- Instalar via Settings → Community plugins → ativar "Safe mode" OFF primeiro
- Reiniciar o app

**Token expirado:**
- Gerar novo token no GitHub (Settings → Developer settings → Fine-grained tokens)
- Atualizar a URL remota: `git remote set-url origin https://NOVO_TOKEN@github.com/firmaabacaxi-droid/ORACULO-DA-FIRMA.git`

---

## Referências

- [Obsidian Android sync via Termux](https://github.com/DovieW/obsidian-android-sync)
- [Guia completo de sync gratuito](https://www.stephanmiller.com/sync-obsidian-vault-across-devices/)
- [Configuração obsidian-git](https://medium.com/technology-hits/how-to-sync-obsidian-across-all-devices-using-git-automatically-and-for-free-dd3c76e7447b)
