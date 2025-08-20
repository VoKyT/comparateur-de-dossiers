const { 
  app, 
  BrowserWindow
} = require('electron');
const path = require('path');
const fs = require('fs/promises');

console.log('Testing Electron import...');
console.log('app:', !!app);
console.log('BrowserWindow:', !!BrowserWindow);

if (!app) {
  console.error('❌ Electron app is undefined!');
  process.exit(1);
}

let mainWindow: any = null;

function createMainWindow(): void {
  console.log('Creating main window...');
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Test Electron',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  
  // Load a simple HTML string
  mainWindow.loadURL('data:text/html,<h1>Test Electron Window</h1><p>If you see this, Electron is working!</p>');
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('✅ Window shown successfully');
  });
}

app.whenReady().then(() => {
  console.log('✅ App ready, creating window...');
  createMainWindow();
});

app.on('window-all-closed', () => {
  console.log('All windows closed, quitting...');
  app.quit();
});