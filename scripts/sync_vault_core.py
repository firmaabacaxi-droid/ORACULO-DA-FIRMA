import os
import shutil
import subprocess

# Definição dos caminhos absolutos baseados no diretório do script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
WORKSPACE_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
VAULT_ROOT = os.path.join(WORKSPACE_ROOT, "cerebro", "CEREBRO-ORACULO")

# Mapeamentos: (Origem no repositório -> Destino no Vault)
SYNC_MAPPINGS = [
    # Diretrizes do Oráculo (Root)
    ("CLAUDE.md", "01-OPERACAO-ORACULO/01.1-DIRETRIZES-GERAIS/CLAUDE.md"),
    ("STATUS.md", "01-OPERACAO-ORACULO/01.1-DIRETRIZES-GERAIS/STATUS.md"),
    ("MEMORIA.md", "01-OPERACAO-ORACULO/01.1-DIRETRIZES-GERAIS/MEMORIA.md"),
    
    # DNA e Vendas (docs/)
    ("docs/CONTEXTO_FIRMA.md", "01-OPERACAO-ORACULO/01.2-DNA-E-VENDAS/CONTEXTO_FIRMA.md"),
    ("docs/FLUXO_TRABALHO.md", "01-OPERACAO-ORACULO/01.2-DNA-E-VENDAS/FLUXO_TRABALHO.md"),
    ("docs/TABELA_PRECOS.md", "01-OPERACAO-ORACULO/01.2-DNA-E-VENDAS/TABELA_PRECOS.md"),
    
    # Arquitetura Técnica (docs/)
    ("docs/ARQUITETURA_NOTION.md", "01-OPERACAO-ORACULO/01.3-ARQUITETURA-TECNICA/ARQUITETURA_NOTION.md"),
    ("docs/FASE2_IMPLEMENTACAO.md", "01-OPERACAO-ORACULO/01.3-ARQUITETURA-TECNICA/FASE2_IMPLEMENTACAO.md"),
    ("docs/arquivo/SUBAGENTES.md", "01-OPERACAO-ORACULO/01.3-ARQUITETURA-TECNICA/SUBAGENTES.md"),
]

def copy_files():
    print("[SYNC] Copiando arquivos de diretrizes para o Vault...")
    for src_rel, dest_rel in SYNC_MAPPINGS:
        src_path = os.path.join(WORKSPACE_ROOT, src_rel)
        dest_path = os.path.join(VAULT_ROOT, dest_rel)
        
        if not os.path.exists(src_path):
            print(f"[WARN] Origem nao encontrada: {src_rel}")
            continue
            
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        try:
            shutil.copy2(src_path, dest_path)
            print(f"[OK] Sincronizado: {src_rel} -> {dest_rel}")
        except Exception as e:
            print(f"[ERROR] Erro ao copiar {src_rel}: {e}")

def run_git_sync():
    print("[GIT] Iniciando sincronizacao com o GitHub...")
    try:
        # Verificar se há alterações
        status = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=WORKSPACE_ROOT,
            capture_output=True,
            text=True,
            check=True
        )
        
        if not status.stdout.strip():
            print("[INFO] Nenhuma alteracao pendente no repositorio.")
            return

        print("[GIT] Commitando alteracoes...")
        subprocess.run(["git", "add", "."], cwd=WORKSPACE_ROOT, check=True)
        subprocess.run(
            ["git", "commit", "-m", "sync: Oraculo core and vault automatic update"],
            cwd=WORKSPACE_ROOT,
            check=True
        )
        
        print("[GIT] Fazendo push para o GitHub...")
        subprocess.run(["git", "push"], cwd=WORKSPACE_ROOT, check=True)
        print("[GIT] Repositorio e Vault sincronizados com sucesso no GitHub!")
        
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Erro no comando Git: {e}")
    except Exception as e:
        print(f"[ERROR] Erro geral no Git Sync: {e}")

def main():
    if not os.path.exists(VAULT_ROOT):
        print(f"[ERROR] Vault nao encontrado em: {VAULT_ROOT}")
        return
    copy_files()
    run_git_sync()

if __name__ == "__main__":
    main()
