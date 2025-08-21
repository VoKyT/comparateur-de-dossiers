/**
 * @fileoverview Constantes globales de l'application
 * @description Centralisation de toutes les constantes partagées selon CLAUDE.md
 * @types Constantes typées pour configuration et métadonnées
 * @usage import { APP_CONFIG, ROUTES, UI_CONSTANTS } from '@/shared/constants'
 * @related components/, features/ - Consommateurs des constantes
 * @notes Constantes globales uniquement, pas de feature-specific
 */

// Configuration de l'application
export const APP_CONFIG = {
  name: 'Comparateur de Dossiers',
  version: '1.3.1',
  mode: 'Mode Web',
  description: 'Application web moderne • Vite HMR • Comparaison intelligente et rapide',
  author: 'VoKyT',
  repository: 'https://github.com/VoKyT/comparateur-de-dossiers'
} as const;

// Routes de l'application (préparation pour routing futur)
export const ROUTES = {
  HOME: '/',
  COMPARISON: '/comparison',
  SETTINGS: '/settings',
  ABOUT: '/about'
} as const;

// Constantes UI et design
export const UI_CONSTANTS = {
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    large: 1280,
    xlarge: 1536
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  spacing: {
    compact: 'space-y-2 sm:space-y-2',
    normal: 'space-y-3 sm:space-y-4',
    relaxed: 'space-y-4 sm:space-y-6 md:space-y-8'
  }
} as const;

// Constantes de logs (IDs uniques selon CLAUDE.md)
export const LOG_IDS = {
  APP: {
    INIT: 'APP_INIT_01',
    ARCH: 'APP_ARCH_02'
  },
  HOME_PAGE: {
    INIT: 'HP_INIT_01',
    CONFIG: 'HP_CONFIG_02',
    TEST: 'HP_TEST_03',
    SUCCESS: 'HP_SUCCESS_04',
    CONSOLE: 'HP_CONSOLE_05',
    INFO: 'HP_INFO_06'
  },
  FOLDER_SELECTOR: {
    INIT: 'FS_INIT_01',
    CLICK: 'FS_CLICK_02',
    DIALOG: 'FS_DIALOG_03',
    SUCCESS: 'FS_SUCCESS_04',
    ERROR: 'FS_ERROR_05'
  }
} as const;

// Types pour TypeScript strict
export type AppConfigType = typeof APP_CONFIG;
export type RouteType = typeof ROUTES;
export type UIConstantsType = typeof UI_CONSTANTS;
export type LogIdsType = typeof LOG_IDS;