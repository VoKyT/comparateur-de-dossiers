/**
 * @fileoverview Process principal Electron TypeScript pour le comparateur de dossiers
 * @description Gère la création de la fenêtre principale et les handlers IPC sécurisés
 * @security Configuration sécurisée: contextIsolation, nodeIntegration désactivé
 * @ipc Handlers IPC pour communication avec le renderer process
 * @apis Gestion des fenêtres, notifications, système de fichiers, préférences
 * @lifecycle Point d'entrée principal de l'application Electron
 * @dependencies electron (app, BrowserWindow, Menu, ipcMain, dialog, nativeTheme)
 * @related src/electron/preload/preload.ts, src/electron/renderer/
 */

import { 
  app, 
  BrowserWindow, 
  Menu, 
  ipcMain, 
  dialog,
  nativeTheme,
  Notification,
  shell
} from 'electron';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

// Définir __dirname pour ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import { promisify } from 'util'; // Pour usage futur

/**
 * Fenêtre principale de l'application
 */
let mainWindow: BrowserWindow | null = null;

/**
 * Crée la fenêtre principale de l'application avec configuration sécurisée
 */
function createMainWindow(): void {
  // Éviter la création de multiples fenêtres
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log('⚠️ [WINDOW] Fenêtre principale existe déjà - pas de création');
    return;
  }
  // Configuration sécurisée de la fenêtre principale
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    title: 'Comparateur de Dossiers',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    icon: getAppIcon(), // Icône adaptée à la plateforme
    webPreferences: {
      // Configuration de sécurité renforcée
      nodeIntegration: false,              // Désactive Node.js dans le renderer
      contextIsolation: true,             // Isolation complète du contexte
      allowRunningInsecureContent: false, // Empêche le contenu non sécurisé
      webSecurity: true,                  // Active la sécurité web
      preload: path.join(__dirname, 'preload.js'), // Script preload
      sandbox: true // Sandbox toujours activé pour la sécurité
    },
    show: true // Affichage direct
  });

  // Chargement de l'interface utilisateur selon l'environnement
  if (isDevelopmentMode()) {
    // En développement : attendre obligatoirement le serveur Vite
    console.log('🔥 [VITE_WAIT_01] Mode développement - Attente du serveur Vite...');
    
    // Attendre que le serveur Vite soit prêt avec logs détaillés
    const waitForViteServer = async () => {
      const maxAttempts = 60; // 30 secondes max
      const retryDelay = 500; // 500ms entre chaque tentative
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          console.log(`🔍 [VITE_WAIT_02] Tentative ${attempt}/${maxAttempts} - Vérification serveur Vite...`);
          
          const response = await fetch('http://localhost:3002', {
            method: 'GET',
            timeout: 2000 // Timeout de 2 secondes
          });
          
          if (response.ok) {
            console.log('✅ [VITE_READY_03] Serveur Vite prêt et accessible !');
            console.log('🌐 [VITE_LOAD_04] Chargement de l\'interface React...');
            
            await mainWindow!.loadURL('http://localhost:3002');
            console.log('✅ [VITE_LOADED_05] Interface React chargée avec succès !');
            return true;
          } else {
            console.log(`⚠️ [VITE_WAIT_06] Serveur répond mais status: ${response.status}`);
          }
        } catch (error) {
          if (attempt % 5 === 0) { // Log détaillé tous les 5 tentatives
            console.log(`⏳ [VITE_WAIT_07] Tentative ${attempt}/${maxAttempts} - Serveur pas encore prêt...`);
          }
        }
        
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
      
      // Si on arrive ici, le serveur n'est jamais devenu prêt
      console.error('❌ [VITE_ERROR_08] ÉCHEC: Impossible de se connecter au serveur Vite après 30 secondes');
      console.error('❌ [VITE_ERROR_09] Vérifiez que "npm run vite:dev" fonctionne correctement');
      
      // Charger une page d'erreur
      const errorHtml = `
        <html>
          <body style="font-family: Arial; padding: 50px; text-align: center; background: #f0f0f0;">
            <h1 style="color: #d32f2f;">⚠️ Erreur de développement</h1>
            <p>Le serveur Vite n'est pas accessible sur localhost:3002</p>
            <p>Veuillez vérifier que la commande <code>npm run dev</code> fonctionne correctement.</p>
            <button onclick="location.reload()" style="padding: 10px 20px; font-size: 16px;">Réessayer</button>
          </body>
        </html>
      `;
      
      await mainWindow!.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHtml)}`);
      return false;
    };
    
    // Lancer l'attente du serveur
    waitForViteServer();
  } else {
    // En production : charger le fichier HTML buildé
    const rendererPath = path.join(__dirname, '../renderer/src/electron/renderer/index.html');
    mainWindow.loadFile(rendererPath);
    console.log('📦 [PROD] Mode production - Fichier HTML statique');
  }

  // Affichage sécurisé de la fenêtre
  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) return;
    
    mainWindow.show();
    console.log('✅ [WINDOW] Fenêtre principale affichée');
  });

  // Gestion de la fermeture
  mainWindow.on('closed', () => {
    console.log('🪟 Fenêtre principale fermée');
    mainWindow = null;
  });

  // Détection si la fenêtre se ferme prématurément
  mainWindow.on('close', (event) => {
    console.log('⚠️ Tentative de fermeture de la fenêtre');
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
function getAppIcon(): string | undefined {
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
function isDevelopmentMode(): boolean {
  // Vérifier si on est en mode développement via NODE_ENV ou si l'app n'est pas packagée
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  console.log('🔍 [DEV_CHECK] NODE_ENV:', process.env.NODE_ENV, 'isPackaged:', app.isPackaged, 'isDev:', isDev);
  return isDev;
}

/**
 * Configuration du menu de l'application
 */
function createApplicationMenu(): void {
  const isMac = process.platform === 'darwin';

  const template: Electron.MenuItemConstructorOptions[] = [
    // Menu Application (macOS uniquement)
    ...(isMac ? [{
      label: app.getName(),
      submenu: [
        { role: 'about' as const, label: 'À propos de ' + app.getName() },
        { type: 'separator' as const },
        { role: 'services' as const, label: 'Services' },
        { type: 'separator' as const },
        { role: 'hide' as const, label: 'Masquer ' + app.getName() },
        { role: 'hideOthers' as const, label: 'Masquer les autres' },
        { role: 'unhide' as const, label: 'Tout afficher' },
        { type: 'separator' as const },
        { role: 'quit' as const, label: 'Quitter ' + app.getName() }
      ]
    }] : []),

    // Menu Fichier
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Nouvelle comparaison',
          accelerator: 'CmdOrCtrl+N',
          click: async (): Promise<void> => {
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
          { role: 'pasteAndMatchStyle' as const, label: 'Coller et adapter le style' },
          { role: 'delete' as const, label: 'Supprimer' },
          { role: 'selectAll' as const, label: 'Tout sélectionner' }
        ] : [
          { role: 'delete' as const, label: 'Supprimer' },
          { type: 'separator' as const },
          { role: 'selectAll' as const, label: 'Tout sélectionner' }
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
          click: async (): Promise<void> => {
            await dialog.showMessageBox(mainWindow!, {
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
function setupIpcHandlers(): void {
  // === Handlers d'application ===
  
  ipcMain.handle('app:close', async (): Promise<void> => {
    app.quit();
  });

  // === Handlers de fenêtre ===
  
  ipcMain.handle('window:minimize', async (): Promise<void> => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.minimize();
    }
  });

  ipcMain.handle('window:maximize', async (): Promise<void> => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.handle('window:restore', async (): Promise<void> => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
    }
  });

  ipcMain.handle('window:is-maximized', async (): Promise<boolean> => {
    return mainWindow ? mainWindow.isMaximized() : false;
  });

  // === Handlers de dialogue ===
  
  ipcMain.handle('dialog:select-folder', async (): Promise<string | null> => {
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
    { title, message }: { title: string; message: string }
  ): Promise<void> => {
    if (!mainWindow) return;
    
    await dialog.showErrorBox(title, message);
  });

  ipcMain.handle('dialog:info', async (
    _event, 
    { title, message }: { title: string; message: string }
  ): Promise<void> => {
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
    { title, message }: { title: string; message: string }
  ): Promise<void> => {
    if (!mainWindow) return;
    
    await dialog.showMessageBox(mainWindow, {
      type: 'warning',
      title,
      message,
      buttons: ['OK']
    });
  });

  // === Handlers du système de fichiers ===
  
  ipcMain.handle('fs:read-directory', async (_event, dirPath: string): Promise<string[]> => {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries.map(entry => entry.name);
    } catch (error) {
      console.error('Erreur lors de la lecture du dossier:', error);
      throw error;
    }
  });

  ipcMain.handle('fs:get-file-stats', async (_event, filePath: string) => {
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
    { title, body, icon }: { title: string; body: string; icon?: string }
  ): Promise<void> => {
    if (Notification.isSupported()) {
      new Notification({
        title,
        body,
        icon: icon || getAppIcon()
      }).show();
    }
  });

  // === Handlers de préférences ===
  
  ipcMain.handle('preferences:get-theme', async (): Promise<string> => {
    return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
  });

  ipcMain.handle('preferences:set-theme', async (_event, theme: string): Promise<void> => {
    nativeTheme.themeSource = theme as any;
  });

  // === Handlers de développement ===
  // Toujours disponibles en local pour le développement
  console.log('🔧 [MAIN_DEBUG] Enregistrement handlers dev - NODE_ENV:', process.env.NODE_ENV);
  
  ipcMain.handle('dev:open-devtools', async (): Promise<void> => {
    console.log('🔧 [DEV_HANDLER] Ouverture DevTools demandée');
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.openDevTools();
      console.log('✅ [DEV_HANDLER] DevTools ouvertes');
    } else {
      console.error('❌ [DEV_HANDLER] Fenêtre principale introuvable');
    }
  });

  ipcMain.handle('dev:reload', async (): Promise<void> => {
    console.log('🔄 [DEV_HANDLER] Reload demandé');
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.reload();
    }
  });

  ipcMain.handle('dev:clear-cache', async (): Promise<void> => {
    console.log('🧹 [DEV_HANDLER] Clear cache demandé');
    if (mainWindow && !mainWindow.isDestroyed()) {
      await mainWindow.webContents.session.clearCache();
    }
  });
}

/**
 * Configuration de la sécurité avancée
 */
function setupSecurityHandlers(): void {
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

// ===== GESTION D'INSTANCE UNIQUE SIMPLIFIÉE =====

/**
 * Système d'instance unique simple et stable
 */
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  console.log('🔒 Instance déjà en cours - Fermeture de cette instance');
  app.quit();
} else {
  console.log('✅ Instance unique obtenue');
  
  // Gestion du second-instance (silencieux pour éviter spam HMR)
  app.on('second-instance', () => {
    // Seulement ramener au premier plan si la fenêtre existe et est minimisée
    if (mainWindow && mainWindow.isMinimized()) {
      mainWindow.restore();
      mainWindow.focus();
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
  console.log('🪟 Toutes les fenêtres fermées');
  // Sur macOS, les applications restent actives même sans fenêtre
  if (process.platform !== 'darwin') {
    console.log('🛑 Fermeture de l\'application');
    app.quit();
  }
});

/**
 * L'application va quitter - Arrêt propre simplifié
 */
app.on('before-quit', () => {
  console.log('🛑 [CLEANUP] Arrêt de l\'application...');
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
process.on('uncaughtException', (error: Error) => {
  console.error('🚨 Erreur non gérée:', error);
  
  // En production, quitter proprement
  if (process.env.NODE_ENV === 'production') {
    app.quit();
  }
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('🚨 Promise rejetée:', reason);
});
