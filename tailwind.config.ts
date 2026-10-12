import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
                // Dark Mode: Soft Dark Cyber
        cyberDark: {
          bg: "#0B0F19",       // Main Page Background
          card: "#111827",     // Dashboard Cards & Containers
          well: "#1E293B",     // Inner Wells & Fields
          border: "rgba(148, 163, 184, 0.12)", // Borders & Dividers
          text: "#F1F5F9",     // Primary Text
          muted: "#94A3B8",    // Secondary Text
          map: "#1E293B",      // Map Base Fill
          hover: "#38BDF8",    // Map Hover / Glow
        },
        // Light Mode: High-Clarity Slate Light
        slateLight: {
          bg: "#F1F5F9",       // Main Page Background
          card: "#FFFFFF",     // Dashboard Cards
          well: "#E2E8F0",     // Inner Wells & Fields
          border: "#CBD5E1",   // Borders & Dividers
          text: "#0F172A",     // Primary Text
          muted: "#334155",    // Secondary Text
          map: "#E2E8F0",      // Map Base Fill
          hover: "#0284C7",    // Map Focus / Hover
        },
        // Calibrated Data Accents
        accent: {
          fintechDark: "#22D3EE",
          fintechLight: "#0E7490",
          smartphonesDark: "#34D399",
          smartphonesLight: "#047857",
          telecomDark: "#60A5FA",
          telecomLight: "#1D4ED8",
          cashDark: "#FBBF24",
          cashLight: "#B45309",
          ecommerceDark: "#F472B6",
          ecommerceLight: "#BE185D",
          aiDark: "#C084FC",
          aiLight: "#6B21A8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
