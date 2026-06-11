#!/usr/bin/env python3
import os
import sys
import json
import urllib.request
import argparse
import shutil
import glob
import re

def load_env(filepath):
    env_vars = {}
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value.strip().strip('"').strip("'")
    return env_vars

env = load_env(os.path.expanduser('~/.secrets/antigravity.env'))
NOTION_TOKEN = env.get("NOTION_TOKEN")

if not NOTION_TOKEN:
    print("Erro: NOTION_TOKEN não encontrado em ~/.secrets/antigravity.env")
    sys.exit(1)

def request_notion(url, payload=None, method="POST"):
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    }
    data = None
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        if hasattr(e, 'read'):
            err = e.read().decode('utf-8')
            print(f"Erro na API ({method} {url}): {err}")
            return {"error": err}
        else:
            print(f"Erro: {e}")
            return {"error": str(e)}

def format_currency(val):
    if val is None:
        return ""
    return f"{val:,.2f}".replace(",", "v").replace(".", ",").replace("v", ".")

def update_markdown_table_row(content, item_name, unit=None, qty=None, total=None):
    escaped_name = re.escape(item_name)
    # Match the row containing the item name (surrounded by optional bold asterisks)
    pattern = rf"(\|\s*\**{escaped_name}\**\s*\|)\s*([^|]*)\|\s*([^|]*)\|\s*([^|]*)\|"
    
    def replace_row(match):
        col0 = match.group(1)
        col1 = match.group(2).strip()
        col2 = match.group(3).strip()
        col3 = match.group(4).strip()
        
        new_unit = f"R$ {format_currency(unit)}" if unit is not None else col1
        new_qty = str(qty) if qty is not None else col2
        new_total = f"R$ {format_currency(total)}" if total is not None else col3
        
        # Preserve bold styling if present
        if col3.startswith("**") and col3.endswith("**") and not new_total.startswith("**"):
            new_total = f"**{new_total}**"
        if col1.startswith("**") and col1.endswith("**") and not new_unit.startswith("**"):
            new_unit = f"**{new_unit}**"
            
        return f"{col0} {new_unit} | {new_qty} | {new_total} |"
        
    content, count = re.subn(pattern, replace_row, content, flags=re.IGNORECASE)
    return content

def get_cerebro_project_slug(project_name):
    slug = project_name.replace(" ", "-").replace("_", "-")
    slug = re.sub(r'-+', '-', slug)
    return slug

def find_cerebro_project_files(base_dir, project_name):
    wiki_dir = os.path.join(base_dir, "wiki", "projects")
    wiki_file = None
    
    slug = get_cerebro_project_slug(project_name)
    direct_path = os.path.join(wiki_dir, f"{slug}.md")
    if os.path.exists(direct_path):
        wiki_file = direct_path
    else:
        # Search for a file in wiki/projects that matches key words from project_name
        words = [w.lower() for w in re.findall(r'\w+', project_name) if len(w) > 2]
        best_match = None
        best_count = 0
        if os.path.exists(wiki_dir):
            for f in os.listdir(wiki_dir):
                if f.endswith(".md"):
                    match_count = sum(1 for w in words if w in f.lower())
                    if match_count > best_count:
                        best_count = match_count
                        best_match = os.path.join(wiki_dir, f)
            if best_match and best_count > 0:
                wiki_file = best_match

    briefing_file = None
    proj_ativos_dir = os.path.join(base_dir, "04-PROJETOS-ATIVOS")
    if os.path.exists(proj_ativos_dir):
        words = [w.lower() for w in re.findall(r'\w+', project_name) if len(w) > 2]
        best_dir_match = None
        best_dir_count = 0
        for d in os.listdir(proj_ativos_dir):
            d_path = os.path.join(proj_ativos_dir, d)
            if os.path.isdir(d_path):
                match_count = sum(1 for w in words if w in d.lower())
                if match_count > best_dir_count:
                    best_dir_count = match_count
                    best_dir_match = d_path
        
        if best_dir_match:
            bf_path = os.path.join(best_dir_match, "01-BRIEFING.md")
            if os.path.exists(bf_path):
                briefing_file = bf_path
            else:
                md_files = glob.glob(os.path.join(best_dir_match, "*.md"))
                if md_files:
                    briefing_file = md_files[0]
                    
    return wiki_file, briefing_file

