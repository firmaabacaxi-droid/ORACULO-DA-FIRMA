import os
import json
import urllib.request

def load_env(filepath):
    env_vars = {}
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value
    return env_vars

env = load_env('.env')
NOTION_TOKEN = env.get("NOTION_TOKEN")
DATABASE_ID = "30089da3-9902-80d3-a0a4-f186831e99b9"

url = "https://api.notion.com/v1/pages"
headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}

# New project details
new_page_data = {
    "parent": {"database_id": DATABASE_ID},
    "properties": {
        "#ID": {"title": [{"text": {"content": "#07"}}]},
        "PROJETO 1": {"rich_text": [{"text": {"content": "AZUL"}}]},
        "Descri\u00e7\u00e3o_Geral_do_Projeto": {"rich_text": [{"text": {"content": "Vai ser filmado em Goi\u00e2nia"}}]},
        "Observa\u00e7\u00f5es": {"rich_text": [{"text": {"content": "Vamos usar 3 c\u00e2meras"}}]},
        "Cliente": {"rich_text": [{"text": {"content": "FD"}}]},
        "Status": {"select": {"name": "ativo"}},
        "Prioridade": {"select": {"name": "alta"}},
        "Status_Financeiro": {"select": {"name": "a receber"}},
        "Valor_Total_Projeto": {"number": 10000},
        "Briefing_Geral": {"rich_text": [{"text": {"content": "\u00c9 um projeto muito legal"}}]}
    }
}

data = json.dumps(new_page_data).encode("utf-8")
req = urllib.request.Request(url, data=data, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))
        print(f"Projeto criado com sucesso! ID da p\u00e1gina: {res_data.get('id')}")
except Exception as e:
    # Print more detailed error if possible
    if hasattr(e, 'read'):
        print(f"Erro na cria\u00e7\u00e3o: {e.read().decode('utf-8')}")
    else:
        print(f"Erro na cria\u00e7\u00e3o: {e}")
