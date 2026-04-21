/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        manga: ['Bangers', 'cursive'],
      },
      colors: {
        ink: '#0a0a0a',
        paper: '#f5f5f0',
        'manga-red': '#dc2626',
      },
      boxShadow: {
        panel: '8px 8px 0 0 #000',
        'panel-sm': '4px 4px 0 0 #000',
      },
    },
  },
  plugins: [],
}