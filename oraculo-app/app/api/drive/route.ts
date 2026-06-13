import { NextResponse } from 'next/server';
import { listFolderFiles, uploadFileToFolder, setupProjectDriveFolder } from '@/lib/google-drive';
import { updateProjectDriveFolder } from '@/lib/notion';

// Helper para extrair o ID da pasta a partir da URL do Drive
function extractFolderId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/folders\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderUrl = searchParams.get('folderUrl');
    let folderId = searchParams.get('folderId');

    if (!folderId && folderUrl) {
      folderId = extractFolderId(folderUrl);
    }

    if (!folderId) {
      return NextResponse.json({ error: 'Parâmetro folderId ou folderUrl inválido/ausente' }, { status: 400 });
    }

    const files = await listFolderFiles(folderId);
    return NextResponse.json({ files });
  } catch (error: any) {
    console.error('Erro na API Drive GET:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const body = await request.json();
      const { action, projectId, projectName } = body;
      
      if (action === 'setup') {
        if (!projectId || !projectName) {
          return NextResponse.json({ error: 'Faltam parâmetros projectId ou projectName' }, { status: 400 });
        }
        
        // 1. Criar pastas no Google Drive
        const driveSetup = await setupProjectDriveFolder(projectName);
        const { folderId, folderUrl } = driveSetup;
        
        // 2. Atualizar o Notion com a URL da pasta do Drive
        await updateProjectDriveFolder(projectId, folderUrl);
        
        return NextResponse.json({ success: true, folderId, folderUrl });
      }
      
      return NextResponse.json({ error: 'Ação JSON desconhecida' }, { status: 400 });
    }
    
    // Fallback: upload de arquivo (multipart/form-data)
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folderId = formData.get('folderId') as string;

    if (!file || !folderId) {
      return NextResponse.json({ error: 'Arquivo ou folderId ausentes' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadFileToFolder(folderId, file.name, file.type, buffer);

    return NextResponse.json({ success: true, file: result });
  } catch (error: any) {
    console.error('Erro na API Drive POST:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
