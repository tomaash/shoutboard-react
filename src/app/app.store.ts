import { observable, action } from 'mobx'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

export class AppStore {
  static instance: AppStore
  @observable username = 'Mr. User'
  apolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: 'https://api.graph.cool/simple/v1/cj3bf7docbo5w0147sj4e66ik'
    })
  })

  static getInstance() {
    return AppStore.instance || (AppStore.instance = new AppStore())
  }
  @action onUsernameChange = (val) => {
    this.username = val
  }

}
