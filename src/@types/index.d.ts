import FileData from "../common/FileData";

declare module "*.png";
declare module "*.svg";

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext,
        ipcApi: {
            openFile: () => Promise<FileData>,
            saveFile: (fileData: FileData) => Promise<FileData>,
            showMessageBox: (options: Electron.MessageBoxOptions) => Promise<Electron.MessageBoxReturnValue>,
            showErrorBox: (title: string, content: string) => void,
            onRequestedClose: (callback: () => void) => () => void,
            close: () => void,
            newWindow: () => void,
        }
    }
}
