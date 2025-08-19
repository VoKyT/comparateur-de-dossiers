# Architecture - Comparateur de Dossiers

## Vue d'ensemble
Application Electron moderne utilisant React + TypeScript + Tailwind CSS pour comparer le contenu de deux dossiers avec une interface utilisateur élégante.

## Stack technique
- **Framework Desktop** : Electron ^37.3.1
- **UI Framework** : React + TypeScript
- **Styling** : Tailwind CSS
- **Build** : Node.js ≥ 20, npm ≥ 10

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
└── electron/              # Code Electron natif
    ├── main/             # Processus principal Electron
    │   └── main.js       # Point d'entrée, gestion fenêtres, IPC
    ├── preload/          # Scripts preload sécurisés
    │   └── preload.js    # API contextBridge, communication sécurisée
    └── renderer/         # Interface utilisateur
        └── index.html    # Shell HTML principal avec CSS intégré
```

## Architecture Electron

### Processus Principal (main.js)
- **Responsabilité** : Gestion du cycle de vie de l'application
- **Fonctionnalités** :
  - Création et gestion de la fenêtre principale (1200x800px)
  - Configuration de sécurité (contextIsolation, nodeIntegration disabled)
  - Menu d'application avec raccourcis
  - Gestion des événements système (fermeture, activation)
- **Sécurité** : Isolation complète du contexte Node.js

### Script Preload (preload.js)
- **Responsabilité** : Communication sécurisée entre processus
- **API exposée** :
  - `versions` : Informations système
  - `fileSystem` : Future API de gestion fichiers (placeholder)
  - `app` : Contrôles fenêtre (minimize, maximize, close)
  - `notifications` : Système de notifications
  - `preferences` : Gestion thèmes et préférences
  - `development` : Outils de développement
- **Sécurité** : contextBridge exclusivement, pas d'accès Node.js direct

### Interface Renderer (index.html)
- **Responsabilité** : Interface utilisateur principale
- **Fonctionnalités actuelles** :
  - Écran d'accueil avec design moderne
  - Animation et feedback visuel
  - Responsive design avec CSS adaptatif
  - Mode sombre automatique selon OS
  - Gestion d'erreurs JavaScript
- **Futur** : Sera remplacé par composants React

## État du développement

### ✅ Implémenté
- [x] Structure de base Electron
- [x] Fenêtre principale fonctionnelle
- [x] Architecture sécurisée (contextIsolation)
- [x] Interface utilisateur basique
- [x] Menu d'application
- [x] Scripts de développement
- [x] Configuration build/distribution
- [x] Documentation complète

### 🚧 En cours de développement
- [ ] Aucun développement actif

### 📋 À venir (Roadmap)

#### Phase 1 - Migration React + Tailwind
- [ ] Installation et configuration React + TypeScript
- [ ] Configuration Tailwind CSS
- [ ] Migration interface HTML vers composants React
- [ ] Structure modulaire des composants

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
- `electron` : Framework desktop principal

### Développement  
- Scripts npm configurés pour dev/build/dist

## Configuration et Build

### Scripts disponibles
- `npm run dev-win` : Développement Windows
- `npm run dev` : Développement Unix/macOS
- `npm start` : Mode production
- `npm run pack` : Build local
- `npm run dist` : Distribution complète

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

### À surveiller
- Migration vers React : Impact sur structure et build
- Ajout de dépendances : Mise à jour du .gitignore
- Nouvelles features : Documentation dans ce fichier

---
*Dernière mise à jour : v1.0.6 - 2025-08-19*
