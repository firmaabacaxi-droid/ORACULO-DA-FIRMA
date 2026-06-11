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

MAR_DATA = [
    ["27/02/2026", "Saldo Anterior", " ", "243,99", "SALDO"],
    ["02/03/2026", "Pix - Enviado", "01/03 21:11 Luciano da Silva", "-5,00", "Saída", "", "OUTROS", "PF"],
    ["09/03/2026", "Compra com Cartão", "09/03 16:25 NICOLLAS YURI LIMA D", "-9,00", "Saída", "", "OUTROS", "PF"],
    ["09/03/2026", "Pix - Enviado", "09/03 12:52 Jayaliila Barretto de And", "-56,96", "Saída", "", "OUTROS", "PF"],
    ["12/03/2026", "Pix - Enviado", "12/03 21:27 Keven Adryan Mota Silva S", "-7,00", "Saída", "", "OUTROS", "PF"],
    ["16/03/2026", "Pix - Recebido", "16/03 16:15 50868798000166 ABACAXI ATE", "1.500,00", "Entrada", "", "TRABALHO", "PJ"],
    ["16/03/2026", "Pix - Enviado", "16/03 16:19 NEOENERGIA DISTRIBUICAO B", "-240,31", "Saída", "", "CASA", "PJ"],
    ["16/03/2026", "Pix - Enviado", "16/03 16:20 JOSE RONALDO LOPES DUQUE", "-1.000,00", "Saída", "", "TRABALHO", "PJ"],
    ["16/03/2026", "Pix - Enviado", "16/03 16:30 TELEFONICA BRAS", "-159,25", "Saída", "", "CASA", "PJ"],
    ["16/03/2026", "Pix - Enviado", "16/03 16:31 Jayaliila Barretto de And", "-100,00", "Saída", "", "OUTROS", "PF"],
    ["17/03/2026", "Pix - Recebido", "17/03 10:42 50868798000166 ABACAXI ATE", "500,00", "Entrada", "", "TRABALHO", "PJ"],
    ["17/03/2026", "Pix - Enviado", "17/03 10:50 FREDERICO LUA BRANCA ALEN", "-500,00", "Saída", "", "OUTROS", "PF"],
    ["18/03/2026", "Pix - Enviado", "18/03 16:45 VICTOR HUGO DA SILVA UCHO", "-25,00", "Saída", "", "OUTROS", "PF"],
    ["19/03/2026", "Pix - Recebido", "19/03 07:55 00002094756173 ARTHUR LOPE", "300,00", "Entrada", "", "OUTROS", "PF"],
    ["19/03/2026", "Compra com Cartão", "19/03 15:52 CENTRAL FERRAGENS", "-1,50", "Saída", "", "CASA", "PF"],
    ["24/03/2026", "S A L D O", " ", "439,97", "SALDO", "", "OUTROS", "PF"]
]

def process_mar():
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:H150").execute()
    values = result.get('values', [])
    if not values: return
    
    # We want to keep everything from Jan/Feb as is.
    # Append March.
    clean_data = [str(x).strip() for x in values[0]] # header
    
    # Just append as it's a continuous list.
    full_output = values + MAR_DATA
    
    # Pad
    while len(full_output) < 200: full_output.append([""] * 8)
    
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'LANÇAMENTOS'!A1:H200",
                         valueInputOption='USER_ENTERED', body={'values': full_output}).execute()
    print("March added to log.")

if __name__ == '__main__':
    process_mar()
