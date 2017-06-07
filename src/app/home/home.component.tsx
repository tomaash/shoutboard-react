import * as React from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { observable, action } from 'mobx'
import { Input } from 'react-toolbox/lib/input'
import { HomeStore } from './home.store'
import { AppStore } from '../app.store'

@observer
export class Home extends React.Component<any, any> {

  homeStore: HomeStore
  componentWillMount() {
    this.homeStore = new HomeStore()
  }

  render() {
    return <Provider homeStore={this.homeStore}>
      <HomeComponent />
    </Provider>
  }
}

interface HomeComponentProps {
  appStore?: AppStore,
  homeStore?: HomeStore
}

@inject('appStore', 'homeStore')
@observer
export class HomeComponent extends React.Component<HomeComponentProps, any> {
  render() {
    const { homeStore, appStore } = this.props
    return <div>
      <h3>Dashboard</h3>
      <Input
        type='text'
        label='Edit your name'
        name='username'
        value={appStore.username}
        onChange={appStore.onUsernameChange}
      />
      <span>Clicks since last visit: {homeStore.counter}</span>
      <button onClick={homeStore.increment}>Click!</button>
    </div>
  }
}
