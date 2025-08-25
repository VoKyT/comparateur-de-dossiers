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
import { LanguageToggle } from '@/components/common';
import { I18nProvider } from '@/shared/i18n';
import { AnimatePresence, motion } from 'framer-motion';

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
    // Logs d'initialisation une seule fois
    if (process.env.NODE_ENV === 'development') {
      console.log('🆕 [APP] [APP_INIT_01] Application React avec écran de bienvenue initialisée');
      console.log('📊 [APP] [APP_ARCH_02] Architecture modulaire chargée');
    }
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
    <div className="motion-safe motion-reduce-oklch">
      <I18nProvider>
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <motion.div
              key="welcome-container"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.5 }
              }}
            >
              {/* Bouton de langue uniquement sur l'écran de bienvenue */}
              {/* <LanguageToggle variant="inline" /> */}
              <WelcomeScreen onWelcomeComplete={handleWelcomeComplete} />
            </motion.div>
          ) : showInterface ? (
            <HomePage key="home" onBackToWelcome={handleBackToWelcome} />
          ) : null}
        </AnimatePresence>
      </I18nProvider>
    </div>
  );
};

export default App;
