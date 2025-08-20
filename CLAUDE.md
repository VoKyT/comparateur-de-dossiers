# Règles Claude Code - Comparateur de dossiers

## 🎨 RÈGLE ABSOLUE - TOUT DOIT ÊTRE ESTHÉTIQUE
**PRINCIPE FONDAMENTAL : L'ESTHÉTISME AVANT TOUT**
- ✅ **TOUTE INTERFACE** doit être visuellement magnifique et moderne
- ✅ **CHAQUE COMPOSANT** doit avoir un design soigné et professionnel
- ✅ **PRIVILÉGIER LA BEAUTÉ** : si c'est moche, c'est inacceptable
- ✅ **UTILISER DES FRAMEWORKS MODERNES** pour un rendu esthétique optimal
- ✅ **ANIMATIONS FLUIDES** et transitions élégantes obligatoires
- ✅ **COULEURS HARMONIEUSES** et typographie moderne

**Frameworks esthétiques recommandés (par ordre de préférence) :**
1. **shadcn/ui** - LE framework moderne 2025, 200+ composants copy-paste, Radix UI + Tailwind CSS
2. **Mantine** - Design système moderne, +100 composants esthétiques
3. **Chakra UI** - Interface élégante, excellent UX/UI
4. **Material UI** - Design Google, très populaire et raffiné
5. **Ant Design** - Professionnel, niveau entreprise
6. **Tailwind CSS** - Contrôle total, design custom moderne

**JAMAIS de design basique ou laid - L'esthétisme est NON-NÉGOCIABLE**

## 📱 RÈGLE ABSOLUE - RESPONSIVITÉ PARFAITE OBLIGATOIRE
**PRINCIPE FONDAMENTAL : ADAPTATION TOTALE À TOUS LES ÉCRANS**
- ✅ **TOUTE INTERFACE** doit s'adapter parfaitement à toutes les tailles d'écran
- ✅ **MOBILE FIRST** : Concevoir d'abord pour mobile, puis étendre
- ✅ **BREAKPOINTS TAILWIND** : Utiliser sm:, md:, lg:, xl:, 2xl: systématiquement
- ✅ **TYPOGRAPHIE ADAPTIVE** : Tailles de texte qui s'adaptent selon l'écran
- ✅ **ESPACEMENTS VARIABLES** : Marges et paddings responsive
- ✅ **CONTENUS CONSTANTS** : Même texte sur tous écrans, seule la taille change
- ✅ **INTERACTIONS TACTILES** : Boutons suffisamment grands pour le touch
- ✅ **NAVIGATION FLUIDE** : Menus hamburgers, sidebars collapsibles

**Breakpoints Tailwind obligatoires :**
- **Mobile** : Par défaut (< 640px) - Interface tactile optimisée
- **SM** : `sm:` (≥ 640px) - Tablette portrait
- **MD** : `md:` (≥ 768px) - Tablette paysage
- **LG** : `lg:` (≥ 1024px) - Desktop standard
- **XL** : `xl:` (≥ 1280px) - Grand écran
- **2XL** : `2xl:` (≥ 1536px) - Écran ultra-large

**Règles responsives non-négociables :**
- ✅ **Textes adaptatifs** : `text-sm sm:text-base md:text-lg lg:text-xl`
- ✅ **Espacements progressifs** : `px-4 sm:px-6 md:px-8 lg:px-12`
- ✅ **Conteneurs limités** : `max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl`
- ✅ **Icônes scalables** : `h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6`
- ✅ **Textes constants** : Même contenu sur tous écrans, adaptation par la taille uniquement
- ✅ **Grilles responsives** : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

**Tests obligatoires :**
- ✅ **Mobile** : iPhone SE (375px), iPhone 12 (390px)
- ✅ **Tablette** : iPad (768px), iPad Pro (1024px)  
- ✅ **Desktop** : 1280px, 1440px, 1920px, 2560px
- ✅ **Orientation** : Portrait ET paysage sur tous devices

**Règles de contenu responsif :**
- ✅ **TEXTE CONSTANT** : Même contenu textuel sur toutes les tailles d'écran
- ✅ **TAILLE ADAPTIVE** : Seules les tailles de police s'adaptent (`text-sm sm:text-base md:text-lg`)
- ❌ **JAMAIS de texte différent** selon l'écran (pas de `hidden sm:inline`)
- ❌ **JAMAIS de contenu tronqué** sur mobile
- ✅ **LISIBILITÉ GARANTIE** : Le texte doit rester lisible sur le plus petit écran

