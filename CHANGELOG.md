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

## [v1.8.0] - 2025-08-23

### Ajouté
- **Système d'internationalisation complet** : Support FR/EN avec détection automatique langue navigateur
- **Hook useTranslation** : Accès aux traductions dans tous les composants React
- **Sélecteur de langue animé** : LanguageToggle avec drapeaux SVG personnalisés et animations fluides
- **Drapeaux personnalisés** : Composants FrenchFlag et BritishFlag avec SVG optimisés
- **Support accessibilité i18n** : Labels ARIA et navigation clavier pour sélecteur langue
- **Footer enrichi** : Lien Instagram professionnel VKT avec photo de profil

### Modifié
- **Interface multilingue** : Toutes les chaînes traduites en FR/EN
- **Configuration Tailwind** : Palette de couleurs étendue avec classes motion-safe/motion-reduce
- **App.tsx** : Intégration I18nProvider et wrapper pour sélecteur de langue
- **Composants UI** : VersionBadge, ComparisonGrid, FileTreeDisplay avec traductions

### Technique
- **Contexte I18nProvider** : Gestion état langue avec React Context
- **Types TypeScript** : Interfaces pour traductions et langues supportées
- **Optimisations performance** : Logs conditionnels selon NODE_ENV
- **Architecture modulaire** : Module src/shared/i18n/ avec sous-modules

---

## [v1.7.0] - 2025-08-22

### Ajouté
- **Intégration Framer Motion** : Animations professionnelles pour écran de bienvenue
- **Transitions symétriques ultra-stylées** : Animations entre écrans avec durées cohérentes
- **Bouton retour animé** : Effets de brillance, transformations 3D et micro-interactions

### Modifié
- **WelcomeScreen** : Animations d'entrée et de sortie avec Framer Motion
- **Navigation entre écrans** : Transitions fluides et professionnelles
- **Optimisations CSS** : Support motion-safe et motion-reduce pour accessibilité

### Technique
- **Dépendances** : framer-motion ^12.23.12 pour animations avancées
- **Configuration** : Support préférences utilisateur pour animations réduites

---

## [v1.6.2] - 2025-08-22

### Modifié
- **Références documentation** : Amélioration interface avec références complètes
- **Interface utilisateur** : Optimisations mineures pour meilleure expérience

### Corrigé
- **Documentation** : Correction des liens et références dans les fichiers MD

---

## [v1.6.1] - 2025-08-22

### Ajouté
- **Modularité CRITIQUE** : Division automatique des fichiers >200 lignes selon CLAUDE.md
- **Règles de modularité** : Application systématique des règles de découpage

### Modifié
- **Architecture components** : Refactoring complet selon règles de modularité
- **Fichiers volumineux** : Division en modules spécialisés plus maintenables

### Technique
- **Respect CLAUDE.md** : Application stricte des règles de modularité systématique

---

## [v1.6.0] - 2025-08-22

### Ajouté
- **Architecture ultra-modulaire** : Design professionnel avec règles modularité systématique
- **ReportExporter** : Composant d'export de rapports avec statistiques complètes
- **PermanentComparisonGrid** : Interface de comparaison permanente et responsive
- **Composants de colonnes** : EmptyColumn, FilledColumn, CommonFilesColumn pour modularité
- **FileTreeItem avancés** : FileTreeItem et FileTreeItemWithComparison pour comparaisons détaillées

### Modifié
- **Structure components** : Réorganisation complète selon principes de modularité
- **Interface de comparaison** : Amélioration UX avec composants spécialisés

### Technique
- **Hooks spécialisés** : useFileListExport, useReportGenerator, useMotionColors
- **Types modulaires** : Interfaces TypeScript pour export et génération de rapports

---

## [v1.5.0] - 2025-08-22

### Ajouté
- **Fonctionnalités core de comparaison** : Algorithme de comparaison de fichiers complet
- **ComparisonHeader** : En-tête avec statistiques en temps réel et boutons d'export
- **Support accessibilité** : Module src/shared/accessibility/ avec labels ARIA
- **Export de données** : Génération de rapports détaillés au format JSON/CSV

### Modifié
- **Interface de comparaison** : Affichage amélioré des résultats avec stats détaillées
- **Navigation** : Amélioration de l'accessibilité pour tous les utilisateurs

### Technique
- **Hooks métier** : useComparison avec logique de comparaison optimisée
- **Types comparison** : Interfaces pour données de comparaison et statistiques

---

## [v1.4.0] - 2025-08-21

### Ajouté
- **Sélection de dossiers** : Interface FolderSelector avec File System Access API
- **Navigation arborescente** : FileTreeDisplay pour exploration des dossiers
- **Gestion d'état avancée** : Hooks personnalisés pour sélection de dossiers

### Modifié
- **Interface responsive** : Amélioration de l'adaptabilité mobile et desktop
- **UX de sélection** : Processus de sélection de dossiers plus intuitif

### Technique
- **File System Access API** : Intégration native pour accès aux dossiers
- **Hooks spécialisés** : useFolderSelection pour logique de sélection

---

## [v1.3.0] - 2025-08-21

### Modifié
- **Migration complète vers application web pure** : Suppression totale d'Electron
- **Architecture Vite + React** : Application web moderne avec hot reload
- **Interface utilisateur améliorée** : Design plus compact et esthétique avec gradients
- **Animations interactives** : Effets hover avec rotation d'icônes et transitions fluides
- **Scripts npm simplifiés** : `npm run dev` pour développement, plus de complexité Electron

### Supprimé
- **Electron** : Suppression complète du framework desktop
- **Process main/preload** : Plus d'architecture multiprocess
- **Scripts Electron** : Suppression de tous les scripts desktop
- **Dépendances Electron** : Nettoyage du package.json

### Technique
- **Build tool** : Vite 7.1.3 avec HMR
- **Port de développement** : http://localhost:3000
- **Stack finale** : React 19 + TypeScript + Tailwind CSS + Vite

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
