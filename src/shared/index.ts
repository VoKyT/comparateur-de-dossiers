/**
 * @fileoverview Barrel export principal pour shared
 * @description Point d'entrée centralisé pour tous les éléments partagés
 * @exports * from constants, hooks, utils, types
 * @usage import { APP_CONFIG, useLocalStorage, formatDate } from '@/shared'
 * @related Tous les modules shared/
 * @notes Export centralisé selon architecture modulaire CLAUDE.md
 */

// Constants - Configuration et métadonnées
export * from './constants';

// Hooks - Hooks React réutilisables
export * from './hooks';

// Utils - Fonctions utilitaires pures
export * from './utils';

// Types - Types TypeScript partagés
export * from './types';