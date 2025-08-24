/**
 * @fileoverview Menu d'export avec options multiples
 * @description Menu déroulant pour export de fichiers en différents formats
 * @props isVisible - État de visibilité du menu
 * @props onExport - Callback pour déclencher export
 * @props colorScheme - Thème couleur
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, FileSpreadsheet, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/shared/i18n';

type ExportFormat = 'txt' | 'csv' | 'json';

interface ExportMenuProps {
  isVisible: boolean;
  onExport: (format: ExportFormat) => void;
  colorScheme: 'blue' | 'green' | 'purple' | 'slate';
}

const colorClasses = {
  blue: { button: 'bg-blue-600 hover:bg-blue-700' },
  green: { button: 'bg-green-600 hover:bg-green-700' },
  purple: { button: 'bg-purple-600 hover:bg-purple-700' },
  slate: { button: 'bg-slate-600 hover:bg-slate-700' }
};

export const ExportMenu: React.FC<ExportMenuProps> = ({
  isVisible,
  onExport,
  colorScheme
}) => {
  const { t } = useTranslation();
  const colors = colorClasses[colorScheme];

  const exportOptions = [
    {
      format: 'txt' as ExportFormat,
      icon: FileText,
      label: t('export.formats.txt'),
      description: t('export.descriptions.txt')
    },
    {
      format: 'csv' as ExportFormat,
      icon: FileSpreadsheet,
      label: t('export.formats.csv'),
      description: t('export.descriptions.csv')
    },
    {
      format: 'json' as ExportFormat,
      icon: FileCode,
      label: t('export.formats.json'),
      description: t('export.descriptions.json')
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-48"
        >
          <div className="p-2">
            {exportOptions.map((option) => (
              <Button
                key={option.format}
                variant="ghost"
                onClick={() => onExport(option.format)}
                className="w-full justify-start gap-3 h-auto py-3 px-3 text-left hover:bg-slate-50"
              >
                <option.icon size={16} className="text-slate-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-sm text-slate-900">
                    {option.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {option.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};