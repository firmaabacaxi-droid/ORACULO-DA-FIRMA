---
description: Workflow para escalagem e gestão de equipe audiovisual especializada, desde a identificação de talentos até o briefing.
---

# 👥 Workflow: Gestão de Talentos (Freetech)

Este workflow descreve o processo de formação de equipe para cada projeto, usando a inteligência do Oráculo.

## 🏁 Gatilho (Trigger)
- O projeto na database `🎬 PROJETOS` entra em estágio de `🏗️ Pré-Produção`.

## 🔍 Fase 1: Identificação de Especialistas
1. **Filtro de Skill**: O Oráculo filtra na database `👥 CONTATOS` os profissionais com as especialidades requeridas (Diretor de Fotografia, Editor, Motion Designer).
2. **Matching Regional**: Quando necessário (filmagem local), filtrar por cidade/região para evitar custos extras de deslocamento.

## 📞 Fase 2: Disponibilidade e Convite
1. **Sondagem**: Envio de mensagem automática (via Telegram/WhatsApp) para os contatos selecionados com os detalhes básicos (Data, Local, Verba).
2. **Confirmação**: Assim que o profissional confirma, o Oráculo o vincula à página do `🎬 PROJETO` na propriedade `👤 EQUIPE`.

## 📝 Fase 3: Briefing de Produção
1. **Documentação Técnica**: Envio automático do roteiro, decoupagem e referências (vindas da aba `CRIATIVO` do projeto) para o profissional confirmado.
2. **Contrato de Prestação**: Geração e envio do link de contrato para assinatura eletrônica do freela.

## ⭐ Fase 4: Avaliação de Performance
1. **Rating Pós-Set**: Após a entrega, o coordenador de produção atribui uma nota (1-5 estrelas) diretamente na database `👥 CONTATOS` para futuras contratações.

---
> [!NOTE]
> Ter uma base de talentos organizada é o que permite à Firma Abacaxi escalar produções sem perder qualidade.
