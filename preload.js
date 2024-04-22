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
  }
});

