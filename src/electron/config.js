const path = require("path");
const argv = process.argv.slice(2);
const isProduction = !argv.find((_) => _ === "--dev");
//root directory of the project (when in production we are going up from app.asar/src/electron )
const rootDirectory = !isProduction
  ? `${__dirname}../../../`
  : `${__dirname}/../../../../`;

const config = {
  webRoot: path.join(__dirname, "../../public/index.html"),
  electronMainWindow: {
    width: 1444,
    height: 1080,
    minWidth: 1100,
    minHeight: 650,
    icon: path.join(__dirname, "../../public/icon.png"),
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  },
};

module.exports = {
  config,
  rootDirectory,
  isProduction,
};
