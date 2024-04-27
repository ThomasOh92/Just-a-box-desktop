const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    let validChannels = ['open-single-box', 'start-save']; // Array of valid IPC channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['start-save']; // Array of valid IPC channels
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  openExternalLink: (url) => {
    ipcRenderer.send('open-external-link', url);
  },
  openFile: (filePath) => {
    ipcRenderer.send('open-file', filePath);
  },
  setStoreValue: async (key, value) => {
    return await ipcRenderer.invoke('setStoreValue', key, value);
  },
  getStoreValue: async (key) => {
    return await ipcRenderer.invoke('getStoreValue', key);
  },
  getWholeStore: async () => {
    return await ipcRenderer.invoke('getWholeStore');
  }
});

