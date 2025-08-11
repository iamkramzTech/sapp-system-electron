import { app, BrowserWindow, globalShortcut, dialog } from 'electron';
import path from 'node:path';
import './ipcHandlers/users/userHandler.js';
let window;
let loginModal;
function createWindow() {
     window = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar:true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            devTools: false,
            webSecurity:true,
            preload: path.join(app.getAppPath(), 'src', 'preload', 'preload.js'),
        }
    });
    window.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'views', 'welcome', 'index.html'));
}
function createLoginModal(){
    loginModal = new BrowserWindow({
        width:400,
        height:400,
        autoHideMenuBar: true,
        modal:true,
        parent: window,
        show:false,
        resizable:false,
        minimizable:false,
        maximizable:false,
        webPreferences:{
            preload: path.join(app.getAppPath(), 'src', 'preload', 'preload.js'),
            contextIsolation:true,
            nodeIntegration:false,
            devTools: false,
            webSecurity:true,
        }
    });
   loginModal.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'views', 'adminloginmodal','index.html'));

   loginModal.once('ready-to-show',()=>{
    loginModal.show();
   });

   loginModal.on('closed',()=>{
    loginModal = null;
   });
}
app.whenReady().then(() => {
    createWindow();

    const ret = globalShortcut.register('CommandOrControl+Shift+A',()=>{
        createLoginModal();
    });

    if(!ret){
        console.log('Shortcut Registration Failed');
        
    }
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

app.on('will-quit',()=>{
    globalShortcut.unregisterAll();
});