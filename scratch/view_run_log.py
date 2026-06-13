import requests
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

run_id = "971ca0a6-feed-4876-99f5-878e15e0031c"
url = f"http://127.0.0.1:3100/api/heartbeat-runs/{run_id}/log"

try:
    res = requests.get(url, timeout=5)
    if res.status_code == 200:
        data = res.json()
        content = data.get("content", "")
        lines = content.strip().split("\n")
        print(f"Log content contains {len(lines)} lines.")
        for line in lines:
            if not line.strip(): continue
            try:
                log_item = json.loads(line)
                print(log_item.get("chunk", ""), end="")
            except:
                print("Line:", line)
    else:
        print("Error response:", res.status_code, res.text)
except Exception as e:
    print("Error:", e)
