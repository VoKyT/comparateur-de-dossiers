/**
 * @fileoverview Composant de sélection de langue animé
 * @description Toggle de langue avec drapeaux et animations Framer Motion
 * @props Aucune - Gestion autonome via context i18n
 * @state Géré par le context I18nProvider
 * @animations Framer Motion pour transitions fluides
 * @accessibility ARIA labels et navigation clavier
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, Language } from '@/shared/i18n';
import { FrenchFlag, BritishFlag } from './FlagIcon';
import { createSafeGradient, useMotionColorAnimation } from '@/shared/hooks/useMotionColors';

interface LanguageToggleProps {
  variant?: 'fixed' | 'inline';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'fixed' }) => {
  const { language, setLanguage, t } = useTranslation();
  const { backgroundColor, borderColor, animateHover, animateRest } = useMotionColorAnimation();
  const [showTooltip, setShowTooltip] = useState(false);

  const otherLanguage: Language = language === 'fr' ? 'en' : 'fr';
  
  const CurrentFlagComponent = language === 'fr' ? FrenchFlag : BritishFlag;
  const OtherFlagComponent = language === 'fr' ? BritishFlag : FrenchFlag;
  
  const currentCode = language === 'fr' ? 'FR' : 'EN';
  const otherCode = language === 'fr' ? 'EN' : 'FR';

  const handleToggle = () => {
    setLanguage(otherLanguage);
  };

  const containerClass = variant === 'fixed' 
    ? "fixed top-4 right-4 z-50" 
    : "relative";
    
  const initialAnimation = variant === 'fixed'
    ? { opacity: 0, x: 50, rotate: -10 }
    : { opacity: 0, scale: 0.8 };
    
  const animateAnimation = variant === 'fixed'
    ? { opacity: 1, x: 0, rotate: 0 }
    : { opacity: 1, scale: 1 };

  return (
    <motion.div
      className={containerClass}
      initial={initialAnimation}
      animate={animateAnimation}
      transition={{ 
        type: "spring", 
        damping: 15, 
        stiffness: 300,
        delay: variant === 'fixed' ? 0.8 : 0.2
      }}
    >
      <motion.button
        onClick={handleToggle}
        className={`relative flex items-center overflow-hidden ${
          variant === 'fixed' 
            ? "gap-3 px-4 py-3 bg-white/90 backdrop-blur-md border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-xl" 
            : "gap-1.5 px-2.5 py-1.5 border border-slate-300 rounded-lg shadow-sm hover:shadow-md"
        }`}
        style={{ 
          background: variant === 'inline' ? createSafeGradient('to right', 'white', 'slate-50') : undefined,
          backgroundColor,
          borderColor 
        }}
        onHoverStart={() => {
          animateHover();
          setShowTooltip(true);
        }}
        onHoverEnd={() => {
          animateRest();
          setShowTooltip(false);
        }}
        whileHover={{ 
          scale: 1.05,
          y: -2
        }}
        whileTap={{ 
          scale: 0.95,
          y: 0 
        }}
        transition={{ 
          type: "spring", 
          damping: 12, 
          stiffness: 400 
        }}
        aria-label={t('accessibility.languageToggle')}
        title={t('accessibility.languageToggle')}
      >
        {/* Effet de brillance au hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {variant === 'fixed' ? (
          <>
            {/* Version complète pour l'écran de bienvenue */}
            {/* Drapeau actuel avec animation */}
            <motion.div
              key={`current-${language}`}
              className="relative z-10 flex items-center gap-2"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 180, scale: 0 }}
              transition={{ 
                type: "spring", 
                damping: 10, 
                stiffness: 200 
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4, 
                  ease: "easeInOut",
                  repeatType: "reverse"
                }}
              >
                <CurrentFlagComponent size={28} className="shadow-sm" />
              </motion.div>
              <span className="font-semibold text-slate-700 text-sm select-none">
                {currentCode}
              </span>
            </motion.div>

            {/* Flèche de transition */}
            <motion.div
              className="relative z-10 text-slate-400"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </motion.div>

            {/* Drapeau de destination (preview) */}
            <motion.div
              className="relative z-10 flex items-center gap-2"
              animate={{ opacity: showTooltip ? 1 : 0.6 }}
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, 0] 
              }}
              transition={{ duration: 0.3 }}
            >
              <OtherFlagComponent size={20} className="shadow-sm" />
              <span className="font-medium text-slate-500 text-xs select-none">
                {otherCode}
              </span>
            </motion.div>
          </>
        ) : (
          <>
            {/* Version compacte pour le header - juste le drapeau actuel */}
            <motion.div
              key={`current-${language}`}
              className="relative z-10 flex items-center gap-1"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                damping: 15, 
                stiffness: 300 
              }}
            >
              <CurrentFlagComponent size={16} className="shadow-sm" />
              <span className="font-medium text-slate-700 text-xs select-none">
                {currentCode}
              </span>
            </motion.div>
          </>
        )}

        {/* Particules décoratives uniquement pour la version fixed et au hover */}
        {variant === 'fixed' && showTooltip && (
          <>
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-400 rounded-full"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0.3, 1.2, 0.3],
                y: [0, -3, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                delay: 0.5,
                ease: "easeInOut"
              }}
            />
          </>
        )}
      </motion.button>

      {/* Tooltip informatif */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute top-full right-0 mt-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg pointer-events-none z-50"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {t('accessibility.languageToggle')}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-800 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};