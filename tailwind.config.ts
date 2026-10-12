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
        // Dark Mode: Soft Tech Navy
        navy: {
          deep: "#101827",      // Soft Deep Navy (Page Background)
          card: "#192436",      // Elevated Navy (Dashboard Cards)
          well: "#223047",      // Muted Slate Navy (Inner Wells/Fields)
          border: "#344258",    // Soft Slate Border (Borders)
          text: "#E8EEF7",      // Soft Ice White (Primary Text)
          muted: "#A9B8CB",     // Muted Silver Blue (Secondary Text)
          map: "#2B4057",       // Muted Steel Navy (Map Base Fill)
          hover: "#58B6CC",     // Soft Cyan Blue (Map Hover Fill)
        },
        // Light Mode: Refined Clean Slate
        slateClean: {
          bg: "#F4F7FB",        // Soft Cloud White (Page Background)
          card: "#FFFFFF",      // Pure Clean White (Dashboard Cards)
          well: "#EAF0F7",      // Pale Blue Pearl (Inner Wells/Fields)
          border: "#D5DFEB",    // Defined Slate Border (Borders)
          text: "#17243A",      // Deep Slate Ink (Primary Text)
          muted: "#52647B",     // Balanced Slate Blue (Secondary Text)
          map: "#CBD9E8",       // Soft Steel Blue (Map Base Fill)
          hover: "#087EAD",     // Rich Ocean Blue (Map Hover Fill)
        },
        // Balanced Tech Accents (Data Visualization)
        accent: {
          cyanSoft: "#58B6CC",
          cyanDeep: "#087EAD",
          emeraldSoft: "#53B69B",
          emeraldDeep: "#16876E",
          blueSoft: "#7A9FE0",
          blueDeep: "#346BC1",
          amberSoft: "#D7AC68",
          amberDeep: "#AC6816",
          pinkSoft: "#D38BAD",
          pinkDeep: "#BD397B",
          purpleSoft: "#AE91D9",
          purpleDeep: "#8050BB",
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
