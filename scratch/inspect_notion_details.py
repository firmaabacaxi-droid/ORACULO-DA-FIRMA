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

def get_page_details(page_id, name):
    req = urllib.request.Request(f"https://api.notion.com/v1/pages/{page_id}", headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode("utf-8"))
            print(f"\n=== {name} PROPERTIES ===")
            for prop_name, prop_data in res["properties"].items():
                ptype = prop_data["type"]
                val = None
                if ptype == "number":
                    val = prop_data["number"]
                elif ptype == "title":
                    val = prop_data["title"][0]["text"]["content"] if prop_data["title"] else ""
                elif ptype == "relation":
                    val = [r["id"] for r in prop_data["relation"]]
                elif ptype == "select":
                    val = prop_data["select"]["name"] if prop_data["select"] else None
                elif ptype == "status":
                    val = prop_data["status"]["name"] if prop_data["status"] else None
                elif ptype == "rich_text":
                    val = prop_data["rich_text"][0]["text"]["content"] if prop_data["rich_text"] else ""
                else:
                    val = f"Type: {ptype}"
                print(f"  {prop_name}: {val}")
    except Exception as e:
        print(f"Error fetching {name}: {e}")

get_page_details("3738a525-91f3-813f-b4c8-e3186f345b8f", "PROPOSAL (PRP-5)")
get_page_details("3618a525-91f3-804d-89f0-e9928c95c41b", "PROJECT (PRJ-4)")
