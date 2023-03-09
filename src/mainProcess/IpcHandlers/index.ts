import { BrowserWindow, WebContents } from "electron";
import { initCloseHandlers } from "./closeHandlers";
import { initFileHandlers } from "./fileHandlers";
import { initMessageBoxHandlers } from "./messageBoxHandlers";

export function initIpcHandles(browserWindow: BrowserWindow, webContents: WebContents) {
    initCloseHandlers(browserWindow, webContents.ipc);
    initFileHandlers(browserWindow, webContents.ipc);
    initMessageBoxHandlers(browserWindow, webContents.ipc);
}