def resolve_gdrive_dest_dir(project_name, passed_dir=None):
    if passed_dir:
        return passed_dir
    if not project_name:
        return None
    base_gdrive = r"C:\Users\User\Meu Drive\ORACULO- FIRMA ABACAXI 2026\PROJETOS\2026"
    if os.path.exists(base_gdrive):
        clean_name = project_name.lower().replace("-", " ").replace("_", " ").strip()
        for d in os.listdir(base_gdrive):
            d_path = os.path.join(base_gdrive, d)
            if os.path.isdir(d_path):
                clean_d = d.lower().replace("-", " ").replace("_", " ").strip()
                if clean_name in clean_d or clean_d in clean_name:
                    return d_path
        # Return proposed path if no existing match was found
        return os.path.join(base_gdrive, project_name)
    return None

def resolve_ids_and_names(args):
    project_id = args.project_id
    proposal_id = args.proposal_id
    project_name = args.project_name
    
    PROJECTS_DB_ID = "2c031822-5594-4204-826b-752d5c2897bc"
    PROPOSALS_DB_ID = "3548a525-91f3-80e6-b542-e2e651ed5dfc"
    
    # Fallback to Brasil Participativo default if absolutely nothing is specified
    if not project_id and not proposal_id and not project_name:
        project_name = "Brasil-Participativo"
        project_id = "3618a525-91f3-804d-89f0-e9928c95c41b"
        proposal_id = "3738a525-91f3-813f-b4c8-e3186f345b8f"
        print("[Notion] Nenhum parâmetro identificador fornecido. Usando 'Brasil-Participativo' por padrão.")
        
    if proposal_id:
        print(f"[Notion] Buscando dados da proposta {proposal_id}...")
        url = f"https://api.notion.com/v1/pages/{proposal_id}"
        prop_details = request_notion(url, method="GET")
        if "error" not in prop_details:
            proj_relation = prop_details.get("properties", {}).get("Projeto", {}).get("relation", [])
            if proj_relation and not project_id:
                project_id = proj_relation[0]["id"]
                print(f"[Notion] ID do projeto resolvido via relação da proposta: {project_id}")
        else:
            print(f"[WARN] Erro ao obter proposta {proposal_id}: {prop_details['error']}")
            
    if not project_id and project_name:
        # Clean hyphens/underscores to spaces for Notion database contains search
        search_name = project_name.replace("-", " ").replace("_", " ")
        print(f"[Notion] Buscando ID do projeto para '{search_name}'...")
        query_payload = {
            "filter": {
                "property": "Nome do projeto",
                "title": {
                    "contains": search_name
                }
            }
        }
        query_res = request_notion(f"https://api.notion.com/v1/databases/{PROJECTS_DB_ID}/query", query_payload, method="POST")
        if "error" not in query_res and query_res.get("results"):
            project_id = query_res["results"][0]["id"]
            print(f"[Notion] ID do projeto encontrado pelo nome: {project_id}")
            
    if project_id and not project_name:
        print(f"[Notion] Obtendo nome do projeto para o ID {project_id}...")
        url = f"https://api.notion.com/v1/pages/{project_id}"
        proj_details = request_notion(url, method="GET")
        if "error" not in proj_details:
            title_list = proj_details.get("properties", {}).get("Nome do projeto", {}).get("title", [])
            if title_list:
                project_name = title_list[0]["text"]["content"]
                print(f"[Notion] Nome do projeto resolvido: '{project_name}'")
                
    if project_id and not proposal_id:
        print(f"[Notion] Buscando proposta vinculada ao projeto {project_id}...")
        query_payload = {
            "filter": {
                "property": "Projeto",
                "relation": {
                    "contains": project_id
                }
            }
        }
        query_res = request_notion(f"https://api.notion.com/v1/databases/{PROPOSALS_DB_ID}/query", query_payload, method="POST")
        if "error" not in query_res and query_res.get("results"):
            proposal_id = query_res["results"][0]["id"]
            print(f"[Notion] Proposta resolvida via ID de projeto: {proposal_id}")
            
    return {
        "project_id": project_id,
        "proposal_id": proposal_id,
        "project_name": project_name
    }

