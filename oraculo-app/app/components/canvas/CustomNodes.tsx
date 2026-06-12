import React from 'react';
import { Handle, Position } from '@xyflow/react';

// Helpers de formatação
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val ?? 0);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR');
};

const getStatusColor = (status: string) => {
  if (['Concluído', 'Finalizado', 'Pago', 'Recebido', 'Aprovada', 'Aprovado', 'Confirmado'].includes(status)) return 'green';
  if (['Em produção', 'Edição', 'Filmagem', 'Trabalhando', 'A fazer', 'Em andamento', 'Em campo'].includes(status)) return 'orange';
  if (['Briefing', 'Proposta', 'Aprovado', 'Pré-produção', 'Pré-filmagem', 'Estimado'].includes(status)) return 'gold';
  if (['Cancelado', 'Cancelada', 'Rejeitada', 'Reprovado', 'Atrasado'].includes(status)) return 'red';
  return 'gray';
};

const getPriorityColor = (priority: string) => {
  if (['Urgente', 'Alta'].includes(priority)) return 'red';
  if (priority === 'Média') return 'gold';
  return 'gray';
};

// 1. NÓ DO PROJETO (NÓ CENTRAL)
export const ProjectNode = ({ data }: any) => {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '2px solid var(--gold)',
      borderRadius: 'var(--radius)',
      padding: '18px',
      color: 'var(--text)',
      width: '320px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
      transition: 'all 0.2s ease-in-out'
    }} className="hover:border-gold-dim">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          🎬 #{String(data.auto_id || 1).padStart(3, '0')} · {data.tipo_projeto || 'Outro'}
        </span>
        {data.prioridade && (
          <span className={`badge badge-${getPriorityColor(data.prioridade)}`} style={{ fontSize: '9px', padding: '1px 6px' }}>
            🔥 {data.prioridade}
          </span>
        )}
      </div>
      
      <div style={{ fontSize: '19px', fontWeight: 850, color: 'var(--gold)', marginBottom: '10px', lineHeight: '1.2', letterSpacing: '-0.3px' }}>
        {data.titulo}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span className={`badge badge-${getStatusColor(data.status)}`}>
          {data.status}
        </span>
        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
          {formatCurrency(data.valor_contrato)}
        </span>
      </div>

      <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border)', paddingTop: '10px', marginBottom: '10px' }}>
        {data.workflow_step && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-dim)' }}>Etapa Workflow:</span>
            <span style={{ fontWeight: 600, color: 'var(--gold)' }}>{data.workflow_step}</span>
          </div>
        )}
        {data.diretor && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-dim)' }}>Direção / Resp.:</span>
            <span style={{ fontWeight: 600 }}>{data.diretor}</span>
          </div>
        )}
        {data.data_entrega && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-dim)' }}>Previsão Entrega:</span>
            <span style={{ fontWeight: 600 }}>{formatDate(data.data_entrega)}</span>
          </div>
        )}
      </div>

      {data.briefing && (
        <details style={{ marginTop: '8px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
          <summary style={{ fontSize: '11px', color: 'var(--gold)', cursor: 'pointer', outline: 'none', userSelect: 'none', fontWeight: 600 }}>
            📝 Ver Briefing Operacional
          </summary>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '6px', lineHeight: 1.5, maxHeight: '80px', overflowY: 'auto' }}>
            {data.briefing}
          </div>
        </details>
      )}

      {data.drive_folder_url && (
        <a 
          href={data.drive_folder_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: '11px',
            padding: '5px 0',
            marginTop: '10px',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 700
          }}
        >
          📂 Abrir Pasta no Google Drive
        </a>
      )}
    </div>
  );
};

// 2. NÓ DO CLIENTE
export const ClientNode = ({ data }: any) => {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderLeft: '4px solid var(--blue)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      color: 'var(--text)',
      width: '280px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
    }}>
      <Handle type="source" position={Position.Right} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          🏢 Cliente & Cadastro
        </span>
        {data.segmento && (
          <span className="badge badge-blue" style={{ fontSize: '9px', padding: '1px 6px' }}>
            {data.segmento}
          </span>
        )}
      </div>

      <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px', color: 'var(--text)' }}>
        {data.nome}
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '8px' }}>
        🏢 <b>Razão Social:</b> {data.empresa}
      </div>

      <div style={{ fontSize: '11px', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '3px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
        {data.email && <div>✉️ {data.email}</div>}
        {data.telefone && <div>📞 {data.telefone}</div>}
        {data.cnpj_cpf && <div>📄 CNPJ/CPF: {data.cnpj_cpf}</div>}
        {data.endereco && <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>📍 {data.endereco}</div>}
      </div>

      {data.nps && data.nps !== '—' && (
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
          <span style={{ color: 'var(--text-muted)' }}>NPS Satisfação:</span>
          <span className={`badge badge-${data.nps === 'Alto' ? 'green' : data.nps === 'Médio' ? 'gold' : 'red'}`} style={{ fontSize: '9px' }}>
            {data.nps}
          </span>
        </div>
      )}
    </div>
  );
};

