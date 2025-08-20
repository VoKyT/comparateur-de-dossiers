/**
 * @fileoverview Process principal Electron JavaScript pour le comparateur de dossiers
 * @description Gère la création de la fenêtre principale et les handlers IPC sécurisés
 * @security Configuration sécurisée: contextIsolation, nodeIntegration désactivé
 * @ipc Handlers IPC pour communication avec le renderer process
 * @apis Gestion des fenêtres, notifications, système de fichiers, préférences
 * @lifecycle Point d'entrée principal de l'application Electron
 * @dependencies electron (app, BrowserWindow, Menu, ipcMain, dialog, nativeTheme)
 * @related src/electron/preload/preload.js, src/electron/renderer/
 */

const { 
  app, 
  BrowserWindow, 
  Menu, 
  ipcMain, 
  dialog,
  nativeTheme,
  Notification,
  shell
} = require('electron');
const path = require('path');
const fs = require('fs/promises');
// const { promisify } = require('util'); // Pour usage futur

/**
 * Fenêtre principale de l'application
 */
let mainWindow = null;

/**
 * Crée la fenêtre principale de l'application avec configuration sécurisée
 */
function createMainWindow() {
  // Configuration sécurisée de la fenêtre principale
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Comparateur de Dossiers',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    icon: getAppIcon(), // Icône adaptée à la plateforme
    webPreferences: {
      // Configuration de sécurité renforcée
      nodeIntegration: false,              // Désactive Node.js dans le renderer
      contextIsolation: true,             // Isolation complète du contexte
      allowRunningInsecureContent: false, // Empêche le contenu non sécurisé
      webSecurity: true,                  // Active la sécurité web
      preload: path.join(__dirname, '../preload/preload.js'), // Script preload
      sandbox: process.env.NODE_ENV === 'production' // Sandbox en production
    },
    show: false // Affichage différé après le chargement
  });

  // Chemin vers le fichier HTML principal
  const rendererPath = path.join(__dirname, '../renderer/index.html');
  
  // Chargement de l'interface utilisateur
  mainWindow.loadFile(rendererPath);

  // Affichage sécurisé de la fenêtre
  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) return;
    
    mainWindow.show();
    
    // Outils de développement en mode dev
    if (isDevelopmentMode()) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  // Gestion de la fermeture
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Sécurité : empêcher la navigation externe
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    // Autoriser uniquement les protocoles file et data
    if (!['file:', 'data:'].includes(parsedUrl.protocol)) {
      event.preventDefault();
      console.warn('🛡️ Navigation externe bloquée:', navigationUrl);
    }
  });

  // Sécurité : empêcher l'ouverture de nouvelles fenêtres
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Ouvrir les liens externes dans le navigateur par défaut
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

/**
 * Obtient le chemin de l'icône adaptée à la plateforme
 */
function getAppIcon() {
  const assetsPath = path.join(__dirname, '../../../assets');
  
  // Retourner l'icône selon la plateforme
  switch (process.platform) {
    case 'win32':
      return path.join(assetsPath, 'icon.ico');
    case 'darwin':
      return path.join(assetsPath, 'icon.icns');
    default:
      return path.join(assetsPath, 'icon.png');
  }
}

/**
 * Vérifie si l'application est en mode développement
 */
function isDevelopmentMode() {
  return process.env.NODE_ENV === 'development';
}

/**
 * Configuration du menu de l'application
 */
function createApplicationMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    // Menu Application (macOS uniquement)
    ...(isMac ? [{
      label: app.getName(),
      submenu: [
        { role: 'about', label: 'À propos de ' + app.getName() },
        { type: 'separator' },
        { role: 'services', label: 'Services' },
        { type: 'separator' },
        { role: 'hide', label: 'Masquer ' + app.getName() },
        { role: 'hideOthers', label: 'Masquer les autres' },
        { role: 'unhide', label: 'Tout afficher' },
        { type: 'separator' },
        { role: 'quit', label: 'Quitter ' + app.getName() }
      ]
    }] : []),

    // Menu Fichier
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Nouvelle comparaison',
          accelerator: 'CmdOrCtrl+N',
          click: async () => {
            // TODO: Implémenter nouvelle comparaison
            if (mainWindow) {
              mainWindow.webContents.send('menu:new-comparison');
            }
          }
        },
        { type: 'separator' },
        isMac ? { role: 'close', label: 'Fermer' } : { role: 'quit', label: 'Quitter' }
      ]
    },

    // Menu Édition
    {
      label: 'Édition',
      submenu: [
        { role: 'undo', label: 'Annuler' },
        { role: 'redo', label: 'Rétablir' },
        { type: 'separator' },
        { role: 'cut', label: 'Couper' },
        { role: 'copy', label: 'Copier' },
        { role: 'paste', label: 'Coller' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle', label: 'Coller et adapter le style' },
          { role: 'delete', label: 'Supprimer' },
          { role: 'selectAll', label: 'Tout sélectionner' }
        ] : [
          { role: 'delete', label: 'Supprimer' },
          { type: 'separator' },
          { role: 'selectAll', label: 'Tout sélectionner' }
        ])
      ]
    },

    // Menu Affichage
    {
      label: 'Affichage',
      submenu: [
        { role: 'reload', label: 'Actualiser' },
        { role: 'forceReload', label: 'Actualiser (forcé)' },
        { role: 'toggleDevTools', label: 'Outils de développement' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Taille normale' },
        { role: 'zoomIn', label: 'Agrandir' },
        { role: 'zoomOut', label: 'Réduire' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Plein écran' }
      ]
    },

    // Menu Fenêtre
    {
      label: 'Fenêtre',
      submenu: [
        { role: 'minimize', label: 'Réduire' },
        { role: 'close', label: 'Fermer' }
      ]
    },

    // Menu Aide
    {
      label: 'Aide',
      submenu: [
        {
          label: 'À propos',
          click: async () => {
            await dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'À propos',
              message: 'Comparateur de Dossiers',
              detail: `Version: ${app.getVersion()}\nElectron: ${process.versions.electron}\nNode.js: ${process.versions.node}`
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

/**
 * Configuration des handlers IPC sécurisés
 */
function setupIpcHandlers() {
  // === Handlers d'application ===
  
  ipcMain.handle('app:close', async () => {
    app.quit();
  });

  // === Handlers de fenêtre ===
  
  ipcMain.handle('window:minimize', async () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.minimize();
    }
  });

  ipcMain.handle('window:maximize', async () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.handle('window:restore', async () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
    }
  });

  ipcMain.handle('window:is-maximized', async () => {
    return mainWindow ? mainWindow.isMaximized() : false;
  });

  // === Handlers de dialogue ===
  
  ipcMain.handle('dialog:select-folder', async () => {
    if (!mainWindow) return null;
    
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Sélectionner un dossier',
      buttonLabel: 'Sélectionner',
      properties: ['openDirectory']
    });
    
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('dialog:error', async (
    _event, 
    { title, message }
  ) => {
    if (!mainWindow) return;
    
    await dialog.showErrorBox(title, message);
  });

  ipcMain.handle('dialog:info', async (
    _event, 
    { title, message }
  ) => {
    if (!mainWindow) return;
    
    await dialog.showMessageBox(mainWindow, {
      type: 'info',
      title,
      message,
      buttons: ['OK']
    });
  });

  ipcMain.handle('dialog:warning', async (
    _event, 
    { title, message }
  ) => {
    if (!mainWindow) return;
    
    await dialog.showMessageBox(mainWindow, {
      type: 'warning',
      title,
      message,
      buttons: ['OK']
    });
  });

  // === Handlers du système de fichiers ===
  
  ipcMain.handle('fs:read-directory', async (_event, dirPath) => {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries.map(entry => entry.name);
    } catch (error) {
      console.error('Erreur lors de la lecture du dossier:', error);
      throw error;
    }
  });

  ipcMain.handle('fs:get-file-stats', async (_event, filePath) => {
    try {
      const stats = await fs.stat(filePath);
      return {
        path: filePath,
        name: path.basename(filePath),
        size: stats.size,
        isDirectory: stats.isDirectory(),
        isFile: stats.isFile(),
        birthtime: stats.birthtime,
        mtime: stats.mtime,
        atime: stats.atime
      };
    } catch (error) {
      console.error('Erreur lors de la lecture des statistiques:', error);
      throw error;
    }
  });

  // === Handlers de notifications ===
  
  ipcMain.handle('notification:show', async (
    _event, 
    { title, body, icon }
  ) => {
    if (Notification.isSupported()) {
      new Notification({
        title,
        body,
        icon: icon || getAppIcon()
      }).show();
    }
  });

  // === Handlers de préférences ===
  
  ipcMain.handle('preferences:get-theme', async () => {
    return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
  });

  ipcMain.handle('preferences:set-theme', async (_event, theme) => {
    nativeTheme.themeSource = theme;
  });

  // === Handlers de développement ===
  
  if (isDevelopmentMode()) {
    ipcMain.handle('dev:open-devtools', async () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.openDevTools();
      }
    });

    ipcMain.handle('dev:reload', async () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.reload();
      }
    });

    ipcMain.handle('dev:clear-cache', async () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        await mainWindow.webContents.session.clearCache();
      }
    });
  }
}

