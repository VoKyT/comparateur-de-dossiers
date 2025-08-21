# Guidelines de Maintenance

## 🔧 MAINTENANCE DU CLAUDE.MD

### ⚠️ RÈGLE CRITIQUE - MODULARITÉ DES FICHIERS MD
**PRINCIPE FONDAMENTAL : Fichiers courts et focalisés**
- ✅ **LECTURE RAPIDE** : Chaque fichier docs/ doit se lire en < 2 minutes
- ✅ **FOCUS UNIQUE** : Un fichier = Un domaine précis (design, dev, etc.)
- ✅ **DIVISION SYSTÉMATIQUE** : Si > 150 lignes, chercher division possible
- ✅ **NAVIGATION FLUIDE** : 5-10 petits fichiers > 1 gros fichier
- ✅ **REPÉRAGE FACILE** : Titres clairs, sections courtes, exemples concis
- ❌ **JAMAIS de fichiers MD monstre** - Diviser impérativement

### Indicateurs de division nécessaire
- **Longueur** : > 150 lignes ou lecture > 2 minutes
- **Sujets multiples** : Mélange domaines (ex: design + git)
- **Sections trop longues** : Une section > 50 lignes
- **Navigation difficile** : Besoin de scroll pour retrouver info
- **Contextes différents** : Règles pour situations distinctes

### Vérification avant mise à jour du CLAUDE.md
Avant de modifier le fichier CLAUDE.md principal, TOUJOURS vérifier :

**Question recommandée**: *"Avant de mettre à jour le fichier CLAUDE.md, peux-tu vérifier qu'il n'y a aucune répétition inutile ou redondance entre le contenu que je veux ajouter et l'existant ? Si tu trouves des doublons, des sections qui se chevauchent ou une organisation non optimale, propose-moi une restructuration pour éviter les répétitions et améliorer la lisibilité."*

### Principes de maintenance
- **Pas de duplication** : Chaque règle/information doit apparaître une seule fois
- **Organisation logique** : Regrouper les règles par thème cohérent
- **Sections claires** : Chaque section doit avoir un rôle unique et bien défini
- **Références croisées** : Utiliser des renvois plutôt que de répéter l'information
- **Lisibilité optimale** : Structure facile à naviguer et à comprendre

### Validation post-modification
Après chaque mise à jour du CLAUDE.md :
1. Vérifier qu'aucune information n'est dupliquée
2. S'assurer que l'organisation reste logique
3. Contrôler que la navigation est fluide
4. Valider que chaque section a un objectif distinct

## 🏗️ MAINTENANCE DE L'ARCHITECTURE

### Fichier ARCHITECTURE.md obligatoire
- **Lecture systématique** : Claude Code doit TOUJOURS lire `ARCHITECTURE.md` pour comprendre le contexte actuel du projet
- **Mise à jour obligatoire** : À chaque changement architectural significatif, mettre à jour `ARCHITECTURE.md`

### Changements nécessitant une mise à jour
- ✅ **Nouveau module/feature** : Ajout de dossier dans `src/features/`
- ✅ **Nouveau composant principal** : Ajout dans `src/components/`
- ✅ **Nouvelle intégration** : API, service, librairie majeure
- ✅ **Réorganisation** : Changement de structure de dossiers
- ✅ **Migration technologique** : Changement de stack (ex: ajout React)
- ❌ **Fichiers mineurs** : Types, utils, petits correctifs

### Format de mise à jour
Lors de modifications importantes :
1. **Lire d'abord** `ARCHITECTURE.md` pour comprendre l'état actuel
2. **Documenter les changements** dans la section appropriée
3. **Mettre à jour la version** en fin de fichier
4. **Commit** avec message explicite sur l'évolution architecturale

## 📋 VALIDATION AVANT AJOUT/MODIFICATION

### Checklist pré-développement
Avant d'ajouter une fonctionnalité, vérifier:

1. **Existence préalable**: TOUJOURS demander à Claude Code de vérifier si cette fonctionnalité existe déjà dans le codebase
   - Question recommandée: *"Avant de développer [FONCTIONNALITÉ], peux-tu vérifier dans tout le codebase si cette fonctionnalité ou une partie similaire existe déjà ? Si oui, indique-moi où elle se trouve et si je peux la réutiliser/étendre plutôt que la recréer."*
   - Rechercher dans tous les fichiers : composants, services, hooks, types, utils
   - Vérifier les fonctionnalités partielles qui pourraient être étendues
   - Éviter la duplication de code et les reimplementations inutiles

2. **Emplacement** : dans quel module/feature cette fonctionnalité appartient-elle ?
3. **Dépendances** : quels sont les imports nécessaires ? Sont-ils autorisés ?
4. **Interface** : comment cette fonctionnalité expose-t-elle son API ?
5. **Tests** : comment tester cette fonctionnalité de manière isolée ?
6. **Documentation** : quel impact sur le README et la doc d'architecture ?
7. **Gitignore** : faut-il ajouter des exclusions dans le .gitignore ?

## 🔍 VALIDATION POST-DÉVELOPPEMENT

### Checklist après implémentation
**AVANT de terminer TOUTE tâche de développement :**

1. ✅ **Tests fonctionnels** : La fonctionnalité marche-t-elle comme attendu ?
2. ✅ **Logs de debug** : Logs d'identification ajoutés pour traçabilité ?
3. ✅ **Standards code** : Respect des conventions de nommage et structure ?
4. ✅ **Documentation README** : Mise à jour nécessaire ?
5. ✅ **Documentation ARCHITECTURE** : Changement architectural à documenter ?
6. ✅ **Gitignore** : Nouveaux fichiers à exclure ?
7. ✅ **Dépendances** : Nouvelles dépendances ajoutées au package.json ?
8. ✅ **Build** : L'application se lance-t-elle sans erreur ?

### Test complet recommandé
1. **Développement** → Ajouter logs immédiatement
2. **Build** → `npm run build` 
3. **Test** → `npm start` et vérifier logs console
4. **Validation** → Confirmer que les logs correspondent au comportement attendu
5. **Documentation** → Mettre à jour si nécessaire
6. **Commit** → Seulement si tous les tests passent

## 🔄 MAINTENANCE CONTINUE

### Revue périodique
**Mensuelle** :
- Révision des modules docs/ pour cohérence
- Mise à jour des liens et références
- Validation que les exemples fonctionnent toujours

**Par release** :
- Validation de toute la documentation
- Mise à jour des versions dans les exemples
- Vérification des screenshots/captures d'écran

### Indicateurs de qualité
- ✅ **Pas de duplication** entre fichiers
- ✅ **Navigation fluide** entre modules
- ✅ **Exemples à jour** et fonctionnels
- ✅ **Instructions claires** et non ambiguës
- ✅ **Références externes** valides

## 🚨 SIGNALEMENT DE PROBLÈMES

### Cas nécessitant une révision urgente
- **Contradictions** entre modules
- **Instructions obsolètes** ou incorrectes
- **Liens brisés** ou références invalides
- **Exemples non fonctionnels**
- **Doublons** découverts

### Process de correction
1. **Identifier** le problème précisément
2. **Localiser** tous les endroits impactés
3. **Corriger** de manière cohérente
4. **Valider** que la correction est complète
5. **Tester** que les instructions fonctionnent
6. **Commiter** avec message explicite