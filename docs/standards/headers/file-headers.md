# En-têtes de Fichiers

## 📝 EN-TÊTES OBLIGATOIRES POUR CLAUDE CODE

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

## 📋 RÈGLES GÉNÉRALES

- **Obligatoire**: `@fileoverview`, `@description`, `@dependencies`
- **Recommandé**: `@exports`, `@related`, `@notes`
- **Conditionnel**: autres tags selon le type de fichier
- **Mise à jour**: modifier `@lastModified` à chaque changement significatif
- **Liens**: utiliser des chemins relatifs pour `@related` et `@usage`