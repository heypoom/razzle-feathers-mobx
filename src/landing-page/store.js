import {observable, action} from 'mobx'

// import app from '../utils/feathers'

export default class LandingStore {
  @observable
  message = 'Hello, World!'

  @observable
  notes = []

  @observable
  users = []

  @action
  setNotes(notes) {
    this.notes = notes
  }

  // @action
  // loadUsers = async () => {
  //   this.users = await app.service('users').find()
  // }

  constructor(state) {
    Object.assign(this, state)
  }
}
