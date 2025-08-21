/**
 * @fileoverview Hook pour la comparaison de dossiers
 * @description Logique métier pour comparer deux ensembles de fichiers
 * @exports useComparison
 */

import { useCallback } from 'react';
import { FileItem, ComparisonResult, ComparisonData, ComparisonStats } from '../types';

interface UseComparisonReturn {
  compareFiles: (filesA: FileItem[], filesB: FileItem[]) => ComparisonData;
  calculateStats: (data: ComparisonData) => ComparisonStats;
}

export const useComparison = (): UseComparisonReturn => {
  const compareFiles = useCallback((filesA: FileItem[], filesB: FileItem[]): ComparisonData => {
    const common: ComparisonResult[] = [];
    const uniqueA: FileItem[] = [];
    const uniqueB: FileItem[] = [];
    
    // Créer map pour recherche rapide
    const mapB = new Map<string, FileItem[]>();
    filesB.forEach(fileB => {
      if (fileB.type === 'file' && fileB.size !== undefined) {
        const key = `${fileB.name}_${fileB.size}`;
        if (!mapB.has(key)) {
          mapB.set(key, []);
        }
        mapB.get(key)!.push(fileB);
      }
    });
    
    // Analyser fichiers A
    filesA.forEach(fileA => {
      if (fileA.type === 'file' && fileA.size !== undefined) {
        const key = `${fileA.name}_${fileA.size}`;
        const matches = mapB.get(key);
        
        if (matches?.length) {
          // Fichier commun
          matches.forEach(match => {
            common.push({
              name: fileA.name,
              size: fileA.size!,
              pathA: fileA.path,
              pathB: match.path
            });
          });
          mapB.delete(key);
        } else {
          // Fichier unique à A
          uniqueA.push(fileA);
        }
      }
    });
    
    // Fichiers restants dans B sont uniques à B
    mapB.forEach(files => {
      uniqueB.push(...files);
    });
    
    return { uniqueA, uniqueB, common };
  }, []);

  const calculateStats = useCallback((data: ComparisonData): ComparisonStats => ({
    totalFilesA: data.uniqueA.length + data.common.length,
    totalFilesB: data.uniqueB.length + data.common.length,
    commonFiles: data.common.length,
    uniqueFilesA: data.uniqueA.length,
    uniqueFilesB: data.uniqueB.length
  }), []);

  return {
    compareFiles,
    calculateStats
  };
};