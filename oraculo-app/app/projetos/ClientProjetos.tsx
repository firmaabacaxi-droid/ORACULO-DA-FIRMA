"use client";

import { useState } from "react";
import Link from "next/link";

function R$(val: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val ?? 0);
}

function dt(val: string) {
  if (!val) return "—";
  return new Date(val).toLocaleDateString("pt-BR");
}

const STATUS_COLOR: Record<string, string> = {
  Concluído: "green", Trabalhando: "orange", "Em produção": "orange", Edição: "orange",
  Briefing: "gold", Proposta: "gold", Aprovado: "gold", "Pré-produção": "gold", Cancelado: "red"
};

const WORKFLOW_ICONS: Record<string, string> = {
  Prospecção: "🔍", CRM: "🤝", Proposta: "📄",
  "Pré-Produção": "📋", Filmagem: "🎬", Edição: "✂️", Entrega: "📦",
  Concluído: "✅", Cancelado: "❌"
};

export default function ClientProjetos({ initialProjetos }: { initialProjetos: any[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter projects
  const filteredProjetos = initialProjetos.filter((prj) => {
    const matchesSearch = prj.titulo.toLowerCase().includes(search.toLowerCase()) || 
      (prj.clientes?.nome || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "Todos" || prj.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPIs based on initial projects
  const totalProjects = initialProjetos.length;
  const activeProjects = initialProjetos.filter(p => !["Concluído", "Cancelado"].includes(p.status)).length;
  const totalValue = initialProjetos.reduce((acc, p) => acc + (p.valor_contrato || 0), 0);
  const completedProjects = initialProjetos.filter(p => p.status === "Concluído").length;

  const uniqueStatuses = ["Todos", ...Array.from(new Set(initialProjetos.map((p) => p.status)))];

  return (
    <div>
      {/* ── KPI SECTION ── */}
      <div className="kpi-grid grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="kpi-card gold transition-all duration-300 hover:scale-[1.02]">
          <div className="kpi-label">Total de Obras</div>
          <div className="kpi-value">{totalProjects}</div>
          <div className="kpi-sub">registradas no Notion</div>
          <div className="kpi-icon">🎥</div>
        </div>
        <div className="kpi-card orange transition-all duration-300 hover:scale-[1.02]">
          <div className="kpi-label">Obras Ativas</div>
          <div className="kpi-value">{activeProjects}</div>
          <div className="kpi-sub">em andamento no ateliê</div>
          <div className="kpi-icon">🎬</div>
        </div>
        <div className="kpi-card green transition-all duration-300 hover:scale-[1.02]">
          <div className="kpi-label">Faturamento Geral</div>
          <div className="kpi-value" style={{ fontSize: "20px" }}>{R$(totalValue)}</div>
          <div className="kpi-sub">contratado acumulado</div>
          <div className="kpi-icon">💰</div>
        </div>
        <div className="kpi-card blue transition-all duration-300 hover:scale-[1.02]">
          <div className="kpi-label">Obras Concluídas</div>
          <div className="kpi-value">{completedProjects}</div>
          <div className="kpi-sub">entregas finalizadas</div>
          <div className="kpi-icon">📦</div>
        </div>
      </div>

      {/* ── CONTROLS PANEL ── */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "16px 20px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        {/* Left: Search & Filter */}
        <div style={{ display: "flex", gap: "12px", flex: 1, minWidth: "280px" }}>
          <input 
            type="text" 
            placeholder="Buscar por obra ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "8px 12px",
              color: "var(--text)",
              fontSize: "13px",
              outline: "none"
            }}
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "8px 12px",
              color: "var(--text)",
              fontSize: "13px",
              outline: "none",
              cursor: "pointer"
            }}
          >
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status === "Todos" ? "Todos os Status" : status}</option>
            ))}
          </select>
        </div>

        {/* Right: View Toggle */}
        <div style={{ display: "flex", gap: "4px", background: "var(--surface2)", padding: "4px", borderRadius: "6px", border: "1px solid var(--border)" }}>
          <button
            onClick={() => setViewMode("grid")}
            style={{
              background: viewMode === "grid" ? "var(--border)" : "transparent",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              color: viewMode === "grid" ? "var(--gold)" : "var(--text-dim)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            🖼️ Grade
          </button>
          <button
            onClick={() => setViewMode("table")}
            style={{
              background: viewMode === "table" ? "var(--border)" : "transparent",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              color: viewMode === "table" ? "var(--gold)" : "var(--text-dim)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            📊 Tabela
          </button>
        </div>
      </div>

      {/* ── PROJECTS LIST / GRID ── */}
      {viewMode === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {filteredProjetos.map((prj) => (
            <Link 
              key={prj.id} 
              href={`/projetos/${prj.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "20px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
              }}
              className="hover:scale-[1.02] hover:border-gold/50 hover:shadow-[0_4px_20px_rgba(212,154,106,0.08)]"
              >
                {/* Visual stage icon */}
                <div style={{ position: "absolute", top: "18px", right: "20px", fontSize: "20px" }}>
                  {WORKFLOW_ICONS[prj.workflow_step] ?? "🎬"}
                </div>

                <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                  #{String(prj.auto_id || 1).padStart(3, "0")}
                </div>

                <h4 style={{ fontSize: "17px", fontWeight: 800, marginBottom: "8px", color: "var(--text)", lineHeight: "1.3" }}>
                  {prj.titulo}
                </h4>

                <div style={{ fontSize: "12px", color: "var(--text-dim)", marginBottom: "16px" }}>
                  🏢 {prj.clientes?.nome || "Cliente Geral"}
                </div>

                <div style={{ marginTop: "auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span className={`badge badge-${STATUS_COLOR[prj.status] ?? "gray"}`}>
                      {prj.status}
                    </span>
                    <span style={{ fontWeight: 700, color: "var(--gold)", fontSize: "13px" }}>
                      {R$(prj.valor_contrato || 0)}
                    </span>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "10px", marginTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)" }}>
                    <span>🏁 Entrega: {dt(prj.data_entrega)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filteredProjetos.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px", background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: "var(--radius)", color: "var(--text-dim)" }}>
              Nenhum projeto encontrado para os filtros ativos.
            </div>
          )}
        </div>
      ) : (
        <div className="table-card" style={{ padding: "0px" }}>
          <table className="oraculo-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Obra / Projeto</th>
                <th>Cliente / Órgão</th>
                <th>Status</th>
                <th>Entrega</th>
                <th>Valor Contrato</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjetos.map((prj: any) => (
                <tr key={prj.id}>
                  <td style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>
                    #{String(prj.auto_id || 1).padStart(3, "0")}
                  </td>
                  <td>
                    <Link href={`/projetos/${prj.id}`} style={{ textDecoration: "none", color: "inherit", fontWeight: 700 }} className="hover:text-gold transition-colors">
                      {prj.titulo}
                    </Link>
                  </td>
                  <td style={{ color: "var(--text-dim)" }}>🏢 {prj.clientes?.nome || "--"}</td>
                  <td>
                    <span className={`badge badge-${STATUS_COLOR[prj.status] ?? "gray"}`}>
                      {prj.status}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-dim)" }}>{dt(prj.data_entrega)}</td>
                  <td style={{ fontWeight: 600, color: "var(--gold)" }}>{R$(prj.valor_contrato || 0)}</td>
                </tr>
              ))}
              {filteredProjetos.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "var(--text-dim)" }}>
                    Nenhum projeto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
