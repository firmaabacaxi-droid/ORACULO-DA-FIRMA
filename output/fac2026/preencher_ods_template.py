"""
Preenche o template ODS oficial do FAC (ANEXO IX - CRONOGRAMA DE EXECUÇÃO)
com as 23 atividades do projeto "Todas as Histórias do Mundo".

Estrutura de cada linha de dados no ODS:
  Cell[0]: número da linha (já preenchido, não tocar)
  Cell[1]: repeat=6 → cobre colunas B-G (Atividade, Descrição, Local, Início Mês, Início Semana, Término Mês)
  Cell[2]: coluna H (Término Semana)
  Cell[3]: repeat=16376 (colunas restantes - não tocar)
"""

import shutil
from odf.opendocument import load
from odf.table import Table, TableRow, TableCell
from odf.text import P
from odf import teletype

# ── DADOS ────────────────────────────────────────────────────────────────────
# (Atividade Geral, Descrição, Local, Início Mês, Início Semana, Término Mês, Término Semana)

PRE_PRODUCAO = [
    ("Concepção e criação dramatúrgica",
     "Pesquisa de referências, escrita e estruturação do roteiro",
     "Brasília - DF", 1, 1, 2, 4),
    ("Direção e pesquisa",
     "Desenvolvimento conceitual, pesquisa artística e direção do processo criativo",
     "Brasília - DF", 1, 1, 2, 4),
    ("Preparação corporal e vocal",
     "Treinamento de técnicas circenses e preparação vocal do intérprete",
     "Brasília - DF", 1, 1, 2, 4),
    ("Criação de conteúdo videoprojeção",
     "Desenvolvimento de vídeos e mapeamento de projeção nos tecidos",
     "Brasília - DF", 1, 1, 2, 4),
    ("Projeto cenografia e iluminação",
     "Concepção e detalhamento técnico da cenografia e design de luz",
     "Brasília - DF", 1, 1, 2, 4),
    ("Trilha sonora e desenho de som",
     "Composição musical e criação de paisagem sonora original",
     "Brasília - DF", 1, 1, 2, 4),
    ("Criação de figurinos",
     "Pesquisa, projeto e confecção de figurinos do espetáculo",
     "Brasília - DF", 1, 1, 2, 4),
    ("Operador de cena (ensaios)",
     "Operação técnica nas sessões de ensaio e montagem",
     "Brasília - DF", 2, 1, 3, 4),
    ("Aluguel de sala de ensaio",
     "Locação de espaço para ensaios técnicos e artísticos",
     "Brasília - DF", 2, 1, 3, 4),
]

PRODUCAO = [
    ("Ensaios e montagem (atuação)",
     "Ensaios técnicos e artísticos, integração de todos os elementos cênicos",
     "Brasília - DF", 2, 1, 3, 4),
    ("Assistência de direção",
     "Apoio à direção artística nos ensaios e montagem final",
     "Brasília - DF", 2, 1, 3, 4),
    ("Confecção cenografia, figurinos, adereços",
     "Construção e finalização de todos os elementos cênicos",
     "Brasília - DF", 2, 1, 3, 4),
    ("Locação de equipamentos",
     "Aluguel de rigging, projetores, trilhos e equipamentos circenses",
     "Brasília - DF", 3, 3, 3, 4),
    ("Montagem e testes técnicos",
     "Montagem em teatro e testes integrados de luz, som e projeção mapeada",
     "Brasília - DF", 3, 3, 3, 4),
    ("Apresentação 1 — Estreia",
     "Estreia do espetáculo para público geral (semana 1)",
     "Brasília - DF", 3, 1, 3, 1),
    ("Apresentações 2 e 3",
     "Segunda e terceira sessões do espetáculo (semana 2)",
     "Brasília - DF", 3, 2, 3, 2),
    ("Apresentações 4 e 5",
     "Quarta e quinta sessões do espetáculo (semana 3)",
     "Brasília - DF", 3, 3, 3, 3),
    ("Apresentação 6 + Online",
     "Última sessão presencial e transmissão ao vivo online acessível (semana 4)",
     "Brasília - DF", 3, 4, 3, 4),
    ("Audiodescrição e acessibilidade",
     "Sessão acessível com audiodescrição, Libras e recursos de inclusão",
     "Brasília - DF", 3, 1, 3, 4),
]

