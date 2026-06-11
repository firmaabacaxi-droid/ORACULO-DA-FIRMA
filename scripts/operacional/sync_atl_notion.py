import os
import json
import urllib.request
import time

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
            print(f"Erro: {e}")
            return {"error": str(e)}

# 1. Create Database
create_db_payload = {
    "parent": {"type": "page_id", "page_id": PARENT_PAGE_ID},
    "title": [{"type": "text", "text": {"content": "📡 ATL 2026 - LEADS"}}],
    "properties": {
        "Organização": {"title": {}},
        "Potencial": {"select": {
            "options": [
                {"name": "Alto", "color": "red"},
                {"name": "Médio", "color": "orange"},
                {"name": "Baixo", "color": "yellow"}
            ]
        }},
        "Site": {"url": {}},
        "E-mail": {"email": {}},
        "WhatsApp": {"phone_number": {}},
        "Responsável": {"rich_text": {}},
        "Localização": {"rich_text": {}},
        "DNA / Atuação": {"rich_text": {}},
        "Observações": {"rich_text": {}}
    }
}

print("Criando banco de dados no Notion...")
db_res = post_request("https://api.notion.com/v1/databases", create_db_payload)

if "error" in db_res:
    print("Falha ao criar banco de dados.")
    exit(1)

NEW_DATABASE_ID = db_res["id"]
print(f"Banco de dados criado! ID: {NEW_DATABASE_ID}")

