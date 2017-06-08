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

  @observable posts: Array<Post> = []

  constructor() {
    this.appStore = AppStore.getInstance()
  }

  async initializePosts() {
    const result = await this.appStore.apolloClient.query<PostsQueryResult>({
      query: PostsQuery,
      fetchPolicy: 'network-only'
    })
    this.posts = result.data.allPosts
  }
}
