/**
 * @fileoverview Écran de bienvenue avec animation de transition
 * @description Page de couverture avec titre animé qui se transforme
 * @props onWelcomeComplete - Callback quand animation terminée
 * @state isAnimating - État de l'animation en cours
 * @events handleTitleClick - Déclencheur animation de transition
 * @dependencies Animations CSS avec transitions professionnelles
 * @parent App.tsx - Point d'entrée application
 * @children Aucun - Composant d'accueil pur
 * @styling Classes Tailwind + animations CSS personnalisées
 * @accessibility Zone clickable large et indication visuelle
 * @performance Transitions GPU avec transform pour fluidité
 * @testing Animation testable via data-testid
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from './PageHeader';

interface WelcomeScreenProps {
  onWelcomeComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onWelcomeComplete }) => {
  const handleTitleClick = () => {
    onWelcomeComplete();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 z-50 flex items-center justify-center overflow-hidden"
      initial={{ 
        opacity: 1,
        scale: 1
      }}
      exit={{ 
        opacity: 0,
        scale: 0.95,
        y: -30,
        transition: { 
          duration: 0.8, 
          ease: "easeOut" 
        }
      }}
    >
      <div className="relative">
        {/* Titre principal avec layoutId pour transition fluide */}
        <motion.div 
          className="select-none cursor-default relative z-[60]"
          onClick={handleTitleClick}
          data-testid="welcome-title-trigger"
          initial={{ scale: 1.4 }}
          transition={{ 
            type: "spring",
            damping: 20,
            stiffness: 150
          }}
        >
          <h1 className="professional-title-font text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center leading-tight">
            Comparateur de Dossiers
          </h1>
        </motion.div>
        
        {/* Sous-titre avec animation élégante */}
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: 20,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
        >
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Analysez et comparez vos fichiers avec élégance
          </p>
          <motion.p 
            className="text-base md:text-lg text-slate-500 mt-16 md:mt-20 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            Cliquez sur le titre pour commencer
          </motion.p>
        </motion.div>
      </div>
      
      {/* Particules décoratives animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-slate-400/30 rounded-full"
          animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300/25 rounded-full"
          animate={{ opacity: [0.2, 0.6, 0.2], rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear", delay: 2 }}
        />
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;