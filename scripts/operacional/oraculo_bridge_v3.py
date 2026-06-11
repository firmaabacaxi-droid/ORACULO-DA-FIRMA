import time
import os
import requests
import argparse
from datetime import datetime

# Supabase Config (from .env)
SUPABASE_URL = "https://mzvwnvxwpsncybbbukae.supabase.co"
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dndudnh3cHNuY3liYmJ1a2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjAxMDgsImV4cCI6MjA4OTgzNjEwOH0.HTyplZqcEMU73rYM7IBNnftJG_kBheL6ZQRFS11BSWA")

def log_status(status_text, current_task=None, progress=0):
    url = f"{SUPABASE_URL}/rest/v1/oraculo_session_status"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    payload = {
        "status_text": status_text,
        "current_task": current_task,
        "progress_percent": progress,
        "updated_at": datetime.now().isoformat()
    }
    # Using UPSERT to keep only one record per session_id (default)
    # Actually, I'll just post a new one and let the dashboard pick the latest.
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code < 300:
        print(f"OK: Status updated in Supabase.")
    else:
        print(f"ERROR: Supabase status update failed: {response.text}")

def check_messages(last_msg_id=None):
    url = f"{SUPABASE_URL}/rest/v1/oraculo_messages?sender=eq.user&order=created_at.desc&limit=1"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        msgs = response.json()
        if msgs:
            msg = msgs[0]
            if msg['id'] != last_msg_id:
                print(f"\n--- NEW MESSAGE FROM USER ---")
                print(f"[{msg['created_at']}] {msg['content']}")
                print(f"----------------------------\n")
                return msg['id']
    return last_msg_id

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--status", type=str)
    parser.add_argument("--task", type=str)
    parser.add_argument("--progress", type=int, default=0)
    parser.add_argument("--listen", action="store_true")
    args = parser.parse_args()

    if args.status:
        log_status(args.status, args.task, args.progress)
    
    if args.listen:
        print("BRIDGE: Listening for new messages from Mobile...")
        last_id = None
        while True:
            last_id = check_messages(last_id)
            time.sleep(5)
