import * as React from 'react'
import { Dispatcher } from '../lib/dispatcher'
import { AppStore } from '../lib/stores'
import { IAppState } from '../lib/app-state'

interface IAppProps {
  readonly appStore: AppStore
  readonly dispatcher: Dispatcher
}

export class App extends React.Component<IAppProps, IAppState> {


  public render() {

    return (
      <p>Hello World v0.0.1-alpha.1</p>
    )
  }
}