import argparse
import os
import requests
from datetime import datetime

# Notion Configuration (Uses existing API Key from workspace)
NOTION_TOKEN = os.getenv("NOTION_TOKEN")
PAGE_ID = "32d8a525-91f3-81a1-98c3-d2ba667559c9"

def update_status(status_text):
    url = f"https://api.notion.com/v1/blocks/{PAGE_ID}/children"
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    }
    
    # We want to keep ONLY the latest status to avoid bloat
    # Actually, it's better to show history. I'll append a bullet point.
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    payload = {
        "children": [
            {
                "object": "block",
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {"type": "text", "text": {"content": f"[{timestamp}] "}, "annotations": {"bold": True}},
                        {"type": "text", "text": {"content": status_text}}
                    ]
                }
            }
        ]
    }
    
    response = requests.patch(url, headers=headers, json=payload)
    if response.status_code == 200:
        print(f"OK: Oraculo Status Updated: {status_text}")
    else:
        print(f"ERROR updating status: {response.text}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Oráculo Remote Bridge Status Update")
    parser.add_argument("--status", type=str, required=True, help="Status message to push to the bridge")
    args = parser.parse_args()
    update_status(args.status)
