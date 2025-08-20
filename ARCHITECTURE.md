# Architecture - Comparateur de Dossiers

## Vue d'ensemble
Application Electron moderne utilisant **React + TypeScript + Tailwind CSS** pour comparer le contenu de deux dossiers avec une interface utilisateur élégante et moderne.

## Stack technique
- **Framework Desktop** : Electron ^37.3.1
- **UI Framework** : React ^19.1.1 avec hooks modernes
- **Langage** : TypeScript ^5.9.2 (strict mode)
- **Styling** : Tailwind CSS ^4.1.12 + PostCSS
- **Build** : Vite ^7.1.3 + plugins Electron
- **Runtime** : Node.js ≥ 20, npm ≥ 10

## Structure actuelle

### 📁 Racine du projet
```
comparateur_de_dossiers/
├── src/                    # Code source principal
├── node_modules/           # Dépendances npm (ignoré)
├── package.json           # Configuration npm et scripts
├── package-lock.json      # Verrouillage des versions
├── .gitignore            # Exclusions Git
├── .cursorrules          # Règles de développement Cursor
├── README.md             # Documentation utilisateur
├── CHANGELOG.md          # Historique des versions
├── LICENSE               # Licence du projet
└── ARCHITECTURE.md       # Ce fichier
```

### 🔧 Dossier src/ (Code source)
```
src/
├── electron/              # Code Electron TypeScript
│   ├── main/             # Processus principal Electron  
│   │   └── main.ts       # Point d'entrée TS, gestion fenêtres, handlers IPC
│   ├── preload/          # Scripts preload sécurisés
│   │   └── preload.ts    # API contextBridge typée, communication sécurisée
│   └── renderer/         # Interface utilisateur
│       └── index.html    # Shell HTML pour React
├── components/           # Composants React + Tailwind
│   ├── ui/              # Composants UI génériques réutilisables
│   └── layout/          # Composants de mise en page
├── features/            # Modules métier React
│   └── folder-comparison/ # Feature comparaison de dossiers
│       ├── components/   # Composants React spécifiques
│       ├── hooks/       # Hooks React personnalisés
│       └── types/       # Types TypeScript de la feature
├── shared/              # Code partagé TypeScript
│   ├── types/           # Types globaux (electron.ts, etc.)
│   ├── utils/           # Utilitaires TypeScript purs
│   ├── hooks/           # Hooks React partagés
│   └── constants/       # Constantes typées
├── styles/              # Configuration CSS
│   └── globals.css      # Styles Tailwind + CSS custom
├── App.tsx              # Composant React racine
└── index.tsx            # Point d'entrée React
```

## Architecture Electron

### Processus Principal (main.ts)
- **Responsabilité** : Gestion du cycle de vie de l'application
- **Langage** : TypeScript avec typage strict
- **Fonctionnalités** :
  - Création et gestion de la fenêtre principale (1200x800px)
  - Configuration de sécurité renforcée (contextIsolation, sandbox en prod)
  - Handlers IPC typés pour communication avec React
  - Menu d'application multiplateforme avec raccourcis
  - Gestion des événements système (fermeture, activation)
  - APIs système : dialogues, notifications, système de fichiers
- **Sécurité** : Isolation complète du contexte Node.js + validation des entrées

### Script Preload (preload.ts)
- **Responsabilité** : Communication sécurisée et typée entre processus
- **Langage** : TypeScript avec interfaces strictes
- **API exposée typée** (ElectronAPI) :
  - `getVersions()` / `getSystemInfo()` : Informations système
  - `fileSystem` : API de gestion fichiers (selectFolder, readDirectory, getFileStats)
  - `app` : Contrôles fenêtre typés (closeApp, minimizeApp, maximizeApp)
  - `notifications` : Système de notifications typé
  - `preferences` : Gestion thèmes et préférences typées
  - `development` : Outils de développement (mode dev uniquement)
- **Sécurité** : contextBridge exclusivement + validation des paramètres

### Interface React (index.html + App.tsx)
- **Responsabilité** : Interface utilisateur moderne React
- **Architecture** : Single Page Application avec composants
- **Fonctionnalités** :
  - Shell HTML minimal pour React
  - Interface React avec hooks et state management
  - Design system Tailwind CSS avec thèmes
  - Composants réutilisables et modulaires
  - Communication typée avec Electron via window.electronAPI
  - Gestion d'erreurs React avec error boundaries
  - Support responsive et accessibilité

## État du développement

### ✅ Implémenté (v1.1.0)
- [x] **Architecture React + TypeScript + Tailwind complète**
- [x] **Migration complète vers TypeScript** (main.ts, preload.ts)
- [x] **Interface React moderne** avec composants et hooks
- [x] **Build system Vite** avec hot reload et optimisations
- [x] **Communication IPC typée** avec validation des données
- [x] **Design system Tailwind CSS** avec thème personnalisé
- [x] Structure de base Electron sécurisée
- [x] Fenêtre principale fonctionnelle
- [x] Architecture modulaire (features, components, shared)
- [x] Scripts de développement et build optimisés
- [x] Configuration complète (tsconfig, vite, postcss, tailwind)
- [x] Documentation mise à jour

