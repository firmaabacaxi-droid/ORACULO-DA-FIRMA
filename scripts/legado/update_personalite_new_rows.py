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

def update_personalite_with_new_rows():
    print("Atualizando CARTÃO PERSONALITE com novos lançamentos...")
    
    # Text data provided by user (first clean block only)
    # Mapping the 9 columns provided in his header
    new_rows_felipe = [
        ["17/02", "EDSON PEREIRA DE SOUSA", "", "-", "-26,49", "Saída", "Filipe EDSON PEREIRA", "ALIMENTAÇÃO", "PF"],
        ["18/02", "MIKAMI PRODUTOS JAPON", "", "-", "-120,06", "Saída", "Filipe MIKAMI PRODUTOS JAPON", "ALIMENTAÇÃO", "PF"],
        ["19/02", "MIKAMI PRODUTOS JAPON", "", "-", "-21,90", "Saída", "Filipe MIKAMI PRODUTOS JAPON", "ALIMENTAÇÃO", "PF"],
        ["20/02", "JOSELY GOMES LIMA MOR", "", "-", "-14,50", "Saída", "Filipe JOSELY GOMES LIMA MOR", "ALIMENTAÇÃO", "PF"],
        ["20/02", "POSTO ALEXANIA", "", "-", "-300,02", "Saída", "Filipe POSTO ALEXANIA", "VEÍCULOS", "PF"],
        ["20/02", "CONVENIENCIA ALEXANIA", "", "-", "-14,00", "Saída", "Filipe CONVENIENCIA ALEXANIA", "ALIMENTAÇÃO", "PF"]
    ]

    # Get current values to find the end properly
    # However, since he pasted the "current" content and it looks clean, 
    # I will just append to the *actual* spreadsheet data.
    
    # Read existing content to find the last row
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CARTÃO PERSONALITE'!A1:I500").execute()
    current_values = result.get('values', [])
    
    # Find the last meaningful row
    last_row_index = 0
    for i, row in enumerate(current_values):
        if row and any(cell.strip() for cell in row):
            last_row_index = i + 1
            
    # Append the new rows starting from the next available line
    write_range = f"'CARTÃO PERSONALITE'!A{last_row_index + 1}"
    
    sheet.values().update(
        spreadsheetId=SPREADSHEET_ID,
        range=write_range,
        valueInputOption='USER_ENTERED',
        body={'values': new_rows_felipe}
    ).execute()
    
    print(f"Inseridas {len(new_rows_felipe)} novas linhas para Filipe.")

if __name__ == '__main__':
    update_personalite_with_new_rows()
