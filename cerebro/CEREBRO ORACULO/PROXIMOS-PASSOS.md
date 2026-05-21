# Próximos passos — Segundo Cérebro

Checklist de configuração do vault + integrações.

---

## PARTE 1 — Obsidian (você faz agora)

- [ ] Baixar Obsidian em **obsidian.md**
- [ ] Instalar no Windows
- [ ] Abrir Obsidian → **"Open folder as vault"**
- [ ] Navegar até: `C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\`
- [ ] Clicar em **"Open"**
- [ ] Aceitar confiar no vault
- [ ] Abrir a nota **HOME.md** como ponto de partida

---

## PARTE 2 — Plugins (dentro do Obsidian)

Vá em: **Settings → Community Plugins → Turn on community plugins → Browse**

- [ ] Instalar **Obsidian Git** → para sincronizar com GitHub
- [ ] Instalar **Dataview** → para queries nas notas
- [ ] Instalar **Templater** → para criar notas a partir de templates

---

## PARTE 3 — GitHub (você faz)

- [ ] Acessar **github.com** e criar conta (ou entrar na existente)
- [ ] Criar repositório **privado** com nome: `cerebro-oraculo`
- [ ] No Obsidian Git: **Settings → Obsidian Git** → inserir URL do repositório
- [ ] Configurar commit automático a cada 30 minutos

**Por que privado?** O vault terá informações de clientes e financeiras. GitHub privado garante que só você acessa.

---

## PARTE 4 — Google NotebookLM

- [ ] Acessar **notebooklm.google.com** com a conta firmaabacaxi@gmail.com
- [ ] Criar novo notebook: **"Cérebro Firma Abacaxi"**
- [ ] Adicionar fonte → **GitHub** → colar URL do repositório `cerebro-oraculo`
- [ ] Aguardar indexação (pode levar alguns minutos)
- [ ] Testar: perguntar sobre as técnicas ou processos da Firma

**Resultado:** Um AI treinado especificamente no conhecimento da Firma, acessível direto no celular via NotebookLM app.

---

## PARTE 5 — Testar o ciclo completo

- [ ] Pedir ao Oráculo: *"registra o aprendizado do último projeto no cérebro"*
- [ ] Verificar no Obsidian se a nota apareceu em **05-APRENDIZADOS/**
- [ ] Aguardar o commit automático do Obsidian Git
- [ ] Verificar no NotebookLM se a nova nota foi indexada

---

## Resultado esperado

```
Projeto finalizado
    ↓
Oráculo pergunta sobre aprendizados
    ↓
Salva nota em 05-APRENDIZADOS/ (automático)
    ↓
Obsidian Git commita para GitHub (automático, 30min)
    ↓
NotebookLM sincroniza (automático)
    ↓
Próximo projeto: Oráculo já sabe o que funcionou antes
```

---

*Criado pelo Oráculo · Mai 2026*
