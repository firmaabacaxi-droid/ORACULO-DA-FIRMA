import {
  Project,
  Client,
  Contact,
  Task,
  Lead,
  Proposal,
  FinanceSummary,
  DashboardKPIs,
  ClientShort,
  ProjectShort,
  ContactShort,
  TaskShort,
  ProposalShort,
} from "./types";

const NOTION_TOKEN = process.env.NOTION_TOKEN;

const headers = {
  "Authorization": `Bearer ${NOTION_TOKEN}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

export const DBS = {
  PROJECTS: process.env.NOTION_DB_PROJECTS || "2c031822-5594-4204-826b-752d5c2897bc",
  CLIENTES: process.env.NOTION_DB_CLIENTES || "b08a5316-af2c-4fc7-9815-a5f50ac8e654",
  CONTATOS: process.env.NOTION_DB_CONTATOS || "43fa1821-83f1-47e4-9ba3-711ca8c3a210",
  TAREFAS: process.env.NOTION_DB_TAREFAS || "6c3ccf72-5539-43f6-9fbb-7906142a246d",
  CRM: process.env.NOTION_DB_CRM || "5240a3c2-d0d1-4726-b23b-96463f5cc615",
  PROPOSTAS: process.env.NOTION_DB_PROPOSTAS || "3548a525-91f3-80e6-b542-e2e651ed5dfc",
  ORCAMENTO: "0652762f-bac3-4a0b-ad3c-2b7223132a2b",
  FILMAGEM: "2a5f9302-689f-440e-985c-c3b16362a4fe",
  EDICAO: "7f7422fc-cf76-4196-80de-c60c6a49df55",
  FINANCEIRO_PROJETO: "a263e225-a5e4-427d-a887-d2e56ba12fb5",
  GFE: "6b663765-f604-405b-a6eb-d9a5cba008af"
};

/**
 * Realiza uma consulta genérica a um banco de dados no Notion usando fetch.
 * Ativa o cache dinâmico do Next.js com revalidação automática de 10 segundos.
 */
async function queryNotionDatabase(dbId: string, body: any = {}) {
  const url = `https://api.notion.com/v1/databases/${dbId}/query`;
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro ao consultar banco de dados Notion (${dbId}):`, errorText);
    throw new Error(`Notion API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Realiza uma busca de página inteira no Notion.
 */
async function retrieveNotionPage(pageId: string) {
  const url = `https://api.notion.com/v1/pages/${pageId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro ao recuperar página Notion (${pageId}):`, errorText);
    throw new Error(`Notion API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Recupera o conteúdo do corpo de uma página do Notion (seus blocos filhos).
 * Compila e retorna uma string contendo o texto legível da página.
 */
export async function getNotionPageBody(pageId: string): Promise<string> {
  try {
    const url = `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`;
    const response = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`Erro ao recuperar blocos da página Notion (${pageId}):`, response.status);
      return '';
    }

    const data = await response.json();
    let text = '';

    for (const block of data.results) {
      const type = block.type;
      const blockContent = block[type];
      
      if (blockContent && blockContent.rich_text && Array.isArray(blockContent.rich_text)) {
        const blockText = blockContent.rich_text.map((t: any) => t.plain_text).join('');
        if (blockText.trim()) {
          if (type.startsWith('heading_')) {
            text += `\n### ${blockText}\n`;
          } else if (type === 'bulleted_list_item') {
            text += `• ${blockText}\n`;
          } else if (type === 'numbered_list_item') {
            text += `1. ${blockText}\n`;
          } else if (type === 'to_do') {
            const checked = blockContent.checked ? '[x]' : '[ ]';
            text += `${checked} ${blockText}\n`;
          } else {
            text += `${blockText}\n\n`;
          }
        }
      }
    }

    return text.trim();
  } catch (error) {
    console.error("Erro ao carregar corpo do Notion:", error);
    return '';
  }
}

/**
 * Auxiliar para construir um mapeamento de id -> nome dos clientes.
 */
async function getClientesMap(): Promise<Map<string, { nome: string; empresa: string; email: string; telefone: string }>> {
  const map = new Map<string, { nome: string; empresa: string; email: string; telefone: string }>();
  try {
    const data = await queryNotionDatabase(DBS.CLIENTES);
    for (const page of data.results) {
      if (page.properties && page.properties['Nome do cliente']) {
        const titleProp = page.properties['Nome do cliente'];
        const nome = titleProp.type === 'title' && titleProp.title.length > 0 ? titleProp.title[0].plain_text : 'Cliente do Notion';
        
        const empresaText = page.properties['Razão social']?.type === 'rich_text' && page.properties['Razão social'].rich_text.length > 0
          ? page.properties['Razão social'].rich_text[0].plain_text
          : '';
        const email = page.properties['E-mail']?.type === 'email' ? page.properties['E-mail'].email || '' : '';
        const telefone = page.properties['Telefone']?.type === 'phone_number' ? page.properties['Telefone'].phone_number || '' : '';

        map.set(page.id, { nome, empresa: empresaText || nome, email, telefone });
      }
    }
  } catch (error) {
    console.error("Erro ao mapear clientes:", error);
  }
  return map;
}

/**
 * Auxiliar para construir um mapeamento de id -> título dos projetos.
 */
