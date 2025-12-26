const { Bitcoin } = require('lucide-react');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bitcount: ['"Bitcount Grid Single"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        BBH: ['"BBH Sans Hegarty"', 'sans-serif'],
        sixtyfour: ['"Sixtyfour"', 'sans-serif'],
         rubik80s: ['"Rubik 80s Fade"', 'cursive']
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
