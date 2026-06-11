import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
sb = create_client(url, key)

print("=" * 55)
print("ORACULO 2.0 - DEBUG DO BANCO DE DADOS")
print("=" * 55)

# Projetos
projetos = sb.table("projetos").select("id, titulo, status, valor_contrato, workflow_step, diretor").execute().data
print(f"\n[PROJETOS] Total: {len(projetos)}")
for p in projetos:
    print(f"  - {p['titulo']} | Status: {p['status']} | Workflow: {p.get('workflow_step','?')} | Diretor: {p.get('diretor','?')} | Valor: R${p.get('valor_contrato',0):,.0f}")

# Clientes
clientes = sb.table("clientes").select("nome, empresa").execute().data
print(f"\n[CLIENTES] Total: {len(clientes)}")
for c in clientes:
    print(f"  - {c['nome']} ({c.get('empresa','-')})")

# Orcamentos
orcamentos = sb.table("orcamentos").select("nome, status, valor_total, custo_previsto").execute().data
print(f"\n[ORCAMENTOS] Total: {len(orcamentos)}")
for o in orcamentos:
    print(f"  - {o['nome']} | Status: {o['status']} | Total: R${o['valor_total']:,.0f} | Custo Prev: R${o['custo_previsto']:,.0f}")

# Categorias de orcamento
cats = sb.table("orcamento_categorias").select("categoria, valor_alocado").execute().data
print(f"\n[CATEGORIAS ORCAMENTO] Total: {len(cats)}")
for c in cats:
    print(f"  - {c['categoria']}: R${c['valor_alocado']:,.0f}")

# Financeiro
financeiro = sb.table("financeiro_projeto").select("descricao, tipo, valor, status_pagamento, categoria").execute().data
print(f"\n[FINANCEIRO_PROJETO] Total: {len(financeiro)}")
total_entradas = sum(f['valor'] for f in financeiro if f['tipo'] == 'Entrada' and f['status_pagamento'] == 'Pago')
total_saidas = sum(f['valor'] for f in financeiro if f['tipo'] == 'Saida' and f['status_pagamento'] == 'Pago')
for f in financeiro:
    print(f"  - [{f['tipo']}] {f['descricao']}: R${f['valor']:,.0f} | Status: {f['status_pagamento']} | Cat: {f.get('categoria','-')}")
print(f"  => ENTRADAS PAGAS: R${total_entradas:,.0f}")
print(f"  => SAIDAS PAGAS:   R${total_saidas:,.0f}")
print(f"  => SALDO:          R${total_entradas - total_saidas:,.0f}")

# Tarefas
tarefas = sb.table("tarefas").select("titulo, status, prioridade").execute().data
print(f"\n[TAREFAS] Total: {len(tarefas)}")
for t in tarefas:
    print(f"  - {t['titulo']} | Status: {t['status']} | Prior: {t['prioridade']}")

# Equipamentos
eqps = sb.table("equipamentos").select("nome, categoria, status").execute().data
print(f"\n[EQUIPAMENTOS] Total: {len(eqps)}")
for e in eqps:
    print(f"  - {e['nome']} ({e['categoria']}) | {e['status']}")

# Anotacoes
notas = sb.table("anotacoes").select("titulo, autor").execute().data
print(f"\n[ANOTACOES] Total: {len(notas)}")
for n in notas:
    print(f"  - {n['titulo']} | Autor: {n.get('autor','-')}")

print("\n" + "=" * 55)
print("DEBUG COMPLETO!")
print("=" * 55)
