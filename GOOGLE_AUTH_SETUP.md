# 🔐 Configuration Google Authentication

## 🎭 Mode actuel : DÉMO

Votre application utilise actuellement le **mode démo** pour tester l'interface d'authentification sans nécessiter de configuration Google.

### ✅ Ce qui fonctionne en mode démo :
- Bouton "Se connecter (Démo)" 
- Simulation utilisateur "John Doe" avec avatar
- Badge "DÉMO" visible
- Test complet de l'interface utilisateur
- Déconnexion fonctionnelle

---

## 🚀 Passer au mode PRODUCTION (recommandé)

Pour utiliser la vraie authentification Google, suivez ces étapes :

### 1. Créer un projet Google Cloud Console
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet :
   - **Nom** : `Comparateur de Dossiers`
   - **ID projet** : `comparateur-dossiers-[votre-nom]`

### 2. Activer l'API Google Identity
1. Dans le menu, allez à **"APIs & Services" > "Library"**
2. Recherchez **"Google Identity Services"** 
3. Cliquez sur **"Enable"**

### 3. Créer des identifiants OAuth 2.0
1. Allez dans **"APIs & Services" > "Credentials"**
2. Cliquez **"Create Credentials" > "OAuth client ID"**
3. **Application type** : `Web application`
4. **Name** : `Comparateur Dossiers Web`
5. **Authorized JavaScript origins** :
   ```
   http://localhost:3000
   http://127.0.0.1:3000
   ```
6. **Authorized redirect URIs** :
   ```
   http://localhost:3000
   http://localhost:3000/
   ```
7. Cliquez **"Create"**

### 4. Configurer votre Client ID
1. **Copiez** le Client ID généré (format : `123456789012-abcdefg...apps.googleusercontent.com`)
2. **Remplacez** dans `src/shared/services/googleAuthService.ts` :

```typescript
const DEFAULT_CONFIG: GoogleAuthConfig = {
  clientId: 'VOTRE_CLIENT_ID_ICI', // ← Remplacer DEMO_MODE
  scopes: ['profile', 'email'],
  cookiePolicy: 'single_host_origin'
};
```

### 5. Tester la connexion réelle
1. Sauvegardez le fichier
2. Rechargez votre application
3. Le bouton affichera maintenant "Se connecter" (sans "Démo")
4. Cliquez pour ouvrir la vraie popup Google
5. Connectez-vous avec votre compte Google

---

## 🔧 Configuration avancée

### Variables d'environnement (optionnel)
Créez un fichier `.env.local` :
```bash
VITE_GOOGLE_CLIENT_ID=votre_client_id_ici
```

Puis modifiez le service :
```typescript
clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'DEMO_MODE',
```

### Production deployment
Pour déployer en production, ajoutez votre domaine dans :
- **Authorized JavaScript origins** : `https://votre-domaine.com`
- **Authorized redirect URIs** : `https://votre-domaine.com/`

---

## 🆘 Support

**En cas de problème :**

1. **403 Forbidden** → Vérifiez que localhost:3000 est dans les origines autorisées
2. **Client ID not found** → Vérifiez que le Client ID est correctement copié
3. **Popup bloquée** → Autorisez les popups dans votre navigateur

**Mode démo** : Si vous préférez rester en mode démo, aucune action nécessaire !