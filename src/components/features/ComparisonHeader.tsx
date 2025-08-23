/**
 * @fileoverview Header de comparaison avec statistiques et export
 * @description Composant header intégrant stats et bouton d'export professionnel
 * @props stats - Statistiques de la comparaison
 * @props folderAName - Nom du dossier A
 * @props folderBName - Nom du dossier B
 * @props comparisonData - Données complètes pour l'export
 */

import React, { useState } from 'react';
import { ComparisonStats, ComparisonData } from '@/shared/types';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReportExporter } from './ReportExporter';
import { useTranslation } from '@/shared/i18n';

interface ComparisonHeaderProps {
  stats: ComparisonStats;
  folderAName: string;
  folderBName: string;
  comparisonData: ComparisonData;
}

export const ComparisonHeader: React.FC<ComparisonHeaderProps> = ({
  stats,
  folderAName,
  folderBName,
  comparisonData
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Statistiques de comparaison */}
      <div className="text-center lg:text-left">
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
          {t('reports.titles.results')}
        </h3>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-slate-600">
          <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {folderAName} ({stats.totalFilesA} files)
          </span>
          <span className="bg-green-50 px-3 py-1 rounded-full border border-green-200 font-semibold">
            {stats.commonFiles} common
          </span>
          <span className="bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            {folderBName} ({stats.totalFilesB} files)
          </span>
        </div>
      </div>

      {/* Bouton d'export professionnel */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Download size={18} className="animate-pulse" />
            {t('reports.titles.generateReport')}
          </Button>
        </motion.div>

        {/* Menu dropdown des formats */}
        {showExportMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 min-w-[240px]"
          >
            <div className="p-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2 border-b border-slate-100 mb-1">
                {t('reports.formats.exportFormats')}
              </div>
              
              <ReportExporter
                comparisonData={comparisonData}
                folderAName={folderAName}
                folderBName={folderBName}
                onExportComplete={() => setShowExportMenu(false)}
              >
                <div className="space-y-1">
                  {/* Option TXT */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-slate-50 p-3 rounded-lg"
                    data-format="txt"
                  >
                    <FileText size={16} className="text-slate-600 mr-3" />
                    <div>
                      <div className="font-medium text-slate-800">{t('reports.formats.txt')}</div>
                      <div className="text-xs text-slate-500">{t('reports.descriptions.txtDescription')}</div>
                    </div>
                  </Button>

                  {/* Option CSV */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-slate-50 p-3 rounded-lg"
                    data-format="csv"
                  >
                    <FileSpreadsheet size={16} className="text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-slate-800">{t('reports.formats.csv')}</div>
                      <div className="text-xs text-slate-500">{t('reports.descriptions.csvDescription')}</div>
                    </div>
                  </Button>

                  {/* Option JSON */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-slate-50 p-3 rounded-lg"
                    data-format="json"
                  >
                    <FileCode size={16} className="text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-slate-800">{t('reports.formats.json')}</div>
                      <div className="text-xs text-slate-500">{t('reports.descriptions.jsonDescription')}</div>
                    </div>
                  </Button>
                </div>
              </ReportExporter>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};