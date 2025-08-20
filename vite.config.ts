/**
 * @fileoverview Configuration Vite pour l'architecture Electron + React + TypeScript
 * @description Configuration build pour Electron avec React, TypeScript et Tailwind
 * @environment Build process optimisé avec support développement et production
 * @dependencies vite, vite-plugin-electron, @vitejs/plugin-react
 * @customization Configuration optimisée pour Electron + React + TypeScript
 * @validation Compatible avec TypeScript et Tailwind CSS
 * @related tsconfig.json, tailwind.config.js, postcss.config.js
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron/simple';
import renderer from 'vite-plugin-electron-renderer';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  // Configuration des plugins
  plugins: [
    // Plugin React avec support TypeScript
    react(),
    
    // Plugin Tailwind CSS v4 officiel pour Vite
    tailwindcss(),
    
    // Plugin Electron avec configuration simple
    electron({
      main: {
        entry: 'src/electron/main/main.ts',
        vite: {
          build: {
            outDir: 'dist/electron',
            minify: false,
            rollupOptions: {
              external: ['electron', 'path', 'fs', 'fs/promises'],
              output: {
                format: 'cjs'
              }
            }
          }
        }
      },
      preload: {
        input: 'src/electron/preload/preload.ts',
        vite: {
          build: {
            outDir: 'dist/electron',
            minify: false,
            rollupOptions: {
              external: ['electron'],
              output: {
                format: 'cjs'
              }
            }
          }
        }
      },
    }),
    
    // Plugin renderer pour le support Electron dans le renderer
    renderer()
  ],

  // Configuration de base
  base: './',
  
  // Configuration du serveur de développement avec HMR
  server: {
    port: 3000,
    strictPort: false, // Permet de chercher un port libre automatiquement
    hmr: {
      port: 3001,
      clientPort: 3001
    },
    // Gestion intelligente des ports
    host: 'localhost',
    force: true // Force la régénération du cache
  },

  // Configuration des alias et résolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/electron': path.resolve(__dirname, 'src/electron')
    }
  },

  // Configuration CSS - PostCSS non nécessaire avec plugin Vite Tailwind v4

  // Configuration de build
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      // Configuration spécifique pour Electron
      external: [],
      input: {
        main: 'src/electron/renderer/index.html'
      },
      output: {
        format: 'es'
      }
    }
  },

  // Optimisations
  optimizeDeps: {
    // Pré-bundler les dépendances pour de meilleures performances
    include: [
      'react',
      'react-dom'
    ],
    exclude: [
      'electron'
    ]
  },

  // Configuration pour Electron
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },

  // Configuration environnement
  envPrefix: 'VITE_',
  
  // Configuration des workers
  worker: {
    format: 'es'
  }
});