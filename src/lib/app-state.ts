export interface IAppState {
  readonly isUpdateAvailable: boolean
}

export enum UpdateStatus {
  Checking,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateReady
}