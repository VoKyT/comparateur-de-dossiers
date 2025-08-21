# Règles Claude Code - Comparateur de dossiers

## 🎯 RÈGLES ABSOLUES CRITIQUES

### 🎯 DESIGN ULTRA PROFESSIONNEL OBLIGATOIRE
- ✅ **TOUTE INTERFACE** doit être ultra professionnelle avec **shadcn/ui + Tailwind CSS**
- ✅ **PALETTE NEUTRE PROFESSIONNELLE** : Gris élégants (slate-100/600/900) + bleu professionnel (blue-700/800)
- ✅ **STYLE CORPORATE MODERNE** : Esthétique épurée, minimaliste avec formes géométriques (rounded-lg)
- ✅ **ICÔNES MODERNES** : Heroicons, Lucide ou équivalent - PAS d'emojis
- ✅ **ANIMATIONS SUBTILES** : hover discret, transitions courtes (200-300ms) uniquement
- ✅ **LISIBILITÉ CRITIQUE** : Contrastes élevés pour lisibilité parfaite
- ✅ **TYPOGRAPHIE HIÉRARCHISÉE** : Tailles moderées par catégories (Hero/Title/Body/Caption)
- ❌ **JAMAIS de design amateur** - L'excellence professionnelle est NON-NÉGOCIABLE

### 📱 RESPONSIVITÉ PARFAITE 
- ✅ **TOUTE INTERFACE** doit s'adapter parfaitement à toutes les tailles d'écran
- ✅ **MOBILE FIRST** avec breakpoints Tailwind obligatoires
- ❌ **JAMAIS d'interface qui casse sur mobile** - La responsivité est NON-NÉGOCIABLE

### ⚠️ PAS DE SURENGINEERING
- ✅ **FAIRE EXACTEMENT** ce qui est demandé, rien de plus
- ❌ **NE PAS AJOUTER** de fonctionnalités non demandées
- ✅ **MAIS TOUJOURS ESTHÉTIQUE** - même simple, ça doit être beau

### 🎯 REFORMULATION SYSTÉMATIQUE DES PROMPTS
- ✅ **QUESTION CRITIQUE OBLIGATOIRE** : "Cette question peut-elle être mieux posée ?"
- ✅ **REFORMULER AUTOMATIQUEMENT** chaque prompt pour optimiser la qualité de la réponse
- ✅ **INTÉGRER LES CONTRAINTES** projet (design, architecture, modularité) dans la reformulation
- ✅ **PRÉCISER LES ATTENTES** en termes de livrables et de respect des règles

### 🧠 THINK HARDER OBLIGATOIRE
- ✅ **TOUJOURS** utiliser le think harder de Claude Code pour toutes les tâches
- ✅ **RÉFLÉCHIR PROFONDÉMENT** avant d'agir et planifier les étapes
- ✅ **APPLIQUER LA REFORMULATION** systématique des prompts utilisateur

### 🔄 RÈGLE CRITIQUE - MODULARITÉ SYSTÉMATIQUE OBLIGATOIRE
- ✅ **À CHAQUE MODIFICATION DE FICHIER** → se demander : "Ce fichier peut-il être divisé ?"
- ✅ **SIGNAL D'ALARME** : Fichier > 200 lignes = division obligatoire immédiate
- ✅ **RÉFLEXE AUTOMATIQUE** : 1 responsabilité = 1 fichier maximum
- ✅ **DÉCOUPAGE IMMÉDIAT** : Si oui, diviser AVANT de continuer la tâche
- ✅ **DOCUMENTATION** : Mettre à jour les fichiers MD après chaque modularisation
- ❌ **JAMAIS ignorer** - La modularité est NON-NÉGOCIABLE

## 📋 Description du projet
- **Objectif**: Application web moderne pour comparer le contenu de deux dossiers et identifier les fichiers identiques
- **Fonctionnalités principales**:
  - 🗂️ **Exploration de dossier unique** : Visualisation d'arborescence avec numérotation intelligente
  - 🔍 **Comparaison de deux dossiers** : Détection de fichiers identiques par nom + taille
  - 📊 **Résultats détaillés** : Statistiques et liste des doublons avec chemins
  - 🎯 **Interface professionnelle** : Design épuré moderne avec icônes élégantes
