#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Verificador de Creditos OpenAI
Consulta saldo disponvel para geração de imagens DALL-E 2
"""

import os
from pathlib import Path

# Carregar API key do ANTIGRAVITY
ANTIGRAVITY_ENV = Path("C:/Users/User/Documents/ANTIGRAVITY/.env")

if ANTIGRAVITY_ENV.exists():
    with open(ANTIGRAVITY_ENV, "r") as f:
        for line in f:
            if line.startswith("OPENAI_API_KEY"):
                key = line.split("=")[1].strip()
                os.environ["OPENAI_API_KEY"] = key
                break

try:
    import requests

    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        print("[ERRO] OPENAI_API_KEY nao encontrada")
        exit(1)

    print("\n" + "="*70)
    print("VERIFICADOR DE CREDITOS - OPENAI")
    print("="*70)

    # Endpoint de billing da OpenAI
    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    # 1. Verificar informacoes da conta
    print("\n[1] Consultando informacoes da conta...")
    try:
        response = requests.get(
            "https://api.openai.com/v1/organizations",
            headers=headers,
            timeout=10
        )

        if response.status_code == 200:
            org_data = response.json()
            print(f"    [OK] Conta localizada")
            if "data" in org_data and len(org_data["data"]) > 0:
                org = org_data["data"][0]
                print(f"    Organizacao: {org.get('name', 'N/A')}")
                print(f"    ID: {org.get('id', 'N/A')}")
        else:
            print(f"    [AVISO] Status {response.status_code}")
    except Exception as e:
        print(f"    [AVISO] Nao foi possvel consultar: {str(e)}")

    # 2. Tentar consultar saldo de creditos
    print("\n[2] Consultando saldo de creditos...")
    print("    [NOTA] O endpoint de billing requer Pro plan ou pagamento ativado")
    print("    Tentando consultar via endpoint experimental...")

    try:
        response = requests.get(
            "https://api.openai.com/billing/v1/usage",
            headers=headers,
            timeout=10,
            params={"date": "2026-06-01"}
        )

        if response.status_code == 200:
            usage_data = response.json()
            print(f"    [OK] Dados de uso obtidos")
            print(f"    Uso em junho: ${usage_data.get('total_usage', 0) / 100:.2f}")
        elif response.status_code == 403:
            print(f"    [AVISO] Acesso negado - sua conta nao tem acesso a billing API")
            print(f"    Isso eh normal em contas Free/Trial")
        else:
            print(f"    [AVISO] Status {response.status_code}")
    except Exception as e:
        print(f"    [ERRO] {str(e)}")

    # 3. Teste rapido de geracao (melhor forma de validar creditos)
    print("\n[3] Teste rapido de geracao DALL-E 2...")
    print("    Gerando 1 imagem pequena para validar acesso...")

    from openai import OpenAI
    client = OpenAI(api_key=api_key)

    try:
        response = client.images.generate(
            model="dall-e-2",
            prompt="test",
            n=1,
            size="256x256"
        )
        print(f"    [OK] Imagem gerada com sucesso!")
        print(f"    [OK] VOCE TEM CREDITOS DISPONVEIS!")

        print("\n" + "="*70)
        print("[OK] TUDO PRONTO PARA GERAR AS 9 IMAGENS!")
        print("="*70)
        print("\nProximos passos:")
        print("  1. Analisar as 6 referencias visuais (vdeos YouTube + Pinterest)")
        print("  2. Extrair as 3 decisoes visuais")
        print("  3. Rodar script gerar_imagens.py para criar 27 imagens")
        print("  4. Voce faz curadoria (seleciona 1 por cena)")
        print("  5. Inserir no Notion")
        print("\n" + "="*70 + "\n")

    except Exception as e:
        error_msg = str(e)
        print(f"    [ERRO] {error_msg}")

        if "insufficient_quota" in error_msg or "credit" in error_msg.lower():
            print("\n" + "="*70)
            print("[AVISO] SEM CREDITOS DISPONVEIS!")
            print("="*70)
            print("\nPara adicionar creditos na sua conta OpenAI:")
            print("\n1. Acesse: https://platform.openai.com/account/billing/overview")
            print("2. Clique em 'Add to account' (Adicionar credito)")
            print("3. Escolha o valor desejado:")
            print("   - Minimo: $5 USD")
            print("   - Recomendado: $20-50 USD")
            print("4. Preencha dados de pagamento")
            print("5. Confirme a compra")
            print("\n[INFO] Custo estimado para 27 imagens DALL-E 2:")
            print("  - DALL-E 2 (1024x1024): ~$0.020 por imagem")
            print("  - 27 imagens = ~$0.54 USD (muito barato!)")
            print("\n" + "="*70 + "\n")
            exit(1)
        else:
            print("\n" + "="*70)
            print("[ERRO] Problema ao gerar imagem")
            print("="*70)
            print(f"\nErro: {error_msg}")
            print("\nPossveis causas:")
            print("  * Modelo DALL-E 2 nao disponvel nessa chave")
            print("  * Problema de conectividade")
            print("  * API key invalida")
            print("\n" + "="*70 + "\n")
            exit(1)

except ImportError as e:
    print(f"[ERRO] Biblioteca necessaria nao instalada: {e}")
    print("\nInstalando dependencias...")
    os.system("pip install requests --quiet")
    print("Reexecute o script")
    exit(1)
