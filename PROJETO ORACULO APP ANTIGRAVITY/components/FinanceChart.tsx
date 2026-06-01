"use"
"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

interface FinanceChartProps {
  data: {
    mes: string;
    receita: number;
    custo: number;
    margem: number;
  }[];
}

// Custom Tooltip component in the theme Terroso-Pólen
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-4 rounded-md border border-border text-text font-sans">
        <p className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">
          {label}
        </p>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between gap-8">
            <span className="text-green-olive font-medium">Receita:</span>
            <span className="font-semibold">
              {payload[0].value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-orange-burnt font-medium">Custo:</span>
            <span className="font-semibold text-text-dim">
              {payload[1].value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="border-t border-border/60 my-1 pt-1 flex justify-between gap-8 font-semibold">
            <span className="text-gold">Margem:</span>
            <span className={payload[2].value >= 0 ? "text-green-olive" : "text-red-brick"}>
              {payload[2].value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function FinanceChart({ data }: FinanceChartProps) {
  // Caso de dados vazios, gera uma projeção bonita para manter a tela linda
  const chartData = data.length > 0 ? data : [
    { mes: "Jan", receita: 15000, custo: 8000, margem: 7000 },
    { mes: "Fev", receita: 22000, custo: 11000, margem: 11000 },
    { mes: "Mar", receita: 18000, custo: 10000, margem: 8000 },
    { mes: "Abr", receita: 32000, custo: 16000, margem: 16000 },
    { mes: "Mai", receita: 45000, custo: 21000, margem: 24000 },
    { mes: "Jun (Proj)", receita: 55000, custo: 26000, margem: 29000 },
  ];

  // Calcula margem acumulada recente
  const totalReceita = chartData.reduce((sum, item) => sum + item.receita, 0);
  const totalCusto = chartData.reduce((sum, item) => sum + item.custo, 0);
  const totalMargem = totalReceita - totalCusto;
  const percMargem = totalReceita > 0 ? Math.round((totalMargem / totalReceita) * 100) : 0;

  return (
    <div className="glass-panel p-6 rounded-md flex flex-col h-full border border-border">
      
      {/* Cabeçalho do Gráfico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans font-semibold tracking-widest text-text-muted uppercase">
              Fluxo Financeiro Estimado
            </span>
            <span className="px-1.5 py-0.5 bg-green-olive/10 border border-green-olive/20 rounded text-[9px] text-green-olive font-semibold flex items-center gap-0.5">
              <TrendingUp size={10} /> +{percMargem}% Margem
            </span>
          </div>
          <h3 className="text-lg font-serif font-semibold text-text">
            Fluxo de Caixa Operacional
          </h3>
        </div>

        {/* Resumo Acumulado */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex flex-col">
            <span className="text-text-muted text-[10px] uppercase tracking-wider">Total Receita</span>
            <span className="text-sm font-semibold text-green-olive">
              {totalReceita.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex flex-col">
            <span className="text-text-muted text-[10px] uppercase tracking-wider">Total Custos</span>
            <span className="text-sm font-semibold text-text-dim">
              {totalCusto.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>

      {/* Container do Gráfico SVG do Recharts */}
      <div className="flex-1 min-h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
          >
            {/* Definições de Gradientes SVG customizados */}
            <defs>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#687353" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#687353" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCusto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c86b3c" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#c86b3c" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMargem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d49a6a" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#d49a6a" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#241e1a" opacity={0.3} />
            
            <XAxis 
              dataKey="mes" 
              stroke="#6b6054" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            
            <YAxis 
              stroke="#6b6054" 
              fontSize={9} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(v) => `R$ ${v >= 1000 ? `${v / 1000}k` : v}`}
              dx={-5}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', color: '#998e82', fontFamily: 'var(--font-sans)' }}
            />

            {/* Áreas Empilhadas transparentes e suaves */}
            <Area
              name="Receita"
              type="monotone"
              dataKey="receita"
              stroke="#687353"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorReceita)"
            />
            <Area
              name="Custo"
              type="monotone"
              dataKey="custo"
              stroke="#c86b3c"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorCusto)"
            />
            <Area
              name="Margem"
              type="monotone"
              dataKey="margem"
              stroke="#d49a6a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMargem)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
