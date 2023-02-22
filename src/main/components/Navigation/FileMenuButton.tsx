import CloudOutlined from "mdi-react/CloudOutlineIcon"
import KeyboardArrowDown from "mdi-react/KeyboardArrowDownIcon"
import { observer } from "mobx-react-lite"
import { FC, useCallback, useRef } from "react"
import { Localized } from "../../../components/Localized"
import { Menu, MenuDivider, MenuItem } from "../../../components/Menu"
import { hasFSAccess } from "../../actions/file"
import { useStores } from "../../hooks/useStores"
import { FileMenu } from "./FileMenu"
import { LegacyFileMenu } from "./LegacyFileMenu"
import { Tab } from "./Navigation"

export const FileMenuButton: FC = observer(() => {
  const rootStore = useStores()
  const {
    rootViewStore,
    exportStore,
  } = rootStore
  const isOpen = rootViewStore.openDrawer
  const handleClose = () => (rootViewStore.openDrawer = false)

  const onClickExport = () => {
    handleClose()
    exportStore.openExportDialog = true
  }

  const ref = useRef<HTMLDivElement>(null)

  return (
    <Menu
      open={isOpen}
      onOpenChange={(open) => (rootViewStore.openDrawer = open)}
      trigger={
        <Tab
          ref={ref}
          onClick={useCallback(() => (rootViewStore.openDrawer = true), [])}
          id="tab-file"
        >
          <span style={{ marginLeft: "0.25rem" }}>
            <Localized default="File">file</Localized>
          </span>
          <KeyboardArrowDown style={{ width: "1rem", marginLeft: "0.25rem" }} />
        </Tab>
      }
    >
      {hasFSAccess && <FileMenu close={handleClose} />}

      {!hasFSAccess && <LegacyFileMenu close={handleClose} />}

      <MenuDivider />

      <MenuItem onClick={onClickExport}>
        <Localized default="Export Audio">export-audio</Localized>
      </MenuItem>
    </Menu>
  )
})
