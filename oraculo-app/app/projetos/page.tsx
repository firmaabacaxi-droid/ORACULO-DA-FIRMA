import Link from "next/link";
import { getAllProjects } from '@/lib/notion';

export const dynamic = 'force-dynamic';

function getStatusColor(status: string) {
  if (['Concluído', 'Finalizado'].includes(status)) return 'green';
  if (['Em produção', 'Edição', 'Filmagem', 'Trabalhando'].includes(status)) return 'orange';
  if (['Briefing', 'Proposta', 'Aprovado', 'Pré-produção'].includes(status)) return 'gold';
  if (['Cancelado'].includes(status)) return 'red';
  return 'gray';
}

export default async function ProjetosPage() {
  const projetos = await getAllProjects();

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '--/--/--';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <div className="table-card" style={{ padding: '0px' }}>
      <table className="oraculo-table">
        <thead>
          <tr>
            <th>Projeto</th>
            <th>Status</th>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Entrega</th>
          </tr>
        </thead>
        <tbody>
          {projetos?.map((prj: any) => (
            <tr key={prj.id}>
              <td>
                <Link href={`/projetos/${prj.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="project-name-sm">{prj.titulo}</div>
                  {prj.status !== 'Concluído' && (
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '45%' }}></div>
                    </div>
                  )}
                </Link>
              </td>
              <td>
                <span className={`badge badge-${getStatusColor(prj.status)}`}>
                  {prj.status}
                </span>
              </td>
              <td style={{ color: 'var(--text-dim)' }}>{prj.clientes?.nome || '--'}</td>
              <td style={{ fontWeight: 600 }}>{prj.valor_contrato ? formatCurrency(prj.valor_contrato) : '--'}</td>
              <td style={{ color: 'var(--text-dim)' }}>{formatDate(prj.data_entrega)}</td>
            </tr>
          ))}
          {(!projetos || projetos.length === 0) && (
             <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Nenhum projeto encontrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
