import requests
import json

company_id = "33c688bf-426b-435b-8eeb-003a03f2f658"
url = f"http://127.0.0.1:3100/api/companies/{company_id}/agents"
headers = {"Content-Type": "application/json"}

agents_to_create = [
    {
        "name": "Agente de Pré-Produção",
        "role": "designer",
        "description": "Estrutura roteiros cinematográficos, decupagens e planos de filmagem.",
        "adapterType": "process",
        "adapterConfig": {
            "command": "python",
            "args": ["scripts/sync_vault_core.py"]
        }
    },
    {
        "name": "Agente de Gestão",
        "role": "pm",
        "description": "Organiza cronogramas de set, ordens do dia e conciliação financeira.",
        "adapterType": "process",
        "adapterConfig": {
            "command": "python",
            "args": ["scripts/operacional/process_financials.py"]
        }
    },
    {
        "name": "Agente de Conteúdo",
        "role": "cmo",
        "description": "Gera calendários editoriais e cópias humanizadas para mídias sociais.",
        "adapterType": "process",
        "adapterConfig": {
            "command": "python",
            "args": ["scripts/operacional/update_global_dashboard_final.py"]
        }
    },
    {
        "name": "Agente de Prospecção",
        "role": "general",
        "description": "Qualifica novos contatos e alimenta o pipeline comercial (CRM).",
        "adapterType": "process",
        "adapterConfig": {
            "command": "python",
            "args": ["scripts/operacional/full_oracle_deep_dive.py"]
        }
    }
]

for agent in agents_to_create:
    try:
        print(f"Creating {agent['name']}...")
        res = requests.post(url, json=agent, headers=headers, timeout=5)
        print(f"Status: {res.status_code}")
        if res.status_code == 201:
            print(f"Success! Agent ID: {res.json()['id']}")
        else:
            print("Error Details:", res.text)
    except Exception as e:
        print("Error:", e)
