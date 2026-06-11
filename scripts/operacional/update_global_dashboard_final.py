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
    if isinstance(v, (int, float)): return float(v)
    v = v.replace('R$', '').replace(' ', '').replace('+', '').replace('(', '').replace(')', '').strip()
    if ',' in v:
        v = v.replace('.', '').replace(',', '.')
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
    print(f"Reading {tab_name}...")
    try:
        # Request enough range for all columns
        result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{tab_name}'!A1:I2000").execute()
    except Exception as e:
        print(f"Error reading {tab_name}: {e}")
        return {}
    
    values = result.get('values', [])
    if len(values) < 2: return {}

    data = values[1:]
    months = ["JANEIRO", "FEVEREIRO", "MARÇO"]
    summary_data = {}
    for m in months:
        summary_data[m] = {"initial": 0.0, "final": 0.0, "in_pj": 0.0, "in_pf": 0.0, "out_pj": 0.0, "out_pf": 0.0}

    # Credit cards don't use initial/final balance rows in our summary
    is_credit = "CARTAO" in tab_name or "CARTÃO" in tab_name

    for row in data:
        if not row or not row[0]: continue
        date = row[0]
        month = ""
        # Check for Month (supporting DD/MM or DD/MM/YYYY)
        if "/01/" in date or "/12/25" in date: month = "JANEIRO"
        elif "/02/" in date: month = "FEVEREIRO"
        elif "/03/" in date: month = "MARÇO"
        if not month: continue
        
        if len(row) < 4: continue
        lanc = row[1].upper()
        # Value is in Column D (index 3)
        val = parse_val(row[3])
        # PJ/PF is in Column I (index 8) for the new format, or H for older
        pjpf = "PF"
        if len(row) > 8: pjpf = row[8].upper()
        elif len(row) > 7: pjpf = row[7].upper()
        
        if is_credit:
            # For credit cards, we only sum the flows
            if val > 0:
                if pjpf == "PJ": summary_data[month]["in_pj"] += val
                else: summary_data[month]["in_pf"] += val
            else:
                if pjpf == "PJ": summary_data[month]["out_pj"] += abs(val)
                else: summary_data[month]["out_pf"] += abs(val)
        else:
            # Bank accounts: track balances + flows
            if "SALDO ANTERIOR" in lanc or "SDO ANTERIOR" in lanc:
                summary_data[month]["initial"] = val
            elif "S A L D O" in lanc or (len(row[1]) < 8 and "SALDO" in lanc):
                summary_data[month]["final"] = val
            else:
                if val > 0:
                    if pjpf == "PJ": summary_data[month]["in_pj"] += val
                    else: summary_data[month]["in_pf"] += val
                else:
                    if pjpf == "PJ": summary_data[month]["out_pj"] += abs(val)
                    else: summary_data[month]["out_pf"] += abs(val)
    
    return summary_data

def update_global_dashboard():
    # Detect Account Tabs
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    titles = [s['properties']['title'] for s in spr['sheets']]
    
    layout = [[""]*15 for _ in range(120)]
    layout[0][1] = "RELATÓRIO FINANCEIRO CONSOLIDADO"
    
    row_offset = 2
    # Dynamic account list based on the latest sheet titles
    # Priority order for display
    order = ["CONTA BB", "CONTA NUBANK", "CONTA INTER", "CARTÃO CREDITO BLACK ITAU", "CARTAO CREDITO NUBANK", "CARTÃO CREDITO INFINITY ITAU"]
    
    for tab in order:
        if tab in titles:
            display_name = tab
            if "CARTAO" in tab or "CARTÃO" in tab: display_name = f"{tab} (CRÉDITO)"
            summary = get_account_summary(tab)
            if not summary: continue
            
            layout[row_offset][1] = f"--- ACCOUNT: {display_name} ---"
            col_starts = {"JANEIRO": 1, "FEVEREIRO": 5, "MARÇO": 9}
            found_data = False
            for month, c_idx in col_starts.items():
                if abs(summary[month]["initial"]) > 0.01 or abs(summary[month]["in_pj"]) > 0.01 or abs(summary[month]["in_pf"]) > 0.01 or abs(summary[month]["out_pj"]) > 0.01 or abs(summary[month]["out_pf"]) > 0.01:
                    found_data = True
                    card = get_summary_card(month, display_name, summary[month]["initial"], summary[month]["final"], 
                                           summary[month]["in_pj"], summary[month]["in_pf"], 
                                           summary[month]["out_pj"], summary[month]["out_pf"])
                    for r_idx, r in enumerate(card):
                        layout[row_offset + r_idx + 1][c_idx] = r[0]
                        layout[row_offset + r_idx + 1][c_idx + 1] = r[1]
            
            if found_data:
                row_offset += 16 # Space between account sections
    
    service.spreadsheets().values().update(spreadsheetId=SPREADSHEET_ID, range="'RESUMO MENSAL'!A1:O120",
                         valueInputOption='USER_ENTERED', body={'values': layout}).execute()
    print("Consolidated Dashboard updated for all detected accounts.")

if __name__ == '__main__':
    update_global_dashboard()
