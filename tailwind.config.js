/**
 * @fileoverview Configuration Tailwind pour l'architecture Electron + React
 * @description Configuration Tailwind CSS adaptée pour l'intégration dans Electron
 * @environment Electron renderer process avec React
 * @dependencies tailwindcss, postcss, autoprefixer
 * @customization Thème adapté pour desktop avec polices système
 * @validation Configuration compatible avec l'architecture modulaire
 * @related src/styles/globals.css, src/components/
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/electron/renderer/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      colors: {
        // Couleurs personnalisées pour l'application desktop
        'app-primary': '#667eea',
        'app-secondary': '#764ba2',
        'app-background': '#f8fafc',
        'app-surface': '#ffffff',
        'app-text': '#334155',
        'app-text-secondary': '#64748b'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.8s ease-out'
      }
    },
  },
  plugins: [],
  darkMode: 'media' // Utilise la préférence système
}