def parse_args():
    parser = argparse.ArgumentParser(description="Oráculo Sync Tool — Propostas, Projetos e Roteiros (Notion + Cérebro + Drive)")
    parser.add_argument("--mode", default="proposal", choices=["proposal", "project", "script"], help="Modo de sincronização")
    parser.add_argument("--proposal-id", help="ID da proposta no Notion")
    parser.add_argument("--project-id", help="ID do projeto no Notion")
    parser.add_argument("--budget-db-id", default="0652762f-bac3-4a0b-ad3c-2b7223132a2b", help="ID da database de orçamentos no Notion")
    
    # Parâmetros gerais
    parser.add_argument("--project-name", help="Nome do projeto para busca no Cérebro")
    parser.add_argument("--version", type=int, help="Versão da proposta ou do roteiro")
    parser.add_argument("--status", help="Novo status para o projeto (ex: 'Pré-produção', 'Produção')")
    parser.add_argument("--total-val", type=int, help="Valor total do projeto ou proposta")
    
    # Parâmetros específicos de proposta/orçamento (Legado)
    parser.add_argument("--nf-val", type=int, help="Valor de imposto (NF 7,28%%)")
    parser.add_argument("--video-total", type=int, help="Total do escopo de vídeos (ENAP)")
    parser.add_argument("--video-unit", type=float, help="Valor unitário dos vídeos (ENAP)")
    parser.add_argument("--custos-prod", type=int, help="Custos de produção (transporte/alimentação)")
    
    # Parâmetro de orçamento genérico (Novo)
    parser.add_argument("--items-json", help="Dicionário JSON de itens de orçamento para atualizar no Notion/Cérebro")
    
    # Caminhos de arquivos
    parser.add_argument("--docx-src", help="Caminho do arquivo DOCX de origem local (proposta ou roteiro)")
    parser.add_argument("--gdrive-dest-dir", help="Diretório mestre do projeto no Google Drive")
    
    return parser.parse_args()

