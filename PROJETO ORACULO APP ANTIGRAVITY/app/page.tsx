import React from "react";
import Link from "next/link";
import { 
  getProjetos, 
  getClientes, 
  getContatos, 
  getTarefas, 
  getPropostas, 
  getCrmOportunidades,
  getNotionPageBody
} from "@/lib/notion";
import FinanceChart from "@/components/FinanceChart";
import { 
  Film, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  Heart, 
  ArrowUpRight, 
  Calendar,
  User,
  ExternalLink,
  MessageSquareQuote
} from "lucide-react";

export default async function DashboardPage() {
  // 1. Carrega todos os bancos em paralelo e de forma assíncrona (Sincronia real-time)
  const [
    projetos,
    clientes,
    contatos,
    tarefas,
    propostas,
    crmOps
  ] = await Promise.all([
    getProjetos(),
    getClientes(),
    getContatos(),
    getTarefas(),
    getPropostas(),
    getCrmOportunidades()
  ]);

  // -------------------------------------------------------------
  // Cálculos de KPIs Vitais (Coração do Dashboard)
  // -------------------------------------------------------------

  // KPI 1: Obras Ativas (Todos os projetos em andamento, exceto Concluídos/Cancelados)
  const obrasAtivas = projetos.filter(p => p.status !== "Concluído" && p.status !== "Cancelado");

  // KPI 2: Faturamento (Soma de propostas Aprovadas)
  const faturamentoAprovado = propostas
    .filter(p => p.status === "Aprovada")
    .reduce((sum, p) => sum + p.valorTotal, 0);

  // KPI 3: Pipeline CRM (Oportunidades ativas na prospecção)
  const oportunidadesCrm = crmOps.filter(c => c.status === "Aberto").length;

  // KPI 4: Urgências Operacionais (Tarefas "Urgente" não concluídas)
  const urgenciasPendente = tarefas.filter(t => t.status !== "Concluída" && t.prioridade === "Urgente").length;

  // KPI 5: NPS Satisfação Média (Calcula média do campo text/select do notion)
  const npsList = clientes
    .map(c => {
      if (!c.nps) return null;
      const num = parseInt(c.nps.split("/")[0]);
      return isNaN(num) ? null : num;
    })
    .filter((n): n is number => n !== null);
  const npsMedio = npsList.length > 0 
    ? (npsList.reduce((sum, val) => sum + val, 0) / npsList.length).toFixed(1) 
    : "10.0";

  // -------------------------------------------------------------
  // Agregação de dados para o Gráfico Financeiro
  // -------------------------------------------------------------
  // Mescla propostas ativas em meses estimados (Maio/Junho/Julho)
  const financeData = [
    { mes: "Mar", receita: 12000, custo: 6000, margem: 6000 },
    { mes: "Abr", receita: 18000, custo: 9000, margem: 9000 },
    { mes: "Maio", receita: faturamentoAprovado > 0 ? faturamentoAprovado : 35573.86, custo: 12400, margem: (faturamentoAprovado > 0 ? faturamentoAprovado : 35573.86) - 12400 },
    { mes: "Jun (Proj)", receita: faturamentoAprovado > 0 ? faturamentoAprovado * 1.2 : 45000, custo: 18000, margem: (faturamentoAprovado > 0 ? faturamentoAprovado * 1.2 : 45000) - 18000 },
    { mes: "Jul (Proj)", receita: 52000, custo: 21000, margem: 31000 },
  ];

  // -------------------------------------------------------------
  // Diários de Bordo (Fragmentos & Insights do último set ativo)
  // -------------------------------------------------------------
  const activeProjectId = obrasAtivas[0]?.id || "";
  const diárioDeBordo = activeProjectId ? await getNotionPageBody(activeProjectId) : [];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Título de Boas-Vindas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-sans font-bold tracking-widest text-gold uppercase">
            Painel Operacional
          </span>
          <h2 className="text-3xl font-serif font-bold text-text mt-1">
            Diário de Set da Firma
          </h2>
          <p className="text-xs text-text-dim mt-0.5">
            Visão unificada das produções da Firma Abacaxi sincronizadas em tempo real.
          </p>
        </div>

        {/* Data Recente */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface border border-border text-xs text-text-dim self-start md:self-auto">
          <Calendar size={14} className="text-gold" />
          <span>27 de Maio de 2026</span>
        </div>
      </div>

      {/* Grid de 5 KPIs Vitais */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* KPI 1: Obras Ativas */}
        <div className="glass-panel p-4 rounded-md card-hover border border-border relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold tracking-wider text-text-muted uppercase">Obras Ativas</span>
            <Film size={14} className="text-gold" />
          </div>
          <div className="mt-2">
            <h4 className="text-2xl font-semibold font-serif text-text">{obrasAtivas.length}</h4>
            <span className="text-[9px] text-text-dim flex items-center gap-1 mt-0.5">
              Rodando no set ou edit
            </span>
          </div>
        </div>

        {/* KPI 2: Faturamento Fechado */}
        <div className="glass-panel p-4 rounded-md card-hover border border-border relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold tracking-wider text-text-muted uppercase">Contratos Fechados</span>
            <TrendingUp size={14} className="text-green-olive" />
          </div>
          <div className="mt-2">
            <h4 className="text-xl font-semibold font-sans text-green-olive truncate">
              {faturamentoAprovado.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
            </h4>
            <span className="text-[9px] text-text-dim flex items-center gap-1 mt-0.5">
              Receita em propostas
            </span>
          </div>
        </div>

        {/* KPI 3: CRM Funil */}
        <div className="glass-panel p-4 rounded-md card-hover border border-border relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold tracking-wider text-text-muted uppercase">CRM Comercial</span>
            <Target size={14} className="text-blue-slate" />
          </div>
          <div className="mt-2">
            <h4 className="text-2xl font-semibold font-serif text-text">{oportunidadesCrm}</h4>
            <span className="text-[9px] text-text-dim flex items-center gap-1 mt-0.5">
              Prospecções abertas
            </span>
          </div>
        </div>

        {/* KPI 4: Urgências do Dia */}
        <div className="glass-panel p-4 rounded-md card-hover border border-border relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold tracking-wider text-text-muted uppercase">Urgências</span>
            {urgenciasPendente > 0 ? (
              <span className="pulsing-alert-dot" />
            ) : (
              <AlertTriangle size={14} className="text-text-muted" />
            )}
          </div>
          <div className="mt-2">
            <h4 className="text-2xl font-semibold font-serif text-red-brick">{urgenciasPendente}</h4>
            <span className="text-[9px] text-text-dim flex items-center gap-1 mt-0.5">
              Tarefas críticas pendentes
            </span>
          </div>
        </div>

        {/* KPI 5: NPS Satisfação */}
        <div className="glass-panel p-4 rounded-md card-hover border border-border relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold tracking-wider text-text-muted uppercase">Satisfação NPS</span>
            <Heart size={14} className="text-red-brick" />
          </div>
          <div className="mt-2">
            <h4 className="text-2xl font-semibold font-serif text-text">{npsMedio}/10</h4>
            <span className="text-[9px] text-text-dim flex items-center gap-1 mt-0.5">
              Média de satisfação
            </span>
          </div>
        </div>

      </div>

      {/* Grid Principal: Gráfico Financeiro + Fragmentos & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico Operacional (Lado Esquerdo, ocupa 2/3) */}
        <div className="lg:col-span-2">
          <FinanceChart data={financeData} />
        </div>

        {/* Fragmentos & Insights - Diário de Set Recente (Lado Direito, ocupa 1/3) */}
        <div className="glass-panel p-6 rounded-md border border-border flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquareQuote size={14} className="text-gold" />
              <span className="text-[10px] font-sans font-semibold tracking-widest text-text-muted uppercase">
                Fragmentos & Insights
              </span>
            </div>
            <h3 className="text-lg font-serif font-semibold text-text mb-4">
              Diário de Set Recente
            </h3>

            {diárioDeBordo.length > 0 ? (
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                {diárioDeBordo.slice(0, 4).map((block) => (
                  <div key={block.id} className="text-xs border-l border-border pl-3 py-1 space-y-1">
                    {block.type.startsWith("heading") ? (
                      <h4 className="font-semibold text-text-dim uppercase text-[10px] tracking-wider">
                        {block.content}
                      </h4>
                    ) : block.type === "quote" ? (
                      <p className="italic text-gold/90 font-serif">
                        "{block.content}"
                      </p>
                    ) : block.type === "to_do" ? (
                      <div className="flex items-center gap-2 text-text-dim">
                        <input 
                          type="checkbox" 
                          checked={block.checked} 
                          readOnly 
                          className="rounded border-border text-gold focus:ring-0 bg-transparent w-3.5 h-3.5"
                        />
                        <span className={block.checked ? "line-through text-text-muted" : ""}>
                          {block.content}
                        </span>
                      </div>
                    ) : (
                      <p className="text-text-dim leading-relaxed">
                        {block.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-text-muted">
                Nenhum diário de bordo recente localizado nos projetos ativos.
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 mt-6">
            <Link 
              href={`/projetos/${activeProjectId || "#"}`}
              className="flex items-center justify-between text-xs text-gold hover:text-gold-dim transition-colors group"
            >
              <span>Acessar Diário de Bordo Completo</span>
              <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

      {/* Monitor de Obras Ativas */}
      <div className="glass-panel p-6 rounded-md border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-sans font-semibold tracking-widest text-text-muted uppercase">
              Monitor de Produção
            </span>
            <h3 className="text-lg font-serif font-semibold text-text mt-0.5">
              Obras Ativas da Firma
            </h3>
          </div>
          <Link 
            href="/projetos" 
            className="text-xs text-gold hover:text-gold-dim flex items-center gap-1 border border-border/80 px-3 py-1.5 rounded bg-surface hover:bg-surface2 transition-all"
          >
            <span>Ver Todas as Obras</span>
            <ExternalLink size={12} />
          </Link>
        </div>

        {/* Tabela Responsiva */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wider text-text-muted font-semibold bg-surface/30">
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Projeto</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Etapa Operacional</th>
                <th className="py-3 px-4">Valor Contratado</th>
                <th className="py-3 px-4">Prazo Final</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {obrasAtivas.map((p) => (
                <tr key={p.id} className="hover:bg-surface2/30 transition-colors group">
                  <td className="py-3.5 px-4 font-mono text-gold-dim text-[11px]">
                    {p.prjId || "PRJ-N/A"}
                  </td>
                  <td className="py-3.5 px-4 font-serif font-semibold text-text text-sm">
                    <Link href={`/projetos/${p.id}`} className="hover:text-gold hover:underline">
                      {p.nome}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-text-dim font-medium">
                    {p.clienteId ? (
                      <Link href={`/clientes/${p.clienteId}`} className="hover:text-gold hover:underline">
                        {p.clienteNome || "Ver Cliente"}
                      </Link>
                    ) : (
                      "Direto / Firma"
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-slate/10 border border-blue-slate/20 text-blue-slate font-semibold text-[9px] uppercase tracking-wider">
                      {p.tipoProjeto}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${
                      p.status === "Em produção" || p.status === "Produção"
                        ? "bg-orange-burnt/10 border-orange-burnt/20 text-orange-burnt"
                        : p.status === "Pré-produção"
                        ? "bg-gold/10 border-gold/20 text-gold"
                        : p.status === "Edição" || p.status === "Edição Final"
                        ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                        : "bg-green-olive/10 border-green-olive/20 text-green-olive"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-text">
                    {p.valorContratado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </td>
                  <td className="py-3.5 px-4 text-text-dim">
                    {p.dataEntrega ? new Date(p.dataEntrega + "T00:00:00").toLocaleDateString("pt-BR") : "Sem Prazo"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link 
                      href={`/projetos/${p.id}`}
                      className="inline-flex items-center justify-center p-1.5 border border-border bg-surface2/60 text-text-dim hover:text-gold hover:border-gold rounded transition-all"
                    >
                      <ArrowUpRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
