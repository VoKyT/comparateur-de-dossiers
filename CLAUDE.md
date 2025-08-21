# Règles Claude Code - Comparateur de dossiers

## 🎯 RÈGLES ABSOLUES CRITIQUES

### 🎨 ESTHÉTISME KAWAII OBLIGATOIRE
- ✅ **TOUTE INTERFACE** doit être visuellement magnifique avec **shadcn/ui + Tailwind CSS**
- ✅ **THÈME KAWAII BABY BLUE** : Style mignon obligatoire (sky-200/300/400 + pink-200/300/400 + rose-300)
- ✅ **STYLE MIGNON KAWAII** : Esthétique douce, adorable avec formes rondes (rounded-2xl, rounded-full)
- ✅ **EMOJIS KAWAII** : 🌸🌺🥺🎀💖✨🌈☁️ systématiquement utilisés
- ✅ **ANIMATIONS DOUCES** : bounce, pulse, transitions délicates pour effet kawaii
- ✅ **LISIBILITÉ CRITIQUE** : Textes TOUJOURS lisibles sur tous fonds pastels
- ✅ **TYPOGRAPHIE HIÉRARCHISÉE** : Tailles de police logiques par catégories (Hero/Title/Body/Caption)
- ❌ **JAMAIS de design basique ou laid** - L'esthétisme kawaii est NON-NÉGOCIABLE

### 📱 RESPONSIVITÉ PARFAITE 
- ✅ **TOUTE INTERFACE** doit s'adapter parfaitement à toutes les tailles d'écran
- ✅ **MOBILE FIRST** avec breakpoints Tailwind obligatoires
- ❌ **JAMAIS d'interface qui casse sur mobile** - La responsivité est NON-NÉGOCIABLE

### ⚠️ PAS DE SURENGINEERING
- ✅ **FAIRE EXACTEMENT** ce qui est demandé, rien de plus
- ❌ **NE PAS AJOUTER** de fonctionnalités non demandées
- ✅ **MAIS TOUJOURS ESTHÉTIQUE** - même simple, ça doit être beau

### 🧠 THINK HARDER OBLIGATOIRE
- ✅ **TOUJOURS** utiliser le think harder de Claude Code pour toutes les tâches
- ✅ **RÉFLÉCHIR PROFONDÉMENT** avant d'agir et planifier les étapes

## 📋 Description du projet
- **Objectif**: Application web moderne pour comparer le contenu de deux dossiers et identifier les fichiers identiques
- **Fonctionnalités principales**:
  - 🗂️ **Exploration de dossier unique** : Visualisation d'arborescence avec numérotation intelligente
  - 🔍 **Comparaison de deux dossiers** : Détection de fichiers identiques par nom + taille
  - 📊 **Résultats détaillés** : Statistiques et liste des doublons avec chemins
  - 🌸 **Interface kawaii** : Design mignon avec emojis colorés et animations douces
- **Stack**: React + TypeScript + Tailwind CSS + shadcn/ui + Vite + File System Access API
- **Architecture**: Application web pure avec interface responsive kawaii

## 📚 MODULES SPÉCIALISÉS

**Pour Claude Code :** Consultez les modules selon le contexte de votre tâche

### ⚠️ RÈGLE CRITIQUE - MODULARITÉ DES FICHIERS MD
- ✅ **FICHIERS COURTS** : Chaque module docs/ doit rester concis et focalisé
- ✅ **REPÉRAGE FACILE** : Si lecture > 2 minutes, diviser en sous-modules
- ✅ **MODULARITÉ OBLIGATOIRE** : Fichier long = signal de division nécessaire
- ✅ **NAVIGATION FLUIDE** : Préférer plusieurs petits fichiers qu'un gros
- ❌ **JAMAIS de fichiers MD monstre** - Diviser systématiquement

### 🎨 Design & Interface
- **[docs/rules/design.md](docs/rules/design.md)** → Règles esthétiques détaillées, frameworks UI, responsivité complète

### 💻 Développement
- **[docs/rules/development.md](docs/rules/development.md)** → Anti-surengineering, think harder, validation avant développement

### 🏗️ Architecture & Stack
- **[docs/architecture/stack.md](docs/architecture/stack.md)** → Architecture technique, stack imposée, structure modulaire

### ⚙️ Installation & Configuration
- **[docs/setup/installation.md](docs/setup/installation.md)** → Installation complète, versions, liens officiels

### 🔄 Workflow de développement
- **[docs/dev/workflow.md](docs/dev/workflow.md)** → Hot reload, nettoyage ports, tests automatiques

### 📝 Standards de code
- **[docs/standards/coding.md](docs/standards/coding.md)** → En-têtes fichiers, modularité, imports, nommage

### 🔀 Git & Versioning
- **[docs/git/versioning.md](docs/git/versioning.md)** → Conventions commits, versioning, branches, gitignore

### 🔧 Maintenance
- **[docs/maintenance/guidelines.md](docs/maintenance/guidelines.md)** → Documentation obligatoire, maintenance architecture

## 🚀 UTILISATION POUR CLAUDE CODE

### Navigation contextulle
```markdown
- Tâche UI/Design → Lire docs/rules/design.md
- Développement feature → Lire docs/rules/development.md  
- Questions architecture → Lire docs/architecture/stack.md
- Installation/Config → Lire docs/setup/installation.md
- Problèmes dev → Lire docs/dev/workflow.md
- Standards code → Lire docs/standards/coding.md
- Git/Commits → Lire docs/git/versioning.md
- Documentation → Lire docs/maintenance/guidelines.md
```

### Consultation multiple
Consultez plusieurs modules si la tâche couvre plusieurs domaines :
```markdown
Nouvelle feature = development.md + architecture.md + coding.md
Interface complète = design.md + development.md + workflow.md
Setup projet = installation.md + architecture.md + versioning.md
```

---
**IMPORTANT :** Ce fichier principal contient uniquement les règles critiques. Consultez OBLIGATOIREMENT les modules spécialisés selon votre contexte de travail.