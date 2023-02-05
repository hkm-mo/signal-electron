
import { makeObservable, observable } from "mobx"

export class CommunitySongStore {
  isLoading = false

  constructor() {
    makeObservable(this, {
      isLoading: observable,
    })
  }

  async load() {
    this.isLoading = true
    this.isLoading = false
  }
}
