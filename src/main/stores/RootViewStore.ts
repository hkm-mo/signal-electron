import { makeObservable, observable } from "mobx"
import { TrackEvent } from "../../common/track"

export default class RootViewStore {
  isArrangeViewSelected: boolean = false
  openDrawer = false
  openHelp = false
  eventEditorEvents: TrackEvent[] = []
  openCloudFileDialog = false
  openSettingDialog = false

  constructor() {
    makeObservable(this, {
      isArrangeViewSelected: observable,
      openDrawer: observable,
      openHelp: observable,
      eventEditorEvents: observable.shallow,
      openCloudFileDialog: observable,
      openSettingDialog: observable,
    })
  }
}
