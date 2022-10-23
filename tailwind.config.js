const theme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html"],
  theme: {
    fontFamily: {
      'mono': ['Roboto Mono', ...theme.fontFamily.mono]
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark']
  }
};
