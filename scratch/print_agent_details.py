import requests
import json

company_id = "33c688bf-426b-435b-8eeb-003a03f2f658"
url = f"http://127.0.0.1:3100/api/companies/{company_id}/agents"

try:
    res = requests.get(url, timeout=5)
    if res.status_code == 200:
        agents = res.json()
        print(f"Total agents registered: {len(agents)}")
        for a in agents:
            print("-" * 50)
            print(f"Name: {a.get('name')}")
            print(f"ID: {a.get('id')}")
            print(f"Config: {json.dumps(a.get('adapterConfig'), indent=2)}")
    else:
        print("Error:", res.status_code, res.text)
except Exception as e:
    print("Error:", e)
