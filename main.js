// console.log('Hello from Electron 👋')

const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

// app.on('ready', () => {
app.whenReady().then(() => {
  createWindow()
})