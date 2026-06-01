import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  getClienteById, 
  getProjetos, 
  getPropostas 
} from "@/lib/notion";
import { 
  Briefcase, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  ArrowLeft,
  Building,
  Heart,
  FileText,
  ArrowUpRight
} from "lucide-react";

interface ClienteDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClienteDetailPage({ params }: ClienteDetailPageProps) {
  // 1. Acessa os parâmetros dinâmicos após aguardar a Promise (Next.js 16 / React 19)
  const { id } = await params;

  // 2. Carrega o cliente principal
  const cliente = await getClienteById(id);
  if (!cliente) {
    return notFound();
  }

  // 3. Busca projetos e propostas correspondentes em paralelo
  const [projetosAll, propostasAll] = await Promise.all([
    getProjetos(),
    getPropostas()
  ]);

  // 4. Resolve relacionamentos localmente
  const projetosCliente = projetosAll.filter(p => p.clienteId === cliente.id);
  const propostasCliente = propostasAll.filter(pr => pr.clienteId === cliente.id);

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
          <span className="font-mono text-gold-dim">{cliente.cliId || "CLI-N/A"}</span>
          <span className="font-semibold text-text uppercase tracking-wider">{cliente.nome}</span>
        </div>
      </div>

      {/* Hero Header do Perfil do Cliente */}
      <div className="glass-panel p-6 rounded-md border border-border relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-blue-slate/15 text-[10px] font-bold text-blue-slate uppercase tracking-wider border border-blue-slate/20">
              {cliente.segmento || "Segmento Geral"}
            </span>
            {cliente.nps && (
              <>
                <span className="text-text-muted">•</span>
                <span className="px-1.5 py-0.5 bg-green-olive/10 border border-green-olive/20 rounded text-[9px] text-green-olive font-semibold flex items-center gap-1">
                  <Heart size={10} className="fill-green-olive/30" /> NPS: {cliente.nps}
                </span>
              </>
            )}
          </div>
          <h2 className="text-3xl font-serif font-bold text-text">
            {cliente.nome}
          </h2>
          <span className="text-xs text-text-muted flex items-center gap-1 mt-1.5">
            <Building size={12} />
            {cliente.razaoSocial || "Razão Social Não Preenchida"}
          </span>
        </div>

        {/* Informações Básicas de Contato */}
        <div className="flex flex-col gap-2 text-xs text-text-dim bg-surface2/60 border border-border p-4 rounded w-full md:w-auto">
          {cliente.email && (
            <a href={`mailto:${cliente.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail size={14} className="text-gold-dim" />
              <span>{cliente.email}</span>
            </a>
          )}
          {cliente.telefone && (
            <a href={`tel:${cliente.telefone}`} className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone size={14} className="text-gold-dim" />
              <span>{cliente.telefone}</span>
            </a>
          )}
        </div>
      </div>

      {/* Grid de Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lado Esquerdo: Obras Ativas & Histórico de Propostas (ocupa 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Projetos Ativos */}
          <div className="glass-panel p-6 rounded-md border border-border">
            <h3 className="text-lg font-serif font-bold text-text mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-gold" />
              <span>Projetos em Andamento ({projetosCliente.length})</span>
            </h3>

            {projetosCliente.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projetosCliente.map((p) => (
                  <div key={p.id} className="p-4 rounded bg-surface2/60 border border-border/80 hover:border-border transition-all flex flex-col justify-between min-h-[140px] group">
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-2 font-mono text-gold-dim">
                        <span>{p.prjId || "PRJ-N/A"}</span>
                        <span className="px-1.5 py-0.2 bg-gold/15 text-gold border border-gold/25 rounded uppercase tracking-wider text-[8px] font-bold">
                          {p.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold font-serif text-text group-hover:text-gold transition-colors leading-tight">
                        <Link href={`/projetos/${p.id}`}>
                          {p.nome}
                        </Link>
                      </h4>
                    </div>
                    
                    <div className="flex justify-between items-center text-[10px] text-text-dim border-t border-border/50 pt-2 mt-4">
                      <span>{p.valorContratado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                      <Link href={`/projetos/${p.id}`} className="text-gold hover:underline flex items-center gap-0.5">
                        <span>Acessar set</span>
                        <ArrowUpRight size={10} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-text-muted border border-dashed border-border rounded">
                Nenhum projeto em execução associado a este cliente no momento.
              </div>
            )}
          </div>

          {/* Histórico Comercial / Propostas */}
          <div className="glass-panel p-6 rounded-md border border-border">
            <h3 className="text-lg font-serif font-bold text-text mb-4 flex items-center gap-2">
              <FileText size={18} className="text-gold" />
              <span>Histórico Comercial & Orçamentos</span>
            </h3>

            {propostasCliente.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border text-[9px] uppercase tracking-wider text-text-muted font-bold bg-surface/30">
                      <th className="py-2.5 px-3">Código</th>
                      <th className="py-2.5 px-3">Título da Proposta</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Versão</th>
                      <th className="py-2.5 px-3 text-right">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {propostasCliente.map((prop) => (
                      <tr key={prop.id} className="hover:bg-surface2/30 transition-colors">
                        <td className="py-3 px-3 font-mono text-gold-dim">
                          {prop.prpId || "PRP-N/A"}
                        </td>
                        <td className="py-3 px-3 font-serif font-medium text-text">
                          {prop.titulo}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider border ${
                            prop.status === "Aprovada"
                              ? "bg-green-olive/15 border-green-olive/20 text-green-olive"
                              : "bg-orange-burnt/15 border-orange-burnt/20 text-orange-burnt"
                          }`}>
                            {prop.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-text-dim font-mono">
                          v{prop.versao}
                        </td>
                        <td className="py-3 px-3 text-right font-semibold text-text">
                          {prop.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-text-muted border border-dashed border-border rounded">
                Nenhuma proposta ou orçamento comercial registrado para esta conta.
              </div>
            )}
          </div>

        </div>

        {/* Lado Direito: Informações Fiscais & Metadados Operacionais (ocupa 1/3) */}
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-md border border-border space-y-4">
            <h3 className="text-xs font-sans font-bold tracking-widest text-text-muted uppercase flex items-center gap-2">
              <Building size={14} className="text-gold" />
              <span>Metadados Corporativos</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col">
                <span className="text-text-muted text-[10px] uppercase">CNPJ / CPF</span>
                <span className="font-mono text-text mt-0.5">{cliente.cnpjCpf || "Isento / Não preenchido"}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-text-muted text-[10px] uppercase">Endereço Fiscal</span>
                <span className="text-text-dim mt-0.5 leading-relaxed">{cliente.endereco || "Não cadastrado"}</span>
              </div>

              {cliente.observacoes && (
                <div className="flex flex-col pt-2 border-t border-border/60">
                  <span className="text-text-muted text-[10px] uppercase">Anotações Internas</span>
                  <p className="text-text-dim mt-1 leading-relaxed">
                    {cliente.observacoes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
