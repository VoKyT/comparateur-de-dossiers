/**
 * @fileoverview Configuration Babel pour l'architecture Electron + React + JavaScript
 * @description Configuration transpilation pour le renderer process avec React
 * @environment Build process avec support développement et production
 * @dependencies babel-core, preset-env, preset-react
 * @customization Configuration optimisée pour Electron renderer
 * @validation Compatible avec JavaScript et Tailwind CSS
 * @related webpack.config.js, tailwind.config.js, postcss.config.js
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          // Cibler la version Node.js d'Electron
          electron: '20.0.0'
        },
        modules: false // Laisser webpack gérer les modules
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // Nouveau JSX Transform de React 17+
        development: process.env.NODE_ENV === 'development'
      }
    ]
  ]
};