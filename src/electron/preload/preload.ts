/**
 * @fileoverview Script preload TypeScript pour communication sécurisée entre processus
 * @description Expose une API typée et sécurisée au renderer process via contextBridge
 * @security contextIsolation activé, nodeIntegration désactivé, APIs validées
 * @ipc Channels IPC sécurisés avec validation des données
 * @apis APIs système exposées: versions, fileSystem, app, notifications, preferences
 * @lifecycle Chargé avant le renderer, configure l'environnement sécurisé
 * @dependencies electron (contextBridge, ipcRenderer)
 * @related src/electron/main/main.ts, src/shared/types/electron.ts
 */

import { contextBridge, ipcRenderer } from 'electron';
import type { 
  ElectronAPI, 
  SystemVersions, 
  SystemInfo, 
  FileStats,
  FileWatchEvent
} from '../../shared/types/electron';

/**
 * API exposée au renderer process de manière sécurisée
 * Implémente l'interface ElectronAPI avec validation des paramètres
 */
const electronAPI: ElectronAPI = {
  // === Informations système ===
  
  /**
   * Récupère les versions des composants du système
   */
  getVersions: async (): Promise<SystemVersions> => {
    return {
      electron: process.versions.electron,
      node: process.versions.node,
      chrome: process.versions.chrome
    };
  },

  /**
   * Récupère les informations complètes du système
   */
  getSystemInfo: async (): Promise<SystemInfo> => {
    return {
      versions: {
        electron: process.versions.electron,
        node: process.versions.node,
        chrome: process.versions.chrome
      },
      platform: process.platform,
      arch: process.arch
    };
  },

  // === Contrôles de l'application ===
  
  app: {
    closeApp: async (): Promise<void> => {
      await ipcRenderer.invoke('app:close');
    },

    minimizeApp: async (): Promise<void> => {
      await ipcRenderer.invoke('window:minimize');
    },

    maximizeApp: async (): Promise<void> => {
      await ipcRenderer.invoke('window:maximize');
    },

    restoreApp: async (): Promise<void> => {
      await ipcRenderer.invoke('window:restore');
    },

    isMaximized: async (): Promise<boolean> => {
      return await ipcRenderer.invoke('window:is-maximized');
    }
  },

  // === Système de fichiers ===
  
  fileSystem: {
    selectFolder: async (): Promise<string | null> => {
      try {
        const result = await ipcRenderer.invoke('dialog:select-folder');
        return typeof result === 'string' ? result : null;
      } catch (error) {
        console.error('Erreur lors de la sélection du dossier:', error);
        return null;
      }
    },

    readDirectory: async (path: string): Promise<string[]> => {
      if (!path || typeof path !== 'string') {
        throw new Error('Le chemin doit être une chaîne de caractères non vide');
      }
      
      try {
        const result = await ipcRenderer.invoke('fs:read-directory', path);
        return Array.isArray(result) ? result : [];
      } catch (error) {
        console.error('Erreur lors de la lecture du dossier:', error);
        return [];
      }
    },

    getFileStats: async (path: string): Promise<FileStats> => {
      if (!path || typeof path !== 'string') {
        throw new Error('Le chemin doit être une chaîne de caractères non vide');
      }
      
      return await ipcRenderer.invoke('fs:get-file-stats', path);
    },

    watchDirectory: async (
      path: string, 
      callback: (event: FileWatchEvent) => void
    ): Promise<void> => {
      if (!path || typeof path !== 'string') {
        throw new Error('Le chemin doit être une chaîne de caractères non vide');
      }
      
      if (typeof callback !== 'function') {
        throw new Error('Le callback doit être une fonction');
      }

      // Écouter les événements de surveillance
      const handler = (_event: Electron.IpcRendererEvent, fileEvent: FileWatchEvent) => {
        callback(fileEvent);
      };

      ipcRenderer.on(`fs:directory-watch:${path}`, handler);
      
      // Démarrer la surveillance
      await ipcRenderer.invoke('fs:watch-directory', path);
    }
  },

  // === Système de notifications ===
  
  notifications: {
    showNotification: async (title: string, body: string, icon?: string): Promise<void> => {
      if (!title || typeof title !== 'string') {
        throw new Error('Le titre de la notification est requis');
      }
      
      if (!body || typeof body !== 'string') {
        throw new Error('Le corps de la notification est requis');
      }

      await ipcRenderer.invoke('notification:show', { title, body, icon });
    },

    showErrorDialog: async (title: string, message: string): Promise<void> => {
      await ipcRenderer.invoke('dialog:error', { title, message });
    },

    showInfoDialog: async (title: string, message: string): Promise<void> => {
      await ipcRenderer.invoke('dialog:info', { title, message });
    },

    showWarningDialog: async (title: string, message: string): Promise<void> => {
      await ipcRenderer.invoke('dialog:warning', { title, message });
    }
  },

  // === Préférences utilisateur ===
  
  preferences: {
    getTheme: async (): Promise<'light' | 'dark' | 'system'> => {
      const theme = await ipcRenderer.invoke('preferences:get-theme');
      return ['light', 'dark', 'system'].includes(theme) ? theme : 'system';
    },

    setTheme: async (theme: 'light' | 'dark' | 'system'): Promise<void> => {
      if (!['light', 'dark', 'system'].includes(theme)) {
        throw new Error('Thème invalide. Valeurs acceptées: light, dark, system');
      }
      
      await ipcRenderer.invoke('preferences:set-theme', theme);
    },

    getPreference: async <T = any>(key: string): Promise<T | null> => {
      if (!key || typeof key !== 'string') {
        throw new Error('La clé de préférence doit être une chaîne non vide');
      }
      
      return await ipcRenderer.invoke('preferences:get', key);
    },

    setPreference: async <T = any>(key: string, value: T): Promise<void> => {
      if (!key || typeof key !== 'string') {
        throw new Error('La clé de préférence doit être une chaîne non vide');
      }
      
      await ipcRenderer.invoke('preferences:set', key, value);
    }
  }
};

