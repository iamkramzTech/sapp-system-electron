//INFO: "type": "module" doesn’t apply to the preload script
// the VM Electron uses to run preload doesn’t support ESM so commonJS will be used.  

const { contextBridge, ipcRenderer } = require('electron');


const safeInvoke = async (channel, args) => {
try {
    return await ipcRenderer.invoke(channel, args);
  } catch (err) {
    console.error(`IPC error on channel ${channel}:`, err);
    return { success: false, message: 'IPC call failed' };
  }
};

contextBridge.exposeInMainWorld('api', {
  
   login: (email,password) => safeInvoke('login-user', {email,password}),
   registerUser: (fullName, email, password) => safeInvoke('register-user',{fullName,email,password}),
   adminLogin: (email,password) => safeInvoke('admin-login', {email,password}),
   logout: () => safeInvoke('logout'),
   getSession: () => safeInvoke('get-session'),
   getUsers: () => safeInvoke('get-users'),
   resetLoginAttempt: (userId) => safeInvoke('admin-unlock-user', {userId}),
   addParishioner: (formData) => safeInvoke('add-parishioner',formData),
   getParishioners: () => safeInvoke('get-parishioner'),
   getParishionerById: (parishionerId) => safeInvoke('get-parishioner-id', {parishionerId})
  });