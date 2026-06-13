import requests
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

run_id = sys.argv[1] if len(sys.argv) > 1 else "21fdcd6a-afc2-4471-baed-30c393d1bc75"
url = f"http://127.0.0.1:3100/api/heartbeat-runs/{run_id}/log"

try:
    res = requests.get(url, timeout=5)
    if res.status_code == 200:
        data = res.json()
        content = data.get("content", "")
        for line in content.splitlines():
            if not line.strip():
                continue
            try:
                item = json.loads(line)
                chunk = item.get("chunk", "")
                stream = item.get("stream", "stdout")
                if stream == "stderr":
                    print(f"[STDERR] {chunk}", end="")
                else:
                    print(chunk, end="")
            except:
                print("Line:", line)
    else:
        print("Error:", res.status_code, res.text)
except Exception as e:
    print("Error:", e)
