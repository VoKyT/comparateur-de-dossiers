# Standards de Code

## 📝 EN-TÊTES DE FICHIERS (POUR CLAUDE CODE)

### Fichiers TypeScript
```typescript
/**
 * @fileoverview [Description courte du rôle du fichier]
 * @description [Description détaillée de la fonctionnalité, responsabilités, interactions]
 * @author [Nom ou équipe]
 * @created [Date de création]
 * @lastModified [Date de dernière modification]
 * @dependencies [Liste des dépendances externes et internes critiques]
 * @exports [Ce que le fichier exporte: classes, fonctions, types, interfaces]
 * @imports [Imports principaux et leur rôle]
 * @usage [Exemples d'usage ou liens vers la documentation]
 * @related [Fichiers liés: composants parents/enfants, services, utils]
 * @notes [Notes importantes: limitations, TODOs, considérations de performance]
 */
```

### Fichiers React (composants)
```typescript
/**
 * @fileoverview [Nom du composant et son rôle principal]
 * @description [Fonctionnalité du composant, props attendues, comportement]
 * @props [Interface des props avec types et descriptions]
 * @state [État local géré par le composant]
 * @events [Événements émis (onClick, onChange, etc.)]
 * @dependencies [Hooks utilisés, librairies externes]
 * @parent [Composant parent qui utilise ce composant]
 * @children [Composants enfants rendus par ce composant]
 * @styling [Classes Tailwind, CSS modules, ou styling utilisé]
 * @accessibility [Attributs ARIA, navigation clavier, etc.]
 * @performance [Optimisations: memo, useMemo, useCallback]
 * @testing [Tests unitaires associés, cas de test principaux]
 */
```

### Fichiers Electron (main/preload)
```javascript
/**
 * @fileoverview [Process: main, renderer, ou preload]
 * @description [Rôle dans l'architecture Electron, responsabilités]
 * @security [Permissions, contextIsolation, nodeIntegration]
 * @ipc [Channels IPC exposés ou consommés]
 * @apis [APIs système utilisées: fs, path, etc.]
 * @lifecycle [Événements de cycle de vie gérés]
 * @dependencies [Modules Electron et Node.js utilisés]
 * @related [Fichiers renderer ou main associés]
 */
```

### Fichiers de configuration
```javascript
/**
 * @fileoverview [Type de configuration: vite, tailwind, electron, etc.]
 * @description [Objectif de cette configuration, ce qu'elle contrôle]
 * @environment [Environnement: dev, prod, test]
 * @dependencies [Outils qui utilisent cette config]
 * @customization [Options personnalisées et leur raison]
 * @validation [Règles de validation ou schémas]
 * @related [Autres fichiers de config liés]
 */
```

### Fichiers de types/interfaces
```typescript
/**
 * @fileoverview [Domaine des types: API, UI, business logic]
 * @description [Contexte d'utilisation de ces types/interfaces]
 * @types [Liste des types principaux définis]
 * @interfaces [Interfaces et leurs propriétés clés]
 * @enums [Énumérations et leurs valeurs]
 * @unions [Types union et leurs cas d'usage]
 * @validation [Règles de validation ou contraintes]
 * @usage [Fichiers qui utilisent ces types]
 * @related [Types similaires dans d'autres fichiers]
 */
```

## 📋 RÈGLES GÉNÉRALES POUR LES EN-TÊTES

- **Obligatoire**: `@fileoverview`, `@description`, `@dependencies`
- **Recommandé**: `@exports`, `@related`, `@notes`
- **Conditionnel**: autres tags selon le type de fichier
- **Mise à jour**: modifier `@lastModified` à chaque changement significatif
- **Liens**: utiliser des chemins relatifs pour `@related` et `@usage`

## 🔤 RÈGLES DE NOMMAGE

### Dossiers
- **Format**: `kebab-case` 
- **Exemples**: `user-management`, `file-comparison`

### Fichiers
- **Composants**: `PascalCase` (ex: `FolderSelector.tsx`)
- **Autres**: `camelCase` (ex: `utils.ts`, `hooks.ts`)

### Exports
- **Noms explicites**: pas de `export default` sauf pour les composants React
- **Descriptifs**: éviter les noms génériques comme `data`, `item`

### Variables et fonctions
- **camelCase**: `folderPath`, `handleClick`
- **Constants**: `UPPER_SNAKE_CASE` (ex: `MAX_FILE_SIZE`)

### Types et interfaces
- **PascalCase**: `ComparisonResult`, `FolderInfo`
- **Interfaces**: préfixer par `I` si nécessaire (ex: `IApiResponse`)

## 📦 ORGANISATION DES IMPORTS

### Ordre des imports
1. **React** et libraries externes
2. **Imports internes** (features, shared)
3. **Imports relatifs** (même dossier)
4. **Imports types** (séparés si possible)

### Exemple
```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// 2. Internal imports
import { useFolderComparison } from '@/features/folder-comparison';
import { compareFiles } from '@/shared/utils';

// 3. Relative imports
import './FolderSelector.css';

// 4. Types
import type { ComparisonResult } from './types';
```

## 📁 STRUCTURE DES BARREL EXPORTS

### index.ts dans chaque dossier
```typescript
// features/folder-comparison/index.ts
export { FolderSelector } from './components/FolderSelector';
export { ComparisonResult } from './components/ComparisonResult';
export { useFolderComparison } from './hooks/useFolderComparison';
export type { ComparisonData } from './types/comparison';
```

## 🧹 BONNES PRATIQUES DE CODE

### Composants React
- **Functional components** uniquement
- **Hooks** pour la logique d'état
- **Props typing** avec TypeScript obligatoire
- **Memo** pour optimisation si nécessaire

### TypeScript
- **Type strict** activé
- **Interfaces** pour les objets complexes
- **Types union** pour les valeurs limitées
- **Generic types** pour la réutilisabilité

### Performance
- **useMemo** pour les calculs coûteux
- **useCallback** pour les fonctions passées en props
- **React.memo** pour éviter les re-renders inutiles

## 🚫 PRATIQUES À ÉVITER

- **Any types**: toujours typer précisément
- **Console.log** en production: utiliser un système de logging
- **Inline styles**: utiliser Tailwind CSS
- **God components**: diviser en sous-composants
- **Props drilling**: utiliser Context ou state management