import requests
import json

endpoints = [
    "/api/v1/get-session",
    "/api/v1/session",
    "/api/v1/companies",
    "/api/v1/users/me",
    "/api/companies",
    "/api/session",
    "/api/v1/agents"
]

for ep in endpoints:
    url = f"http://127.0.0.1:3100{ep}"
    try:
        res = requests.get(url, timeout=2)
        print(f"Endpoint: {ep} | Status: {res.status_code}")
        if res.status_code == 200:
            try:
                print(json.dumps(res.json(), indent=2)[:500])
            except:
                print("Text:", res.text[:100])
    except Exception as e:
        print(f"Endpoint: {ep} | Error: {e}")
