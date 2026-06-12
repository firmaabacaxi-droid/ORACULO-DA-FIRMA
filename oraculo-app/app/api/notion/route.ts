import { NextResponse } from 'next/server';
import { 
  createTask, 
  updateTaskStatus, 
  updateProjectStatus, 
  updateProjectDriveFolder, 
  updateProjectObservations,
  updateProjectValue,
  updateLeadStatus,
  updateTaskPriority
} from '@/lib/notion';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    if (!action) {
      return NextResponse.json({ error: 'Ação não especificada' }, { status: 400 });
    }

    let result;

    switch (action) {
      case 'createTask':
        if (!params.projectId || !params.titulo) {
          return NextResponse.json({ error: 'Faltam parâmetros projectId ou titulo' }, { status: 400 });
        }
        result = await createTask({
          projetoId: params.projectId,
          titulo: params.titulo,
          prioridade: params.prioridade || 'Normal',
          prazo: params.data_limite || undefined
        });
        break;

      case 'updateTaskStatus':
        if (!params.taskId || !params.status) {
          return NextResponse.json({ error: 'Faltam parâmetros taskId ou status' }, { status: 400 });
        }
        result = await updateTaskStatus(params.taskId, params.status);
        break;

      case 'updateProjectStatus':
        if (!params.projectId || !params.status) {
          return NextResponse.json({ error: 'Faltam parâmetros projectId ou status' }, { status: 400 });
        }
        result = await updateProjectStatus(params.projectId, params.status, params.etapa);
        break;

      case 'updateProjectObservations':
        if (!params.projectId || params.observations === undefined) {
          return NextResponse.json({ error: 'Faltam parâmetros projectId ou observations' }, { status: 400 });
        }
        result = await updateProjectObservations(params.projectId, params.observations);
        break;

      case 'updateProjectDriveFolder':
        if (!params.projectId || !params.folderUrl) {
          return NextResponse.json({ error: 'Faltam parâmetros projectId ou folderUrl' }, { status: 400 });
        }
        result = await updateProjectDriveFolder(params.projectId, params.folderUrl);
        break;

      case 'updateProjectValue':
        if (!params.projectId || params.value === undefined) {
          return NextResponse.json({ error: 'Faltam parâmetros projectId ou value' }, { status: 400 });
        }
        result = await updateProjectValue(params.projectId, Number(params.value));
        break;

      case 'updateLeadStatus':
        if (!params.leadId || !params.status) {
          return NextResponse.json({ error: 'Faltam parâmetros leadId ou status' }, { status: 400 });
        }
        result = await updateLeadStatus(params.leadId, params.status);
        break;

      case 'updateTaskPriority':
        if (!params.taskId || !params.priority) {
          return NextResponse.json({ error: 'Faltam parâmetros taskId ou priority' }, { status: 400 });
        }
        result = await updateTaskPriority(params.taskId, params.priority);
        break;

      default:
        return NextResponse.json({ error: `Ação desconhecida: ${action}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Erro na API Notion:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
