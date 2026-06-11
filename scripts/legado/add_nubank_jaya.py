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

def add_nubank_jaya_safely():
    print("Oraculizando Lançamentos da Jaya no CARTAO CREDITO NUBANK...")
    
    # 9-column format
    new_rows = [
        ["21/02/2026", "Uber Uber *Trip Help.U", "", "-", "-17,93", "Saída", "Jaya Uber Trip", "TRANSPORTE", "PF"],
        ["21/02/2026", "Uber Uber *Trip Help.U", "", "-", "-19,94", "Saída", "Jaya Uber Trip", "TRANSPORTE", "PF"],
        ["21/02/2026", "Alianca Canabica - Parcela 2/2", "Parcela 2 de 2", "-", "-312,00", "Saída", "Jaya ALIANCA CANABICA | PARC 02/02", "DIVERSOS", "PF"],
        ["03/03/2026", "Uber Uber *Trip Help.U", "", "-", "-37,96", "Saída", "Jaya Uber Trip", "TRANSPORTE", "PF"],
        ["03/03/2026", "Uber Uber *Trip Help.U", "", "-", "-35,96", "Saída", "Jaya Uber Trip", "TRANSPORTE", "PF"],
        ["06/03/2026", "Uber* Trip", "", "-", "-37,93", "Saída", "Jaya Uber Trip", "TRANSPORTE", "PF"],
        ["06/03/2026", "Sympla*Carlos Martin J", "", "-", "-112,20", "Saída", "Jaya SYMPLA | CARLOS MARTIN", "TURISMO E ENTRETENIM", "PF"],
        ["06/03/2026", "Uber Uber *Trip Help.U", "", "-", "-30,95", "Saída", "Jaya Uber Trip", "TRANSPORTE", "PF"],
        ["09/03/2026", "Uber* Trip", "", "-", "-57,94", "Saída", "Jaya Uber Trip", "TRANSPORTE", "PF"],
        ["13/03/2026", "Uber Uber *Trip Help.U", "", "-", "-31,96", "Saída", "Jaya Uber Trip", "TRANSPORTE", "PF"],
        ["15/03/2026", "Karina Souza Perroni S", "", "-", "-44,00", "Saída", "Jaya KARINA SOUZA", "ALIMENTAÇÃO", "PF"],
        ["16/03/2026", "Dm*Spotify", "", "-", "-23,90", "Saída", "Jaya Spotify", "DIVERSOS", "PF"],
        ["19/03/2026", "Quintal de Maria", "", "-", "-26,45", "Saída", "Jaya QUINTAL DE MARIA", "ALIMENTAÇÃO", "PF"],
        ["19/03/2026", "Advance Auto Posto", "", "-", "-286,06", "Saída", "Jaya ADVANCE AUTO POSTO", "VEÍCULOS", "PF"],
        ["19/03/2026", "Natural Bem Estar", "", "-", "-14,06", "Saída", "Jaya NATURAL BEM ESTAR", "ALIMENTAÇÃO", "PF"],
        ["19/03/2026", "Unico Hospitalar Sho", "", "-", "-219,99", "Saída", "Jaya UNICO HOSPITALAR", "SAÚDE", "PF"],
        ["19/03/2026", "Vo Belmira", "", "-", "-28,00", "Saída", "Jaya VO BELMIRA", "ALIMENTAÇÃO", "PF"]
    ]
    
    # Read existing content
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CARTAO CREDITO NUBANK'!A1:I2000").execute()
    current_values = result.get('values', [])
    
    fingerprints = set()
    for row in current_values:
        if len(row) >= 5:
            fp = f"{row[0]}|{row[1]}|{row[4]}"
            fingerprints.add(fp)
            
    filtered_new = []
    for row in new_rows:
        fp = f"{row[0]}|{row[1]}|{row[4]}"
        if fp not in fingerprints:
            filtered_new.append(row)
        else:
            print(f"Redundância detectada: {fp} já existe.")
            
    if not filtered_new:
        print("Nenhum lançamento novo para adicionar.")
        return

    # Find last row
    last_row = 0
    for i, row in enumerate(current_values):
        if row and any(cell.strip() for cell in row):
            last_row = i + 1
            
    write_range = f"'CARTAO CREDITO NUBANK'!A{last_row + 1}"
    
    sheet.values().update(
        spreadsheetId=SPREADSHEET_ID,
        range=write_range,
        valueInputOption='USER_ENTERED',
        body={'values': filtered_new}
    ).execute()
    
    print(f"Inseridos {len(filtered_new)} lançamentos da Jaya no Nubank.")

if __name__ == '__main__':
    add_nubank_jaya_safely()
