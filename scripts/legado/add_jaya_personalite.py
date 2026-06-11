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

def add_jaya_feb_safely():
    print("Adicionando lançamentos de Jaya (Fevereiro) com Verificação de Redundância...")
    
    # New transactions for Jaya (extracted from image)
    # 9-column format: Data | Lançamento | Detalhes | N° documento | Valor | Tipo | DESC | CAT | PF/PJ
    new_rows = [
        ["17/02", "NETFLIX.COM", "", "-", "-44,90", "Saída", "Jaya NETFLIX.COM", "DIVERSOS", "PF"],
        ["19/02", "MIKAMI PRODU-CT JAPON", "", "-", "-29,55", "Saída", "Jaya MIKAMI PRODU-CT JAPON", "ALIMENTAÇÃO", "PF"],
        ["19/02", "BIG BOX SUPE-CT CADOS", "", "-", "-75,41", "Saída", "Jaya BIG BOX SUPE-CT CADOS", "ALIMENTAÇÃO", "PF"]
    ]
    
    # Read current content to ensure absolutely no duplicates
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO PERSONALITE'!A1:I1000").execute()
    current_values = result.get('values', [])
    
    fingerprints = set()
    for row in current_values:
        if len(row) >= 5:
            # signature: Date | Name | Amount
            fp = f"{row[0]}|{row[1]}|{row[4]}"
            fingerprints.add(fp)
            
    filtered_new_rows = []
    for row in new_rows:
        fp = f"{row[0]}|{row[1]}|{row[4]}"
        if fp not in fingerprints:
            filtered_new_rows.append(row)
        else:
            print(f"Redundância detectada para Jaya: {fp} já existe.")
            
    if not filtered_new_rows:
        print("Planilha já possui estes lançamentos da Jaya.")
        return

    # Append to the end
    last_row = 0
    for i, row in enumerate(current_values):
        if row and any(cell.strip() for cell in row):
            last_row = i + 1
            
    write_range = f"'CARTÃO PERSONALITE'!A{last_row + 1}"
    
    sheet.values().update(
        spreadsheetId=SPREADSHEET_ID,
        range=write_range,
        valueInputOption='USER_ENTERED',
        body={'values': filtered_new_rows}
    ).execute()
    
    print(f"Inseridos {len(filtered_new_rows)} novos lançamentos para Jaya.")

if __name__ == '__main__':
    add_jaya_feb_safely()