// 3. NÓ DE TAREFAS
export const TasksNode = ({ data }: any) => {
  const tasks = data.tasks || [];
  
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderTop: '3px solid var(--orange)',
      borderRadius: 'var(--radius)',
      padding: '14px',
      color: 'var(--text)',
      width: '280px',
      maxHeight: '340px',
      overflowY: 'auto',
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
    }} className="custom-scrollbar">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
          ✅ Checklist Operacional
        </span>
        <button 
          onClick={data.onAddTask}
          className="btn btn-ghost"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--gold)',
            cursor: 'pointer',
            fontSize: '13px',
            padding: '2px 6px',
            borderRadius: '4px'
          }}
          title="Nova Tarefa"
        >
          ➕ Nova
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tasks.map((task: any) => {
          const done = task.status === 'Concluída';
          return (
            <div 
              key={task.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '8px', 
                fontSize: '12px',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                paddingBottom: '6px'
              }}
            >
              <input 
                type="checkbox" 
                checked={done}
                onChange={() => data.onToggleTask(task.id, task.status)}
                style={{ marginTop: '3px', cursor: 'pointer' }}
              />
              <div style={{ flex: 1, textDecoration: done ? 'line-through' : 'none', color: done ? 'var(--text-muted)' : 'var(--text)' }}>
                <div style={{ fontWeight: 600 }}>{task.titulo}</div>
                
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <span className={`badge badge-${getPriorityColor(task.prioridade)}`} style={{ fontSize: '8px', padding: '0px 4px' }}>
                    {task.prioridade}
                  </span>
                  {task.responsavel && task.responsavel !== '--' && (
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                      👤 {task.responsavel}
                    </span>
                  )}
                  {task.data_limite && (
                    <span style={{ fontSize: '9px', color: 'var(--text-dim)' }}>
                      📅 {formatDate(task.data_limite)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>
            Nenhuma tarefa pendente.
          </div>
        )}
      </div>
    </div>
  );
};

// 4. NÓ DE MÍDIA DO DRIVE (POLAROID)
export const MediaNode = ({ data }: any) => {
  const isImage = data.type === 'image';
  
  return (
    <div style={{
      background: '#ffffff',
      padding: '8px 8px 16px 8px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
      width: '180px',
      borderRadius: '2px',
      transform: `rotate(${(data.id.charCodeAt(0) % 6) - 3}deg)`,
      cursor: 'pointer',
      color: '#000000',
      transition: 'transform 0.15s ease'
    }} className="hover:scale-[1.05] hover:rotate-0">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {isImage && data.thumbnailUrl ? (
        <div style={{
          width: '164px',
          height: '120px',
          background: '#0f0d0b',
          overflow: 'hidden',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '1px'
        }}>
          <img 
            src={data.thumbnailUrl} 
            alt={data.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onClick={() => data.onPreview(data)}
          />
        </div>
      ) : (
        <div style={{
          width: '164px',
          height: '100px',
          background: '#f1f1f1',
          border: '1px dashed #cccccc',
          marginBottom: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          borderRadius: '1px'
        }}>
          {data.type === 'video' ? '🎥' : data.type === 'pdf' ? '📄' : '📁'}
          <span style={{ fontSize: '9px', color: '#666666', marginTop: '4px', fontWeight: 600 }}>
            {String(data.mimeType || '').split('/').pop()?.toUpperCase()}
          </span>
        </div>
      )}

      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '11px',
        fontWeight: 600,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: '0 2px',
        color: '#222'
      }} title={data.name}>
        {data.name}
      </div>
      <div style={{ fontSize: '8px', color: '#888', textAlign: 'center', marginTop: '2px' }}>
        📂 Google Drive
      </div>
    </div>
  );
};

