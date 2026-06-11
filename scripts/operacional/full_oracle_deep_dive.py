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
    print("Iniciando Análise Profunda do Oráculo (Jan-Mar)...")
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    titles = [s['properties']['title'] for s in spr['sheets']]
    
    # Financial data structure: { month: { category: sum } }
    full_stats = {"JANEIRO": {}, "FEVEREIRO": {}, "MARÇO": {}}
    account_summaries = {}

    for tab in titles:
        if tab == "RESUMO MENSAL": continue
        print(f"Lendo {tab}...")
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{tab}'!A1:I2000").execute()
        rows = result.get('values', [])
        
        is_credit = "CART" in tab.upper()
        
        summary = {
            "JANEIRO": {"initial": 0.0, "final": 0.0, "in": 0.0, "out": 0.0},
            "FEVEREIRO": {"initial": 0.0, "final": 0.0, "in": 0.0, "out": 0.0},
            "MARÇO": {"initial": 0.0, "final": 0.0, "in": 0.0, "out": 0.0}
        }
        
        # Analyze each row 
        for i, row in enumerate(rows):
            if not row or len(row) < 4: continue
            date_str = str(row[0])
            
            # Detect Month
            month = ""
            if "/01" in date_str or "/12/2025" in date_str: month = "JANEIRO"
            elif "/02" in date_str: month = "FEVEREIRO"
            elif "/03" in date_str: month = "MARÇO"
            if not month: continue
            
            val = parse_val(row[3])
            desc = str(row[1]).upper()
            
            # Category extraction (column index 8 if current format, 7 otherwise)
            cat = "NÃO CATEGORIZADO"
            if len(row) > 8 and row[7]: cat = row[7].upper() # 8th col for Category in 9-col layout
            elif len(row) > 7 and row[7]: cat = row[7].upper()
            
            # 1. Update Category Stats
            if val < 0: # Only analyze expenses for deep dive
                full_stats[month][cat] = full_stats[month].get(cat, 0.0) + abs(val)
                
            # 2. Update Account Flows
            if not is_credit:
                if "SALDO ANTERIOR" in desc or "SDO ANTERIOR" in desc:
                    summary[month]["initial"] = val
                elif "S A L D O" in desc or (len(row[1]) < 8 and "SALDO" in desc):
                    summary[month]["final"] = val
                else:
                    if val > 0: summary[month]["in"] += val
                    else: summary[month]["out"] += abs(val)
            else:
                if val > 0: summary[month]["in"] += val
                else: summary[month]["out"] += abs(val)

        account_summaries[tab] = summary

    # Display Deep Dive
    print("\n" + "="*50)
    print("💎 ANÁLISE PROFUNDA DE CATEGORIAS (ORÁCULO 3.0)")
    print("="*50)
    
    for month in ["JANEIRO", "FEVEREIRO", "MARÇO"]:
        print(f"\n🗓️ {month}")
        sorted_cats = sorted(full_stats[month].items(), key=lambda x: x[1], reverse=True)
        total_out = sum([v for k,v in sorted_cats])
        print(f"Total de Saídas: R$ {total_out:,.2f}")
        for cat, val in sorted_cats[:10]: # Top 10 categories
            perc = (val / total_out) * 100 if total_out > 0 else 0
            print(f"  - {cat}: R$ {val:,.2f} ({perc:.1f}%)")

    # Display Consolidated Dashboard Final check
    print("\n" + "="*50)
    print("🏦 RESUMO CONSOLIDADO POR CONTA (CHECK)")
    print("="*50)
    for ac, sum_m in account_summaries.items():
        print(f"\n--- {ac} ---")
        for m in ["JANEIRO", "FEVEREIRO", "MARÇO"]:
            if sum_m[m]["in"] > 0 or sum_m[m]["out"] > 0:
                print(f"  {m}: In: {sum_m[m]['in']:,.2f} | Out: {sum_m[m]['out']:,.2f} | Bal: {sum_m[m]['final']:,.2f}")

if __name__ == '__main__':
    calculate_full_analysis()