### 🚧 En cours de développement
- [ ] Aucun développement actif

### 📋 À venir (Roadmap)

#### Phase 1 - Migration React + Tailwind ✅ TERMINÉ
- [x] Installation et configuration React + TypeScript
- [x] Configuration Tailwind CSS + PostCSS  
- [x] Migration interface HTML vers composants React
- [x] Structure modulaire des composants
- [x] Build system Vite intégré

#### Phase 2 - Fonctionnalités core
- [ ] Interface de sélection de dossiers
- [ ] Algorithme de comparaison de fichiers
- [ ] Affichage des résultats de comparaison
- [ ] Gestion des erreurs utilisateur

#### Phase 3 - Fonctionnalités avancées
- [ ] Export des résultats (JSON, CSV)
- [ ] Filtres de comparaison
- [ ] Paramètres utilisateur
- [ ] Thèmes personnalisables

## Principes architecturaux

### Modularité
- **Features isolées** : Chaque fonctionnalité dans son module
- **Composants réutilisables** : UI générique dans `components/`
- **Services partagés** : Logique métier dans `services/`

### Sécurité Electron
- **Isolation du contexte** : contextIsolation: true
- **Node.js désactivé** : nodeIntegration: false
- **Communication IPC** : Via contextBridge uniquement
- **Validation des entrées** : Toutes les données utilisateur validées

### Performance
- **Chargement différé** : Composants loadés à la demande
- **Optimisations React** : memo, useMemo, useCallback
- **Build optimisé** : Code splitting et tree shaking

## Dépendances clés

### Production
- `electron` ^37.3.1 : Framework desktop principal
- `react` ^19.1.1 : Librairie UI avec hooks
- `react-dom` ^19.1.1 : Rendu DOM pour React

### Développement
- `typescript` ^5.9.2 : Compilation TypeScript
- `@types/react` + `@types/react-dom` : Types React
- `tailwindcss` ^4.1.12 : Framework CSS utilitaire  
- `vite` ^7.1.3 : Build tool moderne
- `vite-plugin-electron` : Plugin Vite pour Electron
- `@vitejs/plugin-react` : Plugin React pour Vite
- `@tailwindcss/postcss` : Plugin PostCSS pour Tailwind
- `concurrently` + `wait-on` : Scripts parallèles
- Scripts npm simplifiés avec Vite

## Configuration et Build

### Scripts disponibles
**Exécution :**
- `npm start` : Lance l'application avec les sources actuelles
- `npm run start:build` : Build + lancement production
- `npm run dev` : Développement avec hot reload et Vite

**Build :**
- `npm run build` : Build complet Vite (main + preload + renderer)
- `npm run preview` : Aperçu du build en mode production
- `npm run clean` : Nettoyage du dossier dist/

**Distribution :**
- `npm run pack` : Build local non distribuable
- `npm run dist` : Distribution complète avec installateurs

### Environnements
- **Développement** : DevTools ouvertes, NODE_ENV=development
- **Production** : Application optimisée, pas de debug

## Notes de maintenance

### Évolutions récentes
- v1.0.0 : Fenêtre Electron fonctionnelle
- v1.0.1 : .gitignore et règles Cursor
- v1.0.2 : Amélioration .gitignore
- v1.0.3 : Spécifications architecture technique
- v1.0.4 : Réorganisation .cursorrules
- v1.0.5 : Règle vérification existence
- v1.0.6 : Section maintenance .cursorrules
- **v1.1.0 : MIGRATION COMPLÈTE REACT + TYPESCRIPT + TAILWIND CSS**
  - Migration main.js → main.ts avec handlers IPC complets
  - Migration preload.js → preload.ts avec API typée
  - Création architecture React complète (App.tsx, index.tsx)
  - Intégration Tailwind CSS avec PostCSS et Vite
  - Structure modulaire (components, features, shared, styles)
  - Build system Vite avec TypeScript et hot reload
  - Types partagés pour communication IPC sécurisée
  - Scripts optimisés pour développement et production

### À surveiller
- ✅ Migration vers React : **TERMINÉE** - Impact majeur sur structure et build
- Ajout de fonctionnalités métier : Interface de sélection, comparaison
- Nouvelles features : Documentation obligatoire dans ce fichier
- Performance : Optimisations Vite et React
- Tests : Ajout de tests unitaires et d'intégration

### Points d'attention v1.1.0+
- **Communication IPC** : Toujours utiliser les types `ElectronAPI`
- **Structure modulaire** : Respecter l'architecture features/components/shared
- **Imports** : Utiliser les alias TypeScript `@/` configurés
- **Styles** : Privilégier Tailwind CSS, éviter CSS custom sauf exceptions
- **Build** : Surveiller taille des bundles et performances Vite

---
*Dernière mise à jour : v1.1.0 - 2025-08-20 (Migration Vite + Suppression Babel)*