# 2. Prepare Leads from Supabase data
leads = [
    {"nome_organizacao": "APIB — Articulação dos Povos Indígenas do Brasil", "tipo": "Organização Nacional", "site": "apiboficial.org", "email": "comunicacao@apiboficial.org", "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": "Brasília", "estado": "DF", "descricao": "Maior articulação de povos indígenas do Brasil. Organizadora do ATL.", "potencial": "Alto", "observacoes": "Organiza o ATL."},
    {"nome_organizacao": "ISA — Instituto Socioambiental", "tipo": "Instituto", "site": "socioambiental.org", "email": "isadf@socioambiental.org", "telefone": "(61) 3035-5114", "whatsapp": None, "nome_responsavel": "Adriana Ramos", "cidade": "Brasília", "estado": "DF", "descricao": "Referência em defesa de povos indígenas. Produz conteúdo audiovisual.", "potencial": "Alto", "observacoes": "Sede em Brasília."},
    {"nome_organizacao": "CTI — Centro de Trabalho Indigenista", "tipo": "ONG", "site": "trabalhoindigenista.org.br", "email": "contato@trabalhoindigenista.org.br", "telefone": "(61) 3349-7769", "whatsapp": None, "nome_responsavel": None, "cidade": "Brasília", "estado": "DF", "descricao": "ONG com vasta produção audiovisual.", "potencial": "Alto", "observacoes": "Forte em documentários."},
    {"nome_organizacao": "CIMI — Conselho Indigenista Missionário", "tipo": "ONG Religiosa", "site": "cimi.org.br", "email": "nacional@cimi.org.br", "telefone": "(61) 2106-1650", "whatsapp": None, "nome_responsavel": None, "cidade": "Brasília", "estado": "DF", "descricao": "50 anos de defesa indígena.", "potencial": "Alto", "observacoes": "Base no Conic/Brasília."},
    {"nome_organizacao": "COIAB — Coordenação das Organizações Indígenas da Amazônia Brasileira", "tipo": "Organização Regional", "site": "coiab.org.br", "email": "comunicacao@coiab.org.br", "telefone": None, "whatsapp": None, "nome_responsavel": "Edinho Kambeba", "cidade": "Manaus", "estado": "AM", "descricao": "Rede de 80 jovens comunicadores.", "potencial": "Alto", "observacoes": "Impacto na Amazônia e ATL."},
    {"nome_organizacao": "Vídeo nas Aldeias", "tipo": "ONG / Produtora", "site": "videonasaldeias.org.br", "email": "vcarelli@gmail.com", "telefone": "+55 81 99633-8396", "whatsapp": "+55 81 99633-8396", "nome_responsavel": "Vincent Carelli", "cidade": "Recife", "estado": "PE", "descricao": "Pioneiro do audiovisual indígena.", "potencial": "Alto", "observacoes": "Referência absoluta."},
    {"nome_organizacao": "ICV — Instituto Centro de Vida", "tipo": "Instituto", "site": "icv.org.br", "email": "comunicacao@icv.org.br", "telefone": "(65) 3621-3148", "whatsapp": None, "nome_responsavel": None, "cidade": "Cuiabá", "estado": "MT", "descricao": "Lançou edital recente para filmagem.", "potencial": "Alto", "observacoes": "Foco em sustentabilidade."},
    {"nome_organizacao": "IPAM — Instituto de Pesquisa Ambiental da Amazônia", "tipo": "Instituto", "site": "ipam.org.br", "email": "comunicacao@ipam.org.br", "telefone": "(61) 2109-4150", "whatsapp": None, "nome_responsavel": None, "cidade": "Brasília", "estado": "DF", "descricao": "Forte atuação em ciência e política ambiental.", "potencial": "Alto", "observacoes": "Atendimento em Brasília."},
    {"nome_organizacao": "Associação Kanindé — Defesa Etnoambiental", "tipo": "ONG", "site": "kaninde.org.br", "email": "comunica.kaninde@gmail.com", "telefone": "(69) 3229-2826", "whatsapp": "(69) 99984-8907", "nome_responsavel": "Neidinha Suruí", "cidade": "Porto Velho", "estado": "RO", "descricao": "ONG liderada por Neidinha Suruí.", "potencial": "Alto", "observacoes": "Foco em proteção territorial."},
    {"nome_organizacao": "CGY — Comissão Guarani Yvyrupa", "tipo": "Organização Indígena", "site": "yvyrupa.org.br", "email": None, "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": None, "estado": "Sul/Sudeste", "descricao": "Povo Guarani. Atuação em demarcação.", "potencial": "Alto", "observacoes": "ATL via redes sociais."},
    {"nome_organizacao": "Hutukara Associação Yanomami", "tipo": "Associação", "site": "hutukara.org", "email": "info@hutukara.org", "telefone": "(95) 3627-7970", "whatsapp": None, "nome_responsavel": "Dario Kopenawa", "cidade": "Boa Vista", "estado": "RR", "descricao": "Proteção do território Yanomami.", "potencial": "Alto", "observacoes": "Luta contra garimpo."},
    {"nome_organizacao": "Instituto Raoni", "tipo": "Instituto", "site": "institutoraoni.org.br", "email": "contato@institutoraoni.org.br", "telefone": None, "whatsapp": "66 9951-7742", "nome_responsavel": "Cacique Raoni", "cidade": "Peixoto de Azevedo", "estado": "MT", "descricao": "Instituto da maior liderança mundial.", "potencial": "Alto", "observacoes": "Figura central no ATL."},
    {"nome_organizacao": "OPAN — Operação Amazônia Nativa", "tipo": "ONG", "site": "amazonianativa.org.br", "email": "comunicacao@amazonianativa.org.br", "telefone": "(65) 3322-2980", "whatsapp": "(65) 98476-5663", "nome_responsavel": None, "cidade": "Cuiabá", "estado": "MT", "descricao": "Formação de jovens comunicadores.", "potencial": "Alto", "observacoes": "Pioneiros em indigenismo."},
    {"nome_organizacao": "CIR — Conselho Indígena de Roraima", "tipo": "Organização Indígena", "site": "cir.org.br", "email": "comunicacao@cir.org.br", "telefone": "(95) 8418-5553", "whatsapp": None, "nome_responsavel": None, "cidade": "Boa Vista", "estado": "RR", "descricao": "Rede Wakywaa de cinema.", "potencial": "Alto", "observacoes": "Muito engajados no digital."},
    {"nome_organizacao": "APOINME", "tipo": "Organização Indígena", "site": "apoinme.org", "email": "secretaria@apoinme.org", "telefone": "(81) 3429-4599", "whatsapp": "(27) 99608-3967", "nome_responsavel": "Alexandre Pankararu", "cidade": "Olinda", "estado": "PE", "descricao": "Regional Nordeste e Sudeste da APIB.", "potencial": "Alto", "observacoes": "Mobilização territorial forte."},
    {"nome_organizacao": "FEPIPA", "tipo": "Federação Indígena", "site": None, "email": "ascom@sepi.pa.gov.br", "telefone": "(94) 9212-9391", "whatsapp": None, "nome_responsavel": "Puyr Tembé", "cidade": "Ananindeua", "estado": "PA", "descricao": "Povos Indígenas do Pará.", "potencial": "Alto", "observacoes": "Puyr é figura proeminente."},
    {"nome_organizacao": "FEPOIMT", "tipo": "Federação Indígena", "site": "fepoimt.org", "email": "presidencia@fepoimt.org", "telefone": "0800 646 3910", "whatsapp": None, "nome_responsavel": None, "cidade": "Cuiabá", "estado": "MT", "descricao": "Povos de Mato Grosso (Xingu).", "potencial": "Alto", "observacoes": " Regional chave da APIB."},
    {"nome_organizacao": "ARPINSUL", "tipo": "Federação Indígena", "site": None, "email": "arpinsul@yahoo.com.br", "telefone": "(41) 3092-4097", "whatsapp": None, "nome_responsavel": None, "cidade": "Curitiba", "estado": "PR", "descricao": "Guarani e Kaingang do Sul.", "potencial": "Alto", "observacoes": "Foco em retomada."},
    {"nome_organizacao": "ARPINSUDESTE", "tipo": "Federação Indígena", "site": None, "email": None, "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": None, "estado": "Sudeste", "descricao": "Povos do Litoral e Sudeste.", "potencial": "Alto", "observacoes": "Via APIB."},
    {"nome_organizacao": "Conectas", "tipo": "ONG", "site": "conectas.org", "email": "comunicacao@conectas.org", "telefone": "(11) 3884-7440", "whatsapp": "(11) 99343-0669", "nome_responsavel": None, "cidade": "São Paulo", "estado": "SP", "descricao": "Direitos Humanos em escala global.", "potencial": "Médio", "observacoes": "Defesa socioambiental."},
    {"nome_organizacao": "Amazônia Real", "tipo": "Agência Jornalismo", "site": "amazoniareal.com.br", "email": "redacao@amazoniareal.com.br", "telefone": None, "whatsapp": "(92) 98194-6990", "nome_responsavel": "Kátia Brasil", "cidade": "Manaus", "estado": "AM", "descricao": "Jornalismo independente visceral.", "potencial": "Médio", "observacoes": "Parceria estratégica."},
    {"nome_organizacao": "Amarillo Produções", "tipo": "Produtora", "site": "amarillo.art.br", "email": "contato@amarillo.art.br", "telefone": "(31) 99212-0801", "whatsapp": "(31) 99212-0801", "nome_responsavel": "Aiano Bemfica", "cidade": "Belo Horizonte", "estado": "MG", "descricao": "Cinema documental premiado.", "potencial": "Médio", "observacoes": "Possível co-produção."},
    {"nome_organizacao": "Bang Filmes", "tipo": "Produtora", "site": "bangfilmes.com.br", "email": "juliana@bangfilmes.com.br", "telefone": "(21) 2286-1991", "whatsapp": "(21) 98758-7282", "nome_responsavel": "Juliana de Carvalho", "cidade": "Rio de Janeiro", "estado": "RJ", "descricao": "Projetos de diversidade cultural.", "potencial": "Médio", "observacoes": "Foco em longas e docs."},
    {"nome_organizacao": "Fundo Brasil", "tipo": "Fundo", "site": "fundobrasil.org.br", "email": "relacionamento@fundobrasil.org.br", "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": "São Paulo", "estado": "SP", "descricao": "Apoio a projetos de direitos humanos.", "potencial": "Médio", "observacoes": "Ponte para novos clientes."},
    {"nome_organizacao": "Imaflora", "tipo": "Instituto", "site": "imaflora.org", "email": "imaflora@imaflora.org", "telefone": "(19) 3429-0800", "whatsapp": None, "nome_responsavel": None, "cidade": "Piracicaba", "estado": "SP", "descricao": "Manejo florestal e conservação.", "potencial": "Médio", "observacoes": "Foco em biomas."},
    {"nome_organizacao": "Imazon", "tipo": "Instituto", "site": "imazon.org.br", "email": "bruno@imazon.org.br", "telefone": "(91) 3182-4000", "whatsapp": None, "nome_responsavel": None, "cidade": "Belém", "estado": "PA", "descricao": "Monitoramento e ciência ambiental.", "potencial": "Médio", "observacoes": "Dados para imagens."},
    {"nome_organizacao": "Greenpeace Brasil", "tipo": "ONG", "site": "greenpeace.org.br", "email": "relacionamento@greenpeace.org", "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": "São Paulo", "estado": "SP", "descricao": "Campanhas globais de ativismo.", "potencial": "Médio", "observacoes": "Imagens de impacto."},
    {"nome_organizacao": "Instituto Catitu", "tipo": "Instituto", "site": "institutocatitu.org.br", "email": None, "telefone": "(65) 2127-3124", "whatsapp": None, "nome_responsavel": "Mari Corrêa", "cidade": None, "estado": "MT", "descricao": "Cineastas indígenas mulheres.", "potencial": "Médio", "observacoes": "Rede Katahirine."},
    {"nome_organizacao": "Mídia Indígena", "tipo": "Coletivo", "site": "midiaindigena.org", "email": None, "telefone": None, "whatsapp": None, "nome_responsavel": "Erisvan Guajajara", "cidade": None, "estado": "Nacional", "descricao": "Ativismo digital direto no ATL.", "potencial": "Médio", "observacoes": "Instagram potente."},
    {"nome_organizacao": "CPI-SP", "tipo": "ONG", "site": "cpisp.org.br", "email": "imprensa@cpisp.org.br", "telefone": "(11) 3814-7228", "whatsapp": "(11) 94483-2410", "nome_responsavel": None, "cidade": "São Paulo", "estado": "SP", "descricao": "Educação e direitos territoriais.", "potencial": "Médio", "observacoes": "Povos e Quilombos."},
    {"nome_organizacao": "SOS Amazônia", "tipo": "ONG", "site": "sosamazonia.org.br", "email": "miguel@sosamazonia.org.br", "telefone": "(68) 3223-1036", "whatsapp": "(68) 99240-5993", "nome_responsavel": None, "cidade": "Rio Branco", "estado": "AC", "descricao": "Conservação no Acre.", "potencial": "Médio", "observacoes": "Projeto Aliança."},
    {"nome_organizacao": "Fundo Casa", "tipo": "Fundo", "site": "casa.org.br", "email": "contato@casa.org.br", "telefone": "(11) 2311-1512", "whatsapp": None, "nome_responsavel": None, "cidade": None, "estado": "Nacional", "descricao": "Financia organizações de base.", "potencial": "Médio", "observacoes": "Conectado ao ATL."},
    {"nome_organizacao": "CPA Amazônia", "tipo": "Coletivo", "site": "cpa.org.br", "email": "centropopulardoaudiovisual@gmail.com", "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": "Manaus", "estado": "AM", "descricao": "Audiovisual e direitos humanos.", "potencial": "Médio", "observacoes": "Alinhado com a Firma."},
    {"nome_organizacao": "Tocha Filmes", "tipo": "Produtora", "site": "tochafilmes.com.br", "email": None, "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": "São Paulo", "estado": "SP", "descricao": "Docs socioambientais premiados.", "potencial": "Médio", "observacoes": "Tocha Play."},
    {"nome_organizacao": "Instituto Kabu", "tipo": "Instituto", "site": "kabu.org.br", "email": "contato@kabu.org.br", "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": "Novo Progresso", "estado": "PA", "descricao": "Povo Kayapó. Audiovisual próprio.", "potencial": "Médio", "observacoes": "Foco Amazônia."},
    {"nome_organizacao": "Rede Katahirine", "tipo": "Rede", "site": "katahirine.org.br", "email": "redekatahirine@gmail.com", "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": None, "estado": "Nacional", "descricao": "Mulheres cineastas indígenas.", "potencial": "Médio", "observacoes": "Sensibilidade e arte."},
    {"nome_organizacao": "FUNAI", "tipo": "Órgão Gov", "site": "gov.br/funai", "email": "comunicacao@funai.gov.br", "telefone": "(61) 3247-6611", "whatsapp": "(61) 99813-9643", "nome_responsavel": None, "cidade": "Brasília", "estado": "DF", "descricao": "Órgão indigenista federal.", "potencial": "Baixo", "observacoes": "Licitatório/Lento."},
    {"nome_organizacao": "WWF Brasil", "tipo": "ONG", "site": "wwf.org.br", "email": "imprensa@wwf.org.br", "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": "Brasília", "estado": "DF", "descricao": "Sede em Brasília. Parcerias pontuais.", "potencial": "Baixo", "observacoes": "Foco conservação."},
    {"nome_organizacao": "WITNESS Brasil", "tipo": "ONG", "site": "witness.org", "email": None, "telefone": None, "whatsapp": None, "nome_responsavel": None, "cidade": None, "estado": "Nacional", "descricao": "Vídeo como ferramenta de luta.", "potencial": "Baixo", "observacoes": "Parceiro estratégico."},
    {"nome_organizacao": "Coletivo Thul'se", "tipo": "Coletivo", "site": None, "email": "thulseaudiovisual@gmail.com", "telefone": "(87) 99195-9657", "whatsapp": "(87) 99195-9657", "nome_responsavel": None, "cidade": "Pernambuco", "estado": "PE", "descricao": "Cinema indígena independente.", "potencial": "Médio", "observacoes": "Troca técnica."}
]

