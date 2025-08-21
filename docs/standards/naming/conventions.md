# Conventions de Nommage

## 🔤 RÈGLES DE NOMMAGE OBLIGATOIRES

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

## 📁 ORGANISATION DES IMPORTS

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

## 📦 STRUCTURE DES BARREL EXPORTS

### index.ts dans chaque dossier
```typescript
// features/folder-comparison/index.ts
export { FolderSelector } from './components/FolderSelector';
export { ComparisonResult } from './components/ComparisonResult';
export { useFolderComparison } from './hooks/useFolderComparison';
export type { ComparisonData } from './types/comparison';
```