import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VAULT_PATH = 'C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI\\cerebro\\CEREBRO-ORACULO\\04-PROJETOS-ATIVOS';

// Auxiliar para slugificar o título do projeto
function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-zA-Z0-9-]/g, '-')  // Substitui caracteres especiais por hífen
    .replace(/-+/g, '-')             // Remove hífens duplicados
    .replace(/^-+|-+$/g, '');        // Remove hífens no início/fim
}

// Encontra a pasta física do projeto baseando-se no ID numérico ou título
function getProjectFolderPath(projectNumber: string | number, projectTitle: string): { folderPath: string; folderName: string } {
  const folders = fs.readdirSync(VAULT_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  const prefix = `FIRMA-${String(projectNumber).padStart(2, '0')}`;
  const match = folders.find(f => f.name.startsWith(prefix) || f.name.includes(slugify(projectTitle)));

  let folderName = match ? match.name : `${prefix}-${slugify(projectTitle)}`;
  return {
    folderPath: path.join(VAULT_PATH, folderName),
    folderName
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectNumber = searchParams.get('projectNumber');
    const projectTitle = searchParams.get('projectTitle');

    if (!projectNumber || !projectTitle) {
      return NextResponse.json({ error: 'Faltam parâmetros projectNumber ou projectTitle' }, { status: 400 });
    }

    const { folderPath } = getProjectFolderPath(projectNumber, projectTitle);

    if (!fs.existsSync(folderPath)) {
      return NextResponse.json({ folderExists: false, notes: [], layout: null });
    }

    // Listar todos os arquivos da pasta do projeto
    const files = fs.readdirSync(folderPath);
    const notes: any[] = [];
    let layout: any = null;

    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        notes.push({
          name: file.replace('.md', ''),
          fileName: file,
          content
        });
      } else if (file === 'canvas-layout.json') {
        try {
          const layoutContent = fs.readFileSync(filePath, 'utf-8');
          layout = JSON.parse(layoutContent);
        } catch (e) {
          console.error('Erro ao ler canvas-layout.json:', e);
        }
      }
    });

    return NextResponse.json({
      folderExists: true,
      notes,
      layout
    });
  } catch (error: any) {
    console.error('Erro na API Cérebro GET:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectNumber, projectTitle, layout, fileName, content } = body;

    if (!projectNumber || !projectTitle) {
      return NextResponse.json({ error: 'Parâmetros projectNumber e projectTitle são obrigatórios' }, { status: 400 });
    }

    const { folderPath } = getProjectFolderPath(projectNumber, projectTitle);

    // Se a pasta não existe, cria
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Salvar o layout do Canvas no arquivo local canvas-layout.json
    if (layout) {
      const layoutPath = path.join(folderPath, 'canvas-layout.json');
      fs.writeFileSync(layoutPath, JSON.stringify(layout, null, 2), 'utf-8');
    }

    // Salvar/Editar uma nota específica em Markdown
    if (fileName && content !== undefined) {
      const notePath = path.join(folderPath, `${fileName}.md`);
      fs.writeFileSync(notePath, content, 'utf-8');
    }

    return NextResponse.json({ success: true, folderPath });
  } catch (error: any) {
    console.error('Erro na API Cérebro POST:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
