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

## [v1.9.3] - 2025-08-25

### 🚀 Ajouté
- **Authentification Google OAuth fonctionnelle** : Intégration complète google-auth-library pour connexion utilisateur
- **GoogleAuthButton modulaire** : Composant réutilisable avec variants (compact) et gestion état auth
- **Gestion état utilisateur** : Handler onAuthStateChange pour suivi connexion/déconnexion temps réel  
- **Types Google Accounts** : @types/google.accounts pour typage TypeScript strict
- **Interface header améliorée** : Positionnement centré avec séparateur visuel élégant
- **Logs standardisés auth** : Traçabilité complète des événements authentification avec emojis
- **Architecture sécurisée** : Base solide pour accès Google Drive API avec tokens OAuth

### 🔄 Modifié
- **HomePage header** : Intégration GoogleAuthButton avec wrapper centré et gap optimisé
- **Stack technique** : Ajout dépendances Google Auth officielles au package.json
- **Interface utilisateur** : Contrôles auth + langue dans header avec séparateur professionnel
- **Gestion état** : Logs contextuels pour debugging authentification et flux utilisateur

### 🔧 Technique
- **Dépendances production** : google-auth-library ^10.2.1 + @types/google.accounts ^0.0.17
- **Composant modulaire** : GoogleAuthButton dans @/components/common avec architecture scalable
- **Props configurables** : variant, size, showText, onAuthStateChange pour flexibilité maximale
- **Sécurité OAuth** : Implémentation standard Google pour tokens sécurisés
- **TypeScript strict** : Typage complet pour API Google et gestion erreurs

### 📚 Documentation
- **README v1.9.3** : Stack technique étendu avec Google Auth Library
- **ARCHITECTURE.md** : État actuel v1.9.3 avec authentification OAuth fonctionnelle
- **Fonctionnalités** : Authentification Google OAuth et GoogleAuthButton modulaire documentées

### 🎯 Objectif
Passage d'interface mockée vers authentification Google réelle :
- Base solide pour accès sécurisé Google Drive API
- Architecture extensible pour sélection dossiers cloud
- Gestion utilisateur complète avec état auth persistant

---

## [v1.9.2] - 2025-08-25

### 🚀 Ajouté
- **Boutons Google Drive professionnels** : Interface élégante dans colonnes vides pour future intégration cloud
- **Icône Google officiel** : SVG authentique avec triangles colorés (vert/jaune/bleu) et animations
- **Handlers Google Drive** : Logique préparée pour sélection dossiers cloud (Local vs Drive, Drive vs Drive)
- **Tooltips informatifs** : Messages contextuels expliquant fonctionnalité à venir
- **Règle CRITIQUE logs obligatoires** : Système de debugging 10x plus efficace
- **Format standardisé logs** : Structure [EMOJI] [CONTEXTE] [ACTION] - [DÉTAILS] avec emojis contextuels
- **Guide logs complet** : Documentation détaillée dans docs/rules/development.md
- **Infrastructure Express/CORS** : Serveur local et dépendances pour extensions futures

### 🔄 Modifié
- **EmptyColumn** : Ajout props `onGoogleDriveSelect` avec interface séparateur "OU" élégant
- **PermanentComparisonGrid** : Support handlers Google Drive A/B avec propagation props
- **HomePage** : Intégration handlers Google Drive avec placeholders informatifs
- **Animations** : Effets hover sur boutons Google Drive (rotation, scale, brightness)
- **Design cohérent** : Style shadcn/ui parfaitement intégré avec palette professionnelle

### 🔧 Technique
- **Props modulaires** : Extension interfaces pour support Google Drive optionnel
- **Séparation responsabilités** : Handlers dédiés par colonne avec logique isolée
- **Performance** : Animations GPU optimisées avec spring transitions
- **Accessibilité** : Support tooltips et navigation clavier complète
- **Architecture préparée** : Base solide pour intégration API Google Drive future

### 📚 Documentation
- **CLAUDE.md** : Nouvelle règle critique logs obligatoires avec exemples concrets
- **docs/rules/development.md** : Guide complet 110 lignes sur système logs standardisé
- **README v1.9.2** : Mise à jour avec boutons Google Drive et nouveautés
- **ARCHITECTURE.md** : État actuel v1.9.2 avec fonctionnalités cloud UI

### 🎯 Objectif
Extension capacités comparaison vers cloud avec interface ultra-professionnelle prête pour :
- Sélection dossiers Google Drive
- Comparaisons hybrides (Local vs Drive, Drive vs Drive)
- Architecture extensible pour autres services cloud futurs

---

## [v1.9.0] - 2025-08-24

### 🚀 Ajouté
- **Service Email Moderne** : Migration d'EmailJS vers Resend API pour envoi d'emails plus fiables
- **Envoi d'emails** : Bouton "Envoyer" pour transmettre rapports par email directement
- **Templates HTML automatiques** : Emails professionnels avec design moderne généré automatiquement
- **Modal EmailModal** : Interface dédiée envoi email avec validation et gestion d'erreurs
- **Configuration Resend** : Documentation complète setup API avec guide pas-à-pas
- **Architecture modulaire critique** : Division FilledColumn (301→3 fichiers) et EmailModal (286→4 fichiers)
- **Protection débordement** : Fix barre défilement horizontale WelcomeScreen transitoire

### 🔄 Modifié
- **Boutons export** : Tooltips conditionnels selon état de la comparaison (actifs/inactifs)
- **Interface responsive** : Améliorations mobile pour modals et composants
- **Gestion d'erreurs** : Messages contextuels spécifiques à Resend API
- **Scale animation** : WelcomeScreen titre réduit de 1.4→1.2 pour éviter overflow horizontal

### 🔧 Technique
- **Package migration** : `@emailjs/browser` supprimé → `resend` v6.5.0 ajouté
- **Types modernisés** : Interfaces EmailData et ResendConfig pour API Resend
- **Sécurité renforcée** : Clés API privées côté backend (vs publiques EmailJS)
- **Validation** : Vérification configuration avant envoi avec messages d'aide
- **CSS protection** : `overflow-x: hidden` global pour prévenir débordements futurs

### 📚 Documentation
- **Guide Resend complet** : `docs/email/configuration.md` avec comparaison EmailJS
- **README v1.9.0** : Mise à jour avec nouvelles fonctionnalités email et stack technique
- **CHANGELOG** : Historique détaillé avec catégorisation des changements
- **Migration path** : Instructions passage EmailJS → Resend étape par étape

---

## [v1.8.2] - 2025-08-24

### Ajouté
- **Internationalisation complète des rapports** : Support FR/EN pour tous exports TXT/CSV/JSON
- **Hook useReportGenerator i18n** : Génération rapports traduits selon langue interface

### Modifié
- **Exports multilingues** : Messages et en-têtes traduits dans rapports générés
- **Types traductions** : Interfaces étendues pour système i18n des rapports

---

## [v1.8.1] - 2025-08-24

### Ajouté
- **Documentation système i18n** : Guide complet internationalisation dans docs/
- **Modules docs/ structurés** : Architecture modulaire pour documentation technique

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
