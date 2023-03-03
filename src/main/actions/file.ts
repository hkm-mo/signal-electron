import { songFromMidi, songToMidi } from "../../common/midi/midiConversion"
import RootStore from "../stores/RootStore"
import { setSong } from "./song"
import * as fs from "fs";
import * as path from "path";
import { dialog } from "@electron/remote";

// URL parameter for automation purposes used in scripts/perf/index.js
// /edit?disableFileSystem=true
export const disableFileSystem = false

export const hasFSAccess = true

export const openFile = async (rootStore: RootStore) => {
  const file = await dialog.showOpenDialog({
    filters: [
      {
        extensions: ["mid", "midi"],
        name: "MIDI file"
      }
    ],
  });
  
  if(!file.canceled && file.filePaths.length) {
    const filePath = file.filePaths[0];

    try {
      if (fs.existsSync(filePath)) {
        const song = await songFromFile(file.filePaths[0])
        song.filePath = file.filePaths[0]
        setSong(rootStore)(song)
      } else {
        dialog.showErrorBox("Error", "File does not exists.")
      }
    } catch (error) {
      dialog.showErrorBox("Error", `An error occured trying to open the file. (${error})`)
    }
  }
}

export const songFromFile = async (filePath: string) => {
  const buf = await fs.promises.readFile(filePath)
  const song = songFromMidi(buf)
  if (song.name.length === 0) {
    // Use the file name without extension as the song title
    song.name = path.basename(filePath)
  }
  song.filepath = filePath
  song.isSaved = true
  return song
}

export const saveFile = async (rootStore: RootStore) => {
  const filePath = rootStore.song.filePath;
  if (filePath === null) {
    await saveFileAs(rootStore)
    return
  }

  try {
    await fs.promises.writeFile(filePath, songToMidi(rootStore.song))
    console.log("rootStore.song.isSaved", rootStore.song.isSaved)
    rootStore.song.isSaved = true
  } catch (e) {
    console.error(e)
    alert("unable to save file")
  }
}

export const saveFileAs = async (rootStore: RootStore) => {
  const file = await dialog.showSaveDialog({
    defaultPath: "untitled.mid",
    filters: [
      {
        extensions: ["mid", "midi"],
        name: "MIDI file"
      }
    ],
  });

  if (!file.canceled && file.filePath) {
    try {
      await fs.promises.writeFile(file.filePath, songToMidi(rootStore.song));
      rootStore.song.filePath = file.filePath;
      rootStore.song.isSaved = true
    } catch (error) {
      dialog.showErrorBox("Error", `An error occured trying to save the file. (${error})`)
    }
    
  }
}
