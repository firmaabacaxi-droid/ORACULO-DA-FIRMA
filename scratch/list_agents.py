import requests
import json

company_id = "33c688bf-426b-435b-8eeb-003a03f2f658"
urls = [
    f"http://127.0.0.1:3100/api/companies/{company_id}/agents",
    f"http://127.0.0.1:3100/api/companies/{company_id}/goals",
    f"http://127.0.0.1:3100/api/companies/{company_id}/issues",
]

for url in urls:
    try:
        res = requests.get(url, timeout=2)
        print(f"URL: {url} | Status: {res.status_code}")
        if res.status_code == 200:
            print(json.dumps(res.json(), indent=2))
    except Exception as e:
        print(f"URL: {url} | Error: {e}")
