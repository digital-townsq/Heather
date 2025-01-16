/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './config/components/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      fontSize: {
        xs: '0.8rem',
        sm: '1rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '6xl': '4.815rem',
      },
      screens: {
        'sm': { 'min': '320px', 'max': '639px' },     // Phones (portrait)
        'md': { 'min': '640px', 'max': '767px' },     // Phones (landscape) / Tablets (portrait)
        'lg': { 'min': '768px', 'max': '1023px' },    // Tablets (landscape) / Laptops
        'xl': { 'min': '1024px', 'max': '1279px' },   // Desktops (sm)
        '2xl': { 'min': '1280px', 'max': '1535px' },  // Desktops (md)
        '3xl': { 'min': '1536px', 'max': '10000px' },  // Desktops (lg)
      },
      fontFamily: {
        Rolleston: ['"Rolleston"', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
