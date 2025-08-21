/**
 * @fileoverview Composant de rendu d'arborescence de fichiers
 * @description Affiche l'arbre de fichiers avec numérotation et hiérarchie
 * @props items - Éléments de l'arborescence
 * @props level - Niveau de profondeur (défaut: 0)
 * @props isLast - Tableau des derniers éléments parents
 */

import React from 'react';
import { FileItem } from '@/shared/types';

interface FileTreeRendererProps {
  items: FileItem[];
  level?: number;
  isLast?: boolean[];
}

export const FileTreeRenderer: React.FC<FileTreeRendererProps> = ({
  items,
  level = 0,
  isLast = []
}) => {
  return (
    <div>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const currentIsLast = [...isLast, isLastItem];
        
        return (
          <div key={item.path}>
            <div 
              className="flex items-center gap-1 py-1 px-2 hover:bg-slate-50 transition-smooth text-sm" 
              style={{ 
                fontFamily: '"Consolas", "DejaVu Sans Mono", "Lucida Console", "Courier New", monospace' 
              }}
            >
              {/* Lignes d'arborescence avec caractères Unicode */}
              {level > 0 && (
                <div className="flex items-center">
                  {isLast.map((isParentLast, i) => (
                    <div key={i} className="w-4 flex justify-center">
                      <span className="text-slate-400">
                        {!isParentLast ? '│' : ' '}
                      </span>
                    </div>
                  ))}
                  <div className="w-4 flex justify-center">
                    <span className="text-sky-400">
                      {isLastItem ? '└' : '├'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky-400">─</span>
                  </div>
                </div>
              )}
              
              <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${item.type === 'directory' ? 'bg-slate-500' : 'bg-slate-400'}`}></div>
              <span className="text-sm text-slate-700 font-medium">
                {item.name}{item.type === 'directory' ? '/' : ''}
              </span>
              {item.type === 'directory' && (
                <span className="text-xs text-slate-500 ml-2">
                  {(() => {
                    if (!item.children || item.children.length === 0) {
                      return '(empty)';
                    }
                    const folders = item.children.filter(child => child.type === 'directory').length;
                    const files = item.children.filter(child => child.type === 'file').length;
                    const parts = [];
                    if (folders > 0) parts.push(`${folders} dossier${folders > 1 ? 's' : ''}`);
                    if (files > 0) parts.push(`${files} fichier${files > 1 ? 's' : ''}`);
                    return parts.length > 0 ? `(${parts.join(' - ')})` : '';
                  })()}
                </span>
              )}
            </div>
            {item.children && item.children.length > 0 && (
              <FileTreeRenderer 
                items={item.children} 
                level={level + 1} 
                isLast={currentIsLast} 
              />
            )}
          </div>
        );
      })}
    </div>
  );
};