import * as React from 'react'

interface IUpdateAvailableProps {
  readonly onDismissed: () => void
  readonly onUpdateNow: () => void
}

export class UpdateAvailable extends React.Component<IUpdateAvailableProps, {}> {

  public render() {
    return (
      <div>
        <span>Update Available</span>

        <a onClick={this.onUpdateNow}>Update</a>
        <a onClick={this.onDismissed}>Dismiss</a>
      </div>
    )
  }

  private onUpdateNow = () => {
    this.props.onUpdateNow()
  }

  private onDismissed = () => {
    this.props.onDismissed()
  }
}