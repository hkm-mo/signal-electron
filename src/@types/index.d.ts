import FileData from "src/common/FileData";

declare module "*.png";
declare module "*.svg";

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext,
        ipcApi: {
            openFile: () => Promise<FileData>,
            saveFile: (fileData: FileData) => Promise<FileData>,
        }
    }
}
