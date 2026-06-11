import os
import requests
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

# Credentials
NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

NOTION_HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}

PRJ_DB_ID = "32c89da3-9902-81df-8a70-d6c7ac66dc2b"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_notion_projects():
    url = f"https://api.notion.com/v1/databases/{PRJ_DB_ID}/query"
    response = requests.post(url, headers=NOTION_HEADERS)
    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        print(f"Error fetching from Notion: {response.text}")
        return []

def migrate():
    projects = get_notion_projects()
    print(f"Found {len(projects)} projects in Notion.")
    
    for pg in projects:
        props = pg["properties"]
        
        # Extract title
        title_list = props.get("PROJETO", {}).get("title", [])
        title = title_list[0].get("plain_text", "Untitled") if title_list else "Untitled"
        
        # Extract status
        status_data = props.get("STATUS", {}).get("select")
        status = status_data.get("name") if status_data else "Não Iniciado"
        
        # Extract briefing
        briefing_list = props.get("BRIEFING DO PROJETO", {}).get("rich_text", [])
        briefing = "".join([t.get("plain_text", "") for t in briefing_list])
        
        # Extract dates
        data_inicio = props.get("INICIO DO PROJETO", {}).get("date")
        data_entrega = props.get("DATA DE ENTREGA", {}).get("date")
        
        # Extract URLs
        link_drive = props.get("LINK DO DRIVE", {}).get("url")
        link_contrato = props.get("LINK DO CONTRATO", {}).get("url")
        
        # Prepare Supabase record
        record = {
            "titulo": title,
            "status": status,
            "briefing": briefing,
            "data_inicio": data_inicio.get("start") if data_inicio else None,
            "data_entrega": data_entrega.get("start") if data_entrega else None,
            "link_drive": link_drive,
            "link_contrato": link_contrato,
            "notion_id": pg["id"]
        }
        
        try:
            res = supabase.table("projetos").upsert(record, on_conflict="notion_id").execute()
            print(f"Migrated: {title}")
        except Exception as e:
            print(f"Error migrating {title}: {e}")

if __name__ == "__main__":
    migrate()
