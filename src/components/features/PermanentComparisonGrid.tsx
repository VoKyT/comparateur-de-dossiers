/**
 * @fileoverview Grille de comparaison permanente 3 colonnes
 * @description Interface 3 colonnes toujours visible avec états vides et remplis
 * @props comparisonData - Données de comparaison (optionnel)
 * @props folderA - Données du dossier A (optionnel)
 * @props folderB - Données du dossier B (optionnel)
 * @props onFolderSelectA - Callback sélection dossier A
 * @props onFolderSelectB - Callback sélection dossier B
 */

import React, { useState } from 'react';
import { ComparisonData, DirectoryData } from '@/shared/types';
import { useComparison, useReportGenerator } from '@/shared/hooks';
import { createAccessibleProps } from '@/shared/accessibility';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Download, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmptyColumn } from './EmptyColumn';
import { FilledColumn } from './FilledColumn';
import { CommonFilesColumn } from './CommonFilesColumn';
import { EmailModal } from './EmailModal';
import { ReportExporter } from './ReportExporter';

interface PermanentComparisonGridProps {
  comparisonData?: ComparisonData | null;
  folderA?: DirectoryData | null;
  folderB?: DirectoryData | null;
  onFolderSelectA: () => void;
  onFolderSelectB: () => void;
  onGoogleDriveSelectA?: () => void;
  onGoogleDriveSelectB?: () => void;
}

