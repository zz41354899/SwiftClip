import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./remotion/**/*.{ts,tsx}",
  ],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: ["-apple-system", "BlinkMacSystemFont", "San Francisco", "Helvetica Neue", "Inter", "sans-serif"],
    },
    extend: {
      colors: {
        background: "var(--bg-root)",
        surface: "var(--surface)",
        border: "var(--border)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
