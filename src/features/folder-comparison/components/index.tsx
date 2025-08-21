/**
 * @fileoverview Composants pour la feature comparaison de dossiers
 * @description Composants métier isolés selon architecture modulaire CLAUDE.md
 * @dependencies React, feature types/hooks, shared components
 * @exports FolderSelector, ComparisonResults, ComparisonProgress
 * @usage import { FolderSelector } from '@/features/folder-comparison'
 * @related types/, hooks/ de la feature
 * @notes Composants spécifiques à la feature, isolation stricte
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FolderOpen, FileText, Clock } from 'lucide-react';
import { useFolderComparison } from '../hooks';
import type { ComparisonResult } from '../types';

/**
 * Composant pour sélectionner les dossiers à comparer
 */
export const FolderSelector: React.FC = () => {
  const { 
    state, 
    selectLeftFolder, 
    selectRightFolder, 
    startComparison, 
    resetComparison, 
    canStartComparison,
    isComparing 
  } = useFolderComparison();

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Sélection des dossiers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dossier gauche */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Dossier source</label>
          <Button
            onClick={selectLeftFolder}
            variant="outline"
            className="w-full justify-start"
            disabled={isComparing}
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            {state.leftFolderPath || 'Sélectionner le dossier source'}
          </Button>
        </div>

        {/* Dossier droite */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Dossier cible</label>
          <Button
            onClick={selectRightFolder}
            variant="outline"
            className="w-full justify-start"
            disabled={isComparing}
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            {state.rightFolderPath || 'Sélectionner le dossier cible'}
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button
          onClick={startComparison}
          disabled={!canStartComparison || isComparing}
          className="flex-1"
        >
          {isComparing ? 'Comparaison en cours...' : 'Comparer'}
        </Button>
        
        <Button
          onClick={resetComparison}
          variant="outline"
          disabled={state.status === 'idle'}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
};

/**
 * Composant pour afficher la progression de la comparaison
 */
export const ComparisonProgress: React.FC = () => {
  const { state, isComparing } = useFolderComparison();

  if (!isComparing) return null;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 animate-spin" />
          <span className="font-medium">
            {state.currentOperation || 'Traitement...'}
          </span>
        </div>
        
        <Progress value={state.progress} className="w-full" />
        
        <div className="text-sm text-muted-foreground">
          Progression: {state.progress}%
        </div>
      </div>
    </Card>
  );
};

/**
 * Composant pour afficher les résultats de comparaison
 */
export const ComparisonResults: React.FC<{ result: ComparisonResult }> = ({ result }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Résultats de la comparaison</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {result.statistics.identicalFiles}
          </div>
          <div className="text-sm text-muted-foreground">Identiques</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {result.statistics.missingLeft}
          </div>
          <div className="text-sm text-muted-foreground">Manquants à gauche</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {result.statistics.missingRight}
          </div>
          <div className="text-sm text-muted-foreground">Manquants à droite</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {result.statistics.similarityPercentage}%
          </div>
          <div className="text-sm text-muted-foreground">Similarité</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="h-4 w-4" />
        <span>
          Comparaison terminée en {result.duration}ms • {result.statistics.totalFiles} fichiers analysés
        </span>
      </div>
    </Card>
  );
};

/**
 * Composant principal de la feature comparaison
 */
export const FolderComparisonFeature: React.FC = () => {
  const { state } = useFolderComparison();

  return (
    <div className="space-y-6">
      <FolderSelector />
      <ComparisonProgress />
      
      {state.result && (
        <ComparisonResults result={state.result} />
      )}
      
      {state.error && (
        <Card className="p-6 border-red-200 bg-red-50">
          <div className="text-red-800">
            <strong>Erreur:</strong> {state.error}
          </div>
        </Card>
      )}
    </div>
  );
};