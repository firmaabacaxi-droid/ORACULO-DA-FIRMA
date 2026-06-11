import os
import requests
import sys
import io
from dotenv import load_dotenv

# Fix encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

load_dotenv()

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}

# New IDs from Search
DATABASES = {
    "PROJETOS": "32e8a525-91f3-80fc-bb12-c7c6eec13f9c",
    "FINANCEIRO": "32e8a525-91f3-81b3-8ec9-e26e3c046e7f",
    "CRM": "32e8a525-91f3-80c7-ad16-c4816e9d297d",
    "TAREFAS": "32e8a525-91f3-8093-98b2-cb651991141a"
}

def check():
    for name, db_id in DATABASES.items():
        url = f"https://api.notion.com/v1/databases/{db_id}/query"
        res = requests.post(url, headers=headers)
        if res.status_code == 200:
            count = len(res.json().get("results", []))
            print(f"[OK] {name}: {count} itens")
        else:
            print(f"[ERROR] {name}: Erro {res.status_code}")

if __name__ == "__main__":
    check()
