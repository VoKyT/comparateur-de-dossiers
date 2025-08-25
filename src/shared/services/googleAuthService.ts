/**
 * @fileoverview Service d'authentification Google moderne
 * @description Interface centralisée pour l'authentification Google via Google Identity Services
 * @dependencies Google Identity Services API (via script CDN)
 * @methods signIn - Connexion Google, signOut - Déconnexion, getCurrentUser - Utilisateur actuel
 * @types GoogleUser - Données utilisateur Google, GoogleAuthConfig - Configuration OAuth
 * @security OAuth 2.0 avec tokens côté client uniquement pour info profil
 */

// Types pour l'authentification Google
export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale?: string;
  hd?: string; // Domain pour Google Workspace
}

export interface GoogleAuthConfig {
  clientId: string;
  scopes: string[];
  cookiePolicy: string;
}

export interface GoogleAuthResponse {
  credential: string;
  select_by: string;
}

// Configuration Google Auth par défaut
const DEFAULT_CONFIG: GoogleAuthConfig = {
  clientId: 'DEMO_MODE', // Mode démo - Remplacer par votre vrai Client ID Google
  scopes: ['profile', 'email'],
  cookiePolicy: 'single_host_origin'
};

class GoogleAuthService {
  private config: GoogleAuthConfig;
  private currentUser: GoogleUser | null = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.config = { ...DEFAULT_CONFIG };
  }

  /**
   * Initialise Google Identity Services
   * Charge le script Google et configure l'OAuth (sauf en mode démo)
   */
  private async initialize(): Promise<void> {
    // Skip initialisation en mode démo
    if (this.config.clientId === 'DEMO_MODE') {
      console.log('🎭 [GOOGLE_AUTH] Mode démo - Skip initialisation Google Services');
      this.isInitialized = true;
      return Promise.resolve();
    }

    if (this.isInitialized) return;
    
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      try {
        // Vérifier si Google Identity Services est déjà chargé
        if (window.google?.accounts) {
          this.configureGoogleAuth();
          this.isInitialized = true;
          console.log('🔐 [GOOGLE_AUTH] Google Identity Services déjà disponible');
          resolve();
          return;
        }

        // Charger le script Google Identity Services
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        
        script.onload = () => {
          try {
            // Attendre que google.accounts soit disponible
            const checkGoogle = () => {
              if (window.google?.accounts) {
                this.configureGoogleAuth();
                this.isInitialized = true;
                console.log('✅ [GOOGLE_AUTH] Google Identity Services initialisé');
                resolve();
              } else {
                setTimeout(checkGoogle, 50);
              }
            };
            checkGoogle();
          } catch (error) {
            console.error('❌ [GOOGLE_AUTH] Erreur configuration après chargement script:', error);
            reject(error);
          }
        };
        
        script.onerror = () => {
          console.error('❌ [GOOGLE_AUTH] Erreur chargement script Google Identity Services');
          reject(new Error('Impossible de charger Google Identity Services'));
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('❌ [GOOGLE_AUTH] Erreur initialisation:', error);
        reject(error);
      }
    });

    return this.initPromise;
  }

  /**
   * Configure l'authentification Google
   */
  private configureGoogleAuth(): void {
    if (!window.google?.accounts?.id) {
      throw new Error('Google Identity Services non disponible');
    }

    try {
      window.google.accounts.id.initialize({
        client_id: this.config.clientId,
        callback: this.handleCredentialResponse.bind(this),
        cancel_on_tap_outside: false,
        auto_select: false
      });

      console.log('🔧 [GOOGLE_AUTH] Configuration Google Identity Services terminée');
    } catch (error) {
      console.error('❌ [GOOGLE_AUTH] Erreur configuration Google Auth:', error);
      throw error;
    }
  }

  /**
   * Gère la réponse d'authentification Google
   */
  private async handleCredentialResponse(response: GoogleAuthResponse): Promise<void> {
    try {
      console.log('🔐 [GOOGLE_AUTH] Traitement réponse d\'authentification');
      
      // Décoder le JWT token pour récupérer les infos utilisateur
      const payload = this.parseJwt(response.credential);
      
      if (!payload) {
        throw new Error('Token invalide');
      }

      // Créer l'objet utilisateur
      this.currentUser = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        given_name: payload.given_name,
        family_name: payload.family_name,
        picture: payload.picture,
        locale: payload.locale,
        hd: payload.hd
      };

      console.log('✅ [GOOGLE_AUTH] Utilisateur connecté:', this.currentUser.name, this.currentUser.email);
      
      // Déclencher l'événement de connexion
      this.dispatchAuthEvent('signin', this.currentUser);
      
    } catch (error) {
      console.error('❌ [GOOGLE_AUTH] Erreur traitement réponse auth:', error);
      throw new Error('Erreur lors de l\'authentification Google');
    }
  }

  /**
   * Parse un JWT token pour récupérer le payload
   */
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('❌ [GOOGLE_AUTH] Erreur parsing JWT:', error);
      return null;
    }
  }

  /**
   * Déclenche un événement personnalisé d'authentification
   */
  private dispatchAuthEvent(type: 'signin' | 'signout', user?: GoogleUser): void {
    const event = new CustomEvent(`google-auth-${type}`, {
      detail: { user }
    });
    window.dispatchEvent(event);
  }

  /**
   * Connexion Google - Mode démo ou vraie connexion
   */
  async signIn(): Promise<GoogleUser> {
    try {
      console.log('🔐 [GOOGLE_AUTH] Tentative de connexion Google');
      
      // Mode démo pour test sans vrai Client ID
      if (this.config.clientId === 'DEMO_MODE') {
        console.log('🎭 [GOOGLE_AUTH] Mode démo activé - Simulation utilisateur');
        
        // Simuler un délai de connexion réaliste
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Utilisateur de démonstration
        const demoUser: GoogleUser = {
          id: 'demo_user_123',
          email: 'demo@example.com',
          name: 'John Doe',
          given_name: 'John',
          family_name: 'Doe',
          picture: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSI0OCIgZmlsbD0iIzQyODVGNCIvPjx0ZXh0IHg9IjQ4IiB5PSI1OCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5KREQ8L3RleHQ+PC9zdmc+',
          locale: 'fr'
        };
        
        this.currentUser = demoUser;
        console.log('✅ [GOOGLE_AUTH] Connexion démo réussie:', demoUser.name);
        
        // Déclencher l'événement de connexion
        this.dispatchAuthEvent('signin', demoUser);
        
        return demoUser;
      }
      
      // Mode production avec vrai Client ID
      await this.initialize();
      
      if (!window.google?.accounts?.id) {
        throw new Error('Google Identity Services non initialisé');
      }

      return new Promise((resolve, reject) => {
        // Timeout pour éviter l'attente infinie
        const timeout = setTimeout(() => {
          reject(new Error('Timeout de connexion Google'));
        }, 30000);

        // Écouter l'événement de connexion réussie
        const handleSignIn = (event: CustomEvent) => {
          clearTimeout(timeout);
          window.removeEventListener('google-auth-signin', handleSignIn as EventListener);
          resolve(event.detail.user);
        };

        window.addEventListener('google-auth-signin', handleSignIn as EventListener);
        
        // Déclencher la popup de connexion Google
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.log('⚠️ [GOOGLE_AUTH] Popup bloquée, tentative avec renderButton');
            clearTimeout(timeout);
            window.removeEventListener('google-auth-signin', handleSignIn as EventListener);
            reject(new Error('Popup de connexion bloquée. Veuillez autoriser les popups.'));
          } else if (notification.isSkippedMoment()) {
            console.log('⚠️ [GOOGLE_AUTH] Connexion sautée par l\'utilisateur');
            clearTimeout(timeout);
            window.removeEventListener('google-auth-signin', handleSignIn as EventListener);
            reject(new Error('Connexion annulée par l\'utilisateur'));
          }
        });
      });
      
    } catch (error) {
      console.error('❌ [GOOGLE_AUTH] Erreur connexion Google:', error);
      throw error instanceof Error ? error : new Error('Erreur lors de la connexion Google');
    }
  }

  /**
   * Déconnexion Google
   */
  async signOut(): Promise<void> {
    try {
      console.log('🔓 [GOOGLE_AUTH] Tentative de déconnexion');
      
      if (!this.currentUser) {
        console.log('ℹ️ [GOOGLE_AUTH] Aucun utilisateur connecté');
        return;
      }

      // Révoquer les tokens Google si disponible
      if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
      }

      const userName = this.currentUser.name;
      this.currentUser = null;
      
      console.log('✅ [GOOGLE_AUTH] Déconnexion réussie pour:', userName);
      
      // Déclencher l'événement de déconnexion
      this.dispatchAuthEvent('signout');
      
    } catch (error) {
      console.error('❌ [GOOGLE_AUTH] Erreur déconnexion:', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  }

  /**
   * Récupère l'utilisateur actuellement connecté
   */
  getCurrentUser(): GoogleUser | null {
    return this.currentUser;
  }

  /**
   * Vérifie si un utilisateur est connecté
   */
  isSignedIn(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Met à jour la configuration
   */
  updateConfig(config: Partial<GoogleAuthConfig>): void {
    this.config = { ...this.config, ...config };
    this.isInitialized = false;
    this.initPromise = null;
    console.log('🔧 [GOOGLE_AUTH] Configuration mise à jour');
  }

  /**
   * Teste la configuration actuelle
   */
  async testConfiguration(): Promise<boolean> {
    try {
      await this.initialize();
      return window.google?.accounts?.id ? true : false;
    } catch (error) {
      console.error('❌ [GOOGLE_AUTH] Test configuration échoué:', error);
      return false;
    }
  }
}

// Instance singleton du service
export const googleAuthService = new GoogleAuthService();

// Export pour tests et configuration
export { GoogleAuthService };