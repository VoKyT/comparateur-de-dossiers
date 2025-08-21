/**
 * @fileoverview Types TypeScript pour la feature comparaison de dossiers
 * @description Types métier isolés selon architecture modulaire CLAUDE.md
 * @types ComparisonResult, FolderInfo, DifferenceType, etc.
 * @usage import { ComparisonResult, FolderInfo } from '@/features/folder-comparison'
 * @related components/, hooks/ de la feature
 * @notes Types spécifiques à la feature, isolation stricte
 */

// Types de base pour les fichiers et dossiers
export interface FileInfo {
  name: string;
  path: string;
  size: number;
  lastModified: Date;
  type: 'file' | 'directory';
  extension?: string;
}

export interface FolderInfo {
  path: string;
  name: string;
  files: FileInfo[];
  totalSize: number;
  fileCount: number;
  lastScanned: Date;
}

// Types pour les différences
export type DifferenceType = 
  | 'missing-left'    // Fichier présent à droite seulement
  | 'missing-right'   // Fichier présent à gauche seulement
  | 'size-different'  // Tailles différentes
  | 'date-different'  // Dates de modification différentes
  | 'identical';      // Fichiers identiques

export interface FileDifference {
  fileName: string;
  leftFile?: FileInfo;
  rightFile?: FileInfo;
  differenceType: DifferenceType;
  sizeDifference?: number;
  dateDifference?: number; // en millisecondes
}

// Résultat de comparaison
export interface ComparisonResult {
  id: string;
  leftFolder: FolderInfo;
  rightFolder: FolderInfo;
  differences: FileDifference[];
  statistics: ComparisonStatistics;
  createdAt: Date;
  duration: number; // en millisecondes
}

export interface ComparisonStatistics {
  totalFiles: number;
  identicalFiles: number;
  missingLeft: number;
  missingRight: number;
  sizeDifferent: number;
  dateDifferent: number;
  similarityPercentage: number;
}

// Types pour les options de comparaison
export interface ComparisonOptions {
  compareSize: boolean;
  compareDate: boolean;
  ignoreDateThreshold?: number; // seuil en secondes
  includeSubfolders: boolean;
  fileFilters?: string[]; // extensions à inclure
  excludeFilters?: string[]; // patterns à exclure
}

// Types pour l'état de l'interface
export type ComparisonStatus = 
  | 'idle'
  | 'selecting-folders' 
  | 'scanning'
  | 'comparing'
  | 'completed'
  | 'error';

export interface ComparisonState {
  status: ComparisonStatus;
  progress: number; // 0-100
  currentOperation?: string;
  error?: string;
  leftFolderPath?: string;
  rightFolderPath?: string;
  result?: ComparisonResult;
  options: ComparisonOptions;
}

// Types pour l'export
export type ExportFormat = 'json' | 'csv' | 'html' | 'pdf';

export interface ExportOptions {
  format: ExportFormat;
  includeIdentical: boolean;
  includeStatistics: boolean;
  fileName?: string;
}