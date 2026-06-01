"use"
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Projeto } from "@/lib/types";
import { 
  Search, 
  Film, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  ExternalLink 
} from "lucide-react";

interface ClientProjectListProps {
  initialProjects: Projeto[];
}

export default function ClientProjectList({ initialProjects }: ClientProjectListProps) {
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("Todos");

  const stages = [
    "Todos",
    "Ativos",
    "Pré-produção",
    "Em produção",
    "Edição",
    "Concluído",
    "Cancelado"
  ];

  // Filtra projetos
  const filteredProjects = initialProjects.filter(p => {
    const matchesSearch = p.nome.toLowerCase().includes(search.toLowerCase()) || 
                          p.prjId.toLowerCase().includes(search.toLowerCase()) ||
                          (p.clienteNome && p.clienteNome.toLowerCase().includes(search.toLowerCase()));

    const matchesStage = 
      filterStage === "Todos" ? true :
      filterStage === "Ativos" ? (p.status !== "Concluído" && p.status !== "Cancelado") :
      p.status === filterStage;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6">
      
      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-surface p-4 rounded-md border border-border">
        
        {/* Filtros por Etapa */}
        <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => setFilterStage(stage)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                filterStage === stage
                  ? "bg-gold text-bg font-semibold"
                  : "bg-surface2 text-text-dim hover:text-text border border-border/60"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Input de Busca */}
        <div className="relative w-full md:w-72 order-1 md:order-2">
          <input
            type="text"
            placeholder="Buscar projeto, ID ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface2 border border-border text-text placeholder-text-muted px-9 py-1.5 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-text-muted" />
        </div>

      </div>

      {/* Grid de Cartões de Projeto */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div 
              key={p.id}
              className="glass-panel p-5 rounded-md border border-border flex flex-col justify-between min-h-[220px] card-hover relative overflow-hidden group"
            >
              {/* Topo do Cartão: ID e Status */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-gold text-[10px] bg-gold/10 px-2 py-0.5 rounded border border-gold/15">
                    {p.prjId || "PRJ-N/A"}
                  </span>
                  
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${
                    p.status === "Em produção" || p.status === "Produção"
                      ? "bg-orange-burnt/10 border-orange-burnt/20 text-orange-burnt"
                      : p.status === "Pré-produção"
                      ? "bg-gold/10 border-gold/20 text-gold"
                      : p.status === "Edição" || p.status === "Edição Final"
                      ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                      : p.status === "Concluído"
                      ? "bg-green-olive/10 border-green-olive/20 text-green-olive"
                      : "bg-text-muted/15 border-text-muted/20 text-text-dim"
                  }`}>
                    {p.status}
                  </span>
                </div>

                {/* Título do Projeto */}
                <h4 className="text-base font-serif font-semibold text-text mb-1 leading-snug group-hover:text-gold transition-colors">
                  <Link href={`/projetos/${p.id}`}>
                    {p.nome}
                  </Link>
                </h4>
                
                {/* Cliente */}
                <p className="text-xs text-text-dim mb-4">
                  {p.clienteId ? (
                    <span className="flex items-center gap-1">
                      Cliente: 
                      <Link href={`/clientes/${p.clienteId}`} className="text-gold hover:underline font-medium">
                        {p.clienteNome || "Ver Cliente"}
                      </Link>
                    </span>
                  ) : (
                    <span className="italic text-text-muted">Produção Própria / Firma</span>
                  )}
                </p>
              </div>

              {/* Base do Cartão: Valores e Links */}
              <div className="border-t border-border/60 pt-4 mt-2">
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex flex-col">
                    <span className="text-text-muted text-[9px] uppercase tracking-wider">Valor Contratado</span>
                    <span className="font-semibold text-text font-sans">
                      {p.valorContratado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-text-muted text-[9px] uppercase tracking-wider">Prazo</span>
                    <span className="text-text-dim flex items-center gap-1 font-medium">
                      <Calendar size={12} className="text-text-muted" />
                      {p.dataEntrega ? new Date(p.dataEntrega + "T00:00:00").toLocaleDateString("pt-BR") : "Sem Prazo"}
                    </span>
                  </div>
                </div>

                {/* Botão de Ver Projeto */}
                <Link 
                  href={`/projetos/${p.id}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2 border border-border hover:border-gold bg-surface2/60 hover:bg-gold hover:text-bg text-xs font-semibold text-text rounded transition-all duration-200"
                >
                  <span>Ver Detalhes do Projeto</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel py-16 text-center border border-border">
          <Film size={28} className="mx-auto text-text-muted mb-3" />
          <h4 className="text-sm font-semibold text-text mb-1">Nenhum projeto encontrado</h4>
          <p className="text-xs text-text-dim">Tente reajustar seus filtros ou termo de busca.</p>
        </div>
      )}

    </div>
  );
}
