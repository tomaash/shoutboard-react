import { observable, action } from 'mobx'

export class AppStore {
  static instance: AppStore
  @observable username = 'Mr. User'

  static getInstance() {
    return AppStore.instance || (AppStore.instance = new AppStore())
  }
  @action onUsernameChange = (val) => {
    this.username = val
  }

}
