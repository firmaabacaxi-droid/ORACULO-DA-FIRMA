import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase = create_client(url, key)

try:
    response = supabase.table('view_dashboard_kpis').select('*').execute()
    print("KPIs do Dashboard:")
    print(response.data)
except Exception as e:
    print(f"Erro ao buscar KPIs: {e}")
