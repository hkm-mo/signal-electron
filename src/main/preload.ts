// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, MessageBoxOptions } from "electron";
import FileData from "../common/FileData";
import { EventEmitter } from "events";

const emitter = new EventEmitter();
contextBridge.exposeInMainWorld("ipcApi", {
    openFile: () => ipcRenderer.invoke("openFile"),
    saveFile: (fileData: FileData) => ipcRenderer.invoke("saveFile", fileData),
    showMessageBox: (options: MessageBoxOptions) => ipcRenderer.invoke("showMessageBox", options),
    showErrorBox: (title: string, content: string) => ipcRenderer.send("showErrorBox", title, content),
    onRequestedClose: (callback: () => void) => beforeCloseHandlerWrapper(callback),
    close: () => ipcRenderer.send("close"),
    newWindow: () => ipcRenderer.send("newWindow"),
});

ipcRenderer.on("closeRequest", () => {
    emitter.emit("beforeClose");
});

function beforeCloseHandlerWrapper(callback: () => void) {
    emitter.on("beforeClose", callback);

    return () => {
        emitter.off("beforeClose", callback);
    };
}
