# Architecture Technique

## 🏗️ STACK IMPOSÉE

### Technologies obligatoires
- **React** : Librairie UI pour tous les composants interface
- **TypeScript** : Langage obligatoire pour tout le code applicatif
- **Tailwind CSS** : Framework CSS utilitaire pour tout le styling
- **shadcn/ui** : Composants modernes basés sur Radix UI
- **Vite** : Build tool moderne avec hot reload et optimisations

## 🔧 INTÉGRATION REACT + TYPESCRIPT + TAILWIND + SHADCN/UI

### Configuration de base
- **Application Web** : React + TypeScript + Tailwind CSS + shadcn/ui
- **Build System** : Vite avec HMR pour développement rapide
- **Composants** : shadcn/ui pour design system moderne
- **État** : React hooks (useState, useContext, zustand si complexe)
- **Styling** : Tailwind CSS + classes utilitaires cn(), pas de CSS custom

## 📁 ARCHITECTURE MODULAIRE OBLIGATOIRE

```
src/
├── components/                  # Composants React + Tailwind + shadcn/ui
│   ├── ui/                     # Composants shadcn/ui (Button, Badge, etc.)
│   │   ├── button.tsx          # Bouton shadcn/ui avec variants
│   │   ├── badge.tsx           # Badge avec styles harmonieux
│   │   └── index.ts            # Barrel export
│   └── layout/                 # Composants de mise en page
│       ├── Header.tsx          # En-tête application responsive
│       ├── Sidebar.tsx         # Barre latérale collapsible
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
├── lib/                         # Utilitaires et configuration
│   └── utils.ts                # Utilitaire cn() pour classes CSS
├── shared/                      # Code partagé React/TS
│   ├── types/                  # Types globaux TypeScript
│   ├── utils/                  # Utilitaires purs TypeScript
│   ├── hooks/                  # Hooks React partagés
│   └── constants/              # Constantes TypeScript
├── styles/                      # Configuration Tailwind
│   ├── globals.css             # Imports Tailwind + CSS custom minimal
│   └── tailwind.config.js      # Configuration Tailwind
└── App.tsx                     # Composant racine React
```

## ⚙️ RÈGLES D'INTÉGRATION STRICTES

1. **React Components** : Obligatoirement TypeScript + Tailwind + shadcn/ui
2. **Composants UI** : Privilégier shadcn/ui, éviter les composants custom
3. **Classes CSS** : Utiliser cn() pour combiner les classes Tailwind
4. **State Management** : React hooks (useState, useContext, zustand si complexe)
5. **Styling** : Tailwind utility classes, pas de CSS inline ou modules
6. **Build** : Vite avec HMR pour développement web

## 🔗 POINTS D'INTÉGRATION CLÉS

- **React → Vite** : Chargement via serveur de développement Vite
- **shadcn/ui** : Composants modernes avec Radix UI + Tailwind CSS
- **TypeScript** : Configuration web avec support React
- **Tailwind** : Build CSS intégré dans le processus Vite

## 🧩 PRINCIPES DE MODULARITÉ

- **Une responsabilité par module**: chaque fichier/dossier a un rôle unique et bien défini
- **Couplage faible**: les modules communiquent via des interfaces claires, pas de dépendances directes
- **Cohésion forte**: regrouper les éléments qui changent ensemble dans le même module
- **Inversion de dépendance**: les modules de haut niveau ne dépendent pas des détails d'implémentation

## 🔄 ISOLATION DES FEATURES

- Une feature ne doit **jamais** importer directement une autre feature
- Communication inter-features via des événements, context, ou services partagés
- Chaque feature doit pouvoir être supprimée sans casser le reste

## 📝 SÉPARATION DES PRÉOCCUPATIONS

- **UI**: uniquement dans les composants, pas de logique métier
- **Business logic**: dans les services, pas dans les composants
- **State management**: hooks personnalisés ou context, isolé par feature
- **Side effects**: dans les services ou hooks, pas directement dans les composants