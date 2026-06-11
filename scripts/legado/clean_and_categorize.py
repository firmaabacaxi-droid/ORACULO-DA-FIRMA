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
    "MARCO AURELIO": ("FLOERS", "PF"),
    "NANOBIOTECH": ("FLOERS", "PF")
}

def get_cat_pjpf(details_str):
    details_upper = details_str.upper()
    for key, (cat, pjpf) in CATEGORIES.items():
        if key in details_upper:
            return cat, pjpf
    return "OUTROS", "PF"

def clean_and_process():
    # 1. Read
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:ZZ500").execute()
    values = result.get('values', [])
    if not values: return

    header = values[0]
    data_rows = values[1:]
    
    processed_rows = []
    
    for row in data_rows:
        if not row or len(row) < 2: continue
        
        # Check for intermediate balance rows
        desc = row[1].lower()
        if "saldo do dia" in desc:
            continue
            
        # Clean current row (remove extra spaces)
        row = [str(x).strip() for x in row]
        
        # Re-map columns: Mês, Data, Banco/Conta, Lançamento, Detalhes, Valor, Tipo, Descrição, Categoria, PF/PJ
        # Our current input format from 'pasted again' might be different. 
        # Output from read_lan_full says:
        # ['Data', 'Lançamento', 'Detalhes', 'Valor', 'Tipo Lançamento', 'DESCRIÇÃO', 'CATEGORIA', 'PF OU PJ']
        
        date = row[0]
        lanc = row[1]
        dtls = row[2]
        val = row[3]
        tipo = row[4] if len(row) > 4 else ""
        
        # Logic to determine Month
        month = "JANEIRO"
        if "/02/" in date or "/02/" in dtls:
            month = "FEVEREIRO"
        elif "/12/" in date: # Saldo anterior do ano anterior
            month = "JANEIRO"
            
        cat, pjpf = get_cat_pjpf(dtls if dtls and dtls != " " else lanc)
        
        # New order: Mês (0), Data (1), Banco/Conta (2), Lançamento (3), Detalhes (4), Valor (5), Tipo (6), Desc (7), Cat (8), PJPF (9)
        new_row = [
            month,
            date,
            "BANCO DO BRASIL", # Banco/Conta
            lanc,
            dtls,
            val,
            tipo,
            "", # Descrição adicional
            cat,
            pjpf
        ]
        processed_rows.append(new_row)

    # Write back
    new_header = ["Mês", "Data", "Banco/Conta", "Lançamento", "Detalhes", "Valor", "Tipo", "Descrição", "Categoria", "PF/PJ"]
    full_output = [new_header] + processed_rows
    
    # Pad to clear old junk
    while len(full_output) < 200:
        full_output.append([""] * 10)
        
    sheet.values().update(
        spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:J200",
        valueInputOption='USER_ENTERED', body={'values': full_output}).execute()

if __name__ == '__main__':
    clean_and_process()
