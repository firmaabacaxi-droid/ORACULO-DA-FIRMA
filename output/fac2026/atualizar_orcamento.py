#!/usr/bin/env python3
# coding: utf-8
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import gspread
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials

PLANILHA_ORIGINAL = "1eOxjEhnS_pSr25zCJSrqSqRlFkeS9UAU"
PASTA_DRIVE = "1siKUTBMJxXJywPXCAsvZA5G5L8xcoirM"

def autenticar():
    try:
        gc = gspread.oauth(
            scopes=['https://www.googleapis.com/auth/spreadsheets',
                   'https://www.googleapis.com/auth/drive']
        )
        print("[OK] Autenticado com Google")
        return gc
    except Exception as e:
        print(f"[ERRO] Autenticacao falhou: {e}")
        return None

def copiar_e_atualizar(gc):
    try:
        print("\n[PROCESSANDO] Abrindo planilha original...")
        sh_original = gc.open_by_key(PLANILHA_ORIGINAL)
        print(f"[OK] Planilha aberta: {sh_original.title}")

        print("\n[PROCESSANDO] Criando copia...")
        copia = sh_original.copy(
            title=f"{sh_original.title} - REVISADA",
            folder_id=PASTA_DRIVE
        )
        nova_id = copia['id']
        print(f"[OK] Copia criada: {nova_id}")

        print("\n[PROCESSANDO] Aplicando alteracoes...")
        sh = gc.open_by_key(nova_id)
        ws = sh.worksheets()[0]

        atualizacoes = [
            (23, 10, "R$ 8.000,00"),   # Item 2 col J
            (23, 11, "R$ 8.000,00"),   # Item 2 col K
            (25, 3, "Direcao de Arte - Concepcao Artistica"),  # Item 4 desc
            (25, 10, "R$ 4.000,00"),   # Item 4 valor
            (25, 11, "R$ 4.000,00"),   # Item 4 total
            (28, 10, "R$ 6.000,00"),   # Item 7 valor
            (28, 11, "R$ 6.000,00"),   # Item 7 total
            (31, 10, "R$ 8.000,00"),   # Item 10 valor
            (31, 11, "R$ 8.000,00"),   # Item 10 total
            (32, 8, "2"),              # Item 11 qtd
            (32, 10, "R$ 2.000,00"),   # Item 11 valor
            (32, 11, "R$ 4.000,00"),   # Item 11 total
            (35, 3, "Confeccao Cenografia + Aderecos e Objetos"),
            (35, 10, "R$ 12.000,00"),  # Item 14 valor
            (35, 11, "R$ 12.000,00"),  # Item 14 total
            (40, 10, "R$ 600,00"),     # Item 19 valor
            (40, 11, "R$ 3.600,00"),   # Item 19 total
        ]

        for linha, col, valor in atualizacoes:
            try:
                ws.update_cell(linha, col, valor)
                print(f"  [OK] Linha {linha}, Col {col}: {valor}")
            except Exception as e:
                print(f"  [ERRO] Linha {linha}: {e}")

        print("\n[PROCESSANDO] Removendo itens consolidados...")
        try:
            ws.delete_rows(34, 1)
            print("  [OK] Item 12 removido")
            ws.delete_rows(29, 1)
            print("  [OK] Item 8 removido")
        except:
            pass

        print("\n" + "="*80)
        print("[SUCESSO] Orcamento atualizado!")
        print(f"\nNova planilha: https://docs.google.com/spreadsheets/d/{nova_id}/")
        print("\nProxima etapa: Abra a planilha e verifique o TOTAL no final")

        return nova_id

    except Exception as e:
        print(f"[ERRO] {e}")
        return None

if __name__ == "__main__":
    print("[INICIANDO] Atualizacao do orcamento FAC 2026")
    print("="*80)

    gc = autenticar()
    if gc:
        copiar_e_atualizar(gc)
    else:
        print("\n[ABORTADO] Nao foi possivel autenticar.")
