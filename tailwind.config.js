/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          200: '#F7E08A',
          300: '#F0C040',
          400: '#D4AF37',
          500: '#C9A84C',
          600: '#B8860B',
          700: '#8B6914',
        },
        surface: {
          950: '#050507',
          900: '#0a0a0e',
          800: '#111116',
          700: '#18181f',
          600: '#222230',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #F0C040 0%, #C9A84C 45%, #D4AF37 100%)',
      },
    },
  },
  plugins: [],
}