**JAMAIS d'interface qui casse sur mobile - La responsivité est NON-NÉGOCIABLE**

## ⚠️ RÈGLE CRITIQUE - PAS DE SURENGINEERING
**QUAND L'UTILISATEUR DEMANDE QUELQUE CHOSE DANS LE TCHAT :**
- ✅ **FAIRE EXACTEMENT** ce qui est demandé, rien de plus
- ❌ **NE PAS AJOUTER** de fonctionnalités non demandées
- ❌ **NE PAS CRÉER** d'interface complexe si c'est pas demandé
- ❌ **NE PAS FAIRE** de "améliorations" non sollicitées
- ✅ **RESTER SIMPLE** et répondre précisément à la demande
- ✅ **DEMANDER** si l'utilisateur veut plus avant d'ajouter
- ✅ **MAIS TOUJOURS ESTHÉTIQUE** - même simple, ça doit être beau

**Exemple :**
- Demande: "Un bouton au centre" → Réponse: UN bouton au centre esthétique, point final
- Demande: "Changer la couleur" → Réponse: Changer pour une couleur harmonieuse et moderne

## ⚠️ RÈGLE CLAUDE CODE - MODE THINK OBLIGATOIRE
**TOUJOURS UTILISER LE MODE "THINK" :**
- ✅ **ACTIVER** le mode think de Claude Code pour TOUTES les tâches
- ✅ **RÉFLÉCHIR PROFONDÉMENT** avant d'agir, planifier les étapes
- ✅ **ANALYSER** le contexte et les implications des actions
- ✅ **VÉRIFIER** la cohérence avec les règles du projet
- ✅ **ANTICIPER** les problèmes potentiels et les solutions
- ❌ **JAMAIS** d'actions impulsives sans réflexion préalable

**Objectif :** Garantir une réflexion approfondie et structurée pour éviter les erreurs ou oublis.

## Description du projet
- **Objectif**: Application Electron pour comparer le contenu de deux dossiers et identifier les différences.
- **Fonctionnalités principales**: 
  - Interface graphique pour sélectionner les dossiers à comparer
  - Algorithme de comparaison (fichiers présents/absents, tailles, dates de modification)
  - Affichage des résultats avec différences mises en évidence
  - Export des résultats (JSON, CSV, rapport)
- **Public cible**: Utilisateurs Windows ayant besoin de synchroniser ou vérifier des dossiers
- **Stack technique**: Electron + React + TypeScript + Tailwind CSS

## Architecture technique obligatoire

### Stack imposée
- **Electron** : Framework desktop principal (process main, renderer, preload)
- **React** : Librairie UI pour tous les composants interface
- **TypeScript** : Langage obligatoire pour tout le code applicatif
- **Tailwind CSS** : Framework CSS utilitaire pour tout le styling
- **Vite** : Build tool moderne avec hot reload et optimisations

### Intégration Electron + React + Tailwind
- **Process Main** : Electron pur (Node.js + Electron APIs)
- **Process Renderer** : React + TypeScript + Tailwind CSS
- **Process Preload** : TypeScript avec APIs Electron sécurisées
- **Communication** : IPC sécurisé via contextBridge uniquement
- **Styling** : Tailwind CSS exclusivement, pas de CSS custom sauf exceptions documentées

