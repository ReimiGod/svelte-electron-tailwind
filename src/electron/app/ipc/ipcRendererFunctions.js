const { ipcRenderer } = require("electron");

const testFunction = async (name) => await ipcRenderer.invoke("testFunc", name);

const send = (channel, data) => {
  //you can also whitelist channels like this:
  // let validChannels = ["toMainWorld"];
  // if (validChannels.includes(channel)) {}
  ipcRenderer.send(channel, data);
};

const receive = (channel, func) => {
  // Deliberately strip event as it includes `sender`... for security reasons
  ipcRenderer.on(channel, (event, ...args) => func(...args));
};

module.exports = {
  testFunction,
  send,
  receive,
};
