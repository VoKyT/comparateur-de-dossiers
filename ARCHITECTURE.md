# Architecture - Comparateur de Dossiers

> **📄 Documentation modulaire** : Fichier principal renvoyant vers modules spécialisés

## Navigation rapide
- **[Vue d'ensemble](docs/architecture/overview.md)** → Description, objectifs, stack technique
- **[Structure](docs/architecture/structure.md)** → Organisation dossiers et fichiers
- **[Détails techniques](docs/architecture/technical-details.md)** → Implémentation, dépendances, scripts

## Architecture en bref
Application web moderne **React + TypeScript + Tailwind CSS + Vite** pour comparer le contenu de dossiers avec interface professionnelle shadcn/ui.

## Scripts essentiels
- `npm run dev` → Serveur développement (http://localhost:3000)
- `npm run build` → Build de production
- `npm run preview` → Aperçu production

## État actuel
- ✅ **Migration web complète** (v1.3.0) - Suppression Electron
- ✅ **Architecture modulaire** - React + TypeScript + shadcn/ui
- 📋 **À venir** - Fonctionnalités de comparaison de dossiers

## Notes de maintenance

### Évolutions récentes
- v1.0.0 : Fenêtre Electron fonctionnelle
- v1.0.1 : .gitignore et règles Cursor
- v1.0.2 : Amélioration .gitignore
- v1.0.3 : Spécifications architecture technique
- v1.0.4 : Réorganisation .cursorrules
- v1.0.5 : Règle vérification existence
- v1.0.6 : Section maintenance .cursorrules
- **v1.1.0 : MIGRATION COMPLÈTE REACT + TYPESCRIPT + TAILWIND CSS**
  - Migration main.js → main.ts avec handlers IPC complets
  - Migration preload.js → preload.ts avec API typée
  - Création architecture React complète (App.tsx, index.tsx)
  - Intégration Tailwind CSS avec PostCSS et Vite
  - Structure modulaire (components, features, shared, styles)
  - Build system Vite avec TypeScript et hot reload
  - Types partagés pour communication IPC sécurisée
  - Scripts optimisés pour développement et production

### À surveiller
- ✅ Migration vers Web pur : **TERMINÉE** - Suppression Electron, architecture SPA
- Ajout de fonctionnalités métier : Interface de sélection, comparaison
- Nouvelles features : Documentation obligatoire dans ce fichier
- Performance : Optimisations Vite et React
- Tests : Ajout de tests unitaires et d'intégration
- Compatibilité navigateurs : Support multi-navigateurs

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
*Dernière mise à jour : v1.3.0 - 2025-08-21 (Migration application web pure + shadcn/ui)*
