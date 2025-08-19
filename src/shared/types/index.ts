/**
 * @fileoverview Barrel export pour tous les types partagés
 * @description Point d'entrée centralisé pour l'importation des types
 * @types Réexport de tous les types du dossier shared/types
 * @usage import { ElectronAPI, SystemInfo } from '@/shared/types';
 * @related Tous les fichiers .ts du dossier types/
 */

// Types Electron
export * from './electron';

// Types additionnels seront ajoutés ici au fur et à mesure
// export * from './comparison';
// export * from './ui';
// export * from './settings';
