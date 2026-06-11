import json
import os
import re

# Paths
INPUT_DIR = r"C:\Users\User\Documents\ANTIGRAVITY\ORACULO MIGRAR DASHBOARD"
OUTPUT_DIR = r"C:\Users\User\Documents\ANTIGRAVITY\ORACULO MIGRAR DASHBOARD\data_json"

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Mapping of Statuses for 2.0
STATUS_MAPPING = {
    "Trabalhando": "🎥 Produção",
    "Pausado": "⏸️ Pausado",
    "Não Iniciado": "🏗️ Pré-Produção",
    "Finalizado": "✅ Finalizado",
    "Prospectando": "🎯 Prospecção",
    "Aprovada": "✅ Aprovada",
    "Pendente": "⬜ Pendente",
    "Pago": "💰 Pago",
    "Pago Parcial": "🌗 Pago Parcial"
}

def clean_property_name(name):
    # Standardizing names for 2.0 with Emojis
    mapping = {
        "PROJETO": "🎬 PROJETO",
        "STATUS": "🏷️ STATUS",
        "STATUS FINANCEIRO": "💰 STATUS FIN.",
        "VALOR DO CONTRATO": "💵 VALOR",
        "DATA DE ENTREGA": "📅 ENTREGA",
        "INICIO DO PROJETO": "🚀 INÍCIO",
        "LINK DO DRIVE": "📂 DRIVE",
        "LINK DO CONTRATO": "📜 CONTRATO",
        "ATIVIDADE": "🛠️ ATIVIDADE",
        "CLIENTE": "🏢 CLIENTE",
        "CRM": "💼 CRM",
        "TIPO": "🗂️ TIPO",
        "VALOR": "💸 VALOR",
        "CATEGORIA": "🏷️ CATEGORIA",
        "COMPROVANTE": "📄 ANEXO",
        "DESCRICAO": "📝 DESCRIÇÃO"
    }
    return mapping.get(name.upper(), name)

def process_file(filename):
    input_path = os.path.join(INPUT_DIR, filename)
    with open(input_path, 'r', encoding='utf-8') as f:
        # Some files might have the "Tool execution result" wrapper from the logs
        content = f.read()
        if "Tool execution result:" in content:
            content = content.split("Tool execution result:\n")[-1]
        
        try:
            data = json.loads(content)
        except:
            print(f"Error parsing {filename}")
            return

    # Extract items (pages)
    # The JSON structure seems to be a nested "data-source-state" or just the raw results
    # Based on view_file output, it's the raw internal state of n8n fetch.
    # We need to find the actual list of pages.
    # Note: If the JSON only contains the SCHEMA, we skip data processing.
    
    if "results" in data:
        items = data["results"]
    elif "schema" in data:
        print(f"Skipping {filename} - contains schema only.")
        return
    else:
        print(f"No results found in {filename}")
        return

    processed_items = []
    for item in items:
        new_item = {}
        props = item.get("properties", {})
        for k, v in props.items():
            new_key = clean_property_name(k)
            # Normalize status values if select/multi_select
            if isinstance(v, dict):
                if v.get("type") in ["select", "status"] and v.get(v["type"]):
                    val = v[v["type"]]["name"]
                    v[v["type"]]["name"] = STATUS_MAPPING.get(val, val)
                elif v.get("type") == "multi_select":
                    for opt in v["multi_select"]:
                        opt["name"] = STATUS_MAPPING.get(opt["name"], opt["name"])
            
            new_item[new_key] = v
        processed_items.append(new_item)

    output_path = os.path.join(OUTPUT_DIR, f"v2_{filename}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(processed_items, f, indent=2, ensure_ascii=False)
    print(f"Processed {filename} -> v2_{filename}")

# Process main databases
files_to_process = [
    "PROJETOS_2026.json",
    "FINANCEIRO_PROJETO.json",
    "CLIENTES.json",
    "CONTATOS.json",
    "CRM.json",
    "TAREFAS.json"
]

for f in files_to_process:
    if os.path.exists(os.path.join(INPUT_DIR, f)):
        process_file(f)
