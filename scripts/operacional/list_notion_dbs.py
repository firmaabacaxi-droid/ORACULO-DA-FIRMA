import os
import requests
from dotenv import load_dotenv

load_dotenv()

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")

headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}

import sys
import io

# Fix for Windows stdout encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def list_databases():
    url = "https://api.notion.com/v1/search"
    payload = {
        "filter": {"value": "database", "property": "object"}
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        results = response.json().get("results", [])
        for db in results:
            title_list = db.get("title", [])
            title = title_list[0].get("plain_text", "Untitled") if title_list else "Untitled"
            print(f"ID: {db['id']} | Title: {title}")
    else:
        print(f"Error listing databases: {response.text}")

list_databases()
