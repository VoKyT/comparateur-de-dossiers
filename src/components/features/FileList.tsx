/**
 * @fileoverview Composant d'affichage d'une liste de fichiers
 * @description Liste générique de fichiers avec couleurs et styles configurables
 * @props files - Liste des fichiers à afficher
 * @props title - Titre de la section
 * @props colorScheme - Schéma de couleurs (blue, gray, etc.)
 */

import React from 'react';
import { FileItem, ComparisonResult } from '@/shared/types';

interface FileListProps {
  files: FileItem[] | ComparisonResult[];
  title: string;
  colorScheme: 'blue' | 'gray' | 'slate';
  showPaths?: boolean;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  title,
  colorScheme,
  showPaths = false
}) => {
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          titleText: 'text-blue-800',
          subtitleText: 'text-blue-600',
          itemBorder: 'border-blue-200',
          itemHover: 'hover:bg-blue-50',
          itemText: 'text-blue-700',
          itemSubtext: 'text-blue-500',
          dot: 'bg-blue-500'
        };
      case 'gray':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          titleText: 'text-gray-800',
          subtitleText: 'text-gray-600',
          itemBorder: 'border-gray-200',
          itemHover: 'hover:bg-gray-50',
          itemText: 'text-gray-700',
          itemSubtext: 'text-gray-500',
          dot: 'bg-gray-400'
        };
      default: // slate
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          titleText: 'text-slate-800',
          subtitleText: 'text-slate-600',
          itemBorder: 'border-slate-200',
          itemHover: 'hover:bg-slate-50',
          itemText: 'text-slate-700',
          itemSubtext: 'text-slate-500',
          dot: 'bg-slate-400'
        };
    }
  };

  const colors = getColorClasses();

  const isComparisonResult = (item: FileItem | ComparisonResult): item is ComparisonResult => {
    return 'pathA' in item && 'pathB' in item;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header fixe */}
      <div className="flex-shrink-0 p-4 border-b border-slate-100">
        <h4 className={`font-bold ${colors.titleText} text-center`}>
          {title}
          <span className={`block text-sm font-normal ${colors.subtitleText}`}>
            ({files.length} file{files.length > 1 ? 's' : ''})
          </span>
        </h4>
      </div>
      
      {/* Liste scrollable pleine hauteur */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-custom">
        <div className="space-y-2">
          {files.map((file, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg p-3 border ${colors.itemBorder} ${colors.itemHover} transition-colors duration-200`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 ${colors.dot} rounded-full flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${colors.itemText} truncate`}>
                    {isComparisonResult(file) ? file.name : file.name}
                  </div>
                  <div className={`text-xs ${colors.itemSubtext}`}>
                    {isComparisonResult(file) 
                      ? `${(file.size / 1024).toFixed(1)} KB`
                      : file.size ? `${(file.size / 1024).toFixed(1)} KB` : 'N/A'
                    }
                  </div>
                  
                  {showPaths && isComparisonResult(file) && (
                    <>
                      <div className={`text-xs ${colors.itemSubtext} truncate mt-1`}>
                        <span className="font-medium">A:</span> {file.pathA}
                      </div>
                      <div className={`text-xs ${colors.itemSubtext} truncate`}>
                        <span className="font-medium">B:</span> {file.pathB}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Message si liste vide */}
          {files.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <svg className={`w-6 h-6 ${colors.subtitleText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className={`text-sm ${colors.subtitleText}`}>No files found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};