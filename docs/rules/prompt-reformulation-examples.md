# Exemples Pratiques de Reformulation de Prompts

## 🎯 OBJECTIF
Illustrer par des exemples concrets comment transformer des prompts utilisateur faibles en prompts optimisés pour maximiser la qualité des réponses de Claude Code.

## 📝 PROCESSUS DE REFORMULATION

### Étape 1 : Analyse du prompt original
### Étape 2 : Question critique "Peut-on mieux poser cette question ?"
### Étape 3 : Reformulation optimisée avec contexte projet
### Étape 4 : Exécution sur base reformulée

---

## 🔧 EXEMPLES TECHNIQUES

### Exemple 1 : Demande d'interface

#### ❌ Prompt original faible :
> "Fais une interface pour les résultats"

#### 🔍 Analyse critique :
- Manque de contexte sur le type d'interface
- Pas de spécifications sur le design
- Aucune mention des contraintes du projet
- Pas de précision sur les fonctionnalités attendues

#### ✅ Reformulation optimisée :
> "Créer une interface complète d'affichage des résultats de comparaison de dossiers avec : 1) Design professionnel shadcn/ui + palette slate/blue, 2) Layout 3 colonnes responsive (uniqueA, common, uniqueB), 3) Headers avec statistiques, 4) Listes scrollables avec scrollbars personnalisées, 5) États vides élégants, 6) Architecture modulaire TypeScript avec composants réutilisables et respect des conventions du projet."

---

### Exemple 2 : Demande de fonctionnalité

#### ❌ Prompt original acceptable :
> "Ajoute une fonction de recherche"

#### 🔍 Analyse critique :
- Bonne idée mais manque de précisions
- Où placer la recherche ?
- Que rechercher exactement ?
- Quelle UX pour la recherche ?

#### ✅ Reformulation optimisée :
> "Implémenter une fonction de recherche avancée dans l'interface de comparaison : 1) Analyser l'architecture existante pour intégrer la recherche dans ComparisonGrid, 2) Créer un composant SearchBar avec input shadcn/ui et icône de recherche, 3) Recherche en temps réel dans les noms de fichiers des 3 colonnes, 4) Highlighting des résultats trouvés, 5) Compteur de résultats, 6) Hook useSearch pour la logique métier, 7) Gestion des états (loading, empty, results), 8) Tests et responsivité mobile complète."

---

### Exemple 3 : Demande d'amélioration

#### ❌ Prompt original vague :
> "Améliore les performances"

#### 🔍 Analyse critique :
- Très vague, quelles performances ?
- Pas de métriques spécifiées
- Pas d'analyse préalable demandée
- Manque d'objectifs mesurables

#### ✅ Reformulation optimisée :
> "Optimiser les performances de l'application en suivant cette approche structurée : 1) Analyser les goulots d'étranglement actuels (rendu, scroll, mémoire), 2) Profiler avec React DevTools les re-renders inutiles, 3) Implémenter React.memo sur les composants lourds (FileList, FileTreeRenderer), 4) Optimiser les hooks avec useMemo/useCallback, 5) Virtualiser les longues listes avec react-window si nécessaire, 6) Lazy loading des composants non critiques, 7) Mesurer l'impact avec métriques avant/après, 8) Documenter les optimisations appliquées."

---

## 🎨 EXEMPLES DESIGN

### Exemple 4 : Demande esthétique

#### ❌ Prompt original basique :
> "Change les couleurs"

#### 🔍 Analyse critique :
- Quel élément changer ?
- Quelles couleurs utiliser ?
- Respect de la palette du projet ?
- Impact sur l'accessibilité ?

