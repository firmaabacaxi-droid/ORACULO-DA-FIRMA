"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase Configuration from Environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mzvwnvxwpsncybbbukae.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dndudnh3cHNuY3liYmJ1a2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjAxMDgsImV4cCI6MjA4OTgzNjEwOH0.HTyplZqcEMU73rYM7IBNnftJG_kBheL6ZQRFS11BSWA";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function MobileDashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [status, setStatus] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Fetch latest messages and status
    fetchData();

    // 2. Real-time subscription
    const channel = supabase
      .channel("oraculo-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "oraculo_messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "oraculo_session_status" },
        (payload) => {
          setStatus(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchData() {
    const { data: msgs } = await supabase
      .from("oraculo_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(50);
    if (msgs) setMessages(msgs);

    const { data: st } = await supabase
      .from("oraculo_session_status")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();
    if (st) setStatus(st);
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans select-none overflow-hidden flex flex-col">
      {/* Header with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-white/5 backdrop-blur-lg border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center animate-pulse">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ORÁCULO v2.1
            </h1>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase">Live Session Bridge</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_infinite]"></div>
            <span className="text-xs text-green-400 font-mono font-bold">CONNECTED</span>
          </div>
        </div>
      </header>

      <main className="flex-1 mt-20 mb-8 overflow-y-auto custom-scrollbar" ref={scrollRef}>
        <div className="mb-6 p-6 rounded-[2rem] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/10 shadow-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-purple-400 font-black uppercase tracking-[0.2em]">O que estou fazendo agora</span>
              <span className="text-[10px] text-zinc-600 font-mono">SESSÃO: {status?.session_id || 'FIRMA-ABACAXI-PRIMARY'}</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white leading-tight tracking-tight">
              {status?.current_task || "Sincronizando com a Firma..."}
            </h2>
            
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-3">
              <div 
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                style={{ width: `${status?.progress_percent || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-zinc-500 italic max-w-[70%] line-clamp-2">"{status?.status_text || "O Oráculo está operando com carga total."}"</p>
              <span className="text-xl font-black text-white/20">{status?.progress_percent || 0}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">Monitorando Tráfego</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
          
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[88%] p-5 rounded-3xl ${
                m.sender === "user" 
                  ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-tr-none shadow-lg shadow-purple-900/20" 
                  : "bg-zinc-900/80 backdrop-blur-md border border-white/5 text-zinc-200 rounded-tl-none shadow-xl"
              }`}>
                <p className="text-[14px] leading-relaxed font-medium">{m.content}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 opacity-50">
                   <span className="text-[9px] font-bold uppercase tracking-widest">
                    {m.sender === "user" ? "Remoto (Rua)" : "Cérebro Local"}
                   </span>
                   <span className="text-[9px]">
                    {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center py-10 text-gray-700 italic">
              Nenhuma mensagem trocada nesta sessão.
            </div>
          )}
        </div>
      </main>

      {/* Mini Animation in Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-2 flex justify-center pointer-events-none">
        <div className="flex gap-1 h-3 items-end">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-purple-500/20 rounded-t-full" 
              style={{ 
                height: `${Math.random() * 100}%`,
                animation: `bounce ${0.5 + Math.random()}s infinite alternate`
              }}
            ></div>
          ))}
        </div>
      </footer>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        @keyframes bounce { from { height: 10%; } to { height: 100%; } }
      `}</style>
    </div>
  );
}
