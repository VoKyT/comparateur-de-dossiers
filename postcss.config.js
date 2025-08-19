/**
 * @fileoverview Configuration PostCSS pour Tailwind CSS version récente
 * @description Configuration PostCSS mise à jour pour l'intégration Tailwind dans Electron
 * @environment Build process pour CSS avec support Webpack
 * @dependencies tailwindcss, autoprefixer  
 * @customization Configuration compatible avec les dernières versions
 * @related tailwind.config.js, src/styles/globals.css, webpack.config.js
 */

module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};