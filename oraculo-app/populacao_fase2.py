# populacao_fase2.py
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import time
import uuid

load_dotenv()
url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(url, key)

def wipe_all_data():
    print("Varrimento de Dados Antigos iniciado...")
    # Wipe projects (and cascades)
    try:
        supabase.table("projetos").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
        supabase.table("clientes").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
        supabase.table("equipamentos").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
        print("Dados antigos apagados!")
    except Exception as e:
        print(f"Aviso ao apagar: {e}")

def seed_data():
    print("Iniciando injeção de 5 Projetos Completos com Orçamentos (Budget Planner)...")
    
    # 1. CLIENTES
    clientes_data = [
        {"nome": "Café Horizonte", "empresa": "Café Horizonte Ltda", "email": "contato@cafehorizonte.com", "telefone": "11999999999"},
        {"nome": "TechStart", "empresa": "TechStart Solutions", "email": "oi@techstart.io", "telefone": "11888888888"},
        {"nome": "Banco BTG", "empresa": "BTG Pactual", "email": "mkt@btg.com", "telefone": "11777777777"},
        {"nome": "Natura Cosméticos", "empresa": "Natura", "email": "midia@natura.com", "telefone": "11666666666"},
        {"nome": "Lojas Renner", "empresa": "Renner", "email": "campanha@renner.com.br", "telefone": "11555555555"},
    ]
    res_clientes = supabase.table("clientes").insert(clientes_data).execute()
    c = res_clientes.data

    # 2. EQUIPAMENTOS
    equipamentos_data = [
        {"nome": "RED Komodo 6K", "categoria": "Câmera", "patrimonio": "CAM-001", "status": "Disponível"},
        {"nome": "Sony FX3", "categoria": "Câmera", "patrimonio": "CAM-002", "status": "Disponível"},
        {"nome": "Lente Prime Sigma 35mm", "categoria": "Lente", "patrimonio": "LEN-001", "status": "Disponível"},
        {"nome": "Drone DJI Mavic 3 Cine", "categoria": "Drone", "patrimonio": "DRN-001", "status": "Disponível"},
    ]
    res_eqps = supabase.table("equipamentos").insert(equipamentos_data).execute()
    eqps = res_eqps.data

    # 3. PROJETOS (A Magia dos 5)
    hoje = time.strftime("%Y-%m-%d")
    mes_que_vem = time.strftime("%Y-%m-%d", time.localtime(time.time() + 30*86400))
    na_semana = time.strftime("%Y-%m-%d", time.localtime(time.time() + 7*86400))

    projetos_data = [
        # Prj 1: Lead no CRM
        {"cliente_id": c[2]['id'], "titulo": "Institucional BTG 2026", "status": "Prospectando", "data_inicio": hoje, "data_entrega": None, "valor_contrato": 65000, "workflow_step": "Proposta", "diretor": "Felipe"},
        # Prj 2: Pré-Produção
        {"cliente_id": c[0]['id'], "titulo": "Campanha Grãos Origem", "status": "Trabalhando", "data_inicio": hoje, "data_entrega": mes_que_vem, "valor_contrato": 35000, "workflow_step": "Pré-Produção", "diretor": "Marcos", "local_filmagem": "Fazenda MG"},
        # Prj 3: Filmagem Hoje
        {"cliente_id": c[3]['id'], "titulo": "Lançamento Perfume Verão", "status": "Trabalhando", "data_inicio": hoje, "data_entrega": na_semana, "valor_contrato": 45000, "workflow_step": "Filmagem", "diretor": "Luiza", "local_filmagem": "Estúdio 2"},
        # Prj 4: Edição Pendente
        {"cliente_id": c[1]['id'], "titulo": "App Promo Video", "status": "Trabalhando", "data_inicio": hoje, "data_entrega": hoje, "valor_contrato": 12000, "workflow_step": "Edição", "diretor": "Luiza"},
        # Prj 5: Finalizado Entregue
        {"cliente_id": c[4]['id'], "titulo": "Outono Inverno 26", "status": "Finalizado", "data_inicio": hoje, "data_entrega": hoje, "valor_contrato": 80000, "workflow_step": "Entrega", "diretor": "Felipe"},
    ]
    res_projetos = supabase.table("projetos").insert(projetos_data).execute()
    p = res_projetos.data

    # 4. ORÇAMENTOS (Budget Planner Skill) & CATEGORIAS
    orcamentos_gerados = []
    categorias_geradas = []
    financeiro_gerado = []
    tarefas_geradas = []
    anotacoes_geradas = []

    # Map budget constraints
    budget_map = {
        'Campanha Grãos Origem': [( 'Equipe', 8000), ('Equipamentos', 4000), ('Deslocamento', 2500), ('Pós-Produção', 5000)],
        'Lançamento Perfume Verão': [('Equipe', 15000), ('Locação', 8000), ('Equipamentos', 5000)],
        'App Promo Video': [('Pós-Produção', 4000), ('Trilha Sonora', 1500)],
        'Outono Inverno 26': [('Equipe', 30000), ('Equipamentos', 15000), ('Locação', 10000)],
        'Institucional BTG 2026': [('Equipe', 20000), ('Locação', 15000), ('Equipamentos', 8000)]
    }

    for prj in p:
        # Orçamento Base
        orcamento = {
            "projeto_id": prj['id'],
            "nome": f"Orçamento Base - {prj['titulo']}",
            "valor_total": prj['valor_contrato'],
            "custo_previsto": sum([c[1] for c in budget_map.get(prj['titulo'], [])]),
            "status": "Aprovado" if prj['status'] != "Prospectando" else "Rascunho"
        }
        res_orc = supabase.table("orcamentos").insert([orcamento]).execute()
        o_id = res_orc.data[0]['id']

        # Categorias
        cats = budget_map.get(prj['titulo'], [])
        for c_nome, c_valor in cats:
            categorias_geradas.append({"orcamento_id": o_id, "categoria": c_nome, "valor_alocado": c_valor})

        # Sinal (Entrada) - Exceto para quem tá na prospecção
        if prj['status'] != 'Prospectando':
            financeiro_gerado.append({"projeto_id": prj['id'], "descricao": "Sinal do Contrato (50%)", "tipo": "Entrada", "categoria": "Cachê/Contrato", "valor": prj['valor_contrato']*0.5, "data_vencimento": hoje, "status_pagamento": "Pago"})
            financeiro_gerado.append({"projeto_id": prj['id'], "descricao": "Parcela Final (50%)", "tipo": "Entrada", "categoria": "Cachê/Contrato", "valor": prj['valor_contrato']*0.5, "data_vencimento": mes_que_vem, "status_pagamento": "Pendente"})
        
        # Tarefas Genéricas
        tarefas_geradas.append({"projeto_id": prj['id'], "titulo": f"Reunião de Kick-off {prj['titulo']}", "status": "Concluido" if prj['status'] == "Finalizado" else "Em Espera", "prioridade": "Alta", "data_limite": hoje, "responsavel": "Atendimento"})

    # Specific Finances for Variance Analysis (Gasto real nas categorias)
    # Prj 2 (Campanha Grãos)
    p2_id = [x for x in p if x['titulo'] == 'Campanha Grãos Origem'][0]['id']
    financeiro_gerado.extend([
        {"projeto_id": p2_id, "descricao": "Aluguel RED Komodo", "tipo": "Saida", "categoria": "Equipamentos", "valor": 3500, "data_vencimento": hoje, "status_pagamento": "Pago"},  # 3500 de 4000 (Warning)
        {"projeto_id": p2_id, "descricao": "Passagens Aéreas", "tipo": "Saida", "categoria": "Deslocamento", "valor": 2800, "data_vencimento": hoje, "status_pagamento": "Pago"},      # 2800 de 2500 (Estourou!)
    ])

    # Insert batch
    supabase.table("orcamento_categorias").insert(categorias_geradas).execute()
    supabase.table("financeiro_projeto").insert(financeiro_gerado).execute()
    supabase.table("tarefas").insert(tarefas_geradas).execute()

    print("✔ Geração dos 5 Projetos e Orçamentos criada com sucesso!")

wipe_all_data()
seed_data()
