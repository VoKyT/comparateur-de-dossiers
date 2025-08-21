# Installation & Configuration

## 📋 POLITIQUE DE VERSIONS

- Utiliser les dernières versions stables disponibles (tags `@latest`)
- Ne figer des versions que si une régression connue l'impose (documenter la raison)
- Environnement recommandé: Node.js ≥ 20, npm ≥ 10 (Windows PowerShell)

## 🔗 LIENS OFFICIELS

- **shadcn/ui**: `https://ui.shadcn.com` - Composants modernes copy-paste
- **React**: `https://react.dev`
- **Tailwind CSS**: `https://tailwindcss.com`
- **Vite**: `https://vitejs.dev`
- **Radix UI**: `https://radix-ui.com`

## 🚀 INITIALISATION COMPLÈTE DU PROJET

### Initialisation Node.js
```bash
npm init -y
```

### React + TypeScript
```bash
npm install react@latest react-dom@latest
npm install -D typescript@latest @types/react@latest @types/react-dom@latest
npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --jsx react-jsx
```

### Tailwind CSS
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

### Vite
```bash
npm install -D vite@latest @vitejs/plugin-react@latest vite-plugin-electron@latest
```

### Electron (si nécessaire)
```bash
npm install -D electron@latest
```

## ⚙️ CONFIGURATION TAILWIND POUR ELECTRON + REACT

### tailwind.config.js
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/electron/renderer/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
```

### src/styles/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-system;
  }
}
```

## 📜 SCRIPTS RECOMMANDÉS ET OBLIGATOIRES

- `start`: lance Electron avec le process `main` (build complet puis run)
- `dev`: **SCRIPT PRINCIPAL DE DÉVELOPPEMENT** - lance Electron avec Hot Module Replacement (HMR) automatique
- `build`: construit l'app (ex: via `electron-builder` ou `electron-forge`)

## 🔧 RÈGLES D'IMPORTS ET SYNTAXE

### Syntaxe par environnement
- **Syntaxe ES6 recommandée**: Préférer `import` (ES6) quand c'est compatible avec l'environnement
- **CommonJS acceptée**: Utiliser `require` (CommonJS) quand nécessaire pour la compatibilité
- **Cohérence par fichier**: Ne pas mélanger ES6 et CommonJS dans le même fichier

### Exemples par contexte
```typescript
// ✅ Process Renderer (React) - ES6 recommandé
import React from 'react';
import { useState } from 'react';

// ✅ Process Main (Electron) - CommonJS souvent requis
const { app, BrowserWindow } = require('electron');
const path = require('path');

// ✅ Preload (sécurité) - Selon contexte
const { contextBridge, ipcRenderer } = require('electron');
```

### Configuration flexible
- **package.json** : Pas forcément `"type": "module"` (selon compatibilité)
- **vite.config** : Format selon l'outil utilisé
- **postcss.config.js** : Format selon l'intégration
- **TypeScript** : Configuration compatible avec les deux syntaxes

### Règles d'imports
- **Imports relatifs**: uniquement dans le même dossier (`./`, `../`)
- **Imports absolus**: pour tout le reste, via alias (`@/features/`, `@/shared/`)
- **Barrel exports**: chaque dossier expose son API via `index.ts`
- **Pas d'imports circulaires**: utiliser l'inversion de dépendance si nécessaire