#### ✅ Reformulation optimisée :
> "Réviser la palette de couleurs en respectant le système de design : 1) Analyser la palette actuelle slate/blue et identifier les éléments à améliorer, 2) Proposer des variations harmonieuses dans la gamme professionnelle, 3) Vérifier les contrastes WCAG AA pour l'accessibilité, 4) Appliquer les nouvelles couleurs de manière cohérente sur tous les composants, 5) Tester sur les thèmes clair/sombre si applicable, 6) Mettre à jour les variables CSS et tokens de design, 7) Documenter les choix chromatiques dans le guide de style."

---

### Exemple 5 : Demande de responsive

#### ❌ Prompt original insuffisant :
> "Rends ça responsive"

#### 🔍 Analyse critique :
- Quels éléments spécifiquement ?
- Quels breakpoints cibler ?
- Quels problèmes résoudre ?
- Tests sur quels devices ?

#### ✅ Reformulation optimisée :
> "Optimiser la responsivité complète de l'interface avec une approche mobile-first : 1) Auditer l'interface actuelle sur mobile (320px), tablette (768px) et desktop (1024px+), 2) Identifier les problèmes de layout, débordements et interactions tactiles, 3) Adapter la grille 3 colonnes en stack mobile avec navigation par tabs, 4) Optimiser les espacements et tailles de touch targets, 5) Revoir les modales et overlays pour mobile, 6) Tester sur devices réels iOS/Android, 7) Valider avec outils dev Chrome/Safari, 8) Documenter les patterns responsive utilisés."

---

## 🏗️ EXEMPLES ARCHITECTURE

### Exemple 6 : Refactoring

#### ❌ Prompt original peu précis :
> "Refactorise le code"

#### 🔍 Analyse critique :
- Quels fichiers refactoriser ?
- Quels problèmes résoudre ?
- Selon quels principes ?
- Impact sur l'existant ?

#### ✅ Reformulation optimisée :
> "Refactoriser l'architecture selon les règles CLAUDE.md avec approche méthodique : 1) Analyser tous les fichiers > 200 lignes et identifier les responsabilités multiples, 2) Appliquer la modularité systématique en créant des modules spécialisés, 3) Séparer la logique métier (hooks) de l'UI (composants), 4) Créer des barrel exports propres pour chaque feature, 5) Éliminer les imports circulaires et optimiser les dépendances, 6) Appliquer les conventions TypeScript strictes, 7) Valider avec compilation sans erreurs, 8) Mettre à jour la documentation architecture."

---

## ⚡ EXEMPLES QUICK FIXES

### Exemple 7 : Bug simple

#### ❌ Prompt original minimal :
> "Corrige le bug"

#### 🔍 Analyse critique :
- Quel bug exactement ?
- Comment le reproduire ?
- Quel est l'impact ?
- Tests de non-régression ?

#### ✅ Reformulation optimisée :
> "Corriger le bug spécifique avec approche méthodique : 1) Reproduire le bug dans l'environnement de dev, 2) Analyser les logs et identifier la cause racine, 3) Implémenter la correction minimale sans casser l'existant, 4) Ajouter des tests unitaires pour éviter la régression, 5) Valider la correction sur tous les cas d'usage affectés, 6) Vérifier l'impact sur les autres fonctionnalités, 7) Documenter la correction dans les notes de version si nécessaire."

---

## 📊 TEMPLATE DE REFORMULATION

```markdown
### Prompt Original :
> [Prompt utilisateur tel que reçu]

### 🔍 Analyse Critique :
- [Point faible 1]
- [Point faible 2] 
- [Élément manquant 1]
- [Élément manquant 2]

### ✅ Reformulation Optimisée :
> [Prompt reformulé avec : contexte, contraintes, étapes, livrables attendus, respect des règles projet]

### 🎯 Éléments Intégrés :
- [Contrainte design/architecture 1]
- [Contrainte technique 2]
- [Règle projet 3]
- [Livrable attendu 4]
```

---

**📋 NOTE IMPORTANTE :** Ces exemples doivent être adaptés selon le contexte spécifique de chaque demande. Le processus de reformulation doit devenir un réflexe systématique pour maximiser la qualité des réponses de Claude Code.