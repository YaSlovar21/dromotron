// postcss.config.js

// подключите плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');

module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    tailwindcss({ config: './tailwind.config.js' }),
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
}; 