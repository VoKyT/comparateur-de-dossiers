/**
 * @fileoverview Hook React pour gestion de l'authentification Google
 * @description Hook personnalisé gérant l'état d'authentification selon architecture CLAUDE.md
 * @dependencies googleAuthService - Service d'authentification Google
 * @state user - Utilisateur connecté, isLoading - État de chargement, error - Erreur auth
 * @methods signIn - Connexion, signOut - Déconnexion, clearError - Effacer erreur
 * @events Écoute automatiquement les événements d'auth du service
 * @usage const { user, signIn, signOut, isLoading, error } = useAuth();
 */

import { useState, useEffect, useCallback } from 'react';
import { googleAuthService, GoogleUser } from '@/shared/services/googleAuthService';

export interface AuthState {
  user: GoogleUser | null;
  isLoading: boolean;
  error: string | null;
  isSignedIn: boolean;
}

export interface AuthActions {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => void;
}

export type UseAuthReturn = AuthState & AuthActions;

/**
 * Hook personnalisé pour l'authentification Google
 * 
 * Fonctionnalités :
 * - Gestion de l'état utilisateur connecté/déconnecté
 * - Méthodes de connexion/déconnexion async
 * - Gestion des erreurs d'authentification
 * - États de chargement pendant les opérations
 * - Écoute automatique des événements d'auth
 * - Persistance automatique de l'état
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // État dérivé pour la connexion
  const isSignedIn = user !== null;

  /**
   * Initialise l'état utilisateur au montage du hook
   */
  useEffect(() => {
    console.log('🔐 [USE_AUTH] Initialisation du hook d\'authentification');
    
    // Récupérer l'utilisateur actuel depuis le service
    const currentUser = googleAuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      console.log('✅ [USE_AUTH] Utilisateur existant récupéré:', currentUser.name);
    }
  }, []);

  /**
   * Écoute les événements d'authentification du service
   */
  useEffect(() => {
    const handleSignIn = (event: CustomEvent) => {
      const { user } = event.detail;
      console.log('🔐 [USE_AUTH] Événement connexion reçu:', user.name);
      setUser(user);
      setError(null);
      setIsLoading(false);
    };

    const handleSignOut = () => {
      console.log('🔓 [USE_AUTH] Événement déconnexion reçu');
      setUser(null);
      setError(null);
      setIsLoading(false);
    };

    // Ajouter les listeners d'événements
    window.addEventListener('google-auth-signin', handleSignIn as EventListener);
    window.addEventListener('google-auth-signout', handleSignOut as EventListener);

    // Cleanup au démontage
    return () => {
      window.removeEventListener('google-auth-signin', handleSignIn as EventListener);
      window.removeEventListener('google-auth-signout', handleSignOut as EventListener);
    };
  }, []);

  /**
   * Connexion Google avec gestion d'erreurs
   */
  const signIn = useCallback(async (): Promise<void> => {
    if (isLoading) {
      console.log('⚠️ [USE_AUTH] Connexion déjà en cours, ignorée');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log('🔐 [USE_AUTH] Début processus connexion Google');
      
      const authenticatedUser = await googleAuthService.signIn();
      console.log('✅ [USE_AUTH] Connexion réussie via service:', authenticatedUser.name);
      
      // L'état sera mis à jour via l'événement du service
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion inconnue';
      console.error('❌ [USE_AUTH] Erreur connexion:', errorMessage);
      
      setError(errorMessage);
      setIsLoading(false);
      
      // Messages d'erreur utilisateur plus clairs
      if (errorMessage.includes('Popup')) {
        setError('Veuillez autoriser les popups pour vous connecter avec Google');
      } else if (errorMessage.includes('cancelled') || errorMessage.includes('annulée')) {
        setError('Connexion annulée');
      } else if (errorMessage.includes('Timeout')) {
        setError('Délai de connexion dépassé. Veuillez réessayer.');
      } else {
        setError('Erreur lors de la connexion Google. Veuillez réessayer.');
      }
    }
  }, [isLoading]);

  /**
   * Déconnexion Google avec gestion d'erreurs
   */
  const signOut = useCallback(async (): Promise<void> => {
    if (isLoading) {
      console.log('⚠️ [USE_AUTH] Déconnexion déjà en cours, ignorée');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log('🔓 [USE_AUTH] Début processus déconnexion');
      
      await googleAuthService.signOut();
      console.log('✅ [USE_AUTH] Déconnexion réussie via service');
      
      // L'état sera mis à jour via l'événement du service
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur de déconnexion inconnue';
      console.error('❌ [USE_AUTH] Erreur déconnexion:', errorMessage);
      
      setError('Erreur lors de la déconnexion. Veuillez réessayer.');
      setIsLoading(false);
    }
  }, [isLoading]);

  /**
   * Efface l'erreur actuelle
   */
  const clearError = useCallback((): void => {
    setError(null);
    console.log('🧹 [USE_AUTH] Erreur effacée');
  }, []);

  /**
   * Actualise l'utilisateur depuis le service
   */
  const refreshUser = useCallback((): void => {
    const currentUser = googleAuthService.getCurrentUser();
    setUser(currentUser);
    console.log('🔄 [USE_AUTH] Utilisateur actualisé:', currentUser?.name || 'aucun');
  }, []);

  // Log des changements d'état en développement
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 [USE_AUTH] État mis à jour:', {
        isSignedIn,
        userName: user?.name || 'non connecté',
        isLoading,
        hasError: !!error
      });
    }
  }, [user, isLoading, error, isSignedIn]);

  return {
    // État
    user,
    isLoading,
    error,
    isSignedIn,
    
    // Actions
    signIn,
    signOut,
    clearError,
    refreshUser
  };
}