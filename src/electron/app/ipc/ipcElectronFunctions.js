const { ipcMain } = require("electron");

/*
  No need to wrap functions that don't use the app or win object in the module export 
*/

const sleep = (ms) => new Promise((r, _) => setTimeout(r, ms));
ipcMain.handle("testFunc", async (_, name) => {
  console.log(name);
  await sleep(3000);
  return "asd";
});

// ipcMain calls that requires the app and window object.
module.exports = (app, mainWindow) => {
  ipcMain.on("toElectron", (_, data) => {
    mainWindow.webContents.send("test", data);
  });
};
