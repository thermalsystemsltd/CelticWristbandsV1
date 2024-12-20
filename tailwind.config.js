/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        celtic: {
          green: '#1F4B3F',
          gold: '#FFD700',
          brown: '#8B4513',
        }
      }
    },
  },
  plugins: [],
};