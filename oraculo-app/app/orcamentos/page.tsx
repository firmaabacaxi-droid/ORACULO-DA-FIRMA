import Link from "next/link";
import { getPropostas } from '@/lib/notion';

export const dynamic = 'force-dynamic';

function R$(val: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val ?? 0);
}

export default async function OrcamentosPage() {
  const propostas = await getPropostas();

  // Consolidação dos orçamentos da Fase 1 (Baseada nas Propostas)
  const totalVendido = propostas?.reduce((s: number, o: any) => s + Number(o.valor_total), 0) ?? 0;
  
  // Baseline de custo estimado para a Fase 1 (40% de custos operacionais)
  const totalCustoPrevisto = totalVendido * 0.40;
  const margemEstimada = totalVendido - totalCustoPrevisto;

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total Vendido (Propostas)', val: R$(totalVendido), color: 'gold', icon: '💼' },
          { label: 'Custo Previsto Est.', val: R$(totalCustoPrevisto), color: 'blue', icon: '📋' },
          { label: 'Margem Est. (Fase 1)', val: R$(margemEstimada), color: 'green', icon: '📊' },
          { label: 'Total de Orçamentos', val: propostas?.length || 0, color: 'orange', icon: '📌' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`} style={{ padding: '16px' }}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ fontSize: '20px' }}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* Tabela de Propostas reais do Notion */}
      <div className="table-wrap">
        <table className="oraculo-table">
          <thead>
            <tr>
              <th>Orçamento / Proposta</th>
              <th>Projeto Relacionado</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Valor Total</th>
              <th>Custo Previsto</th>
              <th>Margem Est.</th>
            </tr>
          </thead>
          <tbody>
            {propostas?.map((o: any) => {
              const custoEst = Number(o.valor_total) * 0.40;
              const margem = Number(o.valor_total) - custoEst;
              return (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600 }}>{o.nome}</td>
                  <td style={{ color: 'var(--text-dim)' }}>
                    {o.projetos?.id ? (
                      <Link href={`/projetos/${o.projetos.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                        🎬 {o.projetos.titulo}
                      </Link>
                    ) : (
                      o.projetos?.titulo || '—'
                    )}
                  </td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
                    {o.projetos?.clientes?.id ? (
                      <Link href={`/clientes/${o.projetos.clientes.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                        🏢 {o.projetos.clientes.nome}
                      </Link>
                    ) : (
                      o.projetos?.clientes?.nome || '—'
                    )}
                  </td>
                  <td>
                    <span className={`badge badge-${o.status === 'Aprovada' ? 'green' : o.status === 'Enviada' ? 'blue' : 'orange'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{R$(o.valor_total)}</td>
                  <td style={{ color: 'var(--text-dim)' }}>{R$(custoEst)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--green)' }}>{R$(margem)}</td>
                </tr>
              );
            })}
            {(!propostas || propostas.length === 0) && (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>Nenhuma proposta/orçamento encontrado no Notion.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

