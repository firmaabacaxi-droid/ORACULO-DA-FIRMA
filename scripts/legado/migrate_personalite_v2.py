import os
import uuid
import re
from google.oauth2 import service_account
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = 'C:\\Users\\User\\Documents\\ANTIGRAVITY\\google_service_account.json'
SPREADSHEET_ID = '1Qd9-u9dBbzc5sNLEO0XlAy0sQ7nUfEaiDVEzkD9h2Y4'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

service = build('sheets', 'v4', credentials=creds)
sheet = service.spreadsheets()

def format_currency_to_float(val_str):
    if not val_str: return 0.0
    # Removes 'R$', '.', and replaces ',' with '.'
    clean_val = str(val_str).replace('R$', '').replace('.', '').replace(',', '.').strip()
    try:
        return float(clean_val)
    except:
        return 0.0

def float_to_currency(val):
    sign = "-" if val < 0 else ""
    return f"{sign}R$ {abs(val):,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')

def migrate_personalite_v2():
    print("Iniciando Migração CARTÃO PERSONALITE V2 (Standardizing Portadores)...")
    
    # Read entire range
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO PERSONALITE'!A1:H500").execute()
    raw_values = result.get('values', [])
    
    if not raw_values: 
        print("Nenhum dado encontrado.")
        return

    processed_rows = []
    # Start with Filipe Jan (based on previous turns knowledge/sheet start)
    current_portador = "Felipe"
    current_mes = "01"
    
    header = ["Data", "Lançamento", "Detalhes", "Valor", "Tipo", "Descrição", "Categoria", "PF/PJ"]
    processed_rows.append(header)
    
    for row in raw_values:
        if not row: continue
        
        # Concatenate row for marker detection
        row_str = " ".join([str(c) for c in row]).upper()
        
        # Detection of markers added by user
        if "FILIPE" in row_str and "FEVEREIRO" in row_str:
            current_portador = "Felipe"
            current_mes = "02"
            continue
        elif "JAYA" in row_str and "FEVEREIRO" in row_str:
            current_portador = "Jaya"
            current_mes = "02"
            continue
        elif "FILIPE" in row_str and "JANEIRO" in row_str:
            current_portador = "Felipe"
            current_mes = "01"
            continue
        elif "JAYA" in row_str and "JANEIRO" in row_str:
            current_portador = "Jaya"
            current_mes = "01"
            continue
        
        # Skip generic headers
        if "DATA" in row_str and ("LANÇAMENTO" in row_str or "LANAMENTO" in row_str):
            continue
            
        # Detect transaction rows (Data in col 0)
        # Format: DD/MM (like 16/02)
        if len(row) >= 5 and re.match(r'\d{1,2}/\d{1,2}', str(row[0])):
            date_str = str(row[0])
            parts = date_str.split("/")
            day = parts[0].zfill(2)
            month = parts[1].zfill(2)
            
            # Logic for year: If month is current/near, 2026. If high month, 2025.
            # But let's follow the 'current_mes' marker for the year if it was clear.
            # Wait, if row[0] is '16/02', it should be Feb. 
            year = "2026"
            if int(month) > 6: year = "2025"
            final_date = f"{day}/{month}/{year}"

            lanc = row[1]
            raw_details = row[2] if len(row) > 2 else ""
            
            valor_raw = row[4] if len(row) > 4 else "0"
            valor_float = format_currency_to_float(valor_raw)
            valor_final = float_to_currency(valor_float)
            
            tipo = "Saída" if valor_float < 0 else "Entrada"
            
            # Original Desc (usually in col 6 in user's draft, or col 1)
            original_desc = row[6] if len(row) > 6 else lanc
            
            # Formatting Desc: [Portador] | [Original Desc]
            # Ensure we don't duplicate names if they are already there
            clean_desc = str(original_desc).replace("Felipe | ", "").replace("Jaya | ", "").strip()
            final_desc = f"{current_portador} | {clean_desc}"
            
            if raw_details and raw_details.strip():
                final_desc += f" | {raw_details.strip()}"
            
            # Category
            cat = row[7] if len(row) > 7 else "OUTROS"
            
            # PJ/PF
            pfpj = "PF"
            if any(k in final_desc.upper() for k in ["NOTION", "ADOBE", "OPENAI", "HOSTINGER", "GOOGLE ONE"]):
                pfpj = "PJ"
            
            processed_rows.append([final_date, lanc, str(uuid.uuid4()), valor_final, tipo, final_desc, cat, pfpj])

    # Clear and Write
    print(f"Escrevendo {len(processed_rows)-1} linhas formatadas com Portadores corretos...")
    sheet.values().clear(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO PERSONALITE'!A1:H500").execute()
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO PERSONALITE'!A1:H500",
                         valueInputOption='USER_ENTERED', body={'values': processed_rows}).execute()
    print("Sincronização Finalizada.")

if __name__ == '__main__':
    migrate_personalite_v2()
