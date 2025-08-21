/**
 * @fileoverview Hooks React pour la feature comparaison de dossiers
 * @description Hooks métier isolés selon architecture modulaire CLAUDE.md
 * @dependencies React hooks, feature types, shared utilities
 * @exports useFolderComparison, useFolderSelector, useComparisonHistory
 * @usage import { useFolderComparison } from '@/features/folder-comparison'
 * @related types/, components/ de la feature
 * @notes Hooks spécifiques à la feature, isolation stricte
 */

import { useState, useCallback, useRef } from 'react';
import { useLocalStorage, useLoading } from '@/shared/hooks';
import { generateLogId } from '@/shared/utils';
import type {
  ComparisonState,
  ComparisonResult,
  ComparisonOptions,
  FolderInfo,
  ComparisonStatus
} from '../types';

/**
 * Hook principal pour gérer la comparaison de dossiers
 */
export function useFolderComparison() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [comparisonHistory, setComparisonHistory] = useLocalStorage<ComparisonResult[]>('comparison-history', []);
  
  const [state, setState] = useState<ComparisonState>({
    status: 'idle',
    progress: 0,
    options: {
      compareSize: true,
      compareDate: true,
      ignoreDateThreshold: 60, // 1 minute
      includeSubfolders: true,
      fileFilters: [],
      excludeFilters: ['node_modules', '.git', '.DS_Store']
    }
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Sélection des dossiers (simulation pour l'instant)
  const selectLeftFolder = useCallback(async (): Promise<string | null> => {
    console.log('🆕 [FOLDER_SELECTOR] [FS_LEFT_01] Sélection dossier gauche');
    
    // Simulation d'une sélection de dossier
    // En production, ici on utiliserait l'API File System ou un dialog
    const folderPath = '/chemin/vers/dossier/gauche';
    
    setState(prev => ({
      ...prev,
      leftFolderPath: folderPath,
      status: 'selecting-folders'
    }));
    
    console.log('✅ [FOLDER_SELECTOR] [FS_LEFT_02] Dossier gauche sélectionné:', folderPath);
    return folderPath;
  }, []);

  const selectRightFolder = useCallback(async (): Promise<string | null> => {
    console.log('🆕 [FOLDER_SELECTOR] [FS_RIGHT_01] Sélection dossier droite');
    
    const folderPath = '/chemin/vers/dossier/droite';
    
    setState(prev => ({
      ...prev,
      rightFolderPath: folderPath,
      status: 'selecting-folders'
    }));
    
    console.log('✅ [FOLDER_SELECTOR] [FS_RIGHT_02] Dossier droite sélectionné:', folderPath);
    return folderPath;
  }, []);

  // Simulation du scan d'un dossier
  const scanFolder = useCallback(async (folderPath: string): Promise<FolderInfo> => {
    console.log('🔍 [FOLDER_SCAN] [FS_SCAN_01] Scan dossier:', folderPath);
    
    // Simulation de scan avec délai
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockFolderInfo: FolderInfo = {
      path: folderPath,
      name: folderPath.split('/').pop() || 'dossier',
      files: [
        {
          name: 'fichier1.txt',
          path: `${folderPath}/fichier1.txt`,
          size: 1024,
          lastModified: new Date(),
          type: 'file',
          extension: 'txt'
        }
      ],
      totalSize: 1024,
      fileCount: 1,
      lastScanned: new Date()
    };

    console.log('✅ [FOLDER_SCAN] [FS_SCAN_02] Scan terminé:', mockFolderInfo);
    return mockFolderInfo;
  }, []);

  // Lancement de la comparaison
  const startComparison = useCallback(async () => {
    if (!state.leftFolderPath || !state.rightFolderPath) {
      console.error('❌ [COMPARISON] [COMP_ERROR_01] Dossiers manquants');
      return;
    }

    console.log('🚀 [COMPARISON] [COMP_START_01] Début comparaison');
    startLoading();
    
    try {
      abortControllerRef.current = new AbortController();
      
      setState(prev => ({ 
        ...prev, 
        status: 'scanning',
        progress: 0,
        currentOperation: 'Scan du dossier gauche...'
      }));

      // Scan des dossiers
      const leftFolder = await scanFolder(state.leftFolderPath);
      setState(prev => ({ ...prev, progress: 25 }));

      setState(prev => ({ 
        ...prev, 
        currentOperation: 'Scan du dossier droite...'
      }));
      const rightFolder = await scanFolder(state.rightFolderPath);
      setState(prev => ({ ...prev, progress: 50 }));

      // Simulation de comparaison
      setState(prev => ({ 
        ...prev, 
        status: 'comparing',
        currentOperation: 'Comparaison des fichiers...'
      }));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setState(prev => ({ ...prev, progress: 100 }));

      // Résultat simulé
      const result: ComparisonResult = {
        id: generateLogId('COMP', 'RESULT'),
        leftFolder,
        rightFolder,
        differences: [],
        statistics: {
          totalFiles: leftFolder.fileCount + rightFolder.fileCount,
          identicalFiles: 1,
          missingLeft: 0,
          missingRight: 0,
          sizeDifferent: 0,
          dateDifferent: 0,
          similarityPercentage: 100
        },
        createdAt: new Date(),
        duration: 2500
      };

      setState(prev => ({
        ...prev,
        status: 'completed',
        result,
        currentOperation: undefined
      }));

      // Sauvegarde dans l'historique
      setComparisonHistory(prev => [result, ...prev.slice(0, 9)]); // Garde 10 derniers

      console.log('✅ [COMPARISON] [COMP_SUCCESS_02] Comparaison terminée:', result);
      
    } catch (error) {
      console.error('❌ [COMPARISON] [COMP_ERROR_02] Erreur comparaison:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }));
    } finally {
      stopLoading();
      abortControllerRef.current = null;
    }
  }, [state.leftFolderPath, state.rightFolderPath, startLoading, stopLoading, scanFolder, setComparisonHistory]);

  // Reset de la comparaison
  const resetComparison = useCallback(() => {
    console.log('🔄 [COMPARISON] [COMP_RESET_01] Reset comparaison');
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setState({
      status: 'idle',
      progress: 0,
      options: state.options // Garde les options
    });
    
    stopLoading();
  }, [state.options, stopLoading]);

  return {
    // État
    state,
    isLoading,
    comparisonHistory,
    
    // Actions
    selectLeftFolder,
    selectRightFolder,
    startComparison,
    resetComparison,
    
    // Utilitaires
    canStartComparison: Boolean(state.leftFolderPath && state.rightFolderPath),
    isComparing: state.status === 'scanning' || state.status === 'comparing'
  };
}