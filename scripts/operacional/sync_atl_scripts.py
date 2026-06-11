import os
import json
import urllib.request

def load_env(filepath):
    env_vars = {}
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value
    return env_vars

env = load_env('.env')
NOTION_TOKEN = env.get("NOTION_TOKEN")
PARENT_PAGE_ID = "31389da3-9902-8194-a51a-f200c03b7783"

def post_request(url, payload):
    data = json.dumps(payload).encode("utf-8")
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    }
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        if hasattr(e, 'read'):
            err = e.read().decode('utf-8')
            print(f"Erro na API: {err}")
            return {"error": err}
        else:
            print(f"Erro: {str(e)}")
            return {"error": str(e)}

# 1. Create Scripts Database
create_db_payload = {
    "parent": {"type": "page_id", "page_id": PARENT_PAGE_ID},
    "title": [{"type": "text", "text": {"content": "📋 ROTEIROS DE ABORDAGEM ATL 2026"}}],
    "properties": {
        "Classificação": {"title": {}},
        "Plataforma": {"select": {
            "options": [
                {"name": "WhatsApp", "color": "green"},
                {"name": "E-mail", "color": "blue"}
            ]
        }},
        "Roteiro / Texto": {"rich_text": {}}
    }
}

print("Criando banco de dados de roteiros no Notion...")
db_res = post_request("https://api.notion.com/v1/databases", create_db_payload)

if "error" in db_res:
    print("Falha ao criar banco de dados.")
    exit(1)

SCRIPTS_DB_ID = db_res["id"]
print(f"Banco de dados de roteiros criado! ID: {SCRIPTS_DB_ID}")

# 2. Add Scripts
scripts = [
    {
        "classificacao": "ALTO POTENCIAL - ALIANÇA",
        "plataforma": "WhatsApp",
        "texto": "Olá, [Nome]. Tudo bem? Aqui é o [Seu Nome], da Firma Abacaxi. O ATL 2026 já está no horizonte, e estou te escrevendo com uma pergunta central: Qual história a [Instituição] quer contar este ano? Estamos há 6 anos acompanhando de perto a pulsação desse evento e registrando sua força. Sabemos que o que vocês constroem lá é denso de significado. Queremos colocar nossa experiência e olhar cinematográfico para traduzir a narrativa de vocês em imagens que respirem e permaneçam. Você teria 5 minutinhos para conversarmos sobre como podemos ser o braço de memória de vocês este ano? Abraço fraterno."
    },
    {
        "classificacao": "ALTO POTENCIAL - ALIANÇA",
        "plataforma": "E-mail",
        "texto": "Assunto: ATL 2026 | Uma parceria de memória e narrativa (Firma Abacaxi)\n\nOlá, equipe da [Instituição],\n\nO Acampamento Terra Livre completa mais um ciclo em Brasília, e a pergunta que nos move é: Qual história vocês querem contar em 2026?\n\nNa Firma Abacaxi, temos o privilégio de registrar o ATL há 6 anos, vivenciando a força dessa mobilização. Entendemos que o trabalho da [Instituição] possui camadas que vão muito além do registro documental comum. Oferecemos nosso suporte e experiência técnica para traduzir a presença de vocês no ATL em uma linguagem sensorial e cinematográfica, garantindo que a força da luta seja guardada com a estética que ela merece. Estaremos com base operacional em Brasília durante todo o evento. Gostaríamos de conversar sobre como podemos potencializar a narrativa de vocês este ano.\n\nAtenciosamente,\n[Seu Nome] | Firma Abacaxi"
    },
    {
        "classificacao": "MÉDIO POTENCIAL - DESCOBERTA",
        "plataforma": "WhatsApp",
        "texto": "Olá, [Nome]. Tudo bem? Aqui é o [Seu Nome], da Firma Abacaxi. Estamos nos preparando para o ATL 2026 e gostaríamos de saber: Qual história vocês querem contar este ano? Registramos o ATL há 6 anos e admiramos a atuação da [Instituição]. Acreditamos que o impacto de vocês ficaria ainda mais potente com uma tradução audiovisual cinematográfica e sensorial. Se precisarem de suporte artístico para registrar a jornada de vocês em Brasília, estamos prontos para somar. Podemos marcar uma conversa rápida? Abraço."
    },
    {
        "classificacao": "MÉDIO POTENCIAL - DESCOBERTA",
        "plataforma": "E-mail",
        "texto": "Assunto: ATL 2026 | Olhar artístico para a narrativa da [Instituição]\n\nOlá, [Nome] e equipe da [Instituição],\n\nO ATL 2026 se aproxima, trazendo a energia política e cultural que marca Brasília todos os anos. Qual história a [Instituição] pretende contar nesta edição?\n\nA Firma Abacaxi possui um histórico de 6 anos de filmagem e acompanhamento do ATL. Temos a experiência local e o olhar técnico necessário para transformar a presença de vocês em uma peça audiovisual de alto impacto e sensibilidade. Se estiverem em busca de um suporte de excelência para traduzir a alma da instituição neste evento, gostaríamos de apresentar nossa proposta.\n\nSeguimos à disposição,\n[Seu Nome] | Firma Abacaxi"
    },
    {
        "classificacao": "BAIXO POTENCIAL - APOIO",
        "plataforma": "WhatsApp",
        "texto": "Olá! Sou o [Seu Nome], da Firma Abacaxi. Estaremos em Brasília para o ATL 2026, onde já atuamos há 6 anos com registro audiovisual. Gostaríamos de nos colocar à disposição como ponto de apoio e suporte técnico para a [Instituição]. Se precisarem de registros pontuais ou suporte criativo durante o evento, contem conosco. Um abraço!"
    },
    {
        "classificacao": "BAIXO POTENCIAL - APOIO",
        "plataforma": "E-mail",
        "texto": "Assunto: ATL 2026 | Suporte Audiovisual e Ponto de Apoio em Brasília\n\nOlá, equipe da [Instituição],\n\nCom a proximidade do ATL 2026, a Firma Abacaxi gostaria de se colocar à disposição para suportar as necessidades audiovisuais de vocês durante o evento. Registramos o ATL há 6 anos e conhecemos bem a dinâmica do acampamento e de Brasília. Se precisarem de capturas pontuais, edições rápidas ou qualquer suporte técnico para contar a história de vocês este ano, sintam-se à vontade para nos contatar.\n\nAtenciosamente,\n[Seu Nome] | Firma Abacaxi"
    }
]

print(f"Inserindo {len(scripts)} roteiros no Notion...")
for s in scripts:
    page_payload = {
        "parent": {"database_id": SCRIPTS_DB_ID},
        "properties": {
            "Classificação": {"title": [{"text": {"content": s["classificacao"]}}]},
            "Plataforma": {"select": {"name": s["plataforma"]}},
            "Roteiro / Texto": {"rich_text": [{"text": {"content": s["texto"]}}]}
        }
    }
    post_request("https://api.notion.com/v1/pages", page_payload)

print("Processo concluído!")
