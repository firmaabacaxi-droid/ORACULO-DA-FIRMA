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

FIXED_DESCRIPTIONS = {
    "69a714ea-b715-415e-99de-45e9c283a130": "Transferência enviada pelo Pix - LOTERIA QI25 - 07.115.817/0001-54 - CAIXA ECONOMICA FEDERAL (0104) Agência: 674 Conta: 4995000000578409879-5",
    "69a8347a-de38-4184-80a8-388d32c2204f": "Transferência recebida pelo Pix - ABACAXI ATELIE - 50.868.798/0001-66 - BANCO INTER (0077) Agência: 1 Conta: 29509137-1",
    "69a8356c-1408-40e4-a159-a727ee7472a1": "Transferência enviada pelo Pix - CLINICA HOSPITALAR ORTOPEDICA ARTHROS - 03.950.531/0001-33 - COOP SICREDI PLAN CENTRAL Agência: 3953 Conta: 54729-6",
    "69a9e1b4-ac96-42fb-91b7-b5d4df33de00": "Transferência enviada pelo Pix - Anderson de Bessa Moreira - •••.749.411-•• Agência: 1 Conta: 73773037-4",
    "69aaf94f-1e87-4a46-97f7-17e969a872fb": "Transferência recebida pelo Pix - KENIA MENEZES - •••.039.311-•• - BCO DO BRASIL S.A. (0001) Agência: 2912 Conta: 206001-9",
    "69ab180f-0149-4bfd-894c-976346bf1d71": "Transferência recebida pelo Pix - ABACAXI ATELIE - 50.868.798/0001-66 - BANCO INTER (0077) Agência: 1 Conta: 29509137-1",
    "69ab1632-2e28-4192-b331-b2dc76efeb51": "Resgate de empréstimo",
    "69ab1f5b-c8f3-4412-af3c-0afa243588a1": "Transferência Recebida - Rosely Barretto de Andrade - •••.194.055-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 53148180-4",
    "69aeec48-acbf-4d35-bb55-cbd55b2f295d": "Transferência recebida pelo Pix - ABACAXI ATELIE - 50.868.798/0001-66 - BANCO INTER (0077) Agência: 1 Conta: 29509137-1",
    "69aeecaa-7d05-4c13-b937-2b43898ae8ff": "Transferência recebida pelo Pix - FILIPE VIANNA DUQUE - •••.993.581-•• - BCO DO BRASIL S.A. (0001) Agência: 3413 Conta: 10304-7",
    "69aeed00-4074-4bcc-b9c5-6ac7fe7dcfe7": "Transferência enviada pelo Pix - Rosely Barretto de Andrade - •••.194.055-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 53148180-4",
    "69b05e5c-a116-4309-859d-06dc64a8ada6": "Transferência recebida pelo Pix - ABACAXI ATELIE - 50.868.798/0001-66 - BANCO INTER (0077) Agência: 1 Conta: 29509137-1",
    "69b0779e-0026-446e-82b0-f41aecf53ab9": "Transferência enviada pelo Pix - 36.782.805 VANIA NATALIA DE CARVALHO - 36.782.805/0001-81 - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 99072113-5",
    "69b85788-7fe2-45e0-b96f-01556d873c2d": "Transferência recebida pelo Pix - ABACAXI ATELIE - 50.868.798/0001-66 - BANCO INTER (0077) Agência: 1 Conta: 29509137-1",
    "69b8585f-6439-4917-b239-d43e7397849e": "Transferência enviada pelo Pix - Sidma Kurtz Azambuja - •••.059.851-•• - BCO SANTANDER (BRASIL) S.A. (0033) Agência: 3441 Conta: 1000997-0",
    "69b85a7a-fd14-4d9c-b755-2dac04640c4e": "Transferência recebida pelo Pix - FILIPE VIANNA DUQUE - •••.993.581-•• - BCO DO BRASIL S.A. (0001) Agência: 3413 Conta: 10304-7",
    "69b85ab4-7595-4070-9f2a-1367b504abb": "Pagamento de boleto efetuado - SEFAZ DISTRITO FEDER",
    "69b85bc3-0dbc-41a6-880d-26302388d16f": "Transferência recebida pelo Pix - ABACAXI ATELIE - 50.868.798/0001-66 - BANCO INTER (0077) Agência: 1 Conta: 29509137-1",
    "69b85c1b-b3db-450e-90b1-0486ffcbf609": "Transferência enviada pelo Pix - TELEFONICA BRAS - 02.558.157/0001-62 - BCO SANTANDER (BRASIL) S.A. (0033) Agência: 2271 Conta: 13002745-8",
    "69bbd892-1a71-4f8b-8c64-f38806c19314": "Transferência enviada pelo Pix - LOTERICA KRELING - 02.823.033/0001-13 - CAIXA ECONOMICA FEDERAL (0104) Agência: 3444 Conta: 4995000000577979445-2",
    "69bd6304-6f9e-4ceb-bfee-e5fe501efc6a": "Transferência enviada pelo Pix - Maria Alcioneide Americo da Silva - •••.659.851-•• - BANCO INTER (0077) Agência: 1 Conta: 15654730-9",
    "69bef37b-b542-48af-b09d-afd235aaebc4": "Transferência Recebida - Rosely Barretto de Andrade - •••.194.055-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 53148180-4",
    "69c17620-360e-4524-832a-b9afc027e167": "Transferência Recebida - Luana Figueiredo Rodegheri - •••.990.511-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 6756597-3"
}

def fix_nu_structure_and_march():
    # 1. Read all rows
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CONTA NU'!A1:H1000").execute()
    values = result.get('values', [])
    if not values: return

    # Header check
    header = values[0]
    # Current indices: 
    # Detalhes (2)
    # Descricao (5)
    
    for i, row in enumerate(values):
        if i == 0: continue # Skip header text, but consider if we should rename it to avoid confusion
        
        while len(row) < 8: row.append("") # Ensure enough columns
        
        detalhes_val = row[2]
        descricao_val = row[5]
        
        # If it's March and we have a fixed description:
        if descricao_val in FIXED_DESCRIPTIONS:
            uuid = descricao_val
            full_text = FIXED_DESCRIPTIONS[uuid]
            row[2] = uuid       # ID goes to Detalhes (Col C)
            row[5] = full_text  # Text goes to Descrição (Col F)
        else:
            # For Jan/Feb, if UUID is in Descricao, move it to Detalhes
            if "-" in descricao_val and len(descricao_val) > 20: 
                uuid = descricao_val
                text = detalhes_val
                row[2] = uuid
                row[5] = text
        
        values[i] = row

    # 2. Update headers for clarity (optional but helps the user)
    # values[0][2] = "Identificador"
    # values[0][5] = "Descrição"

    # 3. Write back
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'CONTA NU'!A1:H1000",
                         valueInputOption='USER_ENTERED', body={'values': values}).execute()
    print("Nubank structure fixed: UUIDs moved to 'Detalhes' and Descriptive texts moved to 'Descrição'.")

if __name__ == '__main__':
    fix_nu_structure_and_march()
