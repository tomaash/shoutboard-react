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
    return <div>
      <h2> Create a new post </h2>
      <h3> You are now posting as {appStore.username} </h3>
      <Input
        type='text'
        label='Title'
        name='title'
        error={formStore.title.error}
        value={formStore.title.value}
        onChange={formStore.title.onChange}
      />
      <Input
        type='text'
        multiline={true}
        rows={3}
        label='Message'
        name='message'
        error={formStore.message.error}
        value={formStore.message.value}
        onChange={formStore.message.onChange}
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
        disabled={formStore.form.hasError}
        primary
      />

    </div>

  }
}
