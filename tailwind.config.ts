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
        // NATA JAGAT Modernized Color System
        forest: {
          50: "#f1f7f2",
          100: "#dceee1",
          200: "#bedfc6",
          300: "#8fcaa1",
          400: "#5ab076",
          500: "#2d8a3b",
          600: "#1f722e",
          700: "#185924",
          800: "#134620",
          900: "#0d3318",
          950: "#061a0c",
        },
        earth: {
          50: "#fbf6f0",
          100: "#f3e8d9",
          200: "#e6d1a8",
          300: "#d5a76a",
          400: "#c48945",
          500: "#b56d35",
          600: "#9d582d",
          700: "#824327",
          800: "#6d3923",
          900: "#5d3320",
          950: "#321810",
        },
        sage: {
          50: "#f5f9f2",
          100: "#e8f1de",
          200: "#d1e1bb",
          300: "#a8cb90",
          400: "#7fb062",
          500: "#599343",
          600: "#457535",
          700: "#375e2c",
          800: "#2e4c25",
          900: "#274020",
          950: "#12210d",
        },
        sky: {
          50: "#f0faff",
          100: "#e0f3ff",
          200: "#b8e8ff",
          300: "#7dd8ff",
          400: "#2ec5ff",
          500: "#00aef0",
          600: "#0089cc",
          700: "#0070a5",
          800: "#005d88",
          900: "#064f72",
        },
        cream: "#faf7f2",
        parchment: "#f0ebe3",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
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
