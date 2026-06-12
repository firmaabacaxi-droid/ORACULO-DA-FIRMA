import { NextResponse } from 'next/server';
import { uploadFileToFolder } from '@/lib/google-drive';
import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const VAULT_PATH = 'C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI\\cerebro\\CEREBRO-ORACULO\\04-PROJETOS-ATIVOS';

// Auxiliar para slugificar o título do projeto
function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Encontra a pasta do projeto
function getProjectFolderPath(projectNumber: string | number, projectTitle: string): string {
  const prefix = `FIRMA-${String(projectNumber).padStart(2, '0')}`;
  const folderName = `${prefix}-${slugify(projectTitle)}`;
  return path.join(VAULT_PATH, folderName);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, studyType, projectContext, folderId } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt é obrigatório' }, { status: 400 });
    }

    const { titulo: projectTitle, auto_id: projectNumber } = projectContext || {};

    let imageBuffer: Buffer | null = null;
    let generatorUsed = '';

    // 1. Tentar gerar imagem local via Stable Diffusion (Automatic1111) na porta 7860
    try {
      console.log('Tentando gerar imagem local via Automatic1111...');
      const sdResponse = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${prompt}, cinematic lighting, photorealistic, 4k, film grain`,
          negative_prompt: 'cartoon, drawing, anime, low quality, worst quality',
          steps: 25,
          width: 768,
          height: 512
        }),
        signal: AbortSignal.timeout(60000) // 1 minuto de timeout
      });

      if (sdResponse.ok) {
        const sdResult = await sdResponse.json();
        if (sdResult.images && sdResult.images.length > 0) {
          imageBuffer = Buffer.from(sdResult.images[0], 'base64');
          generatorUsed = 'Stable Diffusion Local';
        }
      }
    } catch (e) {
      console.log('Stable Diffusion local offline ou falhou. Tentando fallback...');
    }

    // 2. Fallback para OpenAI DALL-E 3 (nuvem) se o local estiver offline
    if (!imageBuffer) {
      if (!OPENAI_API_KEY) {
        return NextResponse.json({ error: 'Nenhuma IA de imagem local ativa e OPENAI_API_KEY ausente' }, { status: 500 });
      }

      console.log('Usando OpenAI DALL-E 3 como fallback...');
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: `${prompt}, cinematic style, professional photography, high-end production design`,
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json'
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Erro na geração do DALL-E:', errText);
        return NextResponse.json({ error: 'Falha ao gerar imagem na nuvem' }, { status: 500 });
      }

      const result = await response.json();
      const base64Data = result.data[0].b64_json;
      imageBuffer = Buffer.from(base64Data, 'base64');
      generatorUsed = 'OpenAI DALL-E 3';
    }

    // 3. Salvar o arquivo gerado localmente na pasta do projeto no Cérebro
    const fileName = `${slugify(studyType || 'estudo')}-${Date.now()}.png`;
    let localSavedPath = '';

    if (projectNumber && projectTitle) {
      const folderPath = getProjectFolderPath(projectNumber, projectTitle);
      const studyDir = path.join(folderPath, 'estudos');
      
      if (!fs.existsSync(studyDir)) {
        fs.mkdirSync(studyDir, { recursive: true });
      }
      
      localSavedPath = path.join(studyDir, fileName);
      fs.writeFileSync(localSavedPath, imageBuffer);
    }

    // 4. Fazer upload para a pasta correta no Google Drive (se o folderId estiver disponível)
    let driveFileUrl = '';
    if (folderId) {
      try {
        const driveResult = await uploadFileToFolder(folderId, fileName, 'image/png', imageBuffer);
        driveFileUrl = driveResult.webViewLink;
      } catch (err) {
        console.error('Falha ao fazer upload da imagem de estudo para o Drive:', err);
      }
    }

    return NextResponse.json({
      success: true,
      fileName,
      generatorUsed,
      localSavedPath: localSavedPath ? `/cerebro/${path.basename(localSavedPath)}` : null,
      webViewLink: driveFileUrl
    });
  } catch (error: any) {
    console.error('Erro na API de Geração de Imagem:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
