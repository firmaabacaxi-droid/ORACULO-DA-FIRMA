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
    v = v.replace('R$', '').replace(' ', '').replace('+', '').replace('(', '').replace(')', '').replace('.', '').replace(',', '.').strip()
    try: return float(v)
    except: return 0.0

def get_month(dt):
    if "/01/" in dt or "/01/2026" in dt or "/12/2025" in dt: return "JANEIRO"
    if "/02/" in dt or "/02/2026" in dt: return "FEVEREIRO"
    if "/03/" in dt or "/03/2026" in dt: return "MARÇO"
    return None

def build_dashboard_fact_table():
    print("Iniciando ETAPA 6 - Construção da Fact Table (BASE_DASHBOARD)...")
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    titles = [s['properties']['title'] for s in spr['sheets']]
    
    # Fact Table Columns
    fact_rows = [["Mês", "Data", "Fonte", "Tipo", "Lançamento", "Valor", "Categoria", "PF/PJ", "Pessoa", "Fluxo"]]

    for tab in titles:
        # Exclude generated analytics tabs
        if tab in ["RESUMO MENSAL", "AUDITORIA_ESTRUTURAL", "ANALISE_ABAS", "RESUMO_ANALITICO_MENSAL", "RESUMO_EXECUTIVO", "BASE_DASHBOARD"]: continue
        
        print(f"Processando {tab} para a Fact Table...")
        res = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{tab}'!A1:I2000").execute()
        rows = res.get('values', [])
        if not rows: continue
        
        headers = [h.upper() for h in rows[0]]
        
        # Identification indices
        v_idx = -1
        desc_idx = -1 
        cat_idx = -1
        pjpf_idx = -1
        for i, h in enumerate(headers):
            if "VALOR" in h: v_idx = i
            if "LANÇAMENTO" in h or "DESCRIÇÃO" in h: desc_idx = i
            if "CATEGORIA" in h: cat_idx = i
            if "PF" in h or "PJ" in h: pjpf_idx = i

        aba_type = "CARTÃO" if "CART" in tab.upper() else "CONTA"

        for row in rows[1:]:
            if not row or not any(row) or len(row) <= v_idx: continue
            
            date_str = str(row[0])
            month = get_month(date_str)
            if not month: continue
            
            val = parse_val(row[v_idx])
            if val == 0: continue # Skip zero balance lines or non-monetary info
            
            desc = str(row[desc_idx]) if len(row) > desc_idx else "N/D"
            cat = str(row[cat_idx]).strip().upper() if len(row) > cat_idx and row[cat_idx] else "OUTROS"
            pjpf = str(row[pjpf_idx]).strip().upper() if len(row) > pjpf_idx and row[pjpf_idx] else "PF"

            person = "N/I"
            if "JAYA" in desc.upper(): person = "Jaya"
            elif "FILIPE" in desc.upper(): person = "Filipe"
            elif "AMBOS" in desc.upper(): person = "Ambos"

            fluxo = "ENTRADA" if val > 0 else "SAÍDA"
            
            fact_rows.append([
                month, date_str, tab, aba_type, desc, val, cat, pjpf, person, fluxo
            ])

    # Batch writing (Spreadsheets limit is 10k rows usually, we have ~1k)
    try:
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={
            'requests': [{'addSheet': {'properties': {'title': 'BASE_DASHBOARD'}}}]
        }).execute()
    except: pass

    # Clear before update
    service.spreadsheets().values().clear(spreadsheetId=SPREADSHEET_ID, range="BASE_DASHBOARD!A1:J5000").execute()
    
    # Update
    service.spreadsheets().values().update(spreadsheetId=SPREADSHEET_ID, range="BASE_DASHBOARD!A1",
                         valueInputOption='USER_ENTERED', body={'values': fact_rows}).execute()
    
    print("BASE_DASHBOARD pronta para visualização.")

if __name__ == '__main__':
    build_dashboard_fact_table()
