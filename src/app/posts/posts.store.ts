import { observable, action } from 'mobx'
import gql from 'graphql-tag'
import { AppStore } from '../app.store'
import { RouterStore } from '../router.store'

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

const appStore = AppStore.getInstance()
const routerStore = RouterStore.getInstance()

export class PostsStore {
  @observable posts: Array<Post> = []

  async initializePosts() {
    const result = await appStore.apolloClient.query<PostsQueryResult>({
      query: PostsQuery,
      fetchPolicy: 'network-only'
    })
    this.posts = result.data.allPosts
    // routerStore.push('/home')
  }
}
