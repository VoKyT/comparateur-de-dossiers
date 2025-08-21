/**
 * @fileoverview Types pour la comparaison de dossiers
 * @description Interfaces TypeScript pour les résultats de comparaison
 * @exports ComparisonResult, ComparisonData, ComparisonStats
 */

import { FileItem } from './file-system';

export interface ComparisonResult {
  name: string;
  size: number;
  pathA: string;
  pathB: string;
}

export interface ComparisonData {
  uniqueA: FileItem[];
  uniqueB: FileItem[];
  common: ComparisonResult[];
}

export interface ComparisonStats {
  totalFilesA: number;
  totalFilesB: number;
  commonFiles: number;
  uniqueFilesA: number;
  uniqueFilesB: number;
}