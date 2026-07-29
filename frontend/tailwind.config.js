/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bronco': '#45231B',
        'mesa-clay': '#9A4C36',
        'prairie-gold': '#9F7633',
        'ironwood': '#9B9E8B',
        'stone': '#D1BFA6',
        'creme': '#F0E2CD',
      },
    },
  },
  plugins: [],
}
