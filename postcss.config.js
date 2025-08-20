/**
 * @fileoverview Configuration PostCSS pour Tailwind CSS avec Vite
 * @description Configuration PostCSS optimisée pour l'intégration Tailwind dans Electron + Vite
 * @environment Build process pour CSS avec support Vite
 * @dependencies tailwindcss, autoprefixer  
 * @customization Configuration compatible avec Vite et les dernières versions
 * @related tailwind.config.js, src/styles/globals.css, vite.config.ts
 */

module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};