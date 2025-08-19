/**
 * @fileoverview Types TypeScript pour l'API Electron
 * @description Interfaces et types pour la communication sécurisée entre processus
 * @types ElectronAPI, SystemInfo, AppControls, FileSystemAPI
 * @interfaces Communication IPC typée et sécurisée
 * @enums Statuts d'opération et codes d'erreur
 * @unions Types d'événements et de réponses
 * @validation Validation des données IPC
 * @usage Utilisé dans App.tsx, preload.ts, main.ts
 * @related src/electron/preload/preload.ts, window.electronAPI
 */

/**
 * Informations sur les versions du système
 */
export interface SystemVersions {
  electron: string;
  node: string;
  chrome: string;
}

/**
 * Informations système globales
 */
export interface SystemInfo {
  versions: SystemVersions;
  platform: NodeJS.Platform;
  arch: string;
}

/**
 * API de contrôle de l'application
 */
export interface AppControls {
  closeApp: () => Promise<void>;
  minimizeApp: () => Promise<void>;
  maximizeApp: () => Promise<void>;
  restoreApp: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
}

/**
 * API du système de fichiers (future implémentation)
 */
export interface FileSystemAPI {
  selectFolder: () => Promise<string | null>;
  readDirectory: (path: string) => Promise<string[]>;
  getFileStats: (path: string) => Promise<FileStats>;
  watchDirectory: (path: string, callback: (event: FileWatchEvent) => void) => Promise<void>;
}

/**
 * Statistiques d'un fichier ou dossier
 */
export interface FileStats {
  path: string;
  name: string;
  size: number;
  isDirectory: boolean;
  isFile: boolean;
  birthtime: Date;
  mtime: Date;
  atime: Date;
}

/**
 * Événement de surveillance de fichier
 */
export interface FileWatchEvent {
  eventType: 'add' | 'change' | 'delete';
  filename: string;
  fullPath: string;
  stats?: FileStats;
}

/**
 * API de notifications système
 */
export interface NotificationAPI {
  showNotification: (title: string, body: string, icon?: string) => Promise<void>;
  showErrorDialog: (title: string, message: string) => Promise<void>;
  showInfoDialog: (title: string, message: string) => Promise<void>;
  showWarningDialog: (title: string, message: string) => Promise<void>;
}

/**
 * API des préférences utilisateur
 */
export interface PreferencesAPI {
  getTheme: () => Promise<'light' | 'dark' | 'system'>;
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
  getPreference: <T = any>(key: string) => Promise<T | null>;
  setPreference: <T = any>(key: string, value: T) => Promise<void>;
}

/**
 * API de développement (disponible uniquement en mode dev)
 */
export interface DevelopmentAPI {
  isDevMode: () => boolean;
  openDevTools: () => Promise<void>;
  reloadApp: () => Promise<void>;
  clearCache: () => Promise<void>;
}

/**
 * Interface principale de l'API Electron exposée au renderer
 * Cette interface est implémentée dans le script preload via contextBridge
 */
export interface ElectronAPI {
  // Informations système
  getVersions: () => Promise<SystemVersions>;
  getSystemInfo: () => Promise<SystemInfo>;

  // Contrôles de l'application
  app: AppControls;

  // Système de fichiers
  fileSystem: FileSystemAPI;

  // Notifications
  notifications: NotificationAPI;

  // Préférences
  preferences: PreferencesAPI;

  // Développement (optionnel)
  development?: DevelopmentAPI;
}

/**
 * Déclaration globale pour TypeScript
 * Permet d'utiliser window.electronAPI avec les types appropriés
 */
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
