module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyber-black": "#050505",
        "cyber-dark": "#0a0a12",
        "cyber-darker": "#07070e",
        "cyber-card": "rgba(20, 20, 30, 0.9)",
        "neon-blue": "#00f0fc",
        "neon-pink": "#ff00ff",
        "neon-purple": "#9600ff",
        "neon-cyan": "#00f0ff",
        "cyber-text": "#e0e0ff",
        "cyber-gray": "#8a8a9c",
      },
      animation: {
        glitch: "glitch 5s infinite linear alternate-reverse",
        "glitch-2": "glitch-2 5s infinite linear alternate-reverse",
        "pulse-slow": "pulse 6s infinite",
        blink: "blink 1s step-end infinite",
        "neon-glow": "neon-glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        blink: {
          "from, to": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "neon-glow": {
          "0%": { "text-shadow": "0 0 5px rgba(0, 240, 252, 0.5)" },
          "100%": { "text-shadow": "0 0 20px rgba(0, 240, 252, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
