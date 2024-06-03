// console.log('Hello from Electron 👋')

const { app, BrowserWindow } = require('electron/main')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

/**
 * Many of Electron's core modules are Node.js event emitters that adhere to Node's asynchronous event-driven architecture.
 * The app module is one of these emitters.
 */

/**
 * In Electron, BrowserWindows can only be created after the app module's ready event is fired.
 * You can wait for this event by using the app.whenReady() API and calling createWindow() once its promise is fulfilled.
 */

/**
 * You typically listen to Node.js events by using an emitter's .on function.
 * However, Electron exposes app.whenReady() as a helper specifically for the ready event to avoid subtle pitfalls with directly listening to that event in particular.
 * See electron/electron#21972[https://github.com/electron/electron/pull/21972] for details.
 */
// app.on('ready', () => {
app.whenReady().then(() => {
  createWindow()

  
  app.on('activate', () => {
    /**
     * Open a window if none are open (macOS)
     *
     * In contrast, macOS apps generally continue running even without any windows open.
     * Activating the app when no windows are available should open a new one.
     *
     * To implement this feature, listen for the app module's activate event, and call your existing createWindow() method if no BrowserWindows are open.
     *
     * Because windows cannot be created before the ready event, you should only listen for activate events after your app is initialized.
     * Do this by only listening for activate events inside your existing whenReady() callback.
     */
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

/**
 * Quit the app when all windows are closed (Windows & Linux)
 *
 * On Windows and Linux, closing all windows will generally quit an application entirely.
 * To implement this pattern in your Electron app,
 * listen for the app module's window-all-closed event, and call app.quit() to exit your app if the user is not on macOS.
 *
 * Quit when all windows are closed, except on macOS. There, it's common
 * for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})