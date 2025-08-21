# Structure du projet

## 📁 Racine du projet
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

## 🔧 Dossier src/ (Code source)
```
src/
├── components/           # Composants React + Tailwind + shadcn/ui
│   ├── ui/              # Composants UI shadcn/ui (Button, Badge, etc.)
│   ├── common/          # Composants réutilisables communs  
│   ├── features/        # Composants métier spécifiques
│   └── layout/          # Composants de mise en page
├── pages/               # Pages de l'application
│   └── HomePage.tsx     # Page principale
├── shared/              # Code partagé TypeScript
│   ├── types/           # Types globaux
│   ├── utils/           # Utilitaires TypeScript purs
│   ├── hooks/           # Hooks React partagés
│   └── constants/       # Constantes typées
├── lib/                 # Utilitaires et configuration
│   └── utils.ts         # Utilitaires (cn, etc.)
├── styles/              # Configuration CSS
│   └── globals.css      # Styles Tailwind + CSS custom
├── App.tsx              # Composant React racine
└── index.tsx            # Point d'entrée React
```

## 📚 Dossier docs/ (Documentation modulaire)
```
docs/
├── architecture/        # Architecture technique
├── rules/              # Règles de développement
├── setup/              # Installation et configuration
├── dev/                # Workflow développement
├── standards/          # Standards de code
├── git/                # Gestion Git et versioning
└── maintenance/        # Maintenance et documentation
```

## Organisation modulaire
- **Chaque dossier** a une responsabilité unique et claire
- **Séparation stricte** entre UI, logique métier et utilitaires
- **Index files** pour centraliser les exports
- **Types modulaires** pour maintenir la cohérence

## Règles de structure
- Fichiers < 200 lignes (division obligatoire sinon)
- 1 composant = 1 fichier avec en-tête descriptif
- Imports organisés par catégories (React, components, utils)
- Nommage cohérent selon conventions TypeScript