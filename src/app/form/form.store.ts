import { observable, action } from 'mobx'
import { FormState, FieldState } from 'formstate'
import gql from 'graphql-tag'
import { check, checkRequired } from './validatorUtils'
import { AppStore } from '../app.store'
import { RouterStore } from '../router.store'
import * as isLength from 'validator/lib/isLength'

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
  title = new FieldState('').validators(
    checkRequired('Title is required'),
    check(isLength, 'Title must be at least 4 characters long.', { min: 4 }),
    check(isLength, 'Title cannot be more than 24 characters long.', { max: 24 }),
  )
  message = new FieldState('').validators(
    checkRequired('Message cannot be blank.'),
    check(isLength, 'Message is too short, minimum is 50 characters.', { min: 50 }),
    check(isLength, 'Message is too long, maximum is 1000 characters.', { max: 1000 }),
  )
  form = new FormState({
    title: this.title,
    message: this.message
  })
  constructor() {
    this.appStore = AppStore.getInstance()
    this.routerStore = RouterStore.getInstance()
  }
  submit = async () => {
    await this.form.validate()
    if (this.form.error) return
    const result = await this.appStore.apolloClient.mutate(
      {
        mutation: AddPostMutation,
        variables: {
          name: this.appStore.username,
          title: this.title.value,
          message: this.message.value
        }
      }
    )
    this.goBack()
  }
  goBack = () => {
    this.routerStore.history.push('/posts')
  }
}
