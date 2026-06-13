import requests
import json

company_id = "33c688bf-426b-435b-8eeb-003a03f2f658"
agent_id = "ce650189-eb91-4d11-990a-ded6ea4ec358"
url = f"http://127.0.0.1:3100/api/companies/{company_id}/issues"

payload = {
    "title": "Teste Oráculo - Ciclo 1",
    "description": "Ciclo 1: Conexão e leitura Notion/Cérebro",
    "assigneeAgentId": agent_id,
    "status": "todo"
}
headers = {
    "Content-Type": "application/json"
}

try:
    print(f"POSTing issue for Ciclo 1...")
    res = requests.post(url, json=payload, headers=headers, timeout=5)
    print("Status:", res.status_code)
    if res.status_code == 201:
        print("Success! Created issue:", res.json().get("identifier"))
    else:
        print("Error:", res.text)
except Exception as e:
    print("Error:", e)
