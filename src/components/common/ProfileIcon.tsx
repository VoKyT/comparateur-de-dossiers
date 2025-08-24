/**
 * @fileoverview Icône de profil circulaire réutilisable
 * @description Composant d'icône avec photo de profil dans un cercle stylé
 * @props size - Taille de l'icône ('sm' | 'md' | 'lg' | 'xl')
 * @props className - Classes CSS supplémentaires
 * @props showBorder - Afficher la bordure colorée
 * @styling Bordures et transitions professionnelles
 * @accessibility Alt text descriptif et gestion erreur image
 * @performance Fallback automatique si image indisponible
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10', 
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

const borderClasses = {
  sm: 'border-2',
  md: 'border-2',
  lg: 'border-3', 
  xl: 'border-4'
};

/**
 * Icône de profil circulaire avec styles professionnels
 * 
 * Fonctionnalités :
 * - Tailles adaptatives (sm à xl)
 * - Bordure optionnelle avec effet hover
 * - Fallback automatique si image indisponible
 * - Transitions fluides
 */
export const ProfileIcon: React.FC<ProfileIconProps> = ({ 
  size = 'md',
  className,
  showBorder = true
}) => {
  return (
    <img 
      src="/profile-vokytrg.jpg" 
      alt="Photo de profil @vokytrg"
      className={cn(
        "rounded-full transition-colors duration-200",
        sizeClasses[size],
        showBorder && [
          borderClasses[size],
          "border-pink-200 hover:border-pink-400"
        ],
        className
      )}
      onError={(e) => {
        // Fallback vers une image par défaut si l'image ne charge pas
        (e.target as HTMLImageElement).src = '/default-profile.png';
      }}
    />
  );
};

export default ProfileIcon;