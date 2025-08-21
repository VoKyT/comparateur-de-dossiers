# Règles de Modularité Systématique

## 🎯 PRINCIPE FONDAMENTAL - MODULARITÉ MAXIMALE

### ⚡ RÈGLE D'OR - RÉFLEXION AUTOMATIQUE À CHAQUE MODIFICATION
**À CHAQUE fois que tu touches un fichier, DEMANDE-TOI :**
1. "Ce fichier fait-il plus d'une chose ?"
2. "Peut-il être divisé logiquement ?"
3. "Y a-t-il des parties réutilisables ?"
4. "Dépasse-t-il 200 lignes ?"

**Si OUI à n'importe laquelle → DIVISER IMMÉDIATEMENT**

## 🚨 SIGNAUX D'ALARME OBLIGATOIRES

### 🔢 SEUILS CRITIQUES
- ✅ **200+ lignes** : Division OBLIGATOIRE immédiate
- ✅ **100+ lignes** : Analyse de modularisation requise
- ✅ **50+ lignes** : Vérifier si 1 responsabilité uniquement
- ⚠️ **Plus de 2 imports de types** : Probablement trop de responsabilités

### 🎯 INDICATEURS DE MODULARISATION NÉCESSAIRE
- ❌ **Multiples interfaces/types** dans un fichier → Séparer en modules types/
- ❌ **Logique métier + UI** mélangées → Séparer hooks + composants
- ❌ **Plusieurs fonctions complexes** → 1 fonction = 1 fichier ou hook
- ❌ **État complexe** → Extraire dans hooks dédiés
- ❌ **Rendu JSX > 100 lignes** → Composants atomiques

## 🏗️ STRATÉGIES DE DÉCOMPOSITION

### 1️⃣ SÉPARATION PAR RESPONSABILITÉ
```
❌ AVANT : HomePage.tsx (600 lignes)
✅ APRÈS : 
- HomePage.tsx (150 lignes) - Orchestration uniquement
- useFileSystem.ts - Logique fichiers
- useComparison.ts - Logique comparaison  
- ComparisonGrid.tsx - UI comparaison
- FileList.tsx - UI liste fichiers
```

### 2️⃣ EXTRACTION DE TYPES
```
❌ AVANT : Types dans le composant
✅ APRÈS :
- shared/types/file-system.ts
- shared/types/comparison.ts
- shared/types/index.ts (barrel export)
```

### 3️⃣ HOOKS MÉTIER DÉDIÉS
```
❌ AVANT : Logique dans composants
✅ APRÈS :
- shared/hooks/useFileSystem.ts
- shared/hooks/useComparison.ts
- shared/hooks/index.ts (barrel export)
```

### 4️⃣ COMPOSANTS ATOMIQUES
```
❌ AVANT : Monolithic rendering
✅ APRÈS :
- components/features/FolderSelector.tsx
- components/features/ComparisonGrid.tsx
- components/features/FileList.tsx
```

## 🔄 PROCESS DE MODULARISATION OBLIGATOIRE

### ÉTAPES SYSTÉMATIQUES
1. **🔍 ANALYSE** : Identifier les responsabilités distinctes
2. **✂️ DÉCOUPAGE** : Créer fichiers spécialisés
3. **🔗 CONNEXION** : Barrel exports + imports propres
4. **✅ VALIDATION** : TypeScript compile sans erreur
5. **📝 DOCUMENTATION** : Mettre à jour les MD concernés

### CHECKLIST AVANT DE CONTINUER UNE TÂCHE
- [ ] Le fichier modifié fait-il UNE seule chose ?
- [ ] Fait-il moins de 200 lignes ?
- [ ] Les types sont-ils dans shared/types/ si réutilisables ?
- [ ] La logique métier est-elle dans des hooks ?
- [ ] L'UI est-elle dans des composants atomiques ?
- [ ] Les barrel exports sont-ils à jour ?
- [ ] La documentation MD est-elle mise à jour ?

## 🎯 BÉNÉFICES DE LA MODULARITÉ MAXIMALE

### ⚡ DÉVELOPPEMENT
- **Bugs isolés** : Erreur = module précis
- **Tests unitaires** : 1 module = 1 test file
- **Hot reload** : Modifications ultra-rapides
- **Réutilisabilité** : Composants/hooks partageables

### 👥 ÉQUIPE
- **Collaboration** : Modules indépendants = pas de conflits
- **Onboarding** : Architecture prévisible
- **Code review** : Changements ciblés
- **Maintenance** : Responsabilités claires

### 🚀 PERFORMANCE
- **Tree shaking** : Import seulement le nécessaire
- **Code splitting** : Chargement optimal
- **Bundle optimization** : Modules indépendants
- **Lazy loading** : Composants à la demande

## ❌ ANTI-PATTERNS À ÉVITER ABSOLUMENT

### 🚫 FICHIERS FOURRE-TOUT
- Plusieurs responsabilités dans un fichier
- Types + logique + UI mélangés
- Fonctions non-liées regroupées

### 🚫 DÉPENDANCES CIRCULAIRES
- Module A importe B qui importe A
- Toujours utiliser des barrel exports
- Respecter la hiérarchie shared/ → features/ → pages/

### 🚫 MODULES TROP GÉNÉRIQUES
- Fonction "utils.ts" avec 20 fonctions différentes
- Types "common.ts" avec des interfaces non-liées
- Hooks fourre-tout

## 🎯 RÈGLE FINALE - ZÉRO TOLÉRANCE

**AUCUN fichier ne doit survivre à la question :**
*"Ce fichier peut-il être encore plus modulaire ?"*

**Si la réponse est OUI → MODULARISER IMMÉDIATEMENT**

---
**La modularité n'est pas optionnelle, c'est une obligation architecturale.**