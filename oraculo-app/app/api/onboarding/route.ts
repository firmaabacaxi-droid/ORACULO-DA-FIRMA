import { NextResponse } from 'next/server';
import { createProject, updateProjectDriveFolder } from '@/lib/notion';
import { setupProjectDriveFolder } from '@/lib/google-drive';
import fs from 'fs';
import path from 'path';

const VAULT_PATH = 'C:\\Users\\User\\Documents\\ORACULO - FIRMA ABACAXI\\cerebro\\CEREBRO-ORACULO\\04-PROJETOS-ATIVOS';

function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-zA-Z0-9-]/g, '-')  // Substitui caracteres especiais por hífen
    .replace(/-+/g, '-')             // Remove hífens duplicados
    .replace(/^-+|-+$/g, '');        // Remove hífens no início/fim
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, clienteId, tipoProjeto, dataInicio, dataEntrega, valorContrato } = body;

    if (!titulo || !tipoProjeto) {
      return NextResponse.json({ error: 'Faltam parâmetros obrigatórios: titulo ou tipoProjeto' }, { status: 400 });
    }

    // 1. Criar o Projeto no Notion
    const notionPrj = await createProject({
      titulo,
      clienteId,
      tipoProjeto,
      dataInicio,
      dataEntrega,
      valorContrato: valorContrato ? Number(valorContrato) : undefined
    });

    const projectId = notionPrj.id;
    
    // Obter o PRJ-ID gerado no Notion (ID numérico autoincrementado)
    let projectNumber = 1;
    const prjIdProp = notionPrj.properties?.['PRJ-ID'];
    if (prjIdProp && prjIdProp.type === 'unique_id') {
      projectNumber = prjIdProp.unique_id?.number || 1;
    } else {
      // Se não vier no response imediato, vamos buscar a página de novo
      try {
        const res = await fetch(`https://api.notion.com/v1/pages/${projectId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28',
          },
          cache: 'no-store'
        });
        if (res.ok) {
          const freshPage = await res.json();
          projectNumber = freshPage.properties?.['PRJ-ID']?.unique_id?.number || 1;
        }
      } catch (e) {
        console.error('Erro ao re-buscar página do Notion para extrair o PRJ-ID:', e);
      }
    }

    // Gerar o nome padronizado da pasta física e no Drive
    const prefix = `FIRMA-${String(projectNumber).padStart(2, '0')}`;
    const slugName = `${prefix}-${slugify(titulo)}`;

    // 2. Configurar pastas no Google Drive
    let folderUrl = '';
    let folderId = '';
    try {
      const driveSetup = await setupProjectDriveFolder(slugName);
      folderUrl = driveSetup.folderUrl;
      folderId = driveSetup.folderId;

      // 3. Atualizar o Notion com a URL da pasta do Drive
      await updateProjectDriveFolder(projectId, folderUrl);
    } catch (driveErr: any) {
      console.error('Erro ao configurar Google Drive para o onboarding:', driveErr);
      // Não trava a transação se o Drive falhar, apenas reporta
    }

    // 4. Configurar pasta local no Cérebro (Obsidian)
    const folderPath = path.join(VAULT_PATH, slugName);
    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Inicializar templates
      const briefingContent = `# Briefing: ${titulo}\n\n**Projeto:** ${slugName}\n**Tipo:** ${tipoProjeto}\n**Data de Criação:** ${new Date().toLocaleDateString('pt-BR')}\n\n## 📝 Objetivos do Projeto\n- [ ] Descreva o principal objetivo do cliente.\n\n## 🎨 Identidade Visual & Tom de Voz\n- Referências visuais:\n- Paleta de cores:\n- Tom de voz: (Consultar skills/humanizador/SKILL.md)\n`;
      const roteiroContent = `# Roteiro: ${titulo}\n\n## CENA 1 - INT. LOCAÇÃO - DIA\n\n**Visual:**\n[descreva o que a câmera mostra]\n\n**Áudio:**\n[trilha sonora, voz em off]\n\n**Locução:**\n"Escreva aqui o texto do roteiro..."\n`;
      const diarioContent = `# Diário de Produção: ${titulo}\n\n## Diária 1 - ${new Date().toLocaleDateString('pt-BR')}\n\n**Equipe:**\n- Lipe (Diretor)\n- Jaya (Produtora)\n\n**Status do dia:**\n- [ ] Cenas planejadas gravadas\n- [ ] Backup finalizado\n`;
      const initialLayout = {
        nodes: [],
        edges: []
      };

      fs.writeFileSync(path.join(folderPath, 'briefing.md'), briefingContent, 'utf-8');
      fs.writeFileSync(path.join(folderPath, 'roteiro.md'), roteiroContent, 'utf-8');
      fs.writeFileSync(path.join(folderPath, 'diario_producao.md'), diarioContent, 'utf-8');
      fs.writeFileSync(path.join(folderPath, 'canvas-layout.json'), JSON.stringify(initialLayout, null, 2), 'utf-8');
    } catch (fsErr: any) {
      console.error('Erro ao criar pastas físicas do Cérebro localmente:', fsErr);
    }

    return NextResponse.json({
      success: true,
      projectId,
      projectSlug: slugName,
      folderUrl,
      folderId
    });
  } catch (error: any) {
    console.error('Erro no onboarding do projeto:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
