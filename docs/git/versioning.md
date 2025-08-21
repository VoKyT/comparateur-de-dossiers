# Git & Versioning

## 📝 CONVENTIONS DE COMMITS

### Format obligatoire
- **Structure**: `[v1.2.3] type: description courte`
- **Types autorisés**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Exemples
- `[v1.0.1] feat: ajout comparaison de dossiers`
- `[v1.0.2] fix: correction bug affichage différences`
- `[v1.1.0] feat: interface utilisateur Electron`

## 🔢 VERSIONING SÉMANTIQUE (SEMVER)

### Types de versions
- **MAJOR** (v2.0.0): changements incompatibles
- **MINOR** (v1.1.0): nouvelles fonctionnalités compatibles
- **PATCH** (v1.0.1): corrections de bugs

### Règles d'incrémentation
- **Breaking changes** → MAJOR
- **Nouvelles features** → MINOR
- **Bug fixes** → PATCH

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

## 🏷️ TAGS GIT

### Création et gestion
- Créer un tag à chaque version: `git tag v1.2.3`
- Pousser les tags: `git push origin --tags`
- Tag avec message: `git tag -a v1.2.3 -m "Version 1.2.3 - Nouvelle feature"`

## 📜 CHANGELOG

### Format recommandé
- Tenir à jour un fichier `CHANGELOG.md` avec les versions et changements
- **Format**: date, version, type de changements (Added, Changed, Fixed, Removed)

### Exemple
```markdown
# Changelog

## [1.2.0] - 2024-01-15

### Added
- Nouvelle interface de comparaison
- Export CSV des résultats

### Changed
- Amélioration performance algorithme

### Fixed
- Correction bug affichage mobile
```

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

### Documentation
Commenter dans le .gitignore les exclusions non évidentes avec leur raison

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

## 📚 DOCUMENTATION OBLIGATOIRE

### Fichiers à maintenir
- **README.md** : Mettre à jour SYSTÉMATIQUEMENT à chaque modification
- **ARCHITECTURE.md** : Mettre à jour OBLIGATOIREMENT à chaque changement architectural
- **CHANGELOG.md** : Si existe, y consigner un résumé des changements

### Types de changements nécessitant une mise à jour documentation

#### README.md
- ✅ Nouveau script npm
- ✅ Nouvelle technologie
- ✅ Nouvelle dépendance
- ✅ Changement installation
- ✅ Migration majeure

#### ARCHITECTURE.md
- ✅ Nouvelle technologie
- ✅ Changement structure
- ✅ Migration majeure
- ✅ Nouveau module/feature
- ✅ Nouvelle intégration

### ⚠️ RAPPEL CRITIQUE - Documentation

**AVANT de terminer TOUTE tâche de développement :**
1. ✅ Vérifier si le README.md nécessite une mise à jour
2. ✅ Vérifier si ARCHITECTURE.md nécessite une mise à jour
3. ✅ Mettre à jour immédiatement si nécessaire
4. ✅ Committer la documentation en même temps que le code

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