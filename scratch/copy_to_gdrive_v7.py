import shutil
import os

src = r"c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\output\propostas\BrasilParticipativo_proposta_v7.docx"
dest_dir = r"C:\Users\User\Meu Drive\ORACULO- FIRMA ABACAXI 2026\PROJETOS\2026\Brasil Participativo\01_PROPOSTA"
dest = os.path.join(dest_dir, "BrasilParticipativo_proposta_v7.docx")

try:
    if os.path.exists(src):
        # Create directory if it doesn't exist
        os.makedirs(dest_dir, exist_ok=True)
        shutil.copy2(src, dest)
        print(f"[OK] DOCX v7 copiado com sucesso para o Google Drive: {dest}")
    else:
        print(f"Erro: Arquivo de origem não existe: {src}")
except Exception as e:
    print(f"Erro ao copiar para o Google Drive: {e}")
