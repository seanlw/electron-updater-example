import { IAppState } from '../app-state'
import { TypedBaseStore } from './base-store'

export class AppStore extends TypedBaseStore<IAppState> {

  private emitQueued = false
  private isUpdateAvailable: boolean = false

  public constructor() {
    super()

    this.isUpdateAvailable = false
  }

  protected emitUpdate() {
    if (this.emitQueued) {
      return
    }
    this.emitQueued = true
    this.emitUpdateNow()
  }

  private emitUpdateNow() {
    this.emitQueued = false
    const state = this.getState()
    super.emitUpdate(state)
  }

  public getState(): IAppState {
    return {
      isUpdateAvailable: this.isUpdateAvailable
    }
  }

  public async loadInitialState() {

  }

  public _setUpdateAvailableVisibility(visable: boolean) {
    this.isUpdateAvailable = visable

    this.emitUpdate()
  }
}