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
import { AppLayout, PageHeader } from '@/components/layout';

// Common reusable components - Réutilisabilité
import { ActionButton } from '@/components/common';
import { Button } from '@/components/ui/button';

// Feature components - Composants métier
import { ComparisonGrid, FileTreeDisplay } from '@/components/features';

// Shared constants - Configuration centralisée
import { APP_CONFIG, LOG_IDS } from '@/shared/constants';

// Shared types - Types modulaires
import { FileItem, ComparisonResult, ComparisonData, DirectoryData } from '@/shared/types';

// Business logic hooks
import { useFileSystem, useComparison, useFolderSelection } from '@/shared/hooks';

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
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [fileTree, setFileTree] = useState<FileItem[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);

  // Hooks métier - logique déléguée
  const { buildFileTree, buildFileTreeFromAPI, extractAllFiles } = useFileSystem();
  const { compareFiles } = useComparison();
  const { folderA, folderB, handleFolderSelectA, handleFolderSelectB } = useFolderSelection();

  useEffect(() => {
    console.log(`🆕 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.INIT}] Page d'accueil initialisée`);
    
    // Configuration initiale du body selon CLAUDE.md
    document.body.className = 'm-0 p-0';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    console.log(`📊 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.CONFIG}] Configuration body appliquée`);
  }, []);

  // Handlers déplacés dans useFolderSelection hook

  // Déclencher la comparaison quand les deux dossiers sont sélectionnés
  useEffect(() => {
    if (folderA?.files && folderB?.files) {
      const data = compareFiles(folderA.files, folderB.files);
      setComparisonData(data);
      console.log(`🔍 [HOME_PAGE] Comparaison terminée: ${data.common.length} communs, ${data.uniqueA.length} uniques A, ${data.uniqueB.length} uniques B`);
    }
  }, [folderA, folderB, compareFiles]);

  const handleFolderSelect = async () => {
    console.log(`👆 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.FOLDER_SELECT}] Sélection de dossier`);
    
    try {
      // Essayer d'abord l'API File System Access pour détecter les dossiers vides
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        setSelectedFolder(dirHandle.name);
        
        console.log(`🔍 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] Utilisation File System Access API`);
        const tree = await buildFileTreeFromAPI(dirHandle);
        setFileTree(tree);
        
        console.log(`✅ [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] Dossier sélectionné: ${dirHandle.name}`);
        console.log('🌳 [HOME_PAGE] Arbre construit avec dossiers vides:', tree);
      } else {
        // Fallback pour browsers sans support
        console.log(`⚠️ [HOME_PAGE] Fallback vers webkitdirectory (dossiers vides non détectés)`);
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        input.onchange = (e: any) => {
          const files = e.target.files;
          if (files.length > 0) {
            const folderPath = files[0].webkitRelativePath.split('/')[0];
            setSelectedFolder(folderPath);
            
            // Construire l'arbre des fichiers
            const tree = buildFileTree(files);
            setFileTree(tree);
            
            console.log(`✅ [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] Dossier sélectionné: ${folderPath}`);
            console.log(`📁 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] ${files.length} fichiers trouvés`);
          }
        };
        input.click();
      }
    } catch (error) {
      console.error(`❌ [HOME_PAGE] [${LOG_IDS.HOME_PAGE.ERROR}] Erreur sélection dossier:`, error);
    }
  };

  // Fonction renderFileTree déplacée dans FileTreeRenderer component

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
        {/* Bouton retour avec animations ultra-stylées */}
        {onBackToWelcome && (
          <motion.div 
            className="absolute top-4 left-4 z-50"
            initial={{ 
              opacity: 0, 
              x: -100, 
              rotate: -25,
              scale: 0.6
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              rotate: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              x: -80,
              scale: 0.8,
              rotate: -15
            }}
            transition={{ 
              type: "spring",
              damping: 15,
              stiffness: 200,
              delay: 0.4
            }}
          >
            <motion.button
              onClick={() => {
                // Animation de sortie ultra-stylée
                setTimeout(() => {
                  onBackToWelcome();
                }, 300);
              }}
              className="group relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-white to-slate-50 border border-slate-200 rounded-xl shadow-md text-slate-700 font-semibold overflow-hidden"
              whileHover={{ 
                scale: 1.15,
                y: -4,
                rotateX: 10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                borderColor: "rgb(59 130 246)",
                background: "linear-gradient(135deg, rgb(239 246 255) 0%, rgb(219 234 254) 100%)"
              }}
              whileTap={{ 
                scale: 0.92,
                y: -1,
                rotateX: 0
              }}
              exit={{
                scale: 0.85,
                opacity: 0.5,
                y: 10
              }}
              transition={{ 
                type: "spring", 
                damping: 12, 
                stiffness: 500,
                mass: 0.8
              }}
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              {/* Effet de brillance au hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              
              {/* Icône avec animation avancée */}
              <motion.div
                className="relative z-10"
                animate={{ 
                  rotate: [0, -15, 5, 0],
                  x: [0, -2, 1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "easeInOut",
                  repeatType: "reverse",
                  delay: 1
                }}
                whileHover={{
                  rotate: -20,
                  x: -3,
                  transition: { duration: 0.3 }
                }}
              >
                <ArrowLeft size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
              </motion.div>
              
              {/* Texte avec animation */}
              <motion.span 
                className="select-none relative z-10 text-slate-700 group-hover:text-blue-700 transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                Retour
              </motion.span>
              
              {/* Particules décoratives */}
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0"
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  y: [0, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: 2,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-slate-400 rounded-full opacity-0"
                animate={{ 
                  opacity: [0, 0.7, 0],
                  scale: [0.3, 1, 0.3],
                  x: [0, 3, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  delay: 1.5,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          </motion.div>
        )}

        {/* Header compact avec titre et actions */}
        <div className="flex-shrink-0 mb-6">
          <PageHeader 
            title="Comparateur de Dossiers"
          />
          
          {/* Panel de contrôles compacts */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              {/* Boutons de comparaison */}
              <div className="flex flex-col sm:flex-row gap-3">
                <ActionButton
                  onClick={handleFolderSelectA}
                  variant="primary"
                  size="default"
                >
                  Folder A {folderA ? `(${folderA.name})` : ''}
                </ActionButton>
                
                <ActionButton
                  onClick={handleFolderSelectB}
                  variant="primary"
                  size="default"
                >
                  Folder B {folderB ? `(${folderB.name})` : ''}
                </ActionButton>
              </div>
              
              {/* Séparateur vertical/horizontal */}
              <div className="hidden lg:block w-px h-8 bg-slate-300"></div>
              <div className="lg:hidden w-full h-px bg-slate-300"></div>
              
              <ActionButton
                onClick={handleFolderSelect}
                variant="secondary"
                size="default"
              >
                Single Folder
              </ActionButton>
            </div>

            {/* Status bar si dossier sélectionné */}
            {selectedFolder && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Selected:</span> {selectedFolder}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Zone de travail principale - extensible */}
        <div className="flex-1 min-h-0">
          {/* Interface de comparaison 3 colonnes - pleine hauteur */}
          {comparisonData && folderA && folderB && (
            <div className="h-full">
              <ComparisonGrid
                comparisonData={comparisonData}
                folderAName={folderA.name}
                folderBName={folderB.name}
              />
            </div>
          )}

          {/* Affichage de l'arbre des fichiers - pleine hauteur */}
          {fileTree.length > 0 && !comparisonData && (
            <div className="h-full">
              <FileTreeDisplay
                fileTree={fileTree}
                selectedFolder={selectedFolder}
              />
            </div>
          )}

          {/* État vide - zone d'accueil */}
          {!comparisonData && fileTree.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 1v6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Ready to Compare
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Select folders above to start comparing files or explore a single folder structure.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default HomePage;