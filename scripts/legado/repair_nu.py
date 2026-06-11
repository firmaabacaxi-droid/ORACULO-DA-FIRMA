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

# Full Full February Data
FEB_DATA = """01/02/2026	-117.00	697f5364-40f2-4447-86fd-176255a9bc31	Aplicação RDB
02/02/2026	-8.00	6980d7f6-12dd-46d4-9e6b-9b251e926fea	Compra no débito - INTERVALO GOURMET
03/02/2026	350.00	69820d1d-ed25-4d7f-a40e-9582c1ef98c8	Resgate RDB
03/02/2026	-470.00	69820d3a-5593-4594-ab02-5624b9ee101a	Transferência enviada pelo Pix - REBECA CATARINA SILVA GONCALVES - •••.484.571-•• - BCO DO BRASIL S.A. (0001) Agência: 1230 Conta: 209856-3
04/02/2026	800.00	69833458-200b-408b-8bef-a310db396998	Transferência recebida pelo Pix - TOCA F C LTDA - 23.705.524/0001-83 - BCO DO BRASIL S.A. (0001) Agência: 2727 Conta: 58766-4
04/02/2026	-217.00	69834bc4-cacf-480e-a2b0-865e27ba97d4	Compra no débito - CABRISSIMA QUEIJARIA A
04/02/2026	-98.00	69836f20-c2d4-4344-aa53-b3dfdd6ae837	Transferência enviada pelo Pix - CABRISSIMA QUEIJARIA ARTESANAL - 51.744.391/0001-90 - CCLA CENTRO BRASILEIRA LTDA. Agência: 5004 Conta: 1117355-6
04/02/2026	-70.00	69836f7e-21d2-44a9-9c41-839ddd596e27	Transferência enviada pelo Pix - CABRISSIMA QUEIJARIA ARTESANAL - 51.744.391/0001-90 - CCLA CENTRO BRASILEIRA LTDA. Agência: 5004 Conta: 1117355-6
04/02/2026	-6.50	6983811f-bea5-4901-9fef-4cb4b73a98db	Transferência enviada pelo Pix - Paulo Cesar Brito da Silva - •••.898.933-•• - MERCADO PAGO IP LTDA. (0323) Agência: 1 Conta: 6216388183-8
04/02/2026	-20.00	69838365-3c36-4bfc-bb97-a647b3a85759	Transferência enviada pelo Pix - Paulo Cesar Brito da Silva - •••.898.933-•• - MERCADO PAGO IP LTDA. (0323) Agência: 1 Conta: 6216388183-8
04/02/2026	6.50	698384b3-b713-4189-8180-4fe6d539e5d6	Transferência Recebida - Maíra Ruana Dias Fernandes - •••.494.512-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 7770942-6
05/02/2026	-112.66	69844d0e-c1b4-4247-88a7-2200bad797a0	Transferência enviada pelo Pix - SUPERMERCADO T S A - 04.059.113/0001-13 - BCO SANTANDER (BRASIL) S.A. (0033) Agência: 82 Conta: 13057663-7
05/02/2026	-7.00	69849d78-c8ad-4898-ac85-49dfb2bf1c2f	Transferência enviada pelo Pix - CASA DO PAO DE QUEIJO - 21.320.727/0001-26 - STONE IP S.A. (0197) Agência: 1 Conta: 13428222-7
05/02/2026	-107.96	6984aeb2-b913-47f2-ae98-981382a19c12	Transferência enviada pelo Pix - AMILSON LESSA VIEIRA - •••.559.581-•• - CAIXA ECONOMICA FEDERAL (0104) Agência: 2437 Conta: 1288000000779553671-0
06/02/2026	-30.97	6985cd01-fdab-49af-aba1-f3a0a4dc5d9a	Transferência enviada pelo Pix - SNOOB FAST FOOD - 22.340.248/0001-34 - CIELO IP S.A. (0362) Agência: 1 Conta: 6840960001-1
06/02/2026	-100.00	69865f7d-e0ec-406c-9804-9a2afc4edeef	Compra no débito - POSTO PETER PAN
10/02/2026	-97.53	698b2a80-a326-46b8-b0f8-97d0eff7c1d0	Aplicação RDB
10/02/2026	335.76	698b441d-69c5-4308-bd06-249e215e0756	Transferência recebida pelo Pix - KENIA MENEZES - •••.039.311-•• - BCO DO BRASIL S.A. (0001) Agência: 2912 Conta: 206001-9
10/02/2026	700.00	698b6e0c-d581-4eb6-90bc-9abf92480930	Transferência recebida pelo Pix - FILIPE VIANNA DUQUE - •••.993.581-•• - BCO DO BRASIL S.A. (0001) Agência: 3413 Conta: 10304-7
10/02/2026	1500.00	698b6ebc-0f85-4632-9cdb-9117f07d860e	Transferência recebida pelo Pix - ABACAXI ATELIE - 50.868.798/0001-66 - BANCO INTER (0077) Agência: 1 Conta: 29509137-1
10/02/2026	-2000.00	698b6f67-09d4-4cd8-a109-357573667a0e	Transferência enviada pelo Pix - Rosely Barretto de Andrade - •••.194.055-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 53148180-4
10/02/2026	-535.76	698b6fc0-2ef7-4a60-b2e4-cd932cf0dd09	Aplicação RDB
12/02/2026	200.00	698e104b-c7db-42ea-b6c5-50a89c895262	Resgate RDB
12/02/2026	-200.00	698e1086-ccd7-4596-aa5a-0652f9ff7bbb	Transferência enviada pelo Pix - Clinica Renata Belo
19/02/2026	898.64	69976b6e-899f-4ae3-ae42-058f729d2f1e	Resgate RDB
19/02/2026	-161.02	69976b88-5f53-4efe-b19e-65a760146a58	Transferência enviada pelo Pix - TELEFONICA BRAS - 02.558.157/0001-62 - BCO SANTANDER (BRASIL) S.A. (0033) Agência: 2271 Conta: 13002745-8
19/02/2026	-245.02	69976be0-b651-499f-9296-3bd93d6a5a6d	Pagamento de boleto efetuado - SEFAZ DISTRITO FEDER
19/02/2026	-152.36	69976c3f-9a55-4777-8d02-9c09eb93fea6	Transferência enviada pelo Pix - TELEFONICA BRAS - 02.558.157/0001-62 - BCO SANTANDER (BRASIL) S.A. (0033) Agência: 2271 Conta: 13002745-8
21/02/2026	-15.00	699a431c-da31-46aa-b955-d7d744889232	Transferência enviada pelo Pix - ISAQUE RODRIGUES MARINHO - •••.964.241-•• - ITAÚ UNIBANCO S.A. (0341) Agência: 8394 Conta: 83451-2
21/02/2026	-10.00	699a450c-be1a-40c2-b7ba-605229729410	Compra no débito - YuzDistribuicao
21/02/2026	-28.00	699a711c-775a-4669-9b0a-04c500b66102	Compra no débito - REDE DE ESTACIONAMENTO
23/02/2026	2200.00	699c3ecf-6e18-4cc2-9888-2c88c8c0ae8a	Transferência recebida pelo Pix - ABACAXI ATELIE - 50.868.798/0001-66 - BANCO INTER (0077) Agência: 1 Conta: 29509137-1
23/02/2026	12.76	699c3f73-0c58-4cc5-95e8-052d05adcc6e	Transferência recebida pelo Pix - FILIPE VIANNA DUQUE - •••.993.581-•• - BCO DO BRASIL S.A. (0001) Agência: 3413 Conta: 10304-7
23/02/2026	-2500.00	699c3fa1-42d7-4cc9-916b-eaf7e755e086	Transferência enviada pelo Pix - SIDMA KURTZ AZAMBUJA - •••.059.851-•• - BCO SANTANDER (BRASIL) S.A. (0033) Agência: 3441 Conta: 1000997-0
27/02/2026	10000.00	69a190c1-bf62-4a7e-9839-815f056f2cc5	Depósito de empréstimo
27/02/2026	-730.18	69a190f4-a77b-40ba-a11d-33a61e8fef4f	Pagamento de fatura
27/02/2026	-349.87	69a1913d-02fd-45a4-a3 a8-3ac0435c5d5b	Pagamento de fatura
27/02/2026	-5094.26	69a19171-3d61-413c-be39-5cee4a472050	Pagamento de boleto efetuado - ITAU UNIBANCO HOLDING S.A.
27/02/2026	-3614.41	69a191ae-1615-425c-b3d8-34f62b5c7237	Pagamento de boleto efetuado - ITAU UNIBANCO HOLDING S.A.
27/02/2026	181.26	69a19ac9-2814-4128-8bfe-ca454247ff51	Transferência Recebida - Kenia Menezes Lacombe - •••.039.311-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 61726723-9
27/02/2026	76.20	69a1ac9b-9a95-4c1b-bfd4-d2a90a5702e4	Transferência Recebida - Rosely Barretto de Andrade - •••.194.055-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 53148180-4
28/02/2026	-10.00	69a2f5f3-db3d-4ee5-8d9a-0255f4ef6ca9	Transferência enviada pelo Pix - Luiz Anselmo Santos Conceição - •••.735.295-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 559417040-9
28/02/2026	-50.00	69a2fa8a-a017-486a-9123-526fa1448840	Transferência enviada pelo Pix - SOFIA MARTINS CARVALHO - •••.082.851-•• - BCO DO BRASIL S.A. (0001) Agência: 1606 Conta: 76597-0
28/02/2026	-26.00	69a2fb23-850c-484c-98db-cd293d1afb85	Transferência enviada pelo Pix - 36.572.277 JULIANA BERNARDES RIBEIRO DA COSTA - 36.572.277/0001-36 - BCO DO BRASIL S.A. (0001) Agência: 1022 Conta: 54428-0
28/02/2026	-65.00	69a2fc0f-4f61-4d14-bab7-d1ef122673e1	Transferência enviada pelo Pix - Luiz Anselmo Santos Conceição - •••.735.295-•• - NU PAGAMENTOS - IP (0260) Agência: 1 Conta: 559417040-9
28/02/2026	-200.00	69a37afb-16bf-4e72-9d0b-ffd7ede67c0a	Transferência enviada pelo Pix - FRANCISCA RISLANE SOUSA COSTA - •••.478.433-•• - CAIXA ECONOMICA FEDERAL (0104) Agência: 4166 Conta: 1288000000784602532-6"""

