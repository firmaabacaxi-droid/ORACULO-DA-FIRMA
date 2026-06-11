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
    v = v.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '').strip()
    try: return float(v)
    except: return 0.0

def format_curr(val):
    return f"R$ {val:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')

def get_summary_card(month_name, initial, final, in_pj, in_pf, out_pj, out_pf):
    return [
        [f"RESUMO FINANCEIRO - {month_name}", ""],
        ["CONTA:", "BANCO DO BRASIL"],
        ["Saldo Inicial", format_curr(initial)],
        ["Saldo Final", format_curr(final)],
        ["Diferença", format_curr(final - initial)],
        ["", ""],
        ["ENTRADAS PJ", format_curr(in_pj)],
        ["ENTRADAS PF", format_curr(in_pf)],
        ["SAÍDAS PJ", format_curr(out_pj)],
        ["SAÍDAS PF", format_curr(out_pf)],
        ["", ""],
        ["TOTAL BRUTO", format_curr(in_pj + in_pf - (out_pj + out_pf))]
    ]

def summarize_v3():
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:H200").execute()
    values = result.get('values', [])
    if len(values) < 2: return

    data = values[1:]
    # JAN: 01, FEV: 02, MAR: 03, DEC (Saldo ant): 12
    summary_data = {
        "JANEIRO": {"initial": 0.0, "final": 0.0, "in_pj": 0.0, "in_pf": 0.0, "out_pj": 0.0, "out_pf": 0.0},
        "FEVEREIRO": {"initial": 0.0, "final": 0.0, "in_pj": 0.0, "in_pf": 0.0, "out_pj": 0.0, "out_pf": 0.0},
        "MARÇO": {"initial": 0.0, "final": 0.0, "in_pj": 0.0, "in_pf": 0.0, "out_pj": 0.0, "out_pf": 0.0}
    }

    for row in data:
        if not row or not row[0]: continue
        
        date = row[0]
        month = ""
        if "/01/" in date or "/12/" in date: month = "JANEIRO"
        elif "/02/" in date: month = "FEVEREIRO"
        elif "/03/" in date: month = "MARÇO"
        
        if not month: continue
        
        lanc = row[1].upper()
        val = parse_val(row[3])
        pjpf = row[7].upper() if len(row) > 7 else "PF"
        
        if "SALDO ANTERIOR" in lanc:
            summary_data[month]["initial"] = val
        elif "S A L D O" in lanc:
            summary_data[month]["final"] = val
        else:
            if val > 0:
                if pjpf == "PJ": summary_data[month]["in_pj"] += val
                else: summary_data[month]["in_pf"] += val
            else:
                if pjpf == "PJ": summary_data[month]["out_pj"] += abs(val)
                else: summary_data[month]["out_pf"] += abs(val)

    # Output layout
    layout = [[""]*15 for _ in range(40)]
    
    # Fill cards
    # Jan: Col 1-2, Fev: Col 5-6, Mar: Col 9-10
    col_starts = {"JANEIRO": 1, "FEVEREIRO": 5, "MARÇO": 9}
    
    for month, c_idx in col_starts.items():
        card = get_summary_card(month, summary_data[month]["initial"], summary_data[month]["final"], 
                               summary_data[month]["in_pj"], summary_data[month]["in_pf"], 
                               summary_data[month]["out_pj"], summary_data[month]["out_pf"])
        for r_idx, r in enumerate(card):
            layout[r_idx+1][c_idx] = r[0]
            layout[r_idx+1][c_idx+1] = r[1]

    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'RESUMO MENSAL'!A1:O40",
                         valueInputOption='USER_ENTERED', body={'values': layout}).execute()
    print("Dashboard with March updated.")

if __name__ == '__main__':
    summarize_v3()
