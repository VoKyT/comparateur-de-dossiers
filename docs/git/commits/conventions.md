# Conventions de Commits & Versioning

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