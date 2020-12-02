import { app, BrowserWindow } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 440,
    width: 330,
    resizable: false,
    frame: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    transparent: true,
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
