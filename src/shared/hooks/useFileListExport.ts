/**
 * @fileoverview Hook pour l'export de listes de fichiers individuelles
 * @description Logique métier pour exporter la liste des fichiers d'un dossier spécifique
 * @exports useFileListExport - Hook avec generateFileList et downloadFileList
 * @formats TXT, CSV, JSON supportés
 */

import { useCallback } from 'react';
import { FileItem, DirectoryData } from '@/shared/types';

type ExportFormat = 'txt' | 'csv' | 'json';

export const useFileListExport = () => {
  /**
   * Génère une liste de fichiers dans le format spécifié
   */
  const generateFileList = useCallback((
    folderData: DirectoryData,
    format: ExportFormat
  ): string => {
    const timestamp = new Date().toLocaleString();

    switch (format) {
      case 'txt':
        return generateTextFileList(folderData, timestamp);
      
      case 'csv':
        return generateCsvFileList(folderData);
      
      case 'json':
        return generateJsonFileList(folderData, timestamp);
      
      default:
        throw new Error(`Format non supporté: ${format}`);
    }
  }, []);

  /**
   * Télécharge la liste de fichiers générée
   */
  const downloadFileList = useCallback((content: string, fileName: string, format: ExportFormat) => {
    const mimeTypes = {
      txt: 'text/plain',
      csv: 'text/csv',
      json: 'application/json'
    };

    const blob = new Blob([content], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    URL.revokeObjectURL(url);
  }, []);

  return {
    generateFileList,
    downloadFileList
  };
};

/**
 * Génère une liste de fichiers au format texte
 */
function generateTextFileList(folderData: DirectoryData, timestamp: string): string {
  const lines: string[] = [];
  const allFiles = extractFilesFromTree(folderData.files);
  
  // En-tête
  lines.push('='.repeat(50));
  lines.push('FILE LIST EXPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Generated: ${timestamp}`);
  lines.push(`Folder: ${folderData.name}`);
  lines.push(`Total Files: ${allFiles.length}`);
  lines.push('');
  
  // Résumé par extension
  const extensionStats = getExtensionStats(allFiles);
  if (extensionStats.size > 0) {
    lines.push('FILE TYPES SUMMARY');
    lines.push('-'.repeat(20));
    extensionStats.forEach((count, ext) => {
      lines.push(`   ${ext || 'No extension'}: ${count} files`);
    });
    lines.push('');
  }

  // Liste détaillée des fichiers
  lines.push('COMPLETE FILE LIST');
  lines.push('-'.repeat(20));
  allFiles.forEach((file: FileItem, index) => {
    lines.push(`${(index + 1).toString().padStart(4, ' ')}. ${file.name} (${formatSize(file.size || 0)})`);
    lines.push(`      Path: ${file.path}`);
    lines.push('');
  });

  lines.push('='.repeat(50));
  lines.push('END OF FILE LIST');
  lines.push('='.repeat(50));

  return lines.join('\n');
}

/**
 * Génère une liste de fichiers au format CSV
 */
function generateCsvFileList(folderData: DirectoryData): string {
  const lines: string[] = [];
  const allFiles = extractFilesFromTree(folderData.files);
  
  // En-tête CSV
  lines.push('Index,FileName,Size,Extension,Path,Type');
  
  // Données des fichiers
  allFiles.forEach((file: FileItem, index) => {
    const extension = file.name.includes('.') ? file.name.split('.').pop() || '' : '';
    lines.push(`${index + 1},"${file.name}",${file.size || 0},"${extension}","${file.path}","${file.type}"`);
  });

  return lines.join('\n');
}

/**
 * Génère une liste de fichiers au format JSON
 */
function generateJsonFileList(folderData: DirectoryData, timestamp: string): string {
  const allFiles = extractFilesFromTree(folderData.files);
  const extensionStats = getExtensionStats(allFiles);
  
  const report = {
    metadata: {
      generatedAt: timestamp,
      folderName: folderData.name,
      totalFiles: allFiles.length,
      fileTypes: Object.fromEntries(extensionStats)
    },
    files: allFiles.map((file: FileItem, index) => {
      const extension = file.name.includes('.') ? file.name.split('.').pop() || '' : '';
      return {
        index: index + 1,
        name: file.name,
        size: file.size || 0,
        extension,
        path: file.path,
        type: file.type
      };
    })
  };

  return JSON.stringify(report, null, 2);
}

/**
 * Extrait tous les fichiers d'une arborescence
 */
function extractFilesFromTree(items: FileItem[]): FileItem[] {
  const files: FileItem[] = [];
  
  function traverse(items: FileItem[]) {
    items.forEach(item => {
      if (item.type === 'file') {
        files.push(item);
      } else if (item.children) {
        traverse(item.children);
      }
    });
  }
  
  traverse(items);
  return files;
}

/**
 * Calcule les statistiques par extension
 */
function getExtensionStats(files: FileItem[]): Map<string, number> {
  const stats = new Map<string, number>();
  
  files.forEach(file => {
    const extension = file.name.includes('.') ? file.name.split('.').pop() || '' : '';
    stats.set(extension, (stats.get(extension) || 0) + 1);
  });
  
  return stats;
}

/**
 * Formate la taille des fichiers de façon lisible
 */
function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}