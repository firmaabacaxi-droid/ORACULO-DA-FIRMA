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
    "RECEITA FEDERAL": ("IMPOSTOS", "PJ"),
    "TELEFONICA": ("CASA", "PJ"),
    "SUPER ADEGA": ("ALIMENTAÇÃO", "PF"),
    "SUPERMERCADO": ("ALIMENTAÇÃO", "PF"),
    "BARRETO": ("ALIMENTAÇÃO", "PF"),
    "TOCA F C": ("TRABALHO", "PJ"),
    "ABACAXI ATE": ("TRABALHO", "PJ"),
    "AZUL LINHAS": ("VIAGEM", "PF"),
    "H PLUS": ("HOSPEDAGEM", "PF"),
    "CASA AMARELA": ("ALIMENTAÇÃO", "PF"),
    "CAFE COM GRACA": ("ALIMENTAÇÃO", "PF"),
    "CANTINHO DAS DELICIAS": ("ALIMENTAÇÃO", "PF"),
    "RESGATE RDB": ("INVESTIMENTO", "PF"),
    "APLICAÇÃO RDB": ("INVESTIMENTO", "PF"),
    "LENICE RODRIGUES": ("OUTROS", "PF"),
    "JOAREZ CORREIA": ("OUTROS", "PF"),
    "PEDRO MARTINS": ("OUTROS", "PF"),
    "SARA SOUSA": ("ALIMENTAÇÃO", "PF"),
    "ANTONIO FELIPPE": ("ALIMENTAÇÃO", "PF")
}

def get_cat_pjpf(details_str):
    details_upper = details_str.upper()
    for key, (cat, pjpf) in CATEGORIES.items():
        if key in details_upper:
            return cat, pjpf
    return "OUTROS", "PF"

def process_nu_tab():
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CONTA NU'!A1:H300").execute()
    values = result.get('values', [])
    if not values: return

    header = ["Data", "Lançamento", "Detalhes", "Valor", "Tipo", "Descrição", "Categoria", "PF/PJ"]
    data_rows = values[1:]
    
    processed = []
    for row in data_rows:
        if not row or len(row) < 2: continue
        
        # Standardize to 8 cols
        while len(row) < 6: row.append("")
        
        lanc = row[1]
        dtls = row[2] if len(row) > 2 else ""
        
        cat, pjpf = get_cat_pjpf(dtls if dtls and dtls != " " else lanc)
        
        # Trim to 6 then add 2
        final_row = row[:6]
        while len(final_row) < 6: final_row.append("")
        final_row.append(cat)
        final_row.append(pjpf)
        processed.append(final_row)

    # Write back to NU
    full_output = [header] + processed
    while len(full_output) < 300: full_output.append([""] * 8)
    
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'CONTA NU'!A1:H300",
                         valueInputOption='USER_ENTERED', body={'values': full_output}).execute()
    print("Nubank data processed and categorized.")

if __name__ == '__main__':
    process_nu_tab()
