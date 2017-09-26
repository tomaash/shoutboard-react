import { observable, action } from 'mobx'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

const PROJECT_ID = 'cj3bf7docbo5w0147sj4e66ik'

const wsClient = new SubscriptionClient(`wss://subscriptions.graph.cool/v1/${PROJECT_ID}`, {
  reconnect: true,
  connectionParams: {
    // Pass any arguments you want for initialization
  }
})

const networkInterface = createNetworkInterface({
  uri: `https://api.graph.cool/simple/v1/${PROJECT_ID}`
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

export class AppStore {
  static instance: AppStore
  @observable username = 'Mr. User'
  apolloClient = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions
  })

  static getInstance() {
    return AppStore.instance || (AppStore.instance = new AppStore())
  }

  @action onUsernameChange = (val) => {
    this.username = val
  }

}
