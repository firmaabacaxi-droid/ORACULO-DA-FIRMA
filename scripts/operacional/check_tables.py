import os
from supabase import create_client
from dotenv import load_dotenv

# Load from root .env
load_dotenv(dotenv_path='.env')

url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not url or not key:
    print("Error: Missing credentials in .env")
    exit(1)

supabase = create_client(url, key)

try:
    response = supabase.table('projetos').select('*').limit(1).execute()
    print("SUCCESS: Table 'projetos' exists.")
except Exception as e:
    print(f"FAILURE: Table 'projetos' not found or error: {e}")
