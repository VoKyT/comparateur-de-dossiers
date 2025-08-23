/**
 * @fileoverview Composant FileTreeItem avec mise en évidence des fichiers uniques
 * @description Extension de FileTreeItem qui met en évidence les fichiers selon le mode comparaison
 * @props item - Élément FileItem à afficher
 * @props depth - Profondeur dans l'arborescence
 * @props uniqueFiles - Liste des fichiers uniques à mettre en évidence
 * @props colorScheme - Schéma de couleur pour la mise en évidence
 */

import React from 'react';
import { FileItem, ComparisonResult } from '@/shared/types';
import { FileTreeItem } from './FileTreeItem';

interface FileTreeItemWithComparisonProps {
  item: FileItem;
  depth?: number;
  uniqueFiles?: (FileItem | ComparisonResult)[];
  colorScheme?: 'blue' | 'green' | 'purple' | 'slate';
}

export const FileTreeItemWithComparison: React.FC<FileTreeItemWithComparisonProps> = ({
  item,
  depth = 0,
  uniqueFiles = [],
  colorScheme = 'slate'
}) => {
  // Vérifier si ce fichier est dans la liste des fichiers uniques
  const isUnique = item.type === 'file' && uniqueFiles.some(uniqueFile => {
    if ('pathA' in uniqueFile && 'pathB' in uniqueFile) {
      // ComparisonResult
      return uniqueFile.name === item.name;
    } else {
      // FileItem
      return uniqueFile.name === item.name && uniqueFile.path === item.path;
    }
  });

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200', 
    purple: 'bg-purple-50 border-purple-200',
    slate: 'bg-slate-50 border-slate-200'
  };

  const highlightColor = colorClasses[colorScheme];

  // Créer un item modifié pour la mise en évidence
  const modifiedItem = {
    ...item,
    children: undefined // On gère les enfants séparément pour éviter la double récursion
  };

  return (
    <div>
      <div className={isUnique ? `${highlightColor} border rounded-md mb-1 p-1` : ''}>
        <FileTreeItem item={modifiedItem} depth={depth} />
        {isUnique && (
          <div className="ml-8 text-xs text-blue-600 font-medium">
            📌 Unique to this folder
          </div>
        )}
      </div>
      
      {/* Rendu récursif des enfants avec comparaison */}
      {item.children && item.children.map((child, index) => (
        <FileTreeItemWithComparison
          key={`${child.path}-${index}`}
          item={child}
          depth={depth + 1}
          uniqueFiles={uniqueFiles}
          colorScheme={colorScheme}
        />
      ))}
    </div>
  );
};