### Architecture modulaire obligatoire
```
src/
├── electron/                    # Code Electron natif
│   ├── main/                   # Process principal Electron
│   │   ├── main.ts             # Point d'entrée principal
│   │   ├── window-manager.ts   # Gestion des fenêtres
│   │   └── ipc-handlers.ts     # Handlers IPC sécurisés
│   ├── preload/                # Scripts preload sécurisés
│   │   └── preload.ts          # API sécurisée via contextBridge
│   └── renderer/               # Interface React
│       └── index.html          # Shell HTML minimal
├── components/                  # Composants React + Tailwind
│   ├── ui/                     # Composants UI génériques
│   │   ├── Button.tsx          # Boutons avec variants Tailwind
│   │   ├── Modal.tsx           # Modales réutilisables
│   │   └── index.ts            # Barrel export
│   └── layout/                 # Composants de mise en page
│       ├── Header.tsx          # En-tête application
│       ├── Sidebar.tsx         # Barre latérale
│       └── index.ts            # Barrel export
├── features/                    # Modules métier React
│   ├── folder-comparison/       # Feature comparaison
│   │   ├── components/         # Composants React spécifiques
│   │   │   ├── FolderSelector.tsx
│   │   │   ├── ComparisonResult.tsx
│   │   │   └── index.ts
│   │   ├── hooks/              # Hooks React personnalisés
│   │   │   ├── useFolderComparison.ts
│   │   │   └── index.ts
│   │   ├── types/              # Types TypeScript
│   │   │   ├── comparison.ts
│   │   │   └── index.ts
│   │   └── index.ts            # Point d'entrée feature
│   └── settings/               # Feature paramètres
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── index.ts
├── shared/                      # Code partagé React/TS
│   ├── types/                  # Types globaux TypeScript
│   ├── utils/                  # Utilitaires purs TypeScript
│   ├── hooks/                  # Hooks React partagés
│   └── constants/              # Constantes TypeScript
├── styles/                      # Configuration Tailwind
│   ├── globals.css             # Imports Tailwind + custom CSS minimal
│   └── tailwind.config.js      # Configuration Tailwind
└── App.tsx                     # Composant racine React
```

### Règles d'intégration strictes
1. **Electron Main** : Aucun import React, uniquement Electron/Node.js APIs
2. **React Components** : Obligatoirement TypeScript + Tailwind classes
3. **Communication IPC** : Via contextBridge uniquement, typée TypeScript
4. **State Management** : React hooks (useState, useContext, zustand si complexe)
5. **Styling** : Tailwind utility classes, pas de CSS inline ou modules
6. **Build** : Vite pour bundle React dans Electron renderer

### Points d'intégration clés
- **Electron → React** : Chargement du bundle React dans BrowserWindow
- **React → Electron** : Via window.electronAPI (contextBridge)
- **TypeScript** : Configuration partagée pour Electron et React
- **Tailwind** : Build CSS intégré dans le processus Electron

## Installation et configuration

### Politique de versions
- Utiliser les dernières versions stables disponibles (tags `@latest`).
- Ne figer des versions que si une régression connue l'impose (documenter la raison).
- Environnement recommandé: Node.js ≥ 20, npm ≥ 10 (Windows PowerShell).

### Liens officiels
- **shadcn/ui**: `https://ui.shadcn.com` - Composants modernes copy-paste
- React: `https://react.dev`
- Tailwind CSS: `https://tailwindcss.com`
- Electron: `https://www.electronjs.org`
- Vite: `https://vitejs.dev`

### Initialisation complète du projet
```bash
# Initialisation Node.js
npm init -y

# React + TypeScript
npm install react@latest react-dom@latest
npm install -D typescript@latest @types/react@latest @types/react-dom@latest
npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --jsx react-jsx

# Tailwind CSS
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p

# Vite
npm install -D vite@latest @vitejs/plugin-react@latest vite-plugin-electron@latest

# Electron
npm install -D electron@latest
```

### Configuration Tailwind pour Electron + React
```javascript
// tailwind.config.js
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

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-system;
  }
}
```

### Scripts recommandés et obligatoires
- `start`: lance Electron avec le process `main` (build complet puis run).
- `dev`: **SCRIPT PRINCIPAL DE DÉVELOPPEMENT** - lance Electron avec Hot Module Replacement (HMR) automatique.
- `build`: construit l'app (ex: via `electron-builder` ou `electron-forge`).

### ⚠️ RÈGLE OBLIGATOIRE - HOT RELOAD VITE TOUJOURS ACTIVÉ
**L'APPLICATION DOIT TOUJOURS ÊTRE EN HOT RELOAD AVEC VITE PENDANT LE DÉVELOPPEMENT :**
- ✅ **PROCÉDURE OBLIGATOIRE** : 
  1. Terminal 1 : `npm run vite:dev` (attendre "VITE ready")
  2. Terminal 2 : `npm run electron:dev` (attendre logs de synchronisation)
