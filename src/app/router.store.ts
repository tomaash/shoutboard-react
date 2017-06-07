import { History, createBrowserHistory } from 'history'
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router'

export class RouterStore extends BaseRouterStore {
  static instance: RouterStore
  browserHistory: History
  constructor() {
    super()
    this.browserHistory = createBrowserHistory()
    this.history = syncHistoryWithStore(this.browserHistory, this)
  }
  static getInstance() {
    return RouterStore.instance || (RouterStore.instance = new RouterStore())
  }
}

export default RouterStore
