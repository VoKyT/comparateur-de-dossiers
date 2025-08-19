# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versioning Sémantique](https://semver.org/lang/fr/).

## [Non publié]

### Ajouté

### Modifié

### Corrigé

### Supprimé

---

## [v1.0.0] - 2025-08-19

### Ajouté
- **Fenêtre Electron fonctionnelle** : Application desktop complète avec interface moderne
- **Architecture sécurisée** : Processus principal, renderer et preload avec isolation du contexte
- **Interface utilisateur élégante** : Design moderne avec dégradés et animations CSS
- **Configuration npm complète** : Scripts pour développement, production et distribution
- **Structure de projet modulaire** : Organisation selon les meilleures pratiques Electron
- **Mode développement** : DevTools automatiques et rechargement en mode dev
- **Documentation complète** : README détaillé avec instructions d'installation et usage
- **Support cross-platform** : Configuration pour Windows, macOS et Linux
- **Menu d'application** : Menu natif avec raccourcis clavier standard
- **Gestion des erreurs** : Capture et logging des erreurs JavaScript
- **API sécurisée** : Communication IPC via contextBridge pour les futures fonctionnalités

### Notes techniques
- **Electron** : v37.3.1 (dernière version stable)
- **Node.js** : ≥ 20.0.0 requis
- **Sécurité** : `nodeIntegration: false`, `contextIsolation: true`
- **Architecture** : Séparation claire main/renderer/preload

---

## [v0.1.0] - 2024-01-XX

### Ajouté
- Initialisation du projet comparateur de dossiers
- Configuration Electron + React + Tailwind CSS
- Architecture modulaire définie
- Documentation de base (README, CHANGELOG)

### Notes
- Version initiale de développement
- Stack technique: Electron, React, TypeScript, Tailwind CSS
- Environnement: Node.js ≥ 20, npm ≥ 10, Windows PowerShell

---

## Format des entrées

### Types de changements
- **Ajouté** pour les nouvelles fonctionnalités
- **Modifié** pour les changements dans les fonctionnalités existantes
- **Obsolète** pour les fonctionnalités qui seront bientôt supprimées
- **Supprimé** pour les fonctionnalités supprimées
- **Corrigé** pour les corrections de bugs
- **Sécurité** pour les vulnérabilités corrigées

### Exemples d'entrées
```
- Interface de comparaison de dossiers
- Algorithme de détection des différences
- Export des résultats en JSON/CSV
- Correction du bug d'affichage des fichiers cachés
- Amélioration des performances de scan
```
