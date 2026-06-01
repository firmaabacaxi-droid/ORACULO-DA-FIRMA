"use"
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Projeto, 
  Cliente, 
  Contato, 
  Tarefa, 
  Proposta, 
  ItemOrcamento, 
  NotionBlock 
} from "@/lib/types";
import { 
  Calendar, 
  User, 
  Briefcase, 
  CheckSquare, 
  DollarSign, 
  FolderGit, 
  ArrowLeft,
  BookOpen,
  PieChart,
  Grid,
  AlertTriangle,
  Flame,
  Globe
} from "lucide-react";

interface ClientProjectDetailsProps {
  projeto: Projeto;
  cliente: Cliente | null;
  equipe: Contato[];
  tarefas: Tarefa[];
  itensOrcamento: ItemOrcamento[];
  diarioDeBordo: NotionBlock[];
}

export default function ClientProjectDetails({
  projeto,
  cliente,
  equipe,
  tarefas,
  itensOrcamento,
  diarioDeBordo
}: ClientProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<"geral" | "diario" | "financeiro">("geral");

  // Cálculos financeiros
  const receita = projeto.valorContratado;
  const totalCustos = itensOrcamento
    .filter(item => item.tipo === "Custo")
    .reduce((sum, item) => sum + item.total, 0);
  const lucro = receita - totalCustos;
  const percentualMargem = receita > 0 ? Math.round((lucro / receita) * 100) : 0;

  // Filtro de tarefas pendentes vs. concluídas
  const tarefasPendentes = tarefas.filter(t => t.status !== "Concluída");
  const tarefasConcluidas = tarefas.filter(t => t.status === "Concluída");

  return (
    <div className="space-y-6">
      
      {/* Botão de Retorno / Breadcrumbs */}
      <div className="flex items-center gap-3">
        <Link 
          href="/projetos"
          className="p-2 bg-surface hover:bg-surface2 text-text-dim hover:text-gold border border-border rounded-md transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="flex flex-col text-xs text-text-dim">
          <span className="font-mono text-gold-dim">{projeto.prjId || "PRJ-N/A"}</span>
          <span className="font-semibold text-text uppercase tracking-wider">{projeto.nome}</span>
        </div>
      </div>

      {/* Hero Header do Projeto */}
      <div className="glass-panel p-6 rounded-md border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-gold/15 text-[10px] font-bold text-gold uppercase tracking-wider border border-gold/20">
              {projeto.tipoProjeto}
            </span>
            <span className="text-text-muted">•</span>
            <span className="text-xs text-text-dim font-medium">{projeto.etapaAtual}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-text">
            {projeto.nome}
          </h2>
          {projeto.pastaDrive && (
            <a 
              href={projeto.pastaDrive} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gold/80 hover:text-gold flex items-center gap-1.5 mt-2 transition-colors inline-block hover:underline"
            >
              <Globe size={13} />
              <span>Acessar pasta operacional no Google Drive</span>
            </a>
          )}
        </div>

        {/* Status Badge e Valores Rápidos */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex flex-col bg-surface2 border border-border px-4 py-2 rounded">
            <span className="text-text-muted text-[9px] uppercase tracking-widest mb-0.5">Status Geral</span>
            <span className="font-bold text-gold">{projeto.status}</span>
          </div>
          <div className="flex flex-col bg-surface2 border border-border px-4 py-2 rounded">
            <span className="text-text-muted text-[9px] uppercase tracking-widest mb-0.5">Valor Contratado</span>
            <span className="font-bold text-green-olive">
              {projeto.valorContratado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="border-b border-border flex gap-1">
        <button
          onClick={() => setActiveTab("geral")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "geral"
              ? "border-gold text-gold"
              : "border-transparent text-text-dim hover:text-text"
          }`}
        >
          <Grid size={14} />
          <span>Visão Geral & Tarefas</span>
        </button>

        <button
          onClick={() => setActiveTab("diario")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "diario"
              ? "border-gold text-gold"
              : "border-transparent text-text-dim hover:text-text"
          }`}
        >
          <BookOpen size={14} />
          <span>Diário de Set & Roteiro</span>
        </button>

        <button
          onClick={() => setActiveTab("financeiro")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "financeiro"
              ? "border-gold text-gold"
              : "border-transparent text-text-dim hover:text-text"
          }`}
        >
          <PieChart size={14} />
          <span>Financeiro & Custos</span>
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="space-y-6">
        
        {/* TAB 1: VISÃO GERAL */}
        {activeTab === "geral" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Lado Esquerdo: Checklists de Tarefas (ocupa 2/3) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel p-6 rounded-md border border-border">
                <h3 className="text-lg font-serif font-bold text-text mb-4 flex items-center gap-2">
                  <CheckSquare size={18} className="text-gold" />
                  <span>Checklist de Produção</span>
                </h3>

                {tarefas.length > 0 ? (
                  <div className="space-y-4">
                    {/* Lista de Tarefas Urgentes / Pendentes */}
                    {tarefasPendentes.length > 0 && (
                      <div className="space-y-2.5">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                          Pendentes / Em Andamento
                        </div>
                        {tarefasPendentes.map((t) => (
                          <div 
                            key={t.id}
                            className={`flex items-start justify-between p-3 rounded bg-surface2/60 border border-border/80 hover:border-border transition-colors ${
                              t.prioridade === "Urgente" ? "border-l-2 border-l-red-brick" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <input 
                                type="checkbox" 
                                readOnly 
                                checked={false}
                                className="mt-0.5 rounded border-border text-gold bg-transparent w-4 h-4 focus:ring-0"
                              />
                              <div className="min-w-0">
                                <span className="text-sm font-semibold text-text leading-tight block">
                                  {t.title}
                                </span>
                                {t.observacoes && (
                                  <p className="text-xs text-text-dim mt-0.5 leading-relaxed">
                                    {t.observacoes}
                                  </p>
                                )}
                                
                                {/* Relacionados da Tarefa */}
                                <div className="flex items-center gap-2 mt-2 flex-wrap text-[10px]">
                                  {t.prioridade && (
                                    <span className={`px-1.5 py-0.5 rounded font-semibold border ${
                                      t.prioridade === "Urgente" 
                                        ? "bg-red-brick/10 border-red-brick/20 text-red-brick"
                                        : t.prioridade === "Alta"
                                        ? "bg-orange-burnt/10 border-orange-burnt/20 text-orange-burnt"
                                        : "bg-surface text-text-dim border-border"
                                    }`}>
                                      {t.prioridade}
                                    </span>
                                  )}

                                  {t.prazo && (
                                    <span className="text-text-muted font-medium bg-surface px-1.5 py-0.5 rounded border border-border">
                                      Prazo: {new Date(t.prazo + "T00:00:00").toLocaleDateString("pt-BR")}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Alerta de pulsação para Urgentes */}
                            {t.prioridade === "Urgente" && (
                              <span className="flex h-2.5 w-2.5 relative mt-1.5 flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-brick opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-brick"></span>
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Lista de Tarefas Concluídas */}
                    {tarefasConcluidas.length > 0 && (
                      <div className="space-y-2.5 pt-2">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                          Concluídas
                        </div>
                        {tarefasConcluidas.map((t) => (
                          <div 
                            key={t.id}
                            className="flex items-center justify-between p-2.5 rounded bg-surface/30 border border-border/40 opacity-60"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <input 
                                type="checkbox" 
                                readOnly 
                                checked={true}
                                className="rounded border-border text-green-olive bg-transparent w-4 h-4 focus:ring-0"
                              />
                              <span className="text-xs font-semibold text-text-dim line-through truncate">
                                {t.title}
                              </span>
                            </div>
                            <span className="text-[9px] px-1.5 py-0.5 bg-green-olive/15 text-green-olive rounded border border-green-olive/20 font-semibold uppercase">
                              OK
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-text-muted border border-dashed border-border rounded">
                    Nenhuma tarefa operacional atrelada a este projeto no Notion.
                  </div>
                )}
              </div>
            </div>

            {/* Lado Direito: Metadados & Stakeholders (ocupa 1/3) */}
            <div className="space-y-6">
              
              {/* Relacionamento com Cliente */}
              <div className="glass-panel p-5 rounded-md border border-border">
                <h4 className="text-xs font-sans font-bold tracking-widest text-text-muted uppercase mb-4 flex items-center gap-2">
                  <Briefcase size={14} className="text-gold" />
                  <span>Cliente</span>
                </h4>
                
                {cliente ? (
                  <div className="space-y-2">
                    <h3 className="text-base font-serif font-semibold text-text">
                      <Link href={`/clientes/${cliente.id}`} className="hover:text-gold hover:underline">
                        {cliente.nome}
                      </Link>
                    </h3>
                    <p className="text-xs text-text-dim leading-relaxed">
                      {cliente.razaoSocial}
                    </p>
                    {cliente.email && (
                      <span className="text-[11px] text-text-muted block mt-2">
                        {cliente.email}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="italic text-xs text-text-muted block">
                    Nenhum cliente associado. Produção interna da Firma.
                  </span>
                )}
              </div>

              {/* Equipe Fixa & Freelancers */}
              <div className="glass-panel p-5 rounded-md border border-border">
                <h4 className="text-xs font-sans font-bold tracking-widest text-text-muted uppercase mb-4 flex items-center gap-2">
                  <User size={14} className="text-gold" />
                  <span>Equipe de Set</span>
                </h4>

                {equipe.length > 0 ? (
                  <div className="divide-y divide-border/60">
                    {equipe.map((m) => (
                      <div key={m.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <Link 
                            href={`/contatos/${m.id}`} 
                            className="font-semibold text-text hover:text-gold hover:underline block truncate"
                          >
                            {m.nome}
                          </Link>
                          <span className="text-[10px] text-text-dim">
                            {m.funcaoPrincipal || "Equipe"}
                          </span>
                        </div>
                        
                        <span className={`px-2 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider border ${
                          m.tipo === "Equipe fixa" 
                            ? "bg-green-olive/10 border-green-olive/20 text-green-olive"
                            : "bg-blue-slate/10 border-blue-slate/20 text-blue-slate"
                        }`}>
                          {m.tipo === "Equipe fixa" ? "Fixa" : "Freela"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="italic text-xs text-text-muted block">
                    Nenhum membro da equipe associado.
                  </span>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DIÁRIO DE SET (NOTION BLOCKS RENDERER) */}
        {activeTab === "diario" && (
          <div className="glass-panel p-6 md:p-8 rounded-md border border-border max-w-4xl mx-auto space-y-6">
            
            <div className="border-b border-border/80 pb-4 mb-6">
              <h3 className="text-xl font-serif font-bold text-text flex items-center gap-2.5">
                <BookOpen className="text-gold" size={20} />
                <span>Diário de Bordo & Notas Criativas</span>
              </h3>
              <p className="text-xs text-text-dim mt-1">
                Anotações livres escritas no corpo da página do Notion. Totalmente integrado e renderizado nativamente.
              </p>
            </div>

            {/* Renderizador Rico Nativo */}
            {diarioDeBordo.length > 0 ? (
              <article className="space-y-4 font-sans text-sm leading-relaxed text-text-dim">
                {diarioDeBordo.map((block) => {
                  switch (block.type) {
                    case "heading_1":
                      return (
                        <h2 key={block.id} className="text-xl font-serif font-bold text-text pt-4 border-b border-border/60 pb-1 uppercase tracking-wide">
                          {block.content}
                        </h2>
                      );
                    case "heading_2":
                      return (
                        <h3 key={block.id} className="text-lg font-serif font-semibold text-text pt-3 border-l-2 border-gold pl-2">
                          {block.content}
                        </h3>
                      );
                    case "heading_3":
                      return (
                        <h4 key={block.id} className="text-sm font-semibold text-text uppercase tracking-widest pt-2">
                          {block.content}
                        </h4>
                      );
                    case "bulleted_list_item":
                      return (
                        <div key={block.id} className="flex gap-2 pl-3">
                          <span className="text-gold">•</span>
                          <p>{block.content}</p>
                        </div>
                      );
                    case "numbered_list_item":
                      return (
                        <div key={block.id} className="flex gap-2 pl-3 font-semibold">
                          <span className="text-gold">#</span>
                          <p className="font-normal">{block.content}</p>
                        </div>
                      );
                    case "to_do":
                      return (
                        <div key={block.id} className="flex items-center gap-2.5 pl-3 py-0.5">
                          <input 
                            type="checkbox" 
                            checked={block.checked} 
                            readOnly
                            className="rounded border-border text-gold bg-transparent w-4 h-4 focus:ring-0 cursor-default"
                          />
                          <span className={block.checked ? "line-through text-text-muted text-xs" : "text-sm text-text-dim font-medium"}>
                            {block.content}
                          </span>
                        </div>
                      );
                    case "quote":
                      return (
                        <blockquote key={block.id} className="p-4 bg-surface2/50 border-l-4 border-gold italic text-text rounded font-serif text-sm">
                          "{block.content}"
                        </blockquote>
                      );
                    default:
                      return (
                        <p key={block.id} className="leading-relaxed">
                          {block.content}
                        </p>
                      );
                  }
                })}
              </article>
            ) : (
              <div className="py-20 text-center text-xs text-text-muted border border-dashed border-border rounded">
                <BookOpen size={24} className="mx-auto text-text-muted mb-2 opacity-55" />
                <span>Nenhuma anotação de diário de bordo (page body) localizada para este projeto.</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FINANCEIRO & CUSTOS */}
        {activeTab === "financeiro" && (
          <div className="space-y-6">
            
            {/* Cards de Resumo Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Receita Contratada */}
              <div className="glass-panel p-5 rounded-md border border-border">
                <span className="text-[10px] font-sans font-bold tracking-widest text-text-muted uppercase block mb-1">
                  Receita Contratada
                </span>
                <div className="text-2xl font-semibold text-green-olive font-sans">
                  {receita.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
                <span className="text-[9px] text-text-dim block mt-0.5">
                  Valor definido em proposta comercial
                </span>
              </div>

              {/* Total de Custos */}
              <div className="glass-panel p-5 rounded-md border border-border">
                <span className="text-[10px] font-sans font-bold tracking-widest text-text-muted uppercase block mb-1">
                  Custos Operacionais
                </span>
                <div className="text-2xl font-semibold text-text font-sans">
                  {totalCustos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
                <span className="text-[9px] text-text-dim block mt-0.5">
                  Soma de diárias, equipamentos e taxas
                </span>
              </div>

              {/* Margem e Lucro */}
              <div className="glass-panel p-5 rounded-md border border-border relative overflow-hidden">
                <span className="text-[10px] font-sans font-bold tracking-widest text-text-muted uppercase block mb-1">
                  Margem de Lucro
                </span>
                <div className={`text-2xl font-semibold font-sans ${lucro >= 0 ? "text-gold" : "text-red-brick"}`}>
                  {lucro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  <span className="text-xs font-semibold ml-2 bg-gold/15 text-gold px-1.5 py-0.5 rounded border border-gold/20">
                    +{percentualMargem}%
                  </span>
                </div>
                <span className="text-[9px] text-text-dim block mt-0.5">
                  Retorno financeiro estimado do projeto
                </span>
              </div>

            </div>

            {/* Alerta caso custos superem a receita */}
            {lucro < 0 && (
              <div className="p-4 rounded border border-red-brick/30 bg-red-brick/10 text-red-brick flex items-center gap-3 text-xs">
                <AlertTriangle size={18} className="flex-shrink-0 animate-pulse" />
                <div>
                  <span className="font-semibold block uppercase tracking-wider text-[10px]">Restrição de Caixa Ativa</span>
                  Os custos operacionais atuais excedem o orçamento contratado. Avaliar redimensionamento de equipe ou aditivo financeiro.
                </div>
              </div>
            )}

            {/* Listagem Granular de Custos */}
            <div className="glass-panel p-6 rounded-md border border-border">
              <h3 className="text-lg font-serif font-bold text-text mb-4 flex items-center gap-2">
                <DollarSign size={18} className="text-gold" />
                <span>Detalhamento de Custos Operacionais</span>
              </h3>

              {itensOrcamento.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border text-[9px] uppercase tracking-wider text-text-muted font-bold bg-surface/30">
                        <th className="py-2.5 px-3">Item / Custo</th>
                        <th className="py-2.5 px-3">Fornecedor / Colaborador</th>
                        <th className="py-2.5 px-3">Categoria</th>
                        <th className="py-2.5 px-3">Status de Pgto</th>
                        <th className="py-2.5 px-3 text-right">Qtd</th>
                        <th className="py-2.5 px-3 text-right">Val. Unitário</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {itensOrcamento.map((item) => (
                        <tr key={item.id} className="hover:bg-surface2/30 transition-colors">
                          <td className="py-3 px-3 font-medium text-text">
                            {item.item}
                          </td>
                          <td className="py-3 px-3">
                            {item.fornecedorId ? (
                              <span className="text-gold-dim">Relação Contato</span>
                            ) : (
                              <span className="text-text-muted italic">Direto / Geral</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider bg-surface border border-border">
                              {item.categoria}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider border ${
                              item.status === "Pago" || item.status === "Recebido"
                                ? "bg-green-olive/15 border-green-olive/20 text-green-olive"
                                : item.status === "Confirmado"
                                ? "bg-blue-slate/15 border-blue-slate/20 text-blue-slate"
                                : "bg-orange-burnt/15 border-orange-burnt/20 text-orange-burnt"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right text-text-dim">
                            {item.quantidade}
                          </td>
                          <td className="py-3 px-3 text-right text-text-dim">
                            {item.valorUnitario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </td>
                          <td className="py-3 px-3 text-right font-semibold text-text">
                            {item.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-text-muted border border-dashed border-border rounded">
                  Nenhuma linha de custo granular vinculada a este projeto.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
