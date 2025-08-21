/**
 * @fileoverview Barrel export pour toutes les features
 * @description Point d'entrée centralisé pour toutes les features métier
 * @exports * from folder-comparison, settings, etc.
 * @usage import { useFolderComparison, FolderSelector } from '@/features'
 * @related Toutes les features du projet
 * @notes Export global des features selon architecture modulaire CLAUDE.md
 */

// Feature: Comparaison de dossiers
export * from './folder-comparison';

// Futures features:
// export * from './settings';
// export * from './export';
// export * from './history';