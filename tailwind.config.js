const tailwindforms = require("@tailwindcss/forms");

module.exports = {
  content: ["./*{pages,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        blue: "#101D42",
        "blue-300": "#93c5fd",
        "blue-800": "#070e1f",
        turquoise: "#3FCCBB",
        turquoiseDark: "#5ffae7",
        twitterBlue: "#1da1f2",
        discordPurple: "#5865f2",
        gray: {
          100: "#EEEFFC",
          150: "#A6ADB4",
          200: "#888FA1",
          300: "#475171",
          500: "#303B5B",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0 20px 35px -10px rgba(0, 0, 0, 0.8)",
      },
      fontSize: {
        "dynamic-xl": "clamp(1rem, 16vw, 11rem)",
      },
      animation: {
        bgMove: "bgMove 6s ease infinite",
        comeInOut: "comeInOut .7s forwards",
        flickerGlow:
          "flicker 2s forwards, glow 1.2s alternate-reverse infinite",
        fadeInOut: "fadeInOut 6s forwards",
        fadeGlow: "fade .8s forwards, glow 1.2s alternate-reverse infinite",
        pulseGold: "pulseGold 2.5s infinite",
        pulseGoldGradient: "pulseGold 2.5s infinite, bgMove 6s ease infinite",
        pulseRed: "pulseRed 2.5s infinite",
        shine: "shine 30s forwards infinite",
        spin: "spin 1s linear",
      },
      keyframes: {
        comeInOut: {
          "0%, 100%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInOut: {
          "0%, 100%": { opacity: 0 },
          "10%, 90%": { opacity: 1 },
        },
        flicker: {
          "0%, 60%": { opacity: 0 },
          "30%": { opacity: 0.8 },
          "100%": { opacity: 1 },
        },
        glow: {
          "0%": { textShadow: "0 0 0px #3fccbb" },
          "100%": { textShadow: "0 0 8px #3fccbb" },
        },
        bgMove: {
          "0%": { backgroundPosition: "0% 51%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 51%" },
        },
        pulseGold: {
          "0%": {
            boxShadow: "0 0 0 0 rgba(255, 182, 47, 1)",
          },
          "70%": {
            boxShadow: "0 0 0 7px rgba(255, 182, 47, 0)",
          },
          "100%": {
            boxShadow: "0 0 0 0 rgba(255, 182, 47, 0)",
          },
        },
        pulseRed: {
          "0%": {
            boxShadow: "0 0 0 0 rgba(204, 63, 63, 0.4)",
          },
          "70%": {
            boxShadow: "0 0 0 7px rgba(204, 63, 63, 0)",
          },
          "100%": {
            boxShadow: "0 0 0 0 rgba(204, 63, 63, 0)",
          },
        },
        shine: {
          "0%": {
            transform: "skewX(-20deg) translateX(-105px)",
          },
          "3%, 100%": {
            transform: "skewX(-20deg) translateX(300px)",
          },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
      },
    },
  },
  plugins: [tailwindforms],
};
