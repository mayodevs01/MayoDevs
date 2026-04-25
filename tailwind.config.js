/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#030407",
        carbon: "#090b10",
        graphite: "#151922",
        chrome: "#d7e0e8",
        cyanCore: "#47f3ff",
        ice: "#f7fbff",
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 34px rgba(71, 243, 255, 0.22)",
        hard: "0 18px 80px rgba(0, 0, 0, 0.55)",
      },
    },
  },
  plugins: [],
};
