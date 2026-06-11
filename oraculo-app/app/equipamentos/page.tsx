import { supabase } from '@/lib/supabase';
export const dynamic = 'force-dynamic';

export default async function EquipamentosPage() {
  const { data: equipamentos } = await supabase
    .from('equipamentos')
    .select('*')
    .order('nome', { ascending: true });

  const { data: alocacoes } = await supabase
    .from('alocacao_equipamentos')
    .select('*, equipamentos(nome), projetos(titulo)')
    .order('created_at', { ascending: false });

  const disponiveis = equipamentos?.filter(e => e.status === 'Disponível').length ?? 0;
  const emUso      = alocacoes?.filter(a => a.status === 'Retirado').length ?? 0;
  const reservados = alocacoes?.filter(a => a.status === 'Reservado').length ?? 0;

  const dt = (v: string) => v ? new Date(v).toLocaleDateString('pt-BR') : '—';

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Disponíveis', val: disponiveis, color: 'green', icon: '✅' },
          { label: 'Em Uso / Retirado', val: emUso, color: 'orange', icon: '🎬' },
          { label: 'Reservados', val: reservados, color: 'blue', icon: '📅' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.val}</div>
          </div>
        ))}
      </div>

      {/* Inventário */}
      <div style={{ marginBottom: '8px' }}>
        <div className="section-header"><h3 className="section-title">📦 Inventário de Equipamentos</h3></div>
      </div>
      <div className="table-wrap">
        <table className="oraculo-table">
          <thead>
            <tr><th>Equipamento</th><th>Categoria</th><th>Patrimônio</th><th>Status</th></tr>
          </thead>
          <tbody>
            {equipamentos?.map((e: any) => (
              <tr key={e.id}>
                <td style={{ fontWeight: 600 }}>{e.nome}</td>
                <td style={{ color: 'var(--text-dim)' }}>
                  <span>{e.categoria === 'Câmera' ? '📷' : e.categoria === 'Drone' ? '🚁' : e.categoria === 'Lente' ? '🔭' : '🎛'} {e.categoria}</span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>{e.patrimonio || '—'}</td>
                <td>
                  <span className={`badge badge-${e.status === 'Disponível' ? 'green' : e.status === 'Em Uso' ? 'orange' : 'gray'}`}>{e.status}</span>
                </td>
              </tr>
            ))}
            {(!equipamentos || equipamentos.length === 0) && (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>Nenhum equipamento cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Alocações */}
      <div style={{ marginTop: '24px', marginBottom: '8px' }}>
        <div className="section-header"><h3 className="section-title">🗓 Alocações por Projeto</h3></div>
      </div>
      <div className="table-wrap">
        <table className="oraculo-table">
          <thead>
            <tr><th>Equipamento</th><th>Projeto</th><th>Retirada</th><th>Devolução</th><th>Status</th></tr>
          </thead>
          <tbody>
            {alocacoes?.map((a: any) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600 }}>{a.equipamentos?.nome || '—'}</td>
                <td style={{ color: 'var(--text-dim)' }}>{a.projetos?.titulo || '—'}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{dt(a.data_retirada)}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{dt(a.data_devolucao)}</td>
                <td>
                  <span className={`badge badge-${a.status === 'Devolvido' ? 'green' : a.status === 'Retirado' ? 'orange' : 'blue'}`}>{a.status}</span>
                </td>
              </tr>
            ))}
            {(!alocacoes || alocacoes.length === 0) && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>Nenhuma alocação registrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
