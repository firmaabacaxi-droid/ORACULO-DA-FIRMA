from odf.opendocument import load
from odf.table import Table, TableRow, TableCell
from odf import teletype

doc = load(r'PROJETOS - EDITAIS\EDITAL FAC 2026\ANEXO IX - CRONOGRAMA DE EXEUÇÃO.ods')
sheets = doc.spreadsheet.getElementsByType(Table)
print(f'Sheets: {len(sheets)}')

for sheet in sheets:
    name = sheet.getAttribute("name")
    print(f'\n=== SHEET: {name} ===')
    rows = sheet.getElementsByType(TableRow)
    print(f'Total rows: {len(rows)}')
    for i, row in enumerate(rows[:60]):
        cells = row.getElementsByType(TableCell)
        row_data = []
        for cell in cells:
            repeat = cell.getAttribute('numbercolumnsrepeated')
            text = teletype.extractText(cell).strip()
            if repeat:
                n = int(repeat)
                # Only expand if content or not too many
                if n > 20:
                    row_data.append(f'[x{n} EMPTY]')
                else:
                    row_data.extend([text] * n)
            else:
                row_data.append(text)
        # Remover trailing empty
        while row_data and not row_data[-1]:
            row_data.pop()
        if row_data:
            print(f'  Row {i+1}: {row_data}')
