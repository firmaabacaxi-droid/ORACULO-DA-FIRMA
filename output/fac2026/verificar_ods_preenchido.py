"""Verifica o conteúdo do ODS preenchido"""
from odf.opendocument import load
from odf.table import Table, TableRow, TableCell
from odf import teletype
import sys

sys.stdout.reconfigure(encoding='utf-8')

ODS = r'PROJETOS - EDITAIS\EDITAL FAC 2026\ANEXO-IX-Cronograma-Todas-as-Historias-do-Mundo-PREENCHIDO.ods'

doc = load(ODS)
sheet = doc.spreadsheet.getElementsByType(Table)[0]
rows = sheet.getElementsByType(TableRow)

for i, row in enumerate(rows[:65]):
    cells = row.getElementsByType(TableCell)
    data = []
    for cell in cells:
        repeat = cell.getAttribute('numbercolumnsrepeated')
        text = teletype.extractText(cell).strip()
        n = int(repeat) if repeat else 1
        if n > 20:
            break  # ignora colunas restantes
        for _ in range(n):
            data.append(text)
    while data and not data[-1]:
        data.pop()
    if data:
        print(f"R{i+1:02d}: {data}")
