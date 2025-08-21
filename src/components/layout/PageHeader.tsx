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
      "mb-8 md:mb-12 text-center w-full",
      className
    )}>
      <h1 className="scroll-m-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl text-balance mb-8 sm:mb-12 md:mb-16 leading-tight transition-all duration-500 hover:scale-110 hover:rotate-1 hover:drop-shadow-3xl cursor-pointer" style={{ fontFamily: '"Fredoka One", "Comic Sans MS", "Bubblegum Sans", "Nunito", cursive' }}>
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-sky-700 leading-relaxed font-medium tracking-wide drop-shadow-md">
          💖 {subtitle} 💖
        </p>
      )}
    </div>
  );
};

export default PageHeader;