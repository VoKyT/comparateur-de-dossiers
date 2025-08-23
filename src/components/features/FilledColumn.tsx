/**
 * @fileoverview Composant colonne avec fichiers et boutons d'export
 * @description Affichage des fichiers d'un dossier avec actions d'export et rechargement
 * @props title - Titre de la colonne
 * @props files - Liste des fichiers à afficher
 * @props folderData - Données complètes du dossier pour export
 * @props colorScheme - Thème couleur de la colonne
 * @props onReselect - Callback pour resélectionner un dossier
 * @props showPaths - Afficher les chemins complets (pour fichiers communs)
 */

import React, { useState } from 'react';
import { FileItem, DirectoryData, ComparisonResult } from '@/shared/types';
import { Button } from '@/components/ui/button';
import { Download, FolderOpen, FileText, FileSpreadsheet, FileCode, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFileListExport } from '@/shared/hooks';
import { useTranslation } from '@/shared/i18n';
import { FileTreeItem } from './FileTreeItem';
import { FileTreeItemWithComparison } from './FileTreeItemWithComparison';

interface FilledColumnProps {
  title: string;
  files: FileItem[] | ComparisonResult[];
  folderData?: DirectoryData;
  colorScheme?: 'blue' | 'green' | 'purple' | 'slate';
  onReselect: () => void;
  showPaths?: boolean;
}

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


  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700',
      icon: 'text-blue-500'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      button: 'bg-green-600 hover:bg-green-700',
      icon: 'text-green-500'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      button: 'bg-purple-600 hover:bg-purple-700',
      icon: 'text-purple-500'
    },
    slate: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-700',
      button: 'bg-slate-600 hover:bg-slate-700',
      icon: 'text-slate-500'
    }
  };

  const colors = colorClasses[colorScheme];

  const handleExport = async (format: 'txt' | 'csv' | 'json') => {
    if (!folderData) return;
    
    try {
      const report = generateFileList(folderData, format);
      const fileName = `file-list-${folderData.name}-${new Date().toISOString().split('T')[0]}.${format}`;
      
      downloadFileList(report, fileName, format);
      setShowExportMenu(false);
      
      console.log(`✅ [FILLED_COLUMN] Liste exportée: ${fileName}`);
    } catch (error) {
      console.error(`❌ [FILLED_COLUMN] Erreur export:`, error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header avec titre et boutons d'action */}
      <div className={`px-4 py-3 border-b border-slate-200 ${colors.bg}`}>
        <div className="flex items-center justify-between">
          <h4 className={`font-semibold text-sm ${colors.text} flex items-center gap-2`}>
            <FolderOpen size={16} className={colors.icon} />
            {title}
            <span className="ml-1 text-xs bg-white px-2 py-0.5 rounded-full border">
              {files.length}
            </span>
          </h4>
          
          {/* Boutons d'action */}
          <div className="flex items-center gap-2">
            {/* Bouton resélection */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onReselect}
                size="sm"
                className={`${colors.button} text-white px-3 py-1`}
              >
                <RotateCcw size={14} />
              </Button>
            </motion.div>

            {/* Bouton export (seulement si on a folderData) */}
            {folderData && (
              <div className="relative">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    size="sm"
                    className={`${colors.button} text-white px-3 py-1`}
                  >
                    <Download size={14} />
                  </Button>
                </motion.div>

                {/* Menu export */}
                <AnimatePresence>
                  {showExportMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-[180px]"
                    >
                      <div className="p-1">
                        <Button
                          onClick={() => handleExport('txt')}
                          variant="ghost"
                          className="w-full justify-start text-left hover:bg-slate-50 p-2 rounded text-sm"
                        >
                          <FileText size={14} className="text-slate-600 mr-2" />
                          Text List
                        </Button>
                        <Button
                          onClick={() => handleExport('csv')}
                          variant="ghost"
                          className="w-full justify-start text-left hover:bg-slate-50 p-2 rounded text-sm"
                        >
                          <FileSpreadsheet size={14} className="text-green-600 mr-2" />
                          {t('reports.formats.csv')} {t('ui.buttons.export')}
                        </Button>
                        <Button
                          onClick={() => handleExport('json')}
                          variant="ghost"
                          className="w-full justify-start text-left hover:bg-slate-50 p-2 rounded text-sm"
                        >
                          <FileCode size={14} className="text-blue-600 mr-2" />
                          JSON Data
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Arborescence des fichiers */}
      <div className="flex-1 overflow-auto">
        {folderData && folderData.files.length > 0 ? (
          <div className="py-2">
            {/* FORCER l'affichage de l'arborescence complète TOUJOURS */}
            {folderData.files.map((item, index) => (
              <FileTreeItem
                key={`${item.path}-${index}`}
                item={item}
                depth={0}
              />
            ))}
          </div>
        ) : files.length > 0 ? (
          /* Affichage liste simple SEULEMENT pour fichiers communs (sans folderData) */
          <div className="p-2 space-y-1">
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="bg-white border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 flex items-center">
                    {/* Emoji pour fichier commun */}
                    <span className="text-sm mr-2" role="img">
                      {getFileEmoji(file.name, 'file')}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-slate-800 truncate">
                        {file.name}
                      </p>
                      {showPaths && 'pathA' in file && (
                        <div className="mt-1 space-y-1 text-xs text-slate-600">
                          <p className="truncate">📁 A: {file.pathA}</p>
                          <p className="truncate">📁 B: {file.pathB}</p>
                        </div>
                      )}
                      {!showPaths && 'path' in file && (
                        <p className="text-xs text-slate-600 mt-1 truncate">
                          📁 {file.path}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="ml-2 text-xs text-slate-500">
                    {formatSize('size' in file ? file.size || 0 : 0)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📂</span>
              </div>
              <p className="text-sm text-slate-600">{t('comparison.placeholders.noFiles')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Fonction pour obtenir l'emoji selon l'extension
 */
function getFileEmoji(fileName: string, type: 'file' | 'directory'): string {
  if (type === 'directory') return '📁';
  
  const extension = fileName.toLowerCase().split('.').pop() || '';
  
  const emojiMap: { [key: string]: string } = {
    // Images
    'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️', 'svg': '🖼️', 'webp': '🖼️', 'bmp': '🖼️',
    
    // Documents
    'pdf': '📄', 'doc': '📝', 'docx': '📝', 'txt': '📄', 'rtf': '📝',
    
    // Tableurs
    'xlsx': '📊', 'xls': '📊', 'csv': '📊', 'ods': '📊',
    
    // Présentations
    'pptx': '📺', 'ppt': '📺', 'odp': '📺',
    
    // Code
    'js': '⚡', 'jsx': '⚛️', 'ts': '🔷', 'tsx': '⚛️', 'py': '🐍', 'java': '☕', 
    'cpp': '⚙️', 'c': '⚙️', 'cs': '#️⃣', 'php': '🐘', 'rb': '💎', 'go': '🔵',
    'html': '🌐', 'css': '🎨', 'scss': '🎨', 'sass': '🎨', 'json': '📋', 'xml': '📄',
    
    // Exécutables
    'exe': '⚡', 'msi': '📦', 'deb': '📦', 'rpm': '📦', 'dmg': '📦',
    
    // Archives
    'zip': '🗜️', 'rar': '🗜️', '7z': '🗜️', 'tar': '🗜️', 'gz': '🗜️',
    
    // Audio
    'mp3': '🎵', 'wav': '🎵', 'flac': '🎵', 'aac': '🎵', 'm4a': '🎵',
    
    // Vidéo
    'mp4': '🎬', 'avi': '🎬', 'mkv': '🎬', 'mov': '🎬', 'wmv': '🎬', 'flv': '🎬',
    
    // Autres
    'iso': '💿', 'torrent': '🌀', 'log': '📜', 'db': '🗃️', 'sql': '🗃️'
  };
  
  return emojiMap[extension] || '📄';
}

/**
 * Formate la taille des fichiers
 */
function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}