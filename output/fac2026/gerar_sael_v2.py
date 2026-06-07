#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Geracao de teste — Sael (v2)
Trata diferentes formatos de resposta
"""

import os
from pathlib import Path
from openai import OpenAI
import base64
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

OUTPUT_DIR = Path("C:/Users/User/Documents/ORACULO - FIRMA ABACAXI/output/fac2026/teste_sael")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("\n" + "="*70)
print("GERACAO DE TESTE — SAEL (v2)")
print("="*70)

prompt_en = """
A barefoot male circus performer standing alone on a minimal theater stage.
He wears wide linen off-white trousers and a simple open linen shirt exposing his vulnerable chest.
A weathered, worn rope is tied around his waist as a belt — the central visual object of his journey.
His hands are open and vulnerable. Soft blue-indigo theatrical light washes over his entire body,
creating dramatic cinematic atmosphere. Neutral, minimalist background. His expression carries weight,
memory, and the beginning of an inner journey. Eyes showing depth and contemplation.
Professional theatrical lighting, contemporary circus aesthetic, body as language.
Cinematic photography, modern dance theater, intimate and powerful composition.
"""

try:
    print("\n[1] Gerando imagem...")

    response = client.images.generate(
        model="gpt-image-2-2026-04-21",
        prompt=prompt_en,
        n=1,
        size="1024x1024",
        quality="high"
    )

    print("[OK] Resposta recebida")
    print(f"     Tipo: {type(response)}")

    # Debug: imprimir estrutura da resposta
    if hasattr(response, 'model_dump'):
        dump = response.model_dump()
        print(f"     Keys: {list(dump.keys())}")

    # Tentar extrair dados
    if hasattr(response, 'data') and response.data:
        print(f"[OK] Data disponivel")
        data_item = response.data[0]

        print(f"     Tipo data[0]: {type(data_item)}")

        # Tentar diferentes opcoes
        image_data = None

        # Opcao 1: URL
        if hasattr(data_item, 'url') and data_item.url:
            print(f"[OK] URL disponivel")
            import urllib.request
            urllib.request.urlretrieve(data_item.url, OUTPUT_DIR / "teste_Sael_v2.png")
            print(f"[OK] Salvo: teste_Sael_v2.png")

        # Opcao 2: Base64
        elif hasattr(data_item, 'b64_json') and data_item.b64_json:
            print(f"[OK] Base64 disponivel")
            image_bytes = base64.b64decode(data_item.b64_json)
            with open(OUTPUT_DIR / "teste_Sael_v2.png", "wb") as f:
                f.write(image_bytes)
            print(f"[OK] Salvo: teste_Sael_v2.png")

        # Opcao 3: Inspecionar o objeto
        else:
            print(f"[DEBUG] Atributos disponiveis:")
            print(f"        {dir(data_item)}")

            if hasattr(data_item, 'model_dump'):
                dump = data_item.model_dump()
                print(f"[DEBUG] Model dump: {json.dumps(dump, indent=2)[:500]}")

            # Tentar acessar como dict
            try:
                url = data_item.get('url')
                if url:
                    print(f"[OK] URL via dict: {url}")
            except:
                pass

    print("\n" + "="*70)
    print("[OK] TESTE CONCLUIDO!")
    print("="*70 + "\n")

except Exception as e:
    import traceback
    print(f"\n[ERRO] {e}")
    traceback.print_exc()
