# Configuration Resend

## 📧 Configuration moderne de l'envoi d'emails

L'application utilise **Resend**, le service email moderne pour développeurs, pour envoyer les rapports de comparaison avec une meilleure délivrabilité et une API simplifiée.

## ⭐ Pourquoi Resend ?

- **API moderne** : Plus simple qu'EmailJS/SendGrid
- **Meilleure délivrabilité** : Templates HTML professionnels
- **Plan généreux** : 100 emails/jour, 3000/mois gratuits
- **Sécurisé** : Clé API côté backend uniquement
- **Support React** : Templates avec composants React natifs

### 🚀 Étapes de configuration

#### 1. Créer un compte Resend
- Rendez-vous sur [resend.com](https://resend.com/)
- Créez un compte gratuit
- Confirmez votre adresse email

#### 2. Obtenir votre clé API
- Dans le dashboard Resend, allez dans "API Keys"
- Cliquez "Create API Key"
- Nommez votre clé (ex: "comparateur-dossiers")
- **Copiez la clé API** (ex: `re_abc123...`)
- ⚠️ **Gardez cette clé secrète !**

#### 3. Vérifier votre domaine
- Dans "Domains", cliquez "Add Domain"
- Entrez votre domaine (ex: `monsite.com`)
- Ajoutez les enregistrements DNS fournis
- Attendez la vérification (quelques minutes à quelques heures)

#### 4. Configurer l'application
Modifiez le fichier `src/shared/services/emailService.ts` :

```typescript
const RESEND_CONFIG = {
  API_KEY: 're_votre_cle_api',              // Remplacez par votre clé Resend
  FROM_EMAIL: 'noreply@votre-domaine.com'   // Remplacez par votre domaine vérifié
};
```

**Exemple de configuration complète :**
```typescript
const RESEND_CONFIG = {
  API_KEY: 're_AbCdEf123456789',
  FROM_EMAIL: 'rapport@monentreprise.com'
};
```

### ✅ Test de la configuration

1. Sélectionnez deux dossiers dans l'application
2. Cliquez sur "Envoyer" (bouton email)
3. Saisissez votre adresse email de test
4. Cliquez "Envoyer"
5. Vérifiez la réception de l'email (plus beau qu'EmailJS !)

### 🔒 Sécurité renforcée

- **Clé API privée** : Jamais exposée côté frontend
- **Domaine vérifié** : Protection contre le spoofing
- **Rate limiting** : Limitations automatiques
- **DKIM/SPF** : Configuration automatique par Resend

### 💰 Tarification Resend 2025

**Plan gratuit :**
- **100 emails/jour** (3000/mois)
- Templates HTML illimités
- Analytics avancées
- Support communautaire

**Plan Pro ($20/mois) :**
- **50,000 emails/mois**
- Support prioritaire
- Domaines personnalisés
- Webhooks avancés

### 🛠️ Dépannage moderne

#### L'email n'est pas envoyé
1. Vérifiez la configuration dans `emailService.ts`
2. Consultez les logs console (plus détaillés qu'EmailJS)
3. Vérifiez le statut de votre domaine dans Resend
4. Testez l'API Resend avec curl

#### Email en spam (rare avec Resend)
1. **Domaine vérifié** : Vérifiez vos enregistrements DNS
2. **Contenu** : Évitez les mots-clés suspects
3. **Réputation** : Resend gère automatiquement

#### Erreurs API
1. **Clé invalide** : Vérifiez la clé dans le dashboard
2. **Domaine non vérifié** : Attendez la vérification DNS
3. **Quota dépassé** : Vérifiez votre usage

### 📊 Analytics avancées

Resend fournit des métriques détaillées :
- **Taux de délivrabilité** : Meilleur que les concurrents
- **Opens/Clicks tracking** : Si activé
- **Bounce/Spam reports** : En temps réel
- **Logs détaillés** : Garde 30 jours d'historique

### 🎯 Template HTML automatique

L'application génère automatiquement un email HTML moderne avec :
- Design responsive
- Branding cohérent
- Rapport formaté lisiblement
- Compatible tous clients email

---

## 🚀 Migration depuis EmailJS

Si vous migrez depuis EmailJS :

1. ✅ **Désinstallé** : Package `@emailjs/browser` retiré
2. ✅ **Installé** : Package `resend` ajouté
3. ✅ **API modernisée** : Plus simple et puissante
4. ✅ **Templates automatiques** : Plus besoin de configuration manuelle
5. ✅ **Sécurité renforcée** : Clés privées uniquement

**Note :** Cette configuration est requise uniquement pour l'envoi par email. L'export local fonctionne sans configuration.