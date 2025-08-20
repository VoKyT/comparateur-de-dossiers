# Comparateur de Dossiers

Application Electron moderne avec React, TypeScript et Tailwind CSS pour comparer le contenu de deux dossiers et identifier les différences de manière intuitive.

## 🚀 Fonctionnalités

- **Interface React moderne** : Composants React avec design system Tailwind CSS
- **TypeScript intégral** : Typage strict pour une meilleure robustesse
- **Architecture sécurisée** : Isolation du contexte et communication IPC sécurisée
- **Build moderne** : Vite avec hot reload et optimisations
- **Cross-platform** : Compatible Windows, macOS et Linux
- **Mode développement** : DevTools intégrés et rechargement automatique

### Fonctionnalités à venir
- Comparaison de dossiers avec algorithme de détection des différences
- Affichage des résultats avec mise en évidence des différences
- Export des résultats (JSON, CSV, rapport)
- Interface de sélection de dossiers

## 📋 Prérequis

- **Node.js** ≥ 20.0.0
- **npm** ≥ 10.0.0
- **TypeScript** (installé automatiquement)
- **Système d'exploitation** : Windows 10/11, macOS 10.15+, ou Linux Ubuntu 18.04+

## 🛠 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/VoKyT/comparateur-de-dossiers.git
   cd comparateur-de-dossiers
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```
   
   Installe automatiquement :
   - React & React DOM
   - TypeScript & types associés  
   - Tailwind CSS & PostCSS
   - Vite & plugins Electron
   - Electron & outils de build

## 🎯 Usage

### ⚠️ Mode développement (RECOMMANDÉ)

**Pour un démarrage fiable et synchronisé :**

1. **Étape 1 : Démarrer Vite seul**
   ```bash
   npm run vite:dev
   ```
   ✅ Attendre le message : `VITE v7.x.x ready in XXXms`  
   ✅ Vérifier l'accès : `Local: http://localhost:3000/`

2. **Étape 2 : Dans un second terminal, démarrer Electron**
   ```bash
   npm run electron:dev
   ```
   ✅ Attendre les logs : `✅ [VITE_READY_03] Serveur Vite prêt et accessible !`  
   ✅ Attendre : `✅ [VITE_LOADED_05] Interface React chargée avec succès !`

**Alternative (moins fiable) :**
```bash
npm run dev
```
⚠️ **Note** : Cette commande peut parfois échouer à cause de problèmes de timing entre Vite et Electron. Utilisez la méthode en 2 étapes si vous rencontrez des problèmes.

### Mode production
```bash
# Lance l'application avec les sources actuelles
npm start

# Build puis lance l'application
npm run start:build
```

### Build manuel
```bash
# Build complet (TypeScript + React + Vite)
npm run build

# Aperçu du build
npm run preview

# Nettoyage des fichiers générés
npm run clean
```

### Construction de l'application
```bash
# Construction pour la plateforme actuelle
npm run pack

# Distribution complète
npm run dist
```

## 📁 Structure du projet

```
src/
├── electron/              # Code Electron TypeScript
│   ├── main/             # Processus principal
│   │   └── main.ts       # Point d'entrée Electron (TypeScript)
│   ├── preload/          # Scripts preload sécurisés  
│   │   └── preload.ts    # API typée pour le renderer
│   └── renderer/         # Interface utilisateur
│       └── index.html    # Shell HTML pour React
├── components/           # Composants React + Tailwind
│   ├── ui/              # Composants UI génériques
│   └── layout/          # Composants de mise en page
├── features/            # Modules métier React
│   └── folder-comparison/ # Feature comparaison
│       ├── components/   # Composants spécifiques
│       ├── hooks/       # Hooks React personnalisés
│       └── types/       # Types TypeScript
├── shared/              # Code partagé TypeScript
│   ├── types/           # Types globaux (electron.ts, etc.)
│   ├── utils/           # Utilitaires TypeScript
│   ├── hooks/           # Hooks React partagés
│   └── constants/       # Constantes typées
├── styles/              # Configuration Tailwind
│   └── globals.css      # Styles Tailwind + CSS custom
├── App.tsx              # Composant React racine
└── index.tsx            # Point d'entrée React
```

## ⚡ Scripts disponibles

### Exécution
- `npm start` - Lance l'application avec les sources actuelles
- `npm run start:build` - Build + lance l'application en mode production
- `npm run dev` - Lance en mode développement (concurrently Vite + Electron)
- `npm run vite:dev` - Lance uniquement le serveur Vite de développement
- `npm run electron:dev` - Lance uniquement Electron en mode développement

### Build et développement
- `npm run build` - Build complet avec Vite (main + preload + renderer)
- `npm run preview` - Aperçu du build en mode production
- `npm run clean` - Supprime le dossier dist/

