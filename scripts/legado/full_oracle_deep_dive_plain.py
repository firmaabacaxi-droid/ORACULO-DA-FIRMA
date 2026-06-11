import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
import re

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

def calculate_full_analysis():
    print("Iniciando Analise Profunda (Jan-Mar)...")
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    titles = [s['properties']['title'] for s in spr['sheets']]
    
    full_stats = {"JANEIRO": {}, "FEVEREIRO": {}, "MARÇO": {}}
    account_summaries = {}

    for tab in titles:
        if tab == "RESUMO MENSAL": continue
        print(f"Lendo {tab}...")
        try:
            result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{tab}'!A1:I2000").execute()
            rows = result.get('values', [])
        except:
            continue
        
        is_credit = "CART" in tab.upper()
        
        summary = {
            "JANEIRO": {"in": 0.0, "out": 0.0, "final": 0.0},
            "FEVEREIRO": {"in": 0.0, "out": 0.0, "final": 0.0},
            "MARÇO": {"in": 0.0, "out": 0.0, "final": 0.0}
        }
        
        for row in rows:
            if not row or len(row) < 4: continue
            date_str = str(row[0])
            
            month = ""
            if "/01" in date_str or "/12/2025" in date_str: month = "JANEIRO"
            elif "/02" in date_str: month = "FEVEREIRO"
            elif "/03" in date_str: month = "MARÇO"
            if not month: continue
            
            val = parse_val(row[3])
            desc = str(row[1]).upper()
            
            # Category index check
            cat = "NÃO CATEGORIZADO"
            if len(row) > 8 and row[7]: cat = row[7].upper()
            elif len(row) > 7 and row[7]: cat = row[7].upper()
            
            if val < 0:
                full_stats[month][cat] = full_stats[month].get(cat, 0.0) + abs(val)
                summary[month]["out"] += abs(val)
            else:
                summary[month]["in"] += val
            
            if not is_credit and ("S A L D O" in desc or (len(row[1]) < 8 and "SALDO" in desc)):
                summary[month]["final"] = val

        account_summaries[tab] = summary

    print("\n" + "="*50)
    print("ANÁLISE PROFUNDA DE CATEGORIAS (ORÁCULO 3.0)")
    print("="*50)
    
    for month in ["JANEIRO", "FEVEREIRO", "MARÇO"]:
        print(f"\nMES: {month}")
        total_out = sum(full_stats[month].values())
        if total_out == 0:
            print("  Sem dados de saída encontrados.")
            continue
        sorted_cats = sorted(full_stats[month].items(), key=lambda x: x[1], reverse=True)
        print(f"Total de Saídas: R$ {total_out:,.2f}")
        for cat, val in sorted_cats[:10]:
            perc = (val / total_out) * 100
            print(f"  - {cat}: R$ {val:,.2f} ({perc:.1f}%)")

if __name__ == '__main__':
    calculate_full_analysis()
