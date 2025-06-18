//INFO: "type": "module" doesn’t apply to the preload script
// the VM Electron uses to run preload doesn’t support ESM so commonJS will be used.  
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  versions:{
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
  },
  
   // login: (credentials) => ipcRenderer.invoke('login-user', credentials),
    getCities: () => ipcRenderer.invoke('get-cities')
  });