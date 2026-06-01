import React from "react";
import { notFound } from "next/navigation";
import { 
  getProjetoById, 
  getClienteById, 
  getContatos, 
  getTarefas, 
  getItensOrcamento, 
  getNotionPageBody 
} from "@/lib/notion";
import ClientProjectDetails from "@/components/ClientProjectDetails";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  // 1. Apenas acessa os parâmetros dinâmicos após explicitamente aguardar a Promise (Next.js 16 / React 19)
  const { id } = await params;

  // 2. Carrega o projeto central
  const projeto = await getProjetoById(id);
  if (!projeto) {
    return notFound();
  }

  // 3. Carrega os demais bancos relacionais em paralelo para carregar o ecossistema conectado
  const [
    clientesAll,
    contatosAll,
    tarefasAll,
    orcamentosAll,
    diarioDeBordo
  ] = await Promise.all([
    projeto.clienteId ? getClienteById(projeto.clienteId) : Promise.resolve(null),
    getContatos(),
    getTarefas(),
    getItensOrcamento(),
    getNotionPageBody(id)
  ]);

  // 4. Resolve relacionamentos localmente no servidor com base em IDs
  const cliente = clientesAll; // Já é o cliente individual correto
  
  // Filtra contatos que fazem parte dos responsáveis do projeto ou que o projeto lista
  const equipe = contatosAll.filter(c => 
    projeto.responsavelIds.includes(c.id) || 
    c.projetosIds.includes(projeto.id)
  );

  // Filtra tarefas atreladas a este projeto
  const tarefas = tarefasAll.filter(t => t.projetoId === projeto.id);

  // Filtra itens de custos (Orçamento) vinculados a este projeto
  const itensOrcamento = orcamentosAll.filter(o => o.projetoId === projeto.id);

  return (
    <ClientProjectDetails
      projeto={projeto}
      cliente={cliente}
      equipe={equipe}
      tarefas={tarefas}
      itensOrcamento={itensOrcamento}
      diarioDeBordo={diarioDeBordo}
    />
  );
}
