const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");
const path = require('node:path');
const log = require("electron-log");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
}

// Setup logger for autoUpdater
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

app.whenReady().then(() => {
  createWindow();

  // Check for updates and notify user
  autoUpdater.checkForUpdatesAndNotify();

  // Notify renderer (optional)
  autoUpdater.on('update-available', () => {
    log.info('Update available—downloading...');
    if (mainWindow) {
      mainWindow.webContents.send('update_available');
    }
  });

  autoUpdater.on('update-downloaded', () => {
    log.info('Update downloaded—installing...');
    if (mainWindow) {
      mainWindow.webContents.send('update_downloaded');
    }

    // Automatically quit and install after short delay
    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, 3000);
  });
});

// Handle quit
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
