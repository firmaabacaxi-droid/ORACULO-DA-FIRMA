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
                    env_vars[key] = value.strip().strip('"').strip("'")
    return env_vars

env = load_env(os.path.expanduser('~/.secrets/antigravity.env'))
NOTION_TOKEN = env.get("NOTION_TOKEN")

if not NOTION_TOKEN:
    print("Erro: NOTION_TOKEN não encontrado em ~/.secrets/antigravity.env")
    exit(1)

def request_notion(url, payload=None, method="POST"):
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    }
    data = None
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        if hasattr(e, 'read'):
            err = e.read().decode('utf-8')
            print(f"Erro na API ({method} {url}): {err}")
            return {"error": err}
        else:
            print(f"Erro: {e}")
            return {"error": str(e)}

PROPOSAL_PAGE_ID = "3738a525-91f3-813f-b4c8-e3186f345b8f"
BUDGET_DB_ID = "0652762f-bac3-4a0b-ad3c-2b7223132a2b"

print("1. Atualizando a página de Proposta no Notion...")
proposal_payload = {
    "properties": {
        "Valor Total": {"number": 66117},
        "Versão": {"number": 7}
    }
}
update_res = request_notion(f"https://api.notion.com/v1/pages/{PROPOSAL_PAGE_ID}", proposal_payload, method="PATCH")
if "error" in update_res:
    print("Falha ao atualizar proposta.")
else:
    print("Proposta atualizada com sucesso para R$ 66.117 (Versão 7).")

print("\n2. Buscando itens de orçamento vinculados...")
query_payload = {
    "filter": {
        "property": "Proposta",
        "relation": {
            "contains": PROPOSAL_PAGE_ID
        }
    }
}
query_res = request_notion(f"https://api.notion.com/v1/databases/{BUDGET_DB_ID}/query", query_payload, method="POST")

if "error" in query_res:
    print("Falha ao buscar itens do orçamento.")
    exit(1)

results = query_res.get("results", [])
print(f"Encontrados {len(results)} itens de orçamento para esta proposta.")

for page in results:
    page_id = page["id"]
    props = page["properties"]
    title_list = props["Item"]["title"]
    if not title_list:
        continue
    title = title_list[0]["text"]["content"]
    
    if "Edição e finalização de vídeos instrucionais (ENAP)" in title:
        print(f"Atualizando item '{title}'...")
        update_payload = {
            "properties": {
                "Valor unitário": {"number": 1500.00},
                "Total": {"number": 15000.00}
            }
        }
        res = request_notion(f"https://api.notion.com/v1/pages/{page_id}", update_payload, method="PATCH")
        if "error" in res:
            print(f"Erro ao atualizar '{title}': {res['error']}")
        else:
            print(f"Item '{title}' atualizado para R$ 15.000 (unitário R$ 1.500).")
            
    elif "NF 7,28%" in title:
        print(f"Atualizando item '{title}'...")
        update_payload = {
            "properties": {
                "Valor unitário": {"number": 4487.00},
                "Total": {"number": 4487.00}
            }
        }
        res = request_notion(f"https://api.notion.com/v1/pages/{page_id}", update_payload, method="PATCH")
        if "error" in res:
            print(f"Erro ao atualizar '{title}': {res['error']}")
        else:
            print(f"Item '{title}' atualizado para R$ 4.487.")

print("\nConcluído Notion Sync!")
