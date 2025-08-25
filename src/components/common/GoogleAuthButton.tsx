/**
 * @fileoverview Bouton d'authentification Google professionnel
 * @description Composant d'authentification Google avec gestion d'états et design moderne
 * @props variant - Style du bouton ('default' | 'compact')
 * @props size - Taille du bouton ('sm' | 'md' | 'lg')
 * @props className - Classes CSS supplémentaires (optionnel)
 * @props showText - Afficher le texte du bouton (optionnel, défaut: true)
 * @state useAuth - Hook d'authentification avec user, isLoading, error
 * @styling shadcn/ui + Tailwind CSS avec couleurs Google officielles
 * @accessibility Support ARIA, focus, loading states
 * @performance Animations CSS optimisées, lazy loading des scripts Google
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/shared/hooks';
import { LogOut, Loader2, User } from 'lucide-react';

interface GoogleAuthButtonProps {
  variant?: 'default' | 'compact';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  showText?: boolean;
  onAuthStateChange?: (isSignedIn: boolean) => void;
}

/**
 * Bouton d'authentification Google avec gestion complète des états
 * 
 * Fonctionnalités :
 * - Connexion/Déconnexion Google automatique
 * - États : déconnecté, chargement, connecté, erreur
 * - Affichage utilisateur avec avatar et nom
 * - Design professionnel avec couleurs Google
 * - Animations fluides et transitions
 * - Gestion des erreurs utilisateur
 * - Support mobile et desktop
 * - Logo Google local depuis /public/g.webp
 */
export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  variant = 'default',
  size = 'default',
  className,
  showText = true,
  onAuthStateChange
}) => {
  const { user, isLoading, error, signIn, signOut, clearError, isSignedIn } = useAuth();

  // Notifier les changements d'état d'authentification
  React.useEffect(() => {
    onAuthStateChange?.(isSignedIn);
  }, [isSignedIn, onAuthStateChange]);

  // Handler de clic principal
  const handleAuthClick = async () => {
    // Effacer les erreurs précédentes
    if (error) {
      clearError();
    }

    try {
      if (isSignedIn) {
        await signOut();
      } else {
        await signIn();
      }
    } catch (error) {
      console.error('Erreur authentification:', error);
      // L'erreur sera gérée par le hook useAuth
    }
  };

  // Styles selon la variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return cn(
          "gap-2 font-medium border-slate-200 hover:border-slate-300",
          isSignedIn 
            ? "bg-slate-50 hover:bg-slate-100 text-slate-700 border" 
            : "bg-white hover:bg-slate-50 text-slate-700 border shadow-sm hover:shadow-md"
        );
      case 'default':
      default:
        return cn(
          "gap-3 font-semibold shadow-md hover:shadow-lg border-0",
          isSignedIn
            ? "bg-slate-100 hover:bg-slate-200 text-slate-800"
            : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300"
        );
    }
  };

  // Styles selon la taille
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return "px-3 py-2 text-sm";
      case 'lg':
        return "px-6 py-4 text-base";
      case 'default':
      default:
        return "px-4 py-3 text-sm";
    }
  };

  // Rendu du bouton de connexion
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center">
        <Button
          onClick={handleAuthClick}
          disabled={isLoading}
          className={cn(
            getVariantStyles(),
            getSizeStyles(),
            "rounded-lg transition-colors duration-200",
            "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "group relative overflow-hidden",
            className
          )}
          aria-label="Se connecter avec Google"
        >
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
          
          {/* Icône et contenu */}
          <div className="relative flex items-center gap-3">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <div className="w-5 h-5 flex items-center justify-center">
                <img 
                  src="/g.webp" 
                  alt="Google" 
                  className="w-4 h-4 object-contain"
                  onError={(e) => {
                    // Fallback vers SVG si l'image ne charge pas
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallbackSvg = document.createElement('div');
                    fallbackSvg.className = 'w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center';
                    fallbackSvg.innerHTML = '<svg viewBox="0 0 24 24" class="w-3 h-3 fill-white"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>';
                    target.parentNode?.appendChild(fallbackSvg);
                  }}
                />
              </div>
            )}
            
            {showText && (
              <span className="font-medium">
                {isLoading ? 'Connexion...' : 'Se connecter (Démo)'}
              </span>
            )}
          </div>
        </Button>

        {/* Message d'erreur */}
        {error && (
          <div className="mt-2">
            <Badge variant="destructive" className="text-xs">
              {error}
            </Badge>
          </div>
        )}
      </div>
    );
  }

  // Rendu du profil utilisateur connecté
  return (
    <div className="flex items-center gap-3">
      {/* Avatar utilisateur */}
      <Avatar className="w-8 h-8 ring-2 ring-slate-200 hover:ring-slate-300 transition-all duration-200">
        {user?.picture ? (
          <AvatarImage 
            src={user.picture} 
            alt={user?.name || 'Utilisateur'}
            className="object-cover"
            onError={() => {
              // Force fallback en cas d'erreur de chargement
              console.log('⚠️ [GOOGLE_AUTH_BUTTON] Avatar failed to load, using fallback');
            }}
          />
        ) : null}
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-semibold">
          {user?.given_name?.[0]}{user?.family_name?.[0] || user?.name?.[1] || ''}
        </AvatarFallback>
      </Avatar>

      {/* Informations utilisateur */}
      {showText && variant === 'default' && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-800 truncate">
              {user?.given_name || user?.name}
            </span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 border-blue-200">
              DÉMO
            </Badge>
          </div>
          <span className="text-xs text-slate-500 truncate">
            {user?.email}
          </span>
        </div>
      )}

      {/* Bouton de déconnexion */}
      <Button
        onClick={handleAuthClick}
        disabled={isLoading}
        variant="ghost"
        size="sm"
        className={cn(
          "text-slate-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg",
          "transition-colors duration-200 group",
          variant === 'compact' && !showText && "ml-0"
        )}
        aria-label="Se déconnecter de Google"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
        )}
      </Button>

      {/* Badge de connexion pour la variante compacte */}
      {variant === 'compact' && (
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default GoogleAuthButton;