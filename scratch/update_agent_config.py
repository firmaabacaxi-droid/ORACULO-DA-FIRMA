import requests
import json

company_id = "33c688bf-426b-435b-8eeb-003a03f2f658"
agent_id = "ce650189-eb91-4d11-990a-ded6ea4ec358"
url = f"http://127.0.0.1:3100/api/agents/{agent_id}"

payload = {
    "adapterConfig": {
       "command": "python",
       "args": ["C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI\\scripts\\paperclip_proposal_agent.py"]
    }
}
headers = {"Content-Type": "application/json"}

try:
    print(f"PATCHing agent {agent_id} to use absolute path...")
    res = requests.patch(url, json=payload, headers=headers, timeout=5)
    print("Status:", res.status_code)
    if res.status_code == 200:
        print("SUCCESS! Updated args.")
        print(json.dumps(res.json().get("adapterConfig", {}), indent=2))
    else:
        print("Response:", res.text)
except Exception as e:
    print("Error:", e)