export const PermanentComparisonGrid: React.FC<PermanentComparisonGridProps> = ({
  comparisonData,
  folderA,
  folderB,
  onFolderSelectA,
  onFolderSelectB,
  onGoogleDriveSelectA,
  onGoogleDriveSelectB
}) => {
  const { calculateStats } = useComparison();
  const { t, translations } = useTranslation();
  const { generateReport } = useReportGenerator(translations);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  
  // Calculer les stats si on a les données de comparaison
  const stats = comparisonData ? calculateStats(comparisonData) : null;
  
  // Générer le contenu du rapport pour l'email
  const reportContent = comparisonData && folderA && folderB 
    ? generateReport(comparisonData, folderA.name, folderB.name, 'txt')
    : '';

  // Conditions pour activer les boutons
  const canExport = !!(comparisonData && folderA && folderB);
  
  // Messages d'aide pour les conditions
  const getDisabledMessage = () => {
    if (!folderA && !folderB) return "Sélectionnez deux dossiers pour activer l'export";
    if (!folderA) return "Sélectionnez le dossier A pour continuer";
    if (!folderB) return "Sélectionnez le dossier B pour continuer";
    if (!comparisonData) return "Effectuez une comparaison pour activer l'export";
    return "";
  };

  return (
    <div className="h-full flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm">
      {/* Header permanent avec titre et boutons de sélection */}
      <div className="flex-shrink-0 border-b border-slate-100 p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Titre principal */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
              {t('comparison.header.interfaceTitle')}
            </h3>
            
            {/* Zone dédiée pour noms complets des dossiers */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {/* Dossier A */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      {t('comparison.columns.folderA')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    {folderA ? (
                      <div>
                        <p className="font-medium text-slate-800 truncate" title={folderA.name}>
                          📁 {folderA.name}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {stats?.totalFilesA || 0} {t('comparison.stats.files')}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">{t('ui.labels.notSelected')}</p>
                    )}
                  </div>
                </div>

                {/* Dossier B */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                      {t('comparison.columns.folderB')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    {folderB ? (
                      <div>
                        <p className="font-medium text-slate-800 truncate" title={folderB.name}>
                          📁 {folderB.name}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {stats?.totalFilesB || 0} {t('comparison.stats.files')}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">{t('ui.labels.notSelected')}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Résultat de comparaison si disponible */}
              {stats && folderA && folderB && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-center">
                    <span className="bg-green-50 px-4 py-2 rounded-full border border-green-200 font-semibold text-sm text-green-700">
                      🔍 {stats.commonFiles} {t('comparison.stats.commonFound')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Boutons rapport - toujours visibles */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex gap-2"
            >
              {/* Bouton Télécharger */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    {canExport ? (
                      <ReportExporter
                        comparisonData={comparisonData!}
                        folderAName={folderA!.name}
                        folderBName={folderB!.name}
                      >
                        <Button
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                          data-format="txt"
                          {...createAccessibleProps('download')}
                        >
                          <Download size={16} />
                          {t('ui.buttons.export')}
                        </Button>
                      </ReportExporter>
                    ) : (
                      <Button
                        disabled
                        className="bg-slate-300 text-slate-500 cursor-not-allowed font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 opacity-60"
                        {...createAccessibleProps('download')}
                      >
                        <Download size={16} />
                        {t('ui.buttons.export')}
                      </Button>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-slate-800 text-white text-sm max-w-xs">
                  {canExport ? "Télécharger le rapport de comparaison" : getDisabledMessage()}
                </TooltipContent>
              </Tooltip>

              {/* Bouton Envoyer par email */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={canExport ? () => setIsEmailModalOpen(true) : undefined}
                      disabled={!canExport}
                      className={
                        canExport
                          ? "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                          : "bg-slate-300 text-slate-500 cursor-not-allowed font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 opacity-60"
                      }
                      {...createAccessibleProps('sendEmail')}
                    >
                      <Mail size={16} />
                      Envoyer
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-slate-800 text-white text-sm max-w-xs">
                  {canExport ? "Envoyer le rapport par email" : getDisabledMessage()}
                </TooltipContent>
              </Tooltip>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Interface 3 colonnes permanente */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 min-h-0">
        {/* Colonne A */}
        <div className="border-r border-slate-100 md:border-r lg:border-r md:last:border-r-0 lg:last:border-r-0">
          {folderA ? (
            <FilledColumn
              title={t('comparison.columns.folderA') || 'Folder A'}
              files={folderA?.files || []}
              folderData={folderA}
              colorScheme="blue"
              onReselect={onFolderSelectA}
              comparisonData={comparisonData}
            />
          ) : (
            <EmptyColumn
              title={t('comparison.columns.folderA') || 'Folder A'}
              onFolderSelect={onFolderSelectA}
              onGoogleDriveSelect={onGoogleDriveSelectA}
              colorScheme="blue"
              description={t('comparison.placeholders.selectFolder') || 'Select a folder'}
            />
          )}
        </div>
        
        {/* Colonne centrale - Fichiers communs */}
        <div className="border-r border-slate-100 md:border-r lg:border-r md:last:border-r-0 lg:last:border-r-0">
          <CommonFilesColumn
            comparisonData={comparisonData}
            folderA={folderA}
            folderB={folderB}
          />
        </div>
        
        {/* Colonne B */}
        <div className="md:border-r-0 lg:border-r-0">
          {folderB ? (
            <FilledColumn
              title={t('comparison.columns.folderB') || 'Folder B'}
              files={folderB?.files || []}
              folderData={folderB}
              colorScheme="purple"
              onReselect={onFolderSelectB}
              comparisonData={comparisonData}
            />
          ) : (
            <EmptyColumn
              title={t('comparison.columns.folderB') || 'Folder B'}
              onFolderSelect={onFolderSelectB}
              onGoogleDriveSelect={onGoogleDriveSelectB}
              colorScheme="purple"
              description={t('comparison.placeholders.selectFolder') || 'Select a folder'}
            />
          )}
        </div>
      </div>

      {/* Modal d'envoi par email */}
      {canExport && (
        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          reportData={reportContent}
          folderAName={folderA!.name}
          folderBName={folderB!.name}
          onEmailSent={() => {
            console.log('📧 [PERMANENT_COMPARISON_GRID] Email envoyé avec succès');
          }}
        />
      )}
    </div>
  );
};

