/**
 * @fileoverview Composant de sélection de dossiers
 * @description Interface pour sélectionner des dossiers avec API File System
 * @props onFolderSelect - Callback appelé lors de la sélection
 * @props label - Libellé du sélecteur
 * @props selectedFolder - Dossier actuellement sélectionné
 */

import React from 'react';
import { ActionButton } from '@/components/common';
import { DirectoryData } from '@/shared/types';
import { createAccessibleProps, AccessibilityLabelKey } from '@/shared/accessibility';
import { useFileSystem } from '@/shared/hooks';

interface FolderSelectorProps {
  onFolderSelect: (folder: DirectoryData | null) => void;
  label: string;
  selectedFolder?: DirectoryData | null;
  variant?: 'primary' | 'secondary';
  accessibilityKey: AccessibilityLabelKey;
}

export const FolderSelector: React.FC<FolderSelectorProps> = ({
  onFolderSelect,
  label,
  selectedFolder,
  variant = 'primary',
  accessibilityKey
}) => {
  const { buildFileTreeFromAPI, extractAllFiles } = useFileSystem();

  const handleSelect = async () => {
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        
        // Utilisation complète du système de fichiers
        const tree = await buildFileTreeFromAPI(dirHandle);
        const allFiles = extractAllFiles(tree);
        
        const folder: DirectoryData = { 
          name: dirHandle.name, 
          files: tree,
          allFiles: allFiles
        };
        
        console.log(`✅ [FOLDER_SELECTOR] Dossier sélectionné: ${dirHandle.name} (${tree.length} éléments, ${allFiles.length} fichiers total)`);
        onFolderSelect(folder);
      }
    } catch (error) {
      console.error('❌ [FOLDER_SELECTOR] Erreur sélection dossier:', error);
      onFolderSelect(null);
    }
  };

  return (
    <ActionButton
      onClick={handleSelect}
      variant={variant}
      size="lg"
      {...createAccessibleProps(accessibilityKey)}
    >
      {label} {selectedFolder ? `(${selectedFolder.name})` : ''}
    </ActionButton>
  );
};