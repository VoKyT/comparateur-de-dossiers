/**
 * @fileoverview Page de comparaison de dossiers avec feature modulaire
 * @description Page dédiée à la comparaison utilisant la feature isolée
 * @props Aucune - Page autonome
 * @state Délégué à la feature folder-comparison
 * @events Délégués aux composants de la feature
 * @dependencies AppLayout, PageHeader, FolderComparisonFeature
 * @parent App.tsx via routing
 * @children Feature folder-comparison complète
 * @styling Classes Tailwind via composants
 * @accessibility Support via feature components
 * @performance Feature isolée optimisée
 * @testing Logs délégués à la feature
 */

import React from 'react';
import { AppLayout, PageHeader } from '@/components/layout';
import { FolderComparisonFeature } from '@/features/folder-comparison';

/**
 * Page de comparaison avec architecture feature-based
 * 
 * Fonctionnalités :
 * - Délégation complète à la feature folder-comparison
 * - Architecture modulaire stricte selon CLAUDE.md
 * - Isolation des responsabilités
 * - Design responsive intégré
 */
export const ComparisonPage: React.FC = () => {
  return (
    <AppLayout>
      <PageHeader 
        title="Comparaison de Dossiers"
        subtitle="Analysez et comparez le contenu de vos dossiers en détail"
      />

      <div className="w-full max-w-4xl mx-auto">
        <FolderComparisonFeature />
      </div>
    </AppLayout>
  );
};

export default ComparisonPage;