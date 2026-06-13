"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const AGENTS = [
  { id: "proposal", name: "Agente de Proposta", role: "Orçamentos & Preços", icon: "📄", status: "idle", description: "Elabora propostas comerciais e atualiza estimativas no Notion." },
  { id: "preprod", name: "Agente de Pré-Produção", role: "Roteiros & Decupagens", icon: "🎬", status: "idle", description: "Estrutura roteiros cinematográficos e planos de filmagem." },
  { id: "management", name: "Agente de Gestão", role: "Ordem do Dia & Finanças", icon: "📊", status: "idle", description: "Organiza cronogramas de set, ordens do dia e conciliação." },
  { id: "content", name: "Agente de Conteúdo", role: "Mídias & Redes Sociais", icon: "📱", status: "idle", description: "Gera calendários editoriais e cópias humanizadas para posts." },
  { id: "prospect", name: "Agente de Prospecção", role: "CRM & Funil B2B", icon: "🤝", status: "idle", description: "Qualifica novos contatos e alimenta o pipeline comercial." }
];

const ACTIONS = [
  { id: "update_metrics", title: "📊 Atualizar Métricas", desc: "Recalcula totais de faturamento e atualiza o dashboard global.", command: "update_metrics" },
  { id: "sync_vault", title: "🧠 Sincronizar Grafo do Cérebro", desc: "Varre o vault Obsidian e atualiza o banco de links HangarX.", command: "sync_vault" },
  { id: "process_financials", title: "💰 Conciliar Fluxo Financeiro", desc: "Calcula despesas e desvios de projetos (Budget vs. Actual).", command: "process_financials" },
  { id: "audit_vault", title: "🔍 Auditoria de Consistência", desc: "Localiza órfãos, links quebrados e inconsistências no Cérebro.", command: "audit_vault" },
  { id: "sync_proposal", title: "🔄 Sincronizar Proposta Notion", desc: "Roda sync da proposta e briefing v7 do Brasil Participativo.", command: "sync_proposal" }
];

export default function CockpitPanel() {
  const [runningCmd, setRunningCmd] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const runCommand = (actionId: string, command: string) => {
    if (runningCmd) {
      toast.error("Uma automação já está em andamento. Aguarde a conclusão.");
      return;
    }

    setRunningCmd(actionId);
    setLogs((prev) => [...prev, `\n--- [INICIANDO: ${command.toUpperCase()}] ---`]);
    toast.loading(`Executando ${command}...`, { id: "running-toast" });

    const eventSource = new EventSource(`/api/agents?command=${command}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.log) {
          setLogs((prev) => [...prev, data.log]);
        }
      } catch (err) {
        console.error("Erro ao ler log do evento:", err);
      }
    };

    eventSource.onerror = (err) => {
      eventSource.close();
      setRunningCmd(null);
      toast.dismiss("running-toast");
      toast.error(`Falha ou conclusão da automação.`);
      setLogs((prev) => [...prev, `❌ Conexão encerrada.`]);
    };
  };

  const clearLogs = () => {
    setLogs([]);
    toast.success("Logs limpos");
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* ── AGENTS GRID ────────────────────────────────────────────── */}
      <div>
        <h3 className="section-title" style={{ marginBottom: "12px" }}>🔮 Subagentes do Oráculo</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
          {AGENTS.map((agent) => (
            <div 
              key={agent.id} 
              className="card" 
              style={{ 
                padding: "16px", 
                borderTop: "3px solid var(--gold)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                height: "100%",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "20px" }}>{agent.icon}</span>
                  <span className="badge badge-green" style={{ gap: "4px", fontSize: "10px", padding: "2px 6px" }}>
                    <span 
                      style={{ 
                        width: "6px", 
                        height: "6px", 
                        borderRadius: "50%", 
                        background: "var(--green)", 
                        display: "inline-block" 
                      }} 
                    />
                    Ativo
                  </span>
                </div>
                <h4 style={{ fontSize: "14px", fontWeight: 700, marginTop: "8px", color: "var(--text)" }}>{agent.name}</h4>
                <div style={{ fontSize: "10px", color: "var(--gold)", fontWeight: 600 }}>{agent.role}</div>
                <p style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "6px", lineHeight: "1.4" }}>{agent.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM COCKPIT GRID ──────────────────────────────────────── */}
      <div className="grid-2" style={{ gap: "20px", alignItems: "stretch" }}>
        
        {/* Quick Action Commands */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="card-title" style={{ margin: 0 }}>⚡ Botões de Ação Rápida</div>
          <p style={{ fontSize: "12px", color: "var(--text-dim)" }}>
            Execute scripts locais e rotinas de sincronização em tempo real.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, justifyContent: "center" }}>
            {ACTIONS.map((act) => {
              const isCurrent = runningCmd === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => runCommand(act.id, act.command)}
                  disabled={runningCmd !== null}
                  className={`btn ${isCurrent ? "btn-gold" : "btn-ghost"}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "12px 16px",
                    textAlign: "left",
                    gap: "4px",
                    opacity: runningCmd !== null && !isCurrent ? 0.5 : 1,
                    transition: "all 0.15s ease",
                    cursor: runningCmd !== null ? "not-allowed" : "pointer",
                    width: "100%",
                    borderRadius: "6px"
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: "13px" }}>{act.title}</span>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{act.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-Time Logs Terminal Console */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "10px", minHeight: "350px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="card-title" style={{ margin: 0 }}>💻 Console de Logs (Terminal)</div>
            <button 
              onClick={clearLogs} 
              className="btn btn-ghost" 
              style={{ fontSize: "10px", padding: "2px 8px" }}
              disabled={logs.length === 0}
            >
              Limpar Logs
            </button>
          </div>
          
          <div 
            style={{
              flex: 1,
              background: "#080706",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "12px 16px",
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "11px",
              color: "#6dbf6d", // glowing green
              overflowY: "auto",
              maxHeight: "350px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              boxShadow: "inset 0 4px 12px rgba(0,0,0,0.8)"
            }}
            className="custom-scrollbar"
          >
            {logs.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontStyle: "italic", textAlign: "center", paddingTop: "80px" }}>
                Aguardando execução de comandos... Os logs do terminal serão exibidos aqui.
              </div>
            ) : (
              logs.map((log, index) => {
                let color = "#6dbf6d"; // green
                if (log.startsWith("⚠️")) color = "var(--orange)";
                if (log.startsWith("❌") || log.startsWith("⚠️ Falha")) color = "var(--red)";
                if (log.startsWith("🚀") || log.startsWith("🏁")) color = "var(--gold)";
                
                return (
                  <div key={index} style={{ color, marginBottom: "4px", lineHeight: "1.4" }}>
                    {log}
                  </div>
                );
              })
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