# 3. Insert Items into the New Database
print(f"Inserindo {len(leads)} leads no Notion...")
count = 0
for lead in leads:
    props = {
        "Organização": {"title": [{"text": {"content": lead["nome_organizacao"]}}]},
        "Potencial": {"select": {"name": lead["potencial"]}},
    }
    if lead["site"]: props["Site"] = {"url": lead["site"]}
    if lead["email"]: props["E-mail"] = {"email": lead["email"]}
    if lead["whatsapp"]: props["WhatsApp"] = {"phone_number": lead["whatsapp"]}
    
    # Rich text fields
    loc = f"{lead['cidade'] or ''}, {lead['estado'] or ''}".strip(", ")
    props["Localização"] = {"rich_text": [{"text": {"content": loc}}]}
    props["Responsável"] = {"rich_text": [{"text": {"content": lead["nome_responsavel"] or ""}}]}
    props["DNA / Atuação"] = {"rich_text": [{"text": {"content": lead["descricao"] or ""}}]}
    props["Observações"] = {"rich_text": [{"text": {"content": lead["observacoes"] or ""}}]}

    page_payload = {
        "parent": {"database_id": NEW_DATABASE_ID},
        "properties": props
    }
    
    res = post_request("https://api.notion.com/v1/pages", page_payload)
    if "error" in res:
        print(f"Erro no lead {lead['nome_organizacao']}: {res['error']}")
    else:
        count += 1
    
    time.sleep(0.3) # Avoid rate limits

print(f"Concluído! {count} leads inseridos no Notion.")
