/**
 * @fileoverview Composant d'export de rapport de comparaison
 * @description Wrapper pour gérer l'export selon différents formats
 * @props comparisonData - Données de comparaison à exporter
 * @props folderAName - Nom du dossier A
 * @props folderBName - Nom du dossier B
 * @props children - Boutons ou éléments déclencheurs d'export
 * @props onExportComplete - Callback après export réussi
 */

import React, { cloneElement, ReactElement } from 'react';
import { ComparisonData } from '@/shared/types';
import { useReportGenerator } from '@/shared/hooks';
import { useTranslation } from '@/shared/i18n';

type ExportFormat = 'txt' | 'csv' | 'json';

interface ReportExporterProps {
  comparisonData: ComparisonData;
  folderAName: string;
  folderBName: string;
  children: ReactElement | ReactElement[];
  onExportComplete?: () => void;
}

export const ReportExporter: React.FC<ReportExporterProps> = ({
  comparisonData,
  folderAName,
  folderBName,
  children,
  onExportComplete
}) => {
  const { t, translations } = useTranslation();
  const { generateReport, downloadReport } = useReportGenerator(translations);

  const handleExport = async (format: ExportFormat) => {
    try {
      console.log(`📊 [REPORT_EXPORTER] Génération rapport format: ${format}`);
      
      const report = generateReport(comparisonData, folderAName, folderBName, format);
      const fileName = `comparison-report-${folderAName}-vs-${folderBName}-${new Date().toISOString().split('T')[0]}.${format}`;
      
      downloadReport(report, fileName, format);
      
      console.log(`✅ [REPORT_EXPORTER] Rapport téléchargé: ${fileName}`);
      onExportComplete?.();
    } catch (error) {
      console.error(`❌ [REPORT_EXPORTER] Erreur génération rapport:`, error);
    }
  };

  const enhanceChildren = (child: any): any => {
    // Si l'élément a un data-format, on l'améliore
    if (React.isValidElement(child) && child.props['data-format']) {
      const format = child.props['data-format'] as ExportFormat;
      
      return cloneElement(child, {
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          handleExport(format);
        }
      });
    }
    
    // Si l'élément a des enfants, on les parcourt récursivement
    if (React.isValidElement(child) && child.props.children) {
      return cloneElement(child, {
        ...child.props,
        children: React.Children.map(child.props.children, (grandChild) => 
          enhanceChildren(grandChild)
        )
      });
    }
    
    return child;
  };

  return (
    <>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <React.Fragment key={index}>{enhanceChildren(child)}</React.Fragment>
          ))
        : enhanceChildren(children)
      }
    </>
  );
};