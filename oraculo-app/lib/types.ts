export interface ClientShort {
  id: string | null;
  nome: string;
  empresa?: string;
  email?: string;
  telefone?: string;
}

export interface ProjectShort {
  id: string;
  titulo: string;
  status: string;
  valor: number;
  entrega: string;
}

export interface ContactShort {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
}

export interface TaskShort {
  id: string;
  titulo: string;
  status: string;
  prioridade: string;
  prazo: string;
}

export interface ProposalShort {
  id: string;
  nome: string;
  status: string;
  valor: number;
}

export interface Project {
  id: string;
  titulo: string;
  status: string;
  valor_contrato: number;
  data_entrega: string;
  data_inicio: string;
  workflow_step: string;
  tipo_projeto: string;
  briefing: string;
  auto_id: number;
  diretor: string;
  clientes: ClientShort | null;
}

export interface Client {
  id: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  segmento: string;
  nps: string;
  cnpj_cpf: string;
  endereco: string;
  observacoes: string;
  auto_id: number;
  projetos: ProjectShort[];
  propostas: ProposalShort[];
  contatos: ContactShort[];
}

export interface Contact {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  tipo: string;
  cpf: string;
  pix: string;
  restricoes: string;
  portfolio: string;
  observacoes: string;
  valorDiaria: number;
  historicoFirma: number;
  auto_id: number;
  cliente: { id: string; nome: string } | null;
  projetos: ProjectShort[];
  tarefas: TaskShort[];
}

export interface Task {
  id: string;
  titulo: string;
  status: string;
  prioridade: string;
  data_limite: string;
  responsavel?: {
    id: string | null;
    nome: string;
  };
  projetos?: {
    id: string | null;
    titulo: string;
  };
}

export interface Lead {
  id: string;
  titulo: string;
  status: string;
  valor_contrato: number;
  created_at: string;
  clientes: ClientShort;
}

export interface Proposal {
  id: string;
  nome: string;
  status: string;
  valor_total: number;
  projetos: {
    id: string | null;
    titulo: string;
    clientes: ClientShort;
  };
}

export interface FinanceSummary {
  totalEntradas: number;
  totalSaidas: number;
  saldoAtual: number;
}

export interface DashboardKPIs {
  projetos_ativos: number;
  leads_funil: number;
  faturamento_mes: number;
}
