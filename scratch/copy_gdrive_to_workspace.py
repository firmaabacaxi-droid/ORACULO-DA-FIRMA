import shutil
import os

src_docx = r"C:\Users\User\Meu Drive\ORACULO- FIRMA ABACAXI 2026\PROJETOS\2026\Brasil Participativo\01_PROPOSTA\BrasilParticipativo_proposta_v6.docx"
src_pdf = r"C:\Users\User\Meu Drive\ORACULO- FIRMA ABACAXI 2026\PROJETOS\2026\Brasil Participativo\01_PROPOSTA\BrasilParticipativo_proposta_v6.pdf"

dest_dir = r"c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\output\propostas"
dest_docx = os.path.join(dest_dir, "BrasilParticipativo_proposta_v6.docx")
dest_pdf = os.path.join(dest_dir, "BrasilParticipativo_proposta_v6.pdf")

try:
    shutil.copy2(src_docx, dest_docx)
    print(f"DOCX copiado com sucesso para: {dest_docx}")
except Exception as e:
    print(f"Erro ao copiar DOCX: {e}")

try:
    if os.path.exists(src_pdf):
        shutil.copy2(src_pdf, dest_pdf)
        print(f"PDF copiado com sucesso para: {dest_pdf}")
    else:
        print("PDF não encontrado no GDrive para copiar.")
except Exception as e:
    print(f"Erro ao copiar PDF: {e}")
