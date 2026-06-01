import { 
  Projeto, 
  Cliente, 
  Contato, 
  Tarefa, 
  Proposta, 
  CrmOportunidade, 
  ItemOrcamento, 
  NotionBlock 
} from "./types";

const NOTION_TOKEN = process.env.NOTION_TOKEN || "";
const HEADERS = {
  "Authorization": `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28", // Versão estável da API
  "Content-Type": "application/json"
};

// IDs dos bancos carregados das variáveis de ambiente
const DBS = {
  PROJECTS: process.env.NEXT_PUBLIC_NOTION_DB_PROJECTS || "",
  CLIENTES: process.env.NEXT_PUBLIC_NOTION_DB_CLIENTES || "",
  CONTATOS: process.env.NEXT_PUBLIC_NOTION_DB_CONTATOS || "",
  TAREFAS: process.env.NEXT_PUBLIC_NOTION_DB_TAREFAS || "",
  PROPOSTAS: process.env.NEXT_PUBLIC_NOTION_DB_PROPOSTAS || "",
  CRM: process.env.NEXT_PUBLIC_NOTION_DB_CRM || "",
  ORCAMENTOS: process.env.NEXT_PUBLIC_NOTION_DB_ORCAMENTOS || ""
};

// Função base de fetch para comunicação em tempo real com 0s de cache
async function notionFetch(endpoint: string, options: RequestInit = {}) {
  if (!NOTION_TOKEN || NOTION_TOKEN.startsWith("secret_your_notion")) {
    console.warn(`[NOTION] Token ausente ou padrão. Ignorando chamada para: ${endpoint}`);
    return { results: [] };
  }

  const url = `https://api.notion.com/v1/${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...HEADERS,
      ...options.headers
    },
    // Força o Next.js App Router a desabilitar cache em tempo de renderização
    cache: "no-store"
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[NOTION ERROR] HTTP ${response.status} em ${endpoint}:`, errorText);
    throw new Error(`Erro na API do Notion: ${response.statusText}`);
  }

  return response.json();
}

// Helpers de Extração de Propriedades do Notion (Robustos e tolerantes a nulos)

function getText(prop: any): string {
  if (!prop || prop.type !== "rich_text" || !prop.rich_text) return "";
  return prop.rich_text.map((t: any) => t.plain_text).join("") || "";
}

function getTitle(prop: any): string {
  if (!prop || prop.type !== "title" || !prop.title) return "";
  return prop.title.map((t: any) => t.plain_text).join("") || "";
}

function getSelect(prop: any): string {
  if (!prop || prop.type !== "select" || !prop.select) return "";
  return prop.select.name || "";
}

function getNumber(prop: any): number {
  if (!prop || prop.type !== "number" || typeof prop.number !== "number") return 0;
  return prop.number;
}

function getDate(prop: any): string | null {
  if (!prop || prop.type !== "date" || !prop.date) return null;
  return prop.date.start || null;
}

function getUrl(prop: any): string | null {
  if (!prop || prop.type !== "url" || !prop.url) return null;
  return prop.url;
}

function getEmail(prop: any): string | null {
  if (!prop || prop.type !== "email" || !prop.email) return null;
  return prop.email;
}

function getPhone(prop: any): string | null {
  if (!prop || prop.type !== "phone_number" || !prop.phone_number) return null;
  return prop.phone_number;
}

function getRelations(prop: any): string[] {
  if (!prop || prop.type !== "relation" || !prop.relation) return [];
  return prop.relation.map((r: any) => r.id);
}

function getRollupNumber(prop: any): number {
  if (!prop || prop.type !== "rollup" || !prop.rollup) return 0;
  if (prop.rollup.type === "number") return prop.rollup.number || 0;
  if (prop.rollup.type === "array") {
    // Caso seja um array de números, soma ou pega o primeiro
    const numbers = prop.rollup.array
      .map((item: any) => (item.type === "number" ? item.number : 0))
      .filter((n: any) => typeof n === "number");
    return numbers.reduce((sum: number, n: number) => sum + n, 0);
  }
  return 0;
}

function getMultiSelect(prop: any): string[] {
  if (!prop || prop.type !== "multi_select" || !prop.multi_select) return [];
  return prop.multi_select.map((m: any) => m.name) || [];
}

function mapEtapaToStatus(etapa: string): string {
  if (!etapa) return "Ativos";
  const e = etapa.toLowerCase();
  if (e.includes("pré-produção") || e.includes("pre-produção") || e.includes("crm") || e.includes("prospecção") || e.includes("briefing") || e.includes("abordagem") || e.includes("proposta") || e.includes("orçamento")) {
    return "Pré-produção";
  }
  if (e.includes("produção") || e.includes("producao")) {
    return "Em produção";
  }
  if (e.includes("edição") || e.includes("edicao") || e.includes("acompanhamento")) {
    return "Edição";
  }
  if (e.includes("entrega") || e.includes("nota fiscal") || e.includes("pagamento") || e.includes("concluído") || e.includes("concluido")) {
    return "Concluído";
  }
  if (e.includes("cancelado")) {
    return "Cancelado";
  }
  return "Pré-produção";
}

// -------------------------------------------------------------
// Parsers específicos de entidade (Firma Abacaxi)
// -------------------------------------------------------------

function parseProjeto(page: any): Projeto {
  const props = page.properties;
  const etapa = getSelect(props["Etapa atual"]);
  return {
    id: page.id,
    nome: getTitle(props["Nome do projeto"]),
    status: mapEtapaToStatus(etapa),
    valorContratado: getNumber(props["Valor contratado"]),
    dataEntrega: getDate(props["Data de entrega"]),
    dataInicio: getDate(props["Data de início"]),
    etapaAtual: etapa,
    tipoProjeto: getSelect(props["Tipo de projeto"]),
    observacoes: getText(props["Observações"]),
    prjId: props["PRJ-ID"]?.unique_id?.number ? `PRJ-${props["PRJ-ID"].unique_id.number}` : "",
    clienteId: getRelations(props["Cliente"])[0] || null,
    responsavelIds: getRelations(props["Responsável"]),
    propostaIds: getRelations(props["Proposta"]),
    tarefasIds: getRelations(props["Tarefas"]),
    orcamentoIds: getRelations(props["Orçamentos"]),
    pastaDrive: getUrl(props["Pasta no Drive"]),
    escopoProjeto: getMultiSelect(props["Escopo do Projeto"]),
  };
}

function parseCliente(page: any): Cliente {
  const props = page.properties;
  return {
    id: page.id,
    nome: getTitle(props["Nome do cliente"]),
    razaoSocial: getText(props["Razão social"]),
    email: getEmail(props["E-mail"]),
    telefone: getPhone(props["Telefone"]),
    segmento: getSelect(props["Segmento"]),
    nps: getSelect(props["NPS Satisfação do cliente"]),
    cnpjCpf: getText(props["CNPJ/CPF"]),
    endereco: getText(props["Endereço"]),
    observacoes: getText(props["Observações"]),
    cliId: props["CLI-ID"]?.unique_id?.number ? `CLI-${props["CLI-ID"].unique_id.number}` : "",
    projetosIds: getRelations(props["Projetos"]),
    propostasIds: getRelations(props["Propostas"]),
  };
}

function parseContato(page: any): Contato {
  const props = page.properties;
  return {
    id: page.id,
    nome: getTitle(props["Nome"]),
    funcaoPrincipal: getSelect(props["Função principal"]),
    telefone: getPhone(props["Telefone/WhatsApp"]),
    email: getEmail(props["E-mail"]),
    tipo: getSelect(props["Tipo"]),
    cpf: getText(props["CPF"]),
    pix: getText(props["PIX"]),
    restricaoAlimentar: getText(props["Restrição Alimentar"]),
    portfolio: getUrl(props["Portfolio"]),
    valorDiaria: getNumber(props["Valor da diária"]),
    historicoSet: getNumber(props["Histórico com a Firma"]),
    observacoes: getText(props["Observações"]),
    cttId: props["CTT-ID"]?.unique_id?.number ? `CTT-${props["CTT-ID"].unique_id.number}` : "",
    clientesIds: getRelations(props["Clientes"]),
    projetosIds: getRelations(props["Projetos"]),
    tarefasIds: getRelations(props["Tarefas"]),
    propostasIds: getRelations(props["Propostas"]),
  };
}

function parseTarefa(page: any): Tarefa {
  const props = page.properties;
  return {
    id: page.id,
    title: getTitle(props["Tarefa"]),
    status: getSelect(props["Status"]),
    prioridade: getSelect(props["Prioridade"]),
    prazo: getDate(props["Prazo"]),
    observacoes: getText(props["Observações"]),
    tarId: props["TAR-ID"]?.unique_id?.number ? `TAR-${props["TAR-ID"].unique_id.number}` : "",
    projetoId: getRelations(props["Projeto"])[0] || null,
    responsavelIds: getRelations(props["Responsável"]),
  };
}

function parseProposta(page: any): Proposta {
  const props = page.properties;
  return {
    id: page.id,
    // Note: Casing capitalizado "Título da Proposta"
    titulo: getTitle(props["Título da Proposta"]),
    status: getSelect(props["Status"]),
    // Note: Casing capitalizado "Valor Total"
    valorTotal: getNumber(props["Valor Total"]),
    versao: getNumber(props["Versão"]),
    observacoes: getText(props["Observações"]),
    prpId: props["PRP-ID"]?.unique_id?.number ? `PRP-${props["PRP-ID"].unique_id.number}` : "",
    // Note: Relação com nome simplificado "Projeto"
    projetoId: getRelations(props["Projeto"])[0] || null,
    clienteId: getRelations(props["Cliente"])[0] || null,
    responsavelIds: getRelations(props["Responsável"]),
  };
}

function parseCrm(page: any): CrmOportunidade {
  const props = page.properties;
  return {
    id: page.id,
    oportunidade: getTitle(props["Oportunidade"]),
    status: getSelect(props["Status"]),
    proximoContato: getDate(props["Próximo contato"]),
    probabilidade: getNumber(props["Probabilidade"]),
    historico: getText(props["Histórico"]),
    crmId: props["CRM-ID"]?.unique_id?.number ? `CRM-${props["CRM-ID"].unique_id.number}` : "",
    clienteId: getRelations(props["Cliente"])[0] || null,
    propostaId: getRelations(props["Proposta"])[0] || null,
    responsavelIds: getRelations(props["Responsável"]),
    valorProposta: getRollupNumber(props["Valor da Proposta"]),
  };
}

function parseItemOrcamento(page: any): ItemOrcamento {
  const props = page.properties;
  return {
    id: page.id,
    item: getTitle(props["Item"]),
    total: getNumber(props["Total"]),
    tipo: getSelect(props["Tipo"]),
    fase: getSelect(props["Fase"]),
    categoria: getSelect(props["Categoria"]),
    status: getSelect(props["Status"]),
    valorUnitario: getNumber(props["Valor unitário"]),
    quantidade: getNumber(props["Quantidade"]),
    projetoId: getRelations(props["Projeto"])[0] || null,
    fornecedorId: getRelations(props["Fornecedor/Contato"])[0] || null,
  };
}

// -------------------------------------------------------------
// Fallback Mock Data (Fidelity Seeds) para Desenvolvimento Offline/Seguro
// -------------------------------------------------------------

const isMock = (): boolean => {
  return !NOTION_TOKEN || NOTION_TOKEN.startsWith("secret_your_notion");
};

const MOCK_CLIENTES: Cliente[] = [
  {
    id: "cli-1",
    nome: "Maranhã Filmes",
    razaoSocial: "Maranhã Audiovisual Ltda.",
    email: "contato@maranha.com.br",
    telefone: "+55 11 98530-4910",
    segmento: "Produtora Corporativa",
    nps: "10/10",
    cnpjCpf: "12.345.678/0001-90",
    endereco: "SCS Qd 4 Bloco A, Brasília - DF",
    observacoes: "Cliente focado em documentários institucionais de alto impacto político e socioambiental.",
    cliId: "CLI-01",
    projetosIds: ["prj-1", "prj-2"],
    propostasIds: ["prp-1"]
  },
  {
    id: "cli-2",
    nome: "Pólen Orgânicos",
    razaoSocial: "Pólen Distribuidora de Alimentos S.A.",
    email: "marketing@polenorganicos.com",
    telefone: "+55 21 97654-3210",
    segmento: "E-commerce / Varejo",
    nps: "9/10",
    cnpjCpf: "98.765.432/0001-21",
    endereco: "Rua do Ouvidor 123, Rio de Janeiro - RJ",
    observacoes: "Marca de produtos orgânicos e sustentabilidade cinematográfica analógica.",
    cliId: "CLI-02",
    projetosIds: ["prj-3"],
    propostasIds: ["prp-2"]
  }
];

const MOCK_CONTATOS: Contato[] = [
  {
    id: "ctt-1",
    nome: "Juliana",
    funcaoPrincipal: "Direção Geral",
    telefone: "+55 11 98530-4910",
    email: "juliana@maranha.com.br",
    tipo: "Contato de cliente",
    cpf: "111.222.333-44",
    pix: "juliana@maranha.com.br",
    restricaoAlimentar: "",
    portfolio: null,
    valorDiaria: 0,
    historicoSet: 5,
    observacoes: "Diretora na Maranhã. Contato principal da Firma Abacaxi para projetos da Maranhã. Estará presente nas filmagens.",
    cttId: "CTT-12",
    clientesIds: ["cli-1"],
    projetosIds: ["prj-1"],
    tarefasIds: [],
    propostasIds: ["prp-1"]
  },
  {
    id: "ctt-2",
    nome: "Lucas B.",
    funcaoPrincipal: "Diretor de Fotografia (DF)",
    telefone: "+55 61 99123-4567",
    email: "lucasb.cinematografia@gmail.com",
    tipo: "Freelancer",
    cpf: "222.333.444-55",
    pix: "61991234567",
    restricaoAlimentar: "Vegano, alergia severa a amendoim",
    portfolio: "https://vimeo.com/lucasbcine",
    valorDiaria: 1200,
    historicoSet: 14,
    observacoes: "Profissional extremamente ágil com luz analógica. Opera Arri e Blackmagic 6k Pro.",
    cttId: "CTT-15",
    clientesIds: [],
    projetosIds: ["prj-1", "prj-3"],
    tarefasIds: ["tar-1", "tar-2"],
    propostasIds: []
  },
  {
    id: "ctt-3",
    nome: "Mariana T.",
    funcaoPrincipal: "Direção de Arte",
    telefone: "+55 11 99444-8888",
    email: "mariana.arte@firmaabacaxi.com",
    tipo: "Equipe fixa",
    cpf: "333.444.555-66",
    pix: "mariana@firmaabacaxi.com",
    restricaoAlimentar: "Nenhuma (Sem restrições)",
    portfolio: "https://behance.net/marianatarte",
    valorDiaria: 900,
    historicoSet: 32,
    observacoes: "Designer interna da Firma Abacaxi. Responsável por todo o visual estético e cenografias.",
    cttId: "CTT-02",
    clientesIds: [],
    projetosIds: ["prj-1", "prj-2", "prj-3"],
    tarefasIds: ["tar-3"],
    propostasIds: []
  }
];

const MOCK_PROJETOS: Projeto[] = [
  {
    id: "prj-1",
    nome: "Maranhã — Gravação 28-29/05",
    status: "Em produção",
    valorContratado: 10573.86,
    dataEntrega: "2026-05-31",
    dataInicio: "2026-05-28",
    etapaAtual: "Produção",
    tipoProjeto: "Institucional",
    observacoes: "Gravação de entrevistas para o projeto Maranhã. Dias 28 e 29/05/2026 em Brasília.\nFormato: Braw 12:1, 24fps, 6k (Blackmagic)\nCliente: Juliana",
    prjId: "PRJ-16",
    clienteId: "cli-1",
    clienteNome: "Maranhã Filmes",
    responsavelIds: ["ctt-1", "ctt-2", "ctt-3"],
    responsavelNomes: ["Juliana", "Lucas B.", "Mariana T."],
    propostaIds: ["prp-1"],
    tarefasIds: ["tar-1", "tar-2", "tar-3", "tar-4"],
    orcamentoIds: ["orc-1", "orc-2", "orc-3"],
    pastaDrive: "https://drive.google.com/open?id=1y7b3ao5iH9C2xcSO3thlBnxpzzsWO_gb"
  },
  {
    id: "prj-2",
    nome: "Abacaxi Docs — Série Web",
    status: "Edição",
    valorContratado: 18450.00,
    dataEntrega: "2026-06-15",
    dataInicio: "2026-05-10",
    etapaAtual: "Edição Final",
    tipoProjeto: "Documentário",
    observacoes: "Minissérie documental contando histórias locais da produção agroecológica na região Centro-Oeste.",
    prjId: "PRJ-14",
    clienteId: "cli-1",
    clienteNome: "Maranhã Filmes",
    responsavelIds: ["ctt-3"],
    responsavelNomes: ["Mariana T."],
    propostaIds: ["prp-3"],
    tarefasIds: [],
    orcamentoIds: [],
    pastaDrive: "https://drive.google.com/open?id=2f37c093j1K2dfi8L2dsa"
  },
  {
    id: "prj-3",
    nome: "Campanha Pólen Analógico",
    status: "Aprovado",
    valorContratado: 25000.00,
    dataEntrega: "2026-06-30",
    dataInicio: "2026-06-01",
    etapaAtual: "Pré-produção",
    tipoProjeto: "Redes",
    observacoes: "Campanha institucional focando na estética de película de 16mm para redes sociais da Pólen Orgânicos.",
    prjId: "PRJ-17",
    clienteId: "cli-2",
    clienteNome: "Pólen Orgânicos",
    responsavelIds: ["ctt-2", "ctt-3"],
    responsavelNomes: ["Lucas B.", "Mariana T."],
    propostaIds: ["prp-2"],
    tarefasIds: [],
    orcamentoIds: [],
    pastaDrive: "https://drive.google.com/open?id=9a7c3ds0x92J2c"
  }
];

const MOCK_TAREFAS: Tarefa[] = [
  {
    id: "tar-1",
    title: "Carregar baterias e separar kits",
    status: "A fazer",
    prioridade: "Urgente",
    prazo: "2026-05-27",
    observacoes: "Baterias da câmera Blackmagic + acessórios. Deixar carregando na véspera.",
    tarId: "TAR-25",
    projetoId: "prj-1",
    projetoNome: "Maranhã — Gravação 28-29/05",
    responsavelIds: ["ctt-2"],
    responsavelNomes: ["Lucas B."]
  },
  {
    id: "tar-2",
    title: "Buscar equipamentos no escritório da Firma",
    status: "A fazer",
    prioridade: "Urgente",
    prazo: "2026-05-28",
    observacoes: "Retirar equipamentos antes de seguir para o Congresso Nacional (chegada prevista 9h).",
    tarId: "TAR-26",
    projetoId: "prj-1",
    projetoNome: "Maranhã — Gravação 28-29/05",
    responsavelIds: ["ctt-2"],
    responsavelNomes: ["Lucas B."]
  },
  {
    id: "tar-3",
    title: "Separar materiais de cenografia",
    status: "Em andamento",
    prioridade: "Alta",
    prazo: "2026-05-27",
    observacoes: "Selecionar paleta pólen/terrosa para fundos de entrevista do Congresso.",
    tarId: "TAR-24",
    projetoId: "prj-1",
    projetoNome: "Maranhã — Gravação 28-29/05",
    responsavelIds: ["ctt-3"],
    responsavelNomes: ["Mariana T."]
  },
  {
    id: "tar-4",
    title: "Upload dos arquivos brutos para o Drive",
    status: "A fazer",
    prioridade: "Alta",
    prazo: "2026-05-31",
    observacoes: "Upload do material bruto em Braw 6k.",
    tarId: "TAR-27",
    projetoId: "prj-1",
    projetoNome: "Maranhã — Gravação 28-29/05",
    responsavelIds: [],
    responsavelNomes: []
  }
];

const MOCK_PROPOSTAS: Proposta[] = [
  {
    id: "prp-1",
    titulo: "Maranhã — Proposta Gravação 28-29/05",
    status: "Aprovada",
    valorTotal: 10573.86,
    versao: 1,
    observacoes: "Proposta aprovada. Gravação 28-29/05/2026 em Brasília. Entrevistas Nilto Tatto e Anne Moura.",
    prpId: "PRP-04",
    projetoId: "prj-1",
    projetoNome: "Maranhã — Gravação 28-29/05",
    clienteId: "cli-1",
    clienteNome: "Maranhã Filmes",
    responsavelIds: ["ctt-1"]
  },
  {
    id: "prp-2",
    titulo: "Campanha Redes — Película Pólen",
    status: "Aprovada",
    valorTotal: 25000.00,
    versao: 2,
    observacoes: "Vídeos em película super 8mm e 16mm digitalizado. 5 peças para redes.",
    prpId: "PRP-05",
    projetoId: "prj-3",
    projetoNome: "Campanha Pólen Analógico",
    clienteId: "cli-2",
    clienteNome: "Pólen Orgânicos",
    responsavelIds: ["ctt-2"]
  },
  {
    id: "prp-3",
    titulo: "Minissérie Documental Abacaxi",
    status: "Em negociação",
    valorTotal: 18450.00,
    versao: 1,
    observacoes: "Proposta enviada aguardando fechamento orçamentário final.",
    prpId: "PRP-02",
    projetoId: "prj-2",
    projetoNome: "Abacaxi Docs — Série Web",
    clienteId: "cli-1",
    clienteNome: "Maranhã Filmes",
    responsavelIds: ["ctt-3"]
  }
];

const MOCK_CRM: CrmOportunidade[] = [
  {
    id: "crm-1",
    oportunidade: "Série Documental Cerrado",
    status: "Aberto",
    proximoContato: "2026-06-05",
    probabilidade: 80,
    historico: "Primeira reunião de apresentação estética executada com sucesso. Gostaram muito do conceito terroso.",
    crmId: "CRM-04",
    clienteId: "cli-1",
    clienteNome: "Maranhã Filmes",
    propostaId: "prp-3",
    propostaNome: "Minissérie Documental Abacaxi",
    responsavelIds: ["ctt-3"],
    valorProposta: 18450.00
  },
  {
    id: "crm-2",
    oportunidade: "Campanha Frutas Verão",
    status: "Ganho",
    proximoContato: "2026-05-25",
    probabilidade: 100,
    historico: "Fechado com sucesso. Convertido no projeto 'Campanha Pólen Analógico'.",
    crmId: "CRM-05",
    clienteId: "cli-2",
    clienteNome: "Pólen Orgânicos",
    propostaId: "prp-2",
    propostaNome: "Campanha Redes — Película Pólen",
    responsavelIds: ["ctt-2"],
    valorProposta: 25000.00
  }
];

const MOCK_ORCAMENTO: ItemOrcamento[] = [
  {
    id: "orc-1",
    item: "Diárias do Diretor de Fotografia (Lucas B.)",
    total: 2400.00,
    tipo: "Custo",
    fase: "Execucao",
    categoria: "Equipe",
    status: "Confirmado",
    valorUnitario: 1200.00,
    quantidade: 2,
    projetoId: "prj-1",
    fornecedorId: "ctt-2"
  },
  {
    id: "orc-2",
    item: "Equipamentos de Iluminação (Aputure + Nanlite)",
    total: 800.00,
    tipo: "Custo",
    fase: "Execucao",
    categoria: "Equipamento",
    status: "Pago",
    valorUnitario: 400.00,
    quantidade: 2,
    projetoId: "prj-1",
    fornecedorId: null
  },
  {
    id: "orc-3",
    item: "Produção (Alimentação e Combustível)",
    total: 660.00,
    tipo: "Custo",
    fase: "Execucao",
    categoria: "Alimentação",
    status: "Recebido",
    valorUnitario: 660.00,
    quantidade: 1,
    projetoId: "prj-1",
    fornecedorId: null
  }
];

const MOCK_BLOCKS: Record<string, NotionBlock[]> = {
  "prj-1": [
    { id: "b1", type: "heading_1", content: "Diário de Bordo — Gravação Brasília" },
    { id: "b2", type: "paragraph", content: "A gravação no Congresso Nacional exige credenciamento de imprensa prévio enviado pela Mariana T. A Juliana estará acompanhando os entrevistados pessoalmente." },
    { id: "b3", type: "heading_2", content: "Especificações Estéticas da Câmera" },
    { id: "b4", type: "paragraph", content: "Utilizar o Kit de Lentes Anamórficas para capturar o visual cinematográfico orgânico (papel pólen). O Diretor de Fotografia Lucas B. prefere tons levemente dessaturados nas sombras e brilhos quentes dourados nas altas." },
    { id: "b5", type: "heading_3", content: "Checklist Logístico de Set" },
    { id: "b6", type: "to_do", content: "Enviar credenciamento até terça-feira", checked: true },
    { id: "b7", type: "to_do", content: "Carregar as 4 baterias V-mount da Blackmagic", checked: false },
    { id: "b8", type: "to_do", content: "Confirmar restrição vegana no almoço (Lucas B.)", checked: false },
    { id: "b9", type: "quote", content: "O cinema não é um espelho da realidade, mas um martelo com o qual a moldamos. — Estética Abacaxi" }
  ]
};

// -------------------------------------------------------------
// Métodos de Consulta de Bancos (API Publica)
// -------------------------------------------------------------

export async function getProjetos(): Promise<Projeto[]> {
  if (isMock()) {
    return MOCK_PROJETOS;
  }
  try {
    const data = await notionFetch(`databases/${DBS.PROJECTS}/query`, {
      method: "POST",
      body: JSON.stringify({
        sorts: [{ property: "Nome do projeto", direction: "ascending" }]
      })
    });
    return (data.results || []).map(parseProjeto);
  } catch (err) {
    console.error("Erro ao carregar Projetos do Notion, usando Mock Fallback:", err);
    return MOCK_PROJETOS;
  }
}

export async function getProjetoById(id: string): Promise<Projeto | null> {
  if (isMock()) {
    return MOCK_PROJETOS.find(p => p.id === id) || null;
  }
  try {
    const page = await notionFetch(`pages/${id}`);
    if (!page || page.object === "error") return null;
    return parseProjeto(page);
  } catch (err) {
    console.error(`Erro ao carregar Projeto ${id}, usando Mock Fallback:`, err);
    return MOCK_PROJETOS.find(p => p.id === id) || null;
  }
}

export async function getClientes(): Promise<Cliente[]> {
  if (isMock()) {
    return MOCK_CLIENTES;
  }
  try {
    const data = await notionFetch(`databases/${DBS.CLIENTES}/query`, {
      method: "POST",
      body: JSON.stringify({
        sorts: [{ property: "Nome do cliente", direction: "ascending" }]
      })
    });
    return (data.results || []).map(parseCliente);
  } catch (err) {
    console.error("Erro ao carregar Clientes do Notion, usando Mock Fallback:", err);
    return MOCK_CLIENTES;
  }
}

export async function getClienteById(id: string): Promise<Cliente | null> {
  if (isMock()) {
    return MOCK_CLIENTES.find(c => c.id === id) || null;
  }
  try {
    const page = await notionFetch(`pages/${id}`);
    if (!page || page.object === "error") return null;
    return parseCliente(page);
  } catch (err) {
    console.error(`Erro ao carregar Cliente ${id}, usando Mock Fallback:`, err);
    return MOCK_CLIENTES.find(c => c.id === id) || null;
  }
}

export async function getContatos(): Promise<Contato[]> {
  if (isMock()) {
    return MOCK_CONTATOS;
  }
  try {
    const data = await notionFetch(`databases/${DBS.CONTATOS}/query`, {
      method: "POST",
      body: JSON.stringify({
        sorts: [{ property: "Nome", direction: "ascending" }]
      })
    });
    return (data.results || []).map(parseContato);
  } catch (err) {
    console.error("Erro ao carregar Contatos do Notion, usando Mock Fallback:", err);
    return MOCK_CONTATOS;
  }
}

export async function getContatoById(id: string): Promise<Contato | null> {
  if (isMock()) {
    return MOCK_CONTATOS.find(c => c.id === id) || null;
  }
  try {
    const page = await notionFetch(`pages/${id}`);
    if (!page || page.object === "error") return null;
    return parseContato(page);
  } catch (err) {
    console.error(`Erro ao carregar Contato ${id}, usando Mock Fallback:`, err);
    return MOCK_CONTATOS.find(c => c.id === id) || null;
  }
}

export async function getTarefas(): Promise<Tarefa[]> {
  if (isMock()) {
    return MOCK_TAREFAS;
  }
  try {
    const data = await notionFetch(`databases/${DBS.TAREFAS}/query`, {
      method: "POST",
      body: JSON.stringify({
        sorts: [{ property: "Prazo", direction: "ascending" }]
      })
    });
    return (data.results || []).map(parseTarefa);
  } catch (err) {
    console.error("Erro ao carregar Tarefas do Notion, usando Mock Fallback:", err);
    return MOCK_TAREFAS;
  }
}

export async function getPropostas(): Promise<Proposta[]> {
  if (isMock()) {
    return MOCK_PROPOSTAS;
  }
  try {
    const data = await notionFetch(`databases/${DBS.PROPOSTAS}/query`, {
      method: "POST"
    });
    return (data.results || []).map(parseProposta);
  } catch (err) {
    console.error("Erro ao carregar Propostas do Notion, usando Mock Fallback:", err);
    return MOCK_PROPOSTAS;
  }
}

export async function getPropostaById(id: string): Promise<Proposta | null> {
  if (isMock()) {
    return MOCK_PROPOSTAS.find(p => p.id === id) || null;
  }
  try {
    const page = await notionFetch(`pages/${id}`);
    if (!page || page.object === "error") return null;
    return parseProposta(page);
  } catch (err) {
    console.error(`Erro ao carregar Proposta ${id}, usando Mock Fallback:`, err);
    return MOCK_PROPOSTAS.find(p => p.id === id) || null;
  }
}

export async function getCrmOportunidades(): Promise<CrmOportunidade[]> {
  if (isMock()) {
    return MOCK_CRM;
  }
  try {
    const data = await notionFetch(`databases/${DBS.CRM}/query`, {
      method: "POST",
      body: JSON.stringify({
        sorts: [{ property: "Próximo contato", direction: "ascending" }]
      })
    });
    return (data.results || []).map(parseCrm);
  } catch (err) {
    console.error("Erro ao carregar CRM do Notion, usando Mock Fallback:", err);
    return MOCK_CRM;
  }
}

export async function getItensOrcamento(): Promise<ItemOrcamento[]> {
  if (isMock()) {
    return MOCK_ORCAMENTO;
  }
  try {
    const data = await notionFetch(`databases/${DBS.ORCAMENTOS}/query`, {
      method: "POST"
    });
    return (data.results || []).map(parseItemOrcamento);
  } catch (err) {
    console.error("Erro ao carregar Custos/Orçamento do Notion, usando Mock Fallback:", err);
    return MOCK_ORCAMENTO;
  }
}

// -------------------------------------------------------------
// Resgate robusto dos Diários de Bordo (Page Body Blocks)
// -------------------------------------------------------------

export async function getNotionPageBody(pageId: string): Promise<NotionBlock[]> {
  if (isMock()) {
    return MOCK_BLOCKS[pageId] || [];
  }
  try {
    const data = await notionFetch(`blocks/${pageId}/children?page_size=100`);
    const results = data.results || [];
    
    return results.map((block: any) => {
      const id = block.id;
      const type = block.type;
      let content = "";
      let checked: boolean | undefined;

      switch (type) {
        case "paragraph":
          content = block.paragraph.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        case "heading_1":
          content = block.heading_1.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        case "heading_2":
          content = block.heading_2.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        case "heading_3":
          content = block.heading_3.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        case "bulleted_list_item":
          content = block.bulleted_list_item.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        case "numbered_list_item":
          content = block.numbered_list_item.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        case "to_do":
          content = block.to_do.rich_text?.map((t: any) => t.plain_text).join("") || "";
          checked = block.to_do.checked;
          break;
        case "quote":
          content = block.quote.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        case "code":
          content = block.code.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        case "callout":
          content = block.callout.rich_text?.map((t: any) => t.plain_text).join("") || "";
          break;
        default:
          content = "";
      }

      return { id, type, content, checked };
    }).filter((b: NotionBlock) => b.content !== "" || b.type === "to_do");
  } catch (err) {
    console.error(`Erro ao resgatar diários de bordo para página ${pageId}, usando Mock Fallback:`, err);
    return MOCK_BLOCKS[pageId] || [];
  }
}
