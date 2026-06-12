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

PROPOSAL_PAGE_ID = "3738a525-91f3-813f-b4c8-e3186f345b8f"
BUDGET_DB_ID = "0652762f-bac3-4a0b-ad3c-2b7223132a2b"

query_payload = {
    "filter": {
        "property": "Proposta",
        "relation": {
            "contains": PROPOSAL_PAGE_ID
        }
    }
}
req = urllib.request.Request(f"https://api.notion.com/v1/databases/{BUDGET_DB_ID}/query", data=json.dumps(query_payload).encode("utf-8"), headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode("utf-8"))
        results = res.get("results", [])
        total_sum = 0
        print("Notion Items:")
        for page in results:
            props = page["properties"]
            title_list = props["Item"]["title"]
            title = title_list[0]["text"]["content"] if title_list else "Sem Título"
            total = props.get("Total", {}).get("number", 0)
            print(f"  {title}: R$ {total:.2f}")
            total_sum += total
        print(f"TOTAL SUM OF ITEMS: R$ {total_sum:.2f}")
except Exception as e:
    print("Error:", e)
