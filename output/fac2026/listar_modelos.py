#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from pathlib import Path
from openai import OpenAI

ANTIGRAVITY_ENV = Path("C:/Users/User/Documents/ANTIGRAVITY/.env")

if ANTIGRAVITY_ENV.exists():
    with open(ANTIGRAVITY_ENV, "r") as f:
        for line in f:
            if line.startswith("OPENAI_API_KEY"):
                key = line.split("=")[1].strip()
                os.environ["OPENAI_API_KEY"] = key
                break

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

print("\n" + "="*70)
print("MODELOS DISPONIVEIS NESSA CHAVE API")
print("="*70 + "\n")

try:
    models = client.models.list()

    # Filtrar modelos de imagem
    image_models = [m.id for m in models.data if 'dall' in m.id.lower() or 'image' in m.id.lower()]
    text_models = [m.id for m in models.data if 'gpt' in m.id.lower()]

    print(f"Total de modelos: {len(models.data)}\n")

    print("MODELOS DE IMAGEM:")
    if image_models:
        for model in image_models:
            print(f"  - {model}")
    else:
        print("  [NENHUM] Nenhum modelo de imagem disponvel")

    print(f"\nMODELOS DE TEXTO (primeiros 10):")
    for model in text_models[:10]:
        print(f"  - {model}")

    print("\n" + "="*70)

except Exception as e:
    print(f"ERRO: {e}")