CATEGORIES = {
    "RECEITA FEDERAL": ("IMPOSTOS", "PJ"),
    "TELEFONICA": ("CASA", "PJ"),
    "TOCA F C": ("TRABALHO", "PJ"),
    "ABACAXI ATELIE": ("TRABALHO", "PJ"),
    "INTERVALO GOURMET": ("ALIMENTAÇÃO", "PF"),
    "CABRISSIMA": ("ALIMENTAÇÃO", "PF"),
    "SUPERMERCADO": ("ALIMENTAÇÃO", "PF"),
    "CASA DO PAO DE QUEIJO": ("ALIMENTAÇÃO", "PF"),
    "SNOOB FAST FOOD": ("ALIMENTAÇÃO", "PF"),
    "POSTO PETER PAN": ("TRANSPORTE", "PF"),
    "SEFAZ": ("IMPOSTOS", "PJ"),
    "ITAU UNIBANCO": ("EMPRÉSTIMOS", "PJ"),
    "DEPÓSITO DE EMPRÉSTIMO": ("EMPRÉSTIMOS", "PJ"),
    "FATURA": ("CARTÃO", "PF"),
    "CLINICA RENATA BELO": ("SAÚDE", "PF"),
    "RESGATE RDB": ("INVESTIMENTO", "PF"),
    "APLICAÇÃO RDB": ("INVESTIMENTO", "PF")
}

