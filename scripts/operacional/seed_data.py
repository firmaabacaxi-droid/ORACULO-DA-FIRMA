import os
from supabase import create_client
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv(dotenv_path='.env')

url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase = create_client(url, key)

import sys
import io

# Fix encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def seed():
    print("Iniciando injecao de dados de exemplo...")
    
    # 1. CLIENTES
    clientes_data = [
        {"nome": "Café Horizonte", "empresa": "Horizonte Cafés Especiais", "email": "contato@cafehorizonte.com", "tags": ["Fidelizado", "Premium"]},
        {"nome": "Porto Seguro", "empresa": "Porto Seguro S.A.", "email": "marketing@portoseguro.com.br", "tags": ["Corporativo"]},
        {"nome": "Natura", "empresa": "Natura Cosméticos", "email": "projetos@natura.net", "tags": ["Sustentabilidade"]}
    ]
    clientes = supabase.table("clientes").insert(clientes_data).execute().data
    
    cafe_id = clientes[0]['id']
    porto_id = clientes[1]['id']
    natura_id = clientes[2]['id']

    # 2. PROJETOS
    projetos_data = [
        {
            "titulo": "Renovação de Identidade Visual — Café Horizonte",
            "cliente_id": cafe_id,
            "status": "Trabalhando",
            "valor_contrato": 15000,
            "data_inicio": (datetime.now() - timedelta(days=10)).strftime('%Y-%m-%d'),
            "data_entrega": (datetime.now() + timedelta(days=20)).strftime('%Y-%m-%d'),
            "briefing": "Modernizar a marca sem perder a essência do café artesanal."
        },
        {
            "titulo": "Campanha Vídeo Institucional — Porto Seguro",
            "cliente_id": porto_id,
            "status": "Trabalhando",
            "valor_contrato": 45000,
            "data_inicio": (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d'),
            "data_entrega": (datetime.now() + timedelta(days=45)).strftime('%Y-%m-%d'),
            "briefing": "Focar na segurança e agilidade do atendimento 24h."
        },
        {
            "titulo": "Social Media Mensal — Natura",
            "cliente_id": natura_id,
            "status": "Trabalhando",
            "valor_contrato": 8000,
            "data_inicio": datetime.now().strftime('%Y-%m-01'),
            "data_entrega": datetime.now().strftime('%Y-%m-30'),
            "briefing": "Posts diários focados na linha Ekos."
        },
        {
            "titulo": "Nova Sede — BTG Pactual (Prospecção)",
            "status": "Prospectando",
            "valor_contrato": 120000,
            "briefing": "Possível projeto de sinalização e vídeo wall."
        }
    ]
    projetos = supabase.table("projetos").insert(projetos_data).execute().data
    
    prj_cafe_id = projetos[0]['id']
    prj_porto_id = projetos[1]['id']

    # 3. TAREFAS
    tarefas_data = [
        {"titulo": "Finalizar Logotipo", "projeto_id": prj_cafe_id, "prioridade": "Urgente", "status": "Trabalhando", "responsavel": "Designer Sênior"},
        {"titulo": "Roteiro do Vídeo", "projeto_id": prj_porto_id, "prioridade": "Alta", "status": "Pendente", "responsavel": "Roteirista"},
        {"titulo": "Briefing de Cores Natura", "projeto_id": projetos[2]['id'], "prioridade": "Media", "status": "Pendente", "responsavel": "Atendimento"}
    ]
    supabase.table("tarefas").insert(tarefas_data).execute()

    # 4. FINANCEIRO (Para rodar a View do Dashboard)
    financeiro_data = [
        {"projeto_id": prj_cafe_id, "descricao": "Sinal 50%", "valor": 7500, "tipo": "Entrada", "status_pagamento": "Pago", "data_pagamento": datetime.now().strftime('%Y-%m-%d')},
        {"projeto_id": prj_porto_id, "descricao": "Sinal 30%", "valor": 13500, "tipo": "Entrada", "status_pagamento": "Pago", "data_pagamento": datetime.now().strftime('%Y-%m-%d')},
        {"projeto_id": prj_porto_id, "descricao": "Entrega Final", "valor": 7500, "tipo": "Entrada", "status_pagamento": "Pendente", "data_vencimento": (datetime.now() + timedelta(days=20)).strftime('%Y-%m-%d')}
    ]
    supabase.table("financeiro_projeto").insert(financeiro_data).execute()

    print("✅ Dados de exemplo injetados com sucesso!")

if __name__ == "__main__":
    seed()
