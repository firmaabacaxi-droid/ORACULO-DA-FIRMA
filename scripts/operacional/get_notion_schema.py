import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
PRJ_ID = "30089da3-9902-80d3-a0a4-f186831e99b9"
TAR_ID = "30b89da3-9902-80d9-b562-da97507e443f"

headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}

def get_db(db_id, name):
    url = f"https://api.notion.com/v1/databases/{db_id}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        db_data = response.json()
        print(f"--- {name} Properties ---")
        for prop, details in db_data["properties"].items():
            print(f"{prop}: {details['type']}")
        return db_data
    else:
        print(f"Error fetching {name}: {response.text}")
        return None

get_db(PRJ_ID, "PROJETOS")
get_db(TAR_ID, "TAREFAS")
