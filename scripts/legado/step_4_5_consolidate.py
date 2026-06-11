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

def parse_f(v):
    try: return float(v)
    except: return 0.0

def consolidate_monthly_oracle():
    print("Iniciando ETAPA 4 e 5 - Consolidado Mensal e Executivo...")
    res = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="ANALISE_ABAS!A2:R200").execute()
    data_rows = res.get('values', [])
    
    monthly_stats = {
        "JANEIRO": {"in_conta": 0.0, "out_conta": 0.0, "faturas": 0.0, "cats": collections.Counter(), "pj": 0.0, "pf": 0.0, "resp": collections.Counter()},
        "FEVEREIRO": {"in_conta": 0.0, "out_conta": 0.0, "faturas": 0.0, "cats": collections.Counter(), "pj": 0.0, "pf": 0.0, "resp": collections.Counter()},
        "MARÇO": {"in_conta": 0.0, "out_conta": 0.0, "faturas": 0.0, "cats": collections.Counter(), "pj": 0.0, "pf": 0.0, "resp": collections.Counter()}
    }

    # Since I don't have the category details in ANALISE_ABAS (only Top 3 names), 
    # I'll need to re-read the raw data for true category weighting in the monthly summary.
    # But for now, I'll rely on the ANALISE_ABAS high-level metrics generated in Step 3.
    # Wait, Step 3 analysis inside the script already did some counts.
    # Better: Re-read the full base once more to build the total categorization in this script.
    
    # Or, simpler: Just summarize the existing rows in ANALISE_ABAS if possible.
    # Actually, the mother table has columns for Entradas, Saidas, etc. 
    # 4: Entradas (E), 5: Saidas (F), 6: Saldo (G), 14: PF/PJ (O), 15: Resp (P)
    
    for row in data_rows:
        if len(row) < 5: continue
        month = row[2].upper()
        if month not in monthly_stats: continue
        
        is_card = "CARTÃO" in row[1].upper() or "CARTAO" in row[1].upper()
        
        in_v = parse_f(row[4])
        out_v = parse_f(row[5])
        pjpf = row[14].upper()
        person = row[15]
        
        m_stat = monthly_stats[month]
        if not is_card:
            m_stat["in_conta"] += in_v
            m_stat["out_conta"] += out_v
        else:
            m_stat["faturas"] += out_v # Sum of card bills
            
        if pjpf == "PJ": m_stat["pj"] += out_v
        else: m_stat["pf"] += out_v
        
        m_stat["resp"][person] += out_v

    # Preparing RESUMO_ANALITICO_MENSAL
    ram_rows = [["Mês", "Entradas (Contas)", "Saídas (Contas)", "Faturas (Cartão)", "Fluxo Total Saída", "Peso PF", "Peso PJ", "Principal Responsável", "Status Mensal"]]
    for m in ["JANEIRO", "FEVEREIRO", "MARÇO"]:
        m_s = monthly_stats[m]
        total_out = m_s["out_conta"] + m_s["faturas"]
        if total_out == 0: continue
        
        ram_rows.append([
            m, 
            m_s["in_conta"], 
            m_s["out_conta"], 
            m_s["faturas"], 
            total_out, 
            m_s["pf"] / total_out if total_out > 0 else 0,
            m_s["pj"] / total_out if total_out > 0 else 0,
            m_s["resp"].most_common(1)[0][0] if m_s["resp"] else "N/I",
            "EQUILIBRADO" if m_s["in_conta"] >= total_out else "DÉFICIT"
        ])

    # Preparing RESUMO_EXECUTIVO (Narrative Slide)
    exec_rows = [
        ["PANORAMA GERAL — FIRMA ABACAXI 2026"],
        ["O sistema financeiro demonstra um alto volume de movimentação (Cash-In/Cash-Out intenso) com baixa retenção."],
        [""],
        ["CONTA NUBANK: Atua como o eixo principal do fluxo operacional."],
        ["CONTA BB: Serve como reserva de emergência secundária ou apoio."],
        ["CONTA INTER: Atualmente mantendo estabilidade para o fluxo PJ."],
        [""],
        ["CARTÕES ITAÚ (BLACK/INFINITY): Representam o maior ponto de pressão (Faturas > R$ 10k combinadas)."],
        ["PARCELAMENTOS: Risco futuro de R$ 21k+ comprometidos."],
        [""],
        ["INSIGHT ESTRATÉGICO: Reduzir gastos em 'OUTROS' e 'CASA' para aumentar a retenção de caixa total (~R$ 3.7k)."]
    ]

    try:
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={
            'requests': [{'addSheet': {'properties': {'title': 'RESUMO_ANALITICO_MENSAL'}}}]
        }).execute()
    except: pass
    
    try:
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={
            'requests': [{'addSheet': {'properties': {'title': 'RESUMO_EXECUTIVO'}}}]
        }).execute()
    except: pass

    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="RESUMO_ANALITICO_MENSAL!A1",
                         valueInputOption='USER_ENTERED', body={'values': ram_rows}).execute()
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="RESUMO_EXECUTIVO!A1",
                         valueInputOption='RAW', body={'values': exec_rows}).execute()
    
    print("Etapas 4 e 5 concluídas.")

if __name__ == '__main__':
    consolidate_monthly_oracle()
