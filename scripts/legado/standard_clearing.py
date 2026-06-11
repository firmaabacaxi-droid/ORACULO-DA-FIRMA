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
    "NANOBIOTECH": ("FLORES", "PF"),
    "LE PAIN RUSTIQUE": ("ALIMENTAÇÃO", "PF")
}

def get_cat_pjpf(details_str):
    details_upper = details_str.upper()
    for key, (cat, pjpf) in CATEGORIES.items():
        if key in details_upper:
            return cat, pjpf
    return "OUTROS", "PF"

def clearing_v2():
    # 1. Read
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:H200").execute()
    values = result.get('values', [])
    if not values: return

    header = values[0]
    data_rows = values[1:]
    
    # We need to identify indices of the first/last balance rows we want to keep.
    # From manual analysis of read_lan_full output:
    # JAN Start: row 2 (0-indexed 0)
    # JAN End: row 49 (0-indexed 47)
    # FEV Start: row 50 (0-indexed 48)
    # FEV End: row 67 (0-indexed 65)

    processed = []
    
    # Heuristic: Keep if 'Saldo Anterior' or 'S A L D O'. Discard if 'Saldo do dia'.
    # Categorize others.
    
    for i, row in enumerate(data_rows):
        if not row or len(row) < 2: continue
        
        lanc = row[1].upper()
        
        if "SALDO DO DIA" in lanc:
            continue
            
        # Standardize category for all rows (except pure balance rows)
        if "SALDO" not in lanc:
            dtls = row[2] if len(row) > 2 else ""
            cat, pjpf = get_cat_pjpf(dtls if dtls and dtls != " " else row[1])
            # Ensure at least 8 columns
            while len(row) < 8: row.append("")
            row[6] = cat
            row[7] = pjpf
        
        processed.append(row)

    # Write back
    full_output = [header] + processed
    while len(full_output) < 100: full_output.append([""] * 8)
    
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:H100",
                         valueInputOption='USER_ENTERED', body={'values': full_output}).execute()
    print("Standard Clearing and Categorization Applied.")

if __name__ == '__main__':
    clearing_v2()
