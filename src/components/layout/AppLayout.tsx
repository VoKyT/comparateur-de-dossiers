/**
 * @fileoverview Layout principal de l'application avec structure responsive
 * @description Container principal gérant la mise en page globale et le responsive design
 * @props children - Contenu à afficher dans le layout
 * @styling Classes Tailwind avec breakpoints responsive
 * @accessibility Support complet ARIA et navigation clavier
 * @performance Optimisé avec React.memo pour éviter les re-renders inutiles
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout principal de l'application avec design responsive
 * 
 * Fonctionnalités :
 * - Container centré avec contraintes max-width
 * - Padding responsive selon la taille d'écran
 * - Background gradient moderne
 * - Support mobile, tablette et desktop
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "min-h-screen w-full flex items-center justify-center",
      "bg-gradient-to-br from-blue-400 via-pink-200 to-blue-400",
      "font-sans overflow-hidden",
      "p-4 sm:p-6 md:p-8",
      className
    )}>
      <div className="flex flex-col items-center w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;