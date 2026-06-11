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

headers = ["Data", "Lançamento", "Detalhes", "Valor", "Tipo Lançamento", "DESCRIÇÃO", "CATEGORIA", "PF OU PJ"]

def format_curr(val):
    return f"{val:,.2f}".replace('.', 'X').replace(',', '.').replace('X', ',')

def get_summary_row(month_name, initial, final, in_pj, in_pf, out_pj, out_pf):
    return [
        ["", "RESUMO MENSAL - " + month_name.upper(), "", "", "", "", "", "", ""],
        ["", "Saldo Inicial", format_curr(initial), "", "", "Entradas PJ", format_curr(in_pj), "", ""],
        ["", "Saldo Final", format_curr(final), "", "", "Entradas PF", format_curr(in_pf), "", ""],
        ["", "Diferença", format_curr(final - initial), "", "", "Saídas PJ", format_curr(out_pj), "", ""],
        ["", "", "", "", "", "Saídas PF", format_curr(out_pf), "", ""],
        ["", "", "", "", "", "TOTAL BRUTO", format_curr(in_pj + in_pf - out_pj - out_pf), "", ""]
    ]

def finalize():
    # January Data
    jan_data = [
        ["30/12/2025", "Saldo Anterior", " ", "1.263,00", "SALDO", "", "", ""],
        ["02/01/2026", "Pix - Enviado", "02/01 20:25 LUCAS COIMBRA FONSECA", "-170,00", "Saída", "CIRCO", "ESPORTE", "PF"],
        ["05/01/2026", "Pix - Recebido", "05/01 10:02 01338904140 THALES NOOR RO", "180,00", "Entrada", "", "", "PF"],
        ["06/01/2026", "Pix - Enviado", "06/01 09:05 DANIELE DE SOUZA OLIVEIRA", "-40,00", "Saída", "CIRCO", "ESPORTE", "PF"],
        ["08/01/2026", "Pix - Enviado", "08/01 09:59 THE HOT MACHINE", "-6,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["09/01/2026", "Pix - Enviado", "09/01 21:09 Marco Aurelio De Morais S", "-110,00", "Saída", "", "FLORES", "PF"],
        ["12/01/2026", "Pix - Enviado", "10/01 09:35 LUKAS MARTT", "-40,00", "Saída", "CIRCO", "ESPORTE", "PF"],
        ["13/01/2026", "Pix - Recebido", "13/01 18:21 18422624168 CARLOS P ANGEL", "1.000,00", "Entrada", "", "", "PF"],
        ["13/01/2026", "Pix - Enviado", "13/01 17:52 NANOBIOTECH PRODUTOS PARA", "-340,00", "Saída", "ALCOOL", "FLORES", "PF"],
        ["16/01/2026", "Pix - Recebido", "16/01 12:28 02403100129 Jayaliila Barr", "1.000,00", "Entrada", "", "", "PF"],
        ["16/01/2026", "Pix - Enviado", "16/01 12:29 JOSE RONALDO LOPES DUQUE", "-1.000,00", "Saída", "EQUIPAMENTOS", "TRABALHO", "PJ"],
        ["16/01/2026", "Pix - Enviado", "16/01 22:47 TRILHAS DA AMAZONIA SAO J", "-9,52", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["19/01/2026", "Pix - Enviado", "17/01 09:42 SARA SOUSA FREITAS DE MEL", "-70,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["19/01/2026", "Pix - Enviado", "17/01 09:54 SARA SOUSA FREITAS DE MEL", "-15,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["21/01/2026", "Pix - Enviado", "21/01 16:19 OPCAO MATERIAIS PARA CONS", "-3,00", "Saída", "", "CASA", "PF"],
        ["21/01/2026", "Pix - Enviado", "21/01 17:58 SNOOB FAST FOOD", "-12,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["23/01/2026", "Pix - Enviado", "23/01 13:00 Enzo Pinto Bomfim Moura", "-250,00", "Saída", "", "TRABALHO", "PJ"],
        ["23/01/2026", "Pix - Enviado", "23/01 14:54 + PERTO", "-4,79", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["26/01/2026", "Pix - Enviado", "24/01 09:24 Ivone Ribeiro Machado", "-65,45", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["26/01/2026", "Pix - Enviado", "24/01 09:27 45.651.253 ADENILSON RODR", "-24,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["26/01/2026", "Pix - Enviado", "24/01 09:29 João Batista de Oliveira", "-6,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["30/01/2026", "Pix - Enviado", "30/01 13:32 Jayaliila Barretto de And", "-600,00", "Saída", "", "", "PF"],
        ["31/01/2026", "S A L D O", " ", "642,35", "SALDO", "", "", ""]
    ]
    
    # February Data
    fev_data = [
        ["30/01/2026", "Saldo Anterior", " ", "642,35", "SALDO", "", "", ""],
        ["04/02/2026", "Pix - Recebido", "CRISTINA ROBERTO BUFFET E", "1.700,00", "Entrada", "", "TRABALHO", "PJ"],
        ["04/02/2026", "Pix - Enviado", "CRISTINA ROBERTO BUFFET E", "-1.700,00", "Saída", "", "OUTROS", "PJ"],
        ["05/02/2026", "Pix - Recebido", "CARLOS P ANGEL", "1.000,00", "Entrada", "", "", "PF"],
        ["09/02/2026", "Pix - Enviado", "JAMBURITA RESTAURANTE LTD", "-142,50", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["10/02/2026", "Pix - Enviado", "Jayaliila Barretto de And", "-700,00", "Saída", "", "", "PF"],
        ["10/02/2026", "Pagamento de Boleto", "BENDH CONDOMINIO GARANTIDO LTD", "-680,90", "Saída", "CONDOMINIO", "CASA", "PJ"],
        ["13/02/2026", "Pix - Recebido", "ABACAXI ATE", "700,00", "Entrada", "", "TRABALHO", "PJ"],
        ["13/02/2026", "Pix - Enviado", "JOSE GABRIEL DE SOUSA GON", "-520,00", "Saída", "", "OUTROS", "PF"],
        ["18/02/2026", "Pix - Enviado", "Maria Helena bezerra", "-17,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["18/02/2026", "Pix - Enviado", "NEOENERGIA DISTRIBUICAO B", "-122,20", "Saída", "ENERGIA", "CASA", "PJ"],
        ["19/02/2026", "Pix - Recebido", "ABACAXI ATE", "1.000,00", "Entrada", "", "TRABALHO", "PJ"],
        ["19/02/2026", "Pix - Enviado", "JOSE RONALDO LOPES DUQUE", "-1.000,00", "Saída", "", "OUTROS", "PJ"],
        ["23/02/2026", "Pix - Enviado", "KEISUKE MIYAHARA", "-18,00", "Saída", "", "ALIMENTAÇÃO", "PF"],
        ["23/02/2026", "Pix - Enviado", "Marco Aurelio De Morais S", "-80,00", "Saída", "", "OUTROS", "PF"],
        ["23/02/2026", "Pix - Enviado", "Jayaliila Barretto de And", "-12,76", "Saída", "", "OUTROS", "PF"],
        ["25/02/2026", "Tarifa MSG", "Cobrança Automática", "-5,00", "Saída", "", "TAXAS", "PF"],
        ["27/02/2026", "Pix - Recebido", "LEANDRO ROD", "200,00", "Entrada", "", "TRABALHO", "PJ"],
        ["27/02/2026", "S A L D O", " ", "243,99", "SALDO", "", "", ""]
    ]

    # Combine All for writing
    full_table = [headers] + jan_data + [[""]] + \
                 get_summary_row("Janeiro", 1263.00, 642.35, 0, 2780.00, 1250.00, 2150.65) + \
                 [[""]] + [headers] + fev_data + [[""]] + \
                 get_summary_row("Fevereiro", 642.35, 243.99, 3600.00, 1000.00, 3503.10, 1495.26)

    # Pad to clean old rows
    while len(full_table) < 200: full_table.append([""] * 9)

    # Write Values
    sheet.values().update(
        spreadsheetId=SPREADSHEET_ID, range="'CONTA CORRENTE BB'!A1:I200",
        valueInputOption='USER_ENTERED', body={'values': full_table}).execute()

    # Apply Formatting (Yellow for Summaries)
    spreadsheet = sheet.get(spreadsheetId=SPREADSHEET_ID).execute()
    sheet_id = spreadsheet['sheets'][0]['properties']['sheetId']

    # Find the row indices for summaries in our full_table
    # JAN Summary starts at index 1 + len(jan_data) + 1 (empty) = index 25 (Row 26, index 25)
    # FEV Summary starts after JAN summary + 1 empty + header + fev_data + 1 empty
    idx_jan_sum = 1 + len(jan_data) + 1
    idx_fev_start = idx_jan_sum + 6 + 1
    idx_fev_sum = idx_fev_start + 1 + len(fev_data) + 1

    requests = [
        # Format JAN Summary
        {
            "repeatCell": {
                "range": {"sheetId": sheet_id, "startRowIndex": idx_jan_sum, "endRowIndex": idx_jan_sum + 6, "startColumnIndex": 1, "endColumnIndex": 9},
                "cell": {"userEnteredFormat": {"backgroundColor": {"red": 1.0, "green": 1.0, "blue": 0.0}}},
                "fields": "userEnteredFormat(backgroundColor)"
            }
        },
        # Header for JAN Summary
        {
            "repeatCell": {
                "range": {"sheetId": sheet_id, "startRowIndex": idx_jan_sum, "endRowIndex": idx_jan_sum + 1, "startColumnIndex": 1, "endColumnIndex": 9},
                "cell": {"userEnteredFormat": {"textFormat": {"bold": True, "fontSize": 12}}},
                "fields": "userEnteredFormat(textFormat)"
            }
        },
        # Format FEV Summary
        {
            "repeatCell": {
                "range": {"sheetId": sheet_id, "startRowIndex": idx_fev_sum, "endRowIndex": idx_fev_sum + 6, "startColumnIndex": 1, "endColumnIndex": 9},
                "cell": {"userEnteredFormat": {"backgroundColor": {"red": 1.0, "green": 1.0, "blue": 0.0}}},
                "fields": "userEnteredFormat(backgroundColor)"
            }
        },
        # Header for FEV Summary
        {
            "repeatCell": {
                "range": {"sheetId": sheet_id, "startRowIndex": idx_fev_sum, "endRowIndex": idx_fev_sum + 1, "startColumnIndex": 1, "endColumnIndex": 9},
                "cell": {"userEnteredFormat": {"textFormat": {"bold": True, "fontSize": 12}}},
                "fields": "userEnteredFormat(textFormat)"
            }
        }
    ]
    sheet.batchUpdate(spreadsheetId=SPREADSHEET_ID, body={'requests': requests}).execute()
    print("Full Year Finalized via API.")

if __name__ == '__main__':
    finalize()
