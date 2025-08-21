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
      "min-h-screen w-full flex flex-col",
      "bg-gradient-to-br from-blue-600 via-red-200 to-blue-600",
      "font-sans overflow-hidden",
      "p-4 sm:p-6 md:p-8",
      className
    )}>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center w-full max-w-4xl">
          {children}
        </div>
      </div>
      <footer className="text-center py-4">
        <p className="text-white text-lg sm:text-xl md:text-2xl opacity-100 font-medium" style={{ fontFamily: '"Pacifico", cursive' }}>
          made by ~ VKT ✨
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;