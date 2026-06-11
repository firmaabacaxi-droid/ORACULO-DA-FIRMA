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
    v = v.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '').replace('+', '').replace('(', '').replace(')', '').strip()
    try: return float(v)
    except: return 0.0

def format_curr(val):
    return f"R$ {val:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')

def get_summary_card(month_name, account_name, initial, final, in_pj, in_pf, out_pj, out_pf):
    return [
        [f"RESUMO - {month_name}", ""],
        ["CONTA:", account_name],
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

def get_account_summary(tab_name):
    result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{tab_name}'!A1:H500").execute()
    values = result.get('values', [])
    if len(values) < 2: return {}

    data = values[1:]
    months = ["JANEIRO", "FEVEREIRO", "MARÇO"]
    summary_data = {}
    for m in months:
        summary_data[m] = {"initial": 0.0, "final": 0.0, "in_pj": 0.0, "in_pf": 0.0, "out_pj": 0.0, "out_pf": 0.0}

    for row in data:
        if not row or not row[0]: continue
        date = row[0]
        month = ""
        if "/01/" in date or "/12/" in date: month = "JANEIRO"
        elif "/02/" in date: month = "FEVEREIRO"
        elif "/03/" in date: month = "MARÇO"
        
        if not month: continue
        
        lanc = row[1].upper()
        # Heuristic for Valor column
        # BB: col 3, Nu: col 3 (standardized)
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
                
    # If no final S A L D O, calculate one for display
    for m in months:
        if summary_data[m]["final"] == 0 and summary_data[m]["initial"] != 0:
            summary_data[m]["final"] = summary_data[m]["initial"] + (summary_data[m]["in_pj"] + summary_data[m]["in_pf"] - (summary_data[m]["out_pj"] + summary_data[m]["out_pf"]))
            
    return summary_data

def update_global_dashboard():
    bb_summary = get_account_summary("LANÇAMENTOS")
    nu_summary = get_account_summary("CONTA NU")
    
    layout = [[""]*15 for _ in range(50)]
    
    # 1. Section BB
    layout[0][1] = "RELATÓRIO BANCO DO BRASIL"
    col_starts = {"JANEIRO": 1, "FEVEREIRO": 5, "MARÇO": 9}
    for month, c_idx in col_starts.items():
        card = get_summary_card(month, "BB CONTA CORRENTE", bb_summary[month]["initial"], bb_summary[month]["final"], 
                               bb_summary[month]["in_pj"], bb_summary[month]["in_pf"], 
                               bb_summary[month]["out_pj"], bb_summary[month]["out_pf"])
        for r_idx, r in enumerate(card):
            layout[r_idx+2][c_idx] = r[0]
            layout[r_idx+2][c_idx+1] = r[1]
            
    # 2. Section NU (Starts at Row 20)
    layout[18][1] = "RELATÓRIO NUBANK"
    for month, c_idx in col_starts.items():
        if month not in nu_summary or nu_summary[month]["initial"] == 0 and nu_summary[month]["in_pj"] == 0:
            continue
        card = get_summary_card(month, "NU CONTA PAGAMENTO", nu_summary[month]["initial"], nu_summary[month]["final"], 
                               nu_summary[month]["in_pj"], nu_summary[month]["in_pf"], 
                               nu_summary[month]["out_pj"], nu_summary[month]["out_pf"])
        for r_idx, r in enumerate(card):
            layout[r_idx+20][c_idx] = r[0]
            layout[r_idx+20][c_idx+1] = r[1]

    service.spreadsheets().values().update(spreadsheetId=SPREADSHEET_ID, range="'RESUMO MENSAL'!A1:O50",
                         valueInputOption='USER_ENTERED', body={'values': layout}).execute()
    print("Multi-account dashboard updated.")

if __name__ == '__main__':
    update_global_dashboard()
