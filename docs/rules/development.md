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

## ⚠️ RÈGLE CLAUDE CODE - THINK HARDER OBLIGATOIRE

### TOUJOURS UTILISER LE "THINK HARDER"
- ✅ **ACTIVER** le think harder de Claude Code pour TOUTES les tâches
- ✅ **RÉFLÉCHIR PROFONDÉMENT** avant d'agir, planifier les étapes
- ✅ **ANALYSER** le contexte et les implications des actions
- ✅ **VÉRIFIER** la cohérence avec les règles du projet
- ✅ **ANTICIPER** les problèmes potentiels et les solutions
- ❌ **JAMAIS** d'actions impulsives sans réflexion préalable

**Objectif :** Garantir une réflexion approfondie et structurée pour éviter les erreurs ou oublis.

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