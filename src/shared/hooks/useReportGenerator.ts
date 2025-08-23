/**
 * @fileoverview Hook pour la génération et téléchargement de rapports de comparaison
 * @description Logique métier pour créer des rapports dans différents formats
 * @exports useReportGenerator - Hook principal avec generateReport et downloadReport
 * @formats TXT, CSV, JSON supportés
 */

import { useCallback } from 'react';
import { ComparisonData, ComparisonResult, FileItem } from '@/shared/types';

type ExportFormat = 'txt' | 'csv' | 'json';

export const useReportGenerator = () => {
  /**
   * Génère un rapport de comparaison dans le format spécifié
   */
  const generateReport = useCallback((
    data: ComparisonData,
    folderAName: string,
    folderBName: string,
    format: ExportFormat
  ): string => {
    const timestamp = new Date().toLocaleString();
    const totalCommon = data.common.length;
    const totalUniqueA = data.uniqueA.length;
    const totalUniqueB = data.uniqueB.length;

    switch (format) {
      case 'txt':
        return generateTextReport(data, folderAName, folderBName, timestamp);
      
      case 'csv':
        return generateCsvReport(data, folderAName, folderBName);
      
      case 'json':
        return generateJsonReport(data, folderAName, folderBName, timestamp);
      
      default:
        throw new Error(`Format non supporté: ${format}`);
    }
  }, []);

  /**
   * Télécharge le rapport généré
   */
  const downloadReport = useCallback((content: string, fileName: string, format: ExportFormat) => {
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
    generateReport,
    downloadReport
  };
};

/**
 * Génère un rapport au format texte lisible
 */
function generateTextReport(
  data: ComparisonData, 
  folderAName: string, 
  folderBName: string, 
  timestamp: string
): string {
  const lines: string[] = [];
  
  // En-tête
  lines.push('='.repeat(60));
  lines.push('FOLDER COMPARISON REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Generated: ${timestamp}`);
  lines.push(`Folder A: ${folderAName}`);
  lines.push(`Folder B: ${folderBName}`);
  lines.push('');
  
  // Résumé statistiques
  lines.push('SUMMARY');
  lines.push('-'.repeat(20));
  lines.push(`• Common files: ${data.common.length}`);
  lines.push(`• Files only in ${folderAName}: ${data.uniqueA.length}`);
  lines.push(`• Files only in ${folderBName}: ${data.uniqueB.length}`);
  lines.push('');

  // Recommandations de suppression
  lines.push('DELETION RECOMMENDATIONS');
  lines.push('-'.repeat(30));
  if (data.common.length > 0) {
    lines.push(`✅ You can safely DELETE the following ${data.common.length} file(s) from one of the folders:`);
    lines.push('');
    data.common.forEach((file: ComparisonResult) => {
      lines.push(`   📄 ${file.name} (${formatSize(file.size)})`);
      lines.push(`      → ${folderAName}: ${file.pathA}`);
      lines.push(`      → ${folderBName}: ${file.pathB}`);
      lines.push('');
    });
  } else {
    lines.push('❌ No common files found - nothing can be safely deleted.');
  }

  // Fichiers uniques
  if (data.uniqueA.length > 0) {
    lines.push('');
    lines.push(`FILES UNIQUE TO ${folderAName.toUpperCase()}`);
    lines.push('-'.repeat(30));
    data.uniqueA.forEach((file: FileItem) => {
      if (file.type === 'file') {
        lines.push(`   📄 ${file.name} (${formatSize(file.size || 0)}) - ${file.path}`);
      }
    });
  }

  if (data.uniqueB.length > 0) {
    lines.push('');
    lines.push(`FILES UNIQUE TO ${folderBName.toUpperCase()}`);
    lines.push('-'.repeat(30));
    data.uniqueB.forEach((file: FileItem) => {
      if (file.type === 'file') {
        lines.push(`   📄 ${file.name} (${formatSize(file.size || 0)}) - ${file.path}`);
      }
    });
  }

  lines.push('');
  lines.push('='.repeat(60));
  lines.push('END OF REPORT');
  lines.push('='.repeat(60));

  return lines.join('\n');
}

/**
 * Génère un rapport au format CSV
 */
function generateCsvReport(
  data: ComparisonData, 
  folderAName: string, 
  folderBName: string
): string {
  const lines: string[] = [];
  
  // En-tête CSV
  lines.push('Type,FileName,Size,PathA,PathB,CanDelete,Folder');
  
  // Fichiers communs (peuvent être supprimés)
  data.common.forEach((file: ComparisonResult) => {
    lines.push(`Common,"${file.name}",${file.size},"${file.pathA}","${file.pathB}",YES,Both`);
  });
  
  // Fichiers uniques A
  data.uniqueA.forEach((file: FileItem) => {
    if (file.type === 'file') {
      lines.push(`Unique,"${file.name}",${file.size || 0},"${file.path}","",NO,${folderAName}`);
    }
  });
  
  // Fichiers uniques B
  data.uniqueB.forEach((file: FileItem) => {
    if (file.type === 'file') {
      lines.push(`Unique,"${file.name}",${file.size || 0},"","${file.path}",NO,${folderBName}`);
    }
  });

  return lines.join('\n');
}

/**
 * Génère un rapport au format JSON
 */
function generateJsonReport(
  data: ComparisonData, 
  folderAName: string, 
  folderBName: string, 
  timestamp: string
): string {
  const report = {
    metadata: {
      generatedAt: timestamp,
      folderA: folderAName,
      folderB: folderBName,
      summary: {
        commonFiles: data.common.length,
        uniqueFilesA: data.uniqueA.length,
        uniqueFilesB: data.uniqueB.length
      }
    },
    comparison: {
      commonFiles: data.common.map((file: ComparisonResult) => ({
        name: file.name,
        size: file.size,
        paths: {
          folderA: file.pathA,
          folderB: file.pathB
        },
        canDelete: true,
        recommendation: 'This file exists in both folders and can be safely deleted from one location'
      })),
      uniqueToFolderA: data.uniqueA
        .filter((file: FileItem) => file.type === 'file')
        .map((file: FileItem) => ({
          name: file.name,
          size: file.size || 0,
          path: file.path,
          canDelete: false,
          recommendation: `This file only exists in ${folderAName} and should NOT be deleted`
        })),
      uniqueToFolderB: data.uniqueB
        .filter((file: FileItem) => file.type === 'file')
        .map((file: FileItem) => ({
          name: file.name,
          size: file.size || 0,
          path: file.path,
          canDelete: false,
          recommendation: `This file only exists in ${folderBName} and should NOT be deleted`
        }))
    }
  };

  return JSON.stringify(report, null, 2);
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