import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          800: "#14234D",
          900: "#0B1529",
        },
        "gp-blue": "#2563EB",
        "gp-blue-hover": "#0D3CB5",
        "gp-blue-deep": "#0D3CB5",
        "gp-blue-light": "#EFF6FF",
        "gp-blue-50": "#DBEAFE",
        "gp-blue-border": "#BFDBFE",
        "gp-success": "#059669",
        "gp-success-light": "#ECFDF5",
        "gp-success-border": "#A7F3D0",
        "gp-error": "#E00C30",
        "gp-error-light": "#FEF2F2",
        "gp-error-border": "#FECACA",
        "gp-warning": "#D97706",
        "gp-warning-light": "#FFFBEB",
        "gp-warning-border": "#FDE68A",
        "gp-text": "#1E1F20",
        "gp-text-secondary": "#70757A",
        "gp-text-muted": "#879099",
        "gp-border": "#D1D8DF",
        "gp-border-light": "#E0E6EC",
        "gp-bg": "#FFFFFF",
        "gp-bg-subtle": "#F7FAFB",
      },
      fontFamily: {
        outfit: ["Outfit", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px rgba(37,99,235,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
