---
type: sop
department: "Administrativo e Financeiro"
process: "Emissão de Nota Fiscal de Serviço"
owner: "Administrativo"
status: "Ativo"
created: 2026-06-12
---

# SOP — Emissão de Nota Fiscal de Serviço

**Departamento:** Administrativo e Financeiro  
**Responsável:** Administrativo  
**Sistema:** RPS/NFS-e (Prefeitura de Brasília)  
**Prazo:** até 5 dias úteis após conclusão do trabalho

---

## 1. Pré-Requisitos

- [ ] Contrato assinado ou Proposta aprovada pelo cliente
- [ ] Serviço foi entregue (parcial ou integral)
- [ ] Dados do cliente atualizados (CNPJ, razão social, endereço)
- [ ] Valor acordado confirmado em Notion (projeto link)

---

## 2. Dados Necessários para Emissão

Colete as seguintes informações **antes de qualquer cálculo**:

**Do Cliente:**
- CNPJ / CPF
- Razão social / Nome completo
- Endereço (CEP, rua, número, complemento)
- Email (para envio de NFS-e)
- Telefone

**Do Serviço Prestado:**
- Descrição breve (ex: "Produção audiovisual — Documentário Maranhã")
- Data de conclusão
- Valor total do serviço (sem impostos)
- Percentual de retenção (se houver, ex: INSS)

---

## 3. Cálculo de Impostos (ISS)

**Brasília — Alíquota padrão:** 5% sobre o valor do serviço

**Fórmula:**
```
Valor da NFS-e = Valor do serviço
ISS (retenção na fonte) = Valor × 5% = ___
Valor líquido a receber = Valor do serviço - ISS
```

**Exemplo:** Serviço R$ 10.000
- ISS: R$ 10.000 × 5% = R$ 500
- Líquido: R$ 10.000 − R$ 500 = R$ 9.500

---

## 4. Passo a Passo — Emissão (Sistema Online)

1. **Acesse o portal RPS/NFS-e**
   - Portal: https://nfse.brasilia.df.gov.br/ (ou em mudanças recentes, verificar com prefeitura)
   - Login: CNPJ Firma Abacaxi (14.XXX.XXX/0001-XX) + senha

2. **Clique em "Emitir RPS"**
   - Tipo de RPS: "Recibo Provisório de Serviço"
   - Data do RPS: data de conclusão do serviço

3. **Preencha os dados do cliente**
   - CNPJ/CPF
   - Razão social / Nome
   - Endereço completo
   - Inscrição municipal (se PJ em Brasília; se fora, deixar em branco)

4. **Descreva o serviço**
   - Campo: "Descrição dos Serviços Prestados"
   - Máximo de clareza, sem abreviaturas confusas
   - Exemplo: "Produção de documentário em vídeo, incluindo pré-produção, gravação em alta resolução e pós-produção (edição, cor e som)."

5. **Informe valores**
   - Valor do serviço (antes de impostos)
   - O sistema calcula ISS automaticamente
   - Revise o valor líquido a receber

6. **Verifique deduções**
   - Marque "INSS Retido" apenas se o cliente vai reter INSS (raro para produtoras)
   - Padrão: deixar em branco

7. **Envie o RPS**
   - Clique em "Enviar"
   - Sistema gera número de RPS provisório
   - Email será enviado ao cliente com PDF da NFS-e

---

## 5. Após a Emissão

- [ ] **Arquivo:** Salve o PDF em `00-EMPRESA/financeiro-empresa/nf-emitidas/[ANO]/NF-[Cliente]-[Data].pdf`
- [ ] **Notion:** Atualize o projeto (adicione link ou campo "NF Emitida")
- [ ] **Asaas (cobrança):** Se aplicável, registre o vencimento em Asaas para acompanhamento
- [ ] **Cliente:** Email automático foi enviado; não é necessário reenviar manualmente (a menos que cliente peça)

---

## 6. Rastreamento de Pagamento

- Prazo de recebimento: 30 dias (conforme contrato)
- Acompanhamento: Verificar em Asaas ou conta bancária
- Se atraso > 10 dias: Enviar email de cobrança amigável ao cliente

---

## 7. Erros Comuns & Soluções

| Erro | Causa | Solução |
|------|-------|---------|
| "CNPJ inválido" | Digitação errada | Copie do Notion projeto, revise |
| "Descrição muito breve" | Sistema rejeita descrição < 20 caracteres | Descreva o escopo completo |
| "Valor negativo" | Digitação na casa decimal | Revise: R$ 10.000,00 não R$ 10,000.00 |
| NFS-e não chega ao cliente | Email do cliente errado | Verifique Notion, resgate a NFS-e do portal e reenvie manualmente |

---

## 8. Suporte & Dúvidas

- **Portal quebrado / indisponível:** Contate Prefeitura de Brasília (fiscal@brasilia.df.gov.br)
- **Dúvida sobre valor:** Consulte Filipe (proprietário) antes de emitir
- **Cliente contesta valor:** Consulte contrato assinado; ajuste apenas se haver acordo prévio

---

**Checklist de envio:**
- [ ] Cliente confirmou concordância com valor
- [ ] Dados do cliente 100% corretos
- [ ] Descrição do serviço é clara e completa
- [ ] ISS calculado corretamente
- [ ] NFS-e emitida e email recebido pelo cliente
- [ ] Arquivo salvo localmente
- [ ] Notion atualizado
- [ ] Asaas (se aplicável) registrado

---

*Última revisão: 12 jun 2026*
