import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

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
      </body>
    </html>
  );
}

