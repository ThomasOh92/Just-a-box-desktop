const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path');
const Store = require('electron-store');
const store = new Store();

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
    //For Dashboard - commented out for v1
    //To reinstate for v2 when we implement the dashboard
    //createWindow()

    //Create Box right away - Temporary for v1 - force hash of box/1
    //This will be removed in v2 when we implement the dashboard
    const singleBoxWindow = new BrowserWindow({
      width: 800, // Set desired width for the new window
      height: 600, // Set desired height for the new window
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        scrollable: false
      }
    });
    singleBoxWindow.loadFile('dist/index.html', { hash: `box/1` });    
    singleBoxWindow.webContents.openDevTools();
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  
  })
  
  ipcMain.on('open-single-box', (_, boxId) => {
    const singleBoxWindow = new BrowserWindow({
      width: 800, // Set desired width for the new window
      height: 600, // Set desired height for the new window
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        scrollable: false
      }
    });
    // Load the same HTML file but use a hash or query param to differentiate
    singleBoxWindow.loadFile('dist/index.html', { hash: `box/${boxId}` });    
    singleBoxWindow.webContents.openDevTools();
  })
  
  ipcMain.on('open-external-link', (_, url) => {
    shell.openExternal(url);
  });

  ipcMain.on('open-file', (_, filePath) => {
    shell.openPath(filePath);
  });
  
  ipcMain.handle('getStoreValue', async (event, key) => {
    return store.get(key);
  });
  
  ipcMain.handle('setStoreValue', async (event, key, value) => {
    store.set(key, value);
  });


// See format for initial test data, found in "C:\Users\ohcst\AppData\Roaming\just-a-box-v2\config.json". Edit from there
// store.set({
//   initialLayout: [
//       { i: "test", x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
//       { i: "note1", x: 2, y: 2, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
//       { i: "link1", x: 2, y: 3, w: 1, h: 2, isResizable: false},
//       { i: "file1", x: 2, y: 4, w: 1, h: 2, isResizable: false}
//   ],
//   initialNotes:[
//       {id: "note1", content: "content for note 1"}
//   ],
//   initialLinks: [
//       {id: "link1", linkName: "GoogleTest", url: "https://www.google.com"},
//   ],
//   initialFiles: [
//       {id: "file1", fileName: "testdoc", filePath: String.raw`"C:\Users\ohcst\OneDrive\Desktop\testworddoc.docx"`}
//   ]    
// });
