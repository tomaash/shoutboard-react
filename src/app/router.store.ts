import { History, createBrowserHistory } from 'history'
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router'

export class RouterStore extends BaseRouterStore {
  static instance: RouterStore
  constructor() {
    super()
    const history = createBrowserHistory()
    this.history = syncHistoryWithStore(history, this)
  }
  static getInstance() {
    return RouterStore.instance || (RouterStore.instance = new RouterStore())
  }
}

export default RouterStore
