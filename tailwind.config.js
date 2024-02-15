/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.html`],
  theme: {
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

