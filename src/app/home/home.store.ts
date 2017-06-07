import { observable, action } from 'mobx'

export class HomeStore {
  @observable counter = 0
  increment = () => {
    this.counter++
  }
}
