/**
 * @fileoverview Composant texte avec icône pour améliorer la compréhension
 * @description Affiche du texte avec une icône contextuelle pour meilleure UX
 * @props icon - Icône Lucide à afficher
 * @props children - Contenu textuel à afficher
 * @props variant - Style du composant ('default' | 'muted' | 'accent')
 * @props size - Taille des éléments ('sm' | 'md' | 'lg')
 * @props className - Classes CSS supplémentaires
 * @styling Flexbox responsive avec espacement adaptatif
 * @accessibility Icône décorative avec aria-hidden
 * @performance Composant léger sans état
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconTextProps {
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Composant texte avec icône pour améliorer la compréhension visuelle
 * 
 * Fonctionnalités :
 * - Icône contextuelle automatiquement alignée
 * - 3 variants de style (default, muted, accent)
 * - Tailles responsive (sm, md, lg)
 * - Espacement harmonieux entre icône et texte
 * - Support complet accessibilité
 */
export const IconText: React.FC<IconTextProps> = ({
  icon: IconComponent,
  children,
  variant = 'default',
  size = 'md',
  className
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'muted':
        return "text-slate-600";
      case 'accent':
        return "text-sky-700 font-semibold";
      default:
        return "text-slate-800";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: "gap-2 text-sm",
          icon: "h-4 w-4"
        };
      case 'lg':
        return {
          container: "gap-4 text-lg",
          icon: "h-6 w-6"
        };
      default:
        return {
          container: "gap-3 text-base",
          icon: "h-5 w-5"
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <div className={cn(
      "flex items-center",
      sizeStyles.container,
      getVariantStyles(),
      className
    )}>
      <IconComponent 
        className={cn(sizeStyles.icon, "flex-shrink-0")}
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
};

export default IconText;