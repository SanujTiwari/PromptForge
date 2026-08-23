/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      colors: {
        paper: {
          50: '#fbfaf6',
          100: '#f4f1e8',
          200: '#e7e1d4',
          300: '#d4ccbc',
        },
        ink: {
          50: '#efeee9',
          100: '#d8d5cc',
          300: '#9b978c',
          500: '#66625a',
          700: '#322f2a',
          800: '#24211d',
          900: '#171512',
        },
        forge: {
          50: '#fff2e8',
          100: '#ffddc5',
          300: '#ef8d5f',
          500: '#c84d27',
          600: '#a83e20',
          700: '#7e2e19',
        },
        moss: {
          50: '#eef3e8',
          100: '#dce8d1',
          500: '#536b42',
          700: '#37482b',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'paper': '0 10px 30px rgba(54, 45, 32, 0.07)',
        'lift': '0 15px 36px rgba(54, 45, 32, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'catalog-in': 'catalogIn 0.45s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        catalogIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
