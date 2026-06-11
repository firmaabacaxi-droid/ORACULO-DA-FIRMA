import { supabase } from '@/lib/supabase';
export const dynamic = 'force-dynamic';

export default async function FinanceiroPage() {
  const { data: financas } = await supabase
    .from('financeiro_projeto')
    .select('*, projetos(titulo)')
    .order('created_at', { ascending: false });

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="table-card" style={{ padding: '0px' }}>
      <table className="oraculo-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Projeto</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Venc./Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {financas?.map((f: any) => (
            <tr key={f.id}>
              <td><strong>{f.descricao}</strong></td>
              <td>{f.projetos?.titulo || '--'}</td>
              <td>
                 <span style={{ color: f.tipo === 'Entrada' ? 'var(--color-green)' : 'var(--color-red)' }}>
                   {f.tipo === 'Entrada' ? '⬆ Entrada' : '⬇ Saída'}
                 </span>
              </td>
              <td>{formatCurrency(f.valor)}</td>
              <td>
                <span className={`badge badge-${f.status_pagamento === 'Pago' ? 'green' : f.status_pagamento === 'Inadimplente' ? 'red' : 'gold'}`}>
                  {f.status_pagamento}
                </span>
              </td>
              <td>{f.data_pagamento ? new Date(f.data_pagamento).toLocaleDateString('pt-BR') : (f.data_vencimento ? new Date(f.data_vencimento).toLocaleDateString('pt-BR') : '--')}</td>
            </tr>
          ))}
          {(!financas || financas.length === 0) && (
             <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Nenhum lançamento financeiro encontrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
