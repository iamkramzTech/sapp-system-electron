const { ipcMain } = require('electron');

const safeHandle = (channel, handler) =>{
ipcMain.handle(channel, async (event, ...args) => {
    try {
      return await handler(event, ...args);
    } catch (err) {
      console.error(`IPC error on ${channel}:`, err);
      return { success: false, message: "Internal server error" };
    }
  });
};


module.exports = { safeHandle }