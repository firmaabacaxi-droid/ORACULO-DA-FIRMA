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

def read_sheet(range_name):
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=range_name).execute()
    return result.get('values', [])

def get_first_sheet_name():
    spreadsheet = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    return spreadsheet['sheets'][0]['properties']['title']

def update_sheet(range_name, values):
    body = {'values': values}
    # Ensure sheet name is quoted if it has spaces or special chars
    if '!' in range_name:
        sheet_part, range_part = range_name.split('!', 1)
        range_name = f"'{sheet_part}'!{range_part}"
    
    result = sheet.values().update(
        spreadsheetId=SPREADSHEET_ID, range=range_name,
        valueInputOption='USER_ENTERED', body=body).execute()
    print(f"{result.get('updatedCells')} cells updated.")

if __name__ == '__main__':
    sheet_name = get_first_sheet_name()
    print(f"Targeting sheet: {sheet_name}")
    # Initial data for February
    feb_data = [
        ["10/02/2026", "S A L D O", "Início do Período", "-", "799,77", "Entrada/Saldo", "SALDO INICIAL", "INVESTIMENTOS", ""],
        ["10/02/2026", "Pix - Enviado", "10/02 11:27 UBER", "-", "-16,92", "Saída", "UBER", "TRANSPORTE", "PJ"],
        ["10/02/2026", "Pix - Enviado", "10/02 12:44 UBER", "-", "-15,93", "Saída", "UBER", "TRANSPORTE", "PJ"],
        ["10/02/2026", "Pagamento de Boleto", "BENDH CONDOMINIO GARANTIDO LTD", "-", "-680,90", "Saída", "CONDOMINIO", "CASA", "PJ"],
        ["13/02/2026", "Pix - Recebido", "13/02 22:11 ABACAXI ATE", "-", "700,00", "Entrada", "ABACAXI ATELIÊ", "TRABALHO", "PJ"],
        ["13/02/2026", "Pix - Enviado", "13/02 22:12 JOSE GABRIEL DE SOUSA GON", "-", "-520,00", "Saída", "JOSE GABRIEL", "OUTROS", ""],
        ["18/02/2026", "Pix - Enviado", "16/02 14:28 Maria Helena bezerra", "-", "-17,00", "Saída", "MARIA HELENA", "OUTROS", ""],
        ["18/02/2026", "Pix - Enviado", "18/02 16:37 NEOENERGIA DISTRIBUICAO B", "-", "-122,20", "Saída", "ENERGIA", "CASA", "PJ"],
        # New transactions from print
        ["19/02/2026", "Pix - Recebido", "19/02 17:10 ABACAXI ATE", "-", "1.000,00", "Entrada", "ABACAXI ATELIÊ", "TRABALHO", "PJ"],
        ["19/02/2026", "Pix - Enviado", "19/02 20:28 JOSE RONALDO LOPES DUQUE", "-", "-1.000,00", "Saída", "JOSE RONALDO", "OUTROS", "PJ"],
        ["23/02/2026", "Pix - Enviado", "21/02 10:26 KEISUKE MIYAHARA", "-", "-18,00", "Saída", "KEISUKE MIYAHARA", "ALIMENTAÇÃO", ""],
        ["23/02/2026", "Pix - Enviado", "21/02 13:19 Marco Aurelio De Morais S", "-", "-80,00", "Saída", "MARCO AURELIO", "OUTROS", ""],
        ["23/02/2026", "Pix - Enviado", "23/02 08:52 Jayaliila Barretto de And", "-", "-12,76", "Saída", "JAYALIILA", "OUTROS", ""],
        ["25/02/2026", "Tarifa MSG - Mês Anterior", "Cobrança referente 10/02/2026", "-", "-5,00", "Saída", "TARIFA MSG", "TAXAS", "PJ"],
        ["27/02/2026", "Pix - Recebido", "27/02 12:17 LEANDRO ROD", "-", "200,00", "Entrada", "LEANDRO ROD", "TRABALHO", "PJ"],
        ["27/02/2026", "S A L D O", "Fim do Período", "-", "243,99", "Entrada/Saldo", "SALDO FINAL", "INVESTIMENTOS", ""]
    ]

    # January data (consistent)
    jan_data = [
        ["21/01/2026", "S A L D O", "Início do Período", "-", "1.642,48", "Entrada/Saldo", "SALDO INICIAL", "INVESTIMENTOS", ""],
        ["21/01/2026", "Pix - Enviado", "OPCAO MATERIAIS PARA CONS", "-", "-3,00", "Saída", "CONSTRUÇÃO", "CASA", "PJ"],
        ["21/01/2026", "Pix - Enviado", "SNOOB FAST FOOD", "-", "-12,00", "Saída", "SNOOB FAST FOOD", "ALIMENTAÇÃO", "PJ"],
        ["23/01/2026", "Pix - Enviado", "Enzo Pinto Bomfim Moura", "-", "-250,00", "Saída", "ENZO PINTO", "TRABALHO", "PJ"],
        ["23/01/2026", "Pix - Enviado", "+ PERTO", "-", "-4,79", "Saída", "+ PERTO", "ALIMENTAÇÃO", "PJ"],
        ["23/01/2026", "S A L D O", "Fim do Período", "-", "1.372,69", "Entrada/Saldo", "SALDO FINAL", "INVESTIMENTOS", ""]
    ]

    headers = [["Data", "Lançamento", "Detalhes", "N° documento", "Valor", "Tipo Lançamento", "DESCRIÇÃO", "CATEGORIA", "PF OU PJ"]]
    
    # Combine all
    all_values = headers + jan_data + [[]] + feb_data

    # Pad rows to clear old junk (up to row 100)
    while len(all_values) < 100:
        all_values.append([""] * 9)

    update_sheet(f"{sheet_name}!A1:I100", all_values)
