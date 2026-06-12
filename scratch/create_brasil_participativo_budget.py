import os
import json
import urllib.request
import time

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

def request_notion(url, payload, method="POST"):
    data = json.dumps(payload).encode("utf-8")
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    }
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

# IDs dos registros
PROPOSAL_PAGE_ID = "3738a525-91f3-813f-b4c8-e3186f345b8f"
PROJECT_PAGE_ID = "3618a525-91f3-804d-89f0-e9928c95c41b"
BUDGET_DB_ID = "0652762f-bac3-4a0b-ad3c-2b7223132a2b"

print("1. Atualizando a página de Proposta no Notion...")
proposal_payload = {
    "properties": {
        "Valor Total": {"number": 60000},
        "Versão": {"number": 5}
    }
}
update_res = request_notion(f"https://api.notion.com/v1/pages/{PROPOSAL_PAGE_ID}", proposal_payload, method="PATCH")
if "error" in update_res:
    print("Falha ao atualizar proposta.")
else:
    print("Proposta atualizada com sucesso para R$ 60.000 (Versão 5).")

# Itens de orçamento a serem inseridos
budget_items = [
    {
        "Item": "Desenvolvimento de roteiro e pesquisa",
        "Categoria": "Equipe",
        "Valor unitário": 3500.0,
        "Quantidade": 1,
        "Total": 3500.0
    },
    {
        "Item": "Planejamento e coordenação de produção",
        "Categoria": "Equipe",
        "Valor unitário": 700.0,
        "Quantidade": 5,
        "Total": 3500.0
    },
    {
        "Item": "Diárias de filmagem — equipe e equipamentos*",
        "Categoria": "Equipe",
        "Valor unitário": 3000.0,
        "Quantidade": 9,
        "Total": 27000.0
    },
    {
        "Item": "Custos de produção — transporte e alimentação",
        "Categoria": "Outro",
        "Valor unitário": 2612.0,
        "Quantidade": 1,
        "Total": 2612.0
    },
    {
        "Item": "Pós-produção — edição, color, mixagem e trilha",
        "Categoria": "Pós-produção",
        "Valor unitário": 10000.0,
        "Quantidade": 1,
        "Total": 10000.0
    },
    {
        "Item": "Edição e finalização de vídeos instrucionais (ENAP)",
        "Categoria": "Pós-produção",
        "Valor unitário": 932.20,
        "Quantidade": 10,
        "Total": 9322.0
    },
    {
        "Item": "NF 7,28%",
        "Categoria": "Imposto",
        "Valor unitário": 4066.0,
        "Quantidade": 1,
        "Total": 4066.0
    }
]

print("\n2. Inserindo itens de orçamento...")
success_count = 0

for item in budget_items:
    item_payload = {
        "parent": {"database_id": BUDGET_DB_ID},
        "properties": {
            "Item": {"title": [{"text": {"content": item["Item"]}}]},
            "Projeto": {"relation": [{"id": PROJECT_PAGE_ID}]},
            "Proposta": {"relation": [{"id": PROPOSAL_PAGE_ID}]},
            "Categoria": {"select": {"name": item["Categoria"]}},
            "Valor unitário": {"number": item["Valor unitário"]},
            "Quantidade": {"number": item["Quantidade"]},
            "Total": {"number": item["Total"]},
            "Versão": {"select": {"name": "Original"}},
            "Fase": {"select": {"name": "Proposta"}},
            "Tipo": {"select": {"name": "Custo"}},
            "Status": {"select": {"name": "Estimado"}}
        }
    }
    
    res = request_notion("https://api.notion.com/v1/pages", item_payload)
    if "error" in res:
        print(f"Erro ao criar item '{item['Item']}': {res['error']}")
    else:
        print(f"Item criado: '{item['Item']}' (R$ {item['Total']:.2f})")
        success_count += 1
        
    time.sleep(0.3) # Evitar limite de requisições

print(f"\nConcluído! {success_count} de {len(budget_items)} itens criados no Notion.")
