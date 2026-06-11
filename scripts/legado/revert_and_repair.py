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

CATEGORIES = {
    "CIRCO": ("ESPORTE", "PF"),
    "LUCAS COIMBRA": ("ESPORTE", "PF"),
    "LUKAS MARTT": ("ESPORTE", "PF"),
    "DANIELE DE SOUZA": ("ESPORTE", "PF"),
    "ABACAXI ATE": ("TRABALHO", "PJ"),
    "CRISTINA ROBERTO": ("TRABALHO", "PJ"),
    "CARLOS P ANGEL": ("TRABALHO", "PF"),
    "THALES NOOR": ("TRABALHO", "PF"),
    "LEANDRO ROD": ("TRABALHO", "PJ"),
    "JOSE RONALDO": ("TRABALHO", "PJ"),
    "ENZO PINTO": ("TRABALHO", "PJ"),
    "SNOOB": ("ALIMENTAÇÃO", "PF"),
    "HOT MACHINE": ("ALIMENTAÇÃO", "PF"),
    "SARA SOUSA": ("ALIMENTAÇÃO", "PF"),
    "JAMBURITA": ("ALIMENTAÇÃO", "PF"),
    "KEISUKE": ("ALIMENTAÇÃO", "PF"),
    "LE PAIN": ("ALIMENTAÇÃO", "PF"),
    "TRILHAS DA AMAZONIA": ("ALIMENTAÇÃO", "PF"),
    "NEOENERGIA": ("CASA", "PJ"),
    "OPCAO MATERIAIS": ("CASA", "PF"),
    "CONDOMINIO": ("CASA", "PJ"),
    "BENDH CONDOMINIO": ("CASA", "PJ"),
    "UBER": ("TRANSPORTE", "PF"),
    "Tarifa MSG": ("TAXAS", "PF"),
    "JOSE GABRIEL": ("OUTROS", "PF"),
    "JAYALIILA": ("OUTROS", "PF"),
    "MARIA HELENA": ("OUTROS", "PF"),
    "MARCO AURELIO": ("FLORES", "PF"),
    "NANOBIOTECH": ("FLORES", "PF")
}

def get_cat_pjpf(details_str):
    details_upper = details_str.upper()
    for key, (cat, pjpf) in CATEGORIES.items():
        if key in details_upper:
            return cat, pjpf
    return "OUTROS", "PF"

def repair_layout():
    # 1. Read current state
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:ZZ500").execute()
    values = result.get('values', [])
    if not values: return

    # Original Headers from user's first image
    original_headers = ["Data", "Lançamento", "Detalhes", "Valor", "Tipo Lançamento", "DESCRIÇÃO", "CATEGORIA", "PF OU PJ"]
    
    new_data = []
    
    for row in values[1:]:
        if not row: continue
        # My current messed layout: Mês(0), Data(1), Banco(2), Lan(3), Dtls(4), Val(5), Tipo(6), Desc(7), Cat(8), PJPF(9)
        if len(row) < 7: continue
        
        date = row[1]
        lanc = row[3]
        dtls = row[4]
        val = row[5]
        tipo = row[6]
        
        # Determine category based on dtls or lanc
        cat, pjpf = get_cat_pjpf(dtls if dtls and dtls != " " else lanc)
        
        # New row in ORIGINAL layout:
        # A: Data, B: Lançamento, C: Detalhes, D: Valor, E: Tipo, F: Descrição, G: Categoria, H: PF OU PJ
        new_row = [
            date,
            lanc,
            dtls,
            val,
            tipo,
            "", # Descrição
            cat,
            pjpf
        ]
        new_data.append(new_row)

    # 2. Reset the sheet completely (values and formatting)
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    sid = [s['properties']['sheetId'] for s in spr['sheets'] if s['properties']['title'] == "LANÇAMENTOS"][0]
    
    clear_requests = [
        {"updateCells": {"range": {"sheetId": sid}, "fields": "userEnteredValue,userEnteredFormat"}},
        {"deleteRange": {"range": {"sheetId": sid, "startColumnIndex": 8, "endColumnIndex": 20}, "shiftDimension": "COLUMNS"}}
    ]
    # service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': clear_requests}).execute()

    # Write cleaned data
    full_output = [original_headers] + new_data
    while len(full_output) < 100: full_output.append([""] * 8)
    
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:H100",
                         valueInputOption='USER_ENTERED', body={'values': full_output}).execute()

    # 3. Simple Formatting (Original Style)
    format_requests = [
        {"repeatCell": {"range": {"sheetId": sid, "startRowIndex": 0, "endRowIndex": 1, "startColumnIndex": 0, "endColumnIndex": 8},
                        "cell": {"userEnteredFormat": {"backgroundColor": {"red": 0.1, "green": 0.3, "blue": 0.2}, "textFormat": {"bold": True, "foregroundColor": {"red": 1, "green": 1, "blue": 1}}}},
                        "fields": "userEnteredFormat(backgroundColor,textFormat)"}}
    ]
    service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': format_requests}).execute()
    print("Reverted to original layout and fixed 'FLORES' typo.")

if __name__ == '__main__':
    repair_layout()
