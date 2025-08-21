# Standards Animations Framer Motion

## 🎨 RÈGLES OBLIGATOIRES FRAMER MOTION

### Stack d'animations imposée
- ✅ **Framer Motion OBLIGATOIRE** : Toutes les animations doivent utiliser Framer Motion
- ❌ **Pas d'animations CSS** : Éviter @keyframes, animations CSS custom, transitions CSS
- ✅ **Components motion.*** : Utiliser motion.div, motion.h1, motion.button, etc.
- ✅ **AnimatePresence** : Pour toutes les transitions enter/exit de composants

## 🔧 CONVENTIONS D'USAGE

### Import standard
```typescript
import { motion, AnimatePresence } from 'framer-motion';
```

### Animations de base recommandées
```typescript
// ✅ Animation d'entrée de page
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Contenu
</motion.div>

// ✅ Animation de sortie avec AnimatePresence
<AnimatePresence mode="wait">
  {showComponent && (
    <motion.div
      key="component"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      Contenu conditionnel
    </motion.div>
  )}
</AnimatePresence>
```

## 🎯 TYPES D'ANIMATIONS STANDARDS

### 1. Transitions de page
```typescript
// Pages avec AnimatePresence
<AnimatePresence mode="wait">
  {currentPage === 'home' ? (
    <HomePage key="home" />
  ) : (
    <OtherPage key="other" />
  )}
</AnimatePresence>

// Dans chaque page
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -30 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
```

### 2. LayoutId pour continuité visuelle
```typescript
// Pour faire voyager un élément entre composants
<motion.div layoutId="shared-element">
  Élément qui se transforme
</motion.div>
```

### 3. Micro-interactions
```typescript
// Boutons avec hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", damping: 15, stiffness: 200 }}
>
  Click me
</motion.button>

// Cartes avec hover subtil
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ type: "spring", damping: 20, stiffness: 300 }}
>
```

### 4. Listes et grids
```typescript
// Container avec stagger
<motion.div
  initial="hidden"
  animate="show"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## ⚙️ CONFIGURATIONS STANDARDS

### Springs naturels (recommandé)
```typescript
transition={{ 
  type: "spring", 
  damping: 20, 
  stiffness: 300 
}}
```

### Easing curves pour durée fixe
```typescript
transition={{ 
  duration: 0.6, 
  ease: "easeOut" 
}}
```

### Délais et orchestration
```typescript
transition={{ 
  duration: 0.4, 
  delay: 0.2,
  ease: "easeInOut" 
}}
```

## 🚫 INTERDICTIONS

### ❌ Ne pas faire
```css
/* INTERDIT : Animations CSS */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.animate-slide {
  animation: slideIn 0.5s ease-out;
}
```

```scss
/* INTERDIT : Transitions CSS custom */
.button {
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
}
```

### ❌ Éviter les animations lourdes
- Pas d'animations sur des listes de +100 éléments simultanément
- Éviter les animations complexes sur scroll
- Pas d'animations en boucle infinie sans pause

## ✅ BONNES PRATIQUES

### Performance
- Utiliser `transform` et `opacity` plutôt que width/height
- Préférer les springs aux easings linéaires
- Utiliser `will-change: transform` pour les animations complexes

### Accessibilité
```typescript
// Respecter prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: prefersReducedMotion ? 0.01 : 0.6,
    ease: "easeOut" 
  }}
>
```

### Organisation
- **1 fichier par animation complexe** si elle dépasse 20 lignes
- **Variants nommés** pour les animations réutilisables
- **Constants pour les transitions** communes

### Exemples de constants
```typescript
// constants/animations.ts
export const TRANSITIONS = {
  page: { duration: 0.6, ease: "easeOut" },
  modal: { duration: 0.4, ease: "easeInOut" },
  button: { type: "spring", damping: 15, stiffness: 200 }
} as const;

export const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  },
  slideIn: {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 }
  }
} as const;
```

## 🎪 EXEMPLES DE RÉFÉRENCE

### WelcomeScreen avec transition de page
```typescript
export const WelcomeScreen = ({ onComplete }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.8 } }}
  >
    <motion.div
      initial={{ scale: 1.4 }}
      whileHover={{ scale: 1.45 }}
      onClick={onComplete}
    >
      <h1>Titre</h1>
    </motion.div>
  </motion.div>
);
```

### App avec AnimatePresence
```typescript
export const App = () => (
  <AnimatePresence mode="wait">
    {showWelcome ? (
      <WelcomeScreen key="welcome" />
    ) : (
      <HomePage key="home" />
    )}
  </AnimatePresence>
);
```

Ces standards garantissent des animations **cohérentes, performantes et accessibles** dans toute l'application.