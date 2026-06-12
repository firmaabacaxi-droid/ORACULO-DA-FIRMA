import os

base_dir = r"c:\Users\User\Documents\ORACULO - FIRMA ABACAXI\cerebro\CEREBRO-ORACULO"

def replace_in_file(rel_path, old_text, new_text):
    abs_path = os.path.join(base_dir, rel_path)
    if not os.path.exists(abs_path):
        print(f"Erro: Arquivo não encontrado: {abs_path}")
        return
    with open(abs_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_text in content:
        new_content = content.replace(old_text, new_text)
        with open(abs_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"[OK] Atualizado: {rel_path}")
    else:
        print(f"[Aviso] Texto original não encontrado em {rel_path}: {old_text!r}")

print("Atualizando Cérebro para Versão 7...")

# 1. Briefing
replace_in_file(
    r"04-PROJETOS-ATIVOS\FIRMA-04-Brasil-Participativo\01-BRIEFING.md",
    "- **Valor da proposta:** R$ 65.025,00 (Subtotal R$ 60.613,00 + NF 7,28% R$ 4.412,00)",
    "- **Valor da proposta:** R$ 66.117,00 (Subtotal R$ 61.630,00 + NF 7,28% R$ 4.487,00)"
)

# 2. Hot Cache
replace_in_file(
    r"wiki\hot.md",
    "| **Brasil Participativo** (#04) | TBD | Proposta v6 | R$ 65.025 |",
    "| **Brasil Participativo** (#04) | TBD | Proposta v7 | R$ 66.117 |"
)
replace_in_file(
    r"wiki\hot.md",
    "| **Brasil Participativo** (#04, R$ 65.025) | Proposta v6 enviada | Aguardar retorno Finatec |",
    "| **Brasil Participativo** (#04, R$ 66.117) | Proposta v7 enviada | Aguardar retorno Finatec |"
)

# 3. Index
replace_in_file(
    r"wiki\index.md",
    "- [[Brasil-Participativo]] — Documentário principal + 10 vídeos instrucionais (ENAP) · R$ 65.025,00",
    "- [[Brasil-Participativo]] — Documentário principal + 10 vídeos instrucionais (ENAP) · R$ 66.117,00"
)

# 4. Project Wiki Page
wiki_path = r"wiki\projects\Brasil-Participativo.md"
replace_in_file(
    wiki_path,
    "value: R$ 65.025,00",
    "value: R$ 66.117,00"
)
replace_in_file(
    wiki_path,
    "**Valor total:** R$ 65.025,00 (Subtotal R$ 60.613,00 + NF 7,28% R$ 4.412,00)  ",
    "**Valor total:** R$ 66.117,00 (Subtotal R$ 61.630,00 + NF 7,28% R$ 4.487,00)  "
)
replace_in_file(
    wiki_path,
    "| Proposta | ✅ Versão 6 enviada (R$ 65.025,00) |",
    "| Proposta | ✅ Versão 7 enviada (R$ 66.117,00) |"
)
replace_in_file(
    wiki_path,
    "*   **Escopo 2 — Vídeos Instrucionais (R$ 15.000,00):**\n    *   50% (R$ 7.500,00) faturados mediante a entrega do primeiro vídeo instrucional finalizado.\n    *   50% (R$ 7.500,00) faturados mediante a entrega do décimo (último) vídeo instrucional finalizado.",
    "*   **Escopo 2 — Vídeos Instrucionais (R$ 16.092,00):**\n    *   50% (R$ 8.046,00) faturados mediante a entrega do primeiro vídeo instrucional finalizado.\n    *   50% (R$ 8.046,00) faturados mediante a entrega do décimo (último) vídeo instrucional finalizado."
)
# Update tables in project wiki page
replace_in_file(
    wiki_path,
    "| Edição e finalização de vídeos instrucionais (ENAP) | R$ 1.398,30 | 10 vídeos | R$ 13.983,00 |",
    "| Edição e finalização de vídeos instrucionais (ENAP) | R$ 1.500,00 | 10 vídeos | R$ 15.000,00 |"
)
replace_in_file(
    wiki_path,
    "| **Subtotal Escopo 2** | | | **R$ 13.983,00** |",
    "| **Subtotal Escopo 2** | | | **R$ 15.000,00** |"
)
replace_in_file(
    wiki_path,
    "| **NF 7,28%** | | | **R$ 1.017,00** |",
    "| **NF 7,28%** | | | **R$ 1.092,00** |"
)
replace_in_file(
    wiki_path,
    "| **TOTAL ESCOPO 2** | | | **R$ 15.000,00** |",
    "| **TOTAL ESCOPO 2** | | | **R$ 16.092,00** |"
)
replace_in_file(
    wiki_path,
    "| Escopo 2 — Vídeos Instrucionais (Adicional) | R$ 13.983,00 | R$ 1.017,00 | R$ 15.000,00 |",
    "| Escopo 2 — Vídeos Instrucionais (Adicional) | R$ 15.000,00 | R$ 1.092,00 | R$ 16.092,00 |"
)
replace_in_file(
    wiki_path,
    "| **TOTAL CONSOLIDADO DA PARCERIA** | | | **R$ 65.025,00** |",
    "| **TOTAL CONSOLIDADO DA PARCERIA** | | | **R$ 66.117,00** |"
)

print("Concluído!")
