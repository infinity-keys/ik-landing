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
      animation: {
        flickerGlow:
          "flicker 2s forwards, glow 1.2s alternate-reverse infinite",
        fadeGlow: "fade .8s forwards, glow 1.2s alternate-reverse infinite",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        flicker: {
          "0%, 60%": { opacity: "0" },
          "30%": { opacity: "0.8" },
          "100%": { opacity: "1" },
        },
        glow: {
          "0%": { textShadow: "0 0 0px #3fccbb" },
          "100%": { textShadow: "0 0 8px #3fccbb" },
        },
      },
    },
  },
  plugins: [tailwindforms],
};
