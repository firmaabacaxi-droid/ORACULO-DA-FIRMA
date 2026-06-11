import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
sb = create_client(os.getenv("NEXT_PUBLIC_SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))

SEP = "=" * 60

def section(title):
    print(f"\n{SEP}")
    print(f"  {title}")
    print(SEP)

# 1. PROJETOS
section("PROJETOS")
projetos = sb.table("projetos").select("*").execute().data
print(f"Total: {len(projetos)} registros")
cols_proj = list(projetos[0].keys()) if projetos else []
print(f"Colunas: {cols_proj}")
for p in projetos:
    print(f"  [{p['status']}] {p['titulo']} | workflow: {p.get('workflow_step')} | diretor: {p.get('diretor')} | local: {p.get('local_filmagem')} | data_filmagem: {p.get('data_filmagem')}")

# 2. CLIENTES
section("CLIENTES")
clientes = sb.table("clientes").select("*").execute().data
print(f"Total: {len(clientes)} registros")
cols_cli = list(clientes[0].keys()) if clientes else []
print(f"Colunas: {cols_cli}")
for c in clientes:
    print(f"  {c['nome']} | empresa: {c.get('empresa')} | email: {c.get('email')} | tel: {c.get('telefone')}")

# 3. CONTATOS
section("CONTATOS")
contatos = sb.table("contatos").select("*").execute().data
print(f"Total: {len(contatos)} registros")
if contatos:
    print(f"Colunas: {list(contatos[0].keys())}")
    for ct in contatos:
        print(f"  {ct['nome']} | cargo: {ct.get('cargo')} | cliente_id: {ct.get('cliente_id')}")
else:
    print("  [VAZIO] Nenhum contato cadastrado!")

# 4. TAREFAS
section("TAREFAS")
tarefas = sb.table("tarefas").select("*").execute().data
print(f"Total: {len(tarefas)} registros")
if tarefas:
    print(f"Colunas: {list(tarefas[0].keys())}")
for t in tarefas:
    print(f"  [{t['status']}] {t['titulo']} | prior: {t.get('prioridade')} | resp: {t.get('responsavel')} | limite: {t.get('data_limite')}")

# 5. FINANCEIRO_PROJETO
section("FINANCEIRO_PROJETO")
fin = sb.table("financeiro_projeto").select("*").execute().data
print(f"Total: {len(fin)} registros")
if fin:
    print(f"Colunas: {list(fin[0].keys())}")
total_in = sum(f['valor'] for f in fin if f['tipo'] == 'Entrada' and f['status_pagamento'] == 'Pago')
total_out = sum(f['valor'] for f in fin if f['tipo'] == 'Saida' and f['status_pagamento'] == 'Pago')
for f in fin:
    print(f"  [{f['tipo']}] {f['descricao']} | R${f['valor']} | {f['status_pagamento']} | cat: {f.get('categoria')}")
print(f"  ENTRADAS PAGAS: R${total_in:,.0f} | SAIDAS PAGAS: R${total_out:,.0f} | SALDO: R${total_in-total_out:,.0f}")

# 6. ORCAMENTOS
section("ORCAMENTOS")
orc = sb.table("orcamentos").select("*").execute().data
print(f"Total: {len(orc)} registros")
if orc:
    print(f"Colunas: {list(orc[0].keys())}")
for o in orc:
    print(f"  {o['nome']} | status: {o['status']} | total: R${o['valor_total']} | custo_prev: R${o['custo_previsto']}")

# 7. ORCAMENTO_CATEGORIAS
section("ORCAMENTO_CATEGORIAS")
cats = sb.table("orcamento_categorias").select("*").execute().data
print(f"Total: {len(cats)} registros")
if cats:
    print(f"Colunas: {list(cats[0].keys())}")
for c in cats:
    print(f"  {c['categoria']} | R${c['valor_alocado']} | orc_id: {str(c['orcamento_id'])[:8]}")

# 8. ANOTACOES
section("ANOTACOES")
notas = sb.table("anotacoes").select("*").execute().data
print(f"Total: {len(notas)} registros")
if notas:
    print(f"Colunas: {list(notas[0].keys())}")
    for n in notas:
        print(f"  {n['titulo']} | {n.get('autor')} | {n.get('data')}")
else:
    print("  [VAZIO] Nenhuma anotacao cadastrada!")

# 9. EQUIPAMENTOS
section("EQUIPAMENTOS")
eqps = sb.table("equipamentos").select("*").execute().data
print(f"Total: {len(eqps)} registros")
if eqps:
    print(f"Colunas: {list(eqps[0].keys())}")
for e in eqps:
    print(f"  {e['nome']} | cat: {e['categoria']} | patrimonio: {e.get('patrimonio')} | status: {e['status']}")

# 10. ALOCACAO_EQUIPAMENTOS
section("ALOCACAO_EQUIPAMENTOS")
aloc = sb.table("alocacao_equipamentos").select("*, equipamentos(nome), projetos(titulo)").execute().data
print(f"Total: {len(aloc)} registros")
if aloc:
    for a in aloc:
        print(f"  {a.get('equipamentos',{}).get('nome','?')} -> {a.get('projetos',{}).get('titulo','?')} | {a.get('status')}")
else:
    print("  [VAZIO] Nenhuma alocacao cadastrada!")

# 11. RESUMO DOS GAPS
section("RESUMO - O QUE ESTA FALTANDO NO BANCO")
gaps = []
if len(contatos) == 0: gaps.append("CONTATOS: tabela vazia")
if len(notas) == 0: gaps.append("ANOTACOES: tabela vazia")
if len(aloc) == 0: gaps.append("ALOCACAO_EQUIPAMENTOS: tabela vazia")
for p in projetos:
    if not p.get('briefing'): gaps.append(f"PROJETO '{p['titulo']}': sem briefing")
    if not p.get('data_filmagem'): gaps.append(f"PROJETO '{p['titulo']}': sem data_filmagem")

if gaps:
    print("GAPS ENCONTRADOS:")
    for g in gaps: print(f"  - {g}")
else:
    print("  Nenhum gap encontrado!")

print(f"\n{SEP}")
print("  AUDIT COMPLETO")
print(SEP)