### Distribution
- `npm run pack` - Construit l'application (non distribuable)
- `npm run dist` - Crée les installateurs pour la distribution
- `npm test` - Lance les tests (à implémenter)

## 🔧 Configuration

### Variables d'environnement
- `NODE_ENV` : Mode d'exécution (`development` ou `production`)

### Configuration Electron
- **Sécurité** : `nodeIntegration: false`, `contextIsolation: true`, `sandbox: true` (production)
- **DevTools** : Ouverture automatique en mode développement
- **Fenêtre** : 1200x800px (minimum 800x600px)

### Configuration TypeScript
- **Target** : ES2020 avec support React JSX
- **Paths** : Alias `@/` pour imports absolus
- **Strict mode** : Activé pour une sécurité maximale

### Configuration Tailwind CSS
- **Content** : Scan automatique des fichiers React/TypeScript
- **Thème étendu** : Couleurs custom et polices système
- **Plugins** : Autoprefixer pour compatibilité navigateurs

## 🔧 Dépannage

### Problèmes de démarrage

#### Page blanche dans l'application Electron
**Symptôme** : L'application Electron s'ouvre mais affiche une page blanche ou une erreur "Le serveur Vite n'est pas accessible".

**Solution** :
1. Arrêter tous les processus en cours (`Ctrl+C`)
2. Utiliser la méthode en 2 étapes :
   ```bash
   # Terminal 1
   npm run vite:dev
   
   # Attendre le message "VITE ready" puis dans Terminal 2
   npm run electron:dev
   ```

#### Erreur "Lock file can not be created"
**Symptôme** : Messages d'erreur sur les instances multiples.

**Solution** :
```bash
# Windows - Tuer tous les processus Electron
taskkill /f /im electron.exe
taskkill /f /im node.exe /fi "WINDOWTITLE eq npm*"

# Puis relancer
npm run vite:dev
```

#### Port 3000 déjà utilisé
**Symptôme** : `Error: listen EADDRINUSE :::3000`

**Solution** :
```bash
# Windows - Libérer le port 3000
netstat -ano | findstr :3000
taskkill /F /PID [PID_DU_PROCESSUS]

# Alternative - Utiliser un autre port
npm run vite:dev -- --port 3001
```

### Logs de débogage

L'application génère des logs détaillés avec des IDs uniques pour faciliter le débogage :

- `🔥 [VITE_WAIT_01]` : Démarrage de l'attente du serveur Vite
- `🔍 [VITE_WAIT_02]` : Tentatives de connexion au serveur
- `✅ [VITE_READY_03]` : Serveur Vite prêt et accessible
- `🌐 [VITE_LOAD_04]` : Début du chargement de l'interface React
- `✅ [VITE_LOADED_05]` : Interface React chargée avec succès
- `✅ [WINDOW]` : Fenêtre principale affichée

Si vous ne voyez pas ces logs, vérifiez que `NODE_ENV=development` est bien défini.

## 🏗 Architecture technique

### Stack technologique
- **Electron** ^37.3.1 - Framework desktop multiplateforme
- **React** ^19.1.1 - Librairie UI avec hooks modernes
- **TypeScript** ^5.9.2 - Langage typé pour robustesse
- **Tailwind CSS** ^4.1.12 - Framework CSS utilitaire
- **Vite** ^7.1.3 - Build tool moderne avec plugins Electron
- **PostCSS** - Traitement CSS avec Autoprefixer

### Principes architecturaux
- **Modularité** : Séparation claire des responsabilités
- **Sécurité** : Isolation des processus et communication sécurisée
- **Maintenabilité** : Code documenté et structure claire
- **Performance** : Optimisations pour les applications desktop

## 🚧 Roadmap

### Version 1.1.0 ✅
- [x] Architecture React + TypeScript + Tailwind CSS
- [x] Migration complète vers TypeScript
- [x] Interface React moderne avec composants
- [x] Build system Vite optimisé
- [x] Communication IPC sécurisée et typée
- [ ] Interface de sélection de dossiers
- [ ] Algorithme de comparaison basique
- [ ] Affichage des résultats

### Version 1.2.0
- [ ] Comparaison avancée (tailles, dates, checksums)
- [ ] Filtres et options de comparaison
- [ ] Mode recursif pour sous-dossiers

### Version 1.3.0
- [ ] Export des résultats (JSON, CSV)
- [ ] Thèmes personnalisables
- [ ] Paramètres utilisateur

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changes (`git commit -m '[v1.2.0] feat: ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

### Conventions de commit
- Format : `[v1.2.3] type: description`
- Types : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📝 License

Ce projet est sous licence ISC. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/VoKyT/comparateur-de-dossiers/issues)
- **Discussions** : [GitHub Discussions](https://github.com/VoKyT/comparateur-de-dossiers/discussions)

## 🏷 Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique détaillé des versions.

---

**Comparateur de Dossiers** - Une application moderne pour la gestion et la comparaison de fichiers.