def sync_proposal(args):
    print("\n--- INICIANDO SINCRONIZAÇÃO DE PROPOSTA ---")
    
    # Resolve IDs e nomes
    resolved = resolve_ids_and_names(args)
    if not resolved or not resolved["proposal_id"]:
        print("Erro: ID da proposta não pôde ser resolvido.")
        sys.exit(1)
        
    proposal_id = resolved["proposal_id"]
    project_id = resolved["project_id"]
    project_name = resolved["project_name"]
    
    # Garantir que temos os argumentos fundamentais
    if not args.version or not args.total_val:
        print("Erro: Os parâmetros '--version' e '--total-val' são obrigatórios no modo 'proposal'.")
        sys.exit(1)
        
    # 1. Obter valores atuais da proposta no Notion
    url = f"https://api.notion.com/v1/pages/{proposal_id}"
    prop_details = request_notion(url, method="GET")
    if "error" in prop_details:
        print(f"Erro ao obter dados atuais da proposta no Notion: {prop_details['error']}")
        sys.exit(1)
        
    old_version = 0
    if "properties" in prop_details and "Versão" in prop_details["properties"]:
        old_version = prop_details["properties"]["Versão"].get("number") or 0
        
    old_total_val = 0
    if "properties" in prop_details and "Valor Total" in prop_details["properties"]:
        old_total_val = prop_details["properties"]["Valor Total"].get("number") or 0
        
    print(f"Dados antigos no Notion: Versão {old_version} | Valor: R$ {format_currency(old_total_val)}")
    
    # 2. Atualizar Notion Proposal Page
    proposal_payload = {
        "properties": {
            "Valor Total": {"number": args.total_val},
            "Versão": {"number": args.version}
        }
    }
    request_notion(f"https://api.notion.com/v1/pages/{proposal_id}", proposal_payload, method="PATCH")
    print(f"[Notion] Proposta atualizada para R$ {args.total_val} (v{args.version}).")
    
    # 3. Atualizar Notion Budget Items
    items_to_update = {}
    if args.items_json:
        try:
            items_to_update = json.loads(args.items_json)
        except Exception as e:
            print(f"Erro ao analisar --items-json: {e}")
            sys.exit(1)
    else:
        # Fallback para argumentos individuais (Brasil Participativo)
        if args.video_total is not None:
            items_to_update["Edição e finalização de vídeos instrucionais (ENAP)"] = {
                "unit": args.video_unit,
                "total": args.video_total
            }
        if args.nf_val is not None:
            items_to_update["NF 7,28%"] = {
                "unit": args.nf_val,
                "total": args.nf_val
            }
        if args.custos_prod is not None:
            items_to_update["Custos de produção"] = {
                "unit": args.custos_prod,
                "total": args.custos_prod
            }
            
    if items_to_update:
        print(f"\n[Notion] Atualizando {len(items_to_update)} itens no banco de orçamentos...")
        query_payload = {
            "filter": {
                "property": "Proposta",
                "relation": {
                    "contains": proposal_id
                }
            }
        }
        query_res = request_notion(f"https://api.notion.com/v1/databases/{args.budget_db_id}/query", query_payload, method="POST")
        if "error" not in query_res:
            results = query_res.get("results", [])
            for page in results:
                page_id = page["id"]
                title_list = page["properties"]["Item"]["title"]
                if not title_list:
                    continue
                title = title_list[0]["text"]["content"]
                
                matched_key = None
                for key in items_to_update:
                    if key.lower() in title.lower():
                        matched_key = key
                        break
                        
                if matched_key:
                    update_data = items_to_update[matched_key]
                    payload_props = {}
                    if "unit" in update_data and update_data["unit"] is not None:
                        payload_props["Valor unitário"] = {"number": float(update_data["unit"])}
                    if "total" in update_data and update_data["total"] is not None:
                        payload_props["Total"] = {"number": float(update_data["total"])}
                    if "qty" in update_data and update_data["qty"] is not None:
                        try:
                            qty_val = float(update_data["qty"])
                            payload_props["Quantidade"] = {"number": qty_val}
                        except ValueError:
                            pass
                            
                    if payload_props:
                        request_notion(f"https://api.notion.com/v1/pages/{page_id}", {"properties": payload_props}, method="PATCH")
                        print(f"[Notion] Item '{title}' atualizado com sucesso: {payload_props}")
        else:
            print(f"[WARN] Erro ao buscar itens de orçamento: {query_res['error']}")
            
    # 4. Sincronizar Cérebro
    print("\n[Cérebro] Sincronizando arquivos...")
    base_dir = r"c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO"
    
    wiki_file, briefing_file = find_cerebro_project_files(base_dir, project_name)
    
    files_to_update = []
    if briefing_file:
        files_to_update.append(briefing_file)
    if wiki_file:
        files_to_update.append(wiki_file)
        
    hot_file = os.path.join(base_dir, "wiki", "hot.md")
    index_file = os.path.join(base_dir, "wiki", "index.md")
    if os.path.exists(hot_file):
        files_to_update.append(hot_file)
    if os.path.exists(index_file):
        files_to_update.append(index_file)
        
    # Garantir correspondência de totals comuns no items_to_update para as tabelas markdown
    if args.total_val is not None:
        for total_label in ["TOTAL CONSOLIDADO DA PARCERIA", "TOTAL CONSOLIDADO", "Total Consolidado", "Valor contratado", "Valor total"]:
            if total_label not in items_to_update:
                items_to_update[total_label] = {"total": args.total_val}
                
    old_total_fmt = format_currency(old_total_val)
    new_total_fmt = format_currency(args.total_val)
    
    for abs_path in files_to_update:
        if not os.path.exists(abs_path):
            continue
        rel_path = os.path.relpath(abs_path, base_dir)
        with open(abs_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Substituições globais de total e versão
        if old_total_val:
            content = content.replace(f"R$ {old_total_fmt}", f"R$ {new_total_fmt}")
            content = content.replace(f"R$ {old_total_val:,.2f}".replace(",", "."), f"R$ {args.total_val:,.2f}".replace(",", "."))
            content = content.replace(f"R$ {old_total_val}", f"R$ {args.total_val}")
            content = content.replace(f"#{old_total_val}", f"#{args.total_val}")
            
        if old_version and args.version:
            content = content.replace(f"Proposta v{old_version}", f"Proposta v{args.version}")
            content = content.replace(f"Versão {old_version}", f"Versão {args.version}")
            content = content.replace(f"versão {old_version}", f"versão {args.version}")
            content = content.replace(f"v{old_version} ", f"v{args.version} ")
            
        # Substituição específica de itens de tabela markdown
        for item_name, data in items_to_update.items():
            unit = data.get("unit")
            qty = data.get("qty")
            total = data.get("total")
            content = update_markdown_table_row(content, item_name, unit=unit, qty=qty, total=total)
            
        # Custom legacy logic para a proposta Brasil Participativo
        if "Brasil-Participativo" in rel_path and args.video_total is not None and args.nf_val is not None:
            content = content.replace(f"Escopo 2 — Vídeos Instrucionais (R$ 15.000,00)", f"Escopo 2 — Vídeos Instrucionais (R$ {args.video_total:,.2f})".replace(",", "."))
            content = content.replace("| **Subtotal Escopo 2** | | | **R$ 15.000,00** |", f"| **Subtotal Escopo 2** | | | **R$ {args.video_total:,.2f}** |".replace(",", "."))
            content = content.replace("| **NF 7,28%** | | | **R$ 1.092,00** |", f"| **NF 7,28%** | | | **R$ {args.nf_val:,.2f}** |".replace(",", "."))
            content = content.replace("| Escopo 2 — Vídeos Instrucionais (Adicional) | R$ 15.000,00 | R$ 1.092,00 | R$ 16.092,00 |", f"| Escopo 2 — Vídeos Instrucionais (Adicional) | R$ {args.video_total:,.2f} | R$ {args.nf_val:,.2f} | R$ {args.video_total + args.nf_val:,.2f} |".replace(",", "."))
            
        with open(abs_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Sincronizado: {rel_path}")
        
    # 5. Copiar para o Google Drive
    resolved_gdrive = resolve_gdrive_dest_dir(project_name, args.gdrive_dest_dir)
    if args.docx_src and resolved_gdrive:
        if os.path.exists(args.docx_src):
            print("\n[Google Drive] Copiando proposta...")
            dest_path = os.path.join(resolved_gdrive, "01_PROPOSTA", os.path.basename(args.docx_src))
            try:
                os.makedirs(os.path.join(resolved_gdrive, "01_PROPOSTA"), exist_ok=True)
                shutil.copy2(args.docx_src, dest_path)
                print(f"[Drive] Copiado com sucesso para: {dest_path}")
            except Exception as e:
                print(f"[Drive] Erro ao copiar proposta: {e}")
        else:
            print(f"\n[Drive] Aviso: Arquivo de origem DOCX '{args.docx_src}' não encontrado. Cópia pulada.")
    else:
        print("\n[Drive] Aviso: Parâmetros do Drive não fornecidos ou pasta não resolvida. Cópia pulada.")

def sync_project(args):
    print("\n--- INICIANDO SINCRONIZAÇÃO DE PROJETO ---")
    if not args.status:
        print("Erro: Parâmetro '--status' é obrigatório no modo 'project'.")
        sys.exit(1)
        
    # 1. Resolve IDs
    resolved = resolve_ids_and_names(args)
    if not resolved or not resolved["project_id"]:
        print("Erro: ID do projeto não pôde ser resolvido.")
        sys.exit(1)
        
    project_id = resolved["project_id"]
    project_name = resolved["project_name"]
        
    # 2. Atualizar Notion Project Page
    project_payload = {
        "properties": {
            "Status": {
                "status": {
                    "name": args.status
                }
            }
        }
    }
    if args.total_val:
        project_payload["properties"]["Valor contratado"] = {"number": args.total_val}
        
    print(f"[Notion] Atualizando status do projeto {project_id} para '{args.status}'...")
    res = request_notion(f"https://api.notion.com/v1/pages/{project_id}", project_payload, method="PATCH")
    if "error" in res:
        print("Erro ao atualizar projeto no Notion.")
    else:
        print("[Notion] Projeto atualizado com sucesso.")
        
    # 3. Sincronizar Cérebro
    print("\n[Cérebro] Atualizando notas de projeto...")
    base_dir = r"c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO"
    
    wiki_file, briefing_file = find_cerebro_project_files(base_dir, project_name)
    
    # 3.1 Atualizar wiki/projects/{project-name}.md
    if wiki_file and os.path.exists(wiki_file):
        with open(wiki_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        new_lines = []
        for line in lines:
            if line.strip().startswith("status:"):
                new_lines.append(f"status: {args.status.lower()}\n")
            elif line.strip().startswith("value:") and args.total_val:
                new_lines.append(f"value: R$ {format_currency(args.total_val)}\n")
            else:
                new_lines.append(line)
                
        with open(wiki_file, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"  Atualizado: {os.path.relpath(wiki_file, base_dir)}")
        
    # 3.2 Atualizar briefing file em 04-PROJETOS-ATIVOS
    if briefing_file and os.path.exists(briefing_file):
        with open(briefing_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = re.sub(
            r'-\s*\*\*Status:\*\*.*', 
            f'- **Status:** {args.status}', 
            content
        )
        
        with open(briefing_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Atualizado status no briefing: {os.path.relpath(briefing_file, base_dir)}")

def sync_script(args):
    print("\n--- INICIANDO SINCRONIZAÇÃO DE ROTEIRO ---")
    if not args.docx_src:
        print("Erro: Caminho '--docx-src' é obrigatório no modo 'script'.")
        sys.exit(1)
        
    # Resolve project name to find the drive folder
    resolved = resolve_ids_and_names(args)
    project_name = resolved["project_name"] if resolved else args.project_name
    
    gdrive_path = resolve_gdrive_dest_dir(project_name, args.gdrive_dest_dir)
    if not gdrive_path or not os.path.exists(gdrive_path):
        print(f"Erro: Pasta do Google Drive não resolvida ou inexistente para o projeto '{project_name}'.")
        sys.exit(1)
        
    # 1. Determinar pasta do Google Drive correta para o roteiro
    subdirs = [d for d in os.listdir(gdrive_path) if os.path.isdir(os.path.join(gdrive_path, d))]
    
    target_sub = None
    for sd in subdirs:
        if any(w in sd.upper() for w in ["ROTEIRO", "BRIEFING", "02"]):
            target_sub = sd
            break
            
    if target_sub:
        dest_dir = os.path.join(gdrive_path, target_sub)
    else:
        dest_dir = os.path.join(gdrive_path, "02_BRIEFINGS")
        os.makedirs(dest_dir, exist_ok=True)
        
    dest_file = os.path.join(dest_dir, os.path.basename(args.docx_src))
    
    print(f"Copiando arquivo de roteiro '{os.path.basename(args.docx_src)}' para a pasta: {dest_dir}...")
    try:
        shutil.copy2(args.docx_src, dest_file)
        print(f"[Drive] Roteiro copiado com sucesso para: {dest_file}")
    except Exception as e:
        print(f"[Drive] Erro ao copiar roteiro: {e}")
        
    # Se houver PDF correspondente, copia também
    pdf_src = args.docx_src.replace(".docx", ".pdf")
    if os.path.exists(pdf_src):
        dest_pdf = os.path.join(dest_dir, os.path.basename(pdf_src))
        try:
            shutil.copy2(pdf_src, dest_pdf)
            print(f"[Drive] PDF do roteiro copiado com sucesso para: {dest_pdf}")
        except Exception as e:
            print(f"[Drive] Erro ao copiar PDF do roteiro: {e}")

def main_orchestrator():
    args = parse_args()
    if args.mode == "proposal":
        sync_proposal(args)
    elif args.mode == "project":
        sync_project(args)
    elif args.mode == "script":
        sync_script(args)

if __name__ == "__main__":
    main_orchestrator()
