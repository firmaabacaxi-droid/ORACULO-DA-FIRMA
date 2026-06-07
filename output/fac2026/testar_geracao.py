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
print("TESTE DE GERACAO - MODELO gpt-image-2-2026-04-21")
print("="*70 + "\n")

try:
    print("[1] Gerando imagem de teste...")

    response = client.images.generate(
        model="gpt-image-2-2026-04-21",
        prompt="A single white circle on a white background, minimalist",
        n=1,
        size="1024x1024"
    )

    print(f"    [OK] Imagem gerada com sucesso!")
    if response.data and len(response.data) > 0:
        print(f"    URL: {response.data[0].url[:80]}...")
    else:
        print(f"    Response: {response}")

    print("\n" + "="*70)
    print("[OK] API PRONTA PARA GERACAO!")
    print("="*70)
    print("\nVoce pode gerar as 9 imagens agora!")
    print("\nModelo confirmado: gpt-image-2-2026-04-21")
    print("Qualidade: otimizada")
    print("Tempo estimado: 15-20 minutos para 27 imagens (3 variacoes x 9 cenas)")
    print("\n" + "="*70 + "\n")

except Exception as e:
    print(f"[ERRO] {e}")

    if "dall-e" in str(e).lower():
        print("\nTentando modelo alternativo: gpt-image-1.5...")
        try:
            response = client.images.generate(
                model="gpt-image-1.5",
                prompt="A single white circle on a white background, minimalist",
                n=1,
                size="1024x1024"
            )
            print("[OK] gpt-image-1.5 funcionou!")
        except Exception as e2:
            print(f"[ERRO] {e2}")
