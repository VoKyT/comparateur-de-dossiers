# Architecture - Comparateur de Dossiers

> **📄 Documentation modulaire** : Fichier principal renvoyant vers modules spécialisés

## Navigation rapide
- **[Vue d'ensemble](docs/architecture/overview.md)** → Description, objectifs, stack technique
- **[Structure](docs/architecture/structure.md)** → Organisation dossiers et fichiers
- **[Détails techniques](docs/architecture/technical-details.md)** → Implémentation, dépendances, scripts

## Architecture en bref
Application web moderne **React + TypeScript + Tailwind CSS + Vite** pour comparer le contenu de dossiers avec interface professionnelle shadcn/ui, système d'internationalisation FR/EN et export de rapports.

## Scripts essentiels
- `npm run dev` → Serveur développement (http://localhost:3000)
- `npm run build` → Build de production
- `npm run preview` → Aperçu production

## État actuel (v1.9.2)
- ✅ **Migration web complète** (v1.3.0) - Suppression Electron
- ✅ **Architecture modulaire** - React + TypeScript + shadcn/ui
- ✅ **Système d'internationalisation** (v1.8.0) - Support FR/EN complet
- ✅ **Fonctionnalités core** - Sélection et comparaison de dossiers
- ✅ **Export de rapports** - Génération rapports détaillés
- ✅ **Interface animée** - Animations Framer Motion professionnelles
- ✅ **Envoi d'emails** (v1.9.0) - Service Resend pour envoi rapports
- ✅ **Intégration Google Drive** (v1.9.2) - Boutons cloud professionnels

## Notes de maintenance

### Évolutions récentes
- **v1.9.2 : INTÉGRATION BOUTONS GOOGLE DRIVE + RÈGLES LOGS DEBUGGING**
  - Boutons Google Drive dans colonnes vides pour sélection cloud future
  - Interface ultra-professionnelle avec icône officiel Google Drive
  - Handlers préparés pour future intégration API Google Drive
  - Tooltips informatifs et animations élégantes
  - Règle critique logs obligatoires pour debugging efficace 10x plus rapide
  - Guide complet format standardisé logs avec emojis contextuels
  - Infrastructure Express/CORS pour serveur local et futures extensions

- **v1.9.0 : SERVICE EMAIL MODERNE RESEND**
  - Migration EmailJS → Resend API pour fiabilité emails professionnels
  - Templates HTML automatiques avec design moderne généré
  - Modal EmailModal avec validation et gestion d'erreurs contextuelles
  - Protection débordement horizontal WelcomeScreen avec scale optimisé

- **v1.8.0 : SYSTÈME D'INTERNATIONALISATION COMPLET FR/EN**
  - Contexte I18nProvider avec détection automatique langue navigateur
  - Hook useTranslation pour accès aux traductions dans tous les composants
  - Toggles de langue avec drapeaux SVG personnalisés et animations fluides
  - Traductions complètes FR/EN pour toute l'interface utilisateur
  - Support accessibilité avec labels ARIA et navigation clavier
  - Footer enrichi avec lien Instagram professionnel VKT

- **v1.7.0 : INTÉGRATION FRAMER MOTION + ANIMATIONS PROFESSIONNELLES**
  - Transitions symétriques ultra-stylées entre écrans
  - Animations WelcomeScreen avec écran de bienvenue interactif
  - Bouton retour animé avec effets de brillance et transformations 3D
  - Optimisations performance avec motion-safe/motion-reduce

- **v1.6.0 : ARCHITECTURE ULTRA-MODULAIRE + DESIGN PROFESSIONNEL**
  - Refactoring CRITIQUE - Division fichiers >200 lignes selon CLAUDE.md
  - Règles modularité systématique avec découpage automatique
  - Components réorganisés : EmptyColumn, FilledColumn, CommonFilesColumn
  - FileTreeItem et FileTreeItemWithComparison pour comparaisons détaillées
  - ReportExporter pour génération rapports avec statistiques complètes

- **v1.5.0 : FONCTIONNALITÉS CORE COMPARAISON**
  - PermanentComparisonGrid avec interface permanente de comparaison
  - ComparisonHeader avec stats en temps réel et boutons d'export
  - Hooks spécialisés : useFileListExport, useReportGenerator, useMotionColors
  - Support accessibilité complet avec module src/shared/accessibility/

- **v1.4.0 : SÉLECTION ET NAVIGATION DE DOSSIERS**
  - FolderSelector avec support File System Access API
  - FileTreeDisplay avec navigation arborescente
  - Gestion état avancée avec hooks personnalisés
  - Interface responsive améliorée

### Fonctionnalités implémentées
- ✅ **Migration web complète** - Suppression Electron, architecture SPA
- ✅ **Interface de sélection** - Sélection de dossiers avec API native + Google Drive UI
- ✅ **Comparaison de dossiers** - Algorithme de détection différences
- ✅ **Export de rapports** - Génération rapports détaillés JSON/CSV + envoi email
- ✅ **Système i18n** - Support multilingue FR/EN complet
- ✅ **Animations professionnelles** - Framer Motion avec transitions fluides
- ✅ **Design system** - Interface ultra professionnelle shadcn/ui
- ✅ **Accessibilité** - Support ARIA et navigation clavier
- ✅ **Architecture modulaire** - Respect strict des règles CLAUDE.md
- ✅ **Service email moderne** - Resend API pour envoi rapports fiables
- ✅ **Intégration cloud** - UI Google Drive pour future extension fonctionnalités
- ✅ **Debugging optimisé** - Système de logs standardisé avec emojis contextuels

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
*Dernière mise à jour : v1.9.2 - 2025-08-25 (Intégration Google Drive UI + règles logs debugging + infrastructure Express)*
