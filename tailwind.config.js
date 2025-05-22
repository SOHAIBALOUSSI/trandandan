module.exports = {
  content: ["./index.html", "./src/client/**/*.{ts,tsx}"],
  theme: {
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
        "pong-bg-dark": "#1B1B1B",
        "pong-primary-dark": "#AEBABF",
        "pong-accent-dark": "#E05E4B",
        "pong-secondary-dark": "#D1A25F",
        "pong-highlight-dark": "#838E91",
        "pong-bg-sport": "#F5F5F5",
        "pong-primary-sport": "#003049",
        "pong-accent-sport": "#D62828",
        "pong-secondary-sport": "#F77F00",
        "pong-highlight-sport": "#FCBF49",
        "pong-footer": "#7391a1",
		"pong-error" : "#FF4C4C",
		"pong-success" : "#4CAF50",
		"pong-warning" : "#FF9800",
		"pong-info" : "#2196F3",
      },
      backgroundImage: {
        "pong-gradient-light":
          "linear-gradient(to bottom, #fdfdfc 0%, #faf8f5 30%, #f8f6f2 60%)",
        "pong-gradient-dark":
          "linear-gradient(to bottom, #1b1b1b 0%, #141414 30%, #0a0a0a 60%);",
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
  },
  plugins: [],
};
