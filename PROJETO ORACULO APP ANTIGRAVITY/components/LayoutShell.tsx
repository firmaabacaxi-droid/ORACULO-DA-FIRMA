"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Helper para gerar títulos baseados no caminho
  const getPageTitle = () => {
    if (pathname === "/") return "Oráculo da Firma";
    if (pathname?.startsWith("/projetos")) return "Obras & Projetos";
    if (pathname?.startsWith("/crm")) return "CRM Comercial";
    if (pathname?.startsWith("/clientes")) return "Clientes & Empresas";
    if (pathname?.startsWith("/contatos")) return "Equipe & Freelancers";
    return "Oráculo";
  };

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-gold/20 selection:text-gold relative overflow-hidden">
      
      {/* 🌌 Atmosfera Cinematográfica: Glows de Fundo */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gold/7 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-green-olive/5 blur-[150px] pointer-events-none z-0" />

      {/* Componente Sidebar (Desktop fixa, Mobile gaveta) */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Conteúdo Principal (Ajustado para desktop com pl-64) */}
      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">
        
        {/* Cabeçalho Superior Premium (Topbar) */}
        <header className="sticky top-0 h-16 border-b border-border bg-bg/85 backdrop-blur-md flex items-center justify-between px-6 z-30">
          
          {/* Breadcrumbs / Título da Página */}
          <div className="flex items-center gap-2 pl-12 lg:pl-0">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
              Oráculo
            </span>
            <span className="text-text-muted">/</span>
            <h1 className="text-sm font-semibold text-text uppercase tracking-widest font-sans">
              {getPageTitle()}
            </h1>
          </div>

          {/* Status Operacional */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-surface2 border border-border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-olive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-olive"></span>
              </span>
              <span className="text-[10px] font-sans font-semibold tracking-wider text-green-olive uppercase">
                Sincronia Notion OK
              </span>
            </div>
            
            <div className="w-8 h-8 rounded-full border border-border bg-surface2 flex items-center justify-center text-gold">
              <Sparkles size={14} />
            </div>
          </div>

        </header>

        {/* Corpo Principal da Página */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
