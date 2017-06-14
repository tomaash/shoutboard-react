import { observable, action } from 'mobx'
import gql from 'graphql-tag'
import { AppStore } from '../app.store'
import { RouterStore } from '../router.store'
import { PostFormState } from './post.formstate'

const AddPostMutation = gql`
  mutation AddPostMutation($name: String!, $title: String!, $message: String!) {
    createPost(
      name: $name,
      title: $title,
      message: $message
    ) {
      id
    }
  }
`

export class FormStore {
  appStore: AppStore
  routerStore: RouterStore
  postFormState: PostFormState

  constructor() {
    this.appStore = AppStore.getInstance()
    this.routerStore = RouterStore.getInstance()
    this.postFormState = new PostFormState()
  }

  submit = async () => {
    await this.postFormState.form.validate()
    if (this.postFormState.form.error) return
    const result = await this.appStore.apolloClient.mutate(
      {
        mutation: AddPostMutation,
        variables: {
          name: this.appStore.username,
          title: this.postFormState.title.value,
          message: this.postFormState.message.value
        }
      }
    )
    this.goBack()
  }

  goBack = () => {
    this.routerStore.history.push('/posts')
  }
}
