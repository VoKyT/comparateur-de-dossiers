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
  const handleSelect = async () => {
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await (window as any).showDirectoryPicker();
        // Ici on devrait utiliser le hook useFileSystem mais pour simplifier
        // on fait un appel direct pour l'instant
        const folder: DirectoryData = { name: dirHandle.name, files: [] };
        onFolderSelect(folder);
      }
    } catch (error) {
      console.error('Erreur sélection dossier:', error);
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