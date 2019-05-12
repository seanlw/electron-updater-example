import { AppStore } from '../stores'

export class Dispatcher {
  private readonly appStore: AppStore

  public constructor(appStore: AppStore) {
    this.appStore = appStore
  }

  public loadInitialState(): Promise<void> {
    return this.appStore.loadInitialState()
  }

  public setUpdateAvailableVisibility(visable: boolean) {
    return this.appStore._setUpdateAvailableVisibility(visable)
  }
}