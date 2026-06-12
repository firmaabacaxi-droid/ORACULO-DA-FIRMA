"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
  Connection,
  Edge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  ProjectNode,
  ClientNode,
  TasksNode,
  MediaNode,
  DocNode,
  AIStudyNode,
  BudgetNode,
  ShootNode,
  EditNode,
  TransactionNode
} from './CustomNodes';

import OraculoPanel from './OraculoPanel';
import MarkdownEditorPanel from './MarkdownEditorPanel';

// Register node types
const nodeTypes = {
  project: ProjectNode,
  client: ClientNode,
  tasks: TasksNode,
  media: MediaNode,
  doc: DocNode,
  aiStudy: AIStudyNode,
  budget: BudgetNode,
  shoot: ShootNode,
  edit: EditNode,
  transaction: TransactionNode
};

interface CanvasContainerProps {
  project: any;
  initialTasks: any[];
  orcamento: any;
  orcamentoItens?: any[];
  filmagens?: any[];
  edicoes?: any[];
  transacoes?: any[];
}

export default function CanvasContainer({
  project,
  initialTasks,
  orcamento,
  orcamentoItens = [],
  filmagens = [],
  edicoes = [],
  transacoes = []
}: CanvasContainerProps) {
  // Nodes and Edges State
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Data States
  const [tasks, setTasks] = useState<any[]>(initialTasks);
  const [driveFiles, setDriveFiles] = useState<any[]>([]);
  const [cerebroFiles, setCerebroFiles] = useState<any[]>([]);
  const [savedLayout, setSavedLayout] = useState<any>(null);
  const [layoutLoaded, setLayoutLoaded] = useState(false);

  // Active Markdown Note for the Editor
  const [activeNote, setActiveNote] = useState<any | null>(null);

  // AI Study Node state inside Canvas
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStudyType, setAiStudyType] = useState('Personagem');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Drag and drop overlay state
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Preview Image lightbox state
  const [previewMedia, setPreviewMedia] = useState<any | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Extract folder ID helper
  const extractFolderId = (url: string): string | null => {
    if (!url) return null;
    if (/^[a-zA-Z0-9-_]{25,45}$/.test(url.trim())) {
      return url.trim();
    }
    const match = url.match(/folders\/([a-zA-Z0-9-_]+)/) || url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  };

  const folderId = extractFolderId(project.drive_folder_url);

  // 1. Fetch Drive Files
  const fetchDriveFiles = useCallback(async () => {
    if (!folderId) return;
    try {
      const res = await fetch(`/api/drive?folderId=${folderId}`);
      if (res.ok) {
        const data = await res.json();
        setDriveFiles(data.files || []);
      }
    } catch (e) {
      console.error('Erro ao buscar arquivos do Drive:', e);
    }
  }, [folderId]);

  // 2. Fetch Cérebro layout & files
  const fetchCerebroData = useCallback(async () => {
    try {
      const res = await fetch(`/api/cerebro?projectNumber=${project.auto_id}&projectTitle=${project.titulo}`);
      if (res.ok) {
        const data = await res.json();
        setCerebroFiles(data.notes || []);
        setSavedLayout(data.layout || null);
      }
    } catch (e) {
      console.error('Erro ao buscar dados do Cérebro:', e);
    }
  }, [project.auto_id, project.titulo]);

  // 3. Save Layout back to Cérebro
  const saveLayout = useCallback(async (currentNodes: Node[], currentEdges: Edge[]) => {
    try {
      // Save node positions and labels to canvas-layout.json in Cérebro
      const cleanNodes = currentNodes.map(n => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: {
          id: n.data.id,
          name: n.data.name,
          type: n.data.type,
          mimeType: n.data.mimeType,
          thumbnailUrl: n.data.thumbnailUrl
        }
      }));

      const cleanEdges = currentEdges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label
      }));

      await fetch('/api/cerebro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectNumber: project.auto_id,
          projectTitle: project.titulo,
          layout: { nodes: cleanNodes, edges: cleanEdges }
        })
      });
    } catch (e) {
      console.error('Erro ao salvar layout:', e);
    }
  }, [project.auto_id, project.titulo]);

  // 4. Notion Tasks management
  const handleToggleTask = async (taskId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Concluída' ? 'A fazer' : 'Concluída';
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
        // Update state locally
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus } : t));
      }
    } catch (e) {
      console.error('Erro ao alternar status da tarefa:', e);
    }
  };

  const handleAddTask = async () => {
    const title = prompt('Qual o título da nova tarefa?');
    if (!title) return;

    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createTask',
          projectId: project.id,
          titulo: title,
          prioridade: 'Média'
        })
      });

      if (res.ok) {
        // Reload tasks from the server or fetch them again
        const data = await res.json();
        if (data.result) {
          // Push new task locally
          const newTask = {
            id: data.result.id,
            titulo: title,
            status: 'A fazer',
            prioridade: 'Média',
            data_limite: null
          };
          setTasks(prev => [...prev, newTask]);
        }
      }
    } catch (e) {
      console.error('Erro ao adicionar tarefa:', e);
    }
  };

  // 5. Cérebro Notes Save/Edit
  const handleSaveNote = async (fileName: string, content: string) => {
    try {
      const res = await fetch('/api/cerebro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectNumber: project.auto_id,
          projectTitle: project.titulo,
          fileName,
          content
        })
      });

      if (res.ok) {
        // Refresh local files list
        const updatedFiles = cerebroFiles.map(f => f.name === fileName ? { ...f, content } : f);
        setCerebroFiles(updatedFiles);
        
        // Update active note in editor
        if (activeNote && activeNote.name === fileName) {
          setActiveNote({ ...activeNote, content });
        }
      }
    } catch (e) {
      console.error('Erro ao salvar nota:', e);
    }
  };

  // 6. Create a New Cérebro Obsidian file
  const handleCreateNote = async () => {
    const title = prompt('Qual o nome do novo documento markdown (sem .md)?');
    if (!title) return;

    const defaultContent = `# ${title}\n\nDocumentação criada em ${new Date().toLocaleDateString('pt-BR')}.\n`;
    try {
      await handleSaveNote(title, defaultContent);
      // Add node to state
      const newNote = { name: title, fileName: `${title}.md`, content: defaultContent };
      setCerebroFiles(prev => [...prev, newNote]);
    } catch (e) {
      console.error('Erro ao criar nota:', e);
    }
  };

  // 7. AI Visual Sandbox generator
  const handleGenerateImage = async () => {
    if (!aiPrompt.trim()) {
      alert('Por favor, descreva a imagem no prompt do card de IA.');
      return;
    }

    setIsGeneratingImage(true);
    try {
      const res = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          studyType: aiStudyType,
          folderId: folderId,
          projectContext: {
            id: project.id,
            auto_id: project.auto_id,
            titulo: project.titulo,
            driveFolderUrl: project.drive_folder_url,
            driveFolderId: folderId
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          // Success! Image uploaded to Drive.
          setAiPrompt('');
          // Refresh drive files list
          await fetchDriveFiles();
        }
      } else {
        throw new Error('Geração de imagem falhou');
      }
    } catch (err: any) {
      console.error(err);
      alert('Erro na geração da imagem. Detalhes: ' + err.message);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Connect edges
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: 'var(--gold)' },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--gold)' }
    }, eds));
  }, [setEdges]);

  // Handle Drag / Drop of files
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    if (!folderId) {
      alert('Este projeto não possui uma pasta do Google Drive vinculada para uploads.');
      return;
    }

    setUploadingFile(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Form Data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderId', folderId);

        // Check if audio file for Whisper transcription
        if (file.type.startsWith('audio/')) {
          // Save audio and transcribe
          const whisperRes = await fetch('/api/chat/voice', {
            method: 'POST',
            body: formData
          });

          if (whisperRes.ok) {
            const voiceData = await whisperRes.json();
            if (voiceData.text) {
              // Create markdown file in Cérebro
              const safeName = `reuniao-${new Date().toISOString().slice(0, 10)}-${file.name.split('.')[0]}`;
              const markdownContent = `# Transcrição de Reunião\n**Data:** ${new Date().toLocaleString('pt-BR')}\n**Arquivo:** ${file.name}\n\n## Transcrição:\n${voiceData.text}\n`;
              await handleSaveNote(safeName, markdownContent);
            }
          }
        } else {
          // Standard upload to Google Drive
          const driveRes = await fetch('/api/drive', {
            method: 'POST',
            body: formData
          });

          if (!driveRes.ok) {
            throw new Error(`Upload de ${file.name} falhou`);
          }
        }
      }

      // Refresh lists
      await fetchDriveFiles();
      await fetchCerebroData();
    } catch (err: any) {
      console.error(err);
      alert('Erro ao processar arquivo solto: ' + err.message);
    } finally {
      setUploadingFile(false);
    }
  };

  // Compile full canvas nodes and edges
  const assembleCanvas = useCallback(() => {

    // Map active project details
    const projectData = {
      id: project.id,
      titulo: project.titulo,
      auto_id: project.auto_id,
      tipo_projeto: project.tipo_projeto,
      status: project.status,
      valor_contrato: project.valor_contrato,
      data_entrega: project.data_entrega
    };

    // Client details
    const clientData = project.clientes ? {
      id: project.clientes.id,
      nome: project.clientes.nome,
      empresa: project.clientes.empresa,
      email: project.clientes.email
    } : null;

    // Create Initial nodes with layout configurations
    const freshNodes: Node[] = [];
    const freshEdges: Edge[] = [];

    const getSavedPosition = (id: string, defaultX: number, defaultY: number) => {
      if (savedLayout && savedLayout.nodes) {
        const found = savedLayout.nodes.find((n: any) => n.id === id);
        if (found && found.position) {
          return found.position;
        }
      }
      return { x: defaultX, y: defaultY };
    };

    // Project Node (Central)
    freshNodes.push({
      id: 'node-project',
      type: 'project',
      position: getSavedPosition('node-project', 250, 250),
      data: projectData
    });

    // Client Node
    if (clientData) {
      freshNodes.push({
        id: 'node-client',
        type: 'client',
        position: getSavedPosition('node-client', -50, 250),
        data: clientData
      });
      
      freshEdges.push({
        id: 'edge-client-project',
        source: 'node-client',
        target: 'node-project',
        animated: true,
        style: { stroke: 'var(--blue)' }
      });
    }

    // Tasks Node
    freshNodes.push({
      id: 'node-tasks',
      type: 'tasks',
      position: getSavedPosition('node-tasks', 600, 150),
      data: {
        tasks,
        onToggleTask: handleToggleTask,
        onAddTask: handleAddTask
      }
    });

    freshEdges.push({
      id: 'edge-project-tasks',
      source: 'node-project',
      target: 'node-tasks',
      animated: true,
      style: { stroke: 'var(--orange)' }
    });

    // 1. Budget Node 💰
    const totalOrcado = orcamento?.valor_total || orcamentoItens.reduce((acc: number, it: any) => acc + (it.total || 0), 0);
    const totalRealBudget = orcamentoItens.reduce((acc: number, it: any) => acc + (it.valor_real || 0), 0);
    freshNodes.push({
      id: 'node-budget',
      type: 'budget',
      position: getSavedPosition('node-budget', 600, -150),
      data: {
        items: orcamentoItens,
        totalOrcado,
        totalReal: totalRealBudget
      }
    });

    freshEdges.push({
      id: 'edge-project-budget',
      source: 'node-project',
      target: 'node-budget',
      animated: true,
      style: { stroke: 'var(--green)' }
    });

    // 2. Transaction Node 💳
    freshNodes.push({
      id: 'node-transactions',
      type: 'transaction',
      position: getSavedPosition('node-transactions', 920, -150),
      data: {
        transacoes
      }
    });

    freshEdges.push({
      id: 'edge-budget-transactions',
      source: 'node-budget',
      target: 'node-transactions',
      animated: true,
      style: { stroke: 'var(--red)' }
    });

    // 3. Shoot Node 🎬 (Cronograma)
    freshNodes.push({
      id: 'node-shoots',
      type: 'shoot',
      position: getSavedPosition('node-shoots', 600, 50),
      data: {
        filmagens
      }
    });

    freshEdges.push({
      id: 'edge-project-shoots',
      source: 'node-project',
      target: 'node-shoots',
      animated: true,
      style: { stroke: 'var(--gold)' }
    });

    // 4. Edit Node ✂️ (Pós-Produção)
    freshNodes.push({
      id: 'node-edits',
      type: 'edit',
      position: getSavedPosition('node-edits', 920, 50),
      data: {
        edicoes
      }
    });

    freshEdges.push({
      id: 'edge-shoots-edits',
      source: 'node-shoots',
      target: 'node-edits',
      animated: true,
      style: { stroke: 'var(--purple)' }
    });

    // AI Study Node
    freshNodes.push({
      id: 'node-ai-study',
      type: 'aiStudy',
      position: getSavedPosition('node-ai-study', 250, 550),
      data: {
        prompt: aiPrompt,
        studyType: aiStudyType,
        isGenerating: isGeneratingImage,
        onChangePrompt: (val: string) => setAiPrompt(val),
        onChangeStudyType: (val: string) => setAiStudyType(val),
        onGenerate: handleGenerateImage
      }
    });

    freshEdges.push({
      id: 'edge-project-ai-study',
      source: 'node-project',
      target: 'node-ai-study',
      animated: true,
      style: { stroke: 'var(--gold)' }
    });

    // Cérebro Docs Nodes
    cerebroFiles.forEach((file: any, index: number) => {
      const nodeId = `node-doc-${file.name}`;
      freshNodes.push({
        id: nodeId,
        type: 'doc',
        position: getSavedPosition(nodeId, -50, 400 + (index * 90)),
        data: {
          name: file.name,
          content: file.content,
          onEdit: (data: any) => {
            const foundFile = cerebroFiles.find(f => f.name === data.name);
            setActiveNote(foundFile || null);
          }
        }
      });

      freshEdges.push({
        id: `edge-doc-${file.name}`,
        source: nodeId,
        target: 'node-project',
        style: { stroke: 'var(--gold)' }
      });
    });

    // Drive Media Nodes
    driveFiles.forEach((file: any, index: number) => {
      const nodeId = `node-media-${file.id}`;
      const isImg = file.mimeType?.startsWith('image/');
      freshNodes.push({
        id: nodeId,
        type: 'media',
        position: getSavedPosition(nodeId, 650, 480 + (index * 190)),
        data: {
          id: file.id,
          name: file.name,
          type: isImg ? 'image' : 'file',
          mimeType: file.mimeType,
          thumbnailUrl: file.thumbnailLink,
          onPreview: (data: any) => {
            setPreviewMedia(file);
          }
        }
      });

      freshEdges.push({
        id: `edge-project-media-${file.id}`,
        source: 'node-project',
        target: nodeId,
        style: { stroke: 'var(--border)' }
      });
    });

    // Add any saved custom edges that are not default
    if (savedLayout && savedLayout.edges) {
      savedLayout.edges.forEach((edge: any) => {
        // Only push custom edges if they don't already exist
        const exists = freshEdges.some(e => e.id === edge.id || (e.source === edge.source && e.target === edge.target));
        if (!exists) {
          freshEdges.push({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            label: edge.label,
            animated: true,
            style: { stroke: 'var(--gold)' },
            markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--gold)' }
          });
        }
      });
    }

    setNodes(freshNodes);
    setEdges(freshEdges);
    setLayoutLoaded(true);
  }, [project, tasks, driveFiles, cerebroFiles, savedLayout, aiPrompt, aiStudyType, isGeneratingImage, orcamento, orcamentoItens, filmagens, edicoes, transacoes]);

  // On mount: fetch resources
  useEffect(() => {
    const init = async () => {
      await fetchDriveFiles();
      await fetchCerebroData();
    };
    init();
  }, [fetchDriveFiles, fetchCerebroData]);

  // Sync canvas nodes when components change
  useEffect(() => {
    assembleCanvas();
  }, [assembleCanvas]);

  // Auto-save layout on node drag stop
  const onNodeDragStop = () => {
    saveLayout(nodes, edges);
  };

  const handleSaveCanvasManual = () => {
    saveLayout(nodes, edges);
    alert('Conexões e posições salvas com sucesso em canvas-layout.json!');
  };

  const handleRefreshAll = async () => {
    await fetchDriveFiles();
    await fetchCerebroData();
  };

  return (
    <div 
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#0f0d0b',
        outline: 'none'
      }}
    >
      {/* Markdown Side Panel (Left) */}
      {activeNote && (
        <MarkdownEditorPanel
          note={activeNote}
          onSave={handleSaveNote}
          onClose={() => setActiveNote(null)}
        />
      )}

      {/* Main Flow Canvas Area */}
      <div style={{ flex: 1, height: '100%', position: 'relative' }}>
        {uploadingFile && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15,13,11,0.85)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>📤</div>
            <div style={{ fontWeight: 800 }}>Enviando e Transcrevendo Mídias...</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Salvando arquivos no Cérebro e no Drive</div>
          </div>
        )}

        {isDraggingFile && (
          <div style={{
            position: 'absolute',
            inset: 20,
            border: '3px dashed var(--gold)',
            borderRadius: '12px',
            background: 'rgba(212,154,106,0.08)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold)',
            pointerEvents: 'none'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗂️</div>
            <div style={{ fontWeight: 800, fontSize: '20px' }}>Solte para importar no Oráculo Canvas</div>
            <div style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '4px' }}>
              Imagens vão pro Drive · Áudios de reunião são transcritos no Cérebro
            </div>
          </div>
        )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeDragStop={onNodeDragStop}
          fitView
        >
          <Background color="rgba(212, 154, 106, 0.15)" gap={16} size={1} />
          
          <Controls style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            boxShadow: 'none'
          }} className="react-flow-controls-custom" />

          {/* Floating Workspace Panels */}
          <Panel position="top-left" style={{
            background: 'rgba(26,22,20,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border)',
            padding: '8px 12px',
            borderRadius: '6px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <button 
              onClick={handleSaveCanvasManual} 
              className="btn btn-gold"
              style={{ fontSize: '11px', padding: '4px 10px' }}
            >
              💾 Salvar Layout
            </button>
            <button 
              onClick={handleCreateNote} 
              className="btn btn-ghost"
              style={{ fontSize: '11px', padding: '4px 10px' }}
            >
              📝 Nova Nota (.md)
            </button>
            <button 
              onClick={handleRefreshAll} 
              className="btn btn-ghost"
              style={{ fontSize: '11px', padding: '4px 10px' }}
            >
              🔄 Sincronizar
            </button>
          </Panel>

          <Panel position="top-right" style={{
            background: 'rgba(26,22,20,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border)',
            padding: '8px 12px',
            borderRadius: '6px',
            color: 'var(--text-dim)',
            fontSize: '11px'
          }}>
            Estúdio de Criação · 🎬 <b>{project.titulo}</b>
          </Panel>
        </ReactFlow>
      </div>

      {/* Oráculo Chat Side Panel (Right) */}
      <OraculoPanel
        projectContext={{
          id: project.id,
          auto_id: project.auto_id,
          titulo: project.titulo,
          driveFolderUrl: project.drive_folder_url,
          driveFolderId: folderId
        }}
        onRefreshCanvas={handleRefreshAll}
      />

      {/* Image Preview Lightbox */}
      {previewMedia && (
        <div 
          onClick={() => setPreviewMedia(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '85%', maxHeight: '85%' }}>
            <img 
              src={previewMedia.webContentLink || previewMedia.thumbnailLink?.replace('=s220', '')} 
              alt={previewMedia.name} 
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', border: '8px solid #fff', borderRadius: '4px' }}
            />
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '4px',
              marginTop: '12px',
              textAlign: 'center',
              fontFamily: 'serif'
            }}>
              {previewMedia.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
