/**
 * @fileoverview Composant colonne vide avec bouton d'ajout de dossier
 * @description État par défaut des colonnes de comparaison avec CTA professionnel
 * @props title - Titre de la colonne
 * @props onFolderSelect - Callback sélection dossier
 * @props colorScheme - Thème couleur de la colonne
 * @props description - Description optionnelle
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderPlus, Download, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/shared/i18n';

interface EmptyColumnProps {
  title: string;
  onFolderSelect: () => void;
  colorScheme?: 'blue' | 'green' | 'purple' | 'slate';
  description?: string;
}

export const EmptyColumn: React.FC<EmptyColumnProps> = ({
  title,
  onFolderSelect,
  colorScheme = 'slate',
  description
}) => {
  const { t } = useTranslation();
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700',
      icon: 'text-blue-500'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      button: 'bg-green-600 hover:bg-green-700',
      icon: 'text-green-500'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      button: 'bg-purple-600 hover:bg-purple-700',
      icon: 'text-purple-500'
    },
    slate: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-700',
      button: 'bg-slate-600 hover:bg-slate-700',
      icon: 'text-slate-500'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className="h-full flex flex-col">
      {/* Header de colonne */}
      <div className={`px-4 py-3 border-b border-slate-200 ${colors.bg}`}>
        <h4 className={`font-semibold text-sm ${colors.text} flex items-center gap-2`}>
          <Folder size={16} className={colors.icon} />
          {title}
        </h4>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
      </div>

      {/* Zone vide avec CTA */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          className="text-center max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Icône animée */}
          <motion.div 
            className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4 ${colors.border} border-2`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            >
              <FolderPlus size={24} className={colors.icon} />
            </motion.div>
          </motion.div>

          {/* Texte d'invitation */}
          <h5 className="font-medium text-slate-800 mb-2">
            {t('comparison.placeholders.selectFolder')}
          </h5>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            {t('comparison.placeholders.dragDropHint')}
          </p>

          {/* Bouton d'ajout principal */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onFolderSelect}
              className={`${colors.button} text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto`}
            >
              <FolderPlus size={16} />
              {t('ui.buttons.select')}
            </Button>
          </motion.div>

          {/* Indication visuelle supplémentaire */}
          <motion.div 
            className="mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className={`h-px w-12 ${colors.bg}`}></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};