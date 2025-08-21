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

import React, { useEffect, useState } from 'react';
import './styles/globals.css';
import { HomePage } from '@/pages';
import { WelcomeScreen } from '@/components/layout';
import { AnimatePresence } from 'framer-motion';

/**
 * Application principale avec écran de bienvenue animé
 * 
 * Fonctionnalités :
 * - Écran d'accueil avec animation de transition
 * - Interface principale révélée après clic
 * - Architecture modulaire professionnelle
 * - Animations fluides et élégantes
 */
const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showInterface, setShowInterface] = useState(false);

  useEffect(() => {
    console.log('🆕 [APP] [APP_INIT_01] Application React avec écran de bienvenue initialisée');
    console.log('📊 [APP] [APP_ARCH_02] Architecture modulaire chargée');
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setShowInterface(true);
  };

  const handleBackToWelcome = () => {
    setShowInterface(false);
    setShowWelcome(true);
  };

  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <WelcomeScreen key="welcome" onWelcomeComplete={handleWelcomeComplete} />
      ) : showInterface ? (
        <HomePage key="home" onBackToWelcome={handleBackToWelcome} />
      ) : null}
    </AnimatePresence>
  );
};

export default App;
