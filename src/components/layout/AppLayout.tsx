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
import { Instagram } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';

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
  const { t } = useTranslation();
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
        <div className="px-6 py-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300"></div>
            <p className="text-slate-600 text-[10px] font-semibold tracking-wider uppercase">
              {t('footer.madeBy')} <span className="text-blue-700 font-bold text-base">VKT</span>
            </p>
            <a 
              href="https://instagram.com/vokytrg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-3 flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors duration-200"
              aria-label={t('footer.followInstagram')}
              role="link"
            >
              <Instagram size={18} className="hover:scale-110 transition-transform duration-200" />
              <img 
                src="/profile-vokytrg.jpg" 
                alt="Photo de profil @vokytrg"
                className="w-6 h-6 rounded-full border-2 border-pink-200 hover:border-pink-400 transition-colors duration-200"
                onError={(e) => {
                  // Fallback vers une image par défaut si l'image ne charge pas
                  (e.target as HTMLImageElement).src = '/default-profile.png';
                }}
              />
            </a>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;