import { BrowserWindow } from "electron";
import { initIpcHandles } from "./IpcHandlers";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      titleBarStyle: "hidden",
      titleBarOverlay: {
        color: "#1f212b",
        symbolColor: "#d0d0d0",
        height: 32
      },
      width: 1000,
      height: 700,
      backgroundColor: "#1f212b",
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    initIpcHandles(mainWindow, mainWindow.webContents);
    mainWindow.webContents.ipc.on("newWindow", createWindow);
    mainWindow.setMenu(null);
  
    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
    if (process.env.NODE_ENV !== "production") {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }

    return mainWindow;
}