// Ajouter l'API de développement uniquement en mode développement
if (process.env.NODE_ENV === 'development') {
  electronAPI.development = {
    isDevMode: (): boolean => process.env.NODE_ENV === 'development',

    openDevTools: async (): Promise<void> => {
      await ipcRenderer.invoke('dev:open-devtools');
    },

    reloadApp: async (): Promise<void> => {
      await ipcRenderer.invoke('dev:reload');
    },

    clearCache: async (): Promise<void> => {
      await ipcRenderer.invoke('dev:clear-cache');
    }
  };
}

/**
 * Exposition sécurisée de l'API via contextBridge
 */
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

/**
 * Gestion des erreurs globales du preload script
 */
process.on('uncaughtException', (error: Error) => {
  console.error('🚨 Erreur non gérée dans le preload script:', error.name, error.message);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('🚨 Promise rejetée non gérée dans le preload:', reason);
});

/**
 * Vérification de sécurité et initialisation
 */
(() => {
  // Log de démarrage sécurisé
  console.log('🔧 Preload script TypeScript initialisé - API Electron exposée de manière sécurisée');

  // Vérification de l'isolation du contexte
  if (typeof window !== 'undefined') {
    // Ces propriétés ne devraient pas être accessibles dans un environnement sécurisé
    const dangerousProps = ['require', 'exports', 'module', '__dirname', '__filename'];
    
    dangerousProps.forEach(prop => {
      if (prop in window) {
        console.warn(`⚠️ Propriété potentiellement dangereuse détectée: ${prop}`);
      }
    });
  }

  // Validation de la configuration de sécurité
  if (process.contextIsolated !== true) {
    console.error('🚨 SÉCURITÉ: contextIsolation n\'est pas activé');
  }

  if (process.sandboxed !== true && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ SÉCURITÉ: Le sandbox n\'est pas activé en production');
  }
})();
