import { Emitter, Disposable } from 'event-kit'
import { autoUpdater } from 'electron-updater'

export enum UpdateStatus {
  Checking,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateReady
}

export interface IUpdateState {
  status: UpdateStatus
  lastCheck: Date | null
}

class UpdateStore {
  private emitter = new Emitter()
  private status = UpdateStatus.UpdateNotAvailable
  private lastChecked: Date | null = null

  public constructor() {


    autoUpdater.on('error', this.onAutoUpdaterError)
    autoUpdater.on('update-available', this.onUpdateAvailable)
    autoUpdater.on('update-not-available', this.onUpdateNotAvailable)
    autoUpdater.on('update-downloaded', this.onUpdateDownloaded)
    autoUpdater.on('checking-for-update', this.onCheckingForUpdate)

  }

  private onAutoUpdaterError = (error: Error) => {
    this.status = UpdateStatus.UpdateNotAvailable
    this.emitError(error)
  }

  private onUpdateAvailable = () => {
    this.status = UpdateStatus.UpdateAvailable
    this.emitDidChange()
  }

  private onUpdateDownloaded = () => {
    this.status = UpdateStatus.UpdateReady
    this.emitDidChange()
  }

  private onCheckingForUpdate = () => {
    this.status = UpdateStatus.Checking
    this.emitDidChange()
  }

  private onUpdateNotAvailable = () => {
    this.status = UpdateStatus.UpdateNotAvailable
    this.emitDidChange()
  }

  public onDidChange(fn: (state: IUpdateState) => void): Disposable {
    return this.emitter.on('did-change', fn)
  }

  public onError(fn: (error: Error) => void): Disposable {
    return this.emitter.on('error', fn)
  }

  private emitDidChange() {
    this.emitter.emit('did-change', this.state)
  }

  private emitError(error: Error) {
    this.emitter.emit('error', error)
  }

  public get state(): IUpdateState {
    return {
      status: this.status,
      lastCheck: this.lastChecked
    }
  }

  public checkForUpdates() {
    console.log('checking updates')
    autoUpdater.checkForUpdates()
  }

  public quitAndInstallUpdate() {
    autoUpdater.quitAndInstall()
  }
}

export const updateStore = new UpdateStore()