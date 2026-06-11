import { supabase } from '@/lib/supabase';
export const dynamic = 'force-dynamic';

export default async function AnotacoesPage() {
  const { data: anotacoes } = await supabase
    .from('anotacoes')
    .select('*, projetos(titulo)')
    .order('data', { ascending: false });

  const dt = (v: string) => v ? new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
  const autores = [...new Set(anotacoes?.map(n => n.autor).filter(Boolean))];
  const projetos = [...new Set(anotacoes?.map((n: any) => n.projetos?.titulo).filter(Boolean))];

  const COLORS = ['var(--gold)', 'var(--blue)', 'var(--purple)', 'var(--cyan)', 'var(--orange)'];

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total de Anotações', val: anotacoes?.length ?? 0, color: 'gold',  icon: '📋' },
          { label: 'Autores',            val: autores.length,          color: 'blue',  icon: '✍️' },
          { label: 'Projetos com Notas', val: projetos.length,         color: 'green', icon: '🗂' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.val}</div>
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid-2">
        {anotacoes?.map((n: any, i: number) => (
          <div key={n.id} className="nota-card" style={{ borderLeftColor: COLORS[i % COLORS.length], marginBottom: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div className="nota-title">📋 {n.titulo}</div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '12px' }}>{dt(n.data)}</span>
            </div>
            <div className="nota-text">{n.texto}</div>
            <div className="nota-meta" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span>✍️ {n.autor || 'Sistema'}</span>
              <span style={{ color: 'var(--gold)' }}>🎬 {(n as any).projetos?.titulo || 'Geral'}</span>
            </div>
          </div>
        ))}
        {(!anotacoes || anotacoes.length === 0) && (
          <div className="card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-dim)', gridColumn: '1/-1' }}>
            📝 Nenhuma anotação registrada ainda.
          </div>
        )}
      </div>
    </div>
  );
}
