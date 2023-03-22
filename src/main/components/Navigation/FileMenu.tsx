import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Localized } from "../../../components/Localized"
import { MenuDivider, MenuItem } from "../../../components/Menu"
import { openFile, saveFile, saveFileAs } from "../../actions/file"
import { useLocalization } from "../../hooks/useLocalization"
import { useStores } from "../../hooks/useStores"
import { useToast } from "../../hooks/useToast"

export const FileMenu: FC<{ close: () => void }> = observer(({ close }) => {
  const rootStore = useStores()
  const toast = useToast()
  const localized = useLocalization()

  const onClickNew = () => {
    close()
    window.ipcApi.newWindow()
  }

  const onClickOpen = async () => {
    const { song } = rootStore
    close()
    try {
      if (
        song.isSaved ||
        confirm(localized("confirm-open", "Are you sure you want to continue?"))
      ) {
        await openFile(rootStore)
      }
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  const onClickSave = async () => {
    close()
    await saveFile(rootStore)
  }

  const onClickSaveAs = async () => {
    close()
    await saveFileAs(rootStore)
  }

  return (
    <>
      <MenuItem onClick={onClickNew}>
        <Localized default="New">new-song</Localized>
      </MenuItem>

      <MenuDivider />

      <MenuItem onClick={onClickOpen}>
        <Localized default="Open">open-song</Localized>
      </MenuItem>

      <MenuItem
        onClick={onClickSave}
        disabled={rootStore.song.filePath === null}
      >
        <Localized default="Save">save-song</Localized>
      </MenuItem>

      <MenuItem onClick={onClickSaveAs}>
        <Localized default="Save As">save-as</Localized>
      </MenuItem>
    </>
  )
})
