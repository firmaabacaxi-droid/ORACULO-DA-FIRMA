import requests
import json
import sys
import io

# Fix encoding for Windows console
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

company_id = "33c688bf-426b-435b-8eeb-003a03f2f658"
url = f"http://127.0.0.1:3100/api/companies/{company_id}/heartbeat-runs?limit=5"

try:
    print(f"GETing from {url}...")
    res = requests.get(url, timeout=5)
    print("Status:", res.status_code)
    if res.status_code == 200:
        runs = res.json()
        print(f"Found {len(runs)} runs.")
        for r in runs:
            run_id = r.get("id")
            agent_id = r.get("agentId")
            status = r.get("status")
            error_code = r.get("errorCode")
            print(f"Run: {run_id} | Agent: {agent_id} | Status: {status} | Error: {error_code}")
            
            # Fetch log for this run
            log_url = f"http://127.0.0.1:3100/api/heartbeat-runs/{run_id}/log"
            log_res = requests.get(log_url, timeout=2)
            if log_res.status_code == 200:
                print("Logs:")
                # Safe print with fallback for chars
                print(log_res.text[:1200])
            print("-" * 50)
    else:
        print("Response:", res.text)
except Exception as e:
    print("Error:", e)