// 5. NÓ DE DOCUMENTOS DO CÉREBRO (OBSIDIAN)
export const DocNode = ({ data }: any) => {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderLeft: '4px solid var(--gold)',
      borderRadius: 'var(--radius)',
      padding: '12px',
      color: 'var(--text)',
      width: '200px',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      transition: 'border-color 0.2s'
    }} onClick={() => data.onEdit(data)} className="hover:border-gold">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
        🧠 Cérebro (Obsidian)
      </div>
      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
        📖 {data.name}.md
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {data.content?.replace(/[\#\*\_]/g, '').substring(0, 40) || 'Clique para escrever...'}
      </div>
    </div>
  );
};

// 6. NÓ DE ESTUDO VISUAL (IA / GERAÇÃO)
export const AIStudyNode = ({ data }: any) => {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px dashed var(--gold)',
      borderRadius: 'var(--radius)',
      padding: '14px',
      color: 'var(--text)',
      width: '240px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    }}>
      <Handle type="target" position={Position.Left} />
      
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
        ✨ Estúdio Visual IA
      </div>
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gold)', marginBottom: '8px' }}>
        Geração de Cenas & Conceitos
      </div>

      <textarea 
        value={data.prompt || ''} 
        onChange={(e) => data.onChangePrompt(e.target.value)}
        placeholder="Descreva a cena, figurino ou objeto..."
        style={{
          width: '100%',
          height: '60px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '6px',
          color: 'var(--text)',
          fontSize: '11px',
          resize: 'none',
          marginBottom: '8px',
          outline: 'none'
        }}
      />

      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
        {['Personagem', 'Locação', 'Objeto'].map(type => (
          <button 
            key={type}
            onClick={() => data.onChangeStudyType(type)}
            style={{
              flex: 1,
              background: data.studyType === type ? 'var(--gold)' : 'var(--surface2)',
              color: data.studyType === type ? '#000' : 'var(--text-dim)',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 0',
              fontSize: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.15s'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <button 
        onClick={data.onGenerate}
        disabled={data.isGenerating}
        style={{
          width: '100%',
          background: 'var(--gold)',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          padding: '6px 0',
          fontSize: '11px',
          fontWeight: 700,
          cursor: data.isGenerating ? 'not-allowed' : 'pointer',
          opacity: data.isGenerating ? 0.6 : 1,
          transition: 'all 0.15s'
        }}
        className="hover:scale-[1.02]"
      >
        {data.isGenerating ? 'Gerando Imagem...' : '🎨 Gerar Estudo de Arte'}
      </button>
    </div>
  );
};

// 7. NÓ DE ORÇAMENTO (BUDGET RELACIONAL)
export const BudgetNode = ({ data }: any) => {
  const items = data.items || [];
  const totalOrcado = data.totalOrcado || 0;
  const totalReal = data.totalReal || 0;
  const variancia = totalOrcado - totalReal;

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderTop: '3px solid var(--green)',
      borderRadius: 'var(--radius)',
      padding: '14px',
      color: 'var(--text)',
      width: '300px',
      maxHeight: '340px',
      overflowY: 'auto',
      boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
    }} className="custom-scrollbar">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 700 }}>
        💰 Orçamento & Variância
      </div>

      {/* KPI interno do orçamento */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'var(--surface2)', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
          <span style={{ color: 'var(--text-dim)' }}>Total Orçado:</span>
          <span style={{ fontWeight: 700 }}>{formatCurrency(totalOrcado)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
          <span style={{ color: 'var(--text-dim)' }}>Gasto Real (Actual):</span>
          <span style={{ fontWeight: 700, color: 'var(--orange)' }}>{formatCurrency(totalReal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderTop: '1px solid var(--border)', paddingTop: '4px', marginTop: '4px' }}>
          <span style={{ color: 'var(--text-dim)' }}>Variância:</span>
          <span style={{ fontWeight: 800, color: variancia >= 0 ? 'var(--green)' : 'var(--red)' }}>
            {variancia >= 0 ? '+' : ''}{formatCurrency(variancia)}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((it: any) => (
          <div key={it.id} style={{ fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>{it.item}</span>
              <span style={{ color: 'var(--gold)' }}>{formatCurrency(it.total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>
              <span>{it.categoria} · {it.tipo}</span>
              {it.valor_real > 0 && (
                <span style={{ color: it.variancia >= 0 ? 'var(--green)' : 'var(--red)' }}>
                  Real: {formatCurrency(it.valor_real)}
                </span>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>
            Nenhum item orçado.
          </div>
        )}
      </div>
    </div>
  );
};

// 8. NÓ DE FILMAGEM (CRONOGRAMA DE DIAS)
export const ShootNode = ({ data }: any) => {
  const filmagens = data.filmagens || [];

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderTop: '3px solid var(--gold)',
      borderRadius: 'var(--radius)',
      padding: '14px',
      color: 'var(--text)',
      width: '280px',
      maxHeight: '320px',
      overflowY: 'auto',
      boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
    }} className="custom-scrollbar">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: 700 }}>
        🎥 Cronograma de Filmagens
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filmagens.map((flm: any) => (
          <div key={flm.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                {flm.nome}
              </span>
              <span className={`badge badge-${getStatusColor(flm.status)}`} style={{ fontSize: '8px', padding: '0px 4px' }}>
                {flm.status}
              </span>
            </div>
            
            <div style={{ fontSize: '10px', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {flm.data && <div>📅 <b>Data:</b> {formatDate(flm.data)}</div>}
              {flm.local && <div>📍 <b>Local:</b> {flm.local}</div>}
              {flm.equipamentos && <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>⚙️ <b>Equips:</b> {flm.equipamentos}</div>}
            </div>
          </div>
        ))}
        {filmagens.length === 0 && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>
            Nenhuma gravação agendada.
          </div>
        )}
      </div>
    </div>
  );
};

// 9. NÓ DE EDIÇÃO (PÓS-PRODUÇÃO)
export const EditNode = ({ data }: any) => {
  const edicoes = data.edicoes || [];

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderTop: '3px solid var(--purple)',
      borderRadius: 'var(--radius)',
      padding: '14px',
      color: 'var(--text)',
      width: '280px',
      maxHeight: '320px',
      overflowY: 'auto',
      boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
    }} className="custom-scrollbar">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: 700 }}>
        ✂️ Fluxo de Pós-Produção
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {edicoes.map((edi: any) => (
          <div key={edi.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                {edi.nome}
              </span>
              <span className={`badge badge-${getStatusColor(edi.status)}`} style={{ fontSize: '8px', padding: '0px 4px' }}>
                {edi.status}
              </span>
            </div>

            <div style={{ fontSize: '10px', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
              {edi.etapa && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Corte/Etapa:</span>
                  <span style={{ fontWeight: 600, color: 'var(--gold)' }}>{edi.etapa}</span>
                </div>
              )}
              {edi.editor && <div>👤 <b>Editor:</b> {edi.editor}</div>}
              {edi.software && <div>💻 <b>Software:</b> {edi.software}</div>}
              {edi.aprova_status && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                  <span>Aprovação:</span>
                  <span className={`badge badge-${getStatusColor(edi.aprova_status)}`} style={{ fontSize: '8px', padding: '0px 4px' }}>
                    {edi.aprova_status}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        {edicoes.length === 0 && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>
            Nenhuma edição em andamento.
          </div>
        )}
      </div>
    </div>
  );
};

// 10. NÓ DE TRANSAÇÕES FINANCEIRAS (TRANS-RELACIONAL)
export const TransactionNode = ({ data }: any) => {
  const transacoes = data.transacoes || [];

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderTop: '3px solid var(--red)',
      borderRadius: 'var(--radius)',
      padding: '14px',
      color: 'var(--text)',
      width: '280px',
      maxHeight: '320px',
      overflowY: 'auto',
      boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
    }} className="custom-scrollbar">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: 700 }}>
        💳 Transações Financeiras (Real)
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {transacoes.map((trans: any) => {
          const isReceita = trans.tipo === 'Receita' || trans.tipo === 'Entrada';
          return (
            <div key={trans.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                  {trans.descricao}
                </span>
                <span style={{ fontWeight: 700, color: isReceita ? 'var(--green)' : 'var(--red)', fontSize: '11px' }}>
                  {isReceita ? '+' : '-'}{formatCurrency(trans.valor)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span>{trans.categoria} · {formatDate(trans.data)}</span>
                <span className={`badge badge-${getStatusColor(trans.status)}`} style={{ fontSize: '7px', padding: '0px 3px' }}>
                  {trans.status}
                </span>
              </div>
            </div>
          );
        })}
        {transacoes.length === 0 && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>
            Nenhuma movimentação real lançada.
          </div>
        )}
      </div>
    </div>
  );
};
