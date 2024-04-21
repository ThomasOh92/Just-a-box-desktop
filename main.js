const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 300,
      height: 400,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        scrollable: false
      }
    
    })
  
    win.loadFile('dist/index.html')
    // win.webContents.openDevTools();

  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  
  })
  
  ipcMain.on('open-single-box', (_, boxId) => {
    const singleBoxWindow = new BrowserWindow({
      width: 800, // Set desired width for the new window
      height: 600, // Set desired height for the new window
      webPreferences: {
        scrollable: false
      }
    });

  
    // Load the same HTML file but use a hash or query param to differentiate
    singleBoxWindow.loadFile('dist/index.html', { hash: `box/${boxId}` });    
    singleBoxWindow.webContents.openDevTools();
  })  
  