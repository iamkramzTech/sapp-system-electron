const { app, BrowserWindow,ipcMain } = require('electron');
const url = require('url');
const path = require('node:path');
// require('dotenv').config();
const db = require('./db');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let win;
const createWindow = () => {
     win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload','preload.js')
        }
    });
    //win.setResizable(false);
    win.loadFile(path.join(app.getAppPath(),'renderer','views','cities.html'));
    win.on('closed', () => {
        app.quit();
    });
   // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
        app.quit();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// app.whenReady().then(() => {
//     createWindow()
//   })


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('get-cities',async()=>{
 return new Promise((resolve,reject)=>{
    db.query('SELECT Name, CountryCode, Population FROM city LIMIT 10',(err,result) => {
        if(err)
        {
            reject(err);
        }
        else
        {
            resolve(result);
        }
    });
 });
});