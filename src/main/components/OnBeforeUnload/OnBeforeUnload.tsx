import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { saveFile } from "../../../main/actions/file"
import { useLocalization } from "../../hooks/useLocalization"
import { useStores } from "../../hooks/useStores"

export const OnBeforeUnload = observer(() => {
  const rootStore = useStores();
  const localized = useLocalization();

  useEffect(() => {
    const listener = async () => {
      if (!rootStore.song.isSaved) {
        const clickButton = await window.ipcApi.showMessageBox({
          message: localized(
            "confirm-close",
            "Your edits have not been saved. Be sure to download it before exiting. Do you really want to close it?"
          ),
          cancelId: 2,
          type: "warning",
          buttons: ["Save", "Don't Save", "Cancel"]
        });

        if (clickButton.response === 0) {
          await saveFile(rootStore);
          window.ipcApi.close();
        } else if (clickButton.response === 1) {
          window.ipcApi.close();
        }
      } else {
        window.ipcApi.close();
      }
    };
    const offBeforeClose = window.ipcApi.onRequestedClose(listener);

    return () => {
      offBeforeClose();
    };
  }, [])
  return <></>
})
