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
                    env_vars[key] = value.strip('"').strip("'")
    return env_vars

import sys

env = load_env('.env')
NOTION_TOKEN = env.get("NOTION_TOKEN")

# Allow passing DB IDs as arguments, else use defaults
db_ids = sys.argv[1:] if len(sys.argv) > 1 else ["30b89da3-9902-80d9-b562-da97507e443f", "30089da3-9902-80d3-a0a4-f186831e99b9", "31389da3-9902-81ed-8b78-d9050def09a5"]

for db_id in db_ids:
    print(f"\n--- Database: {db_id} ---")
    url = f"https://api.notion.com/v1/databases/{db_id}"
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28",
    }
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            print(f"Name: {res_data.get('title', [{}])[0].get('plain_text', 'Unknown')}")
            props = res_data.get("properties", {})
            for name, details in props.items():
                print(f"Property: {name} | Type: {details['type']}")
                if details['type'] == 'select' and 'select' in details:
                    options = [o['name'] for o in details['select']['options']]
                    print(f"  Options: {options}")
                elif details['type'] == 'status' and 'status' in details:
                    options = [o['name'] for o in details['status']['options']]
                    print(f"  Options: {options}")
                elif details['type'] == 'multi_select' and 'multi_select' in details:
                    options = [o['name'] for o in details['multi_select']['options']]
                    print(f"  Options: {options}")
    except Exception as e:
        print(f"Erro fetching {db_id}: {e}")