- ✅ **HMR Vite activé** : modifications React/TypeScript mises à jour instantanément
- ✅ **Pas de redémarrage manuel** : Hot Module Replacement automatique
- ⚠️ **`npm run dev` moins fiable** : problèmes de timing Vite/Electron
- ❌ **JAMAIS utiliser `npm start`** pendant le développement (trop lent)
- ✅ **`npm start` uniquement** pour tester la version finale
- ✅ **Modification main.ts** : Redémarrage automatique d'Electron via electronmon
- ✅ **Modification React/CSS** : Mise à jour instantanée sans redémarrage

**Objectif :** Développement fluide avec hot reload Vite pour une productivité maximale.

## ⚠️ RÈGLE OBLIGATOIRE - NETTOYAGE AUTOMATIQUE DES PORTS
**TOUJOURS NETTOYER LES PORTS AUTOMATIQUEMENT AU LANCEMENT DE L'APPLICATION :**
- ✅ **NETTOYAGE AUTOMATIQUE** : L'application nettoie automatiquement les ports dès qu'elle se lance
- ✅ **TIMING** : **AU DÉMARRAGE DE L'APPLICATION** - avant toute connexion réseau
- ✅ **PORTS CONCERNÉS** : 3000 (Vite), 3001 (WebSocket), 3002 (Alternatif)
- ✅ **IMPLEMENTATION** : Script `scripts/kill-ports.cjs` intégré dans Electron main.ts
- ✅ **SILENCIEUX** : Nettoyage invisible sans fenêtres CMD parasites
- ✅ **MULTI-PLATEFORME** : Windows (netstat + taskkill), Unix (lsof + kill)

### Scripts de nettoyage disponibles
- `npm run kill-ports` : Nettoie ports 3000, 3001, 3002
- `npm run kill-ports:all` : Nettoie tous ports dev (3000, 3001, 3002, 5173, 8080)
- `npm run dev` : Lance dev avec nettoyage automatique
- `npm run dev:clean` : Clean + kill-ports + dev complet

### Intégration automatique
**LE NETTOYAGE EST INTÉGRÉ AUTOMATIQUEMENT AU LANCEMENT DE L'APPLICATION :**
- ✅ **Au démarrage d'Electron** : `killPorts()` appelé dans `app.whenReady()` AVANT toute autre action
- ✅ **Séquence obligatoire** : Lancement app → Nettoyage ports → Chargement interface
- ✅ **Scripts npm** : Nettoyage avant chaque lancement de serveur de développement
- ✅ **Logs détaillés** : IDs uniques `[AUTO_KILL]` et `[KILL_PORTS]` pour traçabilité
- ✅ **Gestion d'erreurs** : Continue même si certains ports échouent

**RÈGLE ABSOLUE : Dès qu'on lance l'application, les ports sont automatiquement nettoyés !**

**Objectif :** Éliminer définitivement les problèmes de ports occupés au démarrage de l'application.

## ⚠️ RÈGLE CRITIQUE - TEST AUTOMATIQUE DES NOUVELLES FONCTIONNALITÉS

### Test obligatoire après chaque développement
**APRÈS chaque nouvelle fonctionnalité développée :**
1. ✅ **AJOUTER DES LOGS** spécifiques pour la fonctionnalité
2. ✅ **TESTER AUTOMATIQUEMENT** via `npm start` 
3. ✅ **VÉRIFIER LES LOGS** dans la console pour confirmer le bon fonctionnement
4. ✅ **TESTER MANUELLEMENT** si nécessaire (clics, interactions)
5. ✅ **MARQUER COMME COMPLÉTÉ** seulement si tout fonctionne

### Stratégie de logs pour tests
**TOUJOURS ajouter des logs console UNIQUES pour :**
- ✅ **Initialisation** : `console.log('🆕 [NOM_FEATURE] [ID_UNIQUE] initialisée')`
- ✅ **Actions utilisateur** : `console.log('👆 [NOM_FEATURE] [ID_UNIQUE] action: [DESCRIPTION]')`
- ✅ **Succès** : `console.log('✅ [NOM_FEATURE] [ID_UNIQUE] succès: [RÉSULTAT]')`
- ✅ **Erreurs** : `console.error('❌ [NOM_FEATURE] [ID_UNIQUE] erreur:', error)`
- ✅ **État** : `console.log('📊 [NOM_FEATURE] [ID_UNIQUE] état:', data)`

