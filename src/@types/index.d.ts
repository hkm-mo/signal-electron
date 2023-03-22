declare module "*.png";
declare module "*.svg";

interface Window {
    webkitAudioContext: typeof AudioContext
}

interface ImportMeta {
    url: string;
}