import { IAppState } from '../app-state'
import { TypedBaseStore } from './base-store'

export class AppStore extends TypedBaseStore<IAppState> {

  private emitQueued = false

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
      
    }
  }

  public async loadInitialState() {

  }
}