const { cssProseObj } = require('./constants');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  safelist: [
    'opacity-10',
    'translate-x-5',
    'duration-300',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        dromotron: {
          css: cssProseObj, // это не важно
        },
      }),
      // pc first верстка (класс для адаптации выглядит так "text-xl mvpc:text-lg ...")
      screens: {
        'pc': {'max': '1620px'},
        'mvpc': {'max': '1441px'},
        'olpc': {'max': '1240px'},
        'laptop': {'max': '1024px'},
        'mobile': {'max': '639px'},
        'mobilesm': { 'max': '345px' },
      },
      colors: {
        primary: {
          red: '#CD2C2C',
          black: '#171515',
          lightgray: '#E8E8E8',
          gray: '#7D7B7B',
          white: '#fff'
        },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

