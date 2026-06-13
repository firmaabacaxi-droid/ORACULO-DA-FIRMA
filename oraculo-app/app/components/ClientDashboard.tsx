"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import FinanceChart from "@/app/components/FinanceChart";
import DashboardHeader from "@/app/components/DashboardHeader";

interface ClientDashboardProps {
  clientes: any[];
  initialKPIs: any;
  initialProjects: any[];
  initialLeads: any[];
  initialTasks: any[];
  initialFinance: any;
}

export default function ClientDashboard({
  clientes,
  initialKPIs,
  initialProjects,
  initialLeads,
  initialTasks,
  initialFinance
}: ClientDashboardProps) {
  // Local states for data
  const [projects, setProjects] = useState(initialProjects);
  const [leads, setLeads] = useState(initialLeads);
  const [tasks, setTasks] = useState(initialTasks);
  const [kpis, setKpis] = useState(initialKPIs);
  const [finance, setFinance] = useState(initialFinance);

  // Financial meta target state (saved in localStorage)
  const [metaTarget, setMetaTarget] = useState(50000);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [tempMeta, setTempMeta] = useState("50000");

  // Inline editing states
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });

  // Quick items adding states
  const [quickTaskTitle, setQuickTaskTitle] = useState("");
  const [quickTaskProjId, setQuickTaskProjId] = useState("");
  const [quickTaskPriority, setQuickTaskPriority] = useState("Normal");
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Load meta target from localStorage on client side
  useEffect(() => {
    const savedMeta = localStorage.getItem('oraculo_meta_faturamento');
    if (savedMeta) {
      setMetaTarget(Number(savedMeta));
      setTempMeta(savedMeta);
    }
  }, []);

  // Format helper
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val ?? 0);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '--/--/--';
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    if (['Concluído', 'Finalizado', 'Ganho', 'Aprovada'].includes(status)) return 'green';
    if (['Em produção', 'Edição', 'Filmagem', 'Trabalhando', 'Em andamento'].includes(status)) return 'orange';
    if (['Briefing', 'Proposta', 'Aprovado', 'Pré-produção', 'CRM', 'Prospecção'].includes(status)) return 'gold';
    if (['Cancelado', 'Perdido', 'Reprovado', 'Urgente', 'Alta'].includes(status)) return 'red';
    return 'gray';
  };

  // Toast notifier - uses react-hot-toast (global, in layout.tsx)
  const triggerToast = (text: string, type: 'success' | 'error') => {
    if (type === 'success') toast.success(text);
    else toast.error(text);
  };

  // 1. Update Project Status inline
  const handleProjectStatusChange = async (projectId: string, nextStatus: string) => {
    setSavingId(projectId);
    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateProjectStatus',
          projectId,
          status: nextStatus
        })
      });

      if (res.ok) {
        // Update local state
        setProjects((prev: any[]) => prev.map((p: any) => p.id === projectId ? { ...p, status: nextStatus } : p));
        triggerToast("Status do projeto atualizado no Notion!", "success");
      } else {
        throw new Error("Erro na API");
      }
    } catch (e) {
      console.error(e);
      triggerToast("Erro ao salvar status no Notion.", "error");
    } finally {
      setSavingId(null);
    }
  };

  // 2. Double-click value editing
  const handleStartEditValue = (projectId: string, currentValue: number) => {
    setEditingProjectId(projectId);
    setEditingValue(String(currentValue));
  };

  const handleSaveProjectValue = async (projectId: string) => {
    const numValue = Number(editingValue);
    if (isNaN(numValue)) {
      toast.error('Digite um valor numérico válido.');
      return;
    }

    setSavingId(projectId);
    setEditingProjectId(null);

    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateProjectValue',
          projectId,
          value: numValue
        })
      });

      if (res.ok) {
        setProjects((prev: any[]) => prev.map((p: any) => p.id === projectId ? { ...p, valor_contrato: numValue } : p));
        
        // Recalculate Finance Summary locally
        const updatedProjects = projects.map(p => p.id === projectId ? { ...p, valor_contrato: numValue } : p);
        const newTotal = updatedProjects.reduce((acc, p) => acc + (p.valor_contrato || 0), 0);
        setFinance((prev: any) => {
          const totalEntradas = newTotal;
          const totalSaidas = newTotal * 0.40;
          return {
            totalEntradas,
            totalSaidas,
            saldoAtual: totalEntradas - totalSaidas
          };
        });

        // Sync KPI
        setKpis((prev: any) => ({ ...prev, faturamento_mes: newTotal }));

        triggerToast("Valor do projeto atualizado!", "success");
      } else {
        throw new Error("Erro ao salvar valor");
      }
    } catch (e) {
      console.error(e);
      triggerToast("Erro ao salvar valor no Notion.", "error");
    } finally {
      setSavingId(null);
    }
  };

  // 3. Update Lead CRM status inline
  const handleLeadStatusChange = async (leadId: string, nextStatus: string) => {
    setSavingId(leadId);
    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateLeadStatus',
          leadId,
          status: nextStatus
        })
      });

      if (res.ok) {
        setLeads((prev: any[]) => prev.map((l: any) => l.id === leadId ? { ...l, status: nextStatus } : l));
        triggerToast("Etapa do lead atualizada no Notion!", "success");
      } else {
        throw new Error("Erro na API");
      }
    } catch (e) {
      console.error(e);
      triggerToast("Erro ao salvar status do lead.", "error");
    } finally {
      setSavingId(null);
    }
  };

  // 4. Check/Complete task inline
  const handleToggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const nextStatus = ['Concluída', 'Concluido'].includes(currentStatus) ? 'A fazer' : 'Concluída';
    setSavingId(taskId);
    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateTaskStatus',
          taskId,
          status: nextStatus
        })
      });

      if (res.ok) {
        setTasks((prev: any[]) => prev.map((t: any) => t.id === taskId ? { ...t, status: nextStatus } : t));
        triggerToast("Status da tarefa atualizado!", "success");
      } else {
        throw new Error("Erro na API");
      }
    } catch (e) {
      console.error(e);
      triggerToast("Erro ao atualizar status da tarefa.", "error");
    } finally {
      setSavingId(null);
    }
  };

  // 5. Update Task Priority inline
  const handleTaskPriorityChange = async (taskId: string, nextPriority: string) => {
    setSavingId(taskId);
    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateTaskPriority',
          taskId,
          priority: nextPriority
        })
      });

      if (res.ok) {
        setTasks((prev: any[]) => prev.map((t: any) => t.id === taskId ? { ...t, prioridade: nextPriority } : t));
        triggerToast("Prioridade da tarefa atualizada!", "success");
      } else {
        throw new Error("Erro na API");
      }
    } catch (e) {
      console.error(e);
      triggerToast("Erro ao atualizar prioridade no Notion.", "error");
    } finally {
      setSavingId(null);
    }
  };

  // 6. Save meta target faturamento
  const handleSaveMeta = () => {
    const numMeta = Number(tempMeta);
    if (isNaN(numMeta) || numMeta <= 0) {
      toast.error('Digite um valor de meta válido.');
      return;
    }
    setMetaTarget(numMeta);
    localStorage.setItem('oraculo_meta_faturamento', String(numMeta));
    setIsEditingMeta(false);
    triggerToast('Meta de faturamento atualizada!', 'success');
  };

  // 7. Add quick task
  const handleAddQuickTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;

    setIsAddingTask(true);
    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createTask',
          projectId: quickTaskProjId || projects[0]?.id, // fallback to first project
          titulo: quickTaskTitle,
          prioridade: quickTaskPriority,
          data_limite: undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        const createdTask = data.result;

        const projTitle = projects.find(p => p.id === (quickTaskProjId || projects[0]?.id))?.titulo || "Projeto";
        
        // Push task locally
        const newTask = {
          id: createdTask.id,
          titulo: quickTaskTitle,
          status: 'A fazer',
          prioridade: quickTaskPriority,
          data_limite: null,
          projetos: {
            id: quickTaskProjId || projects[0]?.id,
            titulo: projTitle
          }
        };

        setTasks((prev: any[]) => [newTask, ...prev]);
        setQuickTaskTitle("");
        triggerToast("Nova tarefa adicionada ao foco!", "success");
      } else {
        throw new Error("Erro ao adicionar tarefa");
      }
    } catch (e) {
      console.error(e);
      triggerToast("Erro ao criar tarefa rápida.", "error");
    } finally {
      setIsAddingTask(false);
    }
  };

  // Meta faturamento percent calculation
  const metaPercentage = Math.min(Math.round((finance.totalEntradas / metaTarget) * 100), 100);

  // Filter: show only active projects (exclude Concluido / Cancelado)
  const activeProjects = projects.filter((p: any) =>
    !['Concluído', 'Finalizado', 'Cancelado'].includes(p.status)
  );

  return (
    <div className="fade-in" style={{ position: 'relative', minHeight: '100vh' }}>
      <DashboardHeader clientes={clientes} />

      {/* KPI GRID */}
      <div className="kpi-grid">
          <div className="kpi-card gold kpi-hover">
            <div className="kpi-label">Obras Ativas</div>
            <div className="kpi-value">{activeProjects.length}</div>
            <div className="kpi-sub">no atelê</div>
            <div className="kpi-icon">🎬</div>
          </div>
          
          <div className="kpi-card blue kpi-hover">
            <div className="kpi-label">Aproximações</div>
            <div className="kpi-value">{leads.length}</div>
            <div className="kpi-sub">exploração de CRM</div>
            <div className="kpi-icon">🔍</div>
          </div>
          
          <div className="kpi-card green kpi-hover">
            <div className="kpi-label">Faturado Real</div>
            <div className="kpi-value" style={{ fontSize: '18px' }}>{formatCurrency(finance.totalEntradas)}</div>
            <div className="kpi-sub">entradas totais</div>
            <div className="kpi-icon">💰</div>
          </div>
          
          {/* Editable Meta Target Card */}
          <div
            onClick={() => { if(!isEditingMeta) setIsEditingMeta(true); }}
            className="kpi-card orange kpi-hover"
            style={{ cursor: 'pointer' }}
          >
            <div className="kpi-label">Meta Faturamento {isEditingMeta && "✍️"}</div>
            {isEditingMeta ? (
              <div 
                style={{ display: 'flex', gap: '4px', marginTop: '6px', marginBottom: '4px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={tempMeta}
                  onChange={(e) => setTempMeta(e.target.value)}
                  style={{
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    fontSize: '13px',
                    padding: '2px 6px',
                    width: '70px',
                    outline: 'none'
                  }}
                  onKeyDown={(e) => { if(e.key === 'Enter') handleSaveMeta(); }}
                />
                <button onClick={handleSaveMeta} style={{ background: 'var(--gold)', color: '#000', border: 'none', borderRadius: '4px', fontSize: '11px', padding: '0 8px', fontWeight: 700 }}>Ok</button>
              </div>
            ) : (
              <div className="kpi-value" style={{ fontSize: '18px' }}>{formatCurrency(metaTarget)}</div>
            )}
            <div className="kpi-sub">
              {metaPercentage}% atingido · Clique p/ editar
            </div>
            <div className="kpi-icon">📈</div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{ height: '100%', width: `${metaPercentage}%`, background: 'var(--gold)', borderRadius: '2px' }}></div>
            </div>
          </div>

          <div className="kpi-card red kpi-hover" style={{ position: 'relative' }}>
            <div className="kpi-label">Focos Imediatos</div>
            <div className="kpi-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {tasks.filter((t: any) => !['Concluída', 'Concluido'].includes(t.status)).length > 0 && (
                <span style={{ position: 'relative', display: 'inline-flex', width: '12px', height: '12px' }}>
                  <span style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: 'var(--red)', opacity: 0.75,
                    animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite'
                  }}></span>
                  <span style={{ position: 'relative', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--red)', display: 'inline-block' }}></span>
                </span>
              )}
              {tasks.filter((t: any) => !['Concluída', 'Concluido'].includes(t.status)).length}
            </div>
            <div className="kpi-sub">focos pendentes</div>
            <div className="kpi-icon">⚠️</div>
          </div>
        </div>

        {/* Main Body - 2 Columns (65% / 35%) */}
        <div className="grid-65-35">
          {/* Column Left */}
          <div>
            {/* Obras Section */}
            <div className="section-header">
              <h3 className="section-title">Obras no Atelê
                <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '10px', marginLeft: '8px' }}>
                  ({activeProjects.length} ativas)
                </span>
              </h3>
              <Link href="/projetos" className="section-link">Ver todas →</Link>
            </div>
            <div className="table-wrap" style={{ marginBottom: '24px' }}>
              <table className="oraculo-table">
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Cliente</th>
                    <th style={{ width: '150px' }}>Status (Rápido)</th>
                    <th>Entrega</th>
                    <th style={{ width: '130px' }}>Valor Contratado</th>
                  </tr>
                </thead>
                <tbody>
                  {activeProjects.map((prj: any) => {
                    const isSaving = savingId === prj.id;
                    const isEditing = editingProjectId === prj.id;
                    
                    return (
                      <tr 
                        key={prj.id} 
                        className="hover:bg-surface2/30 transition-colors duration-200"
                        style={{ opacity: isSaving ? 0.6 : 1 }}
                      >
                        <td>
                          <Link href={`/projetos/${prj.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="project-name-sm font-semibold hover:text-gold transition-colors">{prj.titulo}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ID: #{String(prj.auto_id || 1).padStart(3, '0')}</div>
                          </Link>
                        </td>
                        <td style={{ color: 'var(--text-dim)' }}>
                          🏢 {prj.clientes?.nome || '--'}
                        </td>
                        {/* Dynamic Status Dropdown */}
                        <td>
                          <select
                            value={prj.status}
                            onChange={(e) => handleProjectStatusChange(prj.id, e.target.value)}
                            disabled={isSaving}
                            style={{
                              background: 'var(--surface2)',
                              border: `1px solid var(--border)`,
                              borderRadius: '4px',
                              color: `var(--text)`,
                              fontSize: '11px',
                              padding: '4px 6px',
                              cursor: 'pointer',
                              outline: 'none',
                              fontWeight: 700
                            }}
                          >
                            <option value="Briefing">Briefing</option>
                            <option value="Proposta">Proposta</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Pré-produção">Pré-produção</option>
                            <option value="Trabalhando">Trabalhando</option>
                            <option value="Em produção">Em produção</option>
                            <option value="Edição">Edição</option>
                            <option value="Filmagem">Filmagem</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                          </select>
                        </td>
                        <td style={{ color: 'var(--text-dim)', fontSize: '12px' }}>{formatDate(prj.data_entrega)}</td>
                        {/* Editable Contract Value Cell */}
                        <td 
                          onDoubleClick={() => handleStartEditValue(prj.id, prj.valor_contrato)}
                          style={{ cursor: 'pointer' }}
                          title="Clique duas vezes para editar o valor"
                        >
                          {isEditing ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              onBlur={() => handleSaveProjectValue(prj.id)}
                              onKeyDown={(e) => { if(e.key === 'Enter') handleSaveProjectValue(prj.id); if(e.key === 'Escape') setEditingProjectId(null); }}
                              autoFocus
                              style={{
                                background: 'var(--surface2)',
                                border: '1px solid var(--gold)',
                                borderRadius: '4px',
                                color: 'var(--text)',
                                fontSize: '12px',
                                padding: '4px 6px',
                                width: '90px',
                                outline: 'none'
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-between" style={{ fontWeight: 600, color: 'var(--gold)' }}>
                              <span>{formatCurrency(prj.valor_contrato)}</span>
                              <span style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.3 }}>✏️</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {activeProjects.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', opacity: 0.5, color: 'var(--text-dim)' }}>Nenhum projeto ativo no momento.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* CRM Funnel Section */}
            <div className="section-header">
              <h3 className="section-title">Aproximações & Narrativas (CRM)</h3>
            </div>
            <div className="table-wrap" style={{ marginBottom: '24px' }}>
              <table className="oraculo-table">
                <thead>
                  <tr>
                    <th>Oportunidade / Lead</th>
                    <th>Empresa / Cliente</th>
                    <th style={{ width: '160px' }}>Etapa Funil (Status)</th>
                    <th>Valor Est. (Proposta)</th>
                    <th>Data Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead: any) => {
                    const isSaving = savingId === lead.id;

                    return (
                      <tr 
                        key={lead.id} 
                        className="hover:bg-surface2/30 transition-colors duration-200"
                        style={{ opacity: isSaving ? 0.6 : 1 }}
                      >
                        <td style={{ fontWeight: 600 }}>{lead.titulo}</td>
                        <td style={{ color: 'var(--text-dim)' }}>
                          🏢 {lead.clientes?.nome || '--'}
                        </td>
                        {/* Interactive Stage selector */}
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                            disabled={isSaving}
                            style={{
                              background: 'var(--surface2)',
                              border: `1px solid var(--border)`,
                              borderRadius: '4px',
                              color: `var(--text)`,
                              fontSize: '11px',
                              padding: '4px 6px',
                              cursor: 'pointer',
                              outline: 'none',
                              fontWeight: 700
                            }}
                          >
                            <option value="Prospecção">Prospecção</option>
                            <option value="CRM">CRM</option>
                            <option value="Proposta">Proposta</option>
                            <option value="Contrato">Contrato</option>
                            <option value="Ganho">Ganho</option>
                            <option value="Perdido">Perdido</option>
                          </select>
                        </td>
                        <td style={{ fontWeight: 600, color: 'var(--gold)' }}>
                          {formatCurrency(lead.valor_contrato || 0)}
                        </td>
                        <td style={{ color: 'var(--text-dim)', fontSize: '12px' }}>{formatDate(lead.created_at)}</td>
                      </tr>
                    );
                  })}
                  {leads.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>Nenhum lead no funil.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column Right */}
          <div>
            {/* Focus Tasks sidebar with check & quick add */}
            <div className="section-header">
              <h3 className="section-title">Focos de Ação (Checklist)</h3>
              <Link href="/tarefas" className="section-link font-semibold transition-all hover:text-gold-dim">Ver todas →</Link>
            </div>
            
            <div className="card border border-border/40 bg-surface/50 backdrop-blur-md mb-6" style={{ padding: 0 }}>
              {/* Task Items List */}
              <div style={{ maxHeight: '280px', overflowY: 'auto' }} className="custom-scrollbar">
                {tasks.map((task: any) => {
                  const done = ['Concluída', 'Concluido'].includes(task.status);
                  const isSaving = savingId === task.id;

                  return (
                    <div 
                      className="task-item flex items-center justify-between p-3 border-b border-border/30 hover:bg-surface2/30 transition-all duration-200" 
                      key={task.id}
                      style={{ opacity: isSaving ? 0.6 : 1 }}
                    >
                      <div className="flex items-center gap-3" style={{ flex: 1 }}>
                        {/* Check button */}
                        <div 
                          onClick={() => handleToggleTaskStatus(task.id, task.status)}
                          className={`task-check ${done ? "done" : ""}`} 
                          style={{ cursor: 'pointer', flexShrink: 0 }}
                          title={done ? "Marcar como a fazer" : "Concluir tarefa"}
                        />
                        <div className="task-info" style={{ minWidth: 0 }}>
                          <div 
                            className={`task-name font-semibold ${done ? "done line-through text-text-muted" : ""}`} 
                            style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {task.titulo}
                          </div>
                          <div className="task-project" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            🎬 {task.projetos?.titulo || "Firma Abacaxi"}
                          </div>
                        </div>
                      </div>
                      
                      {/* Priority toggle dropdown */}
                      <select
                        value={task.prioridade}
                        onChange={(e) => handleTaskPriorityChange(task.id, e.target.value)}
                        disabled={isSaving}
                        className={`badge badge-${getStatusColor(task.prioridade)}`}
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          outline: 'none',
                          padding: '2px 6px',
                          fontSize: '9px',
                          fontWeight: 700
                        }}
                      >
                        <option value="Urgente">Urgente</option>
                        <option value="Alta">Alta</option>
                        <option value="Média">Média</option>
                        <option value="Normal">Normal</option>
                        <option value="Baixa">Baixa</option>
                      </select>
                    </div>
                  );
                })}
                {tasks.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>Nenhuma tarefa urgente pendente.</div>
                )}
              </div>

              {/* Quick Task Creation form */}
              <form 
                onSubmit={handleAddQuickTask}
                style={{
                  padding: '12px',
                  background: 'var(--surface2)',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)' }}>➕ Adicionar Foco Rápido</div>
                <input
                  type="text"
                  placeholder="Nome do novo foco/tarefa..."
                  value={quickTaskTitle}
                  onChange={(e) => setQuickTaskTitle(e.target.value)}
                  disabled={isAddingTask}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    fontSize: '12px',
                    padding: '6px 10px',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '6px' }}>
                  <select
                    value={quickTaskProjId}
                    onChange={(e) => setQuickTaskProjId(e.target.value)}
                    disabled={isAddingTask}
                    style={{
                      flex: 1,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text)',
                      fontSize: '11px',
                      padding: '4px 6px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Selecione o Projeto...</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.titulo}</option>
                    ))}
                  </select>
                  
                  <select
                    value={quickTaskPriority}
                    onChange={(e) => setQuickTaskPriority(e.target.value)}
                    disabled={isAddingTask}
                    style={{
                      width: '80px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text)',
                      fontSize: '11px',
                      padding: '4px 6px',
                      outline: 'none'
                    }}
                  >
                    <option value="Urgente">🚨 Urg</option>
                    <option value="Alta">🔥 Alt</option>
                    <option value="Normal">⚡ Nor</option>
                  </select>
                  
                  <button
                    type="submit"
                    disabled={isAddingTask || !quickTaskTitle.trim()}
                    className="btn btn-gold"
                    style={{ padding: '4px 12px', fontSize: '11px', fontWeight: 700 }}
                  >
                    + Add
                  </button>
                </div>
              </form>
            </div>

            {/* Financial Health */}
            <div>
              <div className="section-header">
                <h3 className="section-title">Saúde Financeira</h3>
              </div>
              <div className="card border border-border/40 bg-surface/50 backdrop-blur-md p-5">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Entradas Realizadas</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green)' }}>+ {formatCurrency(finance.totalEntradas)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Saídas Estimadas (40%)</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--red)' }}>- {formatCurrency(finance.totalSaidas)}</span>
                </div>
                <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Saldo Estimado</span>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gold)' }}>{formatCurrency(finance.saldoAtual)}</span>
                </div>
                {/* Embedded custom area chart */}
                <FinanceChart data={projects} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
