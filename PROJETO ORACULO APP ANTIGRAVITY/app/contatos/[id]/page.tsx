import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  getContatoById, 
  getProjetos, 
  getTarefas 
} from "@/lib/notion";
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  AlertTriangle, 
  FolderGit, 
  ArrowLeft,
  DollarSign,
  Award,
  Link2,
  CheckSquare
} from "lucide-react";

interface ContatoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContatoDetailPage({ params }: ContatoDetailPageProps) {
  // 1. Acessa os parâmetros dinâmicos após aguardar a Promise (Next.js 16 / React 19)
  const { id } = await params;

  // 2. Carrega o contato principal
  const contato = await getContatoById(id);
  if (!contato) {
    return notFound();
  }

  // 3. Busca projetos e tarefas relacionais em paralelo
  const [projetosAll, tarefasAll] = await Promise.all([
    getProjetos(),
    getTarefas()
  ]);

  // 4. Resolve relacionamentos localmente no servidor
  // Filtra projetos onde o contato é responsável ou parte da equipe
  const projetosContato = projetosAll.filter(p => 
    p.responsavelIds.includes(contato.id) || 
    contato.projetosIds.includes(p.id)
  );

  // Filtra tarefas atribuídas a este contato
  const tarefasContato = tarefasAll.filter(t => 
    t.responsavelIds.includes(contato.id) || 
    contato.tarefasIds.includes(t.id)
  );

  const tarefasPendentes = tarefasContato.filter(t => t.status !== "Concluída");
  const tarefasConcluidas = tarefasContato.filter(t => t.status === "Concluída");

  // Cria um dicionário rápido de projetos para cruzar nomes de tarefas
  const projetosMap = new Map(projetosAll.map(p => [p.id, p.nome]));