def get_cat_pjpf(details_str):
    details_upper = details_str.upper()
    for key, (cat, pjpf) in CATEGORIES.items():
        if key in details_upper:
            return cat, pjpf
    return "OUTROS", "PF"

def repair_nu():
    # 1. Get ALL current data
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="'CONTA NU'!A1:H1000").execute()
    values = result.get('values', [])
    if not values: return

    header = ["Data", "Lançamento", "Detalhes", "Valor", "Tipo", "Descrição", "Categoria", "PF/PJ"]
    
    # Keep only JANEIRO (01/2026)
    january_rows = []
    for row in values[1:]:
        if not row: continue
        date = row[0]
        if "/01/2026" in date or "/12/2025" in date:
            # Standardize length to 8
            while len(row) < 8: row.append("")
            january_rows.append(row[:8])

    # 2. Parse February data (clean start)
    february_rows = []
    lines = FEB_DATA.strip().split('\n')
    for line in lines:
        parts = line.split('\t')
        if len(parts) < 4: continue
        date, val_raw, ident, desc = parts[0], parts[1], parts[2], parts[3]
        val = float(val_raw)
        tipo = "Entrada" if val > 0 else "Saída"
        cat, pjpf = get_cat_pjpf(desc)
        if "Pix" in desc: lanc = "Pix"
        elif "RDB" in desc: lanc = "Investimento"
        elif "débito" in desc: lanc = "Cartão Débito"
        elif "fatura" in desc: lanc = "Cartão Crédito"
        else: lanc = "Transferência"
        february_rows.append([date, lanc, desc, str(val).replace('.', ','), tipo, ident, cat, pjpf])

    # 3. Combine
    full_list = [header] + january_rows + february_rows
    
    # 4. Overwrite tab (clear old data first)
    # Actually just update with a large enough range of empty strings to clear
    clear_layout = [[""] * 8 for _ in range(1000)]
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'CONTA NU'!A1:H1000",
                         valueInputOption='USER_ENTERED', body={'values': clear_layout}).execute()
                         
    sheet.values().update(spreadsheetId=SPREADSHEET_ID, range="'CONTA NU'!A1:H1000",
                         valueInputOption='USER_ENTERED', body={'values': full_list}).execute()
    
    print("Nubank tab repaired. Duplicates removed and February re-inserted correctly.")

if __name__ == '__main__':
    repair_nu()
