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

### ✅ Implémenté (v1.3.0)
- [x] **Migration complète vers application web pure**
- [x] **Architecture React + TypeScript + Tailwind + shadcn/ui**
- [x] **Interface React moderne** avec composants et hooks
- [x] **Build system Vite** avec HMR et optimisations
- [x] **Design system shadcn/ui** avec composants modernes
- [x] **Interface responsive** avec design mobile-first
- [x] **Animations Framer Motion** avec transitions de page professionnelles
- [x] **Système de logs de débogage** avec IDs uniques
- [x] **Suppression Electron** - Application web pure

### 📋 Roadmap

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
- `framer-motion` ^12.2.0 : Animations et transitions professionnelles
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