/**
 * @fileoverview En-tête de page avec titre et sous-titre responsive
 * @description Composant d'en-tête principal avec typographie adaptive et gradients
 * @props title - Titre principal de la page
 * @props subtitle - Sous-titre descriptif (optionnel)
 * @props className - Classes CSS supplémentaires (optionnel)
 * @styling Typographie responsive avec breakpoints Tailwind
 * @accessibility Hiérarchie sémantique h1/p correcte
 * @performance Component léger sans state, re-render minimal
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * En-tête de page avec typographie responsive et moderne
 * 
 * Fonctionnalités :
 * - Titre avec gradient text et tailles adaptatives
 * - Sous-titre optionnel avec contraste optimisé
 * - Container responsive avec max-width selon écran
 * - Typographie harmonieuse mobile → desktop
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  className 
}) => {
  return (
    <div className={cn(
      "mb-8 md:mb-12 text-center",
      "max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl",
      className
    )}>
      <h1 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent text-balance">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-800/80 leading-5 sm:leading-6 md:leading-7 font-medium tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;