/**
 * @fileoverview Barrel export pour les composants de layout
 * @description Point d'entrée centralisé pour tous les composants de mise en page
 * @exports AppLayout - Layout principal de l'application
 * @exports PageHeader - En-tête de page avec titre responsive
 * @exports WelcomeScreen - Écran de bienvenue avec animation
 * @usage import { AppLayout, PageHeader, WelcomeScreen } from '@/components/layout'
 */

export { AppLayout, default as AppLayoutDefault } from './AppLayout';
export { PageHeader, default as PageHeaderDefault } from './PageHeader';
export { WelcomeScreen, default as WelcomeScreenDefault } from './WelcomeScreen';