import * as React from 'react'
import { updateStore } from '../main/update-store'

interface IUpdateAvailableProps {
  readonly onDismissed: () => void
}

export class UpdateAvailable extends React.Component<IUpdateAvailableProps, {}> {

  public render() {
    return (
      <div>
        <span>Update Available</span>

        <a onClick={this.updateNow}>Update</a>
        <a onClick={this.onDismissed}>Dismiss</a>
      </div>
    )
  }

  private updateNow = () => {
    updateStore.quitAndInstallUpdate()
  }

  private onDismissed = () => {
    this.props.onDismissed()
  }
}