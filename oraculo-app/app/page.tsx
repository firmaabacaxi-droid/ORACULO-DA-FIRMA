import { 
   getDashboardKPIs, 
   getActiveProjects, 
   getPipelineLeads, 
   getTasks, 
   getFinanceSummary,
   getClientes
} from '@/lib/notion';
import ClientDashboard from "@/app/components/ClientDashboard";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const clientes = await getClientes();

  // Fetch live operational data from Notion in parallel
  const [kpis, projectsData, leadsData, tasksData, finance] = await Promise.all([
    getDashboardKPIs(),
    getActiveProjects(),
    getPipelineLeads(),
    getTasks(),
    getFinanceSummary()
  ]);

  // Sync cash flow with KPIs faturamento_mes
  kpis.faturamento_mes = finance.totalEntradas;

  return (
    <ClientDashboard
      clientes={clientes}
      initialKPIs={kpis}
      initialProjects={projectsData}
      initialLeads={leadsData}
      initialTasks={tasksData}
      initialFinance={finance}
    />
  );
}