- **Stack**: React + TypeScript + Tailwind CSS + shadcn/ui + Vite + File System Access API
- **Architecture**: Application web pure avec interface responsive ultra professionnelle

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
- **[docs/rules/development.md](docs/rules/development.md)** → Anti-surengineering, reformulation prompts, think harder, validation avant développement
- **[docs/rules/prompt-reformulation-examples.md](docs/rules/prompt-reformulation-examples.md)** → Exemples concrets de reformulation de prompts utilisateur
- **[docs/rules/modularity.md](docs/rules/modularity.md)** → Modularité systématique, découpage automatique, règles de décomposition

### 🏗️ Architecture & Stack
- **[docs/architecture/overview.md](docs/architecture/overview.md)** → Vue d'ensemble, objectifs, stack technique
- **[docs/architecture/structure.md](docs/architecture/structure.md)** → Organisation dossiers et fichiers
- **[docs/architecture/technical-details.md](docs/architecture/technical-details.md)** → Implémentation détaillée
- **[docs/architecture/stack.md](docs/architecture/stack.md)** → Stack technique imposée et configuration

### ⚙️ Installation & Configuration
- **[docs/setup/installation.md](docs/setup/installation.md)** → Installation complète, versions, liens officiels

### 🔄 Workflow de développement
- **[docs/dev/workflow.md](docs/dev/workflow.md)** → Hot reload, nettoyage ports, tests automatiques

### 📝 Standards de code
- **[docs/standards/coding.md](docs/standards/coding.md)** → En-têtes fichiers, modularité, imports, nommage
- **[docs/standards/headers/file-headers.md](docs/standards/headers/file-headers.md)** → Format standard des en-têtes
- **[docs/standards/naming/conventions.md](docs/standards/naming/conventions.md)** → Conventions de nommage
- **[docs/standards/structure/best-practices.md](docs/standards/structure/best-practices.md)** → Bonnes pratiques structure

### 🔀 Git & Versioning
- **[docs/git/versioning.md](docs/git/versioning.md)** → Conventions commits, versioning, branches, gitignore
- **[docs/git/commits/conventions.md](docs/git/commits/conventions.md)** → Détail conventions commits
- **[docs/git/workflow/branching.md](docs/git/workflow/branching.md)** → Stratégie de branches
- **[docs/git/documentation/maintenance.md](docs/git/documentation/maintenance.md)** → Maintenance documentation

### 🔧 Maintenance
- **[docs/maintenance/guidelines.md](docs/maintenance/guidelines.md)** → Documentation obligatoire, maintenance architecture

## 🚀 UTILISATION POUR CLAUDE CODE

### Navigation contextuelle
```markdown
- Tâche UI/Design → Lire docs/rules/design.md
- Développement feature → Lire docs/rules/development.md + modularity.md
- Reformulation prompts → Lire docs/rules/prompt-reformulation-examples.md
- Questions architecture → Lire docs/architecture/overview.md + structure.md
- Modularisation fichier → Lire docs/rules/modularity.md  
- Installation/Config → Lire docs/setup/installation.md
- Problèmes dev → Lire docs/dev/workflow.md
- Standards code → Lire docs/standards/coding.md
- Git/Commits → Lire docs/git/versioning.md
- Documentation → Lire docs/maintenance/guidelines.md
```

### Consultation multiple
Consultez plusieurs modules si la tâche couvre plusieurs domaines :
```markdown
Nouvelle feature = development.md + modularity.md + overview.md + coding.md
Interface complète = design.md + development.md + modularity.md + workflow.md
Refactoring code = modularity.md + structure.md + coding.md
Setup projet = installation.md + overview.md + versioning.md
```

---
**IMPORTANT :** Ce fichier principal contient uniquement les règles critiques. Consultez OBLIGATOIREMENT les modules spécialisés selon votre contexte de travail.