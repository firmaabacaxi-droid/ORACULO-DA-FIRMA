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

def find_text_in_sheet(query):
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CONTA CORRENTE BB'!A1:ZZ500").execute()
    values = result.get('values', [])
    for r_idx, row in enumerate(values):
        for c_idx, cell in enumerate(row):
            if query.lower() in cell.lower():
                return r_idx + 1, c_idx + 1, cell
    return None

if __name__ == '__main__':
    loc = find_text_in_sheet("RESUMO MENSAL")
    print(f"RESUMO MENSAL FOUND AT: {loc}")
    
    loc_jan = find_text_in_sheet("JANEIRO")
    print(f"JANEIRO FOUND AT: {loc_jan}")