### Règles pour les IDs uniques de logs
**OBLIGATOIRE : Chaque fonctionnalité doit avoir un ID unique facilement identifiable**
- Format : `[FEATURE_ACTION_NUMERO]` ou `[FEATURE_STEP_XX]`
- Exemples : `[FOLDER_SELECT_01]`, `[COMPARISON_START_02]`, `[EXPORT_CSV_03]`
- **Incrémentation** : Toujours incrémenter le numéro pour chaque nouveau log d'une feature
- **Recherche facile** : Permet de retrouver rapidement dans la console avec Ctrl+F

**Exemple de logs avec IDs uniques :**
```typescript
// Au démarrage
console.log('🆕 [FOLDER_SELECTOR] [FS_INIT_01] Composant initialisé');

// Action utilisateur  
console.log('👆 [FOLDER_SELECTOR] [FS_CLICK_02] Bouton sélection cliqué');

// Dialog ouvert
console.log('📊 [FOLDER_SELECTOR] [FS_DIALOG_03] Dialog système ouvert');

// Résultat
console.log('✅ [FOLDER_SELECTOR] [FS_SUCCESS_04] Dossier sélectionné:', folderPath);

// Erreur possible
console.error('❌ [FOLDER_SELECTOR] [FS_ERROR_05] Sélection annulée par utilisateur');
```

### Avantages des IDs uniques
- ✅ **Recherche rapide** : `Ctrl+F "FS_INIT_01"` trouve instantanément le log
- ✅ **Debug précis** : Identifie exactement quelle étape a échoué  
- ✅ **Suivi chronologique** : L'ordre des numéros indique la séquence
- ✅ **Documentation automatique** : Les logs servent de trace d'exécution

### Process de test automatique
1. **Développement** → Ajouter logs immédiatement
2. **Build** → `npm run build` 
3. **Test** → `npm start` et vérifier logs console
4. **Validation** → Confirmer que les logs correspondent au comportement attendu
5. **Commit** → Seulement si tous les tests passent

### Règles pour les commandes terminal
- **JAMAIS de "&&" en début de commande** : Les commandes doivent être écrites individuellement, une par ligne
- **Format obligatoire** : Chaque commande sur sa propre ligne dans les blocs bash
- **Séparation claire** : Utiliser des commentaires ou des lignes vides entre groupes de commandes
- **Exemple correct** :
```bash
# Installation des dépendances
npm install react@latest
npm install -D typescript@latest

# Configuration initiale
npx tsc --init
```
- **Exemple incorrect** :
```bash
&& npm install react@latest
&& npm install -D typescript@latest
```

## Règles de développement

### En-têtes de fichiers (pour Claude Code)

#### Fichiers TypeScript
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

#### Fichiers React (composants)
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

#### Fichiers Electron (main/preload)
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

#### Fichiers de configuration
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

#### Fichiers de types/interfaces
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

### Règles générales pour les en-têtes
- **Obligatoire**: `@fileoverview`, `@description`, `@dependencies`
- **Recommandé**: `@exports`, `@related`, `@notes`
- **Conditionnel**: autres tags selon le type de fichier
- **Mise à jour**: modifier `@lastModified` à chaque changement significatif
- **Liens**: utiliser des chemins relatifs pour `@related` et `@usage`

### Principes de modularité
- **Une responsabilité par module**: chaque fichier/dossier a un rôle unique et bien défini.
- **Couplage faible**: les modules communiquent via des interfaces claires, pas de dépendances directes.
- **Cohésion forte**: regrouper les éléments qui changent ensemble dans le même module.
- **Inversion de dépendance**: les modules de haut niveau ne dépendent pas des détails d'implémentation.

### Règles d'imports et syntaxe
- **Syntaxe ES6 recommandée**: Préférer `import` (ES6) quand c'est compatible avec l'environnement
- **CommonJS acceptée**: Utiliser `require` (CommonJS) quand nécessaire pour la compatibilité
- **Cohérence par fichier**: Ne pas mélanger ES6 et CommonJS dans le même fichier
- **Imports relatifs**: uniquement dans le même dossier (`./`, `../`).
- **Imports absolus**: pour tout le reste, via alias (`@/features/`, `@/shared/`).
- **Barrel exports**: chaque dossier expose son API via `index.ts`.
- **Pas d'imports circulaires**: utiliser l'inversion de dépendance si nécessaire.

