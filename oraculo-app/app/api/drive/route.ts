import { NextResponse } from 'next/server';
import { listFolderFiles, uploadFileToFolder } from '@/lib/google-drive';

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
