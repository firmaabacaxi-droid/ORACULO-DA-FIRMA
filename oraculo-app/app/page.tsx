import Link from "next/link";
import { 
   getDashboardKPIs, 
   getActiveProjects, 
   getPipelineLeads, 
   getTasks, 
   getFinanceSummary,
   getNotionPageBody
} from '@/lib/notion';
import FinanceChart from "@/app/components/FinanceChart";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  // Fetch live operational data from Notion (Only Read)
  const kpis = await getDashboardKPIs();
  const projectsData = await getActiveProjects();
  const leadsData = await getPipelineLeads();
  const tasksData = await getTasks();
  
  // Dynamic financial calculation from projects
  const finance = await getFinanceSummary();
  const totalEntradas = finance.totalEntradas;
  const totalSaidas = finance.totalSaidas;
  const saldoAtual = finance.saldoAtual;

  // Sync cash flow with KPIs faturamento_mes
  kpis.faturamento_mes = totalEntradas;

  // Parallel fetch body content for active projects in parallel
  const projectsWithBody = await Promise.all(
    projectsData.map(async (prj: any) => {
      try {
        const body = await getNotionPageBody(prj.id);
        return {
          ...prj,
          corpoNotion: body,
        };
      } catch (err) {
        console.error(`Erro ao buscar corpo do projeto ${prj.titulo}:`, err);
        return {
          ...prj,
          corpoNotion: '',
        };
      }
    })
  );

  // Combine observations and page body content into dynamic briefings/insights
  const briefings: any[] = [];
  for (const prj of projectsWithBody) {
    if (prj.briefing && prj.briefing.trim() !== '') {
      briefings.push({
        id: prj.id,
        titulo: prj.titulo,
        texto: prj.briefing,
        cliente: prj.clientes?.nome || 'Geral',
        status: prj.status,
        tipo: 'Observações',
      });
    }
    if (prj.corpoNotion && prj.corpoNotion.trim() !== '') {
      briefings.push({
        id: prj.id,
        titulo: prj.titulo,
        texto: prj.corpoNotion,
        cliente: prj.clientes?.nome || 'Geral',
        status: prj.status,
        tipo: 'Corpo do Doc',
      });
    }
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '--/--/--';
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  // Status Badge Colors for active projects
  const getStatusColor = (status: string) => {
    if (['Concluído', 'Finalizado'].includes(status)) return 'green';
    if (['Em produção', 'Edição', 'Filmagem', 'Trabalhando'].includes(status)) return 'orange';
    if (['Briefing', 'Proposta', 'Aprovado', 'Pré-produção'].includes(status)) return 'gold';
    return 'gray';
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cinematic Ambient Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-gold opacity-5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-green opacity-5 blur-[150px] pointer-events-none"></div>

      <div className="dashboard-container relative z-10">
        {/* KPI GRID - Highly visual and micro-animated */}
        <div className="kpi-grid grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <div className="kpi-card gold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,154,106,0.08)]">
            <div className="kpi-label">Obras Ativas</div>
            <div className="kpi-value">{kpis.projetos_ativos}</div>
            <div className="kpi-sub">no ateliê</div>
            <div className="kpi-icon">🎬</div>
          </div>
          <div className="kpi-card blue transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(91,110,122,0.08)]">
            <div className="kpi-label">Aproximações</div>
            <div className="kpi-value">{kpis.leads_funil}</div>
            <div className="kpi-sub">exploração narrativa</div>
            <div className="kpi-icon">🔍</div>
          </div>
          <div className="kpi-card green transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(104,115,83,0.08)]">
            <div className="kpi-label">Entradas Mês</div>
            <div className="kpi-value" style={{ fontSize: '18px' }}>{formatCurrency(kpis.faturamento_mes)}</div>
            <div className="kpi-sub">vitalidade financeira</div>
            <div className="kpi-icon">💰</div>
          </div>
          <div className="kpi-card orange transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(200,107,60,0.08)]">
            <div className="kpi-label">Viabilidade (Meta)</div>
            <div className="kpi-value">R$ 50k</div>
            <div className="kpi-sub">{Math.round((kpis.faturamento_mes / 50000) * 100)}% atingido</div>
            <div className="kpi-icon">📈</div>
          </div>
          <div className="kpi-card red transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(164,72,64,0.08)] relative">
            <div className="kpi-label">Focos Imediatos</div>
            <div className="kpi-value flex items-center gap-2">
              {kpis.projetos_ativos > 0 && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red"></span>
                </span>
              )}
              {tasksData?.filter((t: any) => t.prioridade === 'Urgente').length || 0}
            </div>
            <div className="kpi-sub">atenção requerida</div>
            <div className="kpi-icon">⚠️</div>
          </div>
        </div>

        {/* Main Body - 2 Columns (65% / 35%) */}
        <div className="grid-65-35">
          {/* Column Left */}
          <div>
            {/* Obras Section */}
            <div className="section-header">
              <h3 className="section-title">Obras no Ateliê</h3>
              <Link href="/projetos" className="section-link">Ver todas →</Link>
            </div>
            <div className="table-wrap mb-6 border border-border/40 rounded-lg overflow-hidden bg-surface/50 backdrop-blur-md">
              <table className="oraculo-table">
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Cliente</th>
                    <th>Status</th>
                    <th>Entrega</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData?.map((prj: any) => (
                    <tr key={prj.id} className="hover:bg-surface2/30 transition-colors duration-200">
                      <td>
                        <Link href={`/projetos/${prj.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div className="project-name-sm font-semibold hover:text-gold transition-colors">{prj.titulo}</div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: '50%' }}></div></div>
                        </Link>
                      </td>
                      <td style={{ color: 'var(--text-dim)' }}>
                        {prj.clientes?.id ? (
                          <Link href={`/clientes/${prj.clientes.id}`} className="hover:text-gold transition-colors">
                            🏢 {prj.clientes.nome}
                          </Link>
                        ) : (
                          prj.clientes?.nome || '--'
                        )}
                      </td>
                      <td>
                        <span className={`badge badge-${getStatusColor(prj.status)}`}>
                          {prj.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-dim)', fontSize: '12px' }}>{formatDate(prj.data_entrega)}</td>
                      <td style={{ fontWeight: 600, color: 'var(--gold)' }}>{formatCurrency(prj.valor_contrato || 0)}</td>
                    </tr>
                  ))}
                  {(!projectsData || projectsData.length === 0) && (
                     <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>Nenhum projeto ativo.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* CRM Funnel Section */}
            <div className="section-header">
              <h3 className="section-title">Aproximações & Narrativas (CRM)</h3>
            </div>
            <div className="table-wrap border border-border/40 rounded-lg overflow-hidden bg-surface/50 backdrop-blur-md">
              <table className="oraculo-table">
                <thead>
                  <tr>
                    <th>Oportunidade / Lead</th>
                    <th>Empresa / Cliente</th>
                    <th>Etapa Funil</th>
                    <th>Valor Est.</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsData?.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-surface2/30 transition-colors duration-200">
                      <td style={{ fontWeight: 600 }}>{lead.titulo}</td>
                      <td style={{ color: 'var(--text-dim)' }}>
                        {lead.clientes?.id ? (
                          <Link href={`/clientes/${lead.clientes.id}`} className="hover:text-gold transition-colors">
                            🏢 {lead.clientes.nome}
                          </Link>
                        ) : (
                          lead.clientes?.nome || '--'
                        )}
                      </td>
                      <td><span className="badge badge-blue">Proposta</span></td>
                      <td style={{ fontWeight: 600, color: 'var(--gold)' }}>{formatCurrency(lead.valor_contrato || 0)}</td>
                      <td style={{ color: 'var(--text-dim)', fontSize: '12px' }}>{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                  {(!leadsData || leadsData.length === 0) && (
                     <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>Nenhum lead no funil.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column Right */}
          <div>
            {/* Urgent Tasks */}
            <div className="section-header">
              <h3 className="section-title">Focos de Ação Imediata</h3>
              <Link href="/tarefas" className="section-link">Ver todas →</Link>
            </div>
            <div className="card border border-border/40 bg-surface/50 backdrop-blur-md mb-6" style={{ padding: 0 }}>
              {tasksData?.map((task: any) => (
                <div className="task-item flex items-center justify-between p-3 border-b border-border/30 hover:bg-surface2/30 transition-all duration-200" key={task.id}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red"></span>
                    </span>
                    <div className="task-info">
                      <div className="task-name font-semibold" style={{ fontSize: '13px' }}>{task.titulo}</div>
                      <div className="task-project">
                        {task.projetos?.id ? (
                          <Link href={`/projetos/${task.projetos.id}`} className="text-text-muted hover:text-gold transition-colors" style={{ fontSize: '11px' }}>
                            🎬 {task.projetos.titulo}
                          </Link>
                        ) : (
                          task.projetos?.titulo
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`badge badge-${task.prioridade === 'Urgente' ? 'red' : 'orange'}`}>
                    {task.prioridade}
                  </span>
                </div>
              ))}
              {(!tasksData || tasksData.length === 0) && (
                 <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>Nenhuma tarefa urgente.</div>
              )}
            </div>

            {/* Financial Health */}
            <div>
              <div className="section-header">
                <h3 className="section-title">Saúde Financeira</h3>
              </div>
              <div className="card border border-border/40 bg-surface/50 backdrop-blur-md p-5">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Entradas Realizadas</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green)' }}>+ {formatCurrency(totalEntradas)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Saídas Estimadas (40%)</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--red)' }}>- {formatCurrency(totalSaidas)}</span>
                </div>
                <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Saldo Estimado</span>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gold)' }}>{formatCurrency(saldoAtual)}</span>
                </div>
                {/* Embedded custom area chart */}
                <FinanceChart data={projectsData} />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Briefing Fragments Section - Populated from live Notion Projects data */}
        <div className="section-header mt-8">
          <h3 className="section-title">Fragmentos & Insights (Briefings & Diários de Bordo)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {briefings.map((brief, idx) => (
            <div 
              className="nota-card border-l-[3px] p-5 rounded-lg bg-surface/50 backdrop-blur-md border border-border/40 transition-all duration-300 hover:scale-[1.02] hover:border-gold/30" 
              key={`${brief.id}-${brief.tipo}`} 
              style={{ borderLeftColor: brief.tipo === 'Observações' ? 'var(--gold)' : 'var(--blue)' }}
            >
              <div className="nota-title font-semibold text-text mb-3" style={{ fontSize: '14px' }}>
                <Link href={`/projetos/${brief.id}`} className="hover:text-gold transition-colors">
                  {brief.tipo === 'Observações' ? '📋' : '📖'} {brief.titulo}
                </Link>
              </div>
              <div className="nota-text text-text-dim mb-4 leading-relaxed" style={{ fontSize: '13px', minHeight: '80px', whiteSpace: 'pre-wrap' }}>
                {brief.texto.length > 180 ? brief.texto.substring(0, 180) + '...' : brief.texto}
              </div>
              <div className="nota-meta flex justify-between items-center text-text-muted" style={{ fontSize: '11px' }}>
                <span>🏢 {brief.cliente}</span>
                <div className="flex gap-2">
                  <span className={`badge badge-${brief.tipo === 'Observações' ? 'gold' : 'blue'}`}>
                    {brief.tipo}
                  </span>
                  <span className={`badge badge-${getStatusColor(brief.status)}`}>{brief.status}</span>
                </div>
              </div>
            </div>
          ))}
          {briefings.length === 0 && (
             <div className="col-span-3 text-center p-8 bg-surface/30 rounded-lg text-text-dim border border-dashed border-border/40">
               Nenhum briefing ou corpo do documento preenchido nos projetos ativos no Notion.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