async function getProjetosMap(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const data = await queryNotionDatabase(DBS.PROJECTS);
    for (const page of data.results) {
      if (page.properties && page.properties['Nome do projeto']) {
        const titleProp = page.properties['Nome do projeto'];
        if (titleProp.type === 'title' && titleProp.title.length > 0) {
          map.set(page.id, titleProp.title[0].plain_text);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao mapear projetos:", error);
  }
  return map;
}

/**
 * Auxiliar para construir um mapeamento de id -> nome dos contatos.
 */
async function getContatosMap(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const data = await queryNotionDatabase(DBS.CONTATOS);
    for (const page of data.results) {
      if (page.properties && page.properties['Nome']) {
        const titleProp = page.properties['Nome'];
        if (titleProp.type === 'title' && titleProp.title.length > 0) {
          map.set(page.id, titleProp.title[0].plain_text);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao mapear contatos:", error);
  }
  return map;
}

/**
 * Retorna todos os projetos ativos para o Dashboard.
 */
export async function getActiveProjects(): Promise<any[]> {
  try {
    const clientesMap = await getClientesMap();
    const data = await queryNotionDatabase(DBS.PROJECTS, {
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              does_not_equal: 'Concluído',
            },
          },
          {
            property: 'Status',
            select: {
              does_not_equal: 'Cancelado',
            },
          },
        ]
      },
    });

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const titleList = props['Nome do projeto']?.type === 'title' ? props['Nome do projeto'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'N/A' : 'N/A';
      const valor_contrato = props['Valor contratado']?.type === 'number' ? props['Valor contratado'].number || 0 : 0;
      const data_entrega = props['Data de entrega']?.type === 'date' ? props['Data de entrega'].date?.start || '' : '';
      
      const briefingTextList = props['Observações']?.type === 'rich_text' ? props['Observações'].rich_text : [];
      const briefing = briefingTextList.length > 0 ? briefingTextList[0].plain_text : '';

      const clienteRelation = props['Cliente']?.type === 'relation' ? props['Cliente'].relation : [];
      const clienteId = clienteRelation.length > 0 ? clienteRelation[0].id : null;
      const clienteData = clienteId ? clientesMap.get(clienteId) : null;

      const drive_folder_url = props['Pasta no Drive']?.type === 'url' ? props['Pasta no Drive'].url || '' : '';

      return {
        id: page.id,
        titulo,
        status,
        valor_contrato,
        data_entrega,
        briefing,
        clientes: {
          id: clienteId,
          nome: clienteData?.nome || '--',
        },
        drive_folder_url,
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar projetos ativos:", error);
    return [];
  }
}

/**
 * Retorna absolutamente todos os projetos cadastrados (ativos e concluídos) para /projetos.
 */
export async function getAllProjects(): Promise<any[]> {
  try {
    const clientesMap = await getClientesMap();
    const data = await queryNotionDatabase(DBS.PROJECTS);

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const titleList = props['Nome do projeto']?.type === 'title' ? props['Nome do projeto'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'N/A' : 'N/A';
      const valor_contrato = props['Valor contratado']?.type === 'number' ? props['Valor contratado'].number || 0 : 0;
      const data_entrega = props['Data de entrega']?.type === 'date' ? props['Data de entrega'].date?.start || '' : '';
      
      const clienteRelation = props['Cliente']?.type === 'relation' ? props['Cliente'].relation : [];
      const clienteId = clienteRelation.length > 0 ? clienteRelation[0].id : null;
      const clienteData = clienteId ? clientesMap.get(clienteId) : null;

      return {
        id: page.id,
        titulo,
        status,
        valor_contrato,
        data_entrega,
        clientes: {
          id: clienteId,
          nome: clienteData?.nome || '--',
        },
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar lista completa de projetos:", error);
    return [];
  }
}

/**
 * Retorna os detalhes de um único projeto a partir do Notion.
 */
export async function getProjectDetail(id: string): Promise<Project | null> {
  try {
    const page = await retrieveNotionPage(id);
    const props = page.properties;
    if (!props) return null;

    const titleList = props['Nome do projeto']?.type === 'title' ? props['Nome do projeto'].title : [];
    const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
    const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'N/A' : 'N/A';
    const valor_contrato = props['Valor contratado']?.type === 'number' ? props['Valor contratado'].number || 0 : 0;
    const data_entrega = props['Data de entrega']?.type === 'date' ? props['Data de entrega'].date?.start || '' : '';
    const data_inicio = props['Data de início']?.type === 'date' ? props['Data de início'].date?.start || '' : '';
    const workflow_step = props['Etapa atual']?.type === 'select' ? props['Etapa atual'].select?.name || 'Prospecção' : 'Prospecção';
    const tipo_projeto = props['Tipo de projeto']?.type === 'select' ? props['Tipo de projeto'].select?.name || 'Outro' : 'Outro';
    
    // Briefing (Observações no Notion)
    const briefingTextList = props['Observações']?.type === 'rich_text' ? props['Observações'].rich_text : [];
    const briefing = briefingTextList.length > 0 ? briefingTextList[0].plain_text : '';

    // ID numérico para layout
    const auto_id = props['PRJ-ID']?.type === 'unique_id' ? props['PRJ-ID'].unique_id?.number || 1 : 1;

    const drive_folder_url = props['Pasta no Drive']?.type === 'url' ? props['Pasta no Drive'].url || '' : '';

    // Cliente relacionado
    const clienteRelation = props['Cliente']?.type === 'relation' ? props['Cliente'].relation : [];
    let clienteDetails = null;
    if (clienteRelation.length > 0) {
      try {
        const cliPage = await retrieveNotionPage(clienteRelation[0].id);
        const cliProps = cliPage.properties;
        const nameList = cliProps['Nome do cliente']?.type === 'title' ? cliProps['Nome do cliente'].title : [];
        const cliNome = nameList.length > 0 ? nameList[0].plain_text : 'Cliente';
        const cliEmpresa = cliProps['Razão social']?.type === 'rich_text' && cliProps['Razão social'].rich_text.length > 0
          ? cliProps['Razão social'].rich_text[0].plain_text
          : cliNome;
        const cliEmail = cliProps['E-mail']?.type === 'email' ? cliProps['E-mail'].email || '' : '';
        const cliTelefone = cliProps['Telefone']?.type === 'phone_number' ? cliProps['Telefone'].phone_number || '' : '';

        clienteDetails = {
          id: clienteRelation[0].id,
          nome: cliNome,
          empresa: cliEmpresa,
          email: cliEmail,
          telefone: cliTelefone,
        };
      } catch (e) {
        console.error("Erro ao carregar detalhes do cliente do projeto:", e);
      }
    }

    // Responsável (DOP / Freelancer)
    const respRelation = props['Responsável']?.type === 'relation' ? props['Responsável'].relation : [];
    let diretor = '';
    if (respRelation.length > 0) {
      try {
        const respPage = await retrieveNotionPage(respRelation[0].id);
        const nameList = respPage.properties['Nome']?.type === 'title' ? respPage.properties['Nome'].title : [];
        diretor = nameList.length > 0 ? nameList[0].plain_text : '';
      } catch (e) {}
    }

    return {
      id: page.id,
      titulo,
      status,
      valor_contrato,
      data_entrega,
      data_inicio,
      workflow_step,
      tipo_projeto,
      briefing,
      auto_id,
      diretor,
      clientes: clienteDetails,
      drive_folder_url,
    };
  } catch (error) {
    console.error("Erro ao carregar detalhes do projeto:", error);
    return null;
  }
}

/**
 * Retorna as aproximações do funil comercial (CRM).
 */
export async function getPipelineLeads(): Promise<Lead[]> {
  try {
    const clientesMap = await getClientesMap();
    const data = await queryNotionDatabase(DBS.CRM, {
      filter: {
        property: 'Status',
        select: {
          does_not_equal: 'Ganho',
        },
      },
    });

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const titleList = props['Oportunidade']?.type === 'title' ? props['Oportunidade'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'Proposta' : 'Proposta';
      
      let valor_contrato = 0;
      const rollupVal = props['Valor da Proposta'];
      if (rollupVal && rollupVal.type === 'rollup' && rollupVal.rollup.type === 'number') {
        valor_contrato = rollupVal.rollup.number || 0;
      }

      const clienteRelation = props['Cliente']?.type === 'relation' ? props['Cliente'].relation : [];
      const clienteId = clienteRelation.length > 0 ? clienteRelation[0].id : null;
      const clienteData = clienteId ? clientesMap.get(clienteId) : null;

      return {
        id: page.id,
        titulo,
        status,
        valor_contrato,
        created_at: page.created_time,
        clientes: {
          id: clienteId,
          nome: clienteData?.nome || '--',
        },
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar leads do CRM:", error);
    return [];
  }
}

/**
 * Retorna tarefas urgentes ou altas pendentes.
 */
export async function getTasks(): Promise<Task[]> {
  try {
    const projetosMap = await getProjetosMap();
    const data = await queryNotionDatabase(DBS.TAREFAS, {
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              does_not_equal: 'Concluída',
            },
          },
          {
            or: [
              {
                property: 'Prioridade',
                select: {
                  equals: 'Urgente',
                },
              },
              {
                property: 'Prioridade',
                select: {
                  equals: 'Alta',
                },
              },
            ],
          },
        ],
      },
      sorts: [
        {
          property: 'Prioridade',
          direction: 'ascending',
        },
      ],
    });

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const titleList = props['Tarefa']?.type === 'title' ? props['Tarefa'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'A fazer' : 'A fazer';
      const prioridade = props['Prioridade']?.type === 'select' ? props['Prioridade'].select?.name || 'Média' : 'Média';
      const data_limite = props['Prazo']?.type === 'date' ? props['Prazo'].date?.start || '' : '';

      const projetoRelation = props['Projeto']?.type === 'relation' ? props['Projeto'].relation : [];
      const projetoId = projetoRelation.length > 0 ? projetoRelation[0].id : null;
      const projetoNome = projetoId ? projetosMap.get(projetoId) || 'Projeto do Notion' : '--';

      return {
        id: page.id,
        titulo,
        status,
        prioridade,
        data_limite,
        projetos: {
          id: projetoId,
          titulo: projetoNome,
        },
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar tarefas pendentes:", error);
    return [];
  }
}

/**
 * Retorna absolutamente todas as tarefas registradas no Notion.
 */
export async function getAllTasks(): Promise<Task[]> {
  try {
    const projetosMap = await getProjetosMap();
    const contatosMap = await getContatosMap();
    const data = await queryNotionDatabase(DBS.TAREFAS);

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const titleList = props['Tarefa']?.type === 'title' ? props['Tarefa'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'A fazer' : 'A fazer';
      const prioridade = props['Prioridade']?.type === 'select' ? props['Prioridade'].select?.name || 'Média' : 'Média';
      const data_limite = props['Prazo']?.type === 'date' ? props['Prazo'].date?.start || '' : '';

      const projetoRelation = props['Projeto']?.type === 'relation' ? props['Projeto'].relation : [];
      const projetoId = projetoRelation.length > 0 ? projetoRelation[0].id : null;
      const projetoNome = projetoId ? projetosMap.get(projetoId) || 'Projeto do Notion' : '--';

      // Responsável
      const respRelation = props['Responsável']?.type === 'relation' ? props['Responsável'].relation : [];
      const responsavelId = respRelation.length > 0 ? respRelation[0].id : null;
      const responsavelNome = responsavelId ? contatosMap.get(responsavelId) || 'Membro' : '--';

      return {
        id: page.id,
        titulo,
        status,
        prioridade,
        data_limite,
        responsavel: {
          id: responsavelId,
          nome: responsavelNome,
        },
        projetos: {
          id: projetoId,
          titulo: projetoNome,
        },
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar lista de tarefas:", error);
    return [];
  }
}

/**
 * Retorna as tarefas associadas a um único projeto específico.
 */
export async function getProjectTasks(projectId: string) {
  try {
    const contatosMap = await getContatosMap();
    const data = await queryNotionDatabase(DBS.TAREFAS, {
      filter: {
        property: 'Projeto',
        relation: {
          contains: projectId,
        },
      },
    });

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const titleList = props['Tarefa']?.type === 'title' ? props['Tarefa'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'A fazer' : 'A fazer';
      const prioridade = props['Prioridade']?.type === 'select' ? props['Prioridade'].select?.name || 'Média' : 'Média';
      const data_limite = props['Prazo']?.type === 'date' ? props['Prazo'].date?.start || '' : '';

      const respRelation = props['Responsável']?.type === 'relation' ? props['Responsável'].relation : [];
      const responsavelId = respRelation.length > 0 ? respRelation[0].id : null;
      const responsavelNome = responsavelId ? contatosMap.get(responsavelId) || 'Membro' : '--';

      return {
        id: page.id,
        titulo,
        status,
        prioridade,
        data_limite,
        responsavel: responsavelNome,
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar tarefas do projeto:", error);
    return [];
  }
}

/**
 * Retorna os clientes cadastrados para /clientes.
 */
export async function getClientes(): Promise<any[]> {
  try {
    const data = await queryNotionDatabase(DBS.CLIENTES);

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const nameList = props['Nome do cliente']?.type === 'title' ? props['Nome do cliente'].title : [];
      const nome = nameList.length > 0 ? nameList[0].plain_text : 'Cliente do Notion';
      
      const empresaText = props['Razão social']?.type === 'rich_text' && props['Razão social'].rich_text.length > 0
        ? props['Razão social'].rich_text[0].plain_text
        : '';
      const email = props['E-mail']?.type === 'email' ? props['E-mail'].email || '' : '';
      const telefone = props['Telefone']?.type === 'phone_number' ? props['Telefone'].phone_number || '' : '';
      
      const segmento = props['Segmento']?.type === 'select' ? props['Segmento'].select?.name || 'Geral' : 'Geral';

      return {
        id: page.id,
        nome,
        empresa: empresaText || nome,
        email,
        telefone,
        tags: [segmento],
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar clientes do Notion:", error);
    return [];
  }
}

/**
 * Retorna os contatos do ateliê para /contatos.
 */
export async function getContatos(): Promise<any[]> {
  try {
    const clientesMap = await getClientesMap();
    const data = await queryNotionDatabase(DBS.CONTATOS);

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const nameList = props['Nome']?.type === 'title' ? props['Nome'].title : [];
      const nome = nameList.length > 0 ? nameList[0].plain_text : 'Sem nome';

      const email = props['E-mail']?.type === 'email' ? props['E-mail'].email || '' : '';
      const telefone = props['Telefone/WhatsApp']?.type === 'phone_number' ? props['Telefone/WhatsApp'].phone_number || '' : '';
      
      const cargo = props['Função principal']?.type === 'select' ? props['Função principal'].select?.name || 'Membro' : 'Membro';

      const cliRelation = props['Clientes']?.type === 'relation' ? props['Clientes'].relation : [];
      const cliId = cliRelation.length > 0 ? cliRelation[0].id : null;
      const cliData = cliId ? clientesMap.get(cliId) : null;

      return {
        id: page.id,
        nome,
        cargo,
        email,
        telefone,
        clientes: {
          id: cliId,
          nome: cliData?.nome || '--',
        },
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar contatos do Notion:", error);
    return [];
  }
}

/**
 * Retorna todas as propostas comerciais do Notion como Orçamentos (/orcamentos).
 */
export async function getPropostas(): Promise<Proposal[]> {
  try {
    const clientesMap = await getClientesMap();
    const projetosMap = await getProjetosMap();
    const data = await queryNotionDatabase(DBS.PROPOSTAS);

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const titleList = props['Título da Proposta']?.type === 'title' ? props['Título da Proposta'].title : [];
      const nome = titleList.length > 0 ? titleList[0].plain_text : 'Proposta';

      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'Rascunho' : 'Rascunho';
      const valor_total = props['Valor Total']?.type === 'number' ? props['Valor Total'].number || 0 : 0;
      
      const projRelation = props['Projeto']?.type === 'relation' ? props['Projeto'].relation : [];
      const projId = projRelation.length > 0 ? projRelation[0].id : null;
      const projNome = projId ? projetosMap.get(projId) || '' : '';

      const cliRelation = props['Cliente']?.type === 'relation' ? props['Cliente'].relation : [];
      const cliId = cliRelation.length > 0 ? cliRelation[0].id : null;
      const cliData = cliId ? clientesMap.get(cliId) : null;

      return {
        id: page.id,
        nome,
        status,
        valor_total,
        projetos: {
          id: projId,
          titulo: projNome,
          clientes: {
            id: cliId,
            nome: cliData?.nome || '--',
          },
        },
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar propostas (orçamentos) do Notion:", error);
    return [];
  }
}

/**
 * Retorna os detalhes da proposta ligada a um projeto específico.
 */
export async function getProjectProposal(projectId: string) {
  try {
    const data = await queryNotionDatabase(DBS.PROPOSTAS, {
      filter: {
        property: 'Projeto',
        relation: {
          contains: projectId,
        },
      },
    });

    if (data.results.length === 0) return null;
    const page = data.results[0];
    const props = page.properties;

    const titleList = props['Título da Proposta']?.type === 'title' ? props['Título da Proposta'].title : [];
    const nome = titleList.length > 0 ? titleList[0].plain_text : 'Proposta';

    const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'Rascunho' : 'Rascunho';
    const valor_total = props['Valor Total']?.type === 'number' ? props['Valor Total'].number || 0 : 0;
    const versao = props['Versão']?.type === 'number' ? props['Versão'].number || 1 : 1;
    const custo_previsto = valor_total * 0.40; // 40% estimado como baseline comercial de custos na Fase 1

    return {
      id: page.id,
      nome,
      status,
      valor_total,
      custo_previsto,
      orcamento_categorias: [
        { id: '1', categoria: 'Equipe de Set', valor_alocado: valor_total * 0.20 },
        { id: '2', categoria: 'Equipamentos', valor_alocado: valor_total * 0.10 },
        { id: '3', categoria: 'Pós-Produção', valor_alocado: valor_total * 0.10 },
      ],
    };
  } catch (error) {
    console.error("Erro ao carregar proposta do projeto:", error);
    return null;
  }
}

/**
 * Calcula a saúde financeira baseada nos projetos reais e propostas.
 */
export async function getFinanceSummary(): Promise<FinanceSummary> {
  try {
    const data = await queryNotionDatabase(DBS.PROJECTS);

    let totalEntradas = 0;
    let totalSaidas = 0;

    for (const page of data.results) {
      const props = page.properties;
      if (!props) continue;
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || '' : '';
      const valor = props['Valor contratado']?.type === 'number' ? props['Valor contratado'].number || 0 : 0;

      if (status === 'Concluído') {
        totalEntradas += valor;
        totalSaidas += valor * 0.40;
      } else if (status && status !== 'Cancelado' && status !== 'Rascunho' && status !== 'Prospecção') {
        totalEntradas += valor * 0.50;
        totalSaidas += (valor * 0.50) * 0.40;
      }
    }

    return {
      totalEntradas,
      totalSaidas,
      saldoAtual: totalEntradas - totalSaidas,
    };
  } catch (error) {
    console.error("Erro ao calcular resumo financeiro:", error);
    return {
      totalEntradas: 0,
      totalSaidas: 0,
      saldoAtual: 0,
    };
  }
}

/**
 * Consolida todas as métricas do painel
 */
export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  try {
    const activeProjectsData = await queryNotionDatabase(DBS.PROJECTS, {
      filter: {
        property: 'Status',
        select: {
          does_not_equal: 'Concluído',
        },
      },
    });
    
    const projetosAtivos = activeProjectsData.results.filter((page: any) => {
      if (page.properties) {
        const s = page.properties['Status']?.type === 'select' ? page.properties['Status'].select?.name : '';
        return s !== 'Cancelado' && s !== 'Prospecção' && s !== 'Briefing';
      }
      return false;
    }).length;

    const crmData = await queryNotionDatabase(DBS.CRM, {
      filter: {
        property: 'Status',
        select: {
          does_not_equal: 'Ganho',
        },
      },
    });
    const leadsFunil = crmData.results.length;

    const finance = await getFinanceSummary();

    return {
      projetos_ativos: projetosAtivos,
      leads_funil: leadsFunil,
      faturamento_mes: finance.totalEntradas,
    };
  } catch (error) {
    console.error("Erro ao consolidar KPIs do dashboard:", error);
    return {
      projetos_ativos: 0,
      leads_funil: 0,
      faturamento_mes: 0,
    };
  }
}

/**
 * Retorna os detalhes de um único cliente, incluindo projetos, propostas e contatos relacionados.
 */
export async function getClientDetail(id: string): Promise<Client | null> {
  try {
    const page = await retrieveNotionPage(id);
    const props = page.properties;
    if (!props) return null;

    const nameList = props['Nome do cliente']?.type === 'title' ? props['Nome do cliente'].title : [];
    const nome = nameList.length > 0 ? nameList[0].plain_text : 'Cliente do Notion';
    
    const empresaText = props['Razão social']?.type === 'rich_text' && props['Razão social'].rich_text.length > 0
      ? props['Razão social'].rich_text[0].plain_text
      : '';
    const email = props['E-mail']?.type === 'email' ? props['E-mail'].email || '' : '';
    const telefone = props['Telefone']?.type === 'phone_number' ? props['Telefone'].phone_number || '' : '';
    const segmento = props['Segmento']?.type === 'select' ? props['Segmento'].select?.name || 'Geral' : 'Geral';
    const nps = props['NPS Satisfação do cliente']?.type === 'select' ? props['NPS Satisfação do cliente'].select?.name || '—' : '—';
    const cnpj_cpf = props['CNPJ/CPF']?.type === 'rich_text' && props['CNPJ/CPF'].rich_text.length > 0
      ? props['CNPJ/CPF'].rich_text[0].plain_text
      : '';
    const endereco = props['Endereço']?.type === 'rich_text' && props['Endereço'].rich_text.length > 0
      ? props['Endereço'].rich_text[0].plain_text
      : '';
    const observacoes = props['Observações']?.type === 'rich_text' && props['Observações'].rich_text.length > 0
      ? props['Observações'].rich_text[0].plain_text
      : '';
    const auto_id = props['CLI-ID']?.type === 'unique_id' ? props['CLI-ID'].unique_id?.number || 1 : 1;

    // Projetos ativos vinculados
    const projectsData = await queryNotionDatabase(DBS.PROJECTS, {
      filter: {
        property: 'Cliente',
        relation: {
          contains: id,
        },
      },
    });
    const projetos = projectsData.results.map((p: any) => {
      const pProps = p.properties;
      const titleList = pProps['Nome do projeto']?.type === 'title' ? pProps['Nome do projeto'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      const status = pProps['Status']?.type === 'select' ? pProps['Status'].select?.name || 'N/A' : 'N/A';
      const valor = pProps['Valor contratado']?.type === 'number' ? pProps['Valor contratado'].number || 0 : 0;
      const entrega = pProps['Data de entrega']?.type === 'date' ? pProps['Data de entrega'].date?.start || '' : '';
      return { id: p.id, titulo, status, valor, entrega };
    });

    // Propostas vinculadas
    const propostasData = await queryNotionDatabase(DBS.PROPOSTAS, {
      filter: {
        property: 'Cliente',
        relation: {
          contains: id,
        },
      },
    });
    const propostas = propostasData.results.map((p: any) => {
      const pProps = p.properties;
      const titleList = pProps['Título da Proposta']?.type === 'title' ? pProps['Título da Proposta'].title : [];
      const nome = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      const status = pProps['Status']?.type === 'select' ? pProps['Status'].select?.name || 'Rascunho' : 'Rascunho';
      const valor = pProps['Valor Total']?.type === 'number' ? pProps['Valor Total'].number || 0 : 0;
      return { id: p.id, nome, status, valor };
    });

    // Contatos vinculados
    const contatosData = await queryNotionDatabase(DBS.CONTATOS, {
      filter: {
        property: 'Clientes',
        relation: {
          contains: id,
        },
      },
    });
    const contatos = contatosData.results.map((c: any) => {
      const cProps = c.properties;
      const titleList = cProps['Nome']?.type === 'title' ? cProps['Nome'].title : [];
      const nome = titleList.length > 0 ? titleList[0].plain_text : 'Sem nome';
      const cargo = cProps['Função principal']?.type === 'select' ? cProps['Função principal'].select?.name || 'Membro' : 'Membro';
      const email = cProps['E-mail']?.type === 'email' ? cProps['E-mail'].email || '' : '';
      const telefone = cProps['Telefone/WhatsApp']?.type === 'phone_number' ? cProps['Telefone/WhatsApp'].phone_number || '' : '';
      return { id: c.id, nome, cargo, email, telefone };
    });

    return {
      id,
      nome,
      empresa: empresaText || nome,
      email,
      telefone,
      segmento,
      nps,
      cnpj_cpf,
      endereco,
      observacoes,
      auto_id,
      projetos,
      propostas,
      contatos,
    };
  } catch (error) {
    console.error("Erro ao carregar detalhes do cliente:", error);
    return null;
  }
}

/**
 * Retorna os detalhes de um único contato, incluindo seus projetos vinculados e tarefas atribuídas.
 */
export async function getContactDetail(id: string): Promise<Contact | null> {
  try {
    const page = await retrieveNotionPage(id);
    const props = page.properties;
    if (!props) return null;

    const nameList = props['Nome']?.type === 'title' ? props['Nome'].title : [];
    const nome = nameList.length > 0 ? nameList[0].plain_text : 'Sem nome';

    const email = props['E-mail']?.type === 'email' ? props['E-mail'].email || '' : '';
    const telefone = props['Telefone/WhatsApp']?.type === 'phone_number' ? props['Telefone/WhatsApp'].phone_number || '' : '';
    const cargo = props['Função principal']?.type === 'select' ? props['Função principal'].select?.name || 'Membro' : 'Membro';
    const tipo = props['Tipo']?.type === 'select' ? props['Tipo'].select?.name || 'Freelancer' : 'Freelancer';
    const cpf = props['CPF']?.type === 'rich_text' && props['CPF'].rich_text.length > 0
      ? props['CPF'].rich_text[0].plain_text
      : '';
    const pix = props['PIX']?.type === 'rich_text' && props['PIX'].rich_text.length > 0
      ? props['PIX'].rich_text[0].plain_text
      : '';
    const restricoes = props['Restrição Alimentar']?.type === 'rich_text' && props['Restrição Alimentar'].rich_text.length > 0
      ? props['Restrição Alimentar'].rich_text[0].plain_text
      : '';
    const portfolio = props['Portfolio']?.type === 'url' ? props['Portfolio'].url || '' : '';
    const observacoes = props['Observações']?.type === 'rich_text' && props['Observações'].rich_text.length > 0
      ? props['Observações'].rich_text[0].plain_text
      : '';
    const valorDiaria = props['Valor da diária']?.type === 'number' ? props['Valor da diária'].number || 0 : 0;
    const historicoFirma = props['Histórico com a Firma']?.type === 'number' ? props['Histórico com a Firma'].number || 0 : 0;
    const auto_id = props['CTT-ID']?.type === 'unique_id' ? props['CTT-ID'].unique_id?.number || 1 : 1;

    // Clientes vinculados
    const cliRelation = props['Clientes']?.type === 'relation' ? props['Clientes'].relation : [];
    let cliente = null;
    if (cliRelation.length > 0) {
      try {
        const cliPage = await retrieveNotionPage(cliRelation[0].id);
        const cliProps = cliPage.properties;
        const nameList = cliProps['Nome do cliente']?.type === 'title' ? cliProps['Nome do cliente'].title : [];
        const cliNome = nameList.length > 0 ? nameList[0].plain_text : 'Cliente';
        cliente = { id: cliRelation[0].id, nome: cliNome };
      } catch (e) {
        console.error("Erro ao carregar cliente do contato:", e);
      }
    }

    // Projetos vinculados a este contato
    const projectsData = await queryNotionDatabase(DBS.PROJECTS, {
      filter: {
        property: 'Responsável',
        relation: {
          contains: id,
        },
      },
    });
    const projetos = projectsData.results.map((p: any) => {
      const pProps = p.properties;
      const titleList = pProps['Nome do projeto']?.type === 'title' ? pProps['Nome do projeto'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      const status = pProps['Status']?.type === 'select' ? pProps['Status'].select?.name || 'N/A' : 'N/A';
      const valor = pProps['Valor contratado']?.type === 'number' ? pProps['Valor contratado'].number || 0 : 0;
      const entrega = pProps['Data de entrega']?.type === 'date' ? pProps['Data de entrega'].date?.start || '' : '';
      return { id: p.id, titulo, status, valor, entrega };
    });

    // Tarefas atribuídas
    const tasksData = await queryNotionDatabase(DBS.TAREFAS, {
      filter: {
        property: 'Responsável',
        relation: {
          contains: id,
        },
      },
    });
    const tarefas = tasksData.results.map((t: any) => {
      const tProps = t.properties;
      const titleList = tProps['Tarefa']?.type === 'title' ? tProps['Tarefa'].title : [];
      const titulo = titleList.length > 0 ? titleList[0].plain_text : 'Sem título';
      const status = tProps['Status']?.type === 'select' ? tProps['Status'].select?.name || 'A fazer' : 'A fazer';
      const prioridade = tProps['Prioridade']?.type === 'select' ? tProps['Prioridade'].select?.name || 'Média' : 'Média';
      const prazo = tProps['Prazo']?.type === 'date' ? tProps['Prazo'].date?.start || '' : '';
      return { id: t.id, titulo, status, prioridade, prazo };
    });

    return {
      id,
      nome,
      email,
      telefone,
      cargo,
      tipo,
      cpf,
      pix,
      restricoes,
      portfolio,
      observacoes,
      valorDiaria,
      historicoFirma,
      auto_id,
      cliente,
      projetos,
      tarefas,
    };
  } catch (error) {
    console.error("Erro ao carregar detalhes do contato:", error);
    return null;
  }
}

/**
 * Cria um novo projeto no Notion.
 */
export async function createProject(data: {
  titulo: string;
  clienteId?: string;
  tipoProjeto: string;
  dataInicio?: string;
  dataEntrega?: string;
  valorContrato?: number;
  pastaDriveUrl?: string;
}): Promise<any> {
  const url = "https://api.notion.com/v1/pages";
  
  const properties: any = {
    "Nome do projeto": {
      "title": [
        {
          "text": {
            "content": data.titulo
          }
        }
      ]
    },
    "Status": {
      "select": {
        "name": "Briefing"
      }
    },
    "Etapa atual": {
      "select": {
        "name": "Briefing"
      }
    },
    "Tipo de projeto": {
      "select": {
        "name": data.tipoProjeto || "Outro"
      }
    }
  };

  if (data.clienteId) {
    properties["Cliente"] = {
      "relation": [
        {
          "id": data.clienteId
        }
      ]
    };
  }

  if (data.dataInicio || data.dataEntrega) {
    properties["Data de entrega"] = {
      "date": {
        "start": data.dataEntrega || data.dataInicio
      }
    };
  }

  if (data.valorContrato !== undefined) {
    properties["Valor contratado"] = {
      "number": data.valorContrato
    };
  }

  if (data.pastaDriveUrl) {
    properties["Pasta no Drive"] = {
      "url": data.pastaDriveUrl
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      parent: { database_id: DBS.PROJECTS },
      properties
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Erro ao criar projeto no Notion:", errText);
    throw new Error(`Notion API createProject error: ${response.status}`);
  }

  return response.json();
}

/**
 * Cria uma nova tarefa vinculada a um projeto no Notion.
 */
export async function createTask(data: {
  projetoId: string;
  titulo: string;
  prioridade?: string;
  prazo?: string;
  responsavelId?: string;
}): Promise<any> {
  const url = "https://api.notion.com/v1/pages";

  const properties: any = {
    "Tarefa": {
      "title": [
        {
          "text": {
            "content": data.titulo
          }
        }
      ]
    },
    "Projeto": {
      "relation": [
        {
          "id": data.projetoId
        }
      ]
    },
    "Status": {
      "select": {
        "name": "A fazer"
      }
    },
    "Prioridade": {
      "select": {
        "name": data.prioridade || "Média"
      }
    }
  };

  if (data.prazo) {
    properties["Prazo"] = {
      "date": {
        "start": data.prazo
      }
    };
  }

  if (data.responsavelId) {
    properties["Responsável"] = {
      "relation": [
        {
          "id": data.responsavelId
        }
      ]
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      parent: { database_id: DBS.TAREFAS },
      properties
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Erro ao criar tarefa no Notion:", errText);
    throw new Error(`Notion API createTask error: ${response.status}`);
  }

  return response.json();
}

/**
 * Atualiza o status de uma tarefa no Notion.
 */
export async function updateTaskStatus(taskId: string, status: string): Promise<any> {
  const url = `https://api.notion.com/v1/pages/${taskId}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "Status": {
          "select": {
            "name": status
          }
        }
      }
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Erro ao atualizar status da tarefa no Notion:", errText);
    throw new Error(`Notion API updateTaskStatus error: ${response.status}`);
  }

  return response.json();
}

/**
 * Atualiza o status e etapa de um projeto no Notion.
 */
export async function updateProjectStatus(projectId: string, status: string, etapa?: string): Promise<any> {
  const url = `https://api.notion.com/v1/pages/${projectId}`;

  const properties: any = {
    "Status": {
      "select": {
        "name": status
      }
    }
  };

  if (etapa) {
    properties["Etapa atual"] = {
      "select": {
        "name": etapa
      }
    };
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ properties }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Erro ao atualizar status do projeto no Notion:", errText);
    throw new Error(`Notion API updateProjectStatus error: ${response.status}`);
  }

  return response.json();
}

/**
 * Atualiza o link do Google Drive do projeto.
 */
export async function updateProjectDriveFolder(projectId: string, folderUrl: string): Promise<any> {
  const url = `https://api.notion.com/v1/pages/${projectId}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "Pasta no Drive": {
          "url": folderUrl
        }
      }
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Erro ao atualizar pasta do Drive do projeto no Notion:", errText);
    throw new Error(`Notion API updateProjectDriveFolder error: ${response.status}`);
  }

  return response.json();
}

/**
 * Atualiza as Observações (Briefing) de um projeto no Notion.
 */
export async function updateProjectObservations(projectId: string, observations: string): Promise<any> {
  const url = `https://api.notion.com/v1/pages/${projectId}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "Observações": {
          "rich_text": [
            {
              "text": {
                "content": observations
              }
            }
          ]
        }
      }
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Erro ao atualizar Observações do projeto no Notion:", errText);
    throw new Error(`Notion API updateProjectObservations error: ${response.status}`);
  }

  return response.json();
}

/**
 * Atualiza o Valor Contratado de um projeto no Notion.
 */
export async function updateProjectValue(projectId: string, value: number): Promise<any> {
  const url = `https://api.notion.com/v1/pages/${projectId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      properties: {
        'Valor contratado': {
          number: value,
        },
      },
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro ao atualizar valor do projeto no Notion (${projectId}):`, errorText);
    throw new Error(`Notion API updateProjectValue error: ${response.status}`);
  }

  return response.json();
}

/**
 * Atualiza o Status (etapa) de um Lead do CRM no Notion.
 */
export async function updateLeadStatus(leadId: string, status: string): Promise<any> {
  const url = `https://api.notion.com/v1/pages/${leadId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      properties: {
        'Status': {
          select: { name: status }
        },
      },
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro ao atualizar status do lead no Notion (${leadId}):`, errorText);
    throw new Error(`Notion API updateLeadStatus error: ${response.status}`);
  }

  return response.json();
}

/**
 * Atualiza a prioridade de uma tarefa no Notion.
 */
export async function updateTaskPriority(taskId: string, priority: string): Promise<any> {
  const url = `https://api.notion.com/v1/pages/${taskId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      properties: {
        'Prioridade': {
          select: { name: priority }
        },
      },
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro ao atualizar prioridade da tarefa no Notion (${taskId}):`, errorText);
    throw new Error(`Notion API updateTaskPriority error: ${response.status}`);
  }

  return response.json();
}

/**
 * Obtém os itens da tabela ORÇAMENTO vinculados a um projeto.
 */
export async function getProjectBudgetItems(projectId: string): Promise<any[]> {
  try {
    const data = await queryNotionDatabase(DBS.ORCAMENTO, {
      filter: {
        property: 'Projeto',
        relation: {
          contains: projectId,
        },
      },
    });

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const item = props['Item']?.type === 'title' && props['Item'].title.length > 0 
        ? props['Item'].title[0].plain_text 
        : 'Sem item';
      
      const categoria = props['Categoria']?.type === 'select' ? props['Categoria'].select?.name || '' : '';
      const tipo = props['Tipo']?.type === 'select' ? props['Tipo'].select?.name || 'Custo' : 'Custo';
      const valor_unitario = props['Valor unitário']?.type === 'number' ? props['Valor unitário'].number || 0 : 0;
      const quantidade = props['Quantidade']?.type === 'number' ? props['Quantidade'].number || 1 : 1;
      const total = props['Total']?.type === 'number' ? props['Total'].number || (valor_unitario * quantidade) : (valor_unitario * quantidade);
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'Estimado' : 'Estimado';
      const versao = props['Versão']?.type === 'select' ? props['Versão'].select?.name || 'Original' : 'Original';
      const fase = props['Fase']?.type === 'select' ? props['Fase'].select?.name || 'Proposta' : 'Proposta';

      let valor_real = 0;
      const rollupReal = props['Valor Real'];
      if (rollupReal && rollupReal.type === 'rollup' && rollupReal.rollup.type === 'number') {
        valor_real = rollupReal.rollup.number || 0;
      }

      return {
        id: page.id,
        item,
        categoria,
        tipo,
        valor_unitario,
        quantidade,
        total,
        status,
        versao,
        fase,
        valor_real,
        variancia: total - valor_real
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar itens de orçamento:", error);
    return [];
  }
}

/**
 * Obtém os itens da tabela FILMAGEM vinculados a um projeto.
 */
export async function getProjectFilmagens(projectId: string): Promise<any[]> {
  try {
    const data = await queryNotionDatabase(DBS.FILMAGEM, {
      filter: {
        property: 'Projeto',
        relation: {
          contains: projectId,
        },
      },
    });

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const nome = props['Nome da filmagem']?.type === 'title' && props['Nome da filmagem'].title.length > 0 
        ? props['Nome da filmagem'].title[0].plain_text 
        : 'Sem título';
      
      const local = props['Local']?.type === 'rich_text' && props['Local'].rich_text.length > 0 
        ? props['Local'].rich_text[0].plain_text 
        : '';
      
      const data_filmagem = props['Data']?.type === 'date' ? props['Data'].date?.start || '' : '';
      const equipamentos = props['Equipamentos']?.type === 'rich_text' && props['Equipamentos'].rich_text.length > 0 
        ? props['Equipamentos'].rich_text[0].plain_text 
        : '';
      
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'Pré-filmagem' : 'Pré-filmagem';
      const roteiro = props['Roteiro']?.type === 'url' ? props['Roteiro'].url || '' : '';
      const ordem_dia = props['Ordem do dia']?.type === 'url' ? props['Ordem do dia'].url || '' : '';

      return {
        id: page.id,
        nome,
        local,
        data: data_filmagem,
        equipamentos,
        status,
        roteiro,
        ordem_dia
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar filmagens do projeto:", error);
    return [];
  }
}

/**
 * Obtém os itens da tabela EDIÇÃO vinculados a um projeto.
 */
export async function getProjectEdicoes(projectId: string): Promise<any[]> {
  try {
    const data = await queryNotionDatabase(DBS.EDICAO, {
      filter: {
        property: 'Projeto',
        relation: {
          contains: projectId,
        },
      },
    });

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const nome = props['Nome da edição']?.type === 'title' && props['Nome da edição'].title.length > 0 
        ? props['Nome da edição'].title[0].plain_text 
        : 'Sem título';
      
      const etapa = props['Etapa de edição']?.type === 'select' ? props['Etapa de edição'].select?.name || '' : '';
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'Em andamento' : 'Em andamento';
      const aprova_status = props['Status de aprovação']?.type === 'select' ? props['Status de aprovação'].select?.name || 'Aguardando envio' : 'Aguardando envio';
      const editor = props['Editor']?.type === 'rich_text' && props['Editor'].rich_text.length > 0 
        ? props['Editor'].rich_text[0].plain_text 
        : '';
      
      const software = props['Software']?.type === 'select' ? props['Software'].select?.name || '' : '';
      const pasta_edicao = props['Pasta de edição']?.type === 'url' ? props['Pasta de edição'].url || '' : '';
      const link_entrega = props['Link de entrega']?.type === 'url' ? props['Link de entrega'].url || '' : '';
      const tipo_entrega = props['Tipo de entrega']?.type === 'select' ? props['Tipo de entrega'].select?.name || '' : '';
      const versao = props['Versão (entrega)']?.type === 'number' ? props['Versão (entrega)'].number || 1 : 1;
      const data_envio = props['Data de envio']?.type === 'date' ? props['Data de envio'].date?.start || '' : '';

      return {
        id: page.id,
        nome,
        etapa,
        status,
        aprova_status,
        editor,
        software,
        pasta_edicao,
        link_entrega,
        tipo_entrega,
        versao,
        data_envio
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar edições do projeto:", error);
    return [];
  }
}

/**
 * Obtém as transações de FINANCEIRO_PROJETO vinculadas a um projeto.
 */
export async function getProjectTransactions(projectId: string): Promise<any[]> {
  try {
    const data = await queryNotionDatabase(DBS.FINANCEIRO_PROJETO, {
      filter: {
        property: 'Projeto',
        relation: {
          contains: projectId,
        },
      },
    });

    return data.results.map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const descricao = props['Descrição']?.type === 'title' && props['Descrição'].title.length > 0 
        ? props['Descrição'].title[0].plain_text 
        : 'Sem descrição';
      
      const tipo = props['Tipo']?.type === 'select' ? props['Tipo'].select?.name || 'Despesa' : 'Despesa';
      const categoria = props['Categoria']?.type === 'select' ? props['Categoria'].select?.name || '' : '';
      const valor = props['Valor']?.type === 'number' ? props['Valor'].number || 0 : 0;
      const data_real = props['Data real']?.type === 'date' ? props['Data real'].date?.start || '' : '';
      const status = props['Status']?.type === 'select' ? props['Status'].select?.name || 'Pendente' : 'Pendente';
      const forma_pagamento = props['Forma de pagamento']?.type === 'select' ? props['Forma de pagamento'].select?.name || '' : '';
      const comprovante = props['Comprovante']?.type === 'url' ? props['Comprovante'].url || '' : '';

      return {
        id: page.id,
        descricao,
        tipo,
        categoria,
        valor,
        data: data_real,
        status,
        forma_pagamento,
        comprovante
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Erro ao carregar transações financeiras:", error);
    return [];
  }
}

