/**
 * @fileoverview Composant d'affichage complet d'arborescence
 * @description Container pour afficher un arbre de fichiers avec en-tête
 * @props fileTree - Arbre de fichiers à afficher
 * @props selectedFolder - Nom du dossier racine
 */

import React from 'react';
import { FileTree } from '@/shared/types';
import { FileTreeRenderer } from './FileTreeRenderer';

interface FileTreeDisplayProps {
  fileTree: FileTree;
  selectedFolder: string;
}

export const FileTreeDisplay: React.FC<FileTreeDisplayProps> = ({
  fileTree,
  selectedFolder
}) => {
  if (fileTree.length === 0) return null;

  return (
    <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
      <div className="max-h-96 overflow-y-auto relative">
        {/* Affichage du dossier racine avec compteur */}
        <div className="flex items-center gap-2 py-1 px-2 font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2 font-mono-tree">
          <div className="w-4 h-4 bg-slate-400 rounded-sm flex-shrink-0"></div>
          <span className="text-sm">{selectedFolder}/</span>
          <span className="text-xs text-slate-500">
            {(() => {
              const directFolders = fileTree.filter(item => item.type === 'directory').length;
              const directFiles = fileTree.filter(item => item.type === 'file').length;
              const parts = [];
              if (directFolders > 0) parts.push(`${directFolders} dossier${directFolders > 1 ? 's' : ''}`);
              if (directFiles > 0) parts.push(`${directFiles} fichier${directFiles > 1 ? 's' : ''}`);
              return parts.length > 0 ? `(${parts.join(' - ')})` : '';
            })()}
          </span>
        </div>
        <FileTreeRenderer items={fileTree} />
      </div>
    </div>
  );
};