/** @type {import("tailwindcss").Config} */
const config = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: [
        'Open Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Fira Mono', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    extend: {
      colors: {
        primary: {
          50: '#feffAD',
          100: '#fdff70',
          200: '#faff00',
          300: '#fae200',
          400: '#f4c200',
          500: '#efa200',
          600: '#ea8400',
          700: '#df6500',
          800: '#d54800',
          900: '#ca2e00',
        },
      },
      keyframes: {
        'translation-x': {
          '0%': {
            transform: 'translateX(0px)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'translation-y': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '100%': {
            transform: 'translateY(100%)',
          },
        },
      },
      animation: {
        'translation-x': 'translation-x 1.5s ease-in-out infinite',
        'translation-y': 'translation-x 1.5s ease-in-out infinite',
      },
      zIndex: {
        1: '1',
        10: '10', // Navbar
        20: '20', // Overlay
        30: '30', // Modal
        40: '40', // Toast
        50: '50', // Tooltip and Popover
      },
    },
  },
  // @ts-ignore
  presets: [require('@acme/tailwind-config')],
};

module.exports = config;
