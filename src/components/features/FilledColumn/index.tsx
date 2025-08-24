/**
 * @fileoverview Composant FilledColumn modulaire restructuré
 * @description Colonne avec fichiers et boutons d'export - Architecture modulaire
 * @props title - Titre de la colonne
 * @props files - Liste des fichiers à afficher
 * @props folderData - Données complètes du dossier pour export
 * @props colorScheme - Thème couleur de la colonne
 * @props onReselect - Callback pour resélectionner un dossier
 * @props showPaths - Afficher les chemins complets (pour fichiers communs)
 */

import React, { useState } from 'react';
import { FileItem, DirectoryData, ComparisonResult } from '@/shared/types';
import { useFileListExport } from '@/shared/hooks';
import { useTranslation } from '@/shared/i18n';
import { FileTreeItem } from '../FileTreeItem';
import { FileTreeItemWithComparison } from '../FileTreeItemWithComparison';
import { FilledColumnHeader } from './FilledColumnHeader';
import { ExportMenu } from './ExportMenu';

interface FilledColumnProps {
  title: string;
  files: FileItem[] | ComparisonResult[];
  folderData?: DirectoryData;
  colorScheme?: 'blue' | 'green' | 'purple' | 'slate';
  onReselect: () => void;
  showPaths?: boolean;
}

type ExportFormat = 'txt' | 'csv' | 'json';

export const FilledColumn: React.FC<FilledColumnProps> = ({
  title,
  files,
  folderData,
  colorScheme = 'slate',
  onReselect,
  showPaths = false
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const { generateFileList, downloadFileList } = useFileListExport();
  const { t } = useTranslation();

  const handleExport = (format: ExportFormat) => {
    try {
      console.log(`📊 [FILLED_COLUMN] Export ${format} pour ${files.length} fichiers`);
      
      const fileList = generateFileList(files, format);
      const fileName = `file-list-${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.${format}`;
      
      downloadFileList(fileList, fileName, format);
      setShowExportMenu(false);
      
      console.log(`✅ [FILLED_COLUMN] Export ${format} terminé: ${fileName}`);
    } catch (error) {
      console.error(`❌ [FILLED_COLUMN] Erreur export ${format}:`, error);
    }
  };

  const handleToggleExportMenu = () => {
    setShowExportMenu(prev => !prev);
  };

  // Fermer le menu si on clique ailleurs
  const handleBackdropClick = () => {
    if (showExportMenu) {
      setShowExportMenu(false);
    }
  };

  return (
    <>
      {/* Backdrop pour fermer le menu */}
      {showExportMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={handleBackdropClick}
        />
      )}

      <div className="h-full flex flex-col relative">
        {/* Header avec actions */}
        <FilledColumnHeader
          title={title}
          colorScheme={colorScheme}
          fileCount={files.length}
          onReselect={onReselect}
          onExportToggle={handleToggleExportMenu}
          showExportMenu={showExportMenu}
        />

        {/* Menu d'export */}
        <div className="relative">
          <ExportMenu
            isVisible={showExportMenu}
            onExport={handleExport}
            colorScheme={colorScheme}
          />
        </div>

        {/* Liste des fichiers */}
        <div className="flex-1 overflow-y-auto scrollbar-custom p-4 space-y-2">
          {files.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">
                {t('comparison.messages.noFiles')}
              </p>
            </div>
          ) : (
            files.map((file, index) => {
              // Si c'est un ComparisonResult avec des chemins multiples
              if ('paths' in file) {
                return (
                  <FileTreeItemWithComparison
                    key={`${file.name}-${file.size}-${index}`}
                    file={file}
                    level={0}
                  />
                );
              } else {
                // FileItem classique
                return (
                  <FileTreeItem
                    key={`${file.name}-${file.size}-${index}`}
                    file={file}
                    level={0}
                    showPath={showPaths}
                  />
                );
              }
            })
          )}
        </div>
      </div>
    </>
  );
};

export default FilledColumn;