import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#ff4d00",
          "orange-hover": "#cc3d00",
          dark: "#1a1a1a",
          default: "#555555",
          "gray-bg": "#f5f5f5",
          "dark-bg": "#111111",
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
      animation: {
        "ken-burns": "ken-burns 20s ease-in-out infinite alternate",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-in": "slide-in 0.6s ease-out forwards",
      },
      keyframes: {
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.1) translate(-1%, -1%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