**Cas d'usage par environnement :**
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

**Configuration flexible :**
- **package.json** : Pas forcément `"type": "module"` (selon compatibilité)
- **vite.config** : Format selon l'outil utilisé
- **postcss.config.js** : Format selon l'intégration
- **TypeScript** : Configuration compatible avec les deux syntaxes

### Isolation des features
- Une feature ne doit **jamais** importer directement une autre feature.
- Communication inter-features via des événements, context, ou services partagés.
- Chaque feature doit pouvoir être supprimée sans casser le reste.

### Règles de nommage
- **Dossiers**: `kebab-case` (`user-management`, `file-comparison`).
- **Fichiers**: `PascalCase` pour composants, `camelCase` pour le reste.
- **Exports**: noms explicites, pas de `export default` sauf pour les composants React.

### Séparation des préoccupations
- **UI**: uniquement dans les composants, pas de logique métier.
- **Business logic**: dans les services, pas dans les composants.
- **State management**: hooks personnalisés ou context, isolé par feature.
- **Side effects**: dans les services ou hooks, pas directement dans les composants.

### Validation avant ajout/modification
Avant d'ajouter une fonctionnalité, vérifier:
1. **Existence préalable**: TOUJOURS demander à Claude Code de vérifier si cette fonctionnalité existe déjà dans le codebase
   - Question recommandée: *"Avant de développer [FONCTIONNALITÉ], peux-tu vérifier dans tout le codebase si cette fonctionnalité ou une partie similaire existe déjà ? Si oui, indique-moi où elle se trouve et si je peux la réutiliser/étendre plutôt que la recréer."*
   - Rechercher dans tous les fichiers : composants, services, hooks, types, utils
   - Vérifier les fonctionnalités partielles qui pourraient être étendues
   - Éviter la duplication de code et les reimplementations inutiles
2. **Emplacement**: dans quel module/feature cette fonctionnalité appartient-elle ?
3. **Dépendances**: quels sont les imports nécessaires ? Sont-ils autorisés ?
4. **Interface**: comment cette fonctionnalité expose-t-elle son API ?
5. **Tests**: comment tester cette fonctionnalité de manière isolée ?
6. **Documentation**: quel impact sur le README et la doc d'architecture ?
7. **Gitignore**: faut-il ajouter des exclusions dans le .gitignore ?

### Anti-patterns à éviter
- **God objects**: fichiers > 200 lignes (sauf cas exceptionnels documentés).
- **Couplage fort**: imports directs entre features.
- **Logique dans les composants**: calculs complexes, appels API directs.
- **Barrel exports trop larges**: exposer uniquement l'API publique.
- **Mixage des responsabilités**: UI + logique métier dans le même fichier.

## Git & versioning

### Conventions de commits
- **Format obligatoire**: `[v1.2.3] type: description courte`
- **Types autorisés**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Exemples**:
  - `[v1.0.1] feat: ajout comparaison de dossiers`
  - `[v1.0.2] fix: correction bug affichage différences`
  - `[v1.1.0] feat: interface utilisateur Electron`

### Versioning sémantique (SemVer)
- **MAJOR** (v2.0.0): changements incompatibles
- **MINOR** (v1.1.0): nouvelles fonctionnalités compatibles
- **PATCH** (v1.0.1): corrections de bugs

### Branches et workflow
- **main**: version stable de production
- **develop**: intégration des nouvelles fonctionnalités
- **feature/nom-fonctionnalité**: développement de nouvelles features
- **hotfix/v1.0.1**: corrections urgentes en production

### Tags Git
- Créer un tag à chaque version: `git tag v1.2.3`
- Pousser les tags: `git push origin --tags`

### Changelog
- Tenir à jour un fichier `CHANGELOG.md` avec les versions et changements
- Format: date, version, type de changements (Added, Changed, Fixed, Removed)

