/**
 * @fileoverview Badge de version avec information de build et mode
 * @description Affiche la version actuelle de l'application avec icône et style
 * @props version - Numéro de version à afficher
 * @props mode - Mode de fonctionnement (Web, Dev, etc.)
 * @props icon - Composant d'icône à afficher (optionnel)
 * @props className - Classes CSS supplémentaires (optionnel)
 * @styling Badge shadcn/ui avec variant outline et couleurs harmonieuses
 * @accessibility Texte lisible et contrastes respectés
 * @performance Composant statique optimisé
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VersionBadgeProps {
  version: string;
  mode?: string;
  icon?: LucideIcon;
  className?: string;
}

/**
 * Badge de version moderne avec icône et responsive design
 * 
 * Fonctionnalités :
 * - Affichage version + mode de fonctionnement
 * - Icône personnalisable avec Globe par défaut
 * - Tailles responsive (mobile → desktop)
 * - Style outline harmonieux avec palette bleue
 */
export const VersionBadge: React.FC<VersionBadgeProps> = ({ 
  version, 
  mode = "Mode Web", 
  icon: IconComponent = Globe,
  className 
}) => {
  return (
    <div className={cn("mb-8 md:mb-10", className)}>
      <Badge 
        variant="outline" 
        className="bg-white/90 border-slate-400/50 text-slate-800 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide shadow-lg"
      >
        <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        Version {version} • {mode}
      </Badge>
    </div>
  );
};

export default VersionBadge;