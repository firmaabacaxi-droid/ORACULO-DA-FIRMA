// Definição de Tipos e Interfaces Estáticas do Oráculo 2.0

export interface Projeto {
  id: string;
  nome: string;               // Nome do projeto (title)
  status: string;             // Status (select)
  valorContratado: number;    // Valor contratado (number)
  dataEntrega: string | null; // Data de entrega (date)
  dataInicio: string | null;  // Data de início (date)
  etapaAtual: string;         // Etapa atual (select)
  tipoProjeto: string;        // Tipo de projeto (select)
  observacoes: string;        // Observações (rich_text)
  prjId: string;              // PRJ-ID (unique_id)
  clienteId: string | null;   // Relação com Cliente
  clienteNome?: string;
  responsavelIds: string[];   // Relação com Contatos (Responsável)
  responsavelNomes?: string[];
  propostaIds: string[];      // Relação com Propostas
  tarefasIds: string[];       // Relação com Tarefas
  orcamentoIds: string[];     // Relação com Custos (Orçamento)
  pastaDrive: string | null;  // Pasta no Drive (url)
  escopoProjeto?: string[];   // Escopo do Projeto (multi_select)
}

export interface Cliente {
  id: string;
  nome: string;               // Nome do cliente (title)
  razaoSocial: string;        // Razão social (rich_text)
  email: string | null;       // E-mail (email)
  telefone: string | null;    // Telefone (phone_number)
  segmento: string | null;    // Segmento (select)
  nps: string | null;         // NPS Satisfação (select)
  cnpjCpf: string | null;     // CNPJ/CPF (rich_text)
  endereco: string | null;    // Endereço (rich_text)
  observacoes: string | null; // Observações (rich_text)
  cliId: string;              // CLI-ID (unique_id)
  projetosIds: string[];      // Relação com Projetos
  propostasIds: string[];     // Relação com Propostas
}

export interface Contato {
  id: string;
  nome: string;                     // Nome (title)
  funcaoPrincipal: string | null;   // Função principal (select)
  telefone: string | null;          // Telefone/WhatsApp (phone_number)
  email: string | null;             // E-mail (email)
  tipo: string | null;              // Tipo (select: Freelancer, Equipe fixa, Contato de cliente)
  cpf: string | null;               // CPF (rich_text)
  pix: string | null;               // PIX (rich_text)
  restricaoAlimentar: string | null;// Restrição Alimentar (rich_text) - Crítico de Set!
  portfolio: string | null;         // Portfolio (url)
  valorDiaria: number | null;       // Valor da diária (number)
  historicoSet: number | null;      // Histórico com a Firma (number)
  observacoes: string | null;       // Observações (rich_text)
  cttId: string;                    // CTT-ID (unique_id)
  clientesIds: string[];            // Relação com Clientes
  projetosIds: string[];            // Relação com Projetos
  tarefasIds: string[];             // Relação com Tarefas
  propostasIds: string[];           // Relação com Propostas
}

export interface Tarefa {
  id: string;
  title: string;              // Tarefa (title)
  status: string;             // Status (select)
  prioridade: string;         // Prioridade (select: Urgente, Alta, Média, Baixa)
  prazo: string | null;       // Prazo (date)
  observacoes: string | null; // Observações (rich_text)
  tarId: string;              // TAR-ID (unique_id)
  projetoId: string | null;   // Relação com Projeto
  projetoNome?: string;
  responsavelIds: string[];   // Relação com Responsável (Contato)
  responsavelNomes?: string[];
}

export interface Proposta {
  id: string;
  titulo: string;             // Título da Proposta (title)
  status: string;             // Status (select)
  valorTotal: number;         // Valor Total (number)
  versao: number;             // Versão (number)
  observacoes: string | null; // Observações (rich_text)
  prpId: string;              // PRP-ID (unique_id)
  projetoId: string | null;   // Relação com Projeto
  projetoNome?: string;
  clienteId: string | null;   // Relação com Cliente
  clienteNome?: string;
  responsavelIds: string[];   // Relação com Responsável (Contato)
}

export interface CrmOportunidade {
  id: string;
  oportunidade: string;       // Oportunidade (title)
  status: string;             // Status (select: Aberto, Ganho, Perdido, etc.)
  proximoContato: string | null; // Próximo contato (date)
  probabilidade: number | null;  // Probabilidade (number)
  historico: string | null;   // Histórico (rich_text)
  crmId: string;              // CRM-ID (unique_id)
  clienteId: string | null;   // Relação com Cliente
  clienteNome?: string;
  propostaId: string | null;  // Relação com Proposta
  propostaNome?: string;
  responsavelIds: string[];   // Relação com Responsável (Contato)
  valorProposta: number | null; // Rollup de Valor Total da Proposta
}

export interface ItemOrcamento {
  id: string;
  item: string;               // Item (title)
  total: number;              // Total (number)
  tipo: string;               // Tipo (select: Custo, Receita)
  fase: string;               // Fase (select: Proposta, Execucao)
  categoria: string;          // Categoria (select)
  status: string;             // Status (select: Estimado, Confirmado, Pago, Recebido)
  valorUnitario: number;      // Valor unitário (number)
  quantidade: number;         // Quantidade (number)
  projetoId: string | null;   // Relação com Projeto
  fornecedorId: string | null; // Relação com Contato (Fornecedor/Contato)
}

// Representação genérica do conteúdo livre do Notion (Blocos)
export interface NotionBlock {
  id: string;
  type: string;
  content: string;            // Conteúdo textual serializado
  checked?: boolean;          // Para blocos de To-Do list
}
