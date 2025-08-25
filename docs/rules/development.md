# Règles de Développement

## ⚠️ RÈGLE CRITIQUE - PAS DE SURENGINEERING

### QUAND L'UTILISATEUR DEMANDE QUELQUE CHOSE DANS LE TCHAT
- ✅ **FAIRE EXACTEMENT** ce qui est demandé, rien de plus
- ❌ **NE PAS AJOUTER** de fonctionnalités non demandées
- ❌ **NE PAS CRÉER** d'interface complexe si c'est pas demandé
- ❌ **NE PAS FAIRE** de "améliorations" non sollicitées
- ✅ **RESTER SIMPLE** et répondre précisément à la demande
- ✅ **DEMANDER** si l'utilisateur veut plus avant d'ajouter
- ✅ **MAIS TOUJOURS ESTHÉTIQUE** - même simple, ça doit être beau

### Exemples
- Demande: "Un bouton au centre" → Réponse: UN bouton au centre esthétique, point final
- Demande: "Changer la couleur" → Réponse: Changer pour une couleur harmonieuse et moderne

## 🎯 RÈGLE CRITIQUE - REFORMULATION SYSTÉMATIQUE DES PROMPTS

### PROCESSUS OBLIGATOIRE À CHAQUE PROMPT UTILISATEUR
**AVANT de réaliser toute action, TOUJOURS :**

1. **📝 ANALYSE DU PROMPT INITIAL**
   - Lire et comprendre la demande utilisateur
   - Identifier les objectifs explicites et implicites
   - Détecter les ambiguïtés ou manques d'informations

2. **🔍 QUESTION CRITIQUE**
   - **Se demander SYSTÉMATIQUEMENT :** *"Cette question peut-elle être mieux posée ?"*
   - Évaluer la clarté, la précision et l'exhaustivité de la demande
   - Identifier les éléments manquants pour optimiser la réponse

3. **✨ REFORMULATION OPTIMISÉE**
   - Reformuler le prompt pour maximiser sa qualité et sa précision
   - Ajouter les contextes techniques nécessaires
   - Intégrer les contraintes du projet (design, architecture, etc.)
   - Préciser les attentes en termes de livrables

4. **⚡ EXÉCUTION SUR BASE REFORMULÉE**
   - Réaliser les actions selon le prompt reformulé
   - Appliquer toutes les règles du projet
   - Documenter les choix effectués

### EXEMPLES DE REFORMULATION

#### Prompt original faible :
> "Ajoute un bouton"

#### Reformulation optimisée :
> "Créer un bouton d'action moderne avec design shadcn/ui, conforme aux règles esthétiques du projet (palette slate/blue, hover subtils, responsif), positionné selon l'architecture modulaire existante, avec gestion d'état appropriée et intégration TypeScript complète."

#### Prompt original acceptable :
> "Améliore l'interface de comparaison"

#### Reformulation optimisée :
> "Optimiser l'interface de comparaison en analysant d'abord l'UX actuelle, puis améliorer : 1) la lisibilité des résultats, 2) la performance du scroll sur listes longues, 3) les indicateurs visuels de progression, 4) la responsivité mobile, tout en conservant l'architecture modulaire et le design système professionnel existant."

## ⚠️ RÈGLE CLAUDE CODE - THINK HARDER OBLIGATOIRE

### TOUJOURS UTILISER LE "THINK HARDER"
- ✅ **ACTIVER** le think harder de Claude Code pour TOUTES les tâches
- ✅ **RÉFLÉCHIR PROFONDÉMENT** avant d'agir, planifier les étapes
- ✅ **ANALYSER** le contexte et les implications des actions
- ✅ **VÉRIFIER** la cohérence avec les règles du projet
- ✅ **ANTICIPER** les problèmes potentiels et les solutions
- ✅ **APPLIQUER** la reformulation systématique des prompts
- ❌ **JAMAIS** d'actions impulsives sans réflexion préalable

**Objectif :** Garantir une réflexion approfondie et structurée avec une compréhension optimisée des demandes.

## 🔄 RÈGLE CRITIQUE - MODULARITÉ SYSTÉMATIQUE

### QUESTION AUTOMATIQUE À CHAQUE MODIFICATION
**AVANT de modifier/créer un fichier, TOUJOURS se demander :**
1. "Ce fichier fait-il plus d'une chose ?"
2. "Peut-il être divisé logiquement ?"
3. "Dépasse-t-il ou va-t-il dépasser 200 lignes ?"
4. "Y a-t-il des parties réutilisables ?"

**Si OUI à une question → MODULARISER IMMÉDIATEMENT**

### PROCESS DE MODULARISATION OBLIGATOIRE
1. **🔍 ANALYSE** : Identifier les responsabilités distinctes
2. **✂️ DÉCOUPAGE** : Créer fichiers spécialisés
3. **🔗 CONNEXION** : Barrel exports + imports propres
4. **✅ VALIDATION** : Compilation TypeScript réussie
5. **📝 DOCUMENTATION** : Mettre à jour fichiers MD concernés

