const { app, BrowserWindow, ipcMain } = require('electron/main')
const { autoUpdater } = require("electron-updater");
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow();

  // Check for updates and notify the user if one is available
  autoUpdater.checkForUpdatesAndNotify();

  // (Optional) log update events
  autoUpdater.on('update-available', () => {
    console.log('Update available—downloading in background');
  });
  autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded; will install on quit');
  });
});

app.on('window-all-closed', () => {
  // On Windows & Linux, quit then install if update ready
  if (process.platform !== 'darwin') {
    autoUpdater.quitAndInstall(false, true);
  }
});