import FileData from "../../common/FileData"
import { songFromMidi, songToMidi } from "../../common/midi/midiConversion"
import RootStore from "../stores/RootStore"
import { setSong } from "./song"

// URL parameter for automation purposes used in scripts/perf/index.js
// /edit?disableFileSystem=true
export const disableFileSystem = false

export const hasFSAccess = true

export const openFile = async (rootStore: RootStore) => {
  const fileData = await window.ipcApi.openFile()
  if (fileData.isSuccess && fileData.buffer) {
    const song = await songFromFile(fileData)
    setSong(rootStore)(song)
  }
}

export const songFromFile = async (fileData: FileData) => {
  const song = songFromMidi(fileData.buffer)
  song.name = fileData.name
  song.filePath = fileData.path
  song.isSaved = true
  return song
}

export const saveFile = async (rootStore: RootStore) => {
  const song = rootStore.song
  const fileData = await window.ipcApi.saveFile({
    buffer: songToMidi(song),
    path: song.filePath,
    name: song.name,
    isSuccess: true
  })

  if (fileData.isSuccess && fileData.path) {
    song.name = fileData.name
    song.filePath = fileData.path
    song.isSaved = true
  } else if (!fileData.userCancelled) {
    alert("unable to save file")
  }
}

export const saveFileAs = async (rootStore: RootStore) => {
  const song = rootStore.song
  const fileData = await window.ipcApi.saveFile({
    buffer: songToMidi(song),
    path: "",
    name: song.name,
    isSuccess: true
  })

  if (fileData.isSuccess && fileData.path) {
    song.name = fileData.name
    song.filePath = fileData.path
    song.isSaved = true
  } else if (!fileData.userCancelled) {
    alert("unable to save file")
  }
}
