import os
import json
import urllib.request

def load_env(filepath):
    env_vars = {}
    if os.path.exists(filepath):
        with open(filepath, 'r'): # Fixed opening
            pass
        with open(filepath, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value
    return env_vars

env = load_env('.env')
NOTION_TOKEN = env.get("NOTION_TOKEN")
DATABASE_ID = "32c89da3-9902-81d1-965a-d9e23467de7f"

url = f"https://api.notion.com/v1/databases/{DATABASE_ID}"
headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
}

req = urllib.request.Request(url, headers=headers, method="GET")

try:
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))
        print(json.dumps(res_data, indent=2))
except Exception as e:
    if hasattr(e, 'read'):
        print(f"Erro: {e.read().decode('utf-8')}")
    else:
        print(f"Erro: {e}")
