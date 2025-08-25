# Comparateur de Dossiers v1.9.4

Application web moderne **React + TypeScript + Tailwind CSS** pour comparer le contenu de deux dossiers avec interface professionnelle shadcn/ui, **authentification Google** intégrée et **envoi d'emails Resend**.

## ✨ Nouveautés v1.9.4
- 🔐 **Authentification Google complète** avec mode démo intégré  
- 🎨 **Interface utilisateur** professionnel avec avatar et badge démo
- 🖼️ **Avatar système** optimisé sans dépendances externes
- 📚 **Documentation** guide complet Google Cloud Console OAuth 2.0

## ✨ Nouveautés v1.9.3
- 🔐 **Authentification Google** OAuth fonctionnelle intégrée
- 👤 **GoogleAuthButton** modulaire avec gestion état utilisateur  
- 🛡️ **Sécurité renforcée** pour accès Google Drive API
- 🎨 **Interface header** avec contrôles utilisateur centrés

## ✨ Nouveautés v1.9.2  
- ☁️ **Boutons Google Drive** professionnels pour future sélection cloud
- 🎯 **Interface ultra-moderne** avec icône Google officiel
- 🐛 **Logs debugging** système standardisé avec emojis
- ⚡ **Infrastructure** Express/CORS pour extensions futures

## ✨ Nouveautés v1.9.0  
- 📧 **Envoi par email** des rapports via Resend API moderne
- 🎨 **Templates HTML automatiques** professionnels
- 🌍 **Interface multilingue** FR/EN avec toggle animé
- 🔧 **Architecture modulaire** optimisée (<200 lignes/fichier)

## 🚀 Démarrage rapide

```bash
# Installation
git clone https://github.com/VoKyT/comparateur-de-dossiers.git
cd comparateur-de-dossiers
npm install

# Développement
npm run dev
# → http://localhost:3007 (port auto-adaptatif)

# Production
npm run build
npm run preview
```

## 📋 Prérequis
- **Node.js** ≥ 20.0.0 + **npm** ≥ 10.0.0
- **Navigateur moderne** (Chrome, Firefox, Safari, Edge)
- **Resend API** (optionnel) pour envoi d'emails

## ✨ Stack technique moderne
- **React** ^19.1.1 + **TypeScript** ^5.9.2
- **Tailwind CSS** ^4.1.12 + **shadcn/ui**
- **Vite** ^7.1.3 + **Framer Motion** ^12.1.0
- **Resend** ^6.5.0 (email moderne)
- **Google Auth Library** ^10.2.1 (OAuth Google)
- **Express** ^5.1.0 + **CORS** ^2.8.5 (serveur)

## 🔧 Scripts
```bash
npm run dev      # Développement (port 3000)
npm run build    # Build de production
npm run preview  # Aperçu production
```

## 📧 Configuration email (optionnelle)
Pour activer l'envoi d'emails :
1. **Compte Resend** → [resend.com](https://resend.com) (gratuit : 100 emails/jour)
2. **Configuration** → Voir **[docs/email/configuration.md](docs/email/configuration.md)**
3. **API moderne** → Plus fiable qu'EmailJS/SendGrid

## 📚 Documentation complète
- **[Configuration Email](docs/email/configuration.md)** → Guide Resend complet
- **[Installation](docs/setup/installation.md)** → Guide détaillé d'installation
- **[Architecture](ARCHITECTURE.md)** → Structure technique du projet  
- **[Workflow développement](docs/dev/workflow.md)** → Dépannage et bonnes pratiques
- **[Standards de code](docs/standards/coding.md)** → Conventions et règles
- **[Git & Versioning](docs/git/versioning.md)** → Gestion des versions

## 🤝 Contribution
1. Fork → Branche feature → Commit → Pull Request
2. **Conventions** : `[v1.2.3] type: description`

## 📝 License
Projet sous licence ISC - Voir [LICENSE](LICENSE)

## 📞 Support  
- **Issues** : [GitHub Issues](https://github.com/VoKyT/comparateur-de-dossiers/issues)
- **Changelog** : [CHANGELOG.md](CHANGELOG.md)

---
🚀 **Comparateur de Dossiers** - Application moderne pour la gestion de fichiers