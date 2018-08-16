import {enableLogging} from 'mobx-logger'
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router'

import LandingStore from '../landing-page/store'

import history from '../utils/history'

export default async function initStore(state) {
  const routing = new RouterStore()
  const landing = new LandingStore({})
  // await landing.loadUsers()

  if (typeof window !== 'undefined') {
    syncHistoryWithStore(history, routing)

    if (process.env.NODE_ENV === 'development') {
      enableLogging()
    }
  }

  return {landing, routing}
}
