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
import { useTranslation } from '@/shared/i18n';
import { ComparisonHeader } from './ComparisonHeader';
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
  const { t } = useTranslation();
  const stats = calculateStats(comparisonData);

  return (
    <div className="h-full flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm">
      {/* Header avec stats et export */}
      <div className="flex-shrink-0 border-b border-slate-100 p-6">
        <ComparisonHeader 
          stats={stats}
          folderAName={folderAName}
          folderBName={folderBName}
          comparisonData={comparisonData}
        />
      </div>
      
      {/* Interface 3 colonnes - zone extensible */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 min-h-0">
        {/* Colonne A - Fichiers uniques au dossier A */}
        <div className="border-r border-slate-100 md:border-r lg:border-r md:last:border-r-0 lg:last:border-r-0">
          <FileList
            files={comparisonData.uniqueA}
            title={`${t('comparison.columns.uniqueA')} ${folderAName}`}
            colorScheme="slate"
          />
        </div>
        
        {/* Colonne centrale - Fichiers communs */}
        <div className="border-r border-slate-100 md:border-r lg:border-r md:last:border-r-0 lg:last:border-r-0">
          <FileList
            files={comparisonData.common}
            title={t('comparison.columns.commonFiles')}
            colorScheme="blue"
            showPaths={true}
          />
        </div>
        
        {/* Colonne B - Fichiers uniques au dossier B */}
        <div className="md:border-r-0 lg:border-r-0">
          <FileList
            files={comparisonData.uniqueB}
            title={`${t('comparison.columns.uniqueB')} ${folderBName}`}
            colorScheme="gray"
          />
        </div>
      </div>
    </div>
  );
};