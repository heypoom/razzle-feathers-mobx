import React, {Component} from 'react'
import {Provider} from 'mobx-react'

export default class App extends Component {
  render() {
    const {stores, children} = this.props

    return <Provider {...stores}>{children}</Provider>
  }
}
