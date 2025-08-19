/**
 * @fileoverview Script preload pour la communication sécurisée entre processus
 * @description Expose une API sécurisée au renderer process via contextBridge
 * @author Comparateur de dossiers
 * @created 2025-08-19
 * @lastModified 2025-08-19
 * @dependencies electron (contextBridge, ipcRenderer)
 * @exports window.electronAPI (API sécurisée pour le renderer)
 * @imports electron
 * @usage Chargé automatiquement par Electron dans le renderer process
 * @related src/electron/main/main.js, src/electron/renderer/index.html
 * @notes Utilise contextBridge pour une isolation sécurisée du contexte
 */

const { contextBridge, ipcRenderer } = require('electron');

/**
 * API exposée au renderer process de manière sécurisée
 * Utilise contextBridge pour éviter l'exposition directe de Node.js
 */
contextBridge.exposeInMainWorld('electronAPI', {
  
  // Informations système et application
  versions: {
    /**
     * Récupère les versions des composants
     * @returns {Object} Versions de Node.js, Chromium, Electron
     */
    getVersions: () => process.versions,
    
    /**
     * Récupère le nom de la plateforme
     * @returns {string} Nom de la plateforme (win32, darwin, linux)
     */
    getPlatform: () => process.platform,
    
    /**
     * Récupère l'architecture du système
     * @returns {string} Architecture (x64, arm64, etc.)
     */
    getArch: () => process.arch
  },

  // Gestion des fichiers et dossiers (prêt pour l'implémentation future)
  fileSystem: {
    /**
     * Sélectionner un dossier (placeholder pour future implémentation)
     * @returns {Promise<string|null>} Chemin du dossier sélectionné ou null
     */
    selectFolder: async () => {
      // TODO: Implémenter avec dialog.showOpenDialog
      return await ipcRenderer.invoke('dialog:select-folder');
    },

    /**
     * Lire le contenu d'un dossier (placeholder)
     * @param {string} folderPath - Chemin du dossier à lire
     * @returns {Promise<Array>} Liste des fichiers et dossiers
     */
    readFolder: async (folderPath) => {
      // TODO: Implémenter la lecture de dossier
      return await ipcRenderer.invoke('fs:read-folder', folderPath);
    },

    /**
     * Comparer deux dossiers (placeholder)
     * @param {string} folder1 - Chemin du premier dossier
     * @param {string} folder2 - Chemin du deuxième dossier
     * @returns {Promise<Object>} Résultat de la comparaison
     */
    compareFolders: async (folder1, folder2) => {
      // TODO: Implémenter la comparaison
      return await ipcRenderer.invoke('fs:compare-folders', folder1, folder2);
    }
  },

  // Communication avec le processus principal
  app: {
    /**
     * Quitter l'application
     * @returns {void}
     */
    quit: () => {
      ipcRenderer.send('app:quit');
    },

    /**
     * Minimiser la fenêtre
     * @returns {void}
     */
    minimize: () => {
      ipcRenderer.send('window:minimize');
    },

    /**
     * Maximiser/restaurer la fenêtre
     * @returns {void}
     */
    toggleMaximize: () => {
      ipcRenderer.send('window:toggle-maximize');
    },

    /**
     * Fermer la fenêtre
     * @returns {void}
     */
    close: () => {
      ipcRenderer.send('window:close');
    }
  },

  // Système de notifications (pour les futures fonctionnalités)
  notifications: {
    /**
     * Afficher une notification système
     * @param {string} title - Titre de la notification
     * @param {string} body - Corps de la notification
     * @returns {void}
     */
    show: (title, body) => {
      ipcRenderer.send('notification:show', { title, body });
    }
  },

  // Gestion des thèmes et préférences
  preferences: {
    /**
     * Obtenir le thème actuel du système
     * @returns {Promise<string>} 'light' ou 'dark'
     */
    getTheme: async () => {
      return await ipcRenderer.invoke('preferences:get-theme');
    },

    /**
     * Écouter les changements de thème
     * @param {Function} callback - Fonction appelée lors du changement
     * @returns {Function} Fonction de désabonnement
     */
    onThemeChanged: (callback) => {
      const handler = (event, theme) => callback(theme);
      ipcRenderer.on('preferences:theme-changed', handler);
      
      // Retourner une fonction de cleanup
      return () => {
        ipcRenderer.removeListener('preferences:theme-changed', handler);
      };
    }
  },

  // Utilitaires de développement
  development: {
    /**
     * Ouvrir les DevTools
     * @returns {void}
     */
    openDevTools: () => {
      ipcRenderer.send('dev:open-devtools');
    },

    /**
     * Actualiser la fenêtre
     * @returns {void}
     */
    reload: () => {
      ipcRenderer.send('dev:reload');
    },

    /**
     * Basculer en mode plein écran
     * @returns {void}
     */
    toggleFullscreen: () => {
      ipcRenderer.send('window:toggle-fullscreen');
    }
  }
});

/**
 * Gestion des erreurs du preload script
 */
process.on('uncaughtException', (error) => {
  console.error('Erreur non gérée dans le preload script:', error);
});

/**
 * Log de démarrage du preload
 */
console.log('🔧 Preload script chargé - API Electron exposée de manière sécurisée');

/**
 * Vérification de la sécurité : s'assurer que Node.js n'est pas accessible dans le renderer
 */
if (typeof window !== 'undefined') {
  // Bloquer l'accès direct à des APIs dangereuses
  delete window.require;
  delete window.exports;
  delete window.module;
}
