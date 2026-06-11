"""
Fase 3 - Preenche todos os gaps encontrados na auditoria:
  - Contatos (1 contato por cliente)
  - Anotacoes (2 por projeto)
  - Alocacao de Equipamentos
  - Briefings e datas de filmagem
"""
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
sb = create_client(os.getenv("NEXT_PUBLIC_SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))

# Busca dados existentes
projetos = sb.table("projetos").select("id, titulo, cliente_id, workflow_step").execute().data
clientes = sb.table("clientes").select("id, nome").execute().data
equipamentos = sb.table("equipamentos").select("id, nome").execute().data

c_map = {c['id']: c['nome'] for c in clientes}
p_map  = {p['titulo']: p for p in projetos}
e_map  = {e['nome']: e['id'] for e in equipamentos}

print("Iniciando populacao da Fase 3...")

# 1. CONTATOS - 1 por cliente
contatos_data = [
    {"nome": "Ana Beatriz Lima",    "cargo": "Gerente de Marketing", "email": "ana@cafehorizonte.com",   "telefone": "11999990001", "cliente_id": clientes[0]['id']},
    {"nome": "Rafael Mendes",       "cargo": "Head de Produto",      "email": "rafael@techstart.io",      "telefone": "11988880002", "cliente_id": clientes[1]['id']},
    {"nome": "Camila Torres",       "cargo": "Diretora de Marca",    "email": "camila@btg.com",           "telefone": "11977770003", "cliente_id": clientes[2]['id']},
    {"nome": "Juliana Fonseca",     "cargo": "Coordenadora de Midia","email": "juliana@natura.com",       "telefone": "11966660004", "cliente_id": clientes[3]['id']},
    {"nome": "Pedro Albuquerque",   "cargo": "Gerente de Campanha",  "email": "pedro@renner.com.br",      "telefone": "11955550005", "cliente_id": clientes[4]['id']},
]
sb.table("contatos").insert(contatos_data).execute()
print("  [OK] Contatos inseridos: 5")

# 2. BRIEFINGS + DATA_FILMAGEM para cada projeto
briefings = {
    "Institucional BTG 2026": {
        "briefing": "Vídeo institucional premium para BTG Pactual, focado em inovação e solidez financeira. Tom corporativo sofisticado, locação em escritórios modernos. Duração: 3 min. Versão curta: 30s para redes.",
        "data_filmagem": "2026-04-10"
    },
    "Campanha Grãos Origem": {
        "briefing": "Campanha da linha Grãos Origem do Café Horizonte. Foco no storytelling da origem dos grãos, do campo à xícara. Tom intimista e orgânico. Produções: vídeo hero 2min + 3 reels de 30s + fotos produto.",
        "data_filmagem": "2026-04-02"
    },
    "Lançamento Perfume Verão": {
        "briefing": "Lançamento da linha de verão de fragrâncias Natura. Conceito: leveza, frescor e natureza. Casting de diversidade. Locação em estúdio com ciclorama branco. Formato: 1.1, 9.16 e 16.9. BGM: trilha exclusiva.",
        "data_filmagem": "2026-03-25"
    },
    "App Promo Video": {
        "briefing": "Vídeo promocional para o lançamento do novo app da TechStart. Motion graphics + live action. Tom jovem e dinâmico. UX demo integrado às imagens reais. Duração: 60s final + bumper 6s.",
        "data_filmagem": "2026-03-28"
    },
    "Outono Inverno 26": {
        "briefing": "Campanha coleção Outono/Inverno 2026 Renner. Shoot de moda com 3 looks completos + campanha de video para digital. Locação: estúdio climatizado. Modelos: 2 femininos, 1 masculino. Entregues e aprovados.",
        "data_filmagem": "2026-03-10"
    },
}

for titulo, dados in briefings.items():
    p = p_map.get(titulo)
    if p:
        sb.table("projetos").update({
            "briefing": dados["briefing"],
            "data_filmagem": dados["data_filmagem"]
        }).eq("id", p["id"]).execute()
print("  [OK] Briefings e datas de filmagem atualizados: 5")

# 3. ANOTACOES - 2 por projeto
anotacoes_data = []
notas_proj = {
    "Institucional BTG 2026": [
        ("Reunião de Alinhamento", "Aprovado o conceito visual: escritório principal SP + drone externo do edifício. Tom sério e aspiracional. Trilha orquestral sugerida.", "2026-03-18", "Felipe"),
        ("Follow-up Aprovação", "Cliente aprovou pré-roteiro enviado. Aguardando liberação das locações internas. Previsão de confirmação até sexta.", "2026-03-21", "Atendimento"),
    ],
    "Campanha Grãos Origem": [
        ("Reunião de Briefing", "Cliente quer foco no storytelling da origem dos grãos. Aprovado tom mais intimista e trilha ambiente. Uso de drone na fazenda confirmado.", "2026-03-19", "Marcos"),
        ("Ideia Criativa - Cena Drone", "Propor abertura aérea da fazenda fornecedora. Verificada viabilidade com piloto. Aprovado internamente, pendente OK do cliente.", "2026-03-20", "Felipe"),
    ],
    "Lançamento Perfume Verão": [
        ("Referências Aprovadas", "Cliente enviou board de referências: Dior e O Boticário. Aprovado o conceito de luz natural filtrada com leve efeito anamórfico.", "2026-03-17", "Luiza"),
        ("Casting Aprovado", "3 modelos selecionadas. Confirmado diversidade de pele e tipo físico conforme brief. Figurinos enviados para aprovação.", "2026-03-22", "Atendimento"),
    ],
    "App Promo Video": [
        ("Roteiro v1 Aprovado", "Roteiro de 60s aprovado. Estrutura: problema > solução > call-to-action. Motion será feito em After Effects com temas da identidade do app.", "2026-03-15", "Luiza"),
        ("Feedback Edição Prévia", "Cliente pediu ajuste no ritmo da segunda metade. Cortes mais rápidos no trecho de demonstração das features. Revisão até amanhã.", "2026-03-22", "Luiza"),
    ],
    "Outono Inverno 26": [
        ("Entrega Final Aprovada", "Todos os arquivos entregues via WeTransfer. Cliente aprovou sem revisão. NPS coletado: 9/10. Recomendação para próxima coleção confirmada.", "2026-03-12", "Felipe"),
        ("Post-mortem do Projeto", "Projeto concluído dentro do prazo. Margem de 35% atingida. Único problema: Deslocamento 12% acima do previsto (combustível extra). Ajustar orçamento futuro.", "2026-03-13", "Felipe"),
    ],
}

for titulo, notas in notas_proj.items():
    p = p_map.get(titulo)
    if p:
        for n in notas:
            anotacoes_data.append({
                "projeto_id": p["id"],
                "titulo": n[0],
                "texto": n[1],
                "data": n[2],
                "autor": n[3]
            })

sb.table("anotacoes").insert(anotacoes_data).execute()
print(f"  [OK] Anotacoes inseridas: {len(anotacoes_data)}")

# 4. ALOCACAO DE EQUIPAMENTOS - para os projetos ativos
aloc_data = [
    # Campanha Graos - pega Komodo + Drone
    {"equipamento_id": e_map["RED Komodo 6K"],   "projeto_id": p_map["Campanha Grãos Origem"]["id"],      "data_retirada": "2026-04-01", "data_devolucao": "2026-04-04", "status": "Reservado"},
    {"equipamento_id": e_map["Drone DJI Mavic 3 Cine"], "projeto_id": p_map["Campanha Grãos Origem"]["id"], "data_retirada": "2026-04-01", "data_devolucao": "2026-04-04", "status": "Reservado"},
    # Lancamento Perfume - pega Sony FX3 + Sigma
    {"equipamento_id": e_map["Sony FX3"],         "projeto_id": p_map["Lançamento Perfume Verão"]["id"],   "data_retirada": "2026-03-24", "data_devolucao": "2026-03-26", "status": "Retirado"},
    {"equipamento_id": e_map["Lente Prime Sigma 35mm"], "projeto_id": p_map["Lançamento Perfume Verão"]["id"], "data_retirada": "2026-03-24", "data_devolucao": "2026-03-26", "status": "Retirado"},
]

sb.table("alocacao_equipamentos").insert(aloc_data).execute()
print(f"  [OK] Alocacoes de equipamentos inseridas: {len(aloc_data)}")

print("\nFASE 3 CONCLUIDA! Todos os gaps foram preenchidos.")
