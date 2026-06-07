#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Geracao de teste — Sael
Baseado no Roteiro v3 - Todas as Historias do Mundo
"""

import os
from pathlib import Path
from openai import OpenAI
import urllib.request

ANTIGRAVITY_ENV = Path("C:/Users/User/Documents/ANTIGRAVITY/.env")

if ANTIGRAVITY_ENV.exists():
    with open(ANTIGRAVITY_ENV, "r") as f:
        for line in f:
            if line.startswith("OPENAI_API_KEY"):
                key = line.split("=")[1].strip()
                os.environ["OPENAI_API_KEY"] = key
                break

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Criar pasta de saida
OUTPUT_DIR = Path("C:/Users/User/Documents/ORACULO - FIRMA ABACAXI/output/fac2026/teste_sael")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("\n" + "="*70)
print("GERACAO DE TESTE — SAEL")
print("="*70)
print("\nProjeto: Todas as Historias do Mundo")
print("Personagem: Sael")
print("\nGerando imagem baseada no Roteiro v3...")

# Prompt descritivo em portugues, mas enviado em ingles para a API
prompt_pt = """
Personagem Sael em sua apresentacao inicial no espetaculo de circo contemporaneo.
Um homem descalco em pe no palco minimalista, usando calcas largas de linho branco-creme,
camiseta de linho simples aberta no peito, mostrando vulnerabilidade. Uma corda velha e gasta
esta amarrada na cintura como cinto, central na sua composicao visual — sera seu objeto de jornada.
As maos estao abertas e vulneraveis. A iluminacao e azul-indigo suave que varre o corpo dele,
criando atmosfera teatral e dramatica. Fundo minimalista, neutro. A expressao dele carrega peso,
memoria, o inicio de uma jornada interior. Luz cinematografica, teatral, contemplativa.
Fotografia de qualidade profissional, cinematografia moderna, circo contemporaneo, corpo como linguagem.
"""

# Versao em ingles para enviar a API
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

print(f"\nPrompt: {prompt_pt[:150]}...\n")

try:
    print("[1] Gerando imagem via gpt-image-2-2026-04-21...")

    response = client.images.generate(
        model="gpt-image-2-2026-04-21",
        prompt=prompt_en,
        n=1,
        size="1024x1024",
        quality="high"
    )

    print("[OK] Imagem gerada com sucesso!")

    # Tentar extrair URL
    if hasattr(response, 'data') and response.data and len(response.data) > 0:
        image_url = response.data[0].url
        print(f"[OK] URL obtida")

        # Fazer download
        print("[2] Salvando imagem localmente...")
        filename = "teste_Sael_v1.png"
        filepath = OUTPUT_DIR / filename

        urllib.request.urlretrieve(image_url, filepath)
        print(f"[OK] Salvo em: {filepath}")

        print("\n" + "="*70)
        print("[OK] GERACAO CONCLUIDA!")
        print("="*70)
        print(f"\nArquivo: {filepath}")
        print(f"Tamanho: {filepath.stat().st_size / 1024:.1f} KB")

        # Tentar fazer upload para o Drive via rclone
        print("\n[3] Tentando fazer upload para o Drive...")
        try:
            drive_path = "gdrive:/FIRMA ABACAXI/PROJETOS/2026/FAC-2026/teste_Sael_v1.png"
            os.system(f'rclone copyto "{filepath}" "{drive_path}" -v')
            print(f"[OK] Upload completo!")
            print(f"Drive: {drive_path}")
        except Exception as e:
            print(f"[AVISO] Nao conseguiu fazer upload automatico: {e}")
            print(f"Arquivo local: {filepath}")

        print("\n" + "="*70 + "\n")

    else:
        print(f"[ERRO] Resposta invalida: {response}")

except Exception as e:
    import traceback
    print(f"[ERRO] {e}")
    traceback.print_exc()
