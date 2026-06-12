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
                    env_vars[key] = value.strip().strip('"').strip("'")
    return env_vars

env = load_env(os.path.expanduser('~/.secrets/antigravity.env'))
NOTION_TOKEN = env.get("NOTION_TOKEN")

headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}

req = urllib.request.Request("https://api.notion.com/v1/pages/3738a525-91f3-813f-b4c8-e3186f345b8f", headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode("utf-8"))
        props = res["properties"]
        print("Valor Total:", props["Valor Total"]["number"])
        print("Versão:", props["Versão"]["number"])
        print("Status:", props["Status"]["status"]["name"])
except Exception as e:
    print("Error:", e)