POS_PRODUCAO = [
    ("Registro audiovisual e fotografia",
     "Captação profissional de imagens e vídeos do espetáculo em cena",
     "Brasília - DF", 3, 1, 4, 4),
    ("Edição e finalização audiovisual",
     "Montagem, correção de cor, mixagem e entrega do material audiovisual",
     "Brasília - DF", 4, 1, 5, 4),
    ("Divulgação (redes, imprensa, assessoria)",
     "Campanha em redes sociais, assessoria de imprensa e divulgação na mídia",
     "Brasília - DF", 4, 1, 6, 4),
    ("Gestão e fechamento do projeto",
     "Administração, prestação de contas e elaboração do relatório final",
     "Brasília - DF", 5, 1, 6, 4),
]

# ── FUNÇÕES ──────────────────────────────────────────────────────────────────

def set_cell_text(cell, value):
    """Apaga texto existente e insere novo."""
    for p in list(cell.getElementsByType(P)):
        try:
            cell.removeChild(p)
        except Exception:
            pass
    if value is not None and str(value).strip():
        cell.addElement(P(text=str(value)))


def make_cell(value, style=None):
    """Cria nova TableCell com texto."""
    kwargs = {}
    if style:
        kwargs['stylename'] = style
    c = TableCell(**kwargs)
    if value is not None and str(value).strip():
        c.addElement(P(text=str(value)))
    return c


def fill_row(row, atividade, descricao, local, ini_mes, ini_sem, term_mes, term_sem):
    """
    Preenche uma linha de dados do template.
    Estrutura esperada:
      Cell[0] = número da linha (não toca)
      Cell[1] = repeat=6 (colunas B-G) → expande em 6 células individuais
      Cell[2] = coluna H (Término Semana) → define texto
      Cell[3] = repeat=16376 (restante) → não toca
    """
    cells = row.getElementsByType(TableCell)
    if len(cells) < 3:
        return False

    cell_repeat = cells[1]
    repeat_val = cell_repeat.getAttribute('numbercolumnsrepeated')

    if repeat_val != '6':
        print(f"  Linha com estrutura diferente (repeat={repeat_val}), pulando.")
        return False

    style = cell_repeat.getAttribute('stylename')
    cell_term_sem = cells[2]

    # 1. Mudar repeat de 6 → 1 e definir como Atividade Geral
    cell_repeat.setAttribute('numbercolumnsrepeated', '1')
    set_cell_text(cell_repeat, atividade)

    # 2. Inserir as 5 colunas seguintes (C-G) antes de cell_term_sem
    valores_cg = [descricao, local, str(ini_mes), str(ini_sem), str(term_mes)]
    for v in valores_cg:
        nova = make_cell(v, style)
        row.insertBefore(nova, cell_term_sem)

    # 3. Definir Término Semana na cell_term_sem
    set_cell_text(cell_term_sem, str(term_sem))

    return True


# ── EXECUÇÃO ─────────────────────────────────────────────────────────────────

ODS_TEMPLATE = r'PROJETOS - EDITAIS\EDITAL FAC 2026\ANEXO IX - CRONOGRAMA DE EXEUÇÃO.ods'
ODS_SAIDA    = r'PROJETOS - EDITAIS\EDITAL FAC 2026\ANEXO-IX-Cronograma-Todas-as-Historias-do-Mundo-PREENCHIDO.ods'

# Backup do template original
shutil.copy2(ODS_TEMPLATE, ODS_TEMPLATE + '.bak')
print(f"Backup criado: {ODS_TEMPLATE}.bak")

doc = load(ODS_TEMPLATE)
sheet = doc.spreadsheet.getElementsByType(Table)[0]
rows = sheet.getElementsByType(TableRow)
print(f"Total de linhas: {len(rows)}")

# Mapeamento: índice_python → (seção, posição_na_seção)
# Pré-Produção: índices 4–28 (template rows 5–29)
# Produção:     índices 30–54 (template rows 31–55)
# Pós-Produção: índices 56–79 (template rows 57–80)

sections = [
    ("Pré-Produção", 4, PRE_PRODUCAO),
    ("Produção", 30, PRODUCAO),
    ("Pós-Produção", 56, POS_PRODUCAO),
]

for secao, row_start, atividades in sections:
    print(f"\n[{secao}]")
    for i, dados in enumerate(atividades):
        row_idx = row_start + i
        if row_idx >= len(rows):
            print(f"  Linha {row_idx} não existe no template.")
            continue
        ok = fill_row(rows[row_idx], *dados)
        if ok:
            print(f"  OK Linha {row_idx + 1}: {dados[0][:50]}")

# Salvar como novo arquivo (preservar o template original)
doc.save(ODS_SAIDA)
print(f"\nArquivo salvo: {ODS_SAIDA}")

# Verificar tamanho
import os
size = os.path.getsize(ODS_SAIDA)
print(f"Tamanho: {size:,} bytes")
