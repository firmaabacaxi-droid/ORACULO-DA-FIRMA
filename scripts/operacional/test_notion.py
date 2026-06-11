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

url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}

data = json.dumps({"page_size": 10}).encode("utf-8")
req = urllib.request.Request(url, data=data, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))
        results = res_data.get("results", [])
        if not results:
            print("Nenhum projeto encontrado no banco de dados.")
        else:
            print(f"Encontrei {len(results)} páginas. Aqui estão os detalhes:")
            for page in results:
                props = page.get("properties", {})
                row = []
                for name, p in props.items():
                    val = ""
                    if p['type'] == 'title':
                        val = "".join([t['text']['content'] for t in p['title']])
                    elif p['type'] == 'rich_text':
                        val = "".join([t['text']['content'] for t in p['rich_text']])
                    elif p['type'] == 'select' and p['select']:
                        val = p['select']['name']
                    
                    if val:
                        row.append(f"{name}: {val}")
                print(" | ".join(row))
except Exception as e:
    print(f"Erro: {e}")
