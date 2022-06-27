const tailwindforms = require("@tailwindcss/forms");

module.exports = {
  content: ["./*{pages,components}/**/*.{js,ts,jsx,tsx,scss}"],
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
    },
  },
  plugins: [tailwindforms],
};