  return (
    <div className="space-y-6">
      
      {/* Botão Retorno / Breadcrumbs */}
      <div className="flex items-center gap-3">
        <Link 
          href="/"
          className="p-2 bg-surface hover:bg-surface2 text-text-dim hover:text-gold border border-border rounded-md transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="flex flex-col text-xs text-text-dim">
          <span className="font-mono text-gold-dim">{contato.cttId || "CTT-N/A"}</span>
          <span className="font-semibold text-text uppercase tracking-wider">{contato.nome}</span>
        </div>
      </div>

      {/* Alerta de Restrição Alimentar Crítico (Destaque Vermelho-Tijolo) */}
      {contato.restricaoAlimentar && contato.restricaoAlimentar.trim() !== "" && (
        <div className="p-4 rounded border border-red-brick/30 bg-red-brick/10 text-red-brick flex items-start gap-3 text-xs shadow-md animate-pulse">
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block uppercase tracking-wider text-[10px] mb-1">
              Alerta de Segurança Operacional (Catering / Set)
            </span>
            <p className="font-medium text-text leading-relaxed">
              O profissional possui a seguinte restrição: <strong className="underline">{contato.restricaoAlimentar}</strong>.
              Favor sinalizar à equipe de alimentação (Catering) de set imediatamente.
            </p>
          </div>
        </div>
      )}

      {/* Hero Header do Contato */}
      <div className="glass-panel p-6 rounded-md border border-border relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-green-olive/15 text-[10px] font-bold text-green-olive uppercase tracking-wider border border-green-olive/20">
              {contato.tipo || "Freela"}
            </span>
            <span className="text-text-muted">•</span>
            <span className="text-xs text-text-dim font-medium">{contato.funcaoPrincipal || "Colaborador"}</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-text">
            {contato.nome}
          </h2>
          {contato.portfolio && (
            <a 
              href={contato.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gold/80 hover:text-gold flex items-center gap-1 mt-1.5 transition-colors hover:underline inline-block"
            >
              <Link2 size={12} />
              <span>Acessar Portfólio do Profissional</span>
            </a>
          )}
        </div>

        {/* Informações de Diária e Histórico */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex flex-col bg-surface2 border border-border px-4 py-2 rounded">
            <span className="text-text-muted text-[9px] uppercase tracking-widest mb-0.5">Valor da Diária</span>
            <span className="font-bold text-green-olive">
              {contato.valorDiaria && contato.valorDiaria > 0 
                ? contato.valorDiaria.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
                : "A combinar"}
            </span>
          </div>
          <div className="flex flex-col bg-surface2 border border-border px-4 py-2 rounded">
            <span className="text-text-muted text-[9px] uppercase tracking-widest mb-0.5">Sets Filmados</span>
            <span className="font-bold text-gold flex items-center gap-1">
              <Award size={13} />
              {contato.historicoSet || 0} Diárias
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lado Esquerdo: Checklist de Tarefas Atribuídas (ocupa 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-md border border-border">
            <h3 className="text-lg font-serif font-bold text-text mb-4 flex items-center gap-2">
              <CheckSquare size={18} className="text-gold" />
              <span>Tarefas Atribuídas ({tarefasContato.length})</span>
            </h3>

            {tarefasContato.length > 0 ? (
              <div className="space-y-4">
                
                {/* Pendentes */}
                {tarefasPendentes.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      Urgências & Pendências
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
                            className="mt-0.5 rounded border-border text-gold bg-transparent w-4 h-4"
                          />
                          <div>
                            <span className="text-sm font-semibold text-text leading-tight block">
                              {t.title}
                            </span>
                            {t.projetoId && (
                              <span className="text-[10px] text-gold-dim font-serif block mt-0.5">
                                Projeto: {projetosMap.get(t.projetoId) || "Ver Projeto"}
                              </span>
                            )}
                            {t.observacoes && (
                              <p className="text-xs text-text-dim mt-1 leading-relaxed">
                                {t.observacoes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Status badge */}
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${
                          t.prioridade === "Urgente"
                            ? "bg-red-brick/10 border-red-brick/20 text-red-brick"
                            : "bg-surface border-border text-text-dim"
                        }`}>
                          {t.prioridade}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Concluídas */}
                {tarefasConcluidas.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                      Histórico Concluído
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
                            className="rounded border-border text-green-olive bg-transparent w-4 h-4"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-text-dim line-through block truncate">
                              {t.title}
                            </span>
                            {t.projetoId && (
                              <span className="text-[9px] text-text-muted block">
                                {projetosMap.get(t.projetoId)}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[8px] px-1.5 py-0.5 bg-green-olive/15 text-green-olive border border-green-olive/20 rounded font-semibold uppercase">
                          OK
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ) : (
              <div className="py-12 text-center text-xs text-text-muted border border-dashed border-border rounded">
                Nenhuma tarefa pendente atrelada a este contato.
              </div>
            )}
          </div>
        </div>

        {/* Lado Direito: Dados Fiscais / PIX & Projetos Ativos (ocupa 1/3) */}
        <div className="space-y-6">
          
          {/* Dados Fiscais e PIX */}
          <div className="glass-panel p-5 rounded-md border border-border space-y-4">
            <h3 className="text-xs font-sans font-bold tracking-widest text-text-muted uppercase flex items-center gap-2">
              <CreditCard size={14} className="text-gold" />
              <span>Dados para Faturamento</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col">
                <span className="text-text-muted text-[10px] uppercase">Chave PIX</span>
                <span className="font-semibold text-text mt-0.5">{contato.pix || "Não informada"}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-text-muted text-[10px] uppercase">CPF</span>
                <span className="font-mono text-text-dim mt-0.5">{contato.cpf || "Não cadastrado"}</span>
              </div>

              {contato.observacoes && (
                <div className="flex flex-col pt-2 border-t border-border/60">
                  <span className="text-text-muted text-[10px] uppercase">Anotações Internas</span>
                  <p className="text-text-dim mt-1 leading-relaxed">
                    {contato.observacoes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Obras Recentes */}
          <div className="glass-panel p-5 rounded-md border border-border">
            <h3 className="text-xs font-sans font-bold tracking-widest text-text-muted uppercase mb-4 flex items-center gap-2">
              <FolderGit size={14} className="text-gold" />
              <span>Sets Ativos ({projetosContato.length})</span>
            </h3>

            {projetosContato.length > 0 ? (
              <div className="space-y-3 divide-y divide-border/60">
                {projetosContato.map((p) => (
                  <div key={p.id} className="py-2.5 first:pt-0 last:pb-0 text-xs flex justify-between items-center group">
                    <div className="min-w-0">
                      <Link 
                        href={`/projetos/${p.id}`} 
                        className="font-semibold text-text group-hover:text-gold group-hover:underline block truncate"
                      >
                        {p.nome}
                      </Link>
                      <span className="text-[10px] text-text-muted font-mono">{p.prjId}</span>
                    </div>
                    
                    <span className="px-1.5 py-0.5 bg-surface border border-border text-text-dim rounded text-[8px] uppercase tracking-wider">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="italic text-xs text-text-muted block">
                Nenhum set ativo registrado.
              </span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
