import { 
  getProjectDetail, 
  getProjectTasks, 
  getProjectProposal, 
  getNotionPageBody,
  getProjectBudgetItems,
  getProjectFilmagens,
  getProjectEdicoes,
  getProjectTransactions
} from '@/lib/notion';
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
  const [tarefas, orcamento, corpoNotion, orcamentoItens, filmagens, edicoes, transacoes] = await Promise.all([
    getProjectTasks(id),
    getProjectProposal(id),
    getNotionPageBody(id),
    getProjectBudgetItems(id),
    getProjectFilmagens(id),
    getProjectEdicoes(id),
    getProjectTransactions(id)
  ]);

  return (
    <ClientProjectDetails
      project={project}
      tarefas={tarefas}
      orcamento={orcamento}
      corpoNotion={corpoNotion}
      orcamentoItens={orcamentoItens}
      filmagens={filmagens}
      edicoes={edicoes}
      transacoes={transacoes}
    />
  );
}
