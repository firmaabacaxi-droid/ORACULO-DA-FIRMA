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

def check_connection():
    try:
        spreadsheet = sheet.get(spreadsheetId=SPREADSHEET_ID).execute()
        sheet_title = spreadsheet['sheets'][0]['properties']['title']
        
        # Read headers
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{sheet_title}'!A1:H1").execute()
        values = result.get('values', [])
        
        print(f"CONEXAO OK: Conexão via API estabelecida com sucesso!")
        print(f"PLANILHA: {spreadsheet['properties']['title']}")
        print(f"ABA: {sheet_title}")
        print(f"HEADERS: {values[0] if values else 'Vazio'}")
    except Exception as e:
        print(f"ERRO: Erro na conexão: {str(e)}")

if __name__ == '__main__':
    check_connection()
