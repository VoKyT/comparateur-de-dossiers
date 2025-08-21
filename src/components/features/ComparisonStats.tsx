/**
 * @fileoverview Composant d'affichage des statistiques de comparaison
 * @description Affiche les métriques de comparaison de façon lisible
 * @props stats - Statistiques de la comparaison
 * @props folderAName - Nom du dossier A
 * @props folderBName - Nom du dossier B
 */

import React from 'react';
import { ComparisonStats } from '@/shared/types';

interface ComparisonStatsProps {
  stats: ComparisonStats;
  folderAName: string;
  folderBName: string;
}

export const ComparisonStatsDisplay: React.FC<ComparisonStatsProps> = ({
  stats,
  folderAName,
  folderBName
}) => {
  return (
    <div className="mb-6 text-center">
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
        Folder Comparison
      </h3>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
        <span>{folderAName} ({stats.totalFilesA} files)</span>
        <span>{stats.commonFiles} common</span>
        <span>{folderBName} ({stats.totalFilesB} files)</span>
      </div>
    </div>
  );
};