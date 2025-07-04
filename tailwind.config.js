export const content = ["./index.html", "./src/client/**/*.{ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      playfair: ["'Playfair Display'", "serif"],
      lora: ["Lora", "serif"],
      orbitron: ["Orbitron", "sans-serif"],
    },
    colors: {
      "pong-bg": "#F3F0E8",
      "pong-primary": "#2F3E46",
      "pong-accent": "#C44536",
      "pong-secondary": "#E0A458",
      "pong-highlight": "#AAB7B8",
      "pong-dark-bg": "#1B1B1B",
      "pong-dark-primary": "#AEBABF",
      "pong-dark-accent": "#E05E4B",
      "pong-dark-secondary": "#D1A25F",
      "pong-dark-highlight": "#838E91",
      "pong-bg-sport": "#F5F5F5",
      "pong-primary-sport": "#003049",
      "pong-accent-sport": "#D62828",
      "pong-secondary-sport": "#F77F00",
      "pong-highlight-sport": "#FCBF49",
      "pong-footer": "#7391a1",
      "pong-dark-custom": "#0e0e0e",
      "pong-error": "#ef4444",
      "pong-success": "#22c55e",
      "pong-warning": "#f59e0b",
      "pong-info": "#2196F3",
      "game-bg": "#1B1B1B",
      "ping-yellow": "#E0A458",
      "game-border": "#AEBABF",
    },
    keyframes: {
      fadeInUp: {
        "0%": { opacity: 0, transform: "translateY(20px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      blurIn: {
        "0%": { filter: "blur(4px)", opacity: 0 },
        "100%": { filter: "blur(0)", opacity: 1 },
      },
      backgroundPan: {
        "0%": { backgroundPosition: "0% 0%" },
        "100%": { backgroundPosition: "100% 100%" },
      },
      myFloat: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-10px)" },
      },
      myPulse: {
        "0%": { opacity: 1 },
        "50%": { opacity: 0.7 },
      },
    },
    animation: {
      fadeInUp: "fadeInUp 0.8s ease-out",
      blurIn: "blurIn 0.6s ease-out forwards",
      backgroundPan: "backgroundPan 20s linear infinite",
      myFloat: "myFloat 3s ease-in-out infinite",
      myPulse: "myPulse 1.3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
};
export const plugins = [];
