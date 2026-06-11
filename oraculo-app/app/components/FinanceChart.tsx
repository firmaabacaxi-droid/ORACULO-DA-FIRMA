"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function R$(val: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val ?? 0);
}

export default function FinanceChart({ data }: { data: any[] }) {
  const chartData = data.map(prj => {
    let recebido = 0;
    if (['Concluído', 'Finalizado'].includes(prj.status)) {
      recebido = prj.valor_contrato ?? 0;
    } else if (['Em produção', 'Edição', 'Filmagem', 'Trabalhando', 'Aprovado', 'Pré-produção'].includes(prj.status)) {
      recebido = (prj.valor_contrato ?? 0) * 0.50; // 50% de sinal de fluxo
    }
    
    return {
      name: prj.titulo.length > 12 ? prj.titulo.substring(0, 12) + '...' : prj.titulo,
      'Valor Contrato': prj.valor_contrato || 0,
      'Realizado': recebido,
    };
  });

  return (
    <div style={{ width: '100%', height: 260, marginTop: 16 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.20}/>
              <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRealizado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--green)" stopOpacity={0.20}/>
              <stop offset="95%" stopColor="var(--green)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--text-muted)" 
            fontSize={10} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="var(--text-muted)" 
            fontSize={10} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `R$ ${v/1000}k`}
          />
          <Tooltip
            contentStyle={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius)',
              color: 'var(--text)',
              fontSize: '12px'
            }}
            formatter={(value: any) => [R$(Number(value)), '']}
          />
          <Area 
            type="monotone" 
            dataKey="Valor Contrato" 
            stroke="var(--gold)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValor)" 
          />
          <Area 
            type="monotone" 
            dataKey="Realizado" 
            stroke="var(--green)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRealizado)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
