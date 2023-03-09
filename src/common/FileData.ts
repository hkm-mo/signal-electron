export default interface FileData {
    path: string,
    name: string,
    basePath?: string,
    buffer: Buffer | Uint8Array,
    isSuccess: boolean,
    userCancelled?: boolean,
}