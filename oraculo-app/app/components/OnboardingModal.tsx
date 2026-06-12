"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ClientShort {
  id: string;
  nome: string;
  empresa: string;
}

interface OnboardingModalProps {
  clientes: ClientShort[];
  onClose: () => void;
}

export default function OnboardingModal({ clientes, onClose }: OnboardingModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [projectType, setProjectType] = useState('Vídeo Institucional');
  const [clientId, setClientId] = useState('');
  const [contractValue, setContractValue] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, informe o título da obra.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: title,
          clienteId: clientId || undefined,
          tipoProjeto: projectType,
          dataEntrega: deliveryDate || undefined,
          valorContrato: contractValue ? Number(contractValue) : undefined
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro no onboarding');
      }

      const data = await res.json();
      if (data.success && data.projectId) {
        // Redireciona diretamente para o novo Canvas do projeto
        router.push(`/projetos/${data.projectId}`);
        onClose();
      } else {
        throw new Error('Retorno inválido do servidor');
      }
    } catch (err: any) {
      console.error(err);
      alert('Erro ao criar projeto: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,13,11,0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '2px solid var(--border)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
        padding: '28px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        {isLoading && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(26,22,20,0.95)',
            borderRadius: '6px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🧬</div>
            <div style={{ fontWeight: 800 }}>Tecendo Nova Obra...</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
              Criando Notion, Google Drive e arquivos no Cérebro
            </div>
          </div>
        )}

        {/* Title */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.5px' }}>
            🎬 Nova Obra Audiovisual
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '4px' }}>
            Onboarding automático: Notion + Drive + Cérebro local
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Título */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
              Título da Obra *
            </label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Documentário Mãos de Barro"
              required
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '10px 12px',
                fontSize: '13px',
                color: 'var(--text)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Tipo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
                Tipo de Projeto *
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: 'var(--text)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Vídeo Institucional">Vídeo Institucional</option>
                <option value="Documentário">Documentário</option>
                <option value="Vídeo Comercial">Vídeo Comercial</option>
                <option value="Redes Sociais">Redes Sociais</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Valor do Contrato */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
                Valor do Contrato (R$)
              </label>
              <input 
                type="number" 
                value={contractValue}
                onChange={(e) => setContractValue(e.target.value)}
                placeholder="Ex: 15000"
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: 'var(--text)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Cliente */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
              Cliente Vinculado (Opcional)
            </label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '10px 12px',
                fontSize: '13px',
                color: 'var(--text)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">-- Sem cliente --</option>
              {clientes.map(cli => (
                <option key={cli.id} value={cli.id}>
                  {cli.nome} ({cli.empresa})
                </option>
              ))}
            </select>
          </div>

          {/* Data de Entrega */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
              Data de Entrega Prevista
            </label>
            <input 
              type="date" 
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '10px 12px',
                fontSize: '13px',
                color: 'var(--text)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-ghost"
              style={{ padding: '10px 20px' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-gold"
              style={{ padding: '10px 24px' }}
            >
              🚀 Criar Obra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
