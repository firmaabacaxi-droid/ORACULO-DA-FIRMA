import React from "react";
import { getProjetos, getClientes } from "@/lib/notion";
import ClientProjectList from "@/components/ClientProjectList";

export default async function ProjetosListPage() {
  // Carrega em paralelo projetos e clientes para mapeamento de relações
  const [projetos, clientes] = await Promise.all([
    getProjetos(),
    getClientes()
  ]);

  // Cria um dicionário rápido de clientes para mapear nomes no servidor
  const clienteMap = new Map(clientes.map(c => [c.id, c.nome]));

  // Enriquece os projetos com os nomes dos clientes correspondentes
  const enrichedProjects = projetos.map(proj => ({
    ...proj,
    clienteNome: proj.clienteId ? (clienteMap.get(proj.clienteId) || "Ver Cliente") : undefined
  }));

  return (
    <div className="space-y-6">
      
      {/* Header do Hub */}
      <div>
        <span className="text-[10px] font-sans font-bold tracking-widest text-gold uppercase">
          Hub de Produção
        </span>
        <h2 className="text-2xl font-serif font-bold text-text mt-1">
          Obras & Projetos Audiovisuais
        </h2>
        <p className="text-xs text-text-dim mt-0.5">
          Acompanhamento granular do status de captação, edição, cronogramas e entregas da Firma Abacaxi.
        </p>
      </div>

      {/* Explorador de Projetos Interativo */}
      <ClientProjectList initialProjects={enrichedProjects} />

    </div>
  );
}
