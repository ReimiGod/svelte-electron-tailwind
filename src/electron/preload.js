const { contextBridge } = require("electron");
const ipcRendererFunctions = require("./app/ipc/ipcRendererFunctions");

// are we in electron? only available in node context
// export const isElectron = process.versions.hasOwnProperty('electron');

// expose electron functions globally through contextBridge
contextBridge.exposeInMainWorld("electron", {
  ...ipcRendererFunctions,
});
