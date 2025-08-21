/**
 * @fileoverview Barrel export pour tous les types partagés
 * @description Point d'entrée centralisé pour l'importation des types
 * @types Réexport de tous les types du dossier shared/types
 * @usage import { ComparisonResult, FileItem } from '@/shared/types';
 * @related Tous les fichiers .ts du dossier types/
 */

// File System Types
export * from './file-system';

// Comparison Types
export * from './comparison';
