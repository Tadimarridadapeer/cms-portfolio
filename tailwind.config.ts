import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          light: "var(--surface-light)",
          dark: "var(--surface-dark)",
          muted: "var(--surface-muted)",
          card: "var(--surface-card)",
        },
        muted: {
          DEFAULT: "var(--muted-foreground)",
          bg: "var(--muted-bg)",
        },
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          muted: "var(--accent-muted)",
          subtle: "var(--accent-subtle)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        card: "0 4px 20px -2px rgba(16, 17, 20, 0.05), 0 2px 6px -1px rgba(16, 17, 20, 0.03)",
        elevated: "0 12px 32px -4px rgba(16, 17, 20, 0.08), 0 4px 12px -2px rgba(16, 17, 20, 0.04)",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
