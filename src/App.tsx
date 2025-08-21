/**
 * @fileoverview Point d'entrée principal de l'application React
 * @description Composant racine gérant le routing et l'initialisation globale
 * @props Aucune - Composant racine autonome
 * @state Aucun état global - Délégué aux pages et composants
 * @events Aucun - Délégué aux pages
 * @dependencies HomePage - Page d'accueil modulaire
 * @parent index.tsx - Point d'entrée React DOM
 * @children HomePage - Architecture modulaire par pages
 * @styling Import global CSS + délégation aux composants
 * @accessibility Support via composants modulaires
 * @performance Architecture modulaire optimisée
 * @testing Logs d'initialisation avec ID unique
 */

import React, { useEffect } from 'react';
import './styles/globals.css';
import { HomePage } from '@/pages';

/**
 * Application principale avec architecture modulaire professionnelle
 * 
 * Fonctionnalités :
 * - Point d'entrée clean selon CLAUDE.md
 * - Délégation totale aux pages modulaires
 * - Séparation des responsabilités stricte
 * - Logs de traçabilité centralisés
 * - Architecture évolutive pour routing futur
 */
const App: React.FC = () => {
  useEffect(() => {
    console.log('🆕 [APP] [APP_INIT_01] Application React initialisée');
    console.log('📊 [APP] [APP_ARCH_02] Architecture modulaire chargée');
  }, []);

  return <HomePage />;
};

export default App;
