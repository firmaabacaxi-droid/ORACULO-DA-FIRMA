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

def read_nu():
    try:
        # Check all sheets to find the correct title
        spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
        titles = [s['properties']['title'] for s in spr['sheets']]
        print(f"Abas encontradas: {titles}")
        
        target = "CONTA NU"
        if target in titles:
            result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{target}'!A1:H100").execute()
            values = result.get('values', [])
            for i, row in enumerate(values):
                print(f"{i+1}: {row}")
        else:
            print(f"Aba {target} não encontrada.")
            
    except Exception as e:
        print(f"ERRO: {str(e)}")

if __name__ == '__main__':
    read_nu()
