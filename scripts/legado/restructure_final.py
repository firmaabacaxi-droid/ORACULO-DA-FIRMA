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

headers = ["Data", "Lançamento", "Detalhes", "Valor", "Tipo Lançamento", "DESCRIÇÃO", "CATEGORIA", "PF OU PJ"]

jan_data = [
    ["30/12/2025", "Saldo Anterior", " ", "1.263,00", "SALDO", "", "", ""],
    ["02/01/2026", "Pix - Enviado", "02/01 20:25 LUCAS COIMBRA FONSECA", "-170,00", "Saída", "CIRCO", "ESPORTE", "PF"],
    ["05/01/2026", "Pix - Recebido", "05/01 10:02 THALES NOOR RO", "180,00", "Entrada", "", "", "PF"],
    ["06/01/2026", "Pix - Enviado", "06/01 09:05 DANIELE DE SOUZA OLIVEIRA", "-40,00", "Saída", "CIRCO", "ESPORTE", "PF"],
    ["08/01/2026", "Pix - Enviado", "THE HOT MACHINE", "-6,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["09/01/2026", "Pix - Enviado", "Marco Aurelio De Morais S", "-110,00", "Saída", "", "FLORES", "PF"],
    ["12/01/2026", "Pix - Enviado", "LUKAS MARTT", "-40,00", "Saída", "CIRCO", "ESPORTE", "PF"],
    ["13/01/2026", "Pix - Recebido", "CARLOS P ANGEL", "1.000,00", "Entrada", "", "", "PF"],
    ["13/01/2026", "Pix - Enviado", "NANOBIOTECH", "-340,00", "Saída", "ALCOOL", "FLORES", "PF"],
    ["16/01/2026", "Pix - Recebido", "Jayaliila Barr", "1.000,00", "Entrada", "", "", "PF"],
    ["16/01/2026", "Pix - Enviado", "JOSE RONALDO LOPES DUQUE", "-1.000,00", "Saída", "EQUIPAMENTOS", "TRABALHO", "PJ"],
    ["16/01/2026", "Pix - Enviado", "TRILHAS DA AMAZONIA", "-9,52", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["19/01/2026", "Pix - Enviado", "SARA SOUSA FREITAS", "-70,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["19/01/2026", "Pix - Enviado", "SARA SOUSA FREITAS", "-15,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["21/01/2026", "Pix - Enviado", "OPCAO MATERIAIS PARA CONS", "-3,00", "Saída", "", "CASA", "PF"],
    ["21/01/2026", "Pix - Enviado", "SNOOB FAST FOOD", "-12,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["23/01/2026", "Pix - Enviado", "Enzo Pinto Bomfim Moura", "-250,00", "Saída", "", "TRABALHO", "PJ"],
    ["23/01/2026", "Pix - Enviado", "+ PERTO", "-4,79", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["26/01/2026", "Pix - Enviado", "Ivone Ribeiro Machado", "-65,45", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["26/01/2026", "Pix - Enviado", "ADENILSON RODR", "-24,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["26/01/2026", "Pix - Enviado", "João Batista de Oliveira", "-6,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["30/01/2026", "Pix - Enviado", "Jayaliila Barretto", "-600,00", "Saída", "", "", "PF"],
    ["31/01/2026", "S A L D O", " ", "642,35", "SALDO", "", "", ""]
]

fev_data = [
    ["30/01/2026", "Saldo Anterior", " ", "642,35", "SALDO", "", "", ""],
    ["04/02/2026", "Pix - Recebido", "CRISTINA ROBERTO BUFFET E", "1.700,00", "Entrada", "", "TRABALHO", "PJ"],
    ["04/02/2026", "Pix - Enviado", "CRISTINA ROBERTO BUFFET E", "-1.700,00", "Saída", "", "OUTROS", "PJ"],
    ["05/02/2026", "Pix - Recebido", "CARLOS P ANGEL", "1.000,00", "Entrada", "", "", "PF"],
    ["09/02/2026", "Pix - Enviado", "JAMBURITA RESTAURANTE LTD", "-142,50", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["10/02/2026", "Pix - Enviado", "Jayaliila Barretto de And", "-700,00", "Saída", "", "", "PF"],
    ["10/02/2026", "Pagamento de Boleto", "BENDH CONDOMINIO GARANTIDO LTD", "-680,90", "Saída", "CONDOMINIO", "CASA", "PJ"],
    ["13/02/2026", "Pix - Recebido", "ABACAXI ATE", "700,00", "Entrada", "", "TRABALHO", "PJ"],
    ["13/02/2026", "Pix - Enviado", "JOSE GABRIEL DE SOUSA GON", "-520,00", "Saída", "", "OUTROS", "PF"],
    ["18/02/2026", "Pix - Enviado", "Maria Helena bezerra", "-17,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["18/02/2026", "Pix - Enviado", "NEOENERGIA DISTRIBUICAO B", "-122,20", "Saída", "ENERGIA", "CASA", "PJ"],
    ["19/02/2026", "Pix - Recebido", "ABACAXI ATE", "1.000,00", "Entrada", "", "TRABALHO", "PJ"],
    ["19/02/2026", "Pix - Enviado", "JOSE RONALDO LOPES DUQUE", "-1.000,00", "Saída", "", "OUTROS", "PJ"],
    ["23/02/2026", "Pix - Enviado", "KEISUKE MIYAHARA", "-18,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
    ["23/02/2026", "Pix - Enviado", "Marco Aurelio De Morais S", "-80,00", "Saída", "", "OUTROS", "PF"],
    ["23/02/2026", "Pix - Enviado", "Jayaliila Barretto de And", "-12,76", "Saída", "", "OUTROS", "PF"],
    ["25/02/2026", "Tarifa MSG", "Cobrança Automática", "-5,00", "Saída", "", "TAXAS", "PF"],
    ["27/02/2026", "Pix - Recebido", "LEANDRO ROD", "200,00", "Entrada", "", "TRABALHO", "PJ"],
    ["27/02/2026", "S A L D O", " ", "243,99", "SALDO", "", "", ""]
]

def format_curr(val):
    return f"R$ {val:,.2f}".replace('.', 'X').replace(',', '.').replace('X', ',')

def get_summary_card(month_name, initial, final, in_pj, in_pf, out_pj, out_pf):
    return [
        [month_name.upper() + " - RESUMO", ""],
        ["Saldo Inicial", format_curr(initial)],
        ["Saldo Final", format_curr(final)],
        ["Diferença", format_curr(final - initial)],
        ["", ""],
        ["ENTRADAS PJ", format_curr(in_pj)],
        ["ENTRADAS PF", format_curr(in_pf)],
        ["SAÍDAS PJ", format_curr(out_pj)],
        ["SAÍDAS PF", format_curr(out_pf)],
        ["", ""],
        ["TOTAL BRUTO", format_curr(in_pj + in_pf - (out_pj + out_pf))]
    ]

def restructure():
    # 1. Manage Sheets
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    existing_sheets = {s['properties']['title']: s['properties']['sheetId'] for s in spr['sheets']}
    
    if "RESUMO MENSAL" not in existing_sheets:
        requests = [{"addSheet": {"properties": {"title": "RESUMO MENSAL"}}}]
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': requests}).execute()
        spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
        existing_sheets = {s['properties']['title']: s['properties']['sheetId'] for s in spr['sheets']}

    lan_id = existing_sheets.get("CONTA CORRENTE BB")
    res_id = existing_sheets.get("RESUMO MENSAL")

    unified_table = [headers] + jan_data + [[""]] + [headers] + fev_data
    while len(unified_table) < 200: unified_table.append([""] * 8)

    card_jan = get_summary_card("Janeiro", 1263.00, 642.35, 0, 2780.00, 1250.00, 2150.65)
    card_fev = get_summary_card("Fevereiro", 642.35, 243.99, 3600.00, 1000.00, 3503.10, 1495.26)
    
    summary_layout = [[""]*10 for _ in range(30)]
    for r_idx, r in enumerate(card_jan):
        summary_layout[r_idx+2][1] = r[0]
        summary_layout[r_idx+2][2] = r[1]
    for r_idx, r in enumerate(card_fev):
        summary_layout[r_idx+2][5] = r[0]
        summary_layout[r_idx+2][6] = r[1]

    # Writing
    data = [
        {'range': "'CONTA CORRENTE BB'!A1:H200", 'values': unified_table},
        {'range': "'RESUMO MENSAL'!A1:J30", 'values': summary_layout}
    ]
    service.spreadsheets().values().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'valueInputOption': 'USER_ENTERED', 'data': data}).execute()

    # Simple Formatting using RepeatCell (Safe)
    requests = [
        # Bold Headers in Lançamentos
        {"repeatCell": {"range": {"sheetId": lan_id, "startRowIndex": 0, "endRowIndex": 1, "startColumnIndex": 0, "endColumnIndex": 8},
                        "cell": {"userEnteredFormat": {"backgroundColor": {"red": 0.0, "green": 0.3, "blue": 0.1}, "textFormat": {"bold": True, "foregroundColor": {"red": 1, "green": 1, "blue": 1}}}}, "fields": "userEnteredFormat(backgroundColor,textFormat)"}},
        # Yellow Cards for Resumo
        {"repeatCell": {"range": {"sheetId": res_id, "startRowIndex": 2, "endRowIndex": 13, "startColumnIndex": 1, "endColumnIndex": 3},
                        "cell": {"userEnteredFormat": {"backgroundColor": {"red": 1.0, "green": 1.0, "blue": 0.0}}}, "fields": "userEnteredFormat(backgroundColor)"}},
        {"repeatCell": {"range": {"sheetId": res_id, "startRowIndex": 2, "endRowIndex": 13, "startColumnIndex": 5, "endColumnIndex": 7},
                        "cell": {"userEnteredFormat": {"backgroundColor": {"red": 1.0, "green": 1.0, "blue": 0.0}}}, "fields": "userEnteredFormat(backgroundColor)"}}
    ]
    service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': requests}).execute()
    print("Clean Restructuring Applied.")

if __name__ == '__main__':
    restructure()
