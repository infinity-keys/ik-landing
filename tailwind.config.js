const tailwindforms = require("@tailwindcss/forms");

module.exports = {
  content: ["./*{pages,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      blue: "#101D42",
      turquoise: "#3FCCBB",
      gray: {
        100: "#EEEFFC",
        150: "#A6ADB4",
        200: "#888FA1",
        300: "#475171",
        500: "#303B5B",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [tailwindforms],
};
