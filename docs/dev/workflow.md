# Workflow de Développement

## ⚠️ RÈGLE OBLIGATOIRE - HOT RELOAD VITE TOUJOURS ACTIVÉ

### L'APPLICATION DOIT TOUJOURS ÊTRE EN HOT RELOAD AVEC VITE PENDANT LE DÉVELOPPEMENT

#### PROCÉDURE OBLIGATOIRE
1. Terminal 1 : `npm run vite:dev` (attendre "VITE ready")
2. Terminal 2 : `npm run electron:dev` (attendre logs de synchronisation)

#### Avantages du Hot Reload
- ✅ **HMR Vite activé** : modifications React/TypeScript mises à jour instantanément
- ✅ **Pas de redémarrage manuel** : Hot Module Replacement automatique
- ✅ **Modification main.ts** : Redémarrage automatique d'Electron via electronmon
- ✅ **Modification React/CSS** : Mise à jour instantanée sans redémarrage

#### Scripts à utiliser
- ⚠️ **`npm run dev` moins fiable** : problèmes de timing Vite/Electron
- ❌ **JAMAIS utiliser `npm start`** pendant le développement (trop lent)
- ✅ **`npm start` uniquement** pour tester la version finale

**Objectif :** Développement fluide avec hot reload Vite pour une productivité maximale.

## ⚠️ RÈGLE OBLIGATOIRE - NETTOYAGE AUTOMATIQUE DES PORTS

### TOUJOURS NETTOYER LES PORTS AUTOMATIQUEMENT AU LANCEMENT DE L'APPLICATION

#### Règles de nettoyage
- ✅ **NETTOYAGE AUTOMATIQUE** : L'application nettoie automatiquement les ports dès qu'elle se lance
- ✅ **TIMING** : **AU DÉMARRAGE DE L'APPLICATION** - avant toute connexion réseau
- ✅ **PORTS CONCERNÉS** : 3000 (Vite), 3001 (WebSocket), 3002 (Alternatif)
- ✅ **IMPLEMENTATION** : Script `scripts/kill-ports.cjs` intégré dans Electron main.ts
- ✅ **SILENCIEUX** : Nettoyage invisible sans fenêtres CMD parasites
- ✅ **MULTI-PLATEFORME** : Windows (netstat + taskkill), Unix (lsof + kill)

#### Scripts de nettoyage disponibles
- `npm run kill-ports` : Nettoie ports 3000, 3001, 3002
- `npm run kill-ports:all` : Nettoie tous ports dev (3000, 3001, 3002, 5173, 8080)
- `npm run dev` : Lance dev avec nettoyage automatique
- `npm run dev:clean` : Clean + kill-ports + dev complet

#### Intégration automatique
**LE NETTOYAGE EST INTÉGRÉ AUTOMATIQUEMENT AU LANCEMENT DE L'APPLICATION :**
- ✅ **Au démarrage d'Electron** : `killPorts()` appelé dans `app.whenReady()` AVANT toute autre action
- ✅ **Séquence obligatoire** : Lancement app → Nettoyage ports → Chargement interface
- ✅ **Scripts npm** : Nettoyage avant chaque lancement de serveur de développement
- ✅ **Logs détaillés** : IDs uniques `[AUTO_KILL]` et `[KILL_PORTS]` pour traçabilité
- ✅ **Gestion d'erreurs** : Continue même si certains ports échouent

**RÈGLE ABSOLUE : Dès qu'on lance l'application, les ports sont automatiquement nettoyés !**

**Objectif :** Éliminer définitivement les problèmes de ports occupés au démarrage de l'application.

## ⚠️ RÈGLE CRITIQUE - TEST AUTOMATIQUE DES NOUVELLES FONCTIONNALITÉS

### Test obligatoire après chaque développement
**APRÈS chaque nouvelle fonctionnalité développée :**
1. ✅ **AJOUTER DES LOGS** spécifiques pour la fonctionnalité
2. ✅ **TESTER AUTOMATIQUEMENT** via `npm start` 
3. ✅ **VÉRIFIER LES LOGS** dans la console pour confirmer le bon fonctionnement
4. ✅ **TESTER MANUELLEMENT** si nécessaire (clics, interactions)
5. ✅ **MARQUER COMME COMPLÉTÉ** seulement si tout fonctionne

### Stratégie de logs pour tests
**TOUJOURS ajouter des logs console UNIQUES pour :**
- ✅ **Initialisation** : `console.log('🆕 [NOM_FEATURE] [ID_UNIQUE] initialisée')`
- ✅ **Actions utilisateur** : `console.log('👆 [NOM_FEATURE] [ID_UNIQUE] action: [DESCRIPTION]')`
- ✅ **Succès** : `console.log('✅ [NOM_FEATURE] [ID_UNIQUE] succès: [RÉSULTAT]')`
- ✅ **Erreurs** : `console.error('❌ [NOM_FEATURE] [ID_UNIQUE] erreur:', error)`
- ✅ **État** : `console.log('📊 [NOM_FEATURE] [ID_UNIQUE] état:', data)`

### Règles pour les IDs uniques de logs
**OBLIGATOIRE : Chaque fonctionnalité doit avoir un ID unique facilement identifiable**
- Format : `[FEATURE_ACTION_NUMERO]` ou `[FEATURE_STEP_XX]`
- Exemples : `[FOLDER_SELECT_01]`, `[COMPARISON_START_02]`, `[EXPORT_CSV_03]`
- **Incrémentation** : Toujours incrémenter le numéro pour chaque nouveau log d'une feature
- **Recherche facile** : Permet de retrouver rapidement dans la console avec Ctrl+F

#### Exemple de logs avec IDs uniques
```typescript
// Au démarrage
console.log('🆕 [FOLDER_SELECTOR] [FS_INIT_01] Composant initialisé');

// Action utilisateur  
console.log('👆 [FOLDER_SELECTOR] [FS_CLICK_02] Bouton sélection cliqué');

// Dialog ouvert
console.log('📊 [FOLDER_SELECTOR] [FS_DIALOG_03] Dialog système ouvert');

// Résultat
console.log('✅ [FOLDER_SELECTOR] [FS_SUCCESS_04] Dossier sélectionné:', folderPath);

// Erreur possible
console.error('❌ [FOLDER_SELECTOR] [FS_ERROR_05] Sélection annulée par utilisateur');
```

### Avantages des IDs uniques
- ✅ **Recherche rapide** : `Ctrl+F "FS_INIT_01"` trouve instantanément le log
- ✅ **Debug précis** : Identifie exactement quelle étape a échoué  
- ✅ **Suivi chronologique** : L'ordre des numéros indique la séquence
- ✅ **Documentation automatique** : Les logs servent de trace d'exécution

### Process de test automatique
1. **Développement** → Ajouter logs immédiatement
2. **Build** → `npm run build` 
3. **Test** → `npm start` et vérifier logs console
4. **Validation** → Confirmer que les logs correspondent au comportement attendu
5. **Commit** → Seulement si tous les tests passent

## 📋 RÈGLES POUR LES COMMANDES TERMINAL

- **JAMAIS de "&&" en début de commande** : Les commandes doivent être écrites individuellement, une par ligne
- **Format obligatoire** : Chaque commande sur sa propre ligne dans les blocs bash
- **Séparation claire** : Utiliser des commentaires ou des lignes vides entre groupes de commandes

### Exemple correct
```bash
# Installation des dépendances
npm install react@latest
npm install -D typescript@latest

# Configuration initiale
npx tsc --init
```

### Exemple incorrect
```bash
&& npm install react@latest
&& npm install -D typescript@latest
```