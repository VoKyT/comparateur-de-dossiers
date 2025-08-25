/**
 * @fileoverview Page d'accueil de l'application comparateur de dossiers
 * @description Page principale composée de modules réutilisables selon architecture CLAUDE.md
 * @props Aucune - Composant de page autonome
 * @state Aucun état local - Délégué aux composants enfants
 * @events handleTestClick, openWebConsole - Actions utilisateur
 * @dependencies AppLayout, PageHeader, VersionBadge, ActionButton, ButtonGroup
 * @parent App.tsx - Point d'entrée de l'application
 * @children Composants modulaires layout + common
 * @styling Classes Tailwind via composants shadcn/ui
 * @accessibility Navigation clavier et ARIA via composants
 * @performance Composants memo optimisés, pas de re-renders inutiles
 * @testing Logs avec IDs uniques pour traçabilité
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Layout components - Architecture modulaire
import { AppLayout } from '@/components/layout';

// Feature components - Composants métier
import { PermanentComparisonGrid } from '@/components/features';

// Common components
import { LanguageToggle } from '@/components/common';

// Shared constants - Configuration centralisée
import { APP_CONFIG, LOG_IDS } from '@/shared/constants';

// Shared types - Types modulaires
import { ComparisonData } from '@/shared/types';

// Business logic hooks
import { useComparison, useFolderSelection } from '@/shared/hooks';

// Accessibility
import { createAccessibleProps } from '@/shared/accessibility';

// Motion colors pour éviter les erreurs oklch
import { createSafeGradient, useMotionColorAnimation } from '@/shared/hooks/useMotionColors';

// Internationalization
import { useTranslation } from '@/shared/i18n';

// Icons
import { ArrowLeft } from 'lucide-react';

/**
 * Page d'accueil avec architecture modulaire professionnelle
 * 
 * Fonctionnalités :
 * - Structure modulaire selon CLAUDE.md
 * - Composants réutilisables et isolés
 * - Séparation des responsabilités stricte
 * - Logs de traçabilité avec IDs uniques
 * - Design responsive mobile-first
 */
// Types déplacés dans src/shared/types/

interface HomePageProps {
  onBackToWelcome?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onBackToWelcome }) => {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);

  // Hooks métier - logique déléguée
  const { compareFiles } = useComparison();
  const { folderA, folderB, handleFolderSelectA, handleFolderSelectB } = useFolderSelection();
  const { t } = useTranslation();
  const { backgroundColor, borderColor, textColor, animateHover, animateRest } = useMotionColorAnimation();

  // Handlers Google Drive (placeholder pour l'implémentation future)
  const handleGoogleDriveSelectA = async () => {
    console.log('🔍 [HOME_PAGE] Google Drive sélection A demandée');
    // TODO: Implémenter l'intégration Google Drive API
    alert('Fonctionnalité Google Drive en cours de développement.\nProchainement disponible pour accéder à vos dossiers cloud !');
  };

  const handleGoogleDriveSelectB = async () => {
    console.log('🔍 [HOME_PAGE] Google Drive sélection B demandée');
    // TODO: Implémenter l'intégration Google Drive API
    alert('Fonctionnalité Google Drive en cours de développement.\nProchainement disponible pour accéder à vos dossiers cloud !');
  };

  useEffect(() => {
    // Éviter les logs doublons en mode dev
    if (process.env.NODE_ENV === 'development') {
      console.log(`🆕 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.INIT}] Page d'accueil initialisée`);
    }
    
    // Configuration initiale du body selon CLAUDE.md
    document.body.className = 'm-0 p-0';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.CONFIG}] Configuration body appliquée`);
    }
  }, []);

  // Handlers déplacés dans useFolderSelection hook

  // Déclencher la comparaison quand les deux dossiers sont sélectionnés
  useEffect(() => {
    if (folderA?.files && folderB?.files) {
      // Extraire tous les fichiers (aplatis) pour la comparaison
      const allFilesA = folderA.allFiles || [];
      const allFilesB = folderB.allFiles || [];
      
      const data = compareFiles(allFilesA, allFilesB);
      setComparisonData(data);
      
      // Log uniquement si changement significatif
      const totalFiles = data.common.length + data.uniqueA.length + data.uniqueB.length;
      if (totalFiles > 0) {
        console.log(`🔍 [HOME_PAGE] Comparaison terminée: ${data.common.length} communs, ${data.uniqueA.length} uniques A, ${data.uniqueB.length} uniques B`);
      }
    } else {
      // Réinitialiser la comparaison si un des dossiers est déselectionné
      setComparisonData(null);
    }
  }, [folderA, folderB, compareFiles]);

  return (
    <AppLayout>
      <motion.div 
        className="h-full flex flex-col"
        initial={{ 
          opacity: 0, 
          y: 50,
          scale: 0.95
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          y: -30,
          scale: 1.02,
          transition: { 
            duration: 0.8, 
            ease: "easeOut" 
          }
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.1 
        }}
      >
        {/* Header bar stylé avec contrôles */}
        {onBackToWelcome && (
          <motion.header 
            className="relative flex justify-between items-center px-6 py-4 border-b border-slate-200 shadow-sm"
            style={{ background: createSafeGradient('to right', 'slate-50', 'white') }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Effet de brillance subtile */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-20"></div>
            
            {/* Bouton retour élégant */}
            <motion.button
              onClick={() => {
                setTimeout(() => {
                  onBackToWelcome();
                }, 200);
              }}
              className="group relative flex items-center gap-3 px-5 py-2.5 border border-slate-300 rounded-xl shadow-md text-slate-700 font-semibold overflow-hidden z-10"
              style={{ 
                background: createSafeGradient('to right', 'blue-50', 'slate-50'),
                backgroundColor,
                borderColor,
                color: textColor
              }}
              {...createAccessibleProps('backToWelcome')}
              onHoverStart={animateHover}
              onHoverEnd={animateRest}
              whileHover={{ 
                scale: 1.02,
                y: -1,
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)"
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0
              }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 400
              }}
            >
              {/* Effet de brillance interne */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 opacity-0"
                whileHover={{ opacity: 1, x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div className="z-10">
                <ArrowLeft size={18} className="text-slate-600" />
              </motion.div>
              <span className="text-sm font-medium z-10">{t('ui.buttons.back')}</span>
            </motion.button>

            {/* Titre central optionnel */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-lg font-bold text-slate-700 tracking-wide">
                {t('ui.title')}
              </h1>
            </motion.div>

            {/* Contrôles de langue stylés */}
            <div className="flex items-center gap-3 z-10">
              <LanguageToggle variant="inline" />
            </div>
          </motion.header>
        )}

        {/* Interface permanente 3 colonnes - avec espacement du header */}
        <div className="flex-1 min-h-0 pt-4">
          <PermanentComparisonGrid
            comparisonData={comparisonData}
            folderA={folderA}
            folderB={folderB}
            onFolderSelectA={handleFolderSelectA}
            onFolderSelectB={handleFolderSelectB}
            onGoogleDriveSelectA={handleGoogleDriveSelectA}
            onGoogleDriveSelectB={handleGoogleDriveSelectB}
          />
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default HomePage;