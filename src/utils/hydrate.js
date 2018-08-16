import jsonStringifySafe from 'json-stringify-safe'
import {toJS} from 'mobx'

import initStore from '../common/stores'

export function dehydrate(store) {
  return jsonStringifySafe(toJS(store)).replace(/</g, '\\u003c')
}

export function rehydrate() {
  return initStore(window.__STATE)
}
