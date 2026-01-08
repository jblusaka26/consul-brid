/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      minHeight: {
        '44': '2.75rem', // 44px - iOS touch target
      },
      minWidth: {
        '44': '2.75rem', // 44px - iOS touch target
      },
    },
  },
  plugins: [],
};
