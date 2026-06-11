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

def add_new_transactions_safely():
    print("Iniciando Verificação de Redundância e Adição Segura...")
    
    # New transactions to add (from image statement for Filipe February)
    # Using consistent 9-column format
    new_rows = [
        ["17/02", "EDSON PEREIRA DE SOUSA", "", "-", "-26,49", "Saída", "Filipe EDSON PEREIRA", "ALIMENTAÇÃO", "PF"],
        ["18/02", "MIKAMI PRODUTOS JAPON", "", "-", "-120,06", "Saída", "Filipe MIKAMI PRODUTOS JAPON", "ALIMENTAÇÃO", "PF"],
        ["19/02", "MIKAMI PRODUTOS JAPON", "", "-", "-21,90", "Saída", "Filipe MIKAMI PRODUTOS JAPON", "ALIMENTAÇÃO", "PF"],
        ["20/02", "JOSELY GOMES LIMA MOR", "", "-", "-14,50", "Saída", "Filipe JOSELY GOMES LIMA MOR", "ALIMENTAÇÃO", "PF"],
        ["20/02", "POSTO ALEXANIA", "", "-", "-300,02", "Saída", "Filipe POSTO ALEXANIA", "VEÍCULOS", "PF"],
        ["20/02", "CONVENIENCIA ALEXANIA", "", "-", "-14,00", "Saída", "Filipe CONVENIENCIA ALEXANIA", "ALIMENTAÇÃO", "PF"]
    ]
    
    # Read existing content
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO PERSONALITE'!A1:I1000").execute()
    current_values = result.get('values', [])
    
    # Create simple fingerprints of existing rows to check for redundancy
    # Fingerprint = "Date|Lançamento|Valor"
    fingerprints = set()
    for row in current_values:
        if len(row) >= 5:
            fp = f"{row[0]}|{row[1]}|{row[4]}"
            fingerprints.add(fp)
            
    filtered_new_rows = []
    for row in new_rows:
        fp = f"{row[0]}|{row[1]}|{row[4]}"
        if fp not in fingerprints:
            filtered_new_rows.append(row)
        else:
            print(f"Redundância detectada: {fp} já existe. Ignorando...")
            
    if not filtered_new_rows:
        print("Nenhum dado novo para inserir. A planilha já está atualizada.")
        return

    # Find the last actual row to append
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
    
    print(f"Inseridos {len(filtered_new_rows)} novos lançamentos únicos para Filipe.")

if __name__ == '__main__':
    add_new_transactions_safely()
