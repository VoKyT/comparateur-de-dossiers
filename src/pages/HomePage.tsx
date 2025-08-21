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

// Feature components - Composants métier
import { ComparisonGrid, FileTreeDisplay } from '@/components/features';

// Shared constants - Configuration centralisée
import { APP_CONFIG, LOG_IDS } from '@/shared/constants';

// Shared types - Types modulaires
import { FileItem, ComparisonResult, ComparisonData, DirectoryData } from '@/shared/types';

// Business logic hooks
import { useFileSystem, useComparison, useFolderSelection } from '@/shared/hooks';

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

export const HomePage: React.FC = () => {
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.1 
        }}
      >
        {/* Header compact avec titre et actions */}
        <div className="flex-shrink-0 mb-6">
          <PageHeader 
            title="Comparateur de Dossiers"
          />
          
          {/* Panel de contrôles compacts */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row items-center gap-4">
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