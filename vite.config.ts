/**
 * @fileoverview Configuration Vite pour application web React + TypeScript
 * @description Configuration optimisée pour app web avec React, TypeScript et Tailwind
 * @environment Build process moderne avec hot reload et optimisations
 * @dependencies vite, @vitejs/plugin-react, @tailwindcss/vite
 * @customization Configuration optimisée pour développement web pur
 * @validation Compatible avec TypeScript et Tailwind CSS v4
 * @related tsconfig.json, tailwind.config.js, postcss.config.js
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  // Configuration des plugins pour app web
  plugins: [
    // Plugin React avec support TypeScript
    react(),
    
    // Plugin Tailwind CSS v4 officiel pour Vite
    tailwindcss(),
  ],

  // Configuration de base
  base: './',
  
  // Configuration du serveur de développement avec HMR
  server: {
    port: 3000,
    strictPort: false, // Permet de chercher un port libre automatiquement
    open: true, // Ouvre automatiquement le navigateur
    host: 'localhost'
  },

  // Configuration des alias et résolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/lib': path.resolve(__dirname, 'src/lib')
    }
  },

  // Configuration de build optimisée
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
    sourcemap: true
  },

  // Optimisations pour app web
  optimizeDeps: {
    include: [
      'react',
      'react-dom'
    ]
  },

  // Configuration environnement
  envPrefix: 'VITE_'
});