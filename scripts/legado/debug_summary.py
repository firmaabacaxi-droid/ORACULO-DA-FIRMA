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

def parse_val(v):
    if not v: return 0.0
    # Handle R$ 1.000,00 or -R$ 1.000,00 or 1000.00
    v = v.replace('R$', '').replace(' ', '').replace('+', '').strip()
    # If there's a dot and a comma, it's Brazilian format
    if '.' in v and ',' in v:
        v = v.replace('.', '').replace(',', '.')
    elif ',' in v:
        v = v.replace(',', '.')
    try: return float(v)
    except: return 0.0

def get_account_summary(tab_name):
    print(f"Reading {tab_name}...")
    result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{tab_name}'!A1:H1000").execute()
    values = result.get('values', [])
    print(f"Found {len(values)} rows in {tab_name}")
    if len(values) < 2: return {}

    data = values[1:]
    months = ["JANEIRO", "FEVEREIRO", "MARÇO"]
    summary_data = {}
    for m in months:
        summary_data[m] = {"initial": 0.0, "final": 0.0, "in_pj": 0.0, "in_pf": 0.0, "out_pj": 0.0, "out_pf": 0.0}

    for i, row in enumerate(data):
        if not row or not row[0]: continue
        date = row[0]
        month = ""
        if "/01/" in date or "/12/" in date: month = "JANEIRO"
        elif "/02/" in date: month = "FEVEREIRO"
        elif "/03/" in date: month = "MARÇO"
        if not month: continue
        
        lanc = row[1].upper()
        if len(row) < 4: continue
        val_str = row[3]
        val = parse_val(val_str)
        pjpf = row[7].upper() if len(row) > 7 else "PF"
        
        if "SALDO ANTERIOR" in lanc:
            summary_data[month]["initial"] = val
            print(f"  {month} Initial: {val}")
        elif "S A L D O" in lanc:
            summary_data[month]["final"] = val
            print(f"  {month} Final: {val}")
        else:
            if val > 0:
                if pjpf == "PJ": summary_data[month]["in_pj"] += val
                else: summary_data[month]["in_pf"] += val
            else:
                if pjpf == "PJ": summary_data[month]["out_pj"] += abs(val)
                else: summary_data[month]["out_pf"] += abs(val)
                
    return summary_data

if __name__ == '__main__':
    bb = get_account_summary("LANCAMENTOS_BB")
    nu = get_account_summary("CONTA NU")
    print("\nBB Summary:")
    print(bb)
    print("\nNU Summary:")
    print(nu)
