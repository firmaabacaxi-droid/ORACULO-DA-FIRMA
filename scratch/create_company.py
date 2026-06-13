import requests
import json

url = "http://127.0.0.1:3100/api/companies"
payload = {
    "name": "Firma Abacaxi",
    "domain": "firmaabacaxi.com"
}
headers = {
    "Content-Type": "application/json"
}

try:
    print("Posting to /api/companies...")
    res = requests.post(url, json=payload, headers=headers, timeout=5)
    print("Status:", res.status_code)
    try:
        data = res.json()
        print("Response JSON:")
        print(json.dumps(data, indent=2))
    except Exception as e:
        print("Response Text:", res.text[:500])
except Exception as e:
    print("Error:", e)
