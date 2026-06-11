import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase = create_client(url, key)

try:
    # Try to select the notion_id column
    response = supabase.table('projetos').select('notion_id').limit(1).execute()
    print("SUCCESS: Column 'notion_id' exists in 'projetos'.")
except Exception as e:
    print(f"FAILURE: {e}")
