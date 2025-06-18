import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import './ipcHandlers/citiesHandler.js';
function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), 'src', 'preload', 'preload.js'),
        }
    });
    window.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'views', 'cities.html'));
}
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});