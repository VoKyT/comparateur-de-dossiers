/**
 * @fileoverview Hook personnalisé pour la sélection de dossiers
 * @description Gère la logique de sélection de dossiers A et B avec File System Access API
 * @returns Functions et états pour sélection de dossiers
 * @dependencies useFileSystem - Hook pour manipulation fichiers
 * @parent HomePage - Page principale utilisant ce hook
 * @state folderA, folderB - États des dossiers sélectionnés
 * @events handleFolderSelectA, handleFolderSelectB - Handlers de sélection
 * @performance Callbacks mémorisés avec useCallback
 * @accessibility Support des APIs modernes avec fallback
 * @testing Logs avec identifiants uniques pour debug
 */

import { useState, useCallback } from 'react';
import { DirectoryData } from '@/shared/types';
import { useFileSystem } from '@/shared/hooks';

/**
 * Interface pour le hook de sélection de dossiers
 */
interface UseFolderSelectionReturn {
  folderA: DirectoryData | null;
  folderB: DirectoryData | null;
  handleFolderSelectA: () => Promise<void>;
  handleFolderSelectB: () => Promise<void>;
}

/**
 * Hook personnalisé pour la sélection de dossiers avec File System Access API
 * Gère les états et la logique de sélection des dossiers A et B
 */
export const useFolderSelection = (): UseFolderSelectionReturn => {
  const [folderA, setFolderA] = useState<DirectoryData | null>(null);
  const [folderB, setFolderB] = useState<DirectoryData | null>(null);
  
  const { buildFileTreeFromAPI, extractAllFiles } = useFileSystem();

  const handleFolderSelectA = useCallback(async () => {
    console.log(`👆 [FOLDER_SELECTION] Sélection dossier A`);
    
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        const tree = await buildFileTreeFromAPI(dirHandle);
        const files = extractAllFiles(tree);
        
        setFolderA({ name: dirHandle.name, files });
        console.log(`✅ [FOLDER_SELECTION] Dossier A sélectionné: ${dirHandle.name} (${files.length} fichiers)`);
      } else {
        console.warn(`⚠️ [FOLDER_SELECTION] File System Access API non supportée`);
      }
    } catch (error) {
      console.error(`❌ [FOLDER_SELECTION] Erreur sélection dossier A:`, error);
    }
  }, [buildFileTreeFromAPI, extractAllFiles]);

  const handleFolderSelectB = useCallback(async () => {
    console.log(`👆 [FOLDER_SELECTION] Sélection dossier B`);
    
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        const tree = await buildFileTreeFromAPI(dirHandle);
        const files = extractAllFiles(tree);
        
        setFolderB({ name: dirHandle.name, files });
        console.log(`✅ [FOLDER_SELECTION] Dossier B sélectionné: ${dirHandle.name} (${files.length} fichiers)`);
      } else {
        console.warn(`⚠️ [FOLDER_SELECTION] File System Access API non supportée`);
      }
    } catch (error) {
      console.error(`❌ [FOLDER_SELECTION] Erreur sélection dossier B:`, error);
    }
  }, [buildFileTreeFromAPI, extractAllFiles]);

  return {
    folderA,
    folderB,
    handleFolderSelectA,
    handleFolderSelectB
  };
};

export default useFolderSelection;