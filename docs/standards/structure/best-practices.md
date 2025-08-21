# Bonnes Pratiques de Code

## 🧹 BONNES PRATIQUES OBLIGATOIRES

### Composants React
- **Functional components** uniquement
- **Hooks** pour la logique d'état
- **Props typing** avec TypeScript obligatoire
- **Memo** pour optimisation si nécessaire

### TypeScript
- **Type strict** activé
- **Interfaces** pour les objets complexes
- **Types union** pour les valeurs limitées
- **Generic types** pour la réutilisabilité

### Performance
- **useMemo** pour les calculs coûteux
- **useCallback** pour les fonctions passées en props
- **React.memo** pour éviter les re-renders inutiles

## 🚫 PRATIQUES À ÉVITER

- **Any types**: toujours typer précisément
- **Console.log** en production: utiliser un système de logging
- **Inline styles**: utiliser Tailwind CSS
- **God components**: diviser en sous-composants
- **Props drilling**: utiliser Context ou state management

## 🔧 STANDARDS DE QUALITÉ

### Composants
- Limiter à 100 lignes par composant
- Séparer logique et présentation
- Un composant = une responsabilité

### Fonctions
- Maximum 20 lignes par fonction
- Noms descriptifs et explicites
- Éviter les effets de bord

### Fichiers
- Maximum 200 lignes (sauf exceptions documentées)
- Imports organisés et groupés
- Exports nommés clairs