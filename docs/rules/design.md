# Règles Design & Interface

## 🎨 RÈGLE ABSOLUE - TOUT DOIT ÊTRE ESTHÉTIQUE

### PRINCIPE FONDAMENTAL : L'ESTHÉTISME AVANT TOUT
- ✅ **TOUTE INTERFACE** doit être visuellement magnifique et moderne
- ✅ **CHAQUE COMPOSANT** doit avoir un design soigné et professionnel
- ✅ **PRIVILÉGIER LA BEAUTÉ** : si c'est moche, c'est inacceptable
- ✅ **UTILISER DES FRAMEWORKS MODERNES** pour un rendu esthétique optimal
- ✅ **ANIMATIONS FLUIDES** et transitions élégantes obligatoires
- ✅ **COULEURS HARMONIEUSES** et typographie moderne

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