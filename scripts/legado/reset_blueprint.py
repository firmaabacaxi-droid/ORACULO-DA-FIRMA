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

def blueprint():
    # 1. Get current sheets to clear/rename
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    existing_sheets = {s['properties']['title']: s['properties']['sheetId'] for s in spr['sheets']}
    
    requests = []
    
    # Target tab names
    target_tabs = ["LANÇAMENTOS", "RESUMO MENSAL", "CONFIGURAÇÕES"]
    
    # Rename/Delete to reach target state
    # First, rename the first sheet to LANÇAMENTOS
    first_sheet_title = spr['sheets'][0]['properties']['title']
    if first_sheet_title != "LANÇAMENTOS":
        requests.append({
            "updateSheetProperties": {
                "properties": {"sheetId": existing_sheets[first_sheet_title], "title": "LANÇAMENTOS"},
                "fields": "title"
            }
        })
    
    # Add other tabs if missing
    for tab in target_tabs[1:]:
        if tab not in existing_sheets:
            requests.append({"addSheet": {"properties": {"title": tab}}})
            
    # Send initial tab management
    if requests:
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': requests}).execute()
        spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
        existing_sheets = {s['properties']['title']: s['properties']['sheetId'] for s in spr['sheets']}

    # 2. Clear all sheets
    clear_requests = []
    for title, sid in existing_sheets.items():
        # Clear values and formatting
        clear_requests.append({"updateCells": {"range": {"sheetId": sid}, "fields": "userEnteredValue,userEnteredFormat"}})
        # Reset grid properties (like column width) if desired? No, just values for now.
    
    service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': clear_requests}).execute()

    # 3. Define Headers and Layout
    lan_headers = [["Mês", "Data", "Banco/Conta", "Lançamento", "Detalhes", "Valor", "Tipo", "Descrição", "Categoria", "PF/PJ"]]
    cfg_headers = [["BANCO/CONTA", "", "CATEGORIAS", "", "PF/PJ"]]
    
    # Resumo layout (Template for one month block)
    res_template = [
        ["RESUMO MENSAL - [MÊS]", "[NOME DA CONTA]"],
        ["Saldo Inicial", ""],
        ["Saldo Final", ""],
        ["Diferença", ""],
        ["", ""],
        ["ENTRADAS PJ", ""],
        ["ENTRADAS PF", ""],
        ["SAÍDAS PJ", ""],
        ["SAÍDAS PF", ""],
        ["", ""],
        ["TOTAL BRUTO", ""]
    ]

    # Write Headers
    data_updates = [
        {'range': "'LANÇAMENTOS'!A1:J1", 'values': lan_headers},
        {'range': "'CONFIGURAÇÕES'!A1:E1", 'values': cfg_headers},
        {'range': "'RESUMO MENSAL'!A1:B11", 'values': res_template}
    ]
    service.spreadsheets().values().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'valueInputOption': 'USER_ENTERED', 'data': data_updates}).execute()

    # 4. Professional Formatting
    final_requests = []
    for tab_name in ["LANÇAMENTOS", "CONFIGURAÇÕES"]:
        sid = existing_sheets[tab_name]
        # Bold Header, Dark Blue background, White text
        final_requests.append({
            "repeatCell": {
                "range": {"sheetId": sid, "startRowIndex": 0, "endRowIndex": 1, "startColumnIndex": 0, "endColumnIndex": 10},
                "cell": {"userEnteredFormat": {"backgroundColor": {"red": 0.1, "green": 0.1, "blue": 0.3}, "textFormat": {"bold": True, "foregroundColor": {"red": 1, "green": 1, "blue": 1}}}},
                "fields": "userEnteredFormat(backgroundColor,textFormat)"
            }
        })
        # Zebra stripes (Banded Range) - using a known good field name
        final_requests.append({
            "addBandedRange": {
                "bandedRange": {
                    "range": {"sheetId": sid, "startRowIndex": 1, "endRowIndex": 100, "startColumnIndex": 0, "endColumnIndex": 10},
                    "rowProperties": {
                        "firstBandColor": {"red": 1, "green": 1, "blue": 1},
                        "secondBandColor": {"red": 0.96, "green": 0.96, "blue": 0.96}
                    }
                }
            }
        })

    # Summary Sheet Formatting (RESUMO MENSAL)
    res_sid = existing_sheets["RESUMO MENSAL"]
    final_requests.append({
        "repeatCell": {
            "range": {"sheetId": res_sid, "startRowIndex": 0, "endRowIndex": 1, "startColumnIndex": 0, "endColumnIndex": 2},
            "cell": {"userEnteredFormat": {"backgroundColor": {"red": 1, "green": 0.9, "blue": 0}, "textFormat": {"bold": True, "fontSize": 11}}},
            "fields": "userEnteredFormat(backgroundColor,textFormat)"
        }
    })
    # Borders for card
    final_requests.append({
        "updateBorders": {
            "range": {"sheetId": res_sid, "startRowIndex": 0, "endRowIndex": 11, "startColumnIndex": 0, "endColumnIndex": 2},
            "top": {"style": "SOLID"}, "bottom": {"style": "SOLID"}, "left": {"style": "SOLID"}, "right": {"style": "SOLID"},
            "innerHorizontal": {"style": "SOLID_THIN"}
        }
    })

    service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': final_requests}).execute()
    print("Blueprint for multi-account system created.")

if __name__ == '__main__':
    blueprint()
