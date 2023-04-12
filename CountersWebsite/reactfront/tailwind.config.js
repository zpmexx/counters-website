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
        'primary': '#52b788',
        'secondary': '#74c69d',
        'hoverbg': '#b7e4c7',
        'hovertext': '#081c15',
        'faded': '#95d5b2',
      }
    },
  },
  plugins: [],
}