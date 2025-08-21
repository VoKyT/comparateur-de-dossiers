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
      {/* En-tête stylé et attirant */}
      <PageHeader 
        title="Comparateur de Dossiers"
      />

      {/* Boutons de comparaison */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <ActionButton
            onClick={handleFolderSelectA}
            variant="primary"
            size="lg"
          >
            Select Folder A {folderA ? `(${folderA.name})` : ''}
          </ActionButton>
          
          <ActionButton
            onClick={handleFolderSelectB}
            variant="primary"
            size="lg"
          >
            Select Folder B {folderB ? `(${folderB.name})` : ''}
          </ActionButton>
        </div>
        
        {/* Séparateur OU pour la navigation simple */}
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-slate-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>
        
        <ActionButton
          onClick={handleFolderSelect}
          variant="secondary"
          size="default"
        >
          Explore Single Folder
        </ActionButton>

        {/* Affichage du dossier sélectionné */}
        {selectedFolder && (
          <div className="bg-white border border-slate-200 rounded-lg px-6 py-4 shadow-sm mb-6">
            <p className="text-base sm:text-lg text-slate-800 font-semibold">
              Selected Folder: <span className="text-slate-700">{selectedFolder}</span>
            </p>
          </div>
        )}

        {/* Interface 3 colonnes de comparaison */}
        {comparisonData && folderA && folderB && (
          <ComparisonGrid
            comparisonData={comparisonData}
            folderAName={folderA.name}
            folderBName={folderB.name}
          />
        )}

        {/* Affichage de l'arbre des fichiers */}
        <FileTreeDisplay
          fileTree={fileTree}
          selectedFolder={selectedFolder}
        />
      </div>
    </AppLayout>
  );
};

export default HomePage;