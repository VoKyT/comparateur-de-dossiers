# Architecture - Comparateur de Dossiers

## Vue d'ensemble
Application web moderne utilisant **React + TypeScript + Tailwind CSS + Vite** pour comparer le contenu de deux dossiers avec une interface utilisateur élégante et moderne.

## Stack technique
- **Application Type** : Single Page Application (SPA)
- **UI Framework** : React ^19.1.1 avec hooks modernes
- **Langage** : TypeScript ^5.9.2 (strict mode)
- **Styling** : Tailwind CSS ^4.1.12 + shadcn/ui
- **Build** : Vite ^7.1.3 avec HMR
- **Runtime** : Navigateurs modernes, Node.js ≥ 20 (dev)

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
├── components/           # Composants React + Tailwind + shadcn/ui
│   ├── ui/              # Composants UI shadcn/ui (Button, Badge, etc.)
│   └── layout/          # Composants de mise en page
├── features/            # Modules métier React
│   └── folder-comparison/ # Feature comparaison de dossiers
│       ├── components/   # Composants React spécifiques
│       ├── hooks/       # Hooks React personnalisés
│       └── types/       # Types TypeScript de la feature
├── lib/                 # Utilitaires et configuration
│   └── utils.ts         # Utilitaires (cn, etc.)
├── shared/              # Code partagé TypeScript
│   ├── types/           # Types globaux
│   ├── utils/           # Utilitaires TypeScript purs
│   ├── hooks/           # Hooks React partagés
│   └── constants/       # Constantes typées
├── styles/              # Configuration CSS
│   └── globals.css      # Styles Tailwind + CSS custom
├── App.tsx              # Composant React racine
└── index.tsx            # Point d'entrée React
```

## Architecture Web

### Application React (App.tsx)
- **Responsabilité** : Interface utilisateur moderne React
- **Langage** : TypeScript avec typage strict
- **Fonctionnalités** :
  - Single Page Application (SPA) pure
  - Interface React avec hooks et state management
  - Design system Tailwind CSS + shadcn/ui
  - Composants réutilisables et modulaires
  - Animations CSS fluides et interactives
  - Support responsive et accessibilité
  - Gestion d'erreurs React avec error boundaries

### Build System (Vite)
- **Responsabilité** : Build moderne et développement
- **Fonctionnalités** :
  - Hot Module Replacement (HMR) instantané
  - Serveur de développement rapide (port 3000)
  - Build optimisé pour production
  - TypeScript compilation intégrée
  - Optimisations automatiques (tree shaking, code splitting)
  - Support PostCSS et Tailwind CSS

### Interface Utilisateur (React + shadcn/ui)
- **Responsabilité** : Composants UI modernes et accessibles
- **Architecture** : Design system avec composants réutilisables
- **Fonctionnalités** :
  - Composants shadcn/ui basés sur Radix UI
  - Interface responsive (mobile-first)
  - Thèmes et customisation Tailwind CSS
  - Animations et transitions fluides
  - Support complet de l'accessibilité (ARIA)
  - Icones Lucide React intégrées

## État du développement

### ✅ Implémenté (v1.3.0)
- [x] **Migration complète vers application web pure**
- [x] **Architecture React + TypeScript + Tailwind + shadcn/ui**
- [x] **Interface React moderne** avec composants et hooks
- [x] **Build system Vite** avec HMR et optimisations
- [x] **Design system shadcn/ui** avec composants modernes
- [x] **Interface responsive** avec design mobile-first
- [x] **Animations interactives** avec effets hover élégants
- [x] **Système de logs de débogage** avec IDs uniques
- [x] **Suppression Electron** - Application web pure
- [x] Structure web modulaire (components, features, lib)
- [x] Scripts simplifiés (npm run dev uniquement)
- [x] Configuration web (tsconfig, vite, postcss, tailwind)
- [x] Documentation mise à jour pour architecture web

### 🚧 En cours de développement
- [ ] Aucun développement actif

### 📋 À venir (Roadmap)

#### Phase 1 - Migration Web Pure ✅ TERMINÉ
- [x] Suppression complète d'Electron
- [x] Configuration React + TypeScript + shadcn/ui
- [x] Configuration Tailwind CSS + PostCSS  
- [x] Interface moderne avec composants shadcn/ui
- [x] Structure modulaire web (components, lib, features)
- [x] Build system Vite avec HMR

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

### Sécurité Web
- **CSP (Content Security Policy)** : Protection contre XSS
- **Validation des entrées** : Sanitisation des données utilisateur
- **HTTPS uniquement** : Communications sécurisées
- **Composants shadcn/ui** : Sécurité et accessibilité intégrées

### Performance
- **Chargement différé** : Composants loadés à la demande
- **Optimisations React** : memo, useMemo, useCallback
- **Build optimisé** : Code splitting et tree shaking

## Dépendances clés

### Production
- `react` ^19.1.1 : Librairie UI avec hooks
- `react-dom` ^19.1.1 : Rendu DOM pour React
- `@radix-ui/*` : Composants UI accessibles (base shadcn/ui)
- `lucide-react` : Icônes modernes
- `clsx` + `tailwind-merge` : Gestion classes CSS

### Développement
- `typescript` ^5.9.2 : Compilation TypeScript
- `@types/react` + `@types/react-dom` : Types React
- `tailwindcss` ^4.1.12 : Framework CSS utilitaire  
- `vite` ^7.1.3 : Build tool moderne avec HMR
- `@vitejs/plugin-react` : Plugin React pour Vite
- `@tailwindcss/postcss` : Plugin PostCSS pour Tailwind
- `autoprefixer` : Compatibilité navigateurs CSS
- Scripts npm simplifiés pour web

## Configuration et Build

### Scripts disponibles

**Développement :**
- `npm run dev` : Lance le serveur de développement Vite avec HMR
- `npm run preview` : Aperçu de la version de production

**Build :**
- `npm run build` : Build optimisé pour la production

**URL d'accès :**
- Développement : http://localhost:3000
- Production : Serveur web statique ou CDN

### Environnements
- **Développement** : HMR Vite, console logs, NODE_ENV=development
- **Production** : Build optimisé, minification, pas de debug

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
- ✅ Migration vers Web pur : **TERMINÉE** - Suppression Electron, architecture SPA
- Ajout de fonctionnalités métier : Interface de sélection, comparaison
- Nouvelles features : Documentation obligatoire dans ce fichier
- Performance : Optimisations Vite et React
- Tests : Ajout de tests unitaires et d'intégration
- Compatibilité navigateurs : Support multi-navigateurs

### Points d'attention v1.3.0+
- **Composants shadcn/ui** : Utiliser les composants officiels quand possible
- **Structure modulaire** : Respecter l'architecture components/lib/features
- **Utilitaires** : Utiliser `cn()` pour combiner les classes CSS
- **Styles** : Privilégier Tailwind CSS + shadcn/ui, éviter CSS custom
- **Build** : Surveiller taille des bundles et performances Vite
- **Responsivité** : Tester sur mobile, tablette et desktop

## Migration v1.3.0 - Application Web Pure

### Changement majeur
**Migration complète** : Suppression d'Electron, transformation en application web moderne avec React + Vite.

### Améliorations réalisées
1. **Suppression d'Electron** :
   - Suppression des processus main, preload, renderer
   - Suppression de toutes les dépendances Electron
   - Application 100% web fonctionnant dans le navigateur

2. **Intégration shadcn/ui** :
   - Composants modernes avec Radix UI
   - Design system cohérent et accessible
   - Animations et interactions élégantes

3. **Interface utilisateur améliorée** :
   - Design responsive mobile-first
   - Gradients et effets visuels modernes
   - Animations hover avec rotation d'icônes
   - Espacement optimisé entre les éléments

4. **Simplification des scripts** :
   ```
   npm run dev    # Développement avec HMR Vite
   npm run build  # Build de production
   npm run preview # Aperçu de production
   ```

### Avantages de la migration
- **Performance** : Chargement instantané, HMR ultra-rapide
- **Simplicité** : Plus de synchronisation Vite-Electron
- **Compatibilité** : Fonctionne sur tous navigateurs modernes
- **Développement** : Workflow simplifié, moins de complexité

---
*Dernière mise à jour : v1.3.0 - 2025-08-21 (Migration application web pure + shadcn/ui)*
