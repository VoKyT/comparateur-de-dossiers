/**
 * @fileoverview Groupe de boutons avec espacement optimisé et responsive
 * @description Container pour organiser plusieurs boutons avec espacement professionnel
 * @props children - Boutons ou autres éléments à grouper
 * @props direction - Direction du group ('vertical' | 'horizontal')
 * @props spacing - Espacement entre les éléments ('compact' | 'normal' | 'relaxed')
 * @props align - Alignement des éléments ('start' | 'center' | 'end')
 * @props className - Classes CSS supplémentaires (optionnel)
 * @styling Container flexible avec espacements responsive Tailwind
 * @accessibility Navigation clavier entre les boutons
 * @performance Container léger sans state ni effects
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonGroupProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  spacing?: 'compact' | 'normal' | 'relaxed';
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/**
 * Groupe de boutons avec espacement responsive et professionnel
 * 
 * Fonctionnalités :
 * - Direction vertical/horizontal adaptable
 * - 3 niveaux d'espacement : compact, normal, relaxed
 * - Alignement configurable : start, center, end
 * - Espacement responsive selon breakpoints
 * - Support accessibilité pour navigation clavier
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ 
  children,
  direction = 'vertical',
  spacing = 'normal',
  align = 'center',
  className
}) => {
  const getDirectionStyles = () => {
    return direction === 'vertical' 
      ? 'flex-col' 
      : 'flex-row flex-wrap';
  };

  const getSpacingStyles = () => {
    if (direction === 'vertical') {
      switch (spacing) {
        case 'compact':
          return 'space-y-2 sm:space-y-2';
        case 'normal':
          return 'space-y-3 sm:space-y-4';
        case 'relaxed':
          return 'space-y-4 sm:space-y-6 md:space-y-8';
        default:
          return 'space-y-3 sm:space-y-4';
      }
    } else {
      switch (spacing) {
        case 'compact':
          return 'space-x-2 sm:space-x-2 space-y-2';
        case 'normal':
          return 'space-x-3 sm:space-x-4 space-y-3 sm:space-y-4';
        case 'relaxed':
          return 'space-x-4 sm:space-x-6 md:space-x-8 space-y-4 sm:space-y-6';
        default:
          return 'space-x-3 sm:space-x-4 space-y-3 sm:space-y-4';
      }
    }
  };

  const getAlignmentStyles = () => {
    switch (align) {
      case 'start':
        return 'items-start justify-start';
      case 'center':
        return 'items-center justify-center';
      case 'end':
        return 'items-end justify-end';
      default:
        return 'items-center justify-center';
    }
  };

  return (
    <div className={cn(
      "flex",
      getDirectionStyles(),
      getSpacingStyles(),
      getAlignmentStyles(),
      className
    )}>
      {children}
    </div>
  );
};

export default ButtonGroup;