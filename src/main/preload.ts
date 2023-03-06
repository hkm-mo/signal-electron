// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import FileData from "../common/FileData";

contextBridge.exposeInMainWorld('ipcApi', {
    openFile: () => ipcRenderer.invoke('openFile'),
    saveFile: (fileData: FileData) => ipcRenderer.invoke("saveFile", fileData)
});