/**
 * Configuration de la sécurité avancée
 */
function setupSecurityHandlers() {
  // Empêcher la création de nouvelles fenêtres
  app.on('web-contents-created', (_event, contents) => {
    // Sécurité : contrôler la navigation
    contents.on('will-navigate', (navigationEvent, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      
      if (!['file:', 'data:'].includes(parsedUrl.protocol)) {
        navigationEvent.preventDefault();
        console.warn('🛡️ Navigation bloquée:', navigationUrl);
      }
    });

    // Sécurité : empêcher l'ouverture de nouvelles fenêtres
    contents.setWindowOpenHandler(({ url }) => {
      console.log('🛡️ Ouverture de fenêtre bloquée:', url);
      return { action: 'deny' };
    });
  });

  // Protection contre les fuites de données
  app.on('certificate-error', (event, _webContents, url, error, _certificate, callback) => {
    // En production, toujours rejeter les certificats invalides
    if (process.env.NODE_ENV === 'production') {
      event.preventDefault();
      callback(false);
    } else {
      // En développement, logger l'erreur
      console.warn('⚠️ Erreur de certificat:', url, error);
      callback(false);
    }
  });
}

// ===== ÉVÉNEMENTS DU CYCLE DE VIE =====

/**
 * Initialisation de l'application
 */
app.whenReady().then(async () => {
  console.log('🚀 Application Electron initialisée');
  
  // Configuration des handlers
  setupIpcHandlers();
  setupSecurityHandlers();
  
  // Création de l'interface
  createMainWindow();
  createApplicationMenu();

  // Gestion macOS : recréer la fenêtre si activée sans fenêtre ouverte
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

/**
 * Fermeture de toutes les fenêtres
 */
app.on('window-all-closed', () => {
  // Sur macOS, les applications restent actives même sans fenêtre
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * L'application va quitter
 */
app.on('before-quit', () => {
  console.log('🛑 Arrêt de l\'application - Nettoyage en cours...');
  // Nettoyage et sauvegarde si nécessaire
});

/**
 * Sécurité avancée
 */
app.on('web-contents-created', (_event, contents) => {
  // Log des créations de contenu web pour le debug
  if (isDevelopmentMode()) {
    console.log('🌐 Nouveau contenu web créé:', contents.getURL());
  }
});

// Gestion des erreurs globales
process.on('uncaughtException', (error) => {
  console.error('🚨 Erreur non gérée:', error);
  
  // En production, quitter proprement
  if (process.env.NODE_ENV === 'production') {
    app.quit();
  }
});

process.on('unhandledRejection', (reason) => {
  console.error('🚨 Promise rejetée:', reason);
});