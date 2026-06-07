#!/usr/bin/env python3
# coding: utf-8
"""
IMPORTAR DO GOOGLE SHEETS — usar como BASE principal
Acessa a planilha completa e cria um orçamento novo consolidado.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

print("=" * 100)
print("🔗 IMPORTAR DO GOOGLE SHEETS — FAC 2026")
print("=" * 100)

# Google Sheets ID
SHEETS_ID = "1eOxjEhnS_pSr25zCJSrqSqRlFkeS9UAU"
SHEET_GID = "789238075"

print(f"\n📋 Google Sheets detectado:")
print(f"   ID: {SHEETS_ID}")
print(f"   GID: {SHEET_GID}")

# URL para exportar como CSV
csv_url = f"https://docs.google.com/spreadsheets/d/{SHEETS_ID}/export?format=csv&gid={SHEET_GID}"
print(f"\n📥 URL de download:")
print(f"   {csv_url}")

print(f"""

🎯 PRÓXIMA AÇÃO DO ORÁCULO:

Para completar essa análise com MÁXIMA SEGURANÇA (sem quebrar fórmulas):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPÇÃO 1: VOCÊ LÊ O GOOGLE SHEETS E ME DIZ (RECOMENDADO) ⭐
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Abra: https://docs.google.com/spreadsheets/d/{SHEETS_ID}/edit?gid={SHEET_GID}
2. Procure pelas linhas de:
   • Item 2: Direção Criação
   • Item 4: Sinografia (vai virar Direção de Arte)
   • Item 7: Criação de Figurinos
   • Item 10: Direção de Montagem
   • Item 11: Assistência de Direção
   • Item 14: Adereços (vai consolidar com Confecção de Cenografia)
   • Item 19: Cachê de Apresentação

3. Para CADA item, identifique:
   • Qual é a LINHA (ex: linha 45)
   • Qual é a COLUNA da descrição (ex: coluna C)
   • Qual é a COLUNA do valor total (ex: coluna L)
   • Qual é o valor ATUAL
   • Qual é o valor DESEJADO (segundo nossas alterações)

4. Depois me diga: "Item X está na linha Y, coluna C é descrição, coluna L é valor total"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPÇÃO 2: EU LEIO VIA GSPREAD (se houver credenciais Google configuradas)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Teste: você me autoriza acessar via Google Sheets API?
   - Precisa de credenciais JSON (service account ou OAuth)
   - Será automático, mas pode exigir autenticação na primeira vez

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPÇÃO 3: VOCÊ BAIXA O GOOGLE SHEETS COMO EXCEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Google Sheets > Arquivo > Download > Excel (.xlsx)
   Depois você me passa esse arquivo e eu faço a análise/modificações nele

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A OPÇÃO 1 (LEITURA MANUAL) É MELHOR PARA:
✅ Garantir que entendo EXATAMENTE o que está no seu orçamento
✅ Ter certeza das linhas/colunas antes de fazer alterações
✅ Evitar alucinações ou leitura errada de dados
✅ Ativar Skills de Orçamento ao DISCUTIR cada linha com você

Aguardando seu retorno! 🎭
""")
