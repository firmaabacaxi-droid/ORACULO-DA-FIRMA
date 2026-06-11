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

def deep_categorization():
    print("Analise Oracular: Mergulhando nas Categorias (Jan-Mar)...")
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    titles = [s['properties']['title'] for s in spr['sheets']]
    
    cat_stats = {"JANEIRO": {}, "FEVEREIRO": {}, "MARÇO": {}}

    for tab in titles:
        if tab == "RESUMO MENSAL": continue
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{tab}'!A1:I2000").execute()
        rows = result.get('values', [])
        if not rows: continue
        
        headers = [h.upper() for h in rows[0]]
        v_idx = -1
        c_idx = -1
        
        # Match columns by name for robustness
        for i, h in enumerate(headers):
            if "VALOR" in h: v_idx = i
            if "CATEGORIA" in h: c_idx = i
            
        if v_idx == -1: v_idx = 4 # Default to 5th col
        if c_idx == -1: 
            # If no category column, check if it's the 8th col (index 7)
            c_idx = 7
            
        for row in rows[1:]:
            if not row or len(row) <= v_idx: continue
            date_str = str(row[0])
            
            month = ""
            if "/01/2026" in date_str or "/01/" in date_str: month = "JANEIRO"
            elif "/02/2026" in date_str or "/02/" in date_str: month = "FEVEREIRO"
            elif "/03/2026" in date_str or "/03/" in date_str: month = "MARÇO"
            if not month: continue
            
            val = parse_val(row[v_idx])
            cat = "NÃO CATEGORIZADO"
            if len(row) > c_idx and row[c_idx]:
                cat = row[c_idx].strip().upper()
                if not cat or cat == "-": cat = "NÃO CATEGORIZADO"
            
            # Analyze all outflows (negative values)
            if val < 0:
                cat_stats[month][cat] = cat_stats[month].get(cat, 0.0) + abs(val)

    # Report results
    print("\nRELATÓRIO DE GASTOS POR CATEGORIA")
    for month in ["JANEIRO", "FEVEREIRO", "MARÇO"]:
        print(f"\n>> {month}")
        total = sum(cat_stats[month].values())
        if total == 0:
            print("   Nenhum gasto detectado.")
            continue
        # Sort and filter
        sorted_items = sorted(cat_stats[month].items(), key=lambda x: x[1], reverse=True)
        print(f"   Total Gasto: R$ {total:,.2f}")
        for k, v in sorted_items[:8]:
            perc = (v/total)*100
            print(f"   - {k}: R$ {v:,.2f} ({perc:.1f}%)")

if __name__ == '__main__':
    deep_categorization()
