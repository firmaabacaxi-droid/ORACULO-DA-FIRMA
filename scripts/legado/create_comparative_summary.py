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

def create_comparative_summary():
    print("Iniciando Criação da Aba RESUMO_COMPARATIVO...")
    
    # 1. Prepare Rows
    rows = [
        ["📊 CONSOLIDADO FINANCEIRO — VISÃO COMPARATIVA (ORÁCULO 3.0)", "", "", ""],
        ["", "", "", ""],
        ["🏦 CONTAS BANCÁRIAS (FLUXO E SALDO)", "FEVEREIRO 2026", "MARÇO 2026", "VARIAÇÃO"],
        
        ["💜 CONTA NUBANK", "", "", ""],
        ["   Saldo Inicial", "R$ 306,12", "R$ 117,74", ""],
        ["   Entradas", "R$ 17.261,12", "R$ 8.439,82", "-51%"],
        ["   Saídas", "R$ 17.449,50", "R$ 8.161,07", "-53%"],
        ["   Saldo Final", "R$ 117,74", "R$ 396,49", "+236%"],
        
        ["🏦 BANCO DO BRASIL", "", "", ""],
        ["   Saldo Inicial", "R$ 642,35", "R$ 243,99", ""],
        ["   Saldo Final", "R$ 243,99", "R$ 439,97", "+80%"],
        
        ["🏦 INTER (PJ)", "", "", ""],
        ["   Saldo Estável", "R$ 2.939,09", "R$ 2.939,09", "0%"],
        
        ["", "", "", ""],
        ["💳 CARTÕES DE CRÉDITO (FATURAS)", "FEVEREIRO 2026", "MARÇO 2026", "VARIAÇÃO"],
        ["🔥 ITAÚ INFINITY", "R$ 5.094,26", "R$ 6.124,35", "+20%"],
        ["🔥 ITAÚ BLACK", "R$ 5.102,46", "R$ 5.584,23", "+9%"],
        ["💜 NUBANK (CARTÃO)", "R$ 730,18", "R$ 987,36", "+35%"],
        ["   TOTAL FATURAS", "R$ 10.926,90", "R$ 12.695,94", "+16%"],
        
        ["", "", "", ""],
        ["💣 PASSIVOS FUTUROS (PARCELAMENTOS TOTAL)", "", "MARÇO 2026", ""],
        ["   ITAÚ BLACK", "", "R$ 19.262,15", ""],
        ["   ITAÚ INFINITY", "", "R$ 2.563,64", ""],
        ["   TOTAL COMPROMETIDO", "", "R$ 21.825,79", ""],
        
        ["", "", "", ""],
        ["⚖️ DIAGNÓSTICO DE CAIXA (SITUAÇÃO ATUAL)", "", "", ""],
        ["   💰 CAIXA TOTAL DISPONÍVEL", "", "R$ 3.775,55", ""],
        ["   💳 CARTÕES (DO MÊS)", "", "R$ 12.695,94", ""],
        ["   💣 PARCELAMENTOS (ALÉM DO MÊS)", "", "R$ 21.825,79", ""],
        ["   🔍 DÉFICIT OPERACIONAL REAL", "", "R$ -30.746,18", "(Caixa - Dívida Total)"],
        
        ["", "", "", ""],
        ["🧠 CONCLUSÃO ESTRATÉGICA", "", "", ""],
        ["👉 Fluxo apertado: Você não está acumulando caixa.", "", "", ""],
        ["👉 Dependência de crédito: Cartão como extensão de renda.", "", "", ""],
        ["👉 Risco futuro: Parcelamentos elevados comprometem o amanhã.", "", "", ""],
        ["👉 Oportunidade: O caixa do Inter (PJ) está subutilizado.", "", "", ""]
    ]

    # Create tab
    try:
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={
            'requests': [{'addSheet': {'properties': {'title': 'RESUMO_COMPARATIVO'}}}]
        }).execute()
    except: pass

    # Clear and Update
    service.spreadsheets().values().clear(spreadsheetId=SPREADSHEET_ID, range="RESUMO_COMPARATIVO!A1:D50").execute()
    service.spreadsheets().values().update(spreadsheetId=SPREADSHEET_ID, range="RESUMO_COMPARATIVO!A1",
                         valueInputOption='USER_ENTERED', body={'values': rows}).execute()
    
    print("RESUMO_COMPARATIVO criado com sucesso.")

if __name__ == '__main__':
    create_comparative_summary()
