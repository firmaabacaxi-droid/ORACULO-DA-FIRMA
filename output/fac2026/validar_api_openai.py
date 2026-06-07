#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Validador de API OpenAI para FAC 2026
Testa se a chave está ativa e com saldo disponível
"""

import os
import sys
from pathlib import Path

# Tentar carregar da pasta ANTIGRAVITY
ANTIGRAVITY_ENV = Path("C:/Users/User/Documents/ANTIGRAVITY/.env")

if ANTIGRAVITY_ENV.exists():
    print(f"[OK] Encontrado: {ANTIGRAVITY_ENV}")
    with open(ANTIGRAVITY_ENV, "r") as f:
        for line in f:
            if line.startswith("OPENAI_API_KEY"):
                key = line.split("=")[1].strip()
                os.environ["OPENAI_API_KEY"] = key
                print(f"[OK] API Key carregada do ANTIGRAVITY/.env")
                break
else:
    print(f"[AVISO] {ANTIGRAVITY_ENV} nao encontrado")
    print("Tentando variavel de ambiente...")

try:
    from openai import OpenAI

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    print("\n" + "="*70)
    print("TESTANDO CONEXAO COM OPENAI API")
    print("="*70)

    # Teste 1: Listar modelos (operacao leve)
    print("\n[1] Listando modelos disponveis...")
    models = client.models.list()
    print(f"    [OK] Conexao estabelecida!")
    print(f"    Total de modelos: {len(models.data)}")

    # Verificar se DALL-E 3 esta disponivel
    dalle3_available = any("dall-e-3" in model.id for model in models.data)
    print(f"    DALL-E 3 disponivel: {'[OK] SIM' if dalle3_available else '[NAO] NAO'}")

    # Teste 2: Gerar uma imagem de teste (pequena/rapida)
    print("\n[2] Gerando imagem de teste (1 pequena para validar saldo)...")
    response = client.images.generate(
        model="dall-e-3",
        prompt="A simple white circle on a white background",
        n=1,
        size="1024x1024",
        quality="standard"
    )
    print(f"    [OK] Imagem gerada com sucesso!")
    print(f"    URL: {response.data[0].url[:60]}...")

    print("\n" + "="*70)
    print("[OK] API VALIDADA COM SUCESSO!")
    print("="*70)
    print("\nStatus:")
    print("  * API Key: [OK] Valida e ativa")
    print("  * Saldo: [OK] Credito disponivel")
    print("  * DALL-E 3: [OK] Acessivel")
    print("\nVoce esta pronto para gerar as 9 imagens!")
    print("="*70 + "\n")

except Exception as e:
    print("\n" + "="*70)
    print("[ERRO] ERRO NA VALIDACAO")
    print("="*70)
    print(f"Erro: {str(e)}")
    print("\nPossveis causas:")
    print("  * API Key invalida ou expirada")
    print("  * Sem saldo/credito na conta")
    print("  * Problema de conectividade")
    print("="*70 + "\n")
    sys.exit(1)
