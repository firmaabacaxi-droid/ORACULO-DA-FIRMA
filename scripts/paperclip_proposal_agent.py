#!/usr/bin/env python3
import os
import sys
import io
import json
import urllib.request
from dotenv import load_dotenv

# Configurar stdout e stderr para usar UTF-8 no Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# Carregar variáveis de ambiente do .env da raiz do monorepo
load_dotenv()

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
PROJECTS_DB_ID = "2c031822-5594-4204-826b-752d5c2897bc"
VAULT_PATH = r"C:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO\04-PROJETOS-ATIVOS"

if not NOTION_TOKEN:
    print("[ERRO] NOTION_TOKEN não encontrado no ambiente.")
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
            return {"error": err}
        return {"error": str(e)}

def test_loop_1():
    print("\n=== [CICLO DE TESTE 1: LEITURA & CONEXÃO] ===")
    
    # 1. Testar conexão com o Notion
    print("[Notion] Consultando projetos ativos...")
    query_payload = {
        "filter": {
            "property": "Status",
            "select": {
                "does_not_equal": "Concluído"
            }
        },
        "page_size": 3
    }
    url = f"https://api.notion.com/v1/databases/{PROJECTS_DB_ID}/query"
    res = request_notion(url, query_payload, "POST")
    
    if "error" in res:
        print(f"[ERROR] Conexão com Notion falhou: {res['error']}")
        return False
        
    projects = res.get("results", [])
    print(f"[OK] Conexão Notion ativa. Encontrados {len(projects)} projetos ativos.")
    for p in projects:
        props = p.get("properties", {})
        title_list = props.get("Nome do projeto", {}).get("title", []) if props.get("Nome do projeto") else []
        title = title_list[0]["text"]["content"] if title_list else "Sem título"
        
        status_name = "N/A"
        if props.get("Status") and props["Status"].get("select"):
            status_name = props["Status"]["select"].get("name") or "N/A"
            
        val = 0
        if props.get("Valor contratado") and props["Valor contratado"].get("number"):
            val = props["Valor contratado"]["number"]
            
        print(f"  - Projeto: {title} | Status: {status_name} | Valor: R$ {val}")

    # 2. Testar conexão com o Cérebro (Obsidian)
    print("\n[Cérebro] Lendo diretório de projetos no vault...")
    if not os.path.exists(VAULT_PATH):
        print(f"[ERROR] Diretório do vault não encontrado em: {VAULT_PATH}")
        return False
        
    folders = [f for f in os.listdir(VAULT_PATH) if os.path.isdir(os.path.join(VAULT_PATH, f))]
    print(f"[OK] Conexão Cérebro ativa. Pastas físicas encontradas: {len(folders)}")
    for f in folders[:3]:
        print(f"  - Pasta: {f}")
        
    return True

def test_loop_2():
    print("\n=== [CICLO DE TESTE 2: ESCRITA & SINCRONIZAÇÃO] ===")
    
    # 1. Localizar ou criar um projeto de teste no Notion
    print("[Notion] Buscando projeto 'PROJETO_TESTE_PAPERCLIP'...")
    query_payload = {
        "filter": {
            "property": "Nome do projeto",
            "title": {
                "equals": "PROJETO_TESTE_PAPERCLIP"
            }
        }
    }
    url = f"https://api.notion.com/v1/databases/{PROJECTS_DB_ID}/query"
    res = request_notion(url, query_payload, "POST")
    
    project_id = None
    if "error" not in res and res.get("results"):
        project_id = res["results"][0]["id"]
        print(f"[INFO] Projeto de teste encontrado: {project_id}")
    else:
        print("[Notion] Projeto de teste não existe. Criando novo...")
        create_payload = {
            "parent": { "database_id": PROJECTS_DB_ID },
            "properties": {
                "Nome do projeto": {
                    "title": [{ "text": { "content": "PROJETO_TESTE_PAPERCLIP" } }]
                },
                "Status": {
                    "select": { "name": "Proposta" }
                },
                "Valor contratado": {
                    "number": 5000
                }
            }
        }
        create_res = request_notion("https://api.notion.com/v1/pages", create_payload, "POST")
        if "error" in create_res:
            print(f"[ERROR] Falha ao criar projeto no Notion: {create_res['error']}")
            return False
        project_id = create_res["id"]
        print(f"[OK] Novo projeto criado com ID: {project_id}")

    # 2. Atualizar o valor do projeto no Notion
    print("[Notion] Atualizando valor contratado para R$ 7.500...")
    update_payload = {
        "properties": {
            "Valor contratado": {
                "number": 7500
            }
        }
    }
    update_res = request_notion(f"https://api.notion.com/v1/pages/{project_id}", update_payload, "PATCH")
    if "error" in update_res:
        print(f"[ERROR] Falha ao atualizar projeto: {update_res['error']}")
        return False
    print("[OK] Projeto atualizado no Notion com sucesso.")

    # 3. Criar a nota física no Cérebro (Obsidian)
    proj_folder = os.path.join(VAULT_PATH, "FIRMA-99-Projeto-Teste-Paperclip")
    os.makedirs(proj_folder, exist_ok=True)
    note_path = os.path.join(proj_folder, "01-BRIEFING.md")
    
    note_content = """# BRIEFING — PROJETO TESTE PAPERCLIP
## Sincronização automatizada via Paperclip Agent

* **ID Notion:** {project_id}
* **Status:** Proposta
* **Valor:** R$ 7.500,00

> Nota de teste gravada pelo Agente de Proposta durante o ciclo de testes 2 do orquestrador Paperclip.
""".format(project_id=project_id)

    print(f"[Cérebro] Escrevendo nota em: {note_path}...")
    try:
        with open(note_path, "w", encoding="utf-8") as f:
            f.write(note_content)
        print("[OK] Nota física criada no Obsidian.")
    except Exception as e:
        print(f"[ERROR] Falha ao gravar arquivo markdown: {e}")
        return False
        
    return True

def main():
    # Ler o prompt enviado pelo Paperclip via stdin
    prompt = sys.stdin.read().strip()
    print(f"--- AGENTE ACIONADO ---")
    print(f"Prompt recebido: '{prompt}'")
    
    if "ciclo 1" in prompt.lower() or "conexão" in prompt.lower() or "leitura" in prompt.lower():
        success = test_loop_1()
    elif "ciclo 2" in prompt.lower() or "escrita" in prompt.lower() or "sincronização" in prompt.lower():
        success = test_loop_2()
    else:
        # Roda ambos se não especificado
        success = test_loop_1() and test_loop_2()
        
    if success:
        print("\n[OK] EXECUCAO CONCLUIDA COM SUCESSO!")
        sys.exit(0)
    else:
        print("\n[ERRO] EXECUCAO CONCLUIDA COM ERROS!")
        sys.exit(1)

if __name__ == "__main__":
    main()
