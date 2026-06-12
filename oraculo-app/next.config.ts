import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Módulos Node.js nativos usados em API routes — não bundlizar
  serverExternalPackages: ["child_process"],
};

export default nextConfig;
