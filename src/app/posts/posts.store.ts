import { observable, action } from 'mobx'
import gql from 'graphql-tag'
import { AppStore } from '../app.store'

const PostsQuery = gql`
  query PostsQuery {
    allPosts(orderBy: createdAt_DESC, first: 5)
    {
      id,
      name,
      title,
      message
    }
  }
`

const PostsSubscription = gql`
subscription PostsSubscription($name: String!){
  Post(filter: {
    mutation_in: [CREATED],
    node: {
      name: $name
    }
  }) {
    node {
      id,
      name,
      title,
      message
    }
  }
}
`

interface Post {
  id: string
  name: string
  title: string
  message: string
}

interface PostsQueryResult {
  allPosts: Array<Post>
}

export class PostsStore {
  appStore: AppStore
  postSubscription

  @observable posts: Array<Post> = []

  constructor() {
    let self = this
    this.appStore = AppStore.getInstance()
    this.postSubscription = this.appStore.apolloClient.subscribe({
      query: PostsSubscription,
      // This way realtime updates will work only when both posting and reading users have the same name. Proof of concept.
      variables: { name: this.appStore.username }
    }).subscribe({
      next(data) {
        self.posts.unshift(data.Post.node)
      },
      error(err) { console.error('err', err) },
    })
  }

  destructor() {
    this.postSubscription.unsubscribe()
  }

  async initializePosts() {
    const result = await this.appStore.apolloClient.query<PostsQueryResult>({
      query: PostsQuery,
      fetchPolicy: 'network-only'
    })
    this.posts = result.data.allPosts
  }
}
