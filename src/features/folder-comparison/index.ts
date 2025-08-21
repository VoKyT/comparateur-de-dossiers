/**
 * @fileoverview Barrel export pour la feature comparaison de dossiers
 * @description Point d'entrée centralisé selon architecture modulaire CLAUDE.md
 * @exports * from types, hooks, components
 * @usage import { useFolderComparison, FolderSelector, ComparisonResult } from '@/features/folder-comparison'
 * @related Tous les modules de la feature
 * @notes Export isolé par feature selon CLAUDE.md - isolation stricte
 */

// Types - Interfaces et types TypeScript
export * from './types';

// Hooks - Logique métier React
export * from './hooks';

// Components - Interface utilisateur
export * from './components/index';