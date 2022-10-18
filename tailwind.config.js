/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html"],
  theme: {},
  variants: {},
  plugins: [
      require('@tailwindcss/typography'),
      require('daisyui')
  ],
  daisyui: {
    themes: ['light', 'dark']
  }
};
