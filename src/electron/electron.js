const path = require("path");

const { app, BrowserWindow, screen } = require("electron");
const { config, rootDirectory, isProduction } = require("./config");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function reloadOnChange(mainWindow) {
  if (isProduction)
    return {
      close: () => {},
    };

  const watcher = require("chokidar").watch(
    path.join(__dirname, "../../public/**"),
    { ignoreInitial: true }
  );

  watcher.on("change", () => {
    mainWindow.reload();
  });

  return watcher;
}

function createWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    ...config.electronMainWindow,
    width: width / 1.25,
    height: height / 1.25,
  });

  mainWindow.loadFile(config.webRoot);

  setTimeout(() => {
    mainWindow.webContents.send("test", {
      dir: __dirname,
      rootDirectory,
      isProduction,
    });
  }, 3000);

  const watcher = reloadOnChange(mainWindow);

  //clean up
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    watcher.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // create the window
  createWindow();
  // include the ipc calls and bindings
  const ipcElectronFunctions = require("./app/ipc/ipcElectronFunctions");
  ipcElectronFunctions(app, mainWindow);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
