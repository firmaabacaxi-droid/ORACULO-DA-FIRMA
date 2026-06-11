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

def read_full_lan():
    try:
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:ZZ500").execute()
        values = result.get('values', [])
        for i, row in enumerate(values):
            print(f"{i+1}: {row}")
    except Exception as e:
        print(f"ERRO: {str(e)}")

if __name__ == '__main__':
    read_full_lan()
