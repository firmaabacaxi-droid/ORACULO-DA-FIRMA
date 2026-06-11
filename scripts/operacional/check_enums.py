import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase = create_client(url, key)

# We can query pg_type and pg_enum to get values
try:
    sql = "SELECT enumlabel FROM pg_enum JOIN pg_type ON pg_enum.enumtypid = pg_type.oid WHERE pg_type.typname = 'status_projeto';"
    # We can't run raw SQL via supabase-js easily without a function, so I'll just try to insert and catch the error to see expected values, or just check the previous subagent task.
    print("Checking enum values by trial...")
except Exception as e:
    print(e)