**Voir → [docs/rules/modularity.md](modularity.md) pour le guide complet**

## 🔍 VALIDATION AVANT AJOUT/MODIFICATION

### Vérification obligatoire avant développement
Avant d'ajouter une fonctionnalité, vérifier:

1. **Existence préalable**: TOUJOURS demander à Claude Code de vérifier si cette fonctionnalité existe déjà dans le codebase
   - Question recommandée: *"Avant de développer [FONCTIONNALITÉ], peux-tu vérifier dans tout le codebase si cette fonctionnalité ou une partie similaire existe déjà ? Si oui, indique-moi où elle se trouve et si je peux la réutiliser/étendre plutôt que la recréer."*
   - Rechercher dans tous les fichiers : composants, services, hooks, types, utils
   - Vérifier les fonctionnalités partielles qui pourraient être étendues
   - Éviter la duplication de code et les reimplementations inutiles

2. **Emplacement**: dans quel module/feature cette fonctionnalité appartient-elle ?
3. **Dépendances**: quels sont les imports nécessaires ? Sont-ils autorisés ?
4. **Interface**: comment cette fonctionnalité expose-t-elle son API ?
5. **Tests**: comment tester cette fonctionnalité de manière isolée ?
6. **Documentation**: quel impact sur le README et la doc d'architecture ?
7. **Gitignore**: faut-il ajouter des exclusions dans le .gitignore ?

## 🚫 ANTI-PATTERNS À ÉVITER

- **God objects**: fichiers > 200 lignes (sauf cas exceptionnels documentés)
- **Couplage fort**: imports directs entre features
- **Logique dans les composants**: calculs complexes, appels API directs
- **Barrel exports trop larges**: exposer uniquement l'API publique
- **Mixage des responsabilités**: UI + logique métier dans le même fichier

## 🔍 RÈGLE CRITIQUE - LOGS OBLIGATOIRES POUR DEBUGGING

### PRINCIPE FONDAMENTAL
**TOUT code doit inclure des logs stratégiques pour faciliter le debugging rapide et efficace.**

### QUAND LOGGER - OBLIGATOIRE
✅ **Points d'entrée de fonctions critiques**
```tsx
const handleFolderSelect = async () => {
  console.log(`👆 [FOLDER_SELECTION] DEBUT handleFolderSelect`);
  // logique...
}
```

✅ **Avant et après opérations importantes**
```tsx
console.log(`🔥 [HOOK] Avant setState - Données:`, newData);
setState(newData);
console.log(`✅ [HOOK] setState appelé avec succès`);
```

✅ **États de composants React (pendant développement)**
```tsx
console.log(`🔗 [COMPONENT] Render - État:`, {
  hasData: !!data,
  isLoading,
  items: items?.length || 0
});
```

✅ **Flux de données entre composants**
```tsx
console.log(`🏠 [PARENT] Transmission vers enfant:`, {
  propA: propA ? 'présent' : 'null',
  propB: propB?.length || 0
});
```

✅ **Erreurs et cas limites**
```tsx
if (!item?.children) {
  console.warn(`⚠️ [COMPONENT] Item sans children:`, item);
  return fallback;
}
```

### FORMAT DE LOGS STANDARDISÉ

#### Structure recommandée
```
[EMOJI] [CONTEXTE] [ACTION] - [DETAILS]
```

#### Emojis standards
- `🎯` Début/initialisation
- `👆` Action utilisateur
- `🔥` Opération critique
- `✅` Succès/validation
- `❌` Erreur/échec
- `⚠️` Avertissement
- `🔗` État/render de composant
- `🏠` Transmission parent→enfant
- `🔧` Configuration/setup
- `🔍` Debug/investigation

### EXEMPLES CONCRETS DU PROJET

#### ❌ Log inutile
```tsx
console.log("data", data); // Pas de contexte
```

#### ✅ Log efficace
```tsx
console.log(`🔗 [USE_FOLDER_SELECTION] Hook render - État:`, {
  folderA: folderA ? { name: folderA.name } : 'null',
  folderB: folderB ? { name: folderB.name } : 'null'
});
```

#### ✅ Log de debugging spécialisé
```tsx
console.log(`🔍 [DEBUG] Structure du premier élément:`, tree[0]);
```

### RÈGLES DE NETTOYAGE

#### Logs à conserver (PRODUCTION)
- Erreurs critiques
- Actions utilisateur importantes
- États applicatifs critiques

#### Logs à supprimer (AVANT PRODUCTION)
- Logs de debugging détaillés
- États de render fréquents
- Données sensibles

### AVANTAGES DÉMONTRÉS
1. **Debugging 10x plus rapide** - Identification immédiate des problèmes
2. **Compréhension du flux** - Visualisation claire des données
3. **Détection précoce** - Identification des erreurs avant qu'elles cassent
4. **Maintenance facilitée** - Compréhension rapide du code existant

### RÈGLE CRITIQUE
**🚨 AVANT de commit - Vérifier que les logs de debugging sont appropriés pour l'environnement cible (dev/prod)**