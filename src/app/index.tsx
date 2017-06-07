import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'

import { App } from './app.component'
import { AppStore } from './app.store'
import { RouterStore } from './router.store'

import { FormComponent } from './form/form.component'
import { HomeComponent } from './home/home.component'
import { PostsComponent } from './posts/posts.component'


const browserHistory = createBrowserHistory()

// prepare MobX stores
const appStore = new AppStore()
const routerStore = new RouterStore(browserHistory)

const rootStores = {
  appStore,
  routerStore
}

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={browserHistory} >
      <App>
        <Switch>
          <Route exact path='/home' component={HomeComponent as any} />
          <Route exact path='/posts' component={PostsComponent as any} />
          <Route exact path='/form' component={FormComponent as any} />
        </Switch>
      </App>
    </Router>
  </Provider >,
  document.getElementById('root')
)
