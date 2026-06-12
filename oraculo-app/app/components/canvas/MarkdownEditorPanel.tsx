"use client";

import React, { useState, useEffect } from 'react';

interface MarkdownEditorPanelProps {
  note: { name: string; fileName: string; content: string } | null;
  onSave: (fileName: string, content: string) => Promise<void>;
  onClose: () => void;
}

export default function MarkdownEditorPanel({ note, onSave, onClose }: MarkdownEditorPanelProps) {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split');

  useEffect(() => {
    if (note) {
      setContent(note.content || '');
    }
  }, [note]);

  if (!note) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(note.name, content);
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
      alert('Erro ao salvar nota.');
    } finally {
      setIsSaving(false);
    }
  };

  // Renderização muito básica de Markdown para o Preview
  const renderSimpleMarkdown = (text: string) => {
    if (!text) return <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Nota vazia. Comece a digitar...</p>;
    
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} style={{ height: '8px' }} />;
      
      if (line.startsWith('# ')) {
        return <h1 key={idx} style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gold)', margin: '16px 0 8px' }}>{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} style={{ fontSize: '17px', fontWeight: 700, color: 'var(--gold)', margin: '14px 0 6px' }}>{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)', margin: '12px 0 4px' }}>{line.substring(4)}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <div key={idx} style={{ display: 'flex', gap: '8px', paddingLeft: '8px', margin: '4px 0', color: 'var(--text-dim)' }}>
            <span style={{ color: 'var(--gold)' }}>•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      if (line.startsWith('[ ] ')) {
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0', color: 'var(--text-dim)' }}>
            <span style={{ color: 'var(--gold)' }}>☐</span>
            <span>{line.substring(4)}</span>
          </div>
        );
      }
      if (line.startsWith('[x] ')) {
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
            <span style={{ color: 'var(--green)' }}>☑</span>
            <span>{line.substring(4)}</span>
          </div>
        );
      }
      
      return <p key={idx} style={{ margin: '6px 0', lineHeight: 1.6, color: 'var(--text-dim)' }}>{line}</p>;
    });
  };

  return (
    <div style={{
      width: '450px',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🧠</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text)' }}>
              {note.name}.md
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Cérebro Obsidian
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ✕
        </button>
      </div>

      {/* Toolbar */}
      <div style={{
        padding: '8px 16px',
        background: 'var(--surface2)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['edit', 'preview', 'split'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                background: viewMode === mode ? 'var(--border)' : 'transparent',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '11px',
                color: viewMode === mode ? 'var(--gold)' : 'var(--text-dim)',
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}
            >
              {mode === 'edit' ? 'Editar' : mode === 'preview' ? 'Preview' : 'Dividido'}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn btn-gold"
          style={{ padding: '4px 12px', fontSize: '11px' }}
        >
          {isSaving ? 'Salvando...' : '💾 Salvar'}
        </button>
      </div>

      {/* Editor/Preview Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="custom-scrollbar"
            style={{
              flex: 1,
              height: '100%',
              background: '#0a0908',
              border: 'none',
              padding: '16px',
              color: 'var(--text)',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '13px',
              lineHeight: 1.5,
              resize: 'none',
              outline: 'none',
              borderRight: viewMode === 'split' ? '1px solid var(--border)' : 'none'
            }}
            placeholder="Escreva sua decupagem, roteiro ou anotações em Markdown..."
          />
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div 
            className="custom-scrollbar"
            style={{
              flex: 1,
              height: '100%',
              padding: '20px',
              overflowY: 'auto',
              background: '#0d0b09'
            }}
          >
            {renderSimpleMarkdown(content)}
          </div>
        )}
      </div>
    </div>
  );
}
