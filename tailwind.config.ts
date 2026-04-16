import type { Config } from "tailwindcss";
import servePreset from "@goodparty/serve-ui/tailwind-preset";

const config: Config = {
  presets: [servePreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@goodparty/serve-ui/**/*.tsx",
  ],
  theme: { extend: {} },
  plugins: [],
};

export default config;
