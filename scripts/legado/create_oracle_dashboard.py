import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = 'C:\\Users\\User\\Documents\\ANTIGRAVITY\\google_service_account.json'
SPREADSHEET_ID = '1Qd9-u9dBbzc5sNLEO0XlAy0sQ7nUfEaiDVEzkD9h2Y4'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

service = build('sheets', 'v4', credentials=creds)
sheet = service.spreadsheets()

def format_curr(val):
    if val is None: return "R$ 0,00"
    return f"R$ {val:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')

def create_oracle_dashboard():
    print("Gerando Dashboard Consolidado (Versão Oráculo 3.0)...")
    
    # 1. Oracle Truth Data (as provided by the user)
    oracle_data = {
        "CONTA NUBANK": {
            "FEV": {"initial": 306.12, "in": 17261.12, "out": 17449.50, "final": 117.74},
            "MAR": {"initial": 117.74, "in": 8439.82, "out": 8161.07, "final": 396.49}
        },
        "CONTA BB": {
            "FEV": {"initial": 642.35, "final": 243.99},
            "MAR": {"initial": 243.99, "final": 439.97}
        },
        "CONTA INTER": {
            "FEV": {"initial": 2939.09, "final": 2939.09},
            "MAR": {"initial": 2939.09, "final": 2939.09}
        },
        "CARTÃO CREDITO INFINITY ITAU": {
            "FEV": {"bill": 5094.26, "parcelado": 0},
            "MAR": {"bill": 6124.35, "parcelado": 2563.64}
        },
        "CARTÃO CREDITO BLACK ITAU": {
            "FEV": {"bill": 5102.46, "parcelado": 0},
            "MAR": {"bill": 5584.23, "parcelado": 19262.15}
        },
        "CARTAO CREDITO NUBANK": {
            "FEV": {"bill": 730.18, "parcelado": 0},
            "MAR": {"bill": 987.36, "parcelado": 0}
        }
    }

    # 2. Build the Layout (15 cols x 150 rows for safety)
    layout = [[""]*15 for _ in range(150)]
    
    # Header
    layout[0][0] = "🔮 ORÁCULO 3.0 — CONSOLIDADO FINANCEIRO (FIRMA ABACAXI 2026)"
    layout[1][0] = "Relatório estratégico gerado para visão de caixa e passivos."
    layout[2][0] = "--------------------------------------------------------------------------------"

    row = 4
    
    # Section: SUMÁRIO DE CAIXA (Cash Summary)
    layout[row][0] = "💰 CAIXA TOTAL ATUAL"
    row += 1
    total_cash = 396.49 + 439.97 + 2939.09
    layout[row][0] = "NUBANK"
    layout[row][1] = format_curr(396.49)
    row += 1
    layout[row][0] = "BB"
    layout[row][1] = format_curr(439.97)
    row += 1
    layout[row][0] = "INTER (PJ)"
    layout[row][1] = format_curr(2939.09)
    row += 1
    layout[row][0] = "TOTAL DISPONÍVEL"
    layout[row][1] = format_curr(total_cash)
    row += 2

    # Section: RISCOS E PASSIVOS (Risks)
    layout[row][0] = "💣 PASSIVOS FUTUROS (PARCELAMENTOS)"
    row += 1
    total_parcelado = 19262.15 + 2563.64
    layout[row][0] = "ITAÚ BLACK"
    layout[row][1] = format_curr(19262.15)
    row += 1
    layout[row][0] = "ITAÚ INFINITY"
    layout[row][1] = format_curr(2563.64)
    row += 1
    layout[row][0] = "TOTAL GERAL PARCELADO"
    layout[row][1] = format_curr(total_parcelado)
    row += 2

    # Section: DIAGNÓSTICO (Comparison)
    layout[row][0] = "⚖️ RELAÇÃO FINANCEIRA (MARÇO)"
    row += 1
    total_cartoes_mar = 6124.35 + 5584.23 + 987.36
    layout[row][0] = "TOTAL FATURAS"
    layout[row][1] = format_curr(total_cartoes_mar)
    row += 1
    layout[row][0] = "TOTAL CAIXA"
    layout[row][1] = format_curr(total_cash)
    row += 1
    layout[row][0] = "DÉFICIT OPERACIONAL"
    layout[row][1] = format_curr(total_cash - total_cartoes_mar)
    row += 3

    # Section: DETALHAMENTO MENSAL (Monthly Detail)
    layout[row][0] = "📊 FLUXO DETALHADO POR CONTA"
    row += 2
    
    # Columns for Months
    layout[row][1] = "FEVEREIRO 2026"
    layout[row][5] = "MARÇO 2026"
    row += 1
    
    accounts = ["CONTA NUBANK", "CONTA BB", "CONTA INTER", "CARTÃO CREDITO INFINITY ITAU", "CARTÃO CREDITO BLACK ITAU", "CARTAO CREDITO NUBANK"]
    
    for ac in accounts:
        layout[row][0] = f"--- {ac} ---"
        row += 1
        data = oracle_data[ac]
        
        # FEV column
        if "bill" in data["FEV"]:
            layout[row][1] = "Fatura:"
            layout[row][2] = format_curr(data["FEV"]["bill"])
        else:
            layout[row][1] = "Saldo Inicial:"
            layout[row][2] = format_curr(data["FEV"]["initial"])
            layout[row+1][1] = "Saldo Final:"
            layout[row+1][2] = format_curr(data["FEV"]["final"])
            
        # MAR column
        if "bill" in data["MAR"]:
            layout[row][5] = "Fatura:"
            layout[row][6] = format_curr(data["MAR"]["bill"])
            if data["MAR"]["parcelado"] > 0:
                layout[row+1][5] = "Parcelado Futuro:"
                layout[row+1][6] = format_curr(data["MAR"]["parcelado"])
        else:
            layout[row][5] = "Saldo Inicial:"
            layout[row][6] = format_curr(data["MAR"]["initial"])
            layout[row+1][5] = "Saldo Final:"
            layout[row+1][6] = format_curr(data["MAR"]["final"])
            
        row += 4 # Space between items

    # Writing to RESUMO MENSAL
    try:
        service.spreadsheets().values().clear(spreadsheetId=SPREADSHEET_ID, range="'RESUMO MENSAL'!A1:O150").execute()
        service.spreadsheets().values().update(spreadsheetId=SPREADSHEET_ID, range="'RESUMO MENSAL'!A1:O150",
                             valueInputOption='USER_ENTERED', body={'values': layout}).execute()
        print("Dashboard Oráculo concluído!")
    except Exception as e:
        print(f"Erro ao escrever dashboard: {e}")

if __name__ == '__main__':
    create_oracle_dashboard()
