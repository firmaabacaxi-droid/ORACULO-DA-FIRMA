"""Inspeciona a estrutura real de células do ODS (sem expandir repetições)"""
from odf.opendocument import load
from odf.table import Table, TableRow, TableCell
from odf import teletype

doc = load(r'PROJETOS - EDITAIS\EDITAL FAC 2026\ANEXO IX - CRONOGRAMA DE EXEUÇÃO.ods')
sheet = doc.spreadsheet.getElementsByType(Table)[0]
rows = sheet.getElementsByType(TableRow)

# Inspecionar linhas críticas: 1, 2, 3, 4, 5, 6, 30, 56
for idx in [0, 1, 2, 3, 4, 5, 29, 55]:
    row = rows[idx]
    cells = row.getElementsByType(TableCell)
    row_repeat = row.getAttribute('numberrowsrepeated')
    print(f"\nRow index {idx} (row_repeat={row_repeat}) — {len(cells)} cell elements:")
    for j, cell in enumerate(cells):
        repeat = cell.getAttribute('numbercolumnsrepeated')
        text = teletype.extractText(cell).strip()
        print(f"  Cell[{j}]: repeat={repeat!r}, text={repr(text[:40] if text else '')}")
