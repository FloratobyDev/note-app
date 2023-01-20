
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkgreen': '#1A724C',
        'lightgreen': '#ADE067',
      },
      fontFamily: {
        adlery: ['Adlery', 'sans-serif']
      }
    },
  },
  plugins: [

  ],
}
