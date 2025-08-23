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
│   │   ├── ActionButton.tsx        # Bouton d'action avec animations
│   │   ├── ButtonGroup.tsx         # Groupe de boutons avec espacement
│   │   ├── FlagIcon.tsx           # Drapeaux SVG pour sélecteur langue
│   │   ├── IconText.tsx           # Texte avec icône
│   │   ├── LanguageToggle.tsx     # Sélecteur de langue animé
│   │   ├── VersionBadge.tsx       # Badge de version avec icône
│   │   └── index.ts               # Exports centralisés
│   ├── features/        # Composants métier spécifiques
│   │   ├── CommonFilesColumn.tsx           # Colonne fichiers communs
│   │   ├── ComparisonGrid.tsx              # Grille de comparaison
│   │   ├── ComparisonHeader.tsx            # En-tête avec stats et export
│   │   ├── ComparisonStats.tsx             # Affichage statistiques
│   │   ├── EmptyColumn.tsx                 # Colonne vide avec placeholder
│   │   ├── FileList.tsx                    # Liste de fichiers stylée
│   │   ├── FileTreeDisplay.tsx             # Affichage arborescence
│   │   ├── FileTreeItem.tsx                # Item d'arborescence
│   │   ├── FileTreeItemWithComparison.tsx  # Item avec comparaison
│   │   ├── FileTreeRenderer.tsx            # Rendu arborescence
│   │   ├── FilledColumn.tsx                # Colonne avec contenu
│   │   ├── FolderSelector.tsx              # Sélecteur de dossier
│   │   ├── PermanentComparisonGrid.tsx     # Grille permanente
│   │   ├── ReportExporter.tsx              # Export de rapports
│   │   └── index.ts                        # Exports centralisés
│   └── layout/          # Composants de mise en page
│       ├── AppLayout.tsx        # Layout principal avec footer
│       ├── PageHeader.tsx       # En-tête de page
│       ├── WelcomeScreen.tsx    # Écran de bienvenue animé
│       └── index.ts             # Exports centralisés
├── pages/               # Pages de l'application
│   └── HomePage.tsx     # Page principale avec comparaison
├── shared/              # Code partagé TypeScript
│   ├── accessibility/   # Support accessibilité ARIA
│   │   └── index.ts            # Labels et props accessibilité
│   ├── i18n/           # Système d'internationalisation
│   │   ├── context.tsx         # Contexte React i18n
│   │   ├── translations/       # Traductions par langue
│   │   │   ├── en.ts          # Traductions anglaises
│   │   │   └── fr.ts          # Traductions françaises
│   │   ├── types.ts           # Types i18n
│   │   └── index.ts           # Exports i18n
│   ├── types/          # Types globaux
│   │   ├── comparison.ts      # Types comparaison
│   │   ├── file-system.ts     # Types système fichiers
│   │   └── index.ts           # Exports types
│   ├── hooks/          # Hooks React partagés
│   │   ├── useComparison.ts         # Hook comparaison dossiers
│   │   ├── useFileListExport.ts     # Hook export listes
│   │   ├── useFileSystem.ts         # Hook système fichiers
│   │   ├── useFolderSelection.ts    # Hook sélection dossiers
│   │   ├── useMotionColors.ts       # Hook animations couleurs
│   │   ├── useReportGenerator.ts    # Hook génération rapports
│   │   └── index.ts                 # Exports hooks
│   ├── utils/          # Utilitaires TypeScript purs
│   │   └── index.ts           # Utilitaires génériques
│   ├── constants/      # Constantes typées
│   │   └── index.ts           # Configuration app et logs
│   └── index.ts        # Exports shared centralisés
├── lib/                # Utilitaires et configuration
│   └── utils.ts        # Utilitaires (cn, clsx, etc.)
├── styles/             # Configuration CSS
│   └── globals.css     # Styles Tailwind + CSS custom + motion
├── App.tsx             # Composant React racine avec i18n
└── index.tsx           # Point d'entrée React
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