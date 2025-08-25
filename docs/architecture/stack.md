# Architecture Technique

## 🏗️ STACK IMPOSÉE

### Technologies obligatoires
- **React** : Librairie UI pour tous les composants interface
- **TypeScript** : Langage obligatoire pour tout le code applicatif
- **Tailwind CSS** : Framework CSS utilitaire pour tout le styling
- **shadcn/ui** : Composants modernes basés sur Radix UI
- **Vite** : Build tool moderne avec hot reload et optimisations
- **Framer Motion** : Librairie d'animation moderne pour transitions fluides
- **Google Auth Library** : Authentification Google OAuth officielle
- **Express + CORS** : Serveur local pour extensions et APIs

## 🔧 INTÉGRATION REACT + TYPESCRIPT + TAILWIND + SHADCN/UI + FRAMER MOTION

### Configuration de base
- **Application Web** : React + TypeScript + Tailwind CSS + shadcn/ui
- **Build System** : Vite avec HMR pour développement rapide
- **Composants** : shadcn/ui pour design system moderne
- **État** : React hooks (useState, useContext, zustand si complexe)
- **Styling** : Tailwind CSS + classes utilitaires cn(), pas de CSS custom
- **Animations** : Framer Motion pour toutes les transitions et micro-interactions

## 📁 ARCHITECTURE ULTRA-MODULAIRE OBLIGATOIRE

### Structure actuelle (version 2025)
```
src/
├── components/                  # Composants React modulaires
│   ├── ui/                     # Composants shadcn/ui (Button, Badge, etc.)
│   │   ├── button.tsx          
│   │   ├── badge.tsx           
│   │   └── [autres composants UI]
│   ├── layout/                 # Composants de mise en page
│   │   ├── AppLayout.tsx       # Layout principal responsive
│   │   ├── PageHeader.tsx      # En-tête de page professionnel
│   │   └── index.ts            # Barrel export
│   ├── common/                 # Composants réutilisables
│   │   ├── ActionButton.tsx    # Bouton d'action modulaire
│   │   ├── VersionBadge.tsx    
│   │   └── index.ts
│   ├── features/               # Composants métier atomiques
│   │   ├── FolderSelector.tsx  # Sélection de dossiers
│   │   ├── ComparisonGrid.tsx  # Grille de comparaison 3 colonnes
│   │   ├── FileList.tsx        # Liste de fichiers générique
│   │   ├── ComparisonStats.tsx # Statistiques de comparaison
│   │   └── index.ts
│   └── index.ts                # Barrel export principal
├── pages/                       # Pages orchestratrices minimales
│   ├── HomePage.tsx            # Page principale (150 lignes max)
│   └── HomePage.refactored.tsx # Version ultra-modulaire
├── shared/                      # Code partagé modulaire
│   ├── types/                  # Types métier séparés
│   │   ├── file-system.ts      # Types fichiers/dossiers
│   │   ├── comparison.ts       # Types comparaison
│   │   └── index.ts
│   ├── hooks/                  # Hooks métier modulaires
│   │   ├── useFileSystem.ts    # Logique système fichiers
│   │   ├── useComparison.ts    # Logique comparaison
│   │   └── index.ts (+ hooks génériques)
│   ├── utils/                  # Utilitaires purs
│   ├── constants/              # Constantes
│   └── index.ts                # Barrel export central
├── lib/
│   └── utils.ts                # cn() et utilitaires
├── styles/
│   └── globals.css             # Styles globaux professionnels
└── App.tsx                     # Point d'entrée minimaliste
```

## ⚙️ RÈGLES D'INTÉGRATION STRICTES

1. **React Components** : Obligatoirement TypeScript + Tailwind + shadcn/ui
2. **Composants UI** : Privilégier shadcn/ui, éviter les composants custom
3. **Classes CSS** : Utiliser cn() pour combiner les classes Tailwind
4. **State Management** : React hooks (useState, useContext, zustand si complexe)
5. **Styling** : Tailwind utility classes, pas de CSS inline ou modules
6. **Animations** : Framer Motion obligatoire, éviter les animations CSS @keyframes
7. **Build** : Vite avec HMR pour développement web

## 🔗 POINTS D'INTÉGRATION CLÉS

- **React → Vite** : Chargement via serveur de développement Vite
- **shadcn/ui** : Composants modernes avec Radix UI + Tailwind CSS
- **TypeScript** : Configuration web avec support React
- **Tailwind** : Build CSS intégré dans le processus Vite
- **Framer Motion** : Animations déclaratives avec motion.* components et AnimatePresence

## 🧩 PRINCIPES DE MODULARITÉ MAXIMALE

### RÈGLES ABSOLUES
- **1 responsabilité = 1 fichier** : chaque module a un rôle unique et bien défini
- **200 lignes maximum** : au-delà = division obligatoire immédiate
- **Couplage faible** : modules communiquent via barrel exports uniquement
- **Cohésion forte** : regrouper les éléments qui changent ensemble
- **Réutilisabilité** : composants atomiques réutilisables partout

### HIÉRARCHIE MODULAIRE
1. **shared/** : Code réutilisable (types, hooks, utils)
2. **components/features/** : Composants métier atomiques
3. **components/common/** : Composants UI réutilisables  
4. **components/layout/** : Structure et mise en page
5. **pages/** : Orchestrateurs minimaux (< 200 lignes)

### SÉPARATION STRICTE
- **Types** → `shared/types/` (jamais dans composants)
- **Logique métier** → `shared/hooks/` (jamais dans composants)
- **UI atomique** → `components/features/` (un composant = une responsabilité)
- **Orchestration** → `pages/` (coordination uniquement)

## 🔄 ISOLATION DES FEATURES

- Une feature ne doit **jamais** importer directement une autre feature
- Communication inter-features via des événements, context, ou services partagés
- Chaque feature doit pouvoir être supprimée sans casser le reste

## 📝 SÉPARATION DES PRÉOCCUPATIONS

- **UI**: uniquement dans les composants, pas de logique métier
- **Business logic**: dans les services, pas dans les composants
- **State management**: hooks personnalisés ou context, isolé par feature
- **Side effects**: dans les services ou hooks, pas directement dans les composants