"use client";

import React, { useState } from 'react';
import OnboardingModal from './OnboardingModal';

interface ClientShort {
  id: string;
  nome: string;
  empresa: string;
}

interface DashboardHeaderProps {
  clientes: ClientShort[];
}

export default function DashboardHeader({ clientes }: DashboardHeaderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      borderBottom: '1px solid var(--border)',
      paddingBottom: '16px'
    }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          ☕ Estúdio Oráculo
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '2px' }}>
          Workspace Criativo & Direção de Arte da Firma Abacaxi
        </p>
      </div>

      <button 
        onClick={() => setShowModal(true)} 
        className="btn btn-gold"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          fontWeight: 700
        }}
      >
        <span>🚀</span> Nova Obra
      </button>

      {showModal && (
        <OnboardingModal 
          clientes={clientes} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}
