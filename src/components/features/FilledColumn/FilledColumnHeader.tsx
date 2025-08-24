/**
 * @fileoverview Header de colonne avec titre et boutons d'action
 * @description Composant header modulaire pour FilledColumn
 * @props title - Titre de la colonne
 * @props colorScheme - Thème couleur de la colonne
 * @props fileCount - Nombre de fichiers
 * @props onReselect - Callback pour resélectionner un dossier
 * @props onExportToggle - Callback pour toggle menu export
 * @props showExportMenu - État du menu export
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderOpen, Download, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/shared/i18n';

interface FilledColumnHeaderProps {
  title: string;
  colorScheme: 'blue' | 'green' | 'purple' | 'slate';
  fileCount: number;
  onReselect: () => void;
  onExportToggle: () => void;
  showExportMenu: boolean;
}

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

export const FilledColumnHeader: React.FC<FilledColumnHeaderProps> = ({
  title,
  colorScheme,
  fileCount,
  onReselect,
  onExportToggle,
  showExportMenu
}) => {
  const { t } = useTranslation();
  const colors = colorClasses[colorScheme];

  return (
    <div className={`px-4 py-3 border-b border-slate-200 ${colors.bg} flex items-center justify-between`}>
      <div>
        <h4 className={`font-semibold text-sm ${colors.text} flex items-center gap-2`}>
          <FolderOpen size={16} className={colors.icon} />
          {title}
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          {fileCount} {fileCount === 1 ? t('comparison.stats.file') : t('comparison.stats.files')}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Bouton resélection */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onReselect}
          className="h-8 w-8 text-slate-600 hover:text-slate-800"
          title={t('ui.buttons.reselect')}
        >
          <RotateCcw size={14} />
        </Button>

        {/* Bouton export */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onExportToggle}
          className={`h-8 w-8 ${showExportMenu ? 'bg-slate-200' : ''} text-slate-600 hover:text-slate-800`}
          title={t('ui.buttons.export')}
        >
          <Download size={14} />
        </Button>
      </div>
    </div>
  );
};