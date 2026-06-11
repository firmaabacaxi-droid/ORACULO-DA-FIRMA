import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(url, key)

def get_rls():
    # Use RPC to list policies
    sql = """
    select tablename, policyname, roles, cmd, qual from pg_policies where schemaname = 'public';
    """
    res = supabase.rpc('exec_sql', {'sql': sql}).execute()
    if res.data:
        for p in res.data:
            print(f"Table: {p['tablename']} | Policy: {p['policyname']} | Action: {p['cmd']}")
    else:
        print("No RLS policies found or 'exec_sql' RPC missing.")

if __name__ == "__main__":
    get_rls()
