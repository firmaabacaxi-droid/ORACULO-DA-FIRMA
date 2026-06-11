import { getProjectDetail, getProjectTasks, getProjectProposal, getNotionPageBody } from '@/lib/notion';
import ClientProjectDetails from './ClientProjectDetails';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectDetail(id);

  if (!project) {
    return (
      <div className="content-area" style={{ textAlign: 'center', paddingTop: '80px', color: 'var(--text-dim)' }}>
        Projeto não encontrado no Notion.
      </div>
    );
  }

  // Fetch related records from active Notion databases in parallel
  const [tarefas, orcamento, corpoNotion] = await Promise.all([
    getProjectTasks(id),
    getProjectProposal(id),
    getNotionPageBody(id),
  ]);

  // Clean data structure representing active Phase 1 records
  return (
    <ClientProjectDetails
      project={project}
      tarefas={tarefas}
      orcamento={orcamento}
      corpoNotion={corpoNotion}
      financeiro={[]} // Removido por ser da Fase 2/3 (para visualização limpa)
      anotacoes={[]} // Removido por ser da Fase 2/3 (para visualização limpa)
      equipamentos={[]} // Removido por ser da Fase 2/3 (para visualização limpa)
    />
  );
}
