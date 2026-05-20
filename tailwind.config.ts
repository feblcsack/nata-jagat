import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NATA JAGAT Color System
        forest: {
          50: "#f0f7f0",
          100: "#d9eedd",
          200: "#b4ddb9",
          300: "#82c48a",
          400: "#4da65a",
          500: "#2d8a3b",
          600: "#1e6e2c",
          700: "#185724",
          800: "#14451e",
          900: "#0f3317",
          950: "#071a0d",
        },
        earth: {
          50: "#faf5ef",
          100: "#f2e5d0",
          200: "#e4c89e",
          300: "#d4a66b",
          400: "#c4874a",
          500: "#b56d35",
          600: "#9a572c",
          700: "#7e4426",
          800: "#693926",
          900: "#593224",
          950: "#301811",
        },
        sage: {
          50: "#f4f8f0",
          100: "#e4f0db",
          200: "#cae0b9",
          300: "#a5c98e",
          400: "#7aaf63",
          500: "#599343",
          600: "#437533",
          700: "#365d2a",
          800: "#2d4b24",
          900: "#263f1f",
          950: "#11210d",
        },
        sky: {
          50: "#eff9ff",
          100: "#def2ff",
          200: "#b6e8ff",
          300: "#75d8ff",
          400: "#2cc3ff",
          500: "#00acf0",
          600: "#0089cc",
          700: "#006da5",
          800: "#005c88",
          900: "#064d72",
        },
        cream: "#f7f3ed",
        parchment: "#ede6d8",
      },
      // ... (bagian atas tetap sama)
      fontFamily: {
        // Inter sekarang jadi font utama (sans)
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
// ... (sisa config tetap sama)
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
