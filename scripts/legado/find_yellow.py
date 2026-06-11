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

def find_yellow_cells():
    # Fetch range with formatting info
    spreadsheet = sheet.get(
        spreadsheetId=SPREADSHEET_ID, 
        ranges=["'CONTA CORRENTE BB'!A1:Z100"], 
        includeGridData=True
    ).execute()
    
    grid_data = spreadsheet['sheets'][0]['data'][0]
    yellow_rows = []
    
    for r_idx, row in enumerate(grid_data.get('rowData', [])):
        for c_idx, cell in enumerate(row.get('values', [])):
            bg_color = cell.get('effectiveFormat', {}).get('backgroundColor', {})
            # Yellow is typically r=1, g=1, b=0 (or close)
            # Standard yellow is #FFFF00
            r = bg_color.get('red', 1.0)
            g = bg_color.get('green', 1.0)
            b = bg_color.get('blue', 1.0)
            
            if r > 0.9 and g > 0.9 and b < 0.5:
                # Found yellow cell
                user_val = cell.get('userEnteredValue', {}).get('stringValue', '')
                yellow_rows.append((r_idx, c_idx, user_val))
                break # Just find first per row for now
                
    return yellow_rows

if __name__ == '__main__':
    yellow = find_yellow_cells()
    print(f"YELLOW CELLS DETECTED: {yellow}")
