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
   login: (email,password) => ipcRenderer.invoke('login-user', {email,password}),
   RegisterUser: (fullName, email, password) => ipcRenderer.invoke('register-user',{fullName,email,password}),
   adminlogin: (email,password) => ipcRenderer.invoke('admin-login', {email,password}),
   logout: () => ipcRenderer.invoke('logout'),
   getSession: () => ipcRenderer.invoke('get-session'),
   getCities: () => ipcRenderer.invoke('get-cities'),
   getUsers: () => ipcRenderer.invoke('get-users'),
   resetLoginAttempt: (userId) => ipcRenderer.invoke('admin-unlock-user', {userId})
  });