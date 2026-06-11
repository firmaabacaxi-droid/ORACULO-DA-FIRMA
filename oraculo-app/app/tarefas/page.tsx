import Link from "next/link";
import { getAllTasks } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export default async function TarefasPage() {
  const tarefas = await getAllTasks();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '--/--/--';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <div className="table-card" style={{ padding: '0px' }}>
      <table className="oraculo-table">
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Projeto</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Prazo</th>
            <th>Responsável</th>
          </tr>
        </thead>
        <tbody>
          {tarefas?.map((task: any) => (
            <tr key={task.id}>
              <td><strong>{task.titulo}</strong></td>
              <td style={{ color: 'var(--text-dim)' }}>
                {task.projetos?.id ? (
                  <Link href={`/projetos/${task.projetos.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                    🎬 {task.projetos.titulo}
                  </Link>
                ) : (
                  task.projetos?.titulo || '--'
                )}
              </td>
              <td>
                <span className={`badge badge-${task.prioridade === 'Urgente' ? 'red' : task.prioridade === 'Alta' ? 'orange' : 'gray'}`}>
                  {task.prioridade}
                </span>
              </td>
              <td>
                <span className={`badge badge-${['Concluída', 'Concluido'].includes(task.status) ? 'green' : task.status === 'Em andamento' ? 'orange' : 'gray'}`}>
                  {task.status}
                </span>
              </td>
              <td style={{ color: 'var(--text-dim)', fontSize: '12px' }}>{formatDate(task.data_limite)}</td>
              <td style={{ color: 'var(--text-dim)' }}>
                {task.responsavel?.id ? (
                  <Link href={`/contatos/${task.responsavel.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                    👤 {task.responsavel.nome}
                  </Link>
                ) : (
                  task.responsavel?.nome || '--'
                )}
              </td>
            </tr>
          ))}
          {(!tarefas || tarefas.length === 0) && (
             <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Nenhuma tarefa encontrada.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

