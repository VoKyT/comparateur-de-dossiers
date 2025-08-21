# Règles Design & Interface

## 🎯 RÈGLE ABSOLUE - DESIGN ULTRA PROFESSIONNEL

### PRINCIPE FONDAMENTAL : EXCELLENCE PROFESSIONNELLE
- ✅ **TOUTE INTERFACE** doit être visuellement excellente et ultra professionnelle
- ✅ **CHAQUE COMPOSANT** doit avoir un design épuré et moderne
- ✅ **SIMPLICITÉ ÉLÉGANTE** : moins c'est plus, design minimaliste
- ✅ **UTILISER DES FRAMEWORKS MODERNES** pour un rendu professionnel optimal
- ✅ **ANIMATIONS SUBTILES** et transitions discrètes uniquement
- ✅ **COULEURS NEUTRES** et typographie system moderne

### 🎨 PALETTE DE COULEURS ULTRA PROFESSIONNELLE
- ✅ **STYLE CORPORATE** : Esthétique épurée, moderne et professionnelle obligatoire
- ✅ **GRIS + BLEU PROFESSIONNEL** : Gris neutres (slate-100, slate-600, slate-900) + bleu professionnel (blue-700, blue-800)
- ✅ **PALETTE NEUTRE** : Tons sobres et élégants, effet "bureau moderne"
- ✅ **PAS D'EMOJIS** : Interface textuelle claire et professionnelle
- ✅ **FORMES GÉOMÉTRIQUES** : rounded-lg, angles droits pour effet moderne
- ✅ **ANIMATIONS MINIMALES** : hover subtil, transitions 200-300ms uniquement
- ✅ **CONTRASTE ÉLEVÉ** : Fonds blancs avec textes sombres pour lisibilité
- ✅ **COHÉRENCE PROFESSIONNELLE** : Tous les composants respirent la modernité

### 📖 LISIBILITÉ CRITIQUE OBLIGATOIRE
- ✅ **CONTRASTE MINIMUM** : Ratio 4.5:1 pour texte normal, 3:1 pour texte large
- ✅ **TEXTE SUR FOND** : Toujours vérifier lisibilité sur tous arrière-plans
- ✅ **ÉTATS INTERACTIFS** : Hover, focus, active doivent rester lisibles
- ✅ **ACCESSIBILITÉ** : Support daltonisme et malvoyance
- ✅ **TESTS SYSTÉMATIQUES** : Vérifier sur différents écrans et luminosités
- ❌ **JAMAIS de texte illisible** - La lisibilité prime sur l'esthétique

### 🎯 ICÔNES PROFESSIONNELLES OBLIGATOIRES
- ✅ **CLARTÉ VISUELLE** : Utiliser des icônes modernes et épurées pour illustrer le contenu
- ✅ **ICÔNES SIGNIFICATIVES** : Choisir des icônes qui représentent clairement l'action/contenu
- ✅ **STYLE UNIFORME** : Icônes de même famille pour cohérence visuelle (Heroicons, Lucide)
- ✅ **TAILLES COHÉRENTES** : 16px, 20px, 24px pour différents contextes
- ✅ **COULEURS NEUTRES** : Gris foncé, noir ou bleu professionnel uniquement
- ❌ **JAMAIS d'emojis** - Privilégier les icônes modernes et professionnelles

### 📐 TYPOGRAPHIE HIÉRARCHISÉE OBLIGATOIRE
**PRINCIPE : Catégories logiques de tailles selon l'importance**

#### 🏆 HERO (Titres principaux - Impact professionnel)
- **Mobile** : `text-3xl` (30px) - `text-4xl` (36px)
- **Desktop** : `text-5xl` (48px) - `text-6xl` (60px)
- **Usage** : Titre principal de page, en-tête d'application
- **Effet** : Taille imposante mais élégante et lisible

#### 📋 TITLE (Titres secondaires - Structure claire)
- **Mobile** : `text-xl` (20px) - `text-2xl` (24px)
- **Desktop** : `text-2xl` (24px) - `text-3xl` (30px)
- **Usage** : Titres de sections, sous-titres importants

#### 📄 BODY (Contenu principal - Lisibilité)
- **Mobile** : `text-sm` (14px) - `text-base` (16px)
- **Desktop** : `text-lg` (18px) - `text-xl` (20px)
- **Usage** : Texte principal, descriptions, boutons

#### 🏷️ CAPTION (Détails - Information secondaire)
- **Mobile** : `text-xs` (12px) - `text-sm` (14px)
- **Desktop** : `text-sm` (14px) - `text-base` (16px)
- **Usage** : Labels, metadata, notes, badges

#### ✅ RÈGLES D'APPLICATION
- ✅ **HERO** : 1 seul par page maximum (titre principal)
- ✅ **PROGRESSION LOGIQUE** : Hero > Title > Body > Caption
- ✅ **RESPONSIVE SYSTÉMATIQUE** : Mobile d'abord, puis scale up
- ✅ **CONTRASTE PRÉSERVÉ** : Toutes tailles restent lisibles
- ❌ **JAMAIS de taille arbitraire** - Respecter les catégories

