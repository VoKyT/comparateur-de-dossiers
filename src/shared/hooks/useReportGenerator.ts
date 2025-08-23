/**
 * @fileoverview Hook pour la génération et téléchargement de rapports de comparaison
 * @description Logique métier pour créer des rapports dans différents formats
 * @exports useReportGenerator - Hook principal avec generateReport et downloadReport
 * @formats TXT, CSV, JSON supportés
 */

import { useCallback } from 'react';
import { ComparisonData, ComparisonResult, FileItem } from '@/shared/types';
import { TranslationValues } from '@/shared/i18n/types';

type ExportFormat = 'txt' | 'csv' | 'json';

export const useReportGenerator = (translations: TranslationValues) => {
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
        return generateTextReport(data, folderAName, folderBName, timestamp, translations);
      
      case 'csv':
        return generateCsvReport(data, folderAName, folderBName, translations);
      
      case 'json':
        return generateJsonReport(data, folderAName, folderBName, timestamp, translations);
      
      default:
        throw new Error(`Format non supporté: ${format}`);
    }
  }, [translations]);

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
  timestamp: string,
  t: TranslationValues
): string {
  const lines: string[] = [];
  
  // En-tête
  lines.push('='.repeat(60));
  lines.push(t.reports.titles.folderComparisonReport);
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`${t.reports.content.generated}: ${timestamp}`);
  lines.push(`${t.reports.content.folderA}: ${folderAName}`);
  lines.push(`${t.reports.content.folderB}: ${folderBName}`);
  lines.push('');
  
  // Résumé statistiques
  lines.push(t.reports.content.summary);
  lines.push('-'.repeat(20));
  lines.push(`• ${t.reports.content.commonFiles}: ${data.common.length}`);
  lines.push(`• ${t.reports.content.filesOnlyIn} ${folderAName}: ${data.uniqueA.length}`);
  lines.push(`• ${t.reports.content.filesOnlyIn} ${folderBName}: ${data.uniqueB.length}`);
  lines.push('');

  // Recommandations de suppression
  lines.push(t.reports.titles.deletionRecommendations);
  lines.push('-'.repeat(30));
  if (data.common.length > 0) {
    const fileWord = data.common.length > 1 ? t.reports.content.files : t.reports.content.file;
    lines.push(`✅ ${t.reports.content.safelyDelete} ${data.common.length} ${fileWord}:`);
    lines.push('');
    data.common.forEach((file: ComparisonResult) => {
      lines.push(`   📄 ${file.name} (${formatSize(file.size)})`);
      lines.push(`      → ${folderAName}: ${file.pathA}`);
      lines.push(`      → ${folderBName}: ${file.pathB}`);
      lines.push('');
    });
  } else {
    lines.push(`❌ ${t.reports.content.noCommonFilesFound}.`);
  }

  // Fichiers uniques
  if (data.uniqueA.length > 0) {
    lines.push('');
    lines.push(`${t.reports.titles.filesUniqueTo} ${folderAName.toUpperCase()}`);
    lines.push('-'.repeat(30));
    data.uniqueA.forEach((file: FileItem) => {
      if (file.type === 'file') {
        lines.push(`   📄 ${file.name} (${formatSize(file.size || 0)}) - ${file.path}`);
      }
    });
  }

  if (data.uniqueB.length > 0) {
    lines.push('');
    lines.push(`${t.reports.titles.filesUniqueTo} ${folderBName.toUpperCase()}`);
    lines.push('-'.repeat(30));
    data.uniqueB.forEach((file: FileItem) => {
      if (file.type === 'file') {
        lines.push(`   📄 ${file.name} (${formatSize(file.size || 0)}) - ${file.path}`);
      }
    });
  }

  lines.push('');
  lines.push('='.repeat(60));
  lines.push(t.reports.titles.endOfReport);
  lines.push('='.repeat(60));

  return lines.join('\n');
}

/**
 * Génère un rapport au format CSV
 */
function generateCsvReport(
  data: ComparisonData, 
  folderAName: string, 
  folderBName: string,
  t: TranslationValues
): string {
  const lines: string[] = [];
  
  // En-tête CSV avec traductions
  const header = [
    t.reports.content.csvHeaders.type,
    t.reports.content.csvHeaders.fileName,
    t.reports.content.csvHeaders.size,
    t.reports.content.csvHeaders.pathA,
    t.reports.content.csvHeaders.pathB,
    t.reports.content.csvHeaders.canDelete,
    t.reports.content.csvHeaders.folder
  ].join(',');
  lines.push(header);
  
  // Fichiers communs (peuvent être supprimés)
  data.common.forEach((file: ComparisonResult) => {
    lines.push(`${t.reports.content.csvValues.common},"${file.name}",${file.size},"${file.pathA}","${file.pathB}",${t.reports.content.csvValues.yes},${t.reports.content.csvValues.both}`);
  });
  
  // Fichiers uniques A
  data.uniqueA.forEach((file: FileItem) => {
    if (file.type === 'file') {
      lines.push(`${t.reports.content.csvValues.unique},"${file.name}",${file.size || 0},"${file.path}","",${t.reports.content.csvValues.no},${folderAName}`);
    }
  });
  
  // Fichiers uniques B
  data.uniqueB.forEach((file: FileItem) => {
    if (file.type === 'file') {
      lines.push(`${t.reports.content.csvValues.unique},"${file.name}",${file.size || 0},"","${file.path}",${t.reports.content.csvValues.no},${folderBName}`);
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
  timestamp: string,
  t: TranslationValues
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
        recommendation: t.reports.content.existsInBoth
      })),
      uniqueToFolderA: data.uniqueA
        .filter((file: FileItem) => file.type === 'file')
        .map((file: FileItem) => ({
          name: file.name,
          size: file.size || 0,
          path: file.path,
          canDelete: false,
          recommendation: `${t.reports.content.onlyExistsIn} ${folderAName} ${t.reports.content.shouldNotBeDeleted}`
        })),
      uniqueToFolderB: data.uniqueB
        .filter((file: FileItem) => file.type === 'file')
        .map((file: FileItem) => ({
          name: file.name,
          size: file.size || 0,
          path: file.path,
          canDelete: false,
          recommendation: `${t.reports.content.onlyExistsIn} ${folderBName} ${t.reports.content.shouldNotBeDeleted}`
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