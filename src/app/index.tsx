import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

import { Router, Route, Redirect, Switch } from 'react-router'
import { createBrowserHistory } from 'history'

import { App } from './app.component'
import { AppStore } from './app.store'
import { RouterStore } from './router.store'

import { FormComponent } from './form/form.component'
import { Home } from './home/home.component'
import { PostsComponent } from './posts/posts.component'

const browserHistory = createBrowserHistory()

const appStore = AppStore.getInstance()
const routerStore = new RouterStore(browserHistory)

const rootStores = {
  appStore,
  routerStore
}

ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={browserHistory} >
      <App>
        <Switch>
          <Route exact path='/home' component={Home as any} />
          <Route exact path='/posts' component={PostsComponent as any} />
          <Route exact path='/form' component={FormComponent as any} />
          <Redirect from='/' to='/home' />
        </Switch>
      </App>
    </Router>
  </Provider >,
  document.getElementById('root')
)
