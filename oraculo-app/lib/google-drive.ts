import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const KEY_FILE_PATH = 'C:\\Users\\User\\Documents\\ANTIGRAVITY\\google_service_account.json';

function getDriveClient() {
  if (!fs.existsSync(KEY_FILE_PATH)) {
    throw new Error(`Google service account file not found at ${KEY_FILE_PATH}`);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return google.drive({ version: 'v3', auth });
}

/**
 * Busca ou cria uma pasta pelo nome e parentId.
 */
export async function getOrCreateFolder(name: string, parentId?: string): Promise<{ id: string; name: string; webViewLink: string }> {
  try {
    const drive = getDriveClient();
    let q = `name = '${name}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
    if (parentId) {
      q += ` and '${parentId}' in parents`;
    }

    const response = await drive.files.list({
      q,
      fields: 'files(id, name, webViewLink)',
      pageSize: 1,
    });

    const files = response.data.files || [];
    if (files.length > 0) {
      return {
        id: files[0].id!,
        name: files[0].name!,
        webViewLink: files[0].webViewLink!,
      };
    }

    // Se não existir, cria
    const fileMetadata: any = {
      name,
      mimeType: 'application/vnd.google-apps.folder',
    };

    if (parentId) {
      fileMetadata.parents = [parentId];
    }

    const createdFile = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id, name, webViewLink',
    });

    return {
      id: createdFile.data.id!,
      name: createdFile.data.name!,
      webViewLink: createdFile.data.webViewLink!,
    };
  } catch (error: any) {
    console.error(`Erro ao obter/criar pasta '${name}':`, error.message);
    throw error;
  }
}

/**
 * Cria a estrutura mestre de pastas para um novo projeto no Google Drive.
 */
export async function setupProjectDriveFolder(projectName: string): Promise<{ folderId: string; folderUrl: string }> {
  try {
    // 1. Obter ou criar a pasta raiz "FIRMA ABACAXI"
    const rootFolder = await getOrCreateFolder('FIRMA ABACAXI');
    
    // 2. Obter ou criar a subpasta "PROJETOS"
    const projetosFolder = await getOrCreateFolder('PROJETOS', rootFolder.id);
    
    // 3. Criar a pasta do projeto atual
    const projectFolder = await getOrCreateFolder(projectName, projetosFolder.id);
    
    // 4. Criar as subpastas padrão do projeto
    const subfolders = [
      '01_REFERENCIAS',
      '02_BRIEFINGS',
      '03_MATERIA_PRIMA',
      '04_PROJETOS_EDITAVEIS',
      '05_EXPORTES',
      '06_ENTREGA_FINAL'
    ];

    await Promise.all(
      subfolders.map(subName => getOrCreateFolder(subName, projectFolder.id))
    );

    return {
      folderId: projectFolder.id,
      folderUrl: projectFolder.webViewLink
    };
  } catch (error: any) {
    console.error(`Erro ao configurar pastas do Drive para o projeto '${projectName}':`, error.message);
    throw error;
  }
}

/**
 * Lista os arquivos contidos em uma pasta do Google Drive.
 */
export async function listFolderFiles(folderId: string) {
  try {
    const drive = getDriveClient();
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webViewLink, webContentLink, size, createdTime)',
      pageSize: 150,
    });

    const files = response.data.files || [];
    return files.map(file => {
      let type = 'other';
      if (file.mimeType?.startsWith('image/')) type = 'image';
      else if (file.mimeType?.startsWith('video/')) type = 'video';
      else if (file.mimeType === 'application/pdf') type = 'pdf';
      else if (file.mimeType?.includes('document') || file.mimeType?.includes('sheet')) type = 'document';
      else if (file.mimeType === 'application/vnd.google-apps.folder') type = 'folder';

      // Ampliar o thumbnail padrão do Drive (=s220) para melhor visualização (=s800)
      let thumbnailUrl = file.thumbnailLink;
      if (thumbnailUrl && thumbnailUrl.includes('=s220')) {
        thumbnailUrl = thumbnailUrl.replace('=s220', '=s800');
      }

      return {
        id: file.id,
        name: file.name,
        type,
        mimeType: file.mimeType,
        thumbnailUrl,
        webViewLink: file.webViewLink,
        webContentLink: file.webContentLink,
        size: file.size,
        createdTime: file.createdTime
      };
    });
  } catch (error: any) {
    console.error(`Erro ao listar arquivos do Drive da pasta '${folderId}':`, error.message);
    throw error;
  }
}

/**
 * Realiza o upload de um buffer de arquivo para uma pasta do Drive.
 */
export async function uploadFileToFolder(
  folderId: string, 
  fileName: string, 
  mimeType: string, 
  fileBuffer: Buffer
): Promise<{ id: string; name: string; webViewLink: string }> {
  try {
    const drive = getDriveClient();
    
    const fileMetadata = {
      name: fileName,
      parents: [folderId]
    };
    
    const media = {
      mimeType,
      body: new (require('stream').Readable)({
        read() {
          this.push(fileBuffer);
          this.push(null);
        }
      })
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id, name, webViewLink'
    });

    return {
      id: response.data.id!,
      name: response.data.name!,
      webViewLink: response.data.webViewLink!
    };
  } catch (error: any) {
    console.error(`Erro ao fazer upload do arquivo '${fileName}' no Drive:`, error.message);
    throw error;
  }
}
