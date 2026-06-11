import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        border: "var(--border)",
        gold: "var(--gold)",
        green: "var(--green)",
        red: "var(--red)",
        blue: "var(--blue)",
        orange: "var(--orange)",
        text: {
          DEFAULT: "var(--text)",
          dim: "var(--text-dim)",
          muted: "var(--text-muted)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
