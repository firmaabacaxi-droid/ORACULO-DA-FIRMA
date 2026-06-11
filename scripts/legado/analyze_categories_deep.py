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
    try: return float(str(v).replace('R$', '').replace(' ', '').replace('.', '').replace(',', '.'))
    except: return 0.0

def classify_cat_type(cat):
    c = cat.upper()
    fixo = ["ALUGUEL", "CONDOMINIO", "ESCOLA", "IMPOSTOS", "SEGURO", "ENERGIA", "INTERNET", "CLUBE"]
    recorrente = ["MERCADO", "SUPERMERCADO", "POSTO", "GASOLINA", "UBER", "TRANSPORTE", "ALIMENTAÇÃO", "FARMACIA", "SAÚDE", "TELEFONE", "FACULDADE"]
    variavel = ["RESTAURANTE", "LAZER", "DIVERSOS", "ASSINATURAS", "CASA", "PRESENTES", "TURISMO", "ENTRETENIM"]
    pontual = ["EQUIPAMENTO", "VIAGEM", "REFORMA", "EMPRÉSTIMOS", "MÓVEIS"]
    
    for f in fixo: 
        if f in c: return "Fixo"
    for r in recorrente: 
        if r in c: return "Recorrente"
    for v in variavel: 
        if v in c: return "Variável"
    for p in pontual: 
        if p in c: return "Pontual"
    return "Outros"

def analyze_categories_deep():
    print("Iniciando ANALISE_CATEGORIAS Oracular...")
    
    # Read BASE_DASHBOARD
    # Cols: 0: Mês, 1: Data, 2: Fonte, 3: Tipo, 4: Lançamento, 5: Valor, 6: Categoria, 7: PF/PJ, 8: Pessoa, 9: Fluxo
    res = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="BASE_DASHBOARD!A2:J5000").execute()
    data = res.get('values', [])
    if not data:
        print("BASE_DASHBOARD vazia. Abortando.")
        return

    # Filter only SAÍDA (index 9)
    expenses = [r for r in data if len(r) > 9 and r[9] == "SAÍDA"]
    
    # Group by Month and Category
    groups = collections.defaultdict(lambda: collections.defaultdict(list))
    month_totals = collections.defaultdict(float)
    
    for r in expenses:
        month = r[0]
        cat = r[6]
        val = abs(parse_f(r[5]))
        groups[month][cat].append(r)
        month_totals[month] += val

    # Prepare ANALISE_CATEGORIAS rows
    # Cols: Categoria, Mês, Total Gasto, % do Total do Mês, Tipo, Fonte, Pessoa, Observações
    output_rows = [["Categoria", "Mês", "Total Gasto", "% do Total", "Tipo Est.", "Fonte Predom.", "Pessoa Predom.", "Observações"]]
    
    for month in ["JANEIRO", "FEVEREIRO", "MARÇO"]:
        if month not in groups: continue
        total_m = month_totals[month]
        
        # Sort cats by value
        sorted_cats = sorted(groups[month].items(), key=lambda x: sum(abs(parse_f(item[5])) for item in x[1]), reverse=True)
        
        for cat, items in sorted_cats:
            cat_sum = sum(abs(parse_f(item[5])) for item in items)
            perc = (cat_sum / total_m) if total_m > 0 else 0
            
            # Predominant Source/Person
            sources = collections.Counter([it[3] for it in items])
            source_pred = sources.most_common(1)[0][0]
            
            people = collections.Counter([it[8] for it in items])
            person_pred = people.most_common(1)[0][0]
            
            cat_type = classify_cat_type(cat)
            
            obs = ""
            if cat_sum > 2000: obs = "Valor Elevado"
            if len(items) > 5: obs += " Alta Frequência"
            
            output_rows.append([
                cat, month, cat_sum, perc, cat_type, source_pred, person_pred, obs.strip()
            ])

    # Create/Update tab
    try:
        service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={
            'requests': [{'addSheet': {'properties': {'title': 'ANALISE_CATEGORIAS'}}}]
        }).execute()
    except: pass

    sheet.values().clear(spreadsheetId=SPREADSHEET_ID, range="ANALISE_CATEGORIAS!A1:H500").execute()
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="ANALISE_CATEGORIAS!A1",
                         valueInputOption='USER_ENTERED', body={'values': output_rows}).execute()
    
    print("ANALISE_CATEGORIAS concluída.")

if __name__ == '__main__':
    analyze_categories_deep()
