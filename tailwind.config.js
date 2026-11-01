/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkTheme: '#11001F',
        darkHover: '#2A004A',
        lightHover: '#fcf4ff',
      },
      fontFamily: {
        Outfit: ['Outfit', 'sans-serif'],
        Ovo: ['Ovo', 'serif'],
        ovo: ['Ovo', 'serif'],
        sans: ['Outfit', 'sans-serif'],
        serif: ['Ovo', 'serif'],
      },
      animation: {
        'spin_slow': 'spin 14s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
    },
  },
  plugins: [],
}
