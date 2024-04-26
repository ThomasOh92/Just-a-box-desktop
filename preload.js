const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    let validChannels = ['open-single-box']; // Array of valid IPC channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  openExternalLink: (url) => {
    ipcRenderer.send('open-external-link', url);
  },
  openFile: (filePath) => {
    ipcRenderer.send('open-file', filePath);
  },
  setStoreValue: async (key, value) => {
    await ipcRenderer.invoke('setStoreValue', key, value);
  },
  getStoreValue: async (key) => {
    return await ipcRenderer.invoke('getStoreValue', key);
  },
  getWholeStore: async () => {
    return await ipcRenderer.invoke('getWholeStore');
  }
});

