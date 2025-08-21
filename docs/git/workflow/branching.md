# Workflow Git & Branches

## 🌿 BRANCHES ET WORKFLOW

### Structure des branches
- **main**: version stable de production
- **develop**: intégration des nouvelles fonctionnalités
- **feature/nom-fonctionnalité**: développement de nouvelles features
- **hotfix/v1.0.1**: corrections urgentes en production

### Workflow Git Flow
1. **Feature** → développement sur `feature/nom`
2. **Merge** → intégration dans `develop`
3. **Release** → merge `develop` vers `main`
4. **Hotfix** → correction directe sur `main`

## 🙈 GESTION DU .GITIGNORE

### Vérification obligatoire
À chaque ajout ou modification de fonctionnalité, vérifier si des éléments doivent être ajoutés au `.gitignore`

### Types de fichiers à surveiller
- **Outils de build**: vite cache, rollup cache, etc.
- **Configuration locale**: .env.local, settings.local.json
- **Dossiers de sortie**: build/, dist/, out/, coverage/
- **Fichiers générés**: *.generated.*, auto-imports.d.ts
- **Caches**: .cache/, .temp/, .tmp/
- **Fichiers utilisateur**: user-data/, preferences/
- **Sécurité**: *.key, *.pem, *.p12

### Règle générale
Tout ce qui est généré automatiquement, spécifique à l'utilisateur ou sensible doit être exclu

### Exemple .gitignore commenté
```gitignore
# Build outputs
dist/
build/
out/

# Dependencies
node_modules/

# Environment files
.env.local
.env.production.local

# IDE files
.vscode/settings.json  # Paramètres spécifiques utilisateur
.idea/                 # JetBrains IDE

# OS files
.DS_Store             # macOS
Thumbs.db            # Windows

# Logs
*.log
logs/

# Temporary files
.temp/
.cache/
```

## 🔄 WORKFLOW DE COMMIT COMPLET

### Séquence recommandée
1. **Développement** → feature complete
2. **Tests** → vérifier que tout fonctionne
3. **Documentation** → mettre à jour si nécessaire
4. **Stage** → `git add .`
5. **Commit** → `git commit -m "[v1.2.3] feat: description"`
6. **Push** → `git push origin feature/nom`

### Pre-commit checklist
- [ ] Code fonctionne et testé
- [ ] Documentation à jour
- [ ] .gitignore vérifié
- [ ] Commit message conforme
- [ ] Pas de fichiers sensibles staged