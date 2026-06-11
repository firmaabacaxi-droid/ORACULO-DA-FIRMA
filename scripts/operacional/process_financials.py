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

def parse_val(val_str):
    if not val_str: return 0.0
    try:
        # Format: "1.263,00" -> 1263.0
        clean = val_str.replace('.', '').replace(',', '.')
        return float(clean)
    except:
        return 0.0

def process():
    # 1. Read the sheet
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CONTA CORRENTE BB'!A1:I100").execute()
    rows = result.get('values', [])
    
    # 2. Separate JAN, Summary, and FEV
    jan_rows = rows[1:49] # Rows 2-49 (index 1 to 48)
    # Filter JAN
    clean_jan = []
    total_in_jan = 0.0
    total_out_jan = 0.0
    
    for r in jan_rows:
        if not r or len(r) < 2: continue
        tipo = r[1].lower() if len(r) > 1 else ""
        if "saldo do dia" in tipo:
            continue
        clean_jan.append(r)
        
        # Calculate totals (skip first and last for transaction sum?)
        # User wants "TOTAL DE ENTRA" and "TOTAL DE SAIDA"
        if "recebido" in tipo:
            total_in_jan += parse_val(r[3])
        elif "enviado" in tipo or "pagamento" in tipo or "tarifa" in tipo or "boleto" in tipo:
            val = parse_val(r[3])
            if val < 0: total_out_jan += abs(val)
            else: total_out_jan += val # Some might be positive in the string but meant as negative

    saldo_inicial_jan = parse_val(jan_rows[0][3])
    saldo_final_jan = parse_val(jan_rows[-1][3])

    # 3. Process February (Incomplete in sheet, but clean what exists)
    fev_rows = rows[61:] # Header at 60, data starts 61 (index 61 to 78)
    clean_fev = []
    for r in fev_rows:
        if not r or len(r) < 2: continue
        tipo = r[1].lower() if len(r) > 1 else ""
        if "saldo do dia" in tipo:
            continue
        clean_fev.append(r)

    # 4. Prepare updates
    # Update G51:G54 (Summary Area)
    summary_values = [
        [f"{saldo_inicial_jan:,.2f}".replace('.', 'X').replace(',', '.').replace('X', ',')], # SALDO PRIMEIRO DIA
        [f"{saldo_final_jan:,.2f}".replace('.', 'X').replace(',', '.').replace('X', ',')],   # SALDO ULTIMO DIA
        [f"{total_in_jan:,.2f}".replace('.', 'X').replace(',', '.').replace('X', ',')],      # TOTAL ENTRADAS
        [f"{total_out_jan:,.2f}".replace('.', 'X').replace(',', '.').replace('X', ',')]      # TOTAL SAIDAS
    ]

    # Clean the JAN area (A2:I49) - Put clean_jan and then empty strings
    final_jan_block = clean_jan + [[""] * 9] * (48 - len(clean_jan))
    
    # Clean the FEV area (A62:I80)
    final_fev_block = clean_fev + [[""] * 9] * (20 - len(clean_fev))

    # Batch Update
    data = [
        {'range': "'CONTA CORRENTE BB'!G51:G54", 'values': summary_values},
        {'range': "'CONTA CORRENTE BB'!A2:I49", 'values': final_jan_block},
        {'range': "'CONTA CORRENTE BB'!A62:I81", 'values': final_fev_block}
    ]
    body = {'valueInputOption': 'USER_ENTERED', 'data': data}
    sheet.values().batchUpdate(spreadsheetId=SPREADSHEET_ID, body=body).execute()
    print("Cleaned and Summary written.")

if __name__ == '__main__':
    process()
