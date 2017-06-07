import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

import { Router, Route, Redirect, Switch } from 'react-router'

import { App } from './app.component'
import { AppStore } from './app.store'
import { RouterStore } from './router.store'

import { FormComponent } from './form/form.component'
import { Home } from './home/home.component'
import { Posts } from './posts/posts.component'

const appStore = AppStore.getInstance()
const routerStore = RouterStore.getInstance()

const rootStores = {
  appStore,
  routerStore
}

ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={routerStore.browserHistory} >
      <App>
        <Switch>
          <Route exact path='/home' component={Home as any} />
          <Route exact path='/posts' component={Posts as any} />
          <Route exact path='/form' component={FormComponent as any} />
          <Redirect from='/' to='/home' />
        </Switch>
      </App>
    </Router>
  </Provider >,
  document.getElementById('root')
)