#### 🎯 RÈGLE HIÉRARCHIE VISUELLE PROFESSIONNELLE
**PRINCIPE FONDAMENTAL : Hiérarchie subtile et élégante**

- ✅ **ÉLÉMENTS CRITIQUES** (Hero, Titles) : Scaling modéré sur desktop
  - Hero : `text-3xl` → `text-5xl` (progression élégante)
  - Title : `text-xl` → `text-2xl` (progression subtile)
  
- ✅ **ÉLÉMENTS SECONDAIRES** (Body, Buttons, UI) : Scaling minimal
  - Boutons : `text-sm` → `text-base` (tailles fixes préférées)
  - Body : `text-base` → `text-lg` (progression minimale)
  - UI : Tailles fixes pour cohérence
  
- ✅ **CONTRASTE HIÉRARCHIQUE** : Différences subtiles mais perceptibles
- ✅ **LISIBILITÉ MOBILE** : Tous les éléments parfaitement lisibles
- ❌ **JAMAIS d'excès** - Élégance et modération avant tout

### Frameworks esthétiques recommandés (par ordre de préférence)
1. **shadcn/ui** - LE framework moderne 2025, 200+ composants copy-paste, Radix UI + Tailwind CSS
2. **Mantine** - Design système moderne, +100 composants esthétiques
3. **Chakra UI** - Interface élégante, excellent UX/UI
4. **Material UI** - Design Google, très populaire et raffiné
5. **Ant Design** - Professionnel, niveau entreprise
6. **Tailwind CSS** - Contrôle total, design custom moderne

**JAMAIS de design amateur ou non-professionnel - L'excellence est NON-NÉGOCIABLE**

## 📱 RÈGLE ABSOLUE - RESPONSIVITÉ PARFAITE OBLIGATOIRE

### PRINCIPE FONDAMENTAL : ADAPTATION TOTALE À TOUS LES ÉCRANS
- ✅ **TOUTE INTERFACE** doit s'adapter parfaitement à toutes les tailles d'écran
- ✅ **MOBILE FIRST** : Concevoir d'abord pour mobile, puis étendre
- ✅ **BREAKPOINTS TAILWIND** : Utiliser sm:, md:, lg:, xl:, 2xl: systématiquement
- ✅ **TYPOGRAPHIE ADAPTIVE** : Tailles de texte qui s'adaptent selon l'écran
- ✅ **ESPACEMENTS VARIABLES** : Marges et paddings responsive
- ✅ **CONTENUS CONSTANTS** : Même texte sur tous écrans, seule la taille change
- ✅ **INTERACTIONS TACTILES** : Boutons suffisamment grands pour le touch
- ✅ **NAVIGATION FLUIDE** : Menus hamburgers, sidebars collapsibles

### Breakpoints Tailwind obligatoires
- **Mobile** : Par défaut (< 640px) - Interface tactile optimisée
- **SM** : `sm:` (≥ 640px) - Tablette portrait
- **MD** : `md:` (≥ 768px) - Tablette paysage
- **LG** : `lg:` (≥ 1024px) - Desktop standard
- **XL** : `xl:` (≥ 1280px) - Grand écran
- **2XL** : `2xl:` (≥ 1536px) - Écran ultra-large

### Règles responsives non-négociables
- ✅ **Textes adaptatifs** : `text-sm sm:text-base md:text-lg lg:text-xl`
- ✅ **Espacements progressifs** : `px-4 sm:px-6 md:px-8 lg:px-12`
- ✅ **Conteneurs limités** : `max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl`
- ✅ **Icônes scalables** : `h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6`
- ✅ **Textes constants** : Même contenu sur tous écrans, adaptation par la taille uniquement
- ✅ **Grilles responsives** : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

### Tests obligatoires
- ✅ **Mobile** : iPhone SE (375px), iPhone 12 (390px)
- ✅ **Tablette** : iPad (768px), iPad Pro (1024px)  
- ✅ **Desktop** : 1280px, 1440px, 1920px, 2560px
- ✅ **Orientation** : Portrait ET paysage sur tous devices

### Règles de contenu responsif
- ✅ **TEXTE CONSTANT** : Même contenu textuel sur toutes les tailles d'écran
- ✅ **TAILLE ADAPTIVE** : Seules les tailles de police s'adaptent (`text-sm sm:text-base md:text-lg`)
- ❌ **JAMAIS de texte différent** selon l'écran (pas de `hidden sm:inline`)
- ❌ **JAMAIS de contenu tronqué** sur mobile
- ✅ **LISIBILITÉ GARANTIE** : Le texte doit rester lisible sur le plus petit écran

**JAMAIS d'interface qui casse sur mobile - La responsivité est NON-NÉGOCIABLE**