/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      colors: {
        lake: {
          dark:  '#0d1b2a',
          navy:  '#1a2d45',
          blue:  '#1e5fa8',
          amber: '#d4783a',
          gold:  '#e8a84a',
          cream: '#faf4ea',
          chalk: '#b8dde8',
        },
      },
    },
  },
  plugins: [],
}
