import React from "react";
import Link from "next/link";
import { 
  getCrmOportunidades, 
  getClientes, 
  getPropostas 
} from "@/lib/notion";
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  ArrowUpRight, 
  Percent,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default async function CrmPipelinePage() {
  // 1. Carrega todas as dependências comerciais em paralelo
  const [crmOps, clientes, propostas] = await Promise.all([
    getCrmOportunidades(),
    getClientes(),
    getPropostas()
  ]);

  // Mapas rápidos para resolver nomes
  const clienteMap = new Map(clientes.map(c => [c.id, c.nome]));
  const propostaMap = new Map(propostas.map(p => [p.id, p.titulo]));

  // Filtra e processa oportunidades
  const abertas = crmOps.filter(c => c.status === "Aberto");
  const ganhas = crmOps.filter(c => c.status === "Ganho");
  const perdidas = crmOps.filter(c => c.status === "Perdido");

  // Métricas agregadas
  const valorTotalPipeline = abertas.reduce((sum, c) => sum + (c.valorProposta || 0), 0);
  const probabilidadeMedia = abertas.length > 0
    ? Math.round(abertas.reduce((sum, c) => sum + (c.probabilidade || 0), 0) / abertas.length)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header da Seção */}
      <div>
        <span className="text-[10px] font-sans font-bold tracking-widest text-gold uppercase">
          Gestão Comercial
        </span>
        <h2 className="text-2xl font-serif font-bold text-text mt-1">
          CRM Comercial & Pipeline
        </h2>
        <p className="text-xs text-text-dim mt-0.5">
          Acompanhamento dinâmico de prospecções, leads e probabilidades de conversão para a Firma Abacaxi.
        </p>
      </div>

      {/* Cards de Resumo Comercial */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Total Pipeline */}
        <div className="glass-panel p-4 rounded-md border border-border flex flex-col justify-between min-h-[100px] card-hover">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-sans font-bold tracking-wider text-text-muted uppercase">Val. total Pipeline</span>
            <DollarSign size={14} className="text-green-olive" />
          </div>
          <div className="mt-2">
            <h4 className="text-xl font-bold font-sans text-green-olive">
              {valorTotalPipeline.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
            </h4>
            <span className="text-[9px] text-text-dim">Receita em prospecção ativa</span>
          </div>
        </div>

        {/* Oportunidades Abertas */}
        <div className="glass-panel p-4 rounded-md border border-border flex flex-col justify-between min-h-[100px] card-hover">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-sans font-bold tracking-wider text-text-muted uppercase">Deals Ativos</span>
            <Target size={14} className="text-gold" />
          </div>
          <div className="mt-2">
            <h4 className="text-2xl font-bold font-serif text-text">{abertas.length}</h4>
            <span className="text-[9px] text-text-dim">Contas em negociação ativa</span>
          </div>
        </div>

        {/* Probabilidade Média */}
        <div className="glass-panel p-4 rounded-md border border-border flex flex-col justify-between min-h-[100px] card-hover">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-sans font-bold tracking-wider text-text-muted uppercase">Probabilidade Média</span>
            <Percent size={14} className="text-blue-slate" />
          </div>
          <div className="mt-2">
            <h4 className="text-2xl font-bold font-serif text-text">{probabilidadeMedia}%</h4>
            <span className="text-[9px] text-text-dim">Média de fechamento de deals</span>
          </div>
        </div>

        {/* Taxa de Sucesso (Deals Ganhos) */}
        <div className="glass-panel p-4 rounded-md border border-border flex flex-col justify-between min-h-[100px] card-hover">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-sans font-bold tracking-wider text-text-muted uppercase">Deals Ganhos (Mês)</span>
            <CheckCircle2 size={14} className="text-green-olive" />
          </div>
          <div className="mt-2">
            <h4 className="text-2xl font-bold font-serif text-text">{ganhas.length}</h4>
            <span className="text-[9px] text-text-dim">Convertidos em obras ativas</span>
          </div>
        </div>

      </div>

      {/* Grid Principal: Lista Ativa (Abertos) vs. Histórico (Ganhos/Perdidos) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Deals Ativos (Esquerda, ocupa 2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-sans font-bold tracking-widest text-text-muted uppercase flex items-center gap-2">
            <TrendingUp size={16} className="text-gold" />
            <span>Negociações Ativas</span>
          </h3>

          {abertas.length > 0 ? (
            <div className="space-y-4">
              {abertas.map((c) => (
                <div 
                  key={c.id} 
                  className="glass-panel p-5 rounded-md border border-border card-hover flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Topo do Card */}
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-gold-dim text-[10px] bg-gold/10 px-1.5 py-0.2 rounded border border-gold/15">
                          {c.crmId || "CRM-N/A"}
                        </span>
                        <span className="text-[10px] text-text-muted">•</span>
                        {c.clienteId ? (
                          <Link href={`/clientes/${c.clienteId}`} className="text-xs text-text-dim font-medium hover:text-gold hover:underline">
                            {clienteMap.get(c.clienteId) || "Ver Cliente"}
                          </Link>
                        ) : (
                          <span className="text-xs text-text-muted italic">Cliente indefinido</span>
                        )}
                      </div>
                      
                      <h4 className="text-base font-serif font-semibold text-text leading-tight group-hover:text-gold transition-colors">
                        {c.oportunidade}
                      </h4>
                    </div>

                    {/* Valor Rollup */}
                    <div className="text-right">
                      <span className="text-text-muted text-[9px] uppercase tracking-wider block">Valor Estimado</span>
                      <span className="font-semibold text-green-olive text-sm font-sans">
                        {c.valorProposta ? c.valorProposta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"}
                      </span>
                    </div>
                  </div>

                  {/* Histórico / Observação Rápida */}
                  {c.historico && (
                    <p className="text-xs text-text-dim/90 bg-surface2/30 border border-border/40 p-3 rounded leading-relaxed mb-4">
                      {c.historico}
                    </p>
                  )}

                  {/* Base do Card: Probabilidade & Próximo Contato */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60 pt-4 mt-2 text-xs">
                    
                    {/* Probabilidade com barra de progresso */}
                    <div className="flex items-center gap-3 w-full sm:w-48">
                      <span className="text-text-muted font-medium w-8">{c.probabilidade || 0}%</span>
                      <div className="flex-1 h-2 bg-surface2 rounded-full overflow-hidden border border-border/60">
                        <div 
                          className="h-full bg-gold rounded-full transition-all duration-500" 
                          style={{ width: `${c.probabilidade || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Próximo Contato */}
                    <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
                      <span className="text-text-dim flex items-center gap-1 font-medium bg-surface2 border border-border px-2.5 py-1 rounded">
                        <Clock size={12} className="text-gold-dim" />
                        <span>Agenda: {c.proximoContato ? new Date(c.proximoContato + "T00:00:00").toLocaleDateString("pt-BR") : "Sem Data"}</span>
                      </span>

                      {c.propostaId && (
                        <span className="text-[10px] text-text-muted italic flex items-center gap-0.5">
                          Proposta vinculada
                        </span>
                      )}
                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-text-muted border border-dashed border-border rounded-md bg-surface2/10">
              Nenhuma prospecção comercial aberta no momento.
            </div>
          )}
        </div>

        {/* Lado Direito: Histórico Comercial Recente (Ganhos/Perdidos, ocupa 1/3) */}
        <div className="space-y-6">
          
          {/* Deals Ganhos */}
          <div className="glass-panel p-5 rounded-md border border-border space-y-4">
            <h3 className="text-xs font-sans font-bold tracking-widest text-text-muted uppercase flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-olive" />
              <span>Conclusões Recentes (Ganhos)</span>
            </h3>

            {ganhas.length > 0 ? (
              <div className="space-y-3">
                {ganhas.map((g) => (
                  <div key={g.id} className="text-xs border-l-2 border-green-olive pl-3 py-1.5 bg-surface2/25 rounded-r">
                    <span className="text-[9px] font-mono text-gold-dim block">{g.crmId}</span>
                    <h4 className="font-semibold text-text leading-tight mt-0.5">{g.oportunidade}</h4>
                    <span className="text-[10px] text-green-olive font-semibold font-sans mt-1 block">
                      {g.valorProposta ? g.valorProposta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="italic text-xs text-text-muted block py-2">
                Nenhum deal fechado recentemente.
              </span>
            )}
          </div>

          {/* Deals Perdidos */}
          <div className="glass-panel p-5 rounded-md border border-border space-y-4">
            <h3 className="text-xs font-sans font-bold tracking-widest text-text-muted uppercase flex items-center gap-2">
              <XCircle size={14} className="text-red-brick" />
              <span>Deals Arquivados (Perdidos)</span>
            </h3>

            {perdidas.length > 0 ? (
              <div className="space-y-3">
                {perdidas.map((l) => (
                  <div key={l.id} className="text-xs border-l-2 border-red-brick pl-3 py-1.5 bg-surface2/25 rounded-r opacity-60">
                    <span className="text-[9px] font-mono text-text-muted block">{l.crmId}</span>
                    <h4 className="font-semibold text-text-dim leading-tight mt-0.5">{l.oportunidade}</h4>
                    <span className="text-[10px] text-text-muted block mt-1">
                      {l.valorProposta ? l.valorProposta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="italic text-xs text-text-muted block py-2">
                Sem registros de perda recentes.
              </span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
