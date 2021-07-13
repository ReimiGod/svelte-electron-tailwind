const path = require("path");
const url = require("url");
const { app, BrowserWindow, protocol, screen } = require("electron");

const argv = process.argv.slice(2);
const isProduction = !argv.find((_) => _ === "--dev");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "file",
    privileges: {
      secure: true,
      standard: true,
    },
  },
]);

function reloadOnChange(mainWindow) {
  if (isProduction)
    return {
      close: () => {},
    };

  const watcher = require("chokidar").watch(
    path.join(__dirname, "../public/**"),
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
    icon: path.join(__dirname, "../public/icon.png"),

    width: width / 1.25,
    height: height / 1.25,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      backgroundThrottling: false,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      // enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../../public/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  setTimeout(() => {
    mainWindow.webContents.send("test");
  }, 3000);

  const watcher = reloadOnChange(mainWindow);

  mainWindow.on("closed", () => {
    mainWindow = null;
    watcher.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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
