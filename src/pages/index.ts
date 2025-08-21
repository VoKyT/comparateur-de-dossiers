/**
 * @fileoverview Barrel export pour les pages de l'application
 * @description Point d'entrée centralisé pour toutes les pages selon architecture CLAUDE.md
 * @exports HomePage, ComparisonPage - Pages de l'application
 * @usage import { HomePage, ComparisonPage } from '@/pages'
 * @related App.tsx - Point d'entrée principal
 * @notes Export centralisé pour imports simplifiés et modularité
 */

export { HomePage, default as HomePageDefault } from './HomePage';
export { ComparisonPage, default as ComparisonPageDefault } from './ComparisonPage';