"use client";

import { useState } from "react";
import Link from "next/link";

// ── Helpers ──────────────────────────────────────────────────────────
function R$(val: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val ?? 0);
}
function dt(val: string) {
  if (!val) return "—";
  return new Date(val).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}
function daysFrom(dateStr: string) {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

// ── Constants ─────────────────────────────────────────────────────────
const WORKFLOW = ["Prospecção", "CRM", "Proposta", "Pré-Produção", "Filmagem", "Edição", "Entrega"];
const WF_ICON: Record<string, string> = {
  Prospecção: "🔍", CRM: "🤝", Proposta: "📄",
  "Pré-Produção": "📋", Filmagem: "🎬", Edição: "✂️", Entrega: "📦",
};
const STATUS_COLOR: Record<string, string> = {
  Concluído: "green", Trabalhando: "orange", "Em produção": "orange", Edição: "orange",
  Briefing: "gold", Proposta: "gold", Aprovado: "gold", "Pré-produção": "gold", Cancelado: "red"
};

// ── Sub-components ─────────────────────────────────────────────────────
function Pill({ label, color = "gray" }: { label: string; color?: string }) {
  return <span className={`badge badge-${color}`}>{label}</span>;
}

function StatCard({ label, value, sub, color = "", icon }: any) {
  return (
    <div className={`kpi-card ${color}`} style={{ padding: "18px 16px" }}>
      {icon && <div className="kpi-icon">{icon}</div>}
      <div className="kpi-label">{label}</div>
      <div className="kpi-value" style={{ fontSize: "20px" }}>{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="section-header">
      <h3 className="section-title">{title}</h3>
      {action}
    </div>
  );
}

function renderNotionBody(text: string) {
  if (!text) {
    return (
      <p style={{ color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>
        Sem conteúdo estruturado no corpo desta página no Notion. Escreva diários, listas ou anotações livres dentro do projeto no Notion para vê-los aqui em tempo real.
      </p>
    );
  }

  const lines = text.split("\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} style={{ height: "6px" }} />;

        // Heading 3
        if (line.startsWith("### ")) {
          return (
            <h4 key={idx} style={{ 
              fontSize: "14px", 
              fontWeight: 700, 
              color: "var(--gold)", 
              marginTop: "16px", 
              marginBottom: "6px",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "4px",
              letterSpacing: "0.5px",
              textTransform: "uppercase"
            }}>
              {line.substring(4)}
            </h4>
          );
        }

        // Bulleted lists
        if (line.startsWith("• ")) {
          return (
            <div key={idx} style={{ display: "flex", gap: "8px", paddingLeft: "12px", fontSize: "13px", color: "var(--text-dim)", lineHeight: "1.6" }}>
              <span style={{ color: "var(--gold)" }}>•</span>
              <span>{line.substring(2)}</span>
            </div>
          );
        }

        // Numbered lists
        const matchNum = line.match(/^(\d+)\.\s(.*)/);
        if (matchNum) {
          return (
            <div key={idx} style={{ display: "flex", gap: "8px", paddingLeft: "12px", fontSize: "13px", color: "var(--text-dim)", lineHeight: "1.6" }}>
              <span style={{ color: "var(--gold)", fontWeight: 600 }}>{matchNum[1]}.</span>
              <span>{matchNum[2]}</span>
            </div>
          );
        }

        // Checklist checked
        if (line.startsWith("[x] ")) {
          return (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", paddingLeft: "8px", fontSize: "13px", color: "var(--text-muted)", textDecoration: "line-through" }}>
              <span style={{ color: "var(--green)", fontSize: "14px", fontWeight: "bold" }}>☑</span>
              <span>{line.substring(4)}</span>
            </div>
          );
        }

        // Checklist unchecked
        if (line.startsWith("[ ] ")) {
          return (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", paddingLeft: "8px", fontSize: "13px", color: "var(--text-dim)" }}>
              <span style={{ color: "var(--gold)", fontSize: "14px" }}>☐</span>
              <span>{line.substring(4)}</span>
            </div>
          );
        }

        // Standard paragraph
        return (
          <p key={idx} style={{ margin: 0, fontSize: "13px", color: "var(--text-dim)", lineHeight: "1.7" }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default function ClientProjectDetails({ project, tarefas, orcamento, corpoNotion }: any) {
  const [tab, setTab] = useState("overview");

  // Cálculo financeiro dinâmico a partir dos status reais do projeto
  let recebido = 0;
  let aReceber = project.valor_contrato ?? 0;
  
  if (['Concluído', 'Finalizado'].includes(project.status)) {
    recebido = project.valor_contrato ?? 0;
    aReceber = 0;
  } else if (['Em produção', 'Edição', 'Filmagem', 'Trabalhando', 'Aprovado', 'Pré-produção'].includes(project.status)) {
    recebido = (project.valor_contrato ?? 0) * 0.50; // Sinal de 50% faturado
    aReceber = (project.valor_contrato ?? 0) * 0.50; // Saldo de 50%
  }

  const tarefasDone = tarefas.filter((t: any) => ["Concluída", "Concluido"].includes(t.status)).length;
  const pctTarefas  = tarefas.length ? Math.round((tarefasDone / tarefas.length) * 100) : 0;
  const dias = daysFrom(project.data_entrega);

  const TABS = [
    { id: "overview",    label: "Visão Geral" },
    { id: "orcamento",   label: `Orçamento / Proposta${orcamento ? " ✓" : ""}` },
    { id: "tarefas",     label: `Tarefas (${tarefas.length})` },
    { id: "equipe",      label: "Equipe & Contato" },
  ];

  return (
    <div>
      {/* ── BREADCRUMB ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "13px" }}>
        <Link href="/projetos" style={{ color: "var(--text-dim)" }}>Projetos</Link>
        <span style={{ color: "var(--text-muted)" }}>›</span>
        <span style={{ color: "var(--text)" }}>{project.titulo}</span>
      </div>

      {/* ── PROJECT HERO ────────────────────────────────────────────── */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        borderTop: "3px solid var(--gold)",
        padding: "24px 28px",
        marginBottom: "16px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
          {/* Left */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                #{String(project.auto_id).padStart(3, "0")} · {project.clientes?.empresa || "Sem empresa"}
              </span>
              <Pill label={project.status} color={STATUS_COLOR[project.status] ?? "gray"} />
            </div>

            <h1 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.5px" }}>
              {WF_ICON[project.workflow_step] ?? "🎬"} {project.titulo}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              {project.clientes?.nome && <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>🏢 {project.clientes.nome}</span>}
              {project.diretor && <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>🎬 Dir. {project.diretor}</span>}
              {project.tipo_projeto && <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>🎥 Tipo: {project.tipo_projeto}</span>}
              {project.data_inicio && <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>🗓 Início: {dt(project.data_inicio)}</span>}
              {project.data_entrega && (
                <span style={{ fontSize: "12px", color: dias !== null && dias < 5 ? "var(--red)" : "var(--text-dim)", fontWeight: dias !== null && dias < 5 ? 700 : 400 }}>
                  🏁 Entrega: {dt(project.data_entrega)}
                  {dias !== null && (
                    <span style={{ marginLeft: "6px", fontSize: "11px" }}>
                      ({dias > 0 ? `faltam ${dias}d` : dias === 0 ? "Hoje!" : `${Math.abs(dias)}d atrás`})
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Right – valor */}
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Valor Contrato</div>
            <div style={{ fontSize: "26px", fontWeight: 800, color: "var(--gold)" }}>{R$(project.valor_contrato ?? 0)}</div>
            <div style={{ fontSize: "12px", color: "var(--green)", marginTop: "4px" }}>{R$(recebido)} recebido (sinal)</div>
          </div>
        </div>

        {/* Progress bar */}
        {tarefas.length > 0 && (
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Progresso das Tarefas
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
                {tarefasDone}/{tarefas.length} · {pctTarefas}%
              </span>
            </div>
            <div style={{ height: "6px", background: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${pctTarefas}%`,
                background: pctTarefas === 100 ? "var(--green)" : "var(--gold)",
                borderRadius: "4px", transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        )}

        {/* Briefing */}
        {project.briefing && (
          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px" }}>Observações / Briefing</div>
            <div style={{ fontSize: "13px", color: "var(--text-dim)", lineHeight: 1.7 }}>{project.briefing}</div>
          </div>
        )}
      </div>

      {/* ── WORKFLOW TRACKER ─────────────────────────────────────────── */}
      <div className="workflow" style={{ marginBottom: "20px" }}>
        {WORKFLOW.map((step, i) => {
          const activeStep = project.workflow_step || "Prospecção";
          const wfIdx = WORKFLOW.indexOf(activeStep);
          const done    = i < wfIdx;
          const active  = i === wfIdx;
          const pending = i > wfIdx;
          return (
            <div key={step} className={`workflow-step ${done ? "done" : ""} ${active ? "active" : ""} ${pending ? "pending" : ""}`}>
              <div className="workflow-icon">{WF_ICON[step]}</div>
              <div className="workflow-label" style={{ fontSize: "11px" }}>{step}</div>
              <div className="workflow-status">{done ? "Concluído" : active ? "Ativo" : "Pendente"}</div>
            </div>
          );
        })}
      </div>

      {/* ── TABS ─────────────────────────────────────────────────────── */}
      <div className="tabs">
        {TABS.map(t => (
          <div key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TAB: VISÃO GERAL
      ═══════════════════════════════════════════════════════════════ */}
      {tab === "overview" && (
        <div>
          {/* 3 KPIs financeiros */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
            <StatCard label="Contrato Fechado" value={R$(project.valor_contrato ?? 0)} color="gold" icon="💼" />
            <StatCard label="Sinal Recebido (50%)" value={R$(recebido)} color="green" icon="✅" sub="Est. fluxo de caixa" />
            <StatCard label="Saldo a Receber (50%)" value={R$(aReceber)} color="blue" icon="⏳" />
          </div>

          {/* 2 colunas: cliente + detalhes */}
          <div className="grid-2">
            <div className="card">
              <div className="card-title">🏢 Cliente & Contato</div>
              <div className="detail-row"><div className="detail-label">Nome</div><div className="detail-value" style={{ fontWeight: 600 }}>{project.clientes?.nome || "—"}</div></div>
              <div className="detail-row"><div className="detail-label">Empresa</div><div className="detail-value">{project.clientes?.empresa || "—"}</div></div>
              <div className="detail-row"><div className="detail-label">E-mail</div><div className="detail-value">{project.clientes?.email || "—"}</div></div>
              <div className="detail-row"><div className="detail-label">Telefone</div><div className="detail-value">{project.clientes?.telefone || "—"}</div></div>
            </div>

            <div className="card">
              <div className="card-title">🎬 Detalhes de Produção</div>
              <div className="detail-row"><div className="detail-label">Responsável</div><div className="detail-value" style={{ fontWeight: 600 }}>{project.diretor || "Firma Abacaxi"}</div></div>
              <div className="detail-row"><div className="detail-label">Formato/Tipo</div><div className="detail-value">{project.tipo_projeto || "—"}</div></div>
              <div className="detail-row"><div className="detail-label">Data de Entrega</div><div className="detail-value">{dt(project.data_entrega)}</div></div>
              <div className="detail-row"><div className="detail-label">Status Geral</div><div className="detail-value"><Pill label={project.status} color="orange" /></div></div>
              <div className="detail-row">
                <div className="detail-label">Etapa Workflow</div>
                <div className="detail-value"><Pill label={project.workflow_step ?? "—"} color="gold" /></div>
              </div>
            </div>
          </div>

          {/* Conteúdo Integrado do Notion */}
          <div style={{ marginBottom: "24px" }}>
            <SectionHeader title="📖 Diário de Bordo & Conteúdo Integrado (Notion)" />
            <div className="card" style={{ 
              borderTop: "3px solid var(--gold)", 
              background: "rgba(26, 22, 20, 0.4)", 
              backdropFilter: "blur(12px)",
              padding: "20px 24px"
            }}>
              <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "8px" }} className="custom-scrollbar">
                {renderNotionBody(corpoNotion)}
              </div>
            </div>
          </div>

          {/* Últimas Tarefas */}
          <div>
            <SectionHeader title="Últimas Tarefas Relacionadas" />
            <div className="card" style={{ padding: 0 }}>
              {tarefas.slice(0, 4).map((t: any) => {
                const done = ["Concluída", "Concluido"].includes(t.status);
                return (
                  <div key={t.id} className="task-item">
                    <div className={`task-check ${done ? "done" : ""}`} />
                    <div style={{ flex: 1 }}>
                      <div className={`task-name ${done ? "done" : ""}`}>{t.titulo}</div>
                      <div className="task-project">{dt(t.data_limite) !== "—" ? `Prazo: ${dt(t.data_limite)}` : "Sem prazo definido"}</div>
                    </div>
                    <Pill label={t.prioridade} color={t.prioridade === "Urgente" ? "red" : t.prioridade === "Alta" ? "orange" : "gray"} />
                  </div>
                );
              })}
              {tarefas.length === 0 && <div style={{ padding: "20px", textAlign: "center", color: "var(--text-dim)" }}>Nenhuma tarefa associada a este projeto no Notion.</div>}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB: ORÇAMENTO
      ═══════════════════════════════════════════════════════════════ */}
      {tab === "orcamento" && (
        <div>
          {!orcamento ? (
            <div className="card" style={{ textAlign: "center", padding: "48px", color: "var(--text-dim)" }}>
              Nenhum orçamento / proposta comercial vinculado a esta obra no Notion.
            </div>
          ) : (
            <>
              {/* Budget KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                <StatCard label="Valor Vendido"   value={R$(orcamento.valor_total)}    color="gold"   icon="💰" />
                <StatCard label="Custo Estimado (40%)"  value={R$(orcamento.custo_previsto)} color="blue"   icon="📋" />
                <StatCard label="Status Proposta" value={orcamento.status} color={orcamento.status === "Aprovada" ? "green" : "orange"} icon="📌" />
              </div>

              {/* Mapeamento de categorias estimadas */}
              <div className="card">
                <div className="card-title" style={{ marginBottom: "20px" }}>📊 Alocação de Custos Estimada por Categoria</div>
                <div style={{ display: "grid", gap: "20px" }}>
                  {orcamento.orcamento_categorias?.map((cat: any) => {
                    const pct = cat.valor_alocado > 0 ? (cat.valor_alocado / orcamento.valor_total) * 100 : 0;
                    return (
                      <div key={cat.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontWeight: 600, fontSize: "13px" }}>{cat.categoria}</span>
                          <div style={{ textAlign: "right", fontSize: "12px" }}>
                            <span style={{ color: "var(--gold)", fontWeight: 700 }}>{R$(cat.valor_alocado)}</span>
                            <span style={{ color: "var(--text-muted)", marginLeft: "8px" }}>({pct.toFixed(0)}%)</span>
                          </div>
                        </div>
                        <div style={{ height: "8px", background: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                          <div style={{
                            height: "100%", width: `${pct}%`,
                            background: "var(--gold)", borderRadius: "4px",
                            transition: "width 0.5s ease",
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB: TAREFAS
      ═══════════════════════════════════════════════════════════════ */}
      {tab === "tarefas" && (
        <div>
          <div className="table-wrap">
            <table className="oraculo-table">
              <thead>
                <tr>
                  <th style={{ width: "36px" }}></th>
                  <th>Tarefa</th><th>Prioridade</th><th>Prazo</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tarefas.map((t: any) => {
                  const done = ["Concluída", "Concluido"].includes(t.status);
                  return (
                    <tr key={t.id}>
                      <td>
                        <div className={`task-check ${done ? "done" : ""}`} style={{ margin: "0 auto" }} />
                      </td>
                      <td style={{ fontWeight: 500, textDecoration: done ? "line-through" : "none", color: done ? "var(--text-dim)" : "var(--text)" }}>{t.titulo}</td>
                      <td><Pill label={t.prioridade} color={t.prioridade === "Urgente" ? "red" : t.prioridade === "Alta" ? "orange" : "gray"} /></td>
                      <td style={{ color: "var(--text-dim)", fontSize: "12px" }}>{dt(t.data_limite)}</td>
                      <td><Pill label={t.status} color={done ? "green" : t.status === "Em andamento" ? "orange" : "gray"} /></td>
                    </tr>
                  );
                })}
                {tarefas.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "var(--text-dim)" }}>Nenhuma tarefa cadastrada para esta obra.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB: EQUIPE & CONTATO
      ═══════════════════════════════════════════════════════════════ */}
      {tab === "equipe" && (
        <div className="grid-2">
          {/* Equipe / Responsável */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: "16px" }}>👥 Responsável Técnico</div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "var(--radius)" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", fontWeight: 700, color: "#000"
              }}>
                {(project.diretor || "F")[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>{project.diretor || "Firma Abacaxi"}</div>
                <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>Ateliê Audiovisual</div>
              </div>
              <Pill label="Responsável" color="gold" />
            </div>
          </div>

          {/* Cliente Contact details */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: "16px" }}>🏢 Detalhes do Cliente</div>
            {project.clientes ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "var(--radius)" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", fontWeight: 700, color: "#fff"
                }}>
                  {(project.clientes.nome || "C")[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>{project.clientes.nome}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>🏢 {project.clientes.empresa}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>✉️ {project.clientes.email || "Sem e-mail"}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>📞 {project.clientes.telefone || "Sem telefone"}</div>
                </div>
              </div>
            ) : (
              <div style={{ color: "var(--text-dim)", fontSize: "13px" }}>Nenhum cliente cadastrado neste projeto.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
