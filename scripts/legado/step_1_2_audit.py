import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
import collections

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

def perform_financial_oracle_audit():
    print("Iniciando ETAPA 1 E 2 - Auditoria e Analise Profunda...")
    spr = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    titles = [s['properties']['title'] for s in spr['sheets']]
    
    audit_rows = [["Nome da aba", "Tipo", "Colunas", "Problemas", "Status", "Observações"]]
    mother_rows = [["Fonte", "Tipo", "Mês", "Período", "Entradas", "Saídas", "Saldo/Fatura", "Créditos/Pag", "Parcelas Ativas", "Total Futuro", "Top Categoria", "Top 3 Cats", "Principais Favorecidos", "Recorrências", "PF/PJ", "Responsável", "Inconsistências", "Insights"]]

    for tab in titles:
        if tab in ["RESUMO MENSAL", "AUDITORIA_ESTRUTURAL", "ANALISE_ABAS"]: continue
        print(f"Auditando {tab}...")
        res = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f"'{tab}'!A1:I2000").execute()
        rows = res.get('values', [])
        if not rows: continue
        
        headers = rows[0]
        col_list = ", ".join(headers)
        aba_type = "CARTÃO" if "CART" in tab.upper() else "CONTA"
        
        problems = []
        dup_check = collections.Counter()
        jan_data = {"in": 0.0, "out": 0.0, "final": 0.0, "cats": collections.Counter(), "ppl": collections.Counter(), "pjpf": collections.Counter()}
        feb_data = {"in": 0.0, "out": 0.0, "final": 0.0, "cats": collections.Counter(), "ppl": collections.Counter(), "pjpf": collections.Counter()}
        mar_data = {"in": 0.0, "out": 0.0, "final": 0.0, "cats": collections.Counter(), "ppl": collections.Counter(), "pjpf": collections.Counter()}
        
        # Monthly map
        m_map = {"JANEIRO": jan_data, "FEVEREIRO": feb_data, "MARÇO": mar_data}

        v_idx = -1
        desc_idx = -1
        cat_idx = -1
        ppl_idx = -1 # Identification column
        pjpf_idx = -1
        
        for i, h in enumerate(headers):
            h_up = h.upper()
            if "VALOR" in h_up: v_idx = i
            if "LANÇAMENTO" in h_up or "DESCRIÇÃO" in h_up: desc_idx = i
            if "CATEGORIA" in h_up: cat_idx = i
            if "PF" in h_up or "PJ" in h_up: pjpf_idx = i

        # Audit lines
        for r in rows[1:]:
            if not r or not any(r): continue
            
            # Duplicates
            fp = "|".join([str(x) for x in r[:5]])
            dup_check[fp] += 1
            
            month = get_month(str(r[0]))
            if not month: continue
            
            val = parse_val(r[v_idx]) if len(r) > v_idx else 0.0
            desc = str(r[desc_idx]).upper() if len(r) > desc_idx else ""
            cat = str(r[cat_idx]).upper() if len(r) > cat_idx and r[cat_idx] else "OUTROS"
            pjpf = str(r[pjpf_idx]).upper() if len(r) > pjpf_idx and r[pjpf_idx] else "PF"

            person = "N/I"
            if "JAYA" in desc: person = "Jaya"
            elif "FILIPE" in desc: person = "Filipe"
            elif "AMBOS" in desc: person = "Ambos"

            m_data = m_map[month]
            if val > 0: m_data["in"] += val
            else: m_data["out"] += abs(val)
            
            if "S A L D O" in desc or (len(desc) < 8 and "SALDO" in desc):
                m_data["final"] = val
                
            m_data["cats"][cat] += abs(val) if val < 0 else 0
            m_data["ppl"][person] += 1
            m_data["pjpf"][pjpf] += 1

        # Tab analysis rows
        for month, m_data in m_map.items():
            if m_data["in"] == 0 and m_data["out"] == 0: continue
            
            sorted_cats = sorted(m_data["cats"].items(), key=lambda x: x[1], reverse=True)
            top_cat = sorted_cats[0][0] if sorted_cats else "-"
            top_3 = ", ".join([c[0] for c in sorted_cats[:3]])
            resp = m_data["ppl"].most_common(1)[0][0] if m_data["ppl"] else "N/I"
            pj_pf = m_data["pjpf"].most_common(1)[0][0] if m_data["pjpf"] else "PF"
            
            mother_rows.append([
                tab, aba_type, month, "Calendário", 
                m_data["in"], m_data["out"], 
                m_data["final"] if aba_type == "CONTA" else m_data["out"],
                "-", "-", "-", # Future parcelamentos would need manual logic later
                top_cat, top_3, "-", "-",
                pj_pf, resp,
                "Duplicados: " + str(sum(1 for c in dup_check.values() if c > 1)),
                f"Concentração em {top_cat}"
            ])

        status = "OK"
        if sum(1 for c in dup_check.values() if c > 1) > 5:
            status = "ATENÇÃO"
            problems.append("Alta duplicidade")
            
        audit_rows.append([tab, aba_type, col_list, "; ".join(problems), status, "Audit completa"])

    # Create/Update tabs
    try:
        # Etapa 1
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={
            'requests': [{'addSheet': {'properties': {'title': 'AUDITORIA_ESTRUTURAL'}}}]
        }).execute()
    except: pass
    
    try:
        # Etapa 2
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={
            'requests': [{'addSheet': {'properties': {'title': 'ANALISE_ABAS'}}}]
        }).execute()
    except: pass

    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="AUDITORIA_ESTRUTURAL!A1",
                         valueInputOption='USER_ENTERED', body={'values': audit_rows}).execute()
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="ANALISE_ABAS!A1",
                         valueInputOption='USER_ENTERED', body={'values': mother_rows}).execute()
    
    print("Etapas 1 e 2 concluídas com sucesso.")

if __name__ == '__main__':
    perform_financial_oracle_audit()
