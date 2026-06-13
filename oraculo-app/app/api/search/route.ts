import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VAULT_ROOT = 'C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI\\cerebro\\CEREBRO-ORACULO';

function getSnippet(content: string, term: string): string {
  const index = content.toLowerCase().indexOf(term.toLowerCase());
  if (index === -1) return '';
  const start = Math.max(0, index - 45);
  const end = Math.min(content.length, index + term.length + 45);
  let snippet = content.substring(start, end).replace(/\s+/g, ' ');
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  return snippet;
}

function searchObsidianFiles(dir: string, term: string, results: any[] = []): any[] {
  if (!fs.existsSync(dir)) return results;
  
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    console.error('Erro ao ler diretório do Cérebro:', dir, e);
    return results;
  }

  for (const file of files) {
    const fullPath = path.join(dir, file);
    
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      continue;
    }

    if (stat.isDirectory()) {
      if (file.startsWith('.') || file === 'node_modules') continue;
      searchObsidianFiles(fullPath, term, results);
    } else if (file.endsWith('.md')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matchesName = file.toLowerCase().includes(term.toLowerCase());
        const matchesContent = content.toLowerCase().includes(term.toLowerCase());

        if (matchesName || matchesContent) {
          results.push({
            type: 'cerebro',
            label: '🧠 Cérebro (Wiki)',
            title: file.replace('.md', ''),
            url: `/cerebro?file=${encodeURIComponent(file.replace('.md', ''))}`, // Fallback ou visualizador
            path: file,
            snippet: matchesContent 
              ? getSnippet(content, term) 
              : 'Nota no Cérebro (Obsidian)'
          });
        }
      } catch (e) {
        // Ignora erros de leitura de arquivos individuais
      }
    }
  }
  return results;
}

async function searchNotion(term: string): Promise<any[]> {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  if (!NOTION_TOKEN) {
    console.warn('NOTION_TOKEN ausente. Pesquisa Notion desativada.');
    return [];
  }

  const headers = {
    "Authorization": `Bearer ${NOTION_TOKEN}`,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
  };
  
  try {
    const response = await fetch('https://api.notion.com/v1/search', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: term,
        page_size: 15,
        filter: {
          property: 'object',
          value: 'page'
        }
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Erro ao pesquisar no Notion:', await response.text());
      return [];
    }

    const data = await response.json();
    const results: any[] = [];

    for (const page of data.results) {
      const parentDb = page.parent?.database_id;
      let type = 'notion';
      let label = '📄 Notion';
      let url = `/`; 

      const dbCleanId = parentDb ? parentDb.replace(/-/g, '') : '';
      
      const DB_PROJECTS = "2c031822-5594-4204-826b-752d5c2897bc".replace(/-/g, '');
      const DB_CLIENTES = "b08a5316-af2c-4fc7-9815-a5f50ac8e654".replace(/-/g, '');
      const DB_CONTATOS = "43fa1821-83f1-47e4-9ba3-711ca8c3a210".replace(/-/g, '');
      const DB_TAREFAS = "6c3ccf72-5539-43f6-9fbb-7906142a246d".replace(/-/g, '');
      const DB_CRM = "5240a3c2-d0d1-4726-b23b-96463f5cc615".replace(/-/g, '');
      const DB_PROPOSTAS = "3548a525-91f3-80e6-b542-e2e651ed5dfc".replace(/-/g, '');

      if (dbCleanId === DB_PROJECTS) {
        type = 'project';
        label = '🎬 Obra / Projeto';
        url = `/projetos/${page.id}`;
      } else if (dbCleanId === DB_CLIENTES) {
        type = 'client';
        label = '🏢 Cliente';
        url = `/clientes`;
      } else if (dbCleanId === DB_CONTATOS) {
        type = 'contact';
        label = '👥 Contato';
        url = `/contatos`;
      } else if (dbCleanId === DB_TAREFAS) {
        type = 'task';
        label = '✅ Tarefa';
        url = `/tarefas`;
      } else if (dbCleanId === DB_CRM) {
        type = 'lead';
        label = '🤝 CRM Funil';
        url = `/`;
      } else if (dbCleanId === DB_PROPOSTAS) {
        type = 'proposal';
        label = '📊 Orçamento';
        url = `/orcamentos`;
      }

      let title = 'Sem título';
      const props = page.properties;
      if (props) {
        const titleProp = Object.values(props).find((p: any) => p.type === 'title') as any;
        if (titleProp && titleProp.title?.length > 0) {
          title = titleProp.title[0].plain_text;
        }
      }

      results.push({
        type,
        label,
        title,
        url,
        id: page.id,
        snippet: `Registro no banco de dados Notion (${label.substring(2)})`
      });
    }

    return results;
  } catch (error) {
    console.error('Erro na chamada Notion Search API:', error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('q');

    if (!term || term.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const [notionResults, cerebroResults] = await Promise.all([
      searchNotion(term),
      Promise.resolve(searchObsidianFiles(VAULT_ROOT, term))
    ]);

    const combined = [...notionResults, ...cerebroResults];
    return NextResponse.json({ results: combined });
  } catch (error: any) {
    console.error('Erro na API Global Search:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
