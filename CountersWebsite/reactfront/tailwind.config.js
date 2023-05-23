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
        'primary': '#A6C36F',
        'secondary': '#A6C36F',
        'hoverbg': '#1E352F',
        'hovertext': '#eee',
        'faded': '#A6C36F',
        'background-secondary': '#335145',
        'background-color': '#fff',
        'dark-text': '#111',
        'light-text': '#fff'
      }
    },
  },
  plugins: [],
}