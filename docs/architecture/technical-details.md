# Détails techniques Architecture

## Architecture Web

### Application React (App.tsx)
- **Responsabilité** : Interface utilisateur moderne React
- **Langage** : TypeScript avec typage strict
- **Fonctionnalités** :
  - Single Page Application (SPA) pure
  - Interface React avec hooks et state management
  - Design system Tailwind CSS + shadcn/ui
  - Composants réutilisables et modulaires
  - Animations Framer Motion professionnelles
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
  - Animations Framer Motion et transitions de page
  - Support complet de l'accessibilité (ARIA)
  - Icônes Lucide React intégrées

## État du développement

### ✅ Implémenté (v1.8.0)
- [x] **Migration complète vers application web pure** (v1.3.0)
- [x] **Architecture React + TypeScript + Tailwind + shadcn/ui** (v1.3.0)
- [x] **Interface React moderne** avec composants et hooks (v1.3.0)
- [x] **Build system Vite** avec HMR et optimisations (v1.3.0)
- [x] **Design system shadcn/ui** avec composants modernes (v1.3.0)
- [x] **Interface responsive** avec design mobile-first (v1.3.0)
- [x] **Animations Framer Motion** avec transitions de page professionnelles (v1.7.0)
- [x] **Système de logs de débogage** avec IDs uniques (v1.3.0)
- [x] **Suppression Electron** - Application web pure (v1.3.0)
- [x] **Interface de sélection de dossiers** avec File System Access API (v1.4.0)
- [x] **Algorithme de comparaison de fichiers** par nom et taille (v1.5.0)
- [x] **Affichage des résultats de comparaison** avec grilles détaillées (v1.5.0)
- [x] **Export des résultats** JSON/CSV avec rapports complets (v1.6.0)
- [x] **Système d'internationalisation** FR/EN complet (v1.8.0)
- [x] **Support accessibilité** ARIA et navigation clavier (v1.8.0)
- [x] **Architecture ultra-modulaire** selon règles CLAUDE.md (v1.6.0)
- [x] **Gestion des erreurs utilisateur** avec messages i18n (v1.8.0)

### 📋 Roadmap

#### Phase 4 - Optimisations avancées
- [ ] Tests unitaires et d'intégration
- [ ] Filtres de comparaison avancés (taille, date, type)
- [ ] Thèmes personnalisables (clair/sombre)
- [ ] Mode comparaison par contenu (hash)
- [ ] Sauvegarde préférences utilisateur
- [ ] Export formats supplémentaires (Excel, PDF)

#### Phase 5 - Performance et accessibilité
- [ ] Optimisations performance pour gros dossiers
- [ ] Support drag & drop pour sélection
- [ ] Raccourcis clavier avancés
- [ ] Mode hors ligne avec Service Worker
- [ ] Composants lazy loading
- [ ] Audit accessibilité complet

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
- `react` ^19.1.1 : Librairie UI avec hooks (moved to devDependencies)
- `react-dom` ^19.1.1 : Rendu DOM pour React (moved to devDependencies)
- `framer-motion` ^12.23.12 : Animations et transitions professionnelles
- `@radix-ui/*` : Suite complète composants UI accessibles (base shadcn/ui)
  - `@radix-ui/react-alert-dialog` ^1.1.15
  - `@radix-ui/react-avatar` ^1.1.10 
  - `@radix-ui/react-dialog` ^1.1.15
  - `@radix-ui/react-dropdown-menu` ^2.1.16
  - `@radix-ui/react-hover-card` ^1.1.15
  - `@radix-ui/react-popover` ^1.1.15
  - `@radix-ui/react-progress` ^1.1.7
  - `@radix-ui/react-separator` ^1.1.7
  - `@radix-ui/react-slot` ^1.2.3
  - `@radix-ui/react-tabs` ^1.1.13
  - `@radix-ui/react-tooltip` ^1.2.8
- `lucide-react` ^0.540.0 : Icônes modernes SVG
- `clsx` ^2.1.1 + `tailwind-merge` ^3.3.1 : Gestion classes CSS
- `class-variance-authority` ^0.7.1 : Gestion variantes composants
- `cmdk` ^1.1.1 : Interface de commande (future features)
- `@tailwindcss/vite` ^4.1.12 : Plugin Vite pour Tailwind

### Développement
- `typescript` ^5.9.2 : Compilation TypeScript strict
- `@types/react` ^19.1.10 + `@types/react-dom` ^19.1.7 : Types React
- `@types/node` ^24.3.0 : Types Node.js
- `tailwindcss` ^4.1.12 : Framework CSS utilitaire moderne
- `vite` ^7.1.3 : Build tool moderne avec HMR
- `@vitejs/plugin-react` ^5.0.1 : Plugin React pour Vite
- `@tailwindcss/postcss` ^4.1.12 : Plugin PostCSS pour Tailwind
- `autoprefixer` ^10.4.21 : Compatibilité navigateurs CSS
- `postcss` ^8.5.6 : Processeur CSS
- `tw-animate-css` ^1.3.7 : Extensions animations Tailwind

## Configuration et Build

### Scripts disponibles
- `npm run dev` : Lance le serveur de développement Vite avec HMR
- `npm run build` : Build optimisé pour la production
- `npm run preview` : Aperçu de la version de production

### URLs d'accès
- **Développement** : http://localhost:3000
- **Production** : Serveur web statique ou CDN

### Environnements
- **Développement** : HMR Vite, console logs, NODE_ENV=development
- **Production** : Build optimisé, minification, pas de debug