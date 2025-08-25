/**
 * @fileoverview Déclarations TypeScript pour Google Identity Services
 * @description Types pour l'API Google Identity Services utilisée dans googleAuthService
 */

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
            cancel_on_tap_outside?: boolean;
            auto_select?: boolean;
          }) => void;
          prompt: (callback?: (notification: any) => void) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          disableAutoSelect: () => void;
          cancel: () => void;
          revoke: (email: string, callback: (response: any) => void) => void;
        };
        oauth2?: {
          initTokenClient: (config: any) => any;
          hasGrantedAnyScope: (tokenResponse: any, ...scopes: string[]) => boolean;
          hasGrantedAllScopes: (tokenResponse: any, ...scopes: string[]) => boolean;
        };
      };
    };
  }

  interface GoogleAccountsNotification {
    isDisplayed: () => boolean;
    isNotDisplayed: () => boolean;
    getNotDisplayedReason: () => string;
    isSkippedMoment: () => boolean;
    getSkippedReason: () => string;
    isDismissedMoment: () => boolean;
    getDismissedReason: () => string;
  }
}