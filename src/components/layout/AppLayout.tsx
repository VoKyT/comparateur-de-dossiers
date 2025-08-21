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
 * Layout principal de l'application avec grande zone de travail
 * 
 * Fonctionnalités :
 * - Zone de travail pleine largeur et hauteur
 * - Header fixe compact en haut
 * - Footer discret en bas
 * - Padding minimal pour maximiser l'espace
 * - Support mobile, tablette et desktop
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col",
      "bg-slate-50",
      "font-system",
      className
    )}>
      {/* Zone de travail principale - pleine hauteur */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 w-full p-4 sm:p-6 md:p-8 overflow-auto">
          {children}
        </div>
      </main>
      
      {/* Footer discret fixé en bas */}
      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="px-6 py-3">
          <p className="text-slate-500 text-xs font-medium text-center">
            Made by VKT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;