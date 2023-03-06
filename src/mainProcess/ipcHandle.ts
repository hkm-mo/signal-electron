import * as fs from "fs";
import * as path from "path";
import { dialog, BrowserWindow, WebContents, IpcMain, IpcMainInvokeEvent, FileFilter } from 'electron';
import FileData from "../common/FileData";

export function initIpcHandle(browserWindow: BrowserWindow, webContents: WebContents) {
    initOpenFileHandle(browserWindow, webContents.ipc);
    initSaveFileHandle(browserWindow, webContents.ipc);
}

const fileFilters: FileFilter[] = [
    {
        extensions: ["mid", "midi"],
        name: "MIDI file"
    }
];


function initOpenFileHandle(browserWindow: BrowserWindow, ipc: IpcMain) {
    ipc.handle('openFile', async (event: IpcMainInvokeEvent) => {
        let result = {} as FileData;
        const file = await dialog.showOpenDialog(browserWindow, {
            filters: fileFilters,
        });

        if (!file.canceled && file.filePaths.length) {
            const filePath = file.filePaths[0];

            try {
                if (fs.existsSync(filePath)) {
                    result = await readFile(filePath);
                } else {
                    dialog.showErrorBox("Error", "File does not exists.");
                }
            } catch (error) {
                dialog.showErrorBox("Error", `An error occured trying to open the file. (${error})`);
            }
        }
        return result;
    })
}

function initSaveFileHandle(browserWindow: BrowserWindow, ipc: IpcMain) {
    ipc.handle('saveFile', async (event: IpcMainInvokeEvent, fileData: FileData) => {
        let result = {...fileData };
        let filePath = fileData.path;
        if (!filePath) {
            const file = await dialog.showSaveDialog(browserWindow, {
                defaultPath: fileData.name,
                filters: fileFilters,
            });

            if (!file.canceled && file.filePath) {
                filePath = file.filePath;
            }
        }

        if (filePath) {
            try {
                await fs.promises.writeFile(filePath, fileData.buffer);
                result = {
                    ...result,
                    ...buildPathInfo(filePath)
                };
            } catch (error) {
                dialog.showErrorBox("Error", `An error occured trying to save the file. (${error})`)
            }
        }

        return result
    })
}

async function readFile(filePath: string) {
    return {
        buffer: await fs.promises.readFile(filePath),
        ...buildPathInfo(filePath),
        isSuccess: true,
    } as FileData
}

function buildPathInfo(filePath: string) {
    return {
        name: path.basename(filePath),
        basePath: path.dirname(filePath),
        path: filePath,
    } as Partial<FileData>
}