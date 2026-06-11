import os
import uuid
from google.oauth2 import service_account
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = 'C:\\Users\\User\\Documents\\ANTIGRAVITY\\google_service_account.json'
SPREADSHEET_ID = '1Qd9-u9dBbzc5sNLEO0XlAy0sQ7nUfEaiDVEzkD9h2Y4'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

service = build('sheets', 'v4', credentials=creds)
sheet = service.spreadsheets()

PJ_KEYWORDS = [
    "ADOBE", "NOTION", "CHATGPT", "OPENAI", "HOSTINGER", "GOOGLE ONE", "HOTMART", "MICROSOFT", "MUBI", "SEMINOVOS", "READY TO GO"
]

def clean_and_padronize_black():
    print("Reading CARTÃO BLACK...")
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO BLACK'!A1:H200").execute()
    values = result.get('values', [])
    if not values: return

    # Universal Header:
    # 0: Data
    # 1: Lançamento
    # 2: Detalhes (UUID)
    # 3: Valor (R$)
    # 4: Tipo (Entrada/Saída)
    # 5: Descrição (Texto)
    # 6: Categoria
    # 7: PF/PJ
    new_header = ["Data", "Lançamento", "Detalhes", "Valor", "Tipo", "Descrição", "Categoria", "PF/PJ"]
    cleaned_rows = [new_header]
    
    for row in values:
        if not row or not row[0]: continue
        if row[0] == "Data": continue # Skip headers
        
        # Old columns: 0:Data, 1:Lanc, 2:Det, 3:Num, 4:Valor, 5:Tipo, 6:Desc, 7:Cat
        if len(row) < 5: continue
        
        data = row[0]
        # Year suffix logic? The data has "14/03", "30/12".
        # Assuming current or prev year. If month > 5 and current month is March, likely 2025.
        # But for consistency, I'll just keep the user's string or append /2026 where it makes sense.
        # Given the "14/03" entries at the top, those are likely 2026.
        if "/" in data and len(data.split("/")) == 2:
            day, month = data.split("/")
            if int(month) < 4: data = f"{data}/2026"
            else: data = f"{data}/2025"

        lanc = row[1]
        valor = row[4]
        tipo = row[5] if len(row) > 5 else "Saída"
        desc = row[6] if len(row) > 6 else ""
        cat = row[7] if len(row) > 7 else "OUTROS"
        
        # Format Valor
        if "R$" not in str(valor):
            try:
                v_str = str(valor).replace(".", "").replace(",", ".")
                f_val = float(v_str)
                valor = f"-R$ {abs(f_val):,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.') if f_val < 0 else f"R$ {abs(f_val):,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
            except: pass

        # UUID
        det = str(uuid.uuid4())
        
        # PJ/PF Inference
        pfpj = "PF"
        desc_upper = desc.upper()
        for k in PJ_KEYWORDS:
            if k in desc_upper:
                pfpj = "PJ"
                break
        
        cleaned_rows.append([data, lanc, det, valor, tipo, desc, cat, pfpj])

    # Sort cleaned_rows by date
    # (Skip header, sort by data index 0)
    # This might be tricky with strings, but let's try a simple sort.
    # header = cleaned_rows[0]
    # body = cleaned_rows[1:]
    # body.sort(key=lambda x: (int(x[0].split("/")[2]), int(x[0].split("/")[1]), int(x[0].split("/")[0])))
    # cleaned_rows = [header] + body

    # Clear and Write
    sheet.values().clear(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO BLACK'!A1:H200").execute()
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO BLACK'!A1:H200",
                         valueInputOption='USER_ENTERED', body={'values': cleaned_rows}).execute()
    print("CARTÃO BLACK cleaned and standardized.")

if __name__ == '__main__':
    clean_and_padronize_black()
