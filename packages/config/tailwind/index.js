/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-scrollbar'), require('@tailwindcss/line-clamp')],
};

module.exports = config;
