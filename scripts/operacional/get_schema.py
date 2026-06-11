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

url = f"https://api.notion.com/v1/databases/{DATABASE_ID}"
headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
}

req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))
        props = res_data.get("properties", {})
        for name, details in props.items():
            print(f"Property: {name} (Type: {details['type']})")
            if details['type'] == 'select':
                options = [o['name'] for o in details['select']['options']]
                print(f"  Options: {options}")
except Exception as e:
    print(f"Erro: {e}")
