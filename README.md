# Comparateur de Dossiers

Application web moderne avec React, TypeScript et Tailwind CSS pour comparer le contenu de deux dossiers et identifier les différences de manière intuitive.

## 🚀 Fonctionnalités

- **Interface React moderne** : Composants React avec design system Tailwind CSS et shadcn/ui
- **TypeScript intégral** : Typage strict pour une meilleure robustesse
- **Architecture web pure** : Application web sans dépendances desktop
- **Build moderne** : Vite avec hot reload et optimisations
- **Multi-plateforme** : Fonctionne dans tous les navigateurs modernes
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
- **Navigateur moderne** : Chrome, Firefox, Safari, Edge (dernières versions)

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
   - Vite & plugins React
   - shadcn/ui & Radix UI

## 🎯 Usage

### 🚀 Mode développement

**Lancement simple :**

```bash
npm run dev
```

✅ Démarrage automatique du serveur Vite  
✅ Hot Module Replacement (HMR) activé  
✅ Accès : `http://localhost:3000`  
✅ Interface React avec rechargement instantané

### Mode production
```bash
# Aperçu de la version de production
npm run preview
```

### Build de production
```bash
# Build complet optimisé
npm run build

# Aperçu du build
npm run preview
```

## 📁 Structure du projet

```
src/
├── components/           # Composants React + Tailwind + shadcn/ui
│   ├── ui/              # Composants UI génériques (shadcn/ui)
│   └── layout/          # Composants de mise en page
├── features/            # Modules métier React
│   └── folder-comparison/ # Feature comparaison
│       ├── components/   # Composants spécifiques
│       ├── hooks/       # Hooks React personnalisés
│       └── types/       # Types TypeScript
├── lib/                 # Utilitaires et configuration
│   └── utils.ts         # Utilitaires (cn, etc.)
├── shared/              # Code partagé TypeScript
│   ├── types/           # Types globaux
│   ├── utils/           # Utilitaires TypeScript
│   ├── hooks/           # Hooks React partagés
│   └── constants/       # Constantes typées
├── styles/              # Configuration Tailwind
│   └── globals.css      # Styles Tailwind + CSS custom
├── App.tsx              # Composant React racine
└── index.tsx            # Point d'entrée React
```

## ⚡ Scripts disponibles

### Développement
- `npm run dev` - Lance le serveur de développement Vite avec HMR
- `npm run preview` - Aperçu de la version de production

### Build
- `npm run build` - Build optimisé pour la production
- `npm test` - Lance les tests (à implémenter)

## 🔧 Configuration

### Variables d'environnement
- `NODE_ENV` : Mode d'exécution (`development` ou `production`)

### Configuration Vite
- **HMR** : Hot Module Replacement pour développement rapide
- **Port** : 3000 (configurable)
- **Build** : Optimisations automatiques pour la production

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

#### Page blanche dans le navigateur
**Symptôme** : Le navigateur affiche une page blanche ou des erreurs de chargement.

**Solution** :
1. Vérifier que le serveur Vite est démarré (`npm run dev`)
2. Actualiser la page (F5)
3. Vérifier la console développeur (F12)

#### Port 3000 déjà utilisé
**Symptôme** : `Error: listen EADDRINUSE :::3000`

**Solution** :
```bash
# Windows - Libérer le port 3000
netstat -ano | findstr :3000
taskkill /F /PID [PID_DU_PROCESSUS]

# Alternative - Vite choisira automatiquement un autre port
npm run dev
```

### Logs de débogage

L'application génère des logs détaillés dans la console du navigateur :

- `🆕 [APP_INIT]` : Initialisation de l'application React
- `👆 [TEST_BUTTON]` : Interactions utilisateur
- `🔧 [WEB_CONSOLE]` : Actions développeur

Ouvrez la console développeur (F12) pour voir les logs détaillés.

## 🏗 Architecture technique

### Stack technologique
- **React** ^19.1.1 - Librairie UI avec hooks modernes
- **TypeScript** ^5.9.2 - Langage typé pour robustesse
- **Tailwind CSS** ^4.1.12 - Framework CSS utilitaire
- **Vite** ^7.1.3 - Build tool moderne avec HMR
- **shadcn/ui** - Composants modernes avec Radix UI
- **PostCSS** - Traitement CSS avec Autoprefixer

### Principes architecturaux
- **Modularité** : Séparation claire des responsabilités
- **Accessibilité** : Composants shadcn/ui avec support ARIA
- **Maintenabilité** : Code documenté et structure claire
- **Performance** : Optimisations web modernes avec Vite

## 🚧 Roadmap

### Version 1.3.0 ✅
- [x] Migration complète vers application web pure
- [x] Architecture React + TypeScript + Tailwind CSS
- [x] Interface React moderne avec shadcn/ui
- [x] Build system Vite avec HMR
- [x] Design responsive et esthétique
- [ ] Interface de sélection de dossiers
- [ ] Algorithme de comparaison basique
- [ ] Affichage des résultats

### Version 1.4.0
- [ ] Comparaison avancée (tailles, dates, checksums)
- [ ] Filtres et options de comparaison
- [ ] Mode recursif pour sous-dossiers

### Version 1.5.0
- [ ] Export des résultats (JSON, CSV)
- [ ] Thèmes personnalisables (dark/light)
- [ ] Paramètres utilisateur persistants

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