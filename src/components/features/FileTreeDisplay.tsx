/**
 * @fileoverview Composant d'affichage complet d'arborescence
 * @description Container pour afficher un arbre de fichiers avec en-tête
 * @props fileTree - Arbre de fichiers à afficher
 * @props selectedFolder - Nom du dossier racine
 */

import React from 'react';
import { FileTree } from '@/shared/types';
import { FileTreeRenderer } from './FileTreeRenderer';
import { useTranslation } from '@/shared/i18n';

interface FileTreeDisplayProps {
  fileTree: FileTree;
  selectedFolder: string;
}

export const FileTreeDisplay: React.FC<FileTreeDisplayProps> = ({
  fileTree,
  selectedFolder
}) => {
  const { t } = useTranslation();
  
  if (fileTree.length === 0) return null;

  return (
    <div className="h-full flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm">
      {/* Header avec info du dossier racine */}
      <div className="flex-shrink-0 border-b border-slate-100 p-6">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <div className="w-4 h-4 bg-slate-400 rounded-sm flex-shrink-0"></div>
          <span className="text-base font-mono">{selectedFolder}/</span>
        </div>
        <div className="text-sm text-slate-500 mt-2">
          {(() => {
            const directFolders = fileTree.filter(item => item.type === 'directory').length;
            const directFiles = fileTree.filter(item => item.type === 'file').length;
            const parts = [];
            if (directFolders > 0) {
              const folderLabel = directFolders > 1 ? t('comparison.placeholders.folders') : t('comparison.placeholders.folder');
              parts.push(`${directFolders} ${folderLabel}`);
            }
            if (directFiles > 0) {
              const fileLabel = directFiles > 1 ? t('comparison.placeholders.files') : t('comparison.placeholders.file');
              parts.push(`${directFiles} ${fileLabel}`);
            }
            return parts.length > 0 ? parts.join(' • ') : t('comparison.placeholders.emptyFolder');
          })()}
        </div>
      </div>
      
      {/* Zone d'arborescence scrollable pleine hauteur */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-custom">
        <FileTreeRenderer items={fileTree} />
      </div>
    </div>
  );
};