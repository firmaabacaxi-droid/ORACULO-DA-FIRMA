"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SearchResult {
  type: string;
  label: string;
  title: string;
  url: string;
  id?: string;
  snippet?: string;
  path?: string;
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search API fetch with simple debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error("Erro ao realizar busca:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle keyboard navigation inside search modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectItem(results[selectedIndex]);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const activeEl = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const containerHeight = resultsRef.current.clientHeight;
        const activeTop = activeEl.offsetTop;
        const activeHeight = activeEl.clientHeight;
        const scrollTop = resultsRef.current.scrollTop;

        if (activeTop + activeHeight > scrollTop + containerHeight) {
          resultsRef.current.scrollTop = activeTop + activeHeight - containerHeight;
        } else if (activeTop < scrollTop) {
          resultsRef.current.scrollTop = activeTop;
        }
      }
    }
  }, [selectedIndex, results]);

  const selectItem = (item: SearchResult) => {
    setIsOpen(false);
    if (item.type === 'cerebro') {
      toast.success(`Abrindo nota: ${item.title}`);
      // Abre visualizador local ou leva para cerebro
      router.push(`/projetos`); // Projetos como hub, ou rota cerebro custom se houver
    } else {
      router.push(item.url);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="btn btn-ghost"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 12px",
          fontSize: "12px",
          color: "var(--text-dim)",
          borderColor: "var(--border)",
          background: "var(--surface)",
          cursor: "pointer",
          borderRadius: "6px",
          userSelect: "none"
        }}
      >
        <span>🔍 Buscar...</span>
        <kbd style={{
          fontSize: "10px",
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          padding: "1px 4px",
          borderRadius: "3px",
          color: "var(--text-muted)"
        }}>Ctrl K</kbd>
      </button>
    );
  }

  return (
    <div className="search-backdrop" onClick={() => setIsOpen(false)}>
      <div 
        className="search-modal" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input field */}
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Pesquisar em obras, clientes, tarefas, notas da wiki..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {loading && <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>...</span>}
        </div>

        {/* Results area */}
        <div className="search-results custom-scrollbar" ref={resultsRef}>
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={item.id || item.title + idx}
                className={`search-item ${idx === selectedIndex ? "selected" : ""}`}
                onClick={() => selectItem(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div>
                  <div className="search-item-title">{item.title}</div>
                  {item.snippet && <div className="search-item-snippet">{item.snippet}</div>}
                </div>
                <div className="search-item-badge">{item.label}</div>
              </div>
            ))
          ) : query.trim().length >= 2 ? (
            <div style={{ textAlign: "center", color: "var(--text-dim)", padding: "30px 0", fontSize: "13px" }}>
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px 0", fontSize: "12px" }}>
              Digite pelo menos 2 caracteres para começar a buscar...
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="search-footer">
          <div>
            Navegar: <span className="search-kbd">↑↓</span> · Selecionar: <span className="search-kbd">Enter</span>
          </div>
          <div>
            Fechar: <span className="search-kbd">Esc</span>
          </div>
        </div>
      </div>
    </div>
  );
}
