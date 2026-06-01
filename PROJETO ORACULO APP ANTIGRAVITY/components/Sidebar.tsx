"use"
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Film, 
  Target, 
  Briefcase, 
  Users, 
  CheckSquare, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Obras & Projetos", href: "/projetos", icon: Film },
    { name: "CRM Comercial", href: "/crm", icon: Target },
    { name: "Clientes & Empresas", href: "/clientes", icon: Briefcase },
    { name: "Equipe & Freelancers", href: "/contatos", icon: Users },
  ];

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Botão Hambúrguer Superior para Dispositivos Móveis */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-surface border border-border text-text rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay Escuro com Blur para Mobile */}
      {isOpen && (
        <div 
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Container Principal da Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 w-64 border-r border-border bg-surface z-40
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Header da Sidebar */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-border">
            <Link href="/" onClick={closeSidebar} className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-serif font-semibold tracking-wide text-gold">
                  ORÁCULO
                </span>
                <span className="px-1.5 py-0.5 bg-gold/15 text-[10px] font-semibold text-gold rounded border border-gold/20 flex items-center gap-0.5 uppercase">
                  v2.0
                </span>
              </div>
              <span className="text-[10px] font-sans text-text-muted uppercase tracking-widest mt-1">
                Firma Abacaxi
              </span>
            </Link>
            
            {/* Fechar no Mobile */}
            <button 
              onClick={closeSidebar}
              className="lg:hidden p-1 text-text-dim hover:text-text rounded-md border border-transparent hover:border-border"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links de Navegação */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            <div className="px-3 mb-2 text-[10px] font-semibold text-text-muted uppercase tracking-widest">
              Navegação Central
            </div>
            
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Detecta se a rota atual bate com o link da sidebar (exata ou subrotas)
              const isActive = item.href === "/" 
                ? pathname === "/" 
                : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? "bg-surface2 text-gold border-l-2 border-gold font-semibold shadow-[inset_4px_0_12px_rgba(212,154,106,0.05)]" 
                      : "text-text-dim hover:text-text hover:bg-surface2/50 border-l-2 border-transparent"
                    }
                  `}
                >
                  <Icon 
                    size={18} 
                    className={`transition-colors duration-200 ${isActive ? "text-gold" : "text-text-dim group-hover:text-gold"}`} 
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Rodapé da Sidebar - Identidade visual */}
          <div className="p-4 border-t border-border bg-surface2/30">
            <div className="flex items-center gap-3 p-3 rounded-md bg-surface border border-border">
              <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                <Sparkles size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-text truncate">
                  Firma Abacaxi
                </span>
                <span className="text-[10px] text-text-dim truncate">
                  Set Operacional Ativo
                </span>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}
