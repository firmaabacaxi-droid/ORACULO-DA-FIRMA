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

def padronizar_inter():
    print("Reading CONTA INTER...")
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CONTA INTER'!A1:H1000").execute()
    values = result.get('values', [])
    if not values: return

    # Universal Header:
    # 0: Data
    # 1: Lançamento
    # 2: Detalhes
    # 3: Valor
    # 4: Tipo
    # 5: Descrição
    # 6: Categoria
    # 7: PF/PJ
    universal_header = ["Data", "Lançamento", "Detalhes", "Valor", "Tipo", "Descrição", "Categoria", "PF/PJ"]
    
    new_values = [universal_header]
    
    for row in values:
        if not row or not row[0]: continue
        if row[0] == "Data": continue # Skip all headers
        
        # Look at row length to determine if it's the old format or new format
        # Old Format: '02/01/2026', 'Imposto', 'IOF Adicional', '-', '-0,29', 'Saída', 'IOF ADICIONAL', 'TAXAS'
        # New Format: '02/02/2026', 'Imposto', 'e7f98533...', '-R$0,25', 'Saída', 'IOF Adicional', 'OUTROS', 'PJ'
        
        val_str = str(row[3]) if len(row) > 3 else ""
        if len(row[2]) > 30 and ("-" in row[2]) and "R$" in val_str:
            # It's the new format we just injected (Feb)
            new_values.append(row)
        else:
            # It's the old format (Jan)
            # data(0), lanc(1), det(2), num(3), valor(4), tipo(5), desc(6), cat(7)
            data = row[0] if len(row) > 0 else ""
            lanc = row[1] if len(row) > 1 else ""
            old_det = row[2] if len(row) > 2 else ""
            valor = row[4] if len(row) > 4 else ""
            tipo = row[5] if len(row) > 5 else ""
            desc = row[6] if len(row) > 6 else ""
            cat = row[7] if len(row) > 7 else "OUTROS"
            pfpj = "PJ" # Assume Inter is PJ by default
            det = str(uuid.uuid4()) # give it a UUID
            
            # Combine old detail into description if it's not empty
            final_desc = desc
            if old_det and old_det not in desc:
                final_desc = f"{desc} - {old_det}" if desc else old_det
            
            # format valor
            if "R$" not in str(valor):
                try:
                    v_str = str(valor).replace(".", "").replace(",", ".")
                    f_val = float(v_str)
                    valor = f"-R$ {abs(f_val):,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.') if f_val < 0 else f"R$ {abs(f_val):,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
                except Exception as e:
                    valor = str(valor)
            
            new_values.append([data, lanc, det, valor, tipo, final_desc, cat, pfpj])
            
    # Clear the entire range
    sheet.values().clear(spreadsheetId=SPREADSHEET_ID, range="'CONTA INTER'!A1:H1000").execute()
    
    # Write back
    print("Writing back standardized data...")
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'CONTA INTER'!A1:H1000",
                         valueInputOption='USER_ENTERED', body={'values': new_values}).execute()
                         
    print("Inter Account successfully standardized to 8 columns.")

if __name__ == '__main__':
    padronizar_inter()
