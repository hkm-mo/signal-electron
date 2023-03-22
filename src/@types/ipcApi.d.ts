
import FileData from "../common/FileData";

declare global {
    interface Window {
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