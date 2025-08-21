# Règles Design & Interface

## 🎨 RÈGLE ABSOLUE - TOUT DOIT ÊTRE ESTHÉTIQUE

### PRINCIPE FONDAMENTAL : L'ESTHÉTISME AVANT TOUT
- ✅ **TOUTE INTERFACE** doit être visuellement magnifique et moderne
- ✅ **CHAQUE COMPOSANT** doit avoir un design soigné et professionnel
- ✅ **PRIVILÉGIER LA BEAUTÉ** : si c'est moche, c'est inacceptable
- ✅ **UTILISER DES FRAMEWORKS MODERNES** pour un rendu esthétique optimal
- ✅ **ANIMATIONS FLUIDES** et transitions élégantes obligatoires
- ✅ **COULEURS HARMONIEUSES** et typographie moderne

### 🎨 THÈME COULEUR PRINCIPAL OBLIGATOIRE - KAWAII BABY BLUE
- ✅ **STYLE KAWAII** : Esthétique mignonne, douce et adorable obligatoire
- ✅ **BABY BLUE + ROSE KAWAII** : Combinaison baby blue (sky-200, sky-300, sky-400) + rose kawaii (pink-200, pink-300, pink-400, rose-300)
- ✅ **PALETTE PASTEL** : Tons ultra-doux et apaisants, effet "nuage cotton candy"
- ✅ **EMOJIS KAWAII** : 🌸🌺🥺🎀💖✨🌈☁️ systématiquement utilisés
- ✅ **FORMES RONDES** : rounded-2xl, rounded-full pour effet mignon
- ✅ **ANIMATIONS DOUCES** : bounce, pulse, transitions délicates
- ✅ **CONTRASTE DÉLICAT** : Fonds ultra-clairs avec pastels kawaii
- ✅ **COHÉRENCE MIGNONNE** : Tous les composants doivent respirer la douceur

### 📖 LISIBILITÉ CRITIQUE OBLIGATOIRE
- ✅ **CONTRASTE MINIMUM** : Ratio 4.5:1 pour texte normal, 3:1 pour texte large
- ✅ **TEXTE SUR FOND** : Toujours vérifier lisibilité sur tous arrière-plans
- ✅ **ÉTATS INTERACTIFS** : Hover, focus, active doivent rester lisibles
- ✅ **ACCESSIBILITÉ** : Support daltonisme et malvoyance
- ✅ **TESTS SYSTÉMATIQUES** : Vérifier sur différents écrans et luminosités
- ❌ **JAMAIS de texte illisible** - La lisibilité prime sur l'esthétique

### 🎨 EMOJIS COLORÉS OBLIGATOIRES
- ✅ **COMPRÉHENSION VISUELLE** : Utiliser des emojis colorés pour illustrer le contenu
- ✅ **EMOJIS SIGNIFICATIFS** : Choisir des emojis qui représentent clairement l'action/contenu
- ✅ **COULEURS VIVES** : Les emojis apportent naturellement de la couleur à l'interface
- ✅ **UNIVERSALITÉ** : Emojis compris dans toutes les cultures et langues
- ✅ **PAS D'ICÔNES MONOCHROMES** : Éviter les icônes Lucide sans couleur
- ❌ **JAMAIS d'icônes ternes** - Privilégier la couleur et la vie

### 📐 TYPOGRAPHIE HIÉRARCHISÉE OBLIGATOIRE
**PRINCIPE : Catégories logiques de tailles selon l'importance**

#### 🏆 HERO (Titres principaux - Impact maximum)
- **Mobile** : `text-6xl` (60px) - `text-8xl` (96px)
- **Desktop** : `text-[10rem]` (160px) - `text-[20rem]` (320px)
- **Usage** : Titre principal de page, slogan, call-to-action majeur
- **Effet** : Taille gigantesque pour dominer l'écran

#### 📋 TITLE (Titres secondaires - Structure claire)
- **Mobile** : `text-2xl` (24px) - `text-3xl` (30px)
- **Desktop** : `text-4xl` (36px) - `text-6xl` (60px)
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

#### 🎯 RÈGLE HIÉRARCHIE VISUELLE - IMPORTANCE = TAILLE
**PRINCIPE FONDAMENTAL : Plus c'est important, plus ça grossit sur grand écran**

- ✅ **ÉLÉMENTS CRITIQUES** (Hero, Titles) : Scaling agressif sur desktop
  - Hero : `text-4xl` → `text-9xl` (grossit énormément)
  - Title : `text-2xl` → `text-4xl` (grossit modérément)
  
- ✅ **ÉLÉMENTS SECONDAIRES** (Body, Buttons, UI) : Scaling minimal
  - Boutons : `text-sm` → `text-base` (grossit peu)
  - Body : `text-base` → `text-lg` (grossit peu)
  - UI : Tailles fixes ou micro-variations
  
- ✅ **CONTRASTE HIÉRARCHIQUE** : Différence de taille amplifiée sur desktop
- ✅ **LISIBILITÉ MOBILE** : Tous les éléments restent lisibles sur petit écran
- ❌ **JAMAIS d'uniformité** - Les éléments importants doivent dominer visuellement

### Frameworks esthétiques recommandés (par ordre de préférence)
1. **shadcn/ui** - LE framework moderne 2025, 200+ composants copy-paste, Radix UI + Tailwind CSS
2. **Mantine** - Design système moderne, +100 composants esthétiques
3. **Chakra UI** - Interface élégante, excellent UX/UI
4. **Material UI** - Design Google, très populaire et raffiné
5. **Ant Design** - Professionnel, niveau entreprise
6. **Tailwind CSS** - Contrôle total, design custom moderne

**JAMAIS de design basique ou laid - L'esthétisme est NON-NÉGOCIABLE**

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