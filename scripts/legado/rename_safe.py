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

def rename_to_safe():
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    requests = []
    for s in spr['sheets']:
        title = s['properties']['title']
        sid = s['properties']['sheetId']
        if "LANÇAMENTOS" in title:
            requests.append({"updateSheetProperties": {"properties": {"sheetId": sid, "title": "LANCAMENTOS_BB"}, "fields": "title"}})
            
    if requests:
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': requests}).execute()
        print("Renamed to safe title: LANCAMENTOS_BB")

if __name__ == '__main__':
    rename_to_safe()
