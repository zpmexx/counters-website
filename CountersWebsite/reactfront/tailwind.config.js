/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        'primary': '#FFFFFF',
        'secondary': '#8D3BEB',
        'hoverbg': '#7330BF',
        'hovertext': '#FFFFFF',
        'faded': '#8D3BEB',
      }
    },
  },
  plugins: [],
}