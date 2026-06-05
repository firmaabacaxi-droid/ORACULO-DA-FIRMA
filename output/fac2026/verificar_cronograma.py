import openpyxl

wb = openpyxl.load_workbook(
    r"PROJETOS - EDITAIS\EDITAL FAC 2026"
    r"\ANEXO-IX-Cronograma-Todas-as-Historias-do-Mundo-TEMPLATE.xlsx"
)
ws = wb.active

print(f"Sheet: {ws.title}")
print(f"Dimensões: {ws.dimensions}")
print()

for row in ws.iter_rows(values_only=True):
    if any(v is not None and str(v).strip() != "" for v in row):
        print(row)
