import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "Oráculo 2.0 — Firma Abacaxi",
  description: "Painel Operacional Integrado de Gestão Audiovisual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans">
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
