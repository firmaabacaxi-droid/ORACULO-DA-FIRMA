"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

const NAV_GROUPS = [
  {
    section: "Principal",
    items: [
      { name: "Dashboard",    href: "/",            icon: "⊞" },
    ],
  },
  {
    section: "Projetos",
    items: [
      { name: "Obras",        href: "/projetos",    icon: "🎬" },
      { name: "Orçamentos",   href: "/orcamentos",  icon: "📊" },
      { name: "Tarefas",      href: "/tarefas",     icon: "✅" },
    ],
  },
  {
    section: "Pessoas",
    items: [
      { name: "Clientes",     href: "/clientes",    icon: "🏢" },
      { name: "Contatos",     href: "/contatos",    icon: "👥" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar drawer on dynamic nav clicks
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Find current page title for topbar
  const allItems = NAV_GROUPS.flatMap(g => g.items);
  const activeItem = allItems.find(item =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  const pageTitle = activeItem?.name ?? "Oráculo 2.0";

  return (
    <>
      {/* Overlay to click and close sidebar on mobile backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 999
          }}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">🍍</div>
          <div>
            <div className="sidebar-logo-text">FIRMA ABACAXI</div>
            <div className="sidebar-logo-sub">Ateliê Audiovisual</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_GROUPS.map((group) => (
            <div key={group.section}>
              <div className="nav-section">{group.section}</div>
              {group.items.map((item) => {
                const isActive = item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
                return (
                  <Link href={item.href} key={item.href} style={{ textDecoration: "none" }} onClick={handleNavClick}>
                    <div className={`nav-item ${isActive ? "active" : ""}`}>
                      <span style={{ fontSize: "15px" }}>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: "14px 16px",
          borderTop: "1px solid var(--border)",
          fontSize: "11px",
          color: "var(--text-muted)",
        }}>
          <div style={{ marginBottom: "2px" }}>Oráculo 2.0</div>
          <div style={{ color: "var(--text-muted)", opacity: 0.6 }}>6 tabelas · 100% conectado</div>
        </div>
      </aside>

      <header className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: "var(--text)",
              fontSize: "24px",
              cursor: "pointer",
              marginRight: "14px",
              lineHeight: 1,
              padding: "4px"
            }}
          >
            {isOpen ? "✕" : "☰"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "16px" }}>{activeItem?.icon}</span>
            <div className="topbar-title">{pageTitle}</div>
          </div>
        </div>
        <SearchModal />
      </header>
    </>
  );
}
