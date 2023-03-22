import { BrowserWindow } from "electron";

export function initCloseHandlers(browserWindow: BrowserWindow, ipc: Electron.IpcMain) {
    let isConfirmClose = false;
    ipc.on("close", () => {
        isConfirmClose = true;
        browserWindow.close();
    });

    browserWindow.on("close", (event) => {
        if (!isConfirmClose) {
            event.preventDefault();
            browserWindow.webContents.send("closeRequest")
        }
    });
}