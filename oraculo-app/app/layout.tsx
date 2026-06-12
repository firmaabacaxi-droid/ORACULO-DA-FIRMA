import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ORÁCULO — Sistema de Gestão",
  description: "Plataforma de gestão integrada para produtoras de conteúdo audiovisual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Sidebar />
        <main className="main-content">
          <div className="content-area">
            {children}
          </div>
        </main>
        {/* Sistema global de toast — substitui todos os alert() */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#1a1714',
              color: '#e6dfd3',
              border: '1px solid rgba(212,154,106,0.35)',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            },
            success: {
              iconTheme: { primary: '#d49a6a', secondary: '#0f0d0b' },
            },
            error: {
              iconTheme: { primary: '#e05c5c', secondary: '#0f0d0b' },
              duration: 5000,
            },
          }}
        />
      </body>
    </html>
  );
}
