import * as React from 'react'
import { Dispatcher } from '../lib/dispatcher'
import { AppStore } from '../lib/stores'
import { IAppState } from '../lib/app-state'
import { updateStore, UpdateStatus } from './lib/update-store'
import { UpdateAvailable } from './update-available'

interface IAppProps {
  readonly appStore: AppStore
  readonly dispatcher: Dispatcher
}

export class App extends React.Component<IAppProps, IAppState> {


  public constructor(props: IAppProps) {
    super(props)

    updateStore.onDidChange(state => {
      const status = state.status
      console.log('update status: ', status)
      if (status === UpdateStatus.UpdateReady) {
        this.props.dispatcher.setUpdateAvailableVisibility(true)
      }
    })

    updateStore.onError(error => {
      console.error(error)
    })

    updateStore.checkForUpdates()
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
        <p>Hello World v0.0.1-alpha.1</p>
      </div>
    )
  }
}