/**
 * @fileoverview Composant grille de comparaison 3 colonnes
 * @description Interface de comparaison avec trois colonnes (A, Communs, B)
 * @props comparisonData - Données de comparaison
 * @props folderAName - Nom du dossier A
 * @props folderBName - Nom du dossier B
 */

import React from 'react';
import { ComparisonData, ComparisonStats } from '@/shared/types';
import { useComparison } from '@/shared/hooks';
import { ComparisonStatsDisplay } from './ComparisonStats';
import { FileList } from './FileList';

interface ComparisonGridProps {
  comparisonData: ComparisonData;
  folderAName: string;
  folderBName: string;
}

export const ComparisonGrid: React.FC<ComparisonGridProps> = ({
  comparisonData,
  folderAName,
  folderBName
}) => {
  const { calculateStats } = useComparison();
  const stats = calculateStats(comparisonData);

  return (
    <div className="w-full max-w-7xl bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
      <ComparisonStatsDisplay 
        stats={stats}
        folderAName={folderAName}
        folderBName={folderBName}
      />
      
      {/* Interface 3 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Colonne A - Fichiers uniques au dossier A */}
        <FileList
          files={comparisonData.uniqueA}
          title={`Only in ${folderAName}`}
          colorScheme="slate"
        />
        
        {/* Colonne centrale - Fichiers communs */}
        <FileList
          files={comparisonData.common}
          title="Common Files"
          colorScheme="blue"
          showPaths={true}
        />
        
        {/* Colonne B - Fichiers uniques au dossier B */}
        <FileList
          files={comparisonData.uniqueB}
          title={`Only in ${folderBName}`}
          colorScheme="gray"
        />
      </div>
    </div>
  );
};