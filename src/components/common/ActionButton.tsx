/**
 * @fileoverview Bouton d'action moderne avec animations et styles prédéfinis
 * @description Bouton réutilisable avec variants, animations hover et responsive design
 * @props children - Contenu du bouton (texte + icône)
 * @props onClick - Fonction appelée au clic
 * @props variant - Style du bouton ('primary' | 'secondary' | 'outline')
 * @props size - Taille du bouton ('sm' | 'md' | 'lg')
 * @props icon - Icône à afficher (optionnel)
 * @props className - Classes CSS supplémentaires (optionnel)
 * @props disabled - État désactivé (optionnel)
 * @styling Bouton shadcn/ui avec animations custom et gradients
 * @accessibility Support clavier, ARIA et focus visible
 * @performance Animations CSS optimisées, pas de JavaScript
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

/**
 * Bouton d'action avec animations élégantes et design moderne
 * 
 * Fonctionnalités :
 * - 3 variants : primary (gradient), secondary, outline
 * - Tailles responsive avec breakpoints Tailwind
 * - Animations hover : scale, rotation d'icône, ombres
 * - Icône optionnelle avec animation de rotation
 * - Support complet accessibilité et clavier
 */
export const ActionButton: React.FC<ActionButtonProps> = ({ 
  children,
  onClick,
  variant = 'primary',
  size = 'lg',
  icon: IconComponent,
  className,
  disabled = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return "group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-xl md:rounded-2xl font-bold shadow-xl hover:shadow-2xl";
      case 'secondary':
        return "group bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl font-semibold shadow-lg hover:shadow-xl";
      case 'outline':
        return "group bg-white/80 hover:bg-white text-blue-700 hover:text-blue-800 border-2 border-blue-300/50 hover:border-blue-400/70 rounded-xl font-semibold shadow-lg hover:shadow-xl";
      default:
        return "";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return "px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm";
      case 'default':
        return "px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base";
      case 'lg':
        return "px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl";
      default:
        return "";
    }
  };

  return (
    <Button
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        getVariantStyles(),
        getSizeStyles(),
        "tracking-wide transform hover:scale-105 transition-all duration-300",
        className
      )}
    >
      {IconComponent && (
        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
      )}
      {children}
    </Button>
  );
};

export default ActionButton;