/**
 * @fileoverview Colonne centrale pour fichiers communs avec messages adaptatifs
 * @description Composant spécialisé pour afficher les fichiers communs avec messages contextuels
 * @props comparisonData - Données de comparaison (optionnel)
 * @props folderA - Dossier A (optionnel)  
 * @props folderB - Dossier B (optionnel)
 */

import React from 'react';
import { ComparisonData, DirectoryData } from '@/shared/types';
import { Download, FolderPlus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/shared/i18n';

interface CommonFilesColumnProps {
  comparisonData?: ComparisonData | null;
  folderA?: DirectoryData | null;
  folderB?: DirectoryData | null;
}

export const CommonFilesColumn: React.FC<CommonFilesColumnProps> = ({
  comparisonData,
  folderA,
  folderB
}) => {
  const { t } = useTranslation();
  // Cas 1: Fichiers communs trouvés
  if (comparisonData?.common && comparisonData.common.length > 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header spécial pour fichiers communs */}
        <div className="px-4 py-3 border-b border-slate-200 bg-green-50">
          <h4 className="font-semibold text-sm text-green-700 flex items-center gap-2">
            <Download size={16} className="text-green-500" />
            {t('comparison.columns.commonFiles')}
            <span className="ml-1 text-xs bg-white px-2 py-0.5 rounded-full border">
              {comparisonData.common.length}
            </span>
          </h4>
          <p className="text-xs text-green-600 mt-1">
            {t('comparison.messages.safeToDelete')}
          </p>
        </div>

        {/* Liste des fichiers communs */}
        <div className="flex-1 overflow-auto">
          <div className="p-2 space-y-1">
            {comparisonData.common.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="bg-white border border-green-100 rounded-lg p-3 hover:bg-green-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-800 truncate">
                      📄 {file.name}
                    </p>
                    <div className="mt-1 space-y-1 text-xs text-slate-600">
                      <p className="truncate">📁 A: {file.pathA}</p>
                      <p className="truncate">📁 B: {file.pathB}</p>
                    </div>
                  </div>
                  <div className="ml-2 text-xs text-slate-500">
                    {formatSize(file.size)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Cas 2: Comparaison faite mais pas de fichiers communs
  if (comparisonData && folderA && folderB) {
    return (
      <div className="h-full flex flex-col">
        {/* Header pour aucun fichier commun */}
        <div className="px-4 py-3 border-b border-slate-200 bg-orange-50">
          <h4 className="font-semibold text-sm text-orange-700 flex items-center gap-2">
            <AlertCircle size={16} className="text-orange-500" />
            No {t('comparison.columns.commonFiles')}
          </h4>
          <p className="text-xs text-orange-600 mt-1">
            No identical files found between the two folders
          </p>
        </div>

        {/* Message explicatif */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            className="text-center max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-orange-200">
              <span className="text-2xl">🔍</span>
            </div>
            <h5 className="font-medium text-slate-800 mb-2">
              No Duplicates Found
            </h5>
            <p className="text-sm text-slate-600 leading-relaxed">
              The folders <strong>{folderA.name}</strong> and <strong>{folderB.name}</strong> don't contain any identical files.
            </p>
            <div className="mt-4 text-xs text-slate-500">
              ✅ Nothing to clean up!
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Cas 3: Attente de sélection des dossiers
  const hasFolderA = !!folderA;
  const hasFolderB = !!folderB;

  return (
    <div className="h-full flex flex-col">
      {/* Header d'attente */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
        <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
          <FolderPlus size={16} className="text-slate-500" />
          {t('comparison.columns.commonFiles')}
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          {t('comparison.messages.selectBothFolders')}
        </p>
      </div>

      {/* Message d'attente */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          className="text-center max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-200">
            <span className="text-2xl">⏳</span>
          </div>
          
          {!hasFolderA && !hasFolderB ? (
            <>
              <h5 className="font-medium text-slate-800 mb-2">
                {t('ui.labels.ready')}
              </h5>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('comparison.messages.selectBothToFind')}
              </p>
            </>
          ) : hasFolderA && !hasFolderB ? (
            <>
              <h5 className="font-medium text-slate-800 mb-2">
                {t('comparison.messages.selectFolderB')}
              </h5>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>{t('comparison.columns.folderA')}</strong> {t('comparison.messages.folderASelected')} ({folderA!.name}). 
                <br />{t('comparison.messages.nowSelectB')}.
              </p>
            </>
          ) : !hasFolderA && hasFolderB ? (
            <>
              <h5 className="font-medium text-slate-800 mb-2">
                {t('comparison.messages.selectFolderA')}
              </h5>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>{t('comparison.columns.folderB')}</strong> {t('comparison.messages.folderBSelected')} ({folderB!.name}). 
                <br />{t('comparison.messages.nowSelectA')}.
              </p>
            </>
          ) : null}
          
          <div className="mt-4 flex justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${hasFolderA ? 'bg-blue-400' : 'bg-slate-300'}`}></div>
            <div className={`w-2 h-2 rounded-full ${hasFolderB ? 'bg-purple-400' : 'bg-slate-300'}`}></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Formate la taille des fichiers
 */
function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}