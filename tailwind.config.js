export const content = ["./index.html", "./src/client/**/*.{ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      playfair: ["'Playfair Display'", "serif"],
      lora: ["Lora", "serif"],
	  
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
      "pong-error": "#d90429",
      "pong-success": "#38b000",
      "pong-warning": "#ffb703",
      "pong-info": "#2196F3",
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
    },
    animation: {
      "fade-in": "fadeInUp 0.8s ease-out forwards",
      "blur-in": "blurIn 0.6s ease-out forwards",
    },
  },
};
export const plugins = [];
