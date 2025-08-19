/**
 * @fileoverview Process principal Electron pour le comparateur de dossiers
 * @description Gère la création et la gestion de la fenêtre principale de l'application
 * @author Comparateur de dossiers
 * @created 2025-08-19
 * @lastModified 2025-08-19
 * @dependencies electron
 * @exports N/A (point d'entrée principal)
 * @imports electron (app, BrowserWindow, Menu)
 * @usage Point d'entrée de l'application Electron
 * @related src/electron/renderer/index.html
 * @notes Fenêtre Electron basique avec configuration de sécurité standard
 */

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

/**
 * Fenêtre principale de l'application
 * @type {BrowserWindow|null}
 */
let mainWindow = null;

/**
 * Crée la fenêtre principale de l'application
 * @returns {void}
 */
function createMainWindow() {
  // Configuration de la fenêtre principale
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Comparateur de Dossiers',
    icon: path.join(__dirname, '../../assets/icon.png'), // TODO: Ajouter l'icône
    webPreferences: {
      nodeIntegration: false,           // Sécurité: désactive Node.js dans le renderer
      contextIsolation: true,          // Sécurité: isole le contexte
      enableRemoteModule: false,       // Sécurité: désactive le module remote
      preload: path.join(__dirname, '../preload/preload.js') // Script preload pour l'IPC
    },
    show: false // La fenêtre sera affichée après le chargement complet
  });

  // Chemin vers le fichier HTML principal
  const indexPath = path.join(__dirname, '../renderer/index.html');
  
  // Chargement de l'interface utilisateur
  mainWindow.loadFile(indexPath);

  // Afficher la fenêtre une fois qu'elle est prête
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // En développement, ouvrir les DevTools
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools();
    }
  });

  // Gestion de la fermeture de la fenêtre
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Empêcher la navigation vers des sites externes
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'file://') {
      event.preventDefault();
    }
  });
}

/**
 * Configuration du menu de l'application (optionnel)
 * @returns {void}
 */
function createApplicationMenu() {
  const template = [
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Nouveau',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // TODO: Implémenter nouvelle comparaison
          }
        },
        { type: 'separator' },
        {
          label: 'Quitter',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        { role: 'reload', label: 'Actualiser' },
        { role: 'forceReload', label: 'Actualiser (forcé)' },
        { role: 'toggleDevTools', label: 'Outils de développement' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom normal' },
        { role: 'zoomin', label: 'Agrandir' },
        { role: 'zoomout', label: 'Réduire' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Plein écran' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Événements du cycle de vie de l'application

/**
 * L'application est prête
 */
app.whenReady().then(() => {
  createMainWindow();
  createApplicationMenu();

  // Gestion macOS : recréer la fenêtre si l'application est activée sans fenêtre ouverte
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

/**
 * Toutes les fenêtres sont fermées
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
  // Nettoyage et sauvegarde si nécessaire
});

/**
 * Gestion de la sécurité : empêcher la création de nouvelles fenêtres
 */
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, url) => {
    event.preventDefault();
  });
});
