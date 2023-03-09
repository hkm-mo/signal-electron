import { BrowserWindow, dialog, IpcMainInvokeEvent, MessageBoxOptions } from "electron";

export async function initMessageBoxHandlers(browserWindow: BrowserWindow, ipc: Electron.IpcMain) {
    ipc.handle("showMessageBox", async (event: IpcMainInvokeEvent, options: MessageBoxOptions) => {
        return dialog.showMessageBox(browserWindow, options);
    });

    ipc.on("showErrorBox", (event: IpcMainInvokeEvent, title: string, content: string) => {
        dialog.showErrorBox(title, content);
    });
}
