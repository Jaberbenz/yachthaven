/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#11457B',
        secondary: '#FFFFFF',
        golden: '#DCB253',
      },
      fontFamily: {
        sans: ['Belleza', 'sans-serif'], 
        serif: ['Arapey', 'serif'],
      },
    },
  },
  plugins: [],
}

