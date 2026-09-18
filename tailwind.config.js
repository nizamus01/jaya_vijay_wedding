/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#faf8f3',
          light: '#fdfcf8',
          dark: '#f0ebe0',
        },
        champagne: {
          DEFAULT: '#e8d5b7',
          light: '#f2e6d0',
          dark: '#d4b896',
        },
        gold: {
          DEFAULT: '#c5a55a',
          light: '#d4b876',
          dark: '#a88a3f',
        },
        green: {
          DEFAULT: '#2d4a3e',
          light: '#3d6452',
          dark: '#1f3528',
          soft: '#5a7d6e',
        },
        rose: {
          DEFAULT: '#c97b7b',
          light: '#d99a9a',
          dark: '#a85959',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        script: ['Great Vibes', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
