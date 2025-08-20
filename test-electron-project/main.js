const { app, BrowserWindow } = require('electron'); console.log('app:', \!\!app); if(app) { app.whenReady().then(() => { console.log('OK'); app.quit(); }); } else { console.log('FAIL'); }