### Gestion du .gitignore
- **Vérification obligatoire** : À chaque ajout ou modification de fonctionnalité, vérifier si des éléments doivent être ajoutés au `.gitignore`
- **Types de fichiers à surveiller** :
  - Nouveaux outils de build (vite cache, rollup cache, etc.)
  - Fichiers de configuration locaux (.env.local, settings.local.json)
  - Dossiers de sortie (build/, dist/, out/, coverage/)
  - Fichiers générés automatiquement (*.generated.*, auto-imports.d.ts)
  - Caches IDE ou d'outils (.cache/, .temp/, .tmp/)
  - Fichiers utilisateur spécifiques (user-data/, preferences/)
  - Certificats et clés privées (*.key, *.pem, *.p12)
- **Règle générale** : Tout ce qui est généré automatiquement, spécifique à l'utilisateur ou sensible doit être exclu
- **Documentation** : Commenter dans le .gitignore les exclusions non évidentes avec leur raison

## Documentation OBLIGATOIRE
- **README.md** : Mettre à jour SYSTÉMATIQUEMENT à chaque modification (fonctionnalités, scripts `npm`, installation, configuration, usage, prérequis, variables d'environnement).
- **ARCHITECTURE.md** : Mettre à jour OBLIGATOIREMENT à chaque changement architectural (nouveau module, migration technologique, réorganisation, nouvelle intégration).
- **CHANGELOG.md** : Si existe, y consigner un résumé des changements; sinon, ajouter une section "Changelog" au `README`.

### ⚠️ RAPPEL CRITIQUE - Documentation
**AVANT de terminer TOUTE tâche de développement :**
1. ✅ Vérifier si le README.md nécessite une mise à jour
2. ✅ Vérifier si ARCHITECTURE.md nécessite une mise à jour
3. ✅ Mettre à jour immédiatement si nécessaire
4. ✅ Committer la documentation en même temps que le code

**Types de changements nécessitant une mise à jour doc :**
- ✅ Nouveau script npm → README
- ✅ Nouvelle technologie → README + ARCHITECTURE
- ✅ Changement structure → ARCHITECTURE
- ✅ Nouvelle dépendance → README
- ✅ Migration majeure → README + ARCHITECTURE + version

## Maintenance du CLAUDE.md

### Vérification avant mise à jour du CLAUDE.md
Avant de modifier ce fichier CLAUDE.md, TOUJOURS vérifier :
- **Question recommandée**: *"Avant de mettre à jour le fichier CLAUDE.md, peux-tu vérifier qu'il n'y a aucune répétition inutile ou redondance entre le contenu que je veux ajouter et l'existant ? Si tu trouves des doublons, des sections qui se chevauchent ou une organisation non optimale, propose-moi une restructuration pour éviter les répétitions et améliorer la lisibilité."*

### Principes de maintenance
- **Pas de duplication** : Chaque règle/information doit apparaître une seule fois
- **Organisation logique** : Regrouper les règles par thème cohérent
- **Sections claires** : Chaque section doit avoir un rôle unique et bien défini
- **Références croisées** : Utiliser des renvois plutôt que de répéter l'information
- **Lisibilité optimale** : Structure facile à naviguer et à comprendre

### Validation post-modification
Après chaque mise à jour du CLAUDE.md :
1. Vérifier qu'aucune information n'est dupliquée
2. S'assurer que l'organisation reste logique
3. Contrôler que la navigation est fluide
4. Valider que chaque section a un objectif distinct

## Maintenance de l'architecture

### Fichier ARCHITECTURE.md obligatoire
- **Lecture systématique** : Claude Code doit TOUJOURS lire `ARCHITECTURE.md` pour comprendre le contexte actuel du projet
- **Mise à jour obligatoire** : À chaque changement architectural significatif, mettre à jour `ARCHITECTURE.md`

### Changements nécessitant une mise à jour
- ✅ **Nouveau module/feature** : Ajout de dossier dans `src/features/`
- ✅ **Nouveau composant principal** : Ajout dans `src/components/`
- ✅ **Nouvelle intégration** : API, service, librairie majeure
- ✅ **Réorganisation** : Changement de structure de dossiers
- ✅ **Migration technologique** : Changement de stack (ex: ajout React)
- ❌ **Fichiers mineurs** : Types, utils, petits correctifs

### Format de mise à jour
Lors de modifications importantes :
1. **Lire d'abord** `ARCHITECTURE.md` pour comprendre l'état actuel
2. **Documenter les changements** dans la section appropriée
3. **Mettre à jour la version** en fin de fichier
4. **Commit** avec message explicite sur l'évolution architecturale