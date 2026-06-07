#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from pathlib import Path
from openai import OpenAI
import json

ANTIGRAVITY_ENV = Path("C:/Users/User/Documents/ANTIGRAVITY/.env")

if ANTIGRAVITY_ENV.exists():
    with open(ANTIGRAVITY_ENV, "r") as f:
        for line in f:
            if line.startswith("OPENAI_API_KEY"):
                key = line.split("=")[1].strip()
                os.environ["OPENAI_API_KEY"] = key
                break

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

print("\nTESTANDO GERACAO...\n")

try:
    response = client.images.generate(
        model="gpt-image-2-2026-04-21",
        prompt="A single white circle on a white background, minimalist",
        n=1,
        size="1024x1024"
    )

    print("[OK] Resposta recebida!")
    print(f"Tipo: {type(response)}")
    print(f"Dir: {dir(response)}")

    if hasattr(response, 'data'):
        print(f"Data: {response.data}")
        print(f"Data type: {type(response.data)}")

    # Tentar diferentes formas de acessar
    try:
        print(f"\nURL: {response.data[0].url}")
    except:
        try:
            print(f"URL (dict): {response['data'][0]['url']}")
        except:
            print(f"Resposta completa: {response}")

    print("\n[OK] GERACAO FUNCIONANDO!")

except Exception as e:
    import traceback
    print(f"[ERRO] {e}")
    traceback.print_exc()
