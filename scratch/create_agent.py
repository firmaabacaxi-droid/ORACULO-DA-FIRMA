import requests
import json

company_id = "33c688bf-426b-435b-8eeb-003a03f2f658"
url = f"http://127.0.0.1:3100/api/companies/{company_id}/agents"

payload = {
    "name": "Agente de Proposta",
    "role": "cfo",
    "description": "Elabora propostas comerciais e atualiza estimativas no Notion.",
    "adapterType": "process",
    "adapterConfig": {
       "command": "python",
       "args": ["scripts/sync_proposal.py"]
    }
}
headers = {
    "Content-Type": "application/json"
}

try:
    print(f"Posting to {url}...")
    res = requests.post(url, json=payload, headers=headers, timeout=5)
    print("Status:", res.status_code)
    try:
        data = res.json()
        print("Response JSON:")
        print(json.dumps(data, indent=2))
    except Exception as e:
        print("Response Text:", res.text[:1000])
except Exception as e:
    print("Error:", e)
