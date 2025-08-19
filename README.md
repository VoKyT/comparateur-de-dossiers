# Comparateur de Dossiers

Application Electron moderne pour comparer le contenu de deux dossiers et identifier les différences de manière intuitive.

## 🚀 Fonctionnalités

- **Interface graphique moderne** : Fenêtre Electron élégante avec design adaptatif
- **Architecture sécurisée** : Isolation du contexte et communication IPC sécurisée
- **Cross-platform** : Compatible Windows, macOS et Linux
- **Mode développement** : DevTools intégrés pour le développement

### Fonctionnalités à venir
- Comparaison de dossiers avec algorithme de détection des différences
- Affichage des résultats avec mise en évidence des différences
- Export des résultats (JSON, CSV, rapport)
- Interface de sélection de dossiers

## 📋 Prérequis

- **Node.js** ≥ 20.0.0
- **npm** ≥ 10.0.0
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

## 🎯 Usage

### Mode développement
```bash
# Windows
npm run dev-win

# macOS/Linux  
npm run dev
```

### Mode production
```bash
npm start
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
├── electron/           # Code Electron
│   ├── main/          # Processus principal
│   │   └── main.js    # Point d'entrée Electron
│   ├── preload/       # Scripts preload sécurisés
│   │   └── preload.js # API sécurisée pour le renderer
│   └── renderer/      # Interface utilisateur
│       └── index.html # Fenêtre principale
├── components/        # Composants React (à venir)
├── features/          # Modules métier (à venir)
├── shared/           # Code partagé (à venir)
└── services/         # Services globaux (à venir)
```

## ⚡ Scripts disponibles

- `npm start` - Lance l'application en mode production
- `npm run dev` - Lance en mode développement (macOS/Linux)
- `npm run dev-win` - Lance en mode développement (Windows)
- `npm run pack` - Construit l'application (non distribuable)
- `npm run dist` - Crée les installateurs pour la distribution
- `npm test` - Lance les tests (à implémenter)

## 🔧 Configuration

### Variables d'environnement
- `NODE_ENV` : Mode d'exécution (`development` ou `production`)

### Configuration Electron
- **Sécurité** : `nodeIntegration: false`, `contextIsolation: true`
- **DevTools** : Ouverture automatique en mode développement
- **Fenêtre** : 1200x800px (minimum 800x600px)

## 🏗 Architecture technique

### Stack technologique
- **Electron** ^37.3.1 - Framework desktop
- **Node.js** - Runtime JavaScript
- **HTML5/CSS3** - Interface utilisateur
- **JavaScript ES6+** - Logique applicative

### Principes architecturaux
- **Modularité** : Séparation claire des responsabilités
- **Sécurité** : Isolation des processus et communication sécurisée
- **Maintenabilité** : Code documenté et structure claire
- **Performance** : Optimisations pour les applications desktop

## 🚧 Roadmap

### Version 1.1.0
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
3. Commit les changes (`git commit -m '[v1.1.0] feat: ajout nouvelle fonctionnalité'`)
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