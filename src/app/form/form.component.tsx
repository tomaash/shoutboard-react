import * as React from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { observable, action } from 'mobx'
import { Input } from 'react-toolbox/lib/input'
import { Button } from 'react-toolbox/lib/button'
import { FormStore } from './form.store'
import { AppStore } from '../app.store'

@observer
export class Form extends React.Component<any, any> {

  formStore: FormStore
  componentWillMount() {
    this.formStore = new FormStore()
  }

  render() {
    return <Provider formStore={this.formStore}>
      <FormComponent />
    </Provider>
  }
}

interface FormComponentProps {
  appStore?: AppStore,
  formStore?: FormStore
}

@inject('appStore', 'formStore')
@observer
export class FormComponent extends React.Component<FormComponentProps, any> {
  render() {
    const { appStore, formStore } = this.props
    const { postFormState } = formStore
    return <div>
      <h2> Create a new post </h2>
      <h3> You are now posting as {appStore.username} </h3>
      <Input
        type='text'
        label='Title'
        name='title'
        error={postFormState.title.error}
        value={postFormState.title.value}
        onChange={postFormState.title.onChange}
      />
      <Input
        type='text'
        multiline={true}
        rows={3}
        label='Message'
        name='message'
        error={postFormState.message.error}
        value={postFormState.message.value}
        onChange={postFormState.message.onChange}
      />

      <Button
        label='Cancel'
        onClick={formStore.goBack}
        raised
        accent
      /> &nbsp;
      <Button
        label='Submit'
        onClick={formStore.submit}
        raised
        disabled={postFormState.form.hasError}
        primary
      />

    </div>

  }
}
