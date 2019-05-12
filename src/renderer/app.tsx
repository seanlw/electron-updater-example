import * as React from 'react'
import { Dispatcher } from '../lib/dispatcher'
import { AppStore } from '../lib/stores'
import { IAppState } from '../lib/app-state'
import { UpdateAvailable } from './update-available'
import { ipcRenderer } from 'electron';
import { UpdateStatus } from '../lib/app-state';

interface IAppProps {
  readonly appStore: AppStore
  readonly dispatcher: Dispatcher
}

export class App extends React.Component<IAppProps, IAppState> {


  public constructor(props: IAppProps) {
    super(props)

    this.state = props.appStore.getState()

    ipcRenderer.on(
      'update-changed',
      (event: Electron.IpcMessageEvent, { status }: { status: UpdateStatus }) => {
        console.log('update status', status)
        if (status === UpdateStatus.UpdateReady) {
          this.props.dispatcher.setUpdateAvailableVisibility(true)
        }
      }
    )
    ipcRenderer.on(
      'update-error',
      (event: Electron.IpcMessageEvent, { error }: { error: Error }) => {
        console.error('update error', error)
        this.props.dispatcher.setUpdateAvailableVisibility(false)
      }
    )
  }

  private renderUpdateBanner() {
    if (!this.state.isUpdateAvailable) {
      return null
    }

    return (
      <UpdateAvailable
        onDismissed={this.onUpdateAvailableDismissed}
      />
    )
  }

  private onUpdateAvailableDismissed = () => 
    this.props.dispatcher.setUpdateAvailableVisibility(false)

  public render() {

    return (
      <div>
        {this.renderUpdateBanner()}
        <p>Hello World v0.0.1-alpha.3</p>
      </div>
    )
  }
}