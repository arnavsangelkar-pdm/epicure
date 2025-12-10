/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        epicure: {
          green: '#6B8E5A',
          'green-light': '#8FA87A',
          'green-dark': '#4A5F3F',
          beige: '#FAF7F4',
          'beige-dark': '#F5F2EF',
          neutral: '#F5F5F0',
          'neutral-dark': '#E8E8E0',
          'warm-gray': '#5A5A5A',
          'light-gray': '#F9F9F7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

