import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

// Força runtime Node.js (necessário para child_process e fs)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  const CEREBRO_PATH = process.env.CEREBRO_PATH || 
    'C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI\\cerebro';
  try {
    const body = await request.json();
    const { filePath, projectId, saveToObsidian = true, obsidianPath } = body;

    if (!filePath) {
      return NextResponse.json(
        { error: 'Caminho do arquivo não informado (filePath)' },
        { status: 400 }
      );
    }

    // Verificar se o arquivo existe
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: `Arquivo não encontrado: ${filePath}` },
        { status: 404 }
      );
    }

    // Verificar extensão suportada
    const ext = path.extname(filePath).toLowerCase();
    const supportedExtensions = ['.pdf', '.pptx', '.ppt', '.xlsx', '.xls', '.docx', '.doc', '.html', '.htm', '.csv', '.xml', '.json'];
    if (!supportedExtensions.includes(ext)) {
      return NextResponse.json(
        { error: `Extensão não suportada: ${ext}. Suportados: ${supportedExtensions.join(', ')}` },
        { status: 400 }
      );
    }

    // Executar MarkItDown
    let markdownContent = '';
    try {
      const { stdout, stderr } = await execAsync(`markitdown "${filePath}"`, {
        timeout: 60000, // 60 segundos de timeout
        maxBuffer: 10 * 1024 * 1024 // 10MB buffer
      });
      
      if (stderr && !stdout) {
        throw new Error(stderr);
      }
      
      markdownContent = stdout;
    } catch (execError: any) {
      // MarkItDown não instalado ou erro
      if (execError.message.includes('not recognized') || execError.message.includes('ENOENT')) {
        return NextResponse.json(
          { 
            error: 'MarkItDown não está instalado. Execute: pip install markitdown',
            installCommand: 'pip install markitdown'
          },
          { status: 503 }
        );
      }
      throw execError;
    }

    // Calcular estimativa de tokens (aproximação: 1 token ≈ 4 chars)
    const originalFileStat = await fs.stat(filePath);
    const originalBytes = originalFileStat.size;
    const markdownBytes = Buffer.byteLength(markdownContent, 'utf8');
    const tokenEstimate = Math.ceil(markdownContent.length / 4);
    const compressionRatio = originalBytes > 0 
      ? (originalBytes / markdownBytes).toFixed(1) + 'x'
      : 'N/A';

    // Salvar no Cérebro Obsidian
    let savedPath = '';
    if (saveToObsidian && markdownContent) {
      const fileName = obsidianPath || 
        `docs/${projectId ? projectId + '-' : ''}${path.basename(filePath, ext)}.md`;
      
      const fullSavePath = path.join(/* turbopackIgnore: true */ CEREBRO_PATH, fileName);
      
      // Criar diretório se não existir
      await fs.mkdir(path.dirname(/* turbopackIgnore: true */ fullSavePath), { recursive: true });
      
      // Adicionar cabeçalho com metadados
      const header = `---
source: "${path.basename(filePath)}"
converted_at: "${new Date().toISOString()}"
project_id: "${projectId || ''}"
original_format: "${ext.slice(1).toUpperCase()}"
token_estimate: ${tokenEstimate}
---

`;
      await fs.writeFile(fullSavePath, header + markdownContent, 'utf8');
      savedPath = fullSavePath;
    }

    return NextResponse.json({
      success: true,
      markdownContent,
      savedPath,
      tokenEstimate,
      compressionRatio,
      stats: {
        originalBytes,
        markdownBytes,
        originalFormat: ext.slice(1).toUpperCase(),
        linesGenerated: markdownContent.split('\n').length
      }
    });

  } catch (error: any) {
    console.error('Erro no endpoint MarkItDown:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const CEREBRO_PATH = process.env.CEREBRO_PATH || 
    'C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI\\cerebro';
  // Health check — verifica se markitdown está instalado
  try {
    const { stdout } = await execAsync('markitdown --version', { timeout: 5000 });
    return NextResponse.json({
      available: true,
      version: stdout.trim(),
      cerebroPath: CEREBRO_PATH,
      supportedFormats: ['PDF', 'PPTX', 'XLSX', 'DOCX', 'HTML', 'CSV', 'XML', 'JSON']
    });
  } catch {
    return NextResponse.json({
      available: false,
      installCommand: 'pip install markitdown',
      error: 'MarkItDown não encontrado no PATH do sistema'
    });